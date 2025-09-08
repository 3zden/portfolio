<template>
  <div class="hero-container">
    <!-- Light Rays Background - Always show, but adjust for theme -->
    <Lightrays
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
      :class="{ 'dark-theme': isDarkTheme, 'light-theme': !isDarkTheme }"
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
              :style="{ 
                whiteSpace: 'nowrap', 
                flexShrink: 0, 
                minWidth: 'max-content',
                width: 'auto',
                maxWidth: 'none',
                marginRight: '12px',
                marginBottom: '8px'
              }"
              @click="handleButtonClick(item.link)"
            >
              <button-text :style="{ whiteSpace: 'nowrap', display: 'inline-block' }">{{item.text}}</button-text>
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
      currentTheme: 'dark', // Default assumption
      raysConfig: {
        origin: 'top-center',
        color: '#ffffff',
        speed: 0.6,
        pulsating: true,
        followMouse: false,
        mouseInfluence: 0,
        lightSpread: 1.5,
        rayLength: 2.0,
        fadeDistance: 1.0,
        saturation: 0.8,
        noiseAmount: 0.02,
        distortion: 0.05
      }
    }
  },
  computed: {
    isDarkTheme() {
      // Multiple ways to detect dark theme
      const htmlElement = document.documentElement;
      const bodyElement = document.body;
      
      // Method 1: Check for dark class
      if (bodyElement.classList.contains('dark') || htmlElement.classList.contains('dark')) {
        return true;
      }
      
      // Method 2: Check CSS custom properties
      const computedStyle = getComputedStyle(htmlElement);
      const bgColor = computedStyle.getPropertyValue('--main-background-color') || 
                     computedStyle.getPropertyValue('--background-color') ||
                     computedStyle.backgroundColor;
      
      if (bgColor && (bgColor.includes('#2a2a2a') || bgColor.includes('rgb(42, 42, 42)') || bgColor.includes('dark'))) {
        return true;
      }
      
      // Method 3: Check if background appears dark based on the image
      // Since your image shows white text on dark background, assume dark theme
      if (this.currentTheme === 'dark') {
        return true;
      }
      
      // Method 4: System preference as fallback
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  },
  mounted() {
    // Detect theme on mount
    this.detectTheme();
    
    // Listen for theme changes
    this.setupThemeListener();
  },
  methods: {
    detectTheme() {
      // Force dark theme detection based on your image
      // You can customize this logic based on your actual theme implementation
      const htmlElement = document.documentElement;
      const bodyStyle = getComputedStyle(document.body);
      
      // Check various indicators
      if (
        document.body.classList.contains('dark') ||
        htmlElement.classList.contains('dark') ||
        bodyStyle.backgroundColor === 'rgb(42, 42, 42)' ||
        bodyStyle.color === 'rgb(255, 255, 255)'
      ) {
        this.currentTheme = 'dark';
      } else {
        // For now, default to dark theme since your image shows a dark theme
        // Remove this else block and add proper light theme detection when needed
        this.currentTheme = 'dark';
      }
    },
    
    setupThemeListener() {
      // Listen for theme changes via CSS class changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            this.detectTheme();
          }
        });
      });
      
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
      });
      
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });
      
      // Also listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        this.detectTheme();
      });
    },
    
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
  z-index: 0;
  opacity: 0.4;
  transition: opacity 0.3s ease-in-out;
}

/* Dark theme rays (default) */
.hero-rays.dark-theme {
  opacity: 0.4;
}

.hero-rays.dark-theme:hover {
  opacity: 0.6;
}

.hero-rays.dark-theme canvas {
  width: 100% !important;
  height: 100% !important;
  filter: contrast(0.8) brightness(1.2);
}

.hero-rays.dark-theme::before {
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

/* Light theme rays (if needed) */
.hero-rays.light-theme {
  opacity: 0.2;
}

.hero-rays.light-theme:hover {
  opacity: 0.3;
}

.hero-rays.light-theme canvas {
  width: 100% !important;
  height: 100% !important;
  filter: contrast(0.6) brightness(0.8);
}

.hero-rays.light-theme::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at top center,
    rgba(0, 0, 0, 0.05) 0%,
    rgba(0, 0, 0, 0.02) 40%,
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
  
  .hero-rays.dark-theme canvas {
    filter: contrast(0.7) brightness(1.1);
  }
  
  .hero-rays.light-theme canvas {
    filter: contrast(0.5) brightness(0.7);
  }
}

/* Fix button text wrapping - prevent text from breaking */
.cta-section {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: flex-start;
  width: 100%;
  overflow: visible;
}

/* More specific selectors to override component styles */
.cta-section .styled-button,
.cta-section button {
  white-space: nowrap !important;
  flex-shrink: 0 !important;
  min-width: auto !important;
  width: auto !important;
  max-width: none !important;
  word-break: keep-all !important;
  overflow: visible !important;
  box-sizing: border-box !important;
}

/* Target the button text specifically */
.cta-section .styled-button .button-text,
.cta-section .styled-button span,
.cta-section button span,
.cta-section .styled-button * {
  white-space: nowrap !important;
  word-break: keep-all !important;
  display: inline-block !important;
  overflow: visible !important;
}

/* Alternative: If buttons still wrap, force them to overflow the container */
@media (max-width: 600px) {
  .cta-section {
    overflow-x: auto;
    padding-bottom: 5px;
  }
  
  .cta-section .styled-button {
    min-width: max-content !important;
  }
}

/* For very small screens, stack buttons vertically as last resort */
@media (max-width: 320px) {
  .cta-section {
    flex-direction: column;
    align-items: stretch;
    overflow-x: visible;
  }
  
  .cta-section .styled-button {
    text-align: center;
    width: 100% !important;
  }
}
</style> 