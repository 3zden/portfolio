# 🌟 Light Rays Effect for Dark Theme Portfolio

A beautiful, customizable WebGL-based light rays effect that's perfect for dark theme portfolios. This component creates dynamic, interactive light rays that respond to mouse movement and can be configured with various presets.

## ✨ Features

- **WebGL-powered**: High-performance rendering using WebGL
- **Dark theme optimized**: Designed specifically for dark backgrounds
- **Interactive**: Responds to mouse movement for engaging user experience
- **Customizable**: Multiple configuration options for different effects
- **Preset system**: Built-in presets for quick setup
- **Responsive**: Automatically adapts to different screen sizes
- **Performance optimized**: Uses intersection observer for better performance

## 🚀 Quick Start

### Basic Usage

```vue
<template>
  <Lightrays
    :rays-origin="'top-center'"
    :rays-color="'#4bafbd'"
    :rays-speed="0.8"
    :pulsating="true"
    :follow-mouse="true"
    class="hero-rays"
  />
</template>

<script>
import Lightrays from './components/Lightrays.vue'

export default {
  components: {
    Lightrays
  }
}
</script>
```

### Using Presets

```vue
<Lightrays preset="dramatic" class="hero-rays" />
```

## 🎨 Available Presets

### 1. **Dramatic** (`dramatic`)
- **Color**: `#4bafbd` (teal)
- **Speed**: 1.5x
- **Pulsating**: Yes
- **Effect**: Bold, high-contrast light rays
- **Best for**: Hero sections, dramatic presentations

### 2. **Subtle** (`subtle`)
- **Color**: `#ffffff` (white)
- **Speed**: 0.5x
- **Pulsating**: No
- **Effect**: Gentle, soft light rays
- **Best for**: Background effects, minimal designs

### 3. **Atmospheric** (`atmospheric`)
- **Color**: `#87ceeb` (sky blue)
- **Speed**: 0.8x
- **Pulsating**: Yes
- **Effect**: Natural, atmospheric light rays
- **Best for**: Nature themes, calm atmospheres

### 4. **Cyberpunk** (`cyberpunk`)
- **Color**: `#00ffff` (cyan)
- **Speed**: 2.0x
- **Pulsating**: Yes
- **Effect**: Fast, neon light rays
- **Best for**: Tech themes, high-energy designs

### 5. **Warm** (`warm`)
- **Color**: `#ffa500` (orange)
- **Speed**: 0.7x
- **Pulsating**: Yes
- **Effect**: Cozy, warm light rays
- **Best for**: Personal portfolios, warm atmospheres

## ⚙️ Configuration Options

### Core Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `raysOrigin` | String | `'top-center'` | Light source position |
| `raysColor` | String | `'#ffffff'` | Color of the light rays |
| `raysSpeed` | Number | `1.0` | Animation speed multiplier |
| `pulsating` | Boolean | `false` | Enable/disable pulsating effect |

### Advanced Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `lightSpread` | Number | `1.0` | How spread out the rays are |
| `rayLength` | Number | `2.0` | Length of the light rays |
| `fadeDistance` | Number | `1.0` | How far the rays fade out |
| `saturation` | Number | `1.0` | Color saturation level |
| `noiseAmount` | Number | `0.0` | Amount of noise/texture |
| `distortion` | Number | `0.0` | Ray distortion amount |

### Interaction Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `followMouse` | Boolean | `true` | Enable mouse following |
| `mouseInfluence` | Number | `0.1` | How much mouse affects rays |

### Origin Positions

Available `raysOrigin` values:
- `'top-center'` - Top center of the container
- `'top-left'` - Top left corner
- `'top-right'` - Top right corner
- `'left'` - Left center
- `'right'` - Right center
- `'bottom-center'` - Bottom center
- `'bottom-left'` - Bottom left corner
- `'bottom-right'` - Bottom right corner

## 🎯 Best Practices for Dark Themes

### 1. **Color Selection**
- Use colors that complement your dark theme
- Teal (`#4bafbd`) works great with dark backgrounds
- Avoid pure white for subtle effects
- Consider using your brand colors

### 2. **Positioning**
- `top-center` is most natural for hero sections
- `left` or `right` for sidebar effects
- `bottom-center` for footer effects

### 3. **Intensity**
- Use `subtle` preset for background effects
- Use `dramatic` preset for hero sections
- Adjust `fadeDistance` to control spread

### 4. **Performance**
- The component automatically optimizes for performance
- Uses intersection observer to only render when visible
- Automatically handles WebGL context management

## 🔧 Customization Examples

### Hero Section with Brand Colors
```vue
<Lightrays
  :rays-origin="'top-center'"
  :rays-color="'#4bafbd'"
  :rays-speed="0.8"
  :pulsating="true"
  :follow-mouse="true"
  :mouse-influence="0.15"
  :light-spread="1.2"
  :ray-length="2.5"
  :fade-distance="0.8"
  :saturation="1.1"
  :noise-amount="0.05"
  :distortion="0.1"
  class="hero-rays"
/>
```

### Subtle Background Effect
```vue
<Lightrays
  preset="subtle"
  :rays-origin="'left'"
  :rays-color="'#2a2a2a'"
  class="background-rays"
/>
```

### Interactive Feature Highlight
```vue
<Lightrays
  :rays-origin="'top-center'"
  :rays-color="'#00ffff'"
  :rays-speed="1.5"
  :pulsating="true"
  :follow-mouse="true"
  :mouse-influence="0.3"
  class="feature-rays"
/>
```

## 🎨 CSS Styling

### Basic Styling
```css
.hero-rays {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  opacity: 0.9;
  transition: opacity 0.3s ease-in-out;
}

.hero-rays:hover {
  opacity: 1;
}
```

### Enhanced Styling with Glow Effect
```css
.hero-rays::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at top center,
    rgba(75, 175, 189, 0.1) 0%,
    rgba(75, 175, 189, 0.05) 40%,
    transparent 70%
  );
  pointer-events: none;
  z-index: -1;
}
```

## 🚀 Demo Page

Visit `/demo` to see all available presets in action and experiment with different configurations.

## 🔍 Troubleshooting

### Common Issues

1. **Light rays not visible**
   - Check if WebGL is supported in your browser
   - Ensure the container has proper dimensions
   - Verify z-index values

2. **Performance issues**
   - Reduce `rayLength` and `fadeDistance`
   - Lower `noiseAmount` and `distortion`
   - Check if multiple instances are running

3. **Mouse interaction not working**
   - Ensure `followMouse` is `true`
   - Check `mouseInfluence` value
   - Verify no CSS is blocking pointer events

### Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ❌ Internet Explorer (no WebGL support)

## 📱 Responsive Design

The component automatically adapts to different screen sizes:
- Automatically adjusts for mobile devices
- Optimizes performance on lower-end devices
- Maintains visual quality across resolutions

## 🎭 Integration Tips

### With Vue Router
```vue
<Lightrays
  v-if="$route.name === 'Home'"
  preset="dramatic"
  class="hero-rays"
/>
```

### With Theme Switching
```vue
<Lightrays
  :rays-color="isDark ? '#4bafbd' : '#2a2a2a'"
  :preset="isDark ? 'dramatic' : 'subtle'"
/>
```

### With Scroll Animations
```vue
<Lightrays
  :class="{ 'fade-in': isVisible }"
  :preset="isVisible ? 'dramatic' : 'subtle'"
/>
```

## 🌟 Advanced Usage

### Dynamic Preset Switching
```vue
<template>
  <div>
    <button @click="currentPreset = 'dramatic'">Dramatic</button>
    <button @click="currentPreset = 'subtle'">Subtle</button>
    
    <Lightrays
      :preset="currentPreset"
      class="hero-rays"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPreset: 'dramatic'
    }
  }
}
</script>
```

### Custom Preset Creation
```vue
<script>
export default {
  data() {
    return {
      customPreset: {
        origin: 'top-center',
        color: '#ff6b6b',
        speed: 1.2,
        pulsating: true,
        followMouse: true,
        mouseInfluence: 0.2,
        lightSpread: 0.8,
        rayLength: 2.8,
        fadeDistance: 0.7,
        saturation: 1.3,
        noiseAmount: 0.08,
        distortion: 0.12
      }
    }
  }
}
</script>
```

## 📄 License

This component is part of your portfolio project and can be freely used and modified.

---

**Happy coding! 🌟** Your dark theme portfolio now has beautiful, interactive light rays that will make it stand out!
