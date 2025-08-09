<template>
  <nav-container>
    <nav-content>
      <logo-section>
        <router-link to="/" class="logo-link">
          <logo-image src="/falcon-light-plus-50-shadow.png" alt="3D Bird Logo" />
          <logo-text>{{author}}</logo-text>
        </router-link>
      </logo-section>
      
      <nav-links>
        <router-link 
          v-for="(link, index) in navLinks" 
          :key="index"
          :to="link.url"
          class="nav-link"
          active-class="active"
        >
          {{link.name}}
        </router-link>
      </nav-links>
      
      <mobile-menu-toggle @click="toggleMobileMenu">
        <span></span>
        <span></span>
        <span></span>
      </mobile-menu-toggle>
    </nav-content>
    
    <mobile-menu :class="{ open: mobileMenuOpen }">
      <router-link 
        v-for="(link, index) in navLinks" 
        :key="index"
        :to="link.url"
        class="mobile-nav-link"
        active-class="active"
        @click="closeMobileMenu"
      >
        {{link.name}}
      </router-link>
    </mobile-menu>
  </nav-container>
</template>

<script>
import styled from 'vue-styled-components'

const NavContainer = styled.nav`
  position: fixed;
  top: 16px;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  transition: all 0.3s ease;
  
  @media (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    top: 12px;
    border-radius: 16px;
  }
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.mobile}px) {
    top: 8px;
    border-radius: 14px;
  }
`

const NavContent = styled.div`
  max-width: ${({theme}) => theme.screen.width.desktop}px;
  margin: auto;
  padding: 0 ${({theme}) => theme.screen.padding.desktop}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.desktop}px) {
    padding: 0 ${({theme}) => theme.screen.padding.tablet}px;
  }
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    padding: 0 ${({theme}) => theme.screen.padding.mobile}px;
    height: 60px;
  }
`

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    width: 32px;
    height: 32px;
  }
`

const LogoText = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({theme}) => theme.color.text};
  letter-spacing: -0.02em;
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    font-size: 1.1rem;
  }
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    display: none;
  }
`

const MobileMenuToggle = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    display: flex;
  }
  
  span {
    width: 100%;
    height: 3px;
    background: ${({theme}) => theme.color.text};
    border-radius: 2px;
    transition: all 0.3s ease;
    transform-origin: 1px;
  }
  
  &:hover span {
    background: ${({theme}) => theme.color.link};
  }
`

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 999;
  
  &.open {
    transform: translateX(0);
  }
  
  @media (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.95);
  }
`

export default {
  name: 'Navigation',
  components: {
    NavContainer,
    NavContent,
    LogoSection,
    LogoImage,
    LogoText,
    NavLinks,
    MobileMenuToggle,
    MobileMenu
  },
  props: {
    author: {
      type: String,
      default: 'Abouaam Azzeddine'
    }
  },
  data() {
    return {
      mobileMenuOpen: false,
      navLinks: [
        { name: 'About', url: '/about' },
        { name: 'Projects', url: '/#products' },
        { name: 'Resume', url: '/resume.pdf' }
      ]
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
    }
  },
  mounted() {
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.closeMobileMenu()
      }
    })
  }
}
</script>

<style scoped>
.logo-link {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: inherit;
}

.nav-link {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--main-color);
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.nav-link.active {
  background: rgba(255, 255, 255, 0.15);
  color: var(--link-color);
}

.mobile-nav-link {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--main-color);
  text-decoration: none;
  padding: 16px 24px;
  border-radius: 24px;
  transition: all 0.3s ease;
}

.mobile-nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.mobile-nav-link.active {
  background: rgba(255, 255, 255, 0.15);
  color: var(--link-color);
}

@media (prefers-color-scheme: dark) {
  .nav-link:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  
  .nav-link.active {
    background: rgba(255, 255, 255, 0.1);
  }
  
  .mobile-nav-link:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  
  .mobile-nav-link.active {
    background: rgba(255, 255, 255, 0.1);
  }
}
</style> 