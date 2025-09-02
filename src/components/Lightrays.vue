<template>
  <div 
    ref="containerRef" 
    :class="['w-full h-full relative pointer-events-none overflow-hidden', className]"
    :style="{ zIndex: zIndex }"
  />
</template>

<script>
// Simplified OGL-like classes for WebGL
class Renderer {
  constructor(options = {}) {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      throw new Error('WebGL not supported');
    }
    
    this.gl = gl;
    this.dpr = options.dpr || 1;
    
    if (options.alpha) {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }
    
    gl.clearColor(0, 0, 0, 0);
  }
  
  setSize(width, height) {
    const canvas = this.gl.canvas;
    canvas.width = width * this.dpr;
    canvas.height = height * this.dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    this.gl.viewport(0, 0, canvas.width, canvas.height);
  }
  
  render({ scene }) {
    const gl = this.gl;
    gl.clear(gl.COLOR_BUFFER_BIT);
    scene.draw();
  }
}

class Program {
  constructor(gl, { vertex, fragment, uniforms }) {
    this.gl = gl;
    this.uniforms = uniforms;
    
    const vertexShader = this.createShader(gl.VERTEX_SHADER, vertex);
    const fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fragment);
    
    this.program = gl.createProgram();
    gl.attachShader(this.program, vertexShader);
    gl.attachShader(this.program, fragmentShader);
    gl.linkProgram(this.program);
    
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      throw new Error('Program linking failed: ' + gl.getProgramInfoLog(this.program));
    }
    
    this.uniformLocations = {};
    Object.keys(uniforms).forEach(name => {
      this.uniformLocations[name] = gl.getUniformLocation(this.program, name);
    });
  }
  
  createShader(type, source) {
    const gl = this.gl;
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error('Shader compilation failed: ' + gl.getShaderInfoLog(shader));
    }
    
    return shader;
  }
  
  use() {
    this.gl.useProgram(this.program);
    
    Object.keys(this.uniforms).forEach(name => {
      const uniform = this.uniforms[name];
      const location = this.uniformLocations[name];
      
      if (Array.isArray(uniform.value)) {
        if (uniform.value.length === 2) {
          this.gl.uniform2fv(location, uniform.value);
        } else if (uniform.value.length === 3) {
          this.gl.uniform3fv(location, uniform.value);
        }
      } else {
        this.gl.uniform1f(location, uniform.value);
      }
    });
  }
}

class Triangle {
  constructor(gl) {
    this.gl = gl;
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       3, -1,
      -1,  3
    ]), gl.STATIC_DRAW);
  }
  
  bind() {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
  }
}

class Mesh {
  constructor(gl, { geometry, program }) {
    this.gl = gl;
    this.geometry = geometry;
    this.program = program;
  }
  
  draw() {
    this.program.use();
    this.geometry.bind();
    
    const positionLocation = this.gl.getAttribLocation(this.program.program, 'position');
    this.gl.enableVertexAttribArray(positionLocation);
    this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);
    
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
  }
}

export default {
  name: 'LightRays',
  props: {
    raysOrigin: {
      type: String,
      default: 'top-center',
      validator: (value) => [
        'top-center', 'top-left', 'top-right', 
        'right', 'left', 
        'bottom-center', 'bottom-right', 'bottom-left'
      ].includes(value)
    },
    raysColor: {
      type: String,
      default: '#ffffff'
    },
    raysSpeed: {
      type: Number,
      default: 1
    },
    lightSpread: {
      type: Number,
      default: 1
    },
    rayLength: {
      type: Number,
      default: 2
    },
    pulsating: {
      type: Boolean,
      default: false
    },
    fadeDistance: {
      type: Number,
      default: 1.0
    },
    saturation: {
      type: Number,
      default: 1.0
    },
    followMouse: {
      type: Boolean,
      default: true
    },
    mouseInfluence: {
      type: Number,
      default: 0.1
    },
    noiseAmount: {
      type: Number,
      default: 0.0
    },
    distortion: {
      type: Number,
      default: 0.0
    },
    className: {
      type: String,
      default: ''
    },
    zIndex: {
      type: [String, Number],
      default: 3
    },
    preset: {
      type: String,
      default: 'default',
      validator: (value) => [
        'default', 'dramatic', 'subtle', 'atmospheric', 'cyberpunk', 'warm'
      ].includes(value)
    }
  },
  data() {
    return {
      renderer: null,
      mesh: null,
      uniforms: null,
      mouse: { x: 0.5, y: 0.5 },
      smoothMouse: { x: 0.5, y: 0.5 },
      animationId: null,
      isVisible: false,
      observer: null,
      cleanupFunction: null,
      resizeTimeout: null,
      
      // Preset configurations for different effects
      presets: {
        default: {
          origin: 'top-center',
          color: '#ffffff',
          speed: 1.0,
          pulsating: false,
          followMouse: false,
          mouseInfluence: 0.1,
          lightSpread: 1.0,
          rayLength: 2.0,
          fadeDistance: 1.0,
          saturation: 1.0,
          noiseAmount: 0.0,
          distortion: 0.0
        },
        dramatic: {
          origin: 'top-center',
          color: '#4bafbd',
          speed: 1.5,
          pulsating: true,
          followMouse: true,
          mouseInfluence: 0.2,
          lightSpread: 0.8,
          rayLength: 3.0,
          fadeDistance: 0.6,
          saturation: 1.2,
          noiseAmount: 0.1,
          distortion: 0.15
        },
        subtle: {
          origin: 'top-center',
          color: '#ffffff',
          speed: 0.5,
          pulsating: false,
          followMouse: true,
          mouseInfluence: 0.05,
          lightSpread: 1.5,
          rayLength: 1.5,
          fadeDistance: 1.2,
          saturation: 0.8,
          noiseAmount: 0.02,
          distortion: 0.02
        },
        atmospheric: {
          origin: 'top-center',
          color: '#87ceeb',
          speed: 0.8,
          pulsating: true,
          followMouse: true,
          mouseInfluence: 0.12,
          lightSpread: 1.3,
          rayLength: 2.5,
          fadeDistance: 0.8,
          saturation: 1.1,
          noiseAmount: 0.08,
          distortion: 0.08
        },
        cyberpunk: {
          origin: 'top-center',
          color: '#00ffff',
          speed: 2.0,
          pulsating: true,
          followMouse: true,
          mouseInfluence: 0.25,
          lightSpread: 0.6,
          rayLength: 3.5,
          fadeDistance: 0.5,
          saturation: 1.5,
          noiseAmount: 0.15,
          distortion: 0.2
        },
        warm: {
          origin: 'top-center',
          color: '#ffa500',
          speed: 0.7,
          pulsating: true,
          followMouse: true,
          mouseInfluence: 0.1,
          lightSpread: 1.4,
          rayLength: 2.2,
          fadeDistance: 0.9,
          saturation: 1.3,
          noiseAmount: 0.05,
          distortion: 0.05
        }
      },
      
      vertexShader: `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`,

      fragmentShader: `precision highp float;

uniform float iTime;
uniform vec2  iResolution;
uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;

varying vec2 vUv;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                  float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);

  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;

  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));

  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);

  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;

  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0, 1.0
  );

  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);

  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  vec4 rays1 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349,
                           1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234,
                           1.1 * raysSpeed);

  fragColor = rays1 * 0.5 + rays2 * 0.4;

  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.01 + iTime * 0.1);
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
  }

  float brightness = 1.0 - (coord.y / iResolution.y);
  fragColor.x *= 0.1 + brightness * 0.8;
  fragColor.y *= 0.3 + brightness * 0.6;
  fragColor.z *= 0.5 + brightness * 0.5;

  if (saturation != 1.0) {
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
  }

  fragColor.rgb *= raysColor;
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}`
    }
  },
  computed: {
    rgbColor() {
      return this.hexToRgb(this.raysColor);
    },
    pulsatingValue() {
      return this.pulsating ? 1.0 : 0.0;
    },
    devicePixelRatio() {
      return Math.min(window.devicePixelRatio || 1, 2);
    }
  },
  watch: {
    isVisible(newVisible) {
      if (newVisible && this.$refs.containerRef) {
        if (this.cleanupFunction) {
          this.cleanupFunction();
          this.cleanupFunction = null;
        }
        this.initializeWebGL();
      } else if (!newVisible && this.cleanupFunction) {
        if (this.animationId) {
          cancelAnimationFrame(this.animationId);
          this.animationId = null;
        }
      }
    },
    raysColor() {
      this.updateUniforms();
    },
    raysSpeed() {
      this.updateUniforms();
    },
    lightSpread() {
      this.updateUniforms();
    },
    raysOrigin() {
      this.updateUniforms();
    },
    rayLength() {
      this.updateUniforms();
    },
    pulsating() {
      this.updateUniforms();
    },
    fadeDistance() {
      this.updateUniforms();
    },
    saturation() {
      this.updateUniforms();
    },
    mouseInfluence() {
      this.updateUniforms();
    },
    noiseAmount() {
      this.updateUniforms();
    },
    distortion() {
      this.updateUniforms();
    },
    followMouse(newFollowMouse) {
      if (newFollowMouse) {
        window.addEventListener('mousemove', this.handleMouseMove, { passive: true });
      } else {
        window.removeEventListener('mousemove', this.handleMouseMove);
      }
    },
    preset(newPreset) {
      if (newPreset && this.presets[newPreset]) {
        this.applyPreset(newPreset);
      }
    }
  },
  mounted() {
    this.setupIntersectionObserver();
    
    if (this.followMouse) {
      window.addEventListener('mousemove', this.handleMouseMove, { passive: true });
    }
    
    // Apply initial preset if specified
    if (this.preset && this.presets[this.preset]) {
      this.applyPreset(this.preset);
    }
  },
  beforeDestroy() {
    this.cleanup();
  },
  methods: {
    hexToRgb(hex) {
      const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return m ? [
        parseInt(m[1], 16) / 255,
        parseInt(m[2], 16) / 255,
        parseInt(m[3], 16) / 255
      ] : [1, 1, 1];
    },
    
    getAnchorAndDir(origin, w, h) {
      const outside = 0.2;
      switch (origin) {
        case 'top-left':
          return { anchor: [0, -outside * h], dir: [0, 1] };
        case 'top-right':
          return { anchor: [w, -outside * h], dir: [0, 1] };
        case 'left':
          return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };
        case 'right':
          return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };
        case 'bottom-left':
          return { anchor: [0, (1 + outside) * h], dir: [0, -1] };
        case 'bottom-center':
          return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };
        case 'bottom-right':
          return { anchor: [w, (1 + outside) * h], dir: [0, -1] };
        default:
          return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };
      }
    },
    
    handleMouseMove(e) {
      if (!this.$refs.containerRef || !this.renderer) return;
      
      const rect = this.$refs.containerRef.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      this.mouse = { x, y };
    },
    
    updatePlacement() {
      if (!this.$refs.containerRef || !this.renderer || !this.uniforms) return;

      this.renderer.dpr = this.devicePixelRatio;

      const { clientWidth: wCSS, clientHeight: hCSS } = this.$refs.containerRef;
      this.renderer.setSize(wCSS, hCSS);

      const dpr = this.renderer.dpr;
      const w = wCSS * dpr;
      const h = hCSS * dpr;

      this.uniforms.iResolution.value = [w, h];

      const { anchor, dir } = this.getAnchorAndDir(this.raysOrigin, w, h);
      this.uniforms.rayPos.value = anchor;
      this.uniforms.rayDir.value = dir;
    },
    
    debouncedUpdatePlacement() {
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }
      this.resizeTimeout = setTimeout(() => {
        this.updatePlacement();
        this.resizeTimeout = null;
      }, 16);
    },
    
    async initializeWebGL() {
      if (!this.$refs.containerRef) return;

      try {
        this.renderer = new Renderer({
          dpr: this.devicePixelRatio,
          alpha: true,
          antialias: false,
          powerPreference: 'high-performance'
        });

        const gl = this.renderer.gl;
        gl.canvas.style.width = '100%';
        gl.canvas.style.height = '100%';

        while (this.$refs.containerRef.firstChild) {
          this.$refs.containerRef.removeChild(this.$refs.containerRef.firstChild);
        }
        this.$refs.containerRef.appendChild(gl.canvas);

        this.uniforms = {
          iTime: { value: 0 },
          iResolution: { value: [1, 1] },
          rayPos: { value: [0, 0] },
          rayDir: { value: [0, 1] },
          raysColor: { value: this.rgbColor },
          raysSpeed: { value: this.raysSpeed },
          lightSpread: { value: this.lightSpread },
          rayLength: { value: this.rayLength },
          pulsating: { value: this.pulsatingValue },
          fadeDistance: { value: this.fadeDistance },
          saturation: { value: this.saturation },
          mousePos: { value: [0.5, 0.5] },
          mouseInfluence: { value: this.mouseInfluence },
          noiseAmount: { value: this.noiseAmount },
          distortion: { value: this.distortion }
        };

        const geometry = new Triangle(gl);
        const program = new Program(gl, {
          vertex: this.vertexShader,
          fragment: this.fragmentShader,
          uniforms: this.uniforms
        });
        this.mesh = new Mesh(gl, { geometry, program });

        const handleResize = () => {
          this.debouncedUpdatePlacement();
        };

        window.addEventListener('resize', handleResize, { passive: true });
        this.updatePlacement();
        this.animationId = requestAnimationFrame(this.loop);

        this.cleanupFunction = () => {
          if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
          }

          window.removeEventListener('resize', handleResize);

          if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = null;
          }

          if (this.renderer) {
            try {
              const canvas = this.renderer.gl.canvas;
              const loseContextExt = this.renderer.gl.getExtension('WEBGL_lose_context');
              if (loseContextExt) {
                loseContextExt.loseContext();
              }

              if (canvas && canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
              }
            } catch (error) {
              console.warn('Error during WebGL cleanup:', error);
            }
          }

          this.renderer = null;
          this.uniforms = null;
          this.mesh = null;
        };
      } catch (error) {
        console.error('Failed to initialize WebGL:', error);
      }
    },
    
    loop(t) {
      if (!this.renderer || !this.uniforms || !this.mesh || !this.isVisible) {
        return;
      }

      this.uniforms.iTime.value = t * 0.001;

      if (this.followMouse && this.mouseInfluence > 0.0) {
        const smoothing = 0.92;

        this.smoothMouse.x = this.smoothMouse.x * smoothing + this.mouse.x * (1 - smoothing);
        this.smoothMouse.y = this.smoothMouse.y * smoothing + this.mouse.y * (1 - smoothing);

        this.uniforms.mousePos.value = [this.smoothMouse.x, this.smoothMouse.y];
      }

      try {
        this.renderer.render({ scene: this.mesh });
        this.animationId = requestAnimationFrame(this.loop);
      } catch (error) {
        console.warn('WebGL rendering error:', error);
        return;
      }
    },
    
    updateUniforms() {
      if (!this.uniforms || !this.$refs.containerRef || !this.renderer) return;

      const u = this.uniforms;

      u.raysColor.value = this.rgbColor;
      u.raysSpeed.value = this.raysSpeed;
      u.lightSpread.value = this.lightSpread;
      u.rayLength.value = this.rayLength;
      u.pulsating.value = this.pulsatingValue;
      u.fadeDistance.value = this.fadeDistance;
      u.saturation.value = this.saturation;
      u.mouseInfluence.value = this.mouseInfluence;
      u.noiseAmount.value = this.noiseAmount;
      u.distortion.value = this.distortion;

      const { clientWidth: wCSS, clientHeight: hCSS } = this.$refs.containerRef;
      const dpr = this.renderer.dpr;
      const { anchor, dir } = this.getAnchorAndDir(this.raysOrigin, wCSS * dpr, hCSS * dpr);
      u.rayPos.value = anchor;
      u.rayDir.value = dir;
    },
    
    setupIntersectionObserver() {
      if (!this.$refs.containerRef) return;

      this.observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          this.isVisible = entry.isIntersecting;
        },
        {
          threshold: 0.1,
          rootMargin: '50px'
        }
      );

      this.observer.observe(this.$refs.containerRef);
    },
    
    cleanup() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }

      if (this.cleanupFunction) {
        this.cleanupFunction();
        this.cleanupFunction = null;
      }

      window.removeEventListener('mousemove', this.handleMouseMove);
    },

    applyPreset(presetName) {
      const preset = this.presets[presetName];
      if (preset) {
        this.raysOrigin = preset.origin;
        this.raysColor = preset.color;
        this.raysSpeed = preset.speed;
        this.pulsating = preset.pulsating;
        this.followMouse = preset.followMouse;
        this.mouseInfluence = preset.mouseInfluence;
        this.lightSpread = preset.lightSpread;
        this.rayLength = preset.rayLength;
        this.fadeDistance = preset.fadeDistance;
        this.saturation = preset.saturation;
        this.noiseAmount = preset.noiseAmount;
        this.distortion = preset.distortion;
      }
    }
  }
}
</script>