<template>
  <div class="hero-container">
    <!-- Light Rays Background - Only in Dark Theme -->
    <Lightrays
      v-if="isDarkTheme"
      :rays-origin="raysConfig.origin"
      :rays-color="raysConfig.color"
      :rays-speed="raysConfig.speed"
      :pulsating="raysConfig.pulsating"
      :follow-mouse="raysConfig.followMouse"
      :mouse-influence="raysConfig.mouseInfluence"
      :light-spread="raysConfig.lightSpread"
      :ray-length="raysConfig.rayLength"
      :fade-distance="raysConfig.fadeDistance"
      :saturation="raysConfig.saturation"
      :noise-amount="raysConfig.noiseAmount"
      :distortion="raysConfig.distortion"
      class="hero-rays"
      :z-index="0"
    />
    
    <background>
      <container>
        <text-container>
          <heading>{{author}}</heading>
          <subtitle>{{subtitle}}</subtitle>
          <paragraph>
            <span v-for="(line, index) in description" :key="index">{{line}}<br/></span>
          </paragraph>
          <cta-section>
            <styled-button
              v-for="(item, idx) in cta"
              :key="idx"
              secondary
              :color="'#363636'"
              @click="handleButtonClick(item.link)"
            >
              <button-text>{{item.text}}</button-text>
              <i class="fas fa-arrow-down"></i>
            </styled-button>
          </cta-section>
        </text-container>
      </container>
    </background>
  </div>
</template>

<script>
import styled from 'vue-styled-components'
import { Subtitle, Paragraph, ButtonText } from './styles/Text.ts'
import { StyledButton } from './Card.vue'
import Lightrays from './Lightrays.vue'

const Background = styled.div`
  background: url(${({theme}) => theme.hero.background.image});
  background-size: cover;
  background-position: 50%;
  height: 800px;
  width: 100%;
  min-width: ${({theme}) => theme.screen.width.mobile}px;
  margin: auto;

  /* Responsive */
  height: 100vh;
  min-height: 600px;
  max-height: 1035px;
  @media screen and (max-width: ${({theme}) => theme.screen.width.desktop}px) {
    background-position: 60% -45px;
    background-size: inherit;
}
`

const Container = styled.div`
  max-width: ${({theme}) => theme.screen.width.desktop}px;
  margin: auto;
  /* padding-top: 180px; */
  position: relative;
  z-index: 0; /* Above light rays and background */

  /* Responsive */
  height: 100vh;
  min-height: 600px;
  max-height: 1035px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const TextContainer = styled.div`
  /* TODO: CONFIGURABLE */
  width: 400px;
  margin: 10px;

  /* Responsive */
  margin-top: -20px;

  @media screen and (max-width: ${({theme}) => theme.screen.width.desktop}px) {
    width: ${({theme}) => theme.screen.width.mobile - theme.screen.padding.mobile * 2}px;
    margin: auto;
  }
`

const Heading = styled.h1`
  font-size: 5rem;
  margin: 32px auto;
  font-weight: 600;
  @media screen and (max-width: ${({theme}) => theme.screen.width.desktop}px) {
    font-size: 72px;
  }
`

const CtaSection = styled.div`
  margin: 36px 0px;
`

export default {
  components: {
    Background,
    Container,
    TextContainer,
    CtaSection,
    Heading,
    Subtitle,
    Paragraph,
    StyledButton,
    ButtonText,
    Lightrays
  },
  props: {
    author: String,
    cta: Array,
    subtitle: String,
    description: Array
  },
  data() {
    return {
      raysConfig: {
        origin: 'top-center',
        color: '#ffffff', // Changed to white
        speed: 0.6, // Slightly slower for subtlety
        pulsating: true,
        followMouse: false, // Disabled mouse interaction
        mouseInfluence: 0, // No mouse influence at all
        lightSpread: 1.5, // More spread out
        rayLength: 2.0, // Shorter rays
        fadeDistance: 1.0, // More fade
        saturation: 0.8, // Less saturation for subtlety
        noiseAmount: 0.02, // Minimal noise
        distortion: 0.05 // Minimal distortion
      }
    }
  },
  computed: {
    isDarkTheme() {
      // Check if dark theme is active by looking at CSS custom properties
      return document.documentElement.style.getPropertyValue('--main-background-color')?.includes('#2a2a2a') || 
             document.body.classList.contains('dark') ||
             window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  },
  methods: {
    handleButtonClick(link) {
      if (link.startsWith('/')) {
        // Router navigation for internal links
        this.$router.push(link)
      } else if (link.startsWith('#/')) {
        // Hash router navigation (e.g., #/about)
        const route = link.substring(1) // Remove the # to get /about
        this.$router.push(route)
      } else if (link.startsWith('#')) {
        // Scroll to anchor for internal page links
        const element = document.querySelector(link)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        // External links
        window.open(link, '_blank')
      }
    }
  }
}
</script>

<style scoped>
.hero-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.hero-rays {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0; /* Above background, below content */
  opacity: 0.4; /* More subtle for white rays */
  transition: opacity 0.3s ease-in-out;
}

.hero-rays:hover {
  opacity: 0.6;
}

.hero-rays canvas {
  width: 100% !important;
  height: 100% !important;
  filter: contrast(0.8) brightness(1.2); /* Adjusted for white rays */
}

/* Remove the colored glow effect since we're using white rays */
/* Add subtle white glow for dark themes */
.hero-rays::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at top center,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.04) 40%,
    transparent 70%
  );
  pointer-events: none;
  z-index: -1;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-rays {
    opacity: 0.3;
  }
  
  .hero-rays canvas {
    filter: contrast(0.7) brightness(1.1);
  }
  
  /* Fix button text wrapping on small screens */
  .cta-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .cta-section .styled-button {
    white-space: nowrap;
    min-width: fit-content;
    margin-right: 0;
    margin-bottom: 8px;
  }
}

@media (max-width: 480px) {
  /* Extra small screens - stack buttons vertically */
  .cta-section {
    flex-direction: column;
    gap: 8px;
  }
  
  .cta-section .styled-button {
    width: 100%;
    text-align: center;
    justify-content: center;
  }
}
</style>
