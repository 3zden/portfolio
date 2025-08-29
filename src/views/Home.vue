<template>
  <div>
    <hero
      v-bind:author="author"
      v-bind:subtitle="hero.subtitle"
      v-bind:description="hero.description"
      v-bind:cta="hero.cta"
    />
    <card-container id="products">
      <card
        v-for="(product, index) in products.featured" :key="index"
        v-bind:name="product.name"
        v-bind:medium="product.medium"
        v-bind:summary="product.summary"
        v-bind:copy="product.copy"
        v-bind:links="product.links"
        v-bind:images="product.images"
      />
      <minor-card-container>
        <minor-card
          v-for="(product, index) in products.minor && products.minor.slice(0,3)" :key="index"
          v-bind:name="product.name"
          v-bind:description="product.description"
          v-bind:link="product.link"
        />
      </minor-card-container>
      <logo-section-container>
        <main-title>{{logoSection.title}}</main-title>
        <logo-container>
          <logo-card
            v-for="(logo, index) in logoSection.logos && logoSection.logos.slice(0,3)" :key="index"
            v-bind:src="logo.src"
            v-bind:url="logo.url"
            v-bind:alt="logo.alt"
          />
        </logo-container>
      </logo-section-container>
    </card-container>
    <foot v-bind:author="author" v-bind:footer="footer" />
  </div>
</template>

<script>
import styled from 'vue-styled-components'
import Hero from '../components/Hero.vue'
import Card from '../components/Card.vue'
import MinorCard from '../components/MinorCard.vue'
import LogoCard from '../components/LogoCard.vue'
import Foot from '../components/Foot.vue'
import { MainTitle } from '../components/styles/Text.ts'
import baseData from '../data/fixtures.ts'

const CardContainer = styled.div`
  margin-top: -60px;
  @media screen and (max-width: ${({theme}) => theme.screen.width.desktop}px) {
    margin-top: -48px;
  }
`

const MinorCardContainer = styled.div`
  margin: auto;
  margin-bottom: 80px;
  width: ${({theme}) => theme.screen.width.desktop}px;
  display: flex;
  @media screen and (max-width: ${({theme}) => theme.screen.width.desktop}px) {
    width: ${({theme}) => theme.screen.width.tablet}px;
    flex-direction: column;
  }
  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    width: ${({theme}) => theme.screen.width.mobile}px;
    flex-direction: column;
  }
  & > * {
    margin: 16px;
  }
  & > *:nth-child(3n+1) {
    margin-left: 0px;
  }
  & > *:nth-child(3n+0) {
    margin-right: 0px;
  }
  @media screen and (max-width: ${({theme}) => theme.screen.width.desktop}px) {
    & > * {
      margin: 16px 0px;
    & > *:nth-child(3n+1) {
      margin: 16px 0px;
    }
    & > *:nth-child(3n+0) {
      margin: 16px 0px;
    }
  }
  }
`

const LogoSectionContainer = styled.div`
  margin:auto;
  text-align: center;
  width: ${({theme}) => theme.screen.width.desktop}px;
  @media screen and (max-width: ${({theme}) => theme.screen.width.desktop}px) {
    width: ${({theme}) => theme.screen.width.tablet}px;
    flex-direction: column;
  }
  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    width: ${({theme}) => theme.screen.width.mobile}px;
    flex-direction: column;
  }
`

const LogoContainer = styled.div`
  justify-content: center;
  margin:auto;
  margin-top: 20px;
  width: ${({theme}) => theme.screen.width.desktop}px;
  display: flex;
  @media screen and (max-width: ${({theme}) => theme.screen.width.desktop}px) {
    width: ${({theme}) => theme.screen.width.tablet}px;
    flex-direction: column;
  }
  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    width: ${({theme}) => theme.screen.width.mobile}px;
    flex-direction: column;
  }
`

export default {
  name: 'Home',
  components: {
    Hero,
    Card,
    MinorCard,
    MinorCardContainer,
    Foot,
    CardContainer,
    MainTitle,
    LogoContainer,
    LogoSectionContainer,
    LogoCard
  },
  data: () => ({
    ...baseData
  })
}
</script>
