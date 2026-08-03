<template>
  <about-section>
    <top-bar>
      <styled-button
        secondary
        :color="'#363636'"
        role="button"
        tabindex="0"
        @click="$router.push('/')"
        @keyup.enter="$router.push('/')"
      >
        <i class="fas fa-arrow-left"></i><button-text>Home</button-text>
      </styled-button>
    </top-bar>

    <header-card>
      <hero-copy>
        <eyebrow>About</eyebrow>
        <section-title>Distributed systems <span class="dim">and cloud-native backends</span></section-title>
        <lede>{{ lede }}</lede>
      </hero-copy>
      <hero-art role="presentation" />
    </header-card>

    <facts-card>
      <card-body>
        <eyebrow>At a glance</eyebrow>
        <facts>
          <fact v-for="fact in facts" :key="fact.label">
            <span class="label">{{ fact.label }}</span>
            <span class="value">{{ fact.value }}</span>
          </fact>
        </facts>
      </card-body>
    </facts-card>

    <work-grid>
      <div>
        <heading-card>
          <card-body>
            <eyebrow>Experience</eyebrow>
            <section-title>Where the systems <span class="dim">went to production</span></section-title>
          </card-body>
        </heading-card>

        <rows>
          <row v-for="(job, index) in jobs" :key="job.org" :class="{ open: openJob === index }">
            <row-button type="button" :aria-expanded="String(openJob === index)" @click="toggleJob(index)">
              <span class="num">{{ pad(index + 1) }}</span>
              <span class="role">{{ job.role }}</span>
              <span class="chev">&#9662;</span>
            </row-button>
            <row-body class="row-body">
              <div>
                <div class="inner">
                  <p class="org">{{ job.org }} <span class="sep">/</span> {{ job.period }}</p>
                  <ul>
                    <li v-for="(point, i) in job.points" :key="i">{{ point }}</li>
                  </ul>
                </div>
              </div>
            </row-body>
          </row>
        </rows>
      </div>

      <terrain-panel>
          <glass-card class="liquidGL">
          <p class="k">{{ jobs[openJob].org }} &mdash; highlights</p>
          <dl>
            <div class="g-row" v-for="stat in jobs[openJob].stats" :key="stat.label">
              <dt>{{ stat.label }}</dt>
              <dd>{{ stat.value }}</dd>
            </div>
          </dl>
          </glass-card>
      </terrain-panel>
    </work-grid>

    <section-card>
      <card-body>
        <eyebrow>Education</eyebrow>
        <section-title>Engineering track, <span class="dim">Morocco</span></section-title>
        <entry-list>
          <entry v-for="(item, index) in education" :key="item.school">
            <span class="num">{{ pad(index + 1) }}</span>
            <div>
              <h3>{{ item.school }}</h3>
              <p class="degree">{{ item.degree }}</p>
              <p class="courses">{{ item.courses }}</p>
            </div>
            <span class="period">{{ item.period }}</span>
          </entry>
        </entry-list>
      </card-body>
    </section-card>

    <section-card>
      <card-body>
        <eyebrow>Stack</eyebrow>
        <section-title>Tools I reach for <span class="dim">first</span></section-title>
        <skill-group v-for="group in skills" :key="group.name">
          <div class="group-head">
            <h3>{{ group.name }}</h3>
            <span class="count">{{ group.items.length }}</span>
          </div>
          <skills-grid>
            <skill-category
              v-for="skill in group.items"
              :key="skill.name"
              :title="skill.name"
              :aria-label="skill.name"
            >
              <img
                v-if="!skill.isBroken"
                :src="skill.logoSrc"
                :alt="skill.name"
                @error="skill.isBroken = true"
              />
              <span v-else class="skill-fallback">{{ skill.name }}</span>
            </skill-category>
          </skills-grid>
        </skill-group>
      </card-body>
    </section-card>

    <wordmark>{{ fullName }}</wordmark>
  </about-section>
</template>

<script>
import styled from 'vue-styled-components'
import { StyledButton } from './Card.vue'
import { ButtonText } from './styles/Text.ts'

/* ponytail: one terrain source, swapped by theme — same pair the home page band uses. */
const terrain = ({theme}) => theme.isDark ? '/grass.webp' : '/hills.webp'

const AboutSection = styled.section`
  padding: 40px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    padding: 24px 0 0;
  }
`

/* ponytail: mixins must be functions — a plain template string would stringify
   the theme accessors before styled-components ever sees them. */
const cardShell = `
  border-radius: 20px;
  margin: auto;
  overflow: hidden;
`

const cardWidth = ({theme}) => `
  width: ${theme.screen.width.desktop}px;
  @media screen and (max-width: ${theme.screen.width.desktop}px) {
    width: ${theme.screen.width.tablet}px;
  }
  @media screen and (max-width: ${theme.screen.width.tablet}px) {
    width: ${theme.screen.width.mobile}px;
  }
`

const cardSurface = ({theme}) => `
  background: ${theme.card.background};
  box-shadow: ${theme.card.boxShadow};
`

const TopBar = styled.div`
  display: flex;
  margin-bottom: 8px;

  i {
    margin-right: 0.5em;
  }
  a {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  ${cardWidth}
`

const CardBody = styled.div`
  padding: 40px ${({theme}) => theme.screen.padding.desktop}px;

  @media screen and (max-width: ${({theme}) => theme.screen.width.desktop}px) {
    padding: 32px ${({theme}) => theme.screen.padding.tablet}px;
  }
  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    padding: 28px ${({theme}) => theme.screen.padding.mobile}px;
  }
`

/* awesomic ref: copy left, ridge bleeding off the right edge under the card radius */
const HeaderCard = styled.div`
  ${cardShell}
  ${cardSurface}
  display: grid;
  grid-template-columns: 0.96fr 1fr;
  align-items: center;

  @media screen and (max-width: ${({theme}) => theme.screen.width.desktop}px) {
    grid-template-columns: 1fr;
  }

  ${cardWidth}
`

const HeroCopy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 28px 0 28px ${({theme}) => theme.screen.padding.desktop}px;

  h2 {
    font-size: 2.2rem;
    margin-bottom: 18px;
  }

  @media screen and (max-width: ${({theme}) => theme.screen.width.desktop}px) {
    padding: 32px ${({theme}) => theme.screen.padding.tablet}px 8px;
  }
  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    padding: 28px ${({theme}) => theme.screen.padding.mobile}px 8px;
  }
`

/* aspect-ratio matches the artwork, so the whole ridge shows uncropped and sits
   flush to the card's right and bottom edges — the card radius does the clipping. */
/* the column carries the artwork's own aspect, so the whole ridge shows uncropped
   and still sits flush to the card's right and bottom — the radius does the clipping */
const HeroArt = styled.div`
  aspect-ratio: 1400 / 934;
  background-image: url('${({theme}) => theme.isDark ? '/ridge-dark.webp' : '/ridge.webp'}');
  background-size: 100% auto;
  background-position: right bottom;
  background-repeat: no-repeat;
`

const SectionCard = styled.div`
  ${cardShell}
  ${cardSurface}

  ${cardWidth}
`

const FactsCard = styled.div`
  ${cardShell}
  ${cardSurface}

  ${cardWidth}
`

/* lives inside the work grid column, so it takes the column width */
const HeadingCard = styled.div`
  ${cardShell}
  ${cardSurface}
  width: 100%;
  margin: 0 0 10px 0;
`

const Eyebrow = styled.p`
  margin: 0 0 20px 0;
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: ${({theme}) => theme.color.text};
  opacity: 0.45;
`

/* awesomic ref: full-bleed wordmark closing the page, letters filled with the terrain.
   One wide line keeps the fill window inside the dense band at any viewport. */
const Wordmark = styled.h1`
  width: 100%;
  margin: 56px 0 -0.12em 0;
  text-align: center;
  white-space: nowrap;
  text-transform: lowercase;
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  font-size: 11.2vw;
  font-weight: 700;
  /* lifts the terrain out of the page ground the way it reads on a white page */
  filter: brightness(1.28) saturate(1.12);
  /* must contain the glyph box — at line-height 1 the letters overflow the element,
     and background-clip only paints inside the element's own box */
  line-height: 1.26;
  letter-spacing: -0.058em;

  background-image: url('${terrain}');
  background-size: 100% 300%;
  background-position: center 62%;
  background-repeat: no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`

const Lede = styled.p`
  margin: 0;
  max-width: 56ch;
  font-size: 1rem;
  line-height: 1.62;
  opacity: 0.7;
`

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: ${({theme}) => theme.color.text};

  .dim {
    opacity: 0.45;
  }
`

/* --- at a glance --- */
const Facts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 48px;

  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    grid-template-columns: 1fr;
  }
`

const Fact = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 0;
  border-top: 1px solid rgba(127, 127, 127, 0.22);
  font-size: 0.86rem;

  .label {
    opacity: 0.6;
  }
  .value {
    font-weight: 600;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
`

/* --- experience --- */
const WorkGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: start;

  @media screen and (max-width: ${({theme}) => theme.screen.width.desktop}px) {
    grid-template-columns: 1fr;
  }

  ${cardWidth}
`

const Rows = styled.div`
  display: grid;
  gap: 10px;
`

const Row = styled.div`
  ${cardShell}
  ${cardSurface}
  margin: 0;

  &.open .row-body {
    grid-template-rows: 1fr;
  }

  .num {
    font-size: 0.7rem;
    opacity: 0.45;
    font-variant-numeric: tabular-nums;
    flex: none;
  }

  .role {
    flex: 1;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  .chev {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    flex: none;
    display: grid;
    place-items: center;
    font-size: 0.6rem;
    border: 1px solid rgba(127, 127, 127, 0.22);
    opacity: 0.6;
    transition: 0.25s transform ease-out, 0.25s opacity ease-out, 0.25s border-color ease-out;
  }

  &.open .chev {
    transform: rotate(-90deg);
    opacity: 1;
    border-color: rgba(127, 127, 127, 0.5);
    opacity: 1;
  }
`

const RowButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 28px;
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  font-family: inherit;
  text-align: left;

  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    padding: 18px ${({theme}) => theme.screen.padding.mobile}px;
  }
`

const RowBody = styled.div`
  display: grid;
  grid-template-rows: 0fr;
  transition: 0.3s grid-template-rows ease-out;

  & > div {
    overflow: hidden;
  }

  .inner {
    padding: 0 28px 24px 58px;
  }

  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    .inner {
      padding: 0 ${({theme}) => theme.screen.padding.mobile}px 22px;
    }
  }

  .org {
    margin: 0 0 14px 0;
    font-size: 0.68rem;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    font-weight: 600;
    color: ${({theme}) => theme.color.text};
    opacity: 0.5;
  }
  .org .sep {
    opacity: 0.45;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 8px;
  }

  li {
    position: relative;
    padding-left: 18px;
    font-size: 0.86rem;
    line-height: 1.6;
    opacity: 0.75;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 11px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
      opacity: 0.4;
    }
  }
`

const TerrainPanel = styled.div`
  ${cardShell}
  position: relative;
  min-height: 420px;
  margin: 0;
  display: flex;
  align-items: flex-end;
  padding: 0 0 26px;
  background-image: url('${terrain}'), ${({theme}) => theme.card.background};
  background-size: 150% auto, cover;
  background-position: center bottom, center;
  background-repeat: no-repeat, no-repeat;
  box-shadow: ${({theme}) => theme.card.boxShadow};

  @media screen and (max-width: ${({theme}) => theme.screen.width.desktop}px) {
    min-height: 300px;
  }
`

/* Liquid glass. The refraction is an SVG feTurbulence + feDisplacementMap fed into
   backdrop-filter, so the terrain actually bends through the panel rather than just
   blurring. Chromium honours url() in backdrop-filter; everywhere else falls back to
   the plain blur below, which still reads as glass. */
/* the glass is the WebGL bar behind this — so the card itself is type only */
const GlassCard = styled.div`
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  width: 92%;
  flex: none;
  margin: 0 auto;
  border-radius: 16px;
  padding: 22px 26px;
  z-index: 2;
  color: ${({theme}) => (theme.isDark ? '#fff' : '#15150f')};
  text-shadow: ${({theme}) =>
    theme.isDark ? '0 1px 12px rgba(0, 0, 0, 0.5)' : '0 1px 10px rgba(255, 255, 255, 0.65)'};

  .k {
    margin: 0 0 18px 0;
    font-size: 0.6rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-weight: 600;
    opacity: 0.75;
  }

  dl {
    margin: 0;
  }

  .g-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 14px;
    padding: 11px 0;
    border-top: 1px solid ${({theme}) =>
      theme.isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.22)'};
  }
  .g-row:first-of-type {
    border-top: none;
    padding-top: 0;
  }

  dt {
    font-size: 0.8rem;
    opacity: 0.85;
  }
  dd {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
`

/* --- education --- */
const EntryList = styled.div`
  margin-top: 26px;
`

const Entry = styled.div`
  display: grid;
  grid-template-columns: 34px 1fr auto;
  gap: 16px;
  align-items: baseline;
  padding: 20px 0;
  border-top: 1px solid rgba(127, 127, 127, 0.22);

  &:first-child {
    border-top: none;
    padding-top: 0;
  }

  .num {
    font-size: 0.7rem;
    opacity: 0.45;
    font-variant-numeric: tabular-nums;
  }

  h3 {
    margin: 0 0 5px 0;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: ${({theme}) => theme.color.text};
  }

  .degree {
    margin: 0;
    font-size: 0.86rem;
    opacity: 0.7;
  }

  .courses {
    margin: 7px 0 0 0;
    font-size: 0.8rem;
    line-height: 1.6;
    opacity: 0.5;
  }

  .period {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
    color: ${({theme}) => theme.color.text};
    opacity: 0.5;
  }

  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    grid-template-columns: 1fr;
    gap: 6px;

    .period {
      order: -1;
    }
  }
`

/* --- skills --- */
/* ponytail: no `& + &` — this stylis build drops the whole block when it sees it */
const SkillGroup = styled.div`
  margin-top: 24px;
  padding-top: 22px;
  border-top: 1px solid rgba(127, 127, 127, 0.22);

  &:first-of-type {
    margin-top: 26px;
    padding-top: 0;
    border-top: none;
  }

  .group-head {
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin-bottom: 14px;
  }

  .group-head h3 {
    margin: 0;
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-weight: 600;
    opacity: 0.6;
  }

  .group-head .count {
    font-size: 0.62rem;
    opacity: 0.4;
    font-variant-numeric: tabular-nums;
  }
`

const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  @media screen and (max-width: ${({theme}) => theme.screen.width.desktop}px) {
    gap: 10px;
  }
  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    gap: 8px;
  }
`

const SkillCategory = styled.div`
  background: #363636;
  padding: 8px 18px;
  border-radius: 24px;
  box-shadow: ${({theme}) => theme.card.button.boxShadow.primary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  img {
    width: 22px;
    height: 22px;
    object-fit: contain;
    /* Simple Icons ship dark; invert so they read on the pill. */
    filter: brightness(0) invert(1);
    opacity: 0.95;
  }

  .skill-fallback {
    font-size: 0.72rem;
    font-weight: 600;
    color: #eee;
    margin: 0;
    letter-spacing: 0.75px;
    text-transform: uppercase;
    line-height: 1.2;
    text-align: center;
  }

  @media screen and (max-width: ${({theme}) => theme.screen.width.desktop}px) {
    padding: 7px 14px;
    border-radius: 20px;

    img {
      width: 20px;
      height: 20px;
    }
    .skill-fallback {
      font-size: 0.68rem;
    }
  }

  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    padding: 6px 11px;
    border-radius: 16px;

    img {
      width: 18px;
      height: 18px;
    }
    .skill-fallback {
      font-size: 0.62rem;
      letter-spacing: 0.45px;
    }
  }
`

export default {
  name: 'About',
  components: {
    AboutSection,
    TopBar,
    StyledButton,
    ButtonText,
    HeaderCard,
    HeroCopy,
    HeroArt,
    SectionCard,
    FactsCard,
    HeadingCard,
    CardBody,
    Eyebrow,
    Wordmark,
    Lede,
    SectionTitle,
    Facts,
    Fact,
    WorkGrid,
    Rows,
    Row,
    RowButton,
    RowBody,
    TerrainPanel,
    GlassCard,
    EntryList,
    Entry,
    SkillGroup,
    SkillsGrid,
    SkillCategory,
  },
  data: () => ({
    openJob: 0,
    fullName: 'Azzeddine Abouaam',
    lede: 'MEng candidate at INPT Rabat, currently interning at Ortavox Ai on the networking and backend of a sovereign voice AI platform.',
    facts: [
      { label: 'Based in', value: 'Mohammedia, MA' },
      { label: 'Currently', value: 'SWE Intern @ Ortavox Ai' },
      { label: 'Studying', value: 'MEng CS, INPT Rabat' },
      { label: 'Focus', value: 'Backend & distributed systems' }
    ],
    jobs: [
      {
        role: 'Software Engineering Intern',
        org: 'Ortavox Ai',
        period: 'June 2026 — Present',
        points: [
          'Building the sovereign voice AI platform.',
          'Networking and backend systems.'
        ],
        stats: [
          { label: 'Domain', value: 'Voice AI' },
          { label: 'Working on', value: 'Networking' },
          { label: 'Since', value: 'Jun 2026' }
        ]
      },
      {
        role: 'Software Engineering Intern',
        org: 'DELIOR GROUP',
        period: 'July 2025 — August 2025',
        points: [
          'Built a full-stack web application for stock monitoring using MongoDB, FastAPI and React.',
          'Conducted EDA and feature engineering with pandas — lag variables, seasonality indicators and rolling statistics — visualised with seaborn and matplotlib.',
          'Integrated an ML-powered stock-out prediction system with TensorFlow and scikit-learn, reaching 85% accuracy and reducing inventory shortages by 40%.',
          'Deployed on AWS using Docker for scalable infrastructure.'
        ],
        stats: [
          { label: 'Prediction accuracy', value: '85%' },
          { label: 'Shortages reduced', value: '40%' },
          { label: 'Deployed on', value: 'AWS' }
        ]
      }
    ],
    education: [
      {
        school: 'National Institute of Posts and Telecommunications, Rabat',
        degree: 'Engineering degree in Computer Science — Innovation & Project Management Assistance (AMOA)',
        courses: 'Data Analysis · Operational Research · Automation · Time Series · Linear Algebra · Probability · Statistics · Calculus',
        period: '2024 — Now'
      },
      {
        school: 'CPGE — Preparatory Classes for Engineering Schools',
        degree: 'Technology and Industrial Sciences',
        courses: 'Advanced Linear Algebra · Probability · Statistics · Calculus',
        period: '2022 — 2024'
      }
    ],
    skills: [
      {
        name: 'Backend & Data',
        items: [
          { name: 'Java', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/java.svg', isBroken: false },
          { name: 'Spring Boot', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/springboot.svg', isBroken: false },
          { name: 'Python', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/python.svg', isBroken: false },
          { name: 'FastAPI', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/fastapi.svg', isBroken: false },
          { name: 'Kafka', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/apachekafka.svg', isBroken: false },
          { name: 'Redis', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/redis.svg', isBroken: false },
          { name: 'PostgreSQL', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/postgresql.svg', isBroken: false },
          { name: 'MongoDB', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/mongodb.svg', isBroken: false },
          { name: 'MySQL', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/mysql.svg', isBroken: false },
          { name: 'REST', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openapiinitiative.svg', isBroken: false },
          { name: 'GraphQL', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/graphql.svg', isBroken: false },
          { name: 'gRPC', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/grpc.svg', isBroken: false }
        ]
      },
      {
        name: 'Cloud & Infrastructure',
        items: [
          { name: 'AWS', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/amazonaws.svg', isBroken: false },
          { name: 'Docker', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/docker.svg', isBroken: false },
          { name: 'Kubernetes', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/kubernetes.svg', isBroken: false },
          { name: 'Terraform', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/terraform.svg', isBroken: false },
          { name: 'Ansible', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/ansible.svg', isBroken: false },
          { name: 'GitHub Actions', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/githubactions.svg', isBroken: false },
          { name: 'GitLab CI', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/gitlab.svg', isBroken: false },
          { name: 'Microservices', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/apache.svg', isBroken: false },
          { name: 'System Design', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/diagramsdotnet.svg', isBroken: false },
          { name: 'Distributed Systems', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/cilium.svg', isBroken: false }
        ]
      },
      {
        name: 'AI & Machine Learning',
        items: [
          { name: 'scikit-learn', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/scikitlearn.svg', isBroken: false },
          { name: 'TensorFlow', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tensorflow.svg', isBroken: false },
          { name: 'PyTorch', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/pytorch.svg', isBroken: false },
          { name: 'RAG', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openai.svg', isBroken: false },
          { name: 'FAISS', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/meta.svg', isBroken: false },
          { name: 'LangChain', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/langchain.svg', isBroken: false },
          { name: 'LlamaIndex', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/llama.svg', isBroken: false },
          { name: 'Prompt Engineering', logoSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openai.svg', isBroken: false }
        ]
      }
    ]
  }),
  inject: {
    $theme: { default: null }
  },
  watch: {
    // the lens holds a snapshot of the DOM, so a theme flip has to re-capture
    terrainSrc() {
      this.$nextTick(() => setTimeout(this.recaptureGlass, 260))
    }
  },
  mounted() {
    this.initGlass()
  },
  beforeDestroy() {
    if (this.glass && this.glass.destroy) this.glass.destroy()
    window.removeEventListener('resize', this.refreshGlass)
  },
  computed: {
    terrainSrc() {
      const t = this.$theme && this.$theme()
      return t && t.isDark ? '/grass.webp' : '/hills.webp'
    },
    terrainBackdrop() {
      const t = this.$theme && this.$theme()
      return t && t.isDark ? '#0d0d0d' : '#ededed'
    },
    // light theme gets a light pane; dark theme stays optically clear
    glassFrost() {
      const t = this.$theme && this.$theme()
      return t && t.isDark ? 0 : 0.55
    },
    onLightGlass() {
      const t = this.$theme && this.$theme()
      return !(t && t.isDark)
    }
  },
  methods: {
    async initGlass() {
      // liquidGL snapshots the DOM, so it has to run after paint and after the
      // terrain images have decoded, or it refracts a blank panel
      const { default: liquidGL } = await import(/* webpackChunkName: "liquid-gl" */ 'liquid-gl')
      await this.$nextTick()
      if (document.fonts && document.fonts.ready) await document.fonts.ready
      await Promise.all(
        ['/hills.webp', '/grass.webp'].map(
          src =>
            new Promise(res => {
              const img = new Image()
              img.onload = img.onerror = res
              img.src = src
            })
        )
      )
      if (this._isDestroyed) return
      this.glass = liquidGL({
        snapshot: 'body',
        target: '.liquidGL',
        resolution: 2.0,
        refraction: 0.02,
        aberration: 0.04,
        bevelDepth: 0.12,
        bevelWidth: 0.18,
        frost: 0,
        shadow: true,
        specular: true,
        reveal: 'fade',
        tilt: true,
        tiltFactor: 4,
        magnify: 1.02
      })
      window.addEventListener('resize', this.refreshGlass)
    },
    refreshGlass() {
      this.recaptureGlass()
    },
    recaptureGlass() {
      const r = window.__liquidGLRenderer__
      if (r && typeof r.captureSnapshot === 'function') r.captureSnapshot()
    },
    pad(n) {
      return String(n).padStart(2, '0')
    },
    // ponytail: always one open — the terrain panel mirrors the selection, so there is no empty state to design
    toggleJob(index) {
      this.openJob = index
    }
  }
}
</script>
