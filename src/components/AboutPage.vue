<template>
  <theme-provider :theme="theme">
    <about
      v-bind:summary="about.summary"
      v-bind:workExperience="about.workExperience"
      v-bind:studies="about.studies"
    />
    <foot v-bind:author="author" v-bind:footer="footer" />
    <light-toggle v-on:click="toggleTheme()"><span v-if="!isDark" >💡</span><span v-if="isDark">💡</span></light-toggle>
  </theme-provider>
</template>

<script>
import Vue from 'vue'
import styled from 'vue-styled-components'
import About from './About.vue'
import Foot from './Foot.vue'
import { ThemeProvider } from 'vue-styled-components'

import baseData from '../data/fixtures.ts'
import light from '../themes/light.ts'
import dark from '../themes/dark.ts'

const localStore = Vue.observable({
  dark: false
})

const mutations = {
  toggleDark() {
    localStore.dark = !localStore.dark
  },
  setDark(isDark) {
    localStore.dark = isDark
  }
}

// Hack until createGlobalStyles comes to vue-styled-components
const adjustTheme = () => {
  if (localStore.dark) {
    document.documentElement.style.setProperty("--main-color", dark.color.text)
    document.documentElement.style.setProperty("--main-background-color", dark.color.background)
    document.documentElement.style.setProperty("--fallback-background-color", dark.color.fallbackBackground)
    document.documentElement.style.setProperty("--link-color", dark.color.link)
  } else {
    document.documentElement.style.setProperty("--main-color", light.color.text)
    document.documentElement.style.setProperty("--main-background-color", light.color.background)
    document.documentElement.style.setProperty("--fallback-background-color", light.color.fallbackBackground)
    document.documentElement.style.setProperty("--link-color", light.color.link)
  }
}

if (window.matchMedia) {
  try {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if(e.matches) {
          localStore.dark = true
        } else {
          localStore.dark = false
        }
        adjustTheme()
    })
  } catch(e) {
    console.error(e)
  }
}

const setup = () => {
  if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    localStore.dark = true
  } else {
    localStore.dark = false
  }
  adjustTheme()

  var html = document.getElementsByTagName('html')[0]
  html.style.setProperty("transition", "0.3s color, 0.3s background")
  var body = document.getElementsByTagName('body')[0]
  body.style.setProperty("transition", "0.3s color, 0.3s background")
}

const LightToggle = styled.button`
  border: none;
  background: ${({theme}) => theme.card.background};
  box-shadow: ${({theme}) => theme.card.boxShadow};
  position: sticky;
  float: right;
  bottom: 30px;
  right: 30px;
  margin-top: -40px;
  padding: 12px;
  font-size: 20px;
  text-decoration: none;
  transform: translateY(0px);
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 25px rgba(0,0,0,0.1), inset 1px 1px 2px hsla(0,0%,100%,0.5);
  }
  
  &:active {
    transform: translateY(-1px) scale(1.02);
    transition: all 0.1s ease;
  }
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    bottom: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
    padding: 10px;
    font-size: 18px;
  }
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.mobile}px) {
    bottom: 16px;
    right: 16px;
    width: 44px;
    height: 44px;
    padding: 8px;
    font-size: 16px;
  }
`

export default {
  name: 'AboutPage',
  components: {
    About,
    Foot,
    ThemeProvider,
    LightToggle
  },
  computed: {
    theme() {
      return localStore.dark ? dark : light
    },
    isDark() {
      return localStore.dark
    }
  },
  methods: {
    toggleTheme: () =>{
      mutations.toggleDark()
      adjustTheme()
    },
  },
  data: () => ({
    ...baseData
  })
}
setup()
</script>

<style>
/* Hack until createGlobalStyles comes to vue-styled-components */
html {
  background: var(--main-background-color);
  background-color: var(--fallback-background-color);
}

body {
  color: var(--main-color);
}

a {
  color: var(--link-color);
}
</style> 