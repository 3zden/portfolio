<template>
  <styled-a v-bind:href="url" target="_blank" v-bind:aria-label="alt">
    <card>
      <logo v-bind:src="src" v-bind:alt="alt"></logo>
    </card>
  </styled-a>
</template>

<script>
import styled from 'vue-styled-components'

const StyledA = styled.a`
  display: flex;
  flex: 0 0 auto;
  width: 236px;
  margin: 1.25rem 0.6rem;
  text-decoration: none;
  @media screen and (max-width: ${({theme}) => theme.screen.width.desktop}px) {
    margin: 1rem 0.5rem;
  }
  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    width: 100%;
    margin: 1rem 0.5rem;
  }
`

const Card = styled.div`
  min-height: 74px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({theme}) => theme.card.background};
  /* background: radial-gradient(118.99% 670.46% at -7.06% -9.5%, #FFFFFF 0%, #F1F1F1 100%); */
  box-shadow: ${({theme}) => theme.card.boxShadow};
  border-radius: 20px;
  padding: 0.95rem 1.2rem;
  position: relative;
  /* Can't transition radial gradients */
  /* transition: 0.3s background; */

  /* Disabled for performance issues */
  /* backdrop-filter: blur(10px); */
  transform: translateY(0px);
  transition: 0.25s transform ease-out;

  &:hover {
    transform: translateY(-3px);
  }
`

const Logo = styled.img`
  max-height: 54px;
  max-width: 208px;
  width: 100%;
  height: auto;
  object-fit: contain;
  opacity: 0.70;
  filter: ${({theme}) => theme.isDark ? 'invert(1) brightness(1.05)' : 'none'};
  transition: filter 0.2s ease;

  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    max-height: 50px;
    max-width: 204px;
  }
`

export default {
  components: {
    Card,
    Logo,
    StyledA
  },
  props: {
    src: String,
    url: String,
    alt: String
  }
}
</script>
