<template>
  <div ref="host" class="fluid-glass"><slot /></div>
</template>

<script>
/*
 * FluidGlass — a port of the React Bits component to this Vue 2 app.
 *
 * The original is React + @react-three/fiber + drei's MeshTransmissionMaterial, none of
 * which can run here, so the same effect is done directly in three.js:
 *   pass 1  render the scene (background plate) into a framebuffer
 *   pass 2  draw a glass body that samples that buffer through refract(), offsetting
 *           R/G/B by different amounts for chromatic aberration, plus a fresnel rim
 *
 * The material props (ior / thickness / transmission / roughness / chromaticAberration /
 * anisotropy) carry the same meaning and defaults as the React version.
 *
 * ponytail: geometry is generated, not loaded — lens.glb / bar.glb / cube.glb are just a
 * squashed sphere, a rounded slab and a rounded cube. No 3D assets to ship.
 */
import * as THREE from 'three'

const roundedRectShape = (w, h, r) => {
  const shape = new THREE.Shape()
  const x = -w / 2
  const y = -h / 2
  const rad = Math.min(r, h / 2, w / 2)
  shape.moveTo(x + rad, y)
  shape.lineTo(x + w - rad, y)
  shape.quadraticCurveTo(x + w, y, x + w, y + rad)
  shape.lineTo(x + w, y + h - rad)
  shape.quadraticCurveTo(x + w, y + h, x + w - rad, y + h)
  shape.lineTo(x + rad, y + h)
  shape.quadraticCurveTo(x, y + h, x, y + h - rad)
  shape.lineTo(x, y + rad)
  shape.quadraticCurveTo(x, y, x + rad, y)
  return shape
}

const VERT = `
  varying vec3 vNormalV;
  void main() {
    vNormalV = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const FRAG = `
  uniform sampler2D tScene;
  uniform vec2 uResolution;
  uniform float uIor;
  uniform float uThickness;
  uniform float uTransmission;
  uniform float uRoughness;
  uniform float uChroma;
  uniform float uAnisotropy;
  varying vec3 vNormalV;

  void main() {
    vec3 N = normalize(vNormalV);
    vec3 V = vec3(0.0, 0.0, 1.0);

    // refraction through the glass body, scaled by how thick it is
    vec3 R = refract(-V, N, 1.0 / uIor);
    vec2 offset = R.xy * uThickness * 0.010;
    offset.x *= 1.0 + uAnisotropy * 12.0;

    vec2 uv = gl_FragCoord.xy / uResolution;

    // roughness = a cheap 4-tap blur of the transmitted image
    vec2 blur = vec2(uRoughness * 0.02);
    float ca = uChroma * 0.09;

    vec3 col;
    col.r = texture2D(tScene, uv + offset * (1.0 + ca)).r;
    col.g = texture2D(tScene, uv + offset).g;
    col.b = texture2D(tScene, uv + offset * (1.0 - ca)).b;

    if (uRoughness > 0.001) {
      vec3 s = vec3(0.0);
      s += texture2D(tScene, uv + offset + vec2( blur.x, 0.0)).rgb;
      s += texture2D(tScene, uv + offset + vec2(-blur.x, 0.0)).rgb;
      s += texture2D(tScene, uv + offset + vec2(0.0,  blur.y)).rgb;
      s += texture2D(tScene, uv + offset + vec2(0.0, -blur.y)).rgb;
      col = mix(col, s * 0.25, clamp(uRoughness, 0.0, 1.0));
    }

    // fresnel rim — the bright edge that reads as a glass body
    float fres = pow(1.0 - max(dot(N, V), 0.0), 2.2);
    col += fres * 0.42;
    col -= smoothstep(0.25, 0.65, fres) * 0.16;   // dark lip under the highlight

    col = mix(texture2D(tScene, uv).rgb, col, uTransmission);
    gl_FragColor = vec4(col, 1.0);
  }
`

export default {
  name: 'FluidGlass',
  props: {
    mode: { type: String, default: 'bar' },
    src: { type: String, required: true },
    scale: { type: Number, default: 0.15 },
    ior: { type: Number, default: 1.15 },
    thickness: { type: Number, default: 10 },
    transmission: { type: Number, default: 1 },
    roughness: { type: Number, default: 0 },
    chromaticAberration: { type: Number, default: 0.1 },
    anisotropy: { type: Number, default: 0.01 },
    followPointer: { type: Boolean, default: true },
    // what the glass samples where the terrain is transparent; match the card colour
    backdrop: { type: String, default: '#101010' }
  },
  data: () => ({ supported: true }),
  mounted() {
    this.pointer = { x: 0, y: 0 }
    this.target = { x: 0, y: 0 }
    this.init()
  },
  beforeDestroy() {
    this.dispose()
  },
  watch: {
    src(url) {
      if (this.renderer) this.loadTexture(url)
    },
    mode() {
      if (this.renderer) this.buildGlass()
    }
  },
  methods: {
    init() {
      const host = this.$refs.host
      let renderer
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      } catch (e) {
        this.supported = false
        return
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block'
      host.appendChild(renderer.domElement)
      this.renderer = renderer

      this.scene = new THREE.Scene()
      // pixel-space camera, so the glass body can be sized and placed in CSS pixels
      this.camera = new THREE.OrthographicCamera(0, 1, 0, -1, -1000, 1000)

      const plateGeo = new THREE.PlaneGeometry(1, 1)
      this.plateMat = new THREE.MeshBasicMaterial({ transparent: true })
      this.plate = new THREE.Mesh(plateGeo, this.plateMat)
      this.scene.add(this.plate)

      this.fbo = new THREE.WebGLRenderTarget(1, 1)
      this.uniforms = {
        tScene: { value: this.fbo.texture },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uIor: { value: this.ior },
        uThickness: { value: this.thickness },
        uTransmission: { value: this.transmission },
        uRoughness: { value: this.roughness },
        uChroma: { value: this.chromaticAberration },
        uAnisotropy: { value: this.anisotropy }
      }

      this.buildGlass()
      this.loadTexture(this.src)
      this.resize()

      this.ro = new ResizeObserver(this.resize)
      this.ro.observe(host)
      host.addEventListener('pointermove', this.onPointer)
      host.addEventListener('pointerleave', this.onLeave)

      // only run the loop while the panel is on screen
      this.io = new IntersectionObserver(([e]) => {
        e.isIntersecting ? this.start() : this.stop()
      })
      this.io.observe(host)
    },

    buildGlass() {
      if (this.glass) {
        this.scene.remove(this.glass)
        this.glass.geometry.dispose()
      }
      const geo = this.makeGeometry()
      const mat =
        this.glassMat ||
        (this.glassMat = new THREE.ShaderMaterial({
          uniforms: this.uniforms,
          vertexShader: VERT,
          fragmentShader: FRAG
        }))
      this.glass = new THREE.Mesh(geo, mat)
      this.scene.add(this.glass)
    },

    makeGeometry() {
      if (this.mode === 'lens') {
        // a lens is a squashed sphere — curvature everywhere, so it refracts across the face
        const geo = new THREE.SphereGeometry(1, 64, 48)
        geo.scale(1, 1, 0.28)
        return geo
      }
      const isCube = this.mode === 'cube'
      const w = isCube ? 1 : 3.2
      const shape = roundedRectShape(w, 1, isCube ? 0.18 : 0.5)
      // a fat bevel curves most of the face, so the body refracts across its whole
      // width rather than only at the edges the way a flat slab would
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.16,
        bevelEnabled: true,
        bevelSize: 0.34,
        bevelThickness: 0.34,
        bevelSegments: 18,
        curveSegments: 40
      })
      geo.center()
      geo.computeVertexNormals()
      return geo
    },

    loadTexture(url) {
      new THREE.TextureLoader().load(url, tex => {
        tex.colorSpace = THREE.SRGBColorSpace
        this.texture = tex
        this.plateMat.map = tex
        this.plateMat.needsUpdate = true
        this.layoutPlate()
      })
    },

    // cover-fit the plate, matching `background-size: cover; background-position: center bottom`
    layoutPlate() {
      if (!this.texture || !this.w) return
      const img = this.texture.image
      const boxA = this.w / this.h
      const imgA = img.width / img.height
      const repeat = this.plateMat.map.repeat
      const offset = this.plateMat.map.offset
      if (imgA > boxA) {
        repeat.set(boxA / imgA, 1)
        offset.set((1 - repeat.x) / 2, 0)
      } else {
        repeat.set(1, imgA / boxA)
        offset.set(0, 0)
      }
    },

    resize() {
      const host = this.$refs.host
      const w = host.clientWidth
      const h = host.clientHeight
      if (!w || !h) return
      this.w = w
      this.h = h

      this.renderer.setSize(w, h, false)
      const cam = this.camera
      cam.left = -w / 2
      cam.right = w / 2
      cam.top = h / 2
      cam.bottom = -h / 2
      cam.updateProjectionMatrix()

      this.plate.scale.set(w, h, 1)

      const dpr = this.renderer.getPixelRatio()
      this.fbo.setSize(w * dpr, h * dpr)
      this.uniforms.uResolution.value.set(w * dpr, h * dpr)

      // bar spans the panel so the highlights can sit on it; lens/cube use `scale`
      const s = this.mode === 'bar' ? (w * 0.92) / 3.2 : Math.min(w, h * 1.6) * this.scale
      this.glass.scale.setScalar(s)
      this.barH = s

      this.layoutPlate()
      this.render()
    },

    onPointer(e) {
      const r = this.$refs.host.getBoundingClientRect()
      this.target.x = ((e.clientX - r.left) / r.width - 0.5) * r.width
      this.target.y = -((e.clientY - r.top) / r.height - 0.5) * r.height
    },
    onLeave() {
      this.target.x = 0
      this.target.y = 0
    },

    start() {
      if (this.raf) return
      this.last = performance.now()
      const loop = now => {
        this.raf = requestAnimationFrame(loop)
        const dt = Math.min((now - this.last) / 1000, 0.1)
        this.last = now
        this.tick(dt)
      }
      this.raf = requestAnimationFrame(loop)
    },
    stop() {
      if (this.raf) cancelAnimationFrame(this.raf)
      this.raf = null
    },

    tick(dt) {
      if (!this.glass) return
      const g = this.glass
      const lockBottom = this.mode === 'bar'
      const follow = this.followPointer && !lockBottom
      const destX = follow ? this.target.x : 0
      const destY = lockBottom ? -this.h / 2 + this.barH / 2 + 18 : follow ? this.target.y : 0

      // same critically-damped follow maath's easing.damp3 gives the original
      const k = 1 - Math.exp(-dt / 0.15)
      g.position.x += (destX - g.position.x) * k
      g.position.y += (destY - g.position.y) * k

      this.render()
    },

    render() {
      if (!this.renderer) return
      const { renderer, scene, camera } = this

      // pass 1 — the plate on an opaque backdrop, so the glass never samples
      // transparent pixels where the terrain's sky is and comes out black
      this.glass.visible = false
      renderer.setClearColor(this.backdrop, 1)
      renderer.setRenderTarget(this.fbo)
      renderer.clear()
      renderer.render(scene, camera)

      // pass 2 — to screen, transparent so the card surface shows through
      renderer.setRenderTarget(null)
      renderer.setClearColor(0x000000, 0)
      this.glass.visible = true
      renderer.render(scene, camera)
    },

    dispose() {
      this.stop()
      if (this.ro) this.ro.disconnect()
      if (this.io) this.io.disconnect()
      const host = this.$refs.host
      if (host) {
        host.removeEventListener('pointermove', this.onPointer)
        host.removeEventListener('pointerleave', this.onLeave)
      }
      if (this.glass) this.glass.geometry.dispose()
      if (this.glassMat) this.glassMat.dispose()
      if (this.plate) this.plate.geometry.dispose()
      if (this.plateMat) this.plateMat.dispose()
      if (this.texture) this.texture.dispose()
      if (this.fbo) this.fbo.dispose()
      if (this.renderer) {
        this.renderer.dispose()
        this.renderer.forceContextLoss()
      }
      this.renderer = null
    }
  }
}
</script>

<style scoped>
.fluid-glass {
  position: absolute;
  inset: 0;
  overflow: hidden;
}
</style>
