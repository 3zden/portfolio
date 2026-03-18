<template>
  <about-section>
    <header-card>
      <header-content>
        <main-title>About Me</main-title>
        <medium>I am a passionate software engineer with a strong background in backend development, distributed systems, and cloud-native architectures. I am currently pursuing an MEng in Computer Science at the National Institute of Posts and Telecommunications, where I focus on designing and building scalable, high-performance systems.</medium>
      </header-content>
    </header-card>

    <section-card>
      <section-content>
        <section-title>Education</section-title>
        <education-list>
          <education-item>
            <div class="education-head">
              <h3>National Institut Of Postes And Telecomunications, Rabat</h3>
              <span class="period">2024-Now</span>
            </div>
            <paragraph class="degree"><strong>Engineering degree in Computer Science - Innovation & Project Management Assistance (AMOA)</strong></paragraph>
            <paragraph class="courses"><em>Highlighted Courses: Data Analysis, Operational Research, Automatisation, Time Series, Linear Algebra, Probability, Statistics, Calculus</em></paragraph>
          </education-item>

          <education-item>
            <div class="education-head">
              <h3>CPGE - Preparatory Classes for Engineering Schools</h3>
              <span class="period">2022-2024</span>
            </div>
            <paragraph class="degree"><strong>Technology and Industrial Sciences</strong></paragraph>
            <paragraph class="courses"><em>Highlighted Courses: Advanced Linear Algebra, Probability, Statistics, Calculus</em></paragraph>
          </education-item>
        </education-list>
      </section-content>
    </section-card>

    <section-card>
      <section-content>
        <section-title>Work Experience</section-title>
        <experience-list>
          <experience-item>
            <div class="experience-head">
              <div>
                <h3>Software Engineer Intern</h3>
                <paragraph class="company"><strong>DELIOR GROUP</strong></paragraph>
              </div>
              <span class="period">July 2025 - August 2025</span>
            </div>
            <ul>
              <li>Built a full-stack web application for stock monitoring using MongoDB, Express.js, React and Node.js.</li>
              <li>Conducted comprehensive EDA and feature engineering using seaborn/matplotlib for data visualization and pandas for creating lag variables, seasonality indicators, and rolling statistics.</li>
              <li>Integrated an ML-powered stock-out prediction system using Python, TensorFlow, and scikit-learn, achieving 85% accuracy and reducing inventory shortages by 40%.</li>
              <li>Deployed on AWS using Docker for scalable infrastructure and Git/GitHub for collaborative version control.</li>
              <li>Developed an ARIMA + neural network forecasting pipeline (pandas, NumPy) for automated supply chain optimization.</li>
            </ul>
          </experience-item>
        </experience-list>
      </section-content>
    </section-card>

    <section-card>
      <section-content>
        <section-title>Technical Skills</section-title>
        <!-- <skills-note>Core technologies I use to design, build, and operate production systems.</skills-note> -->
        <skills-grid>
          <skill-category><h4>Java</h4></skill-category>
          <skill-category><h4>Python</h4></skill-category>
          <skill-category><h4>Spring Boot</h4></skill-category>
          <skill-category><h4>React</h4></skill-category>
          <skill-category><h4>Node.js</h4></skill-category>
          <skill-category><h4>Express.js</h4></skill-category>
          <skill-category><h4>Django</h4></skill-category>
          <skill-category><h4>AWS</h4></skill-category>
          <skill-category><h4>Docker</h4></skill-category>
          <skill-category><h4>Kubernetes</h4></skill-category>
          <skill-category><h4>Terraform</h4></skill-category>
          <skill-category><h4>Ansible</h4></skill-category>
          <skill-category><h4>GitHub Actions</h4></skill-category>
          <skill-category><h4>GitLab CI</h4></skill-category>
          <skill-category><h4>TensorFlow</h4></skill-category>
          <skill-category><h4>Ollama</h4></skill-category>
          <skill-category><h4>scikit-learn</h4></skill-category>
          <skill-category><h4>pandas</h4></skill-category>
          <skill-category><h4>NumPy</h4></skill-category>
          <skill-category><h4>seaborn</h4></skill-category>
          <skill-category><h4>Linux</h4></skill-category>
          <skill-category><h4>Git/Github</h4></skill-category>
          <skill-category><h4>Redis</h4></skill-category>
          <skill-category><h4>SQL Server</h4></skill-category>
          <skill-category><h4>PostgreSQL</h4></skill-category>
          <skill-category><h4>MySQL</h4></skill-category>
          <skill-category><h4>MongoDB</h4></skill-category>
        </skills-grid>
      </section-content>
    </section-card>

    <button-card>
      <back-button @click="$router.push('/')">
        <button-text>Back to Home</button-text>
        <i class="fas fa-arrow-left"></i>
      </back-button>
    </button-card>
  </about-section>
</template>

<script>
import styled from 'vue-styled-components'
import { MainTitle, Paragraph, ButtonText } from './styles/Text.ts'

const AboutSection = styled.section`
  padding: 60px 0;
  background: ${({theme}) => theme.color.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  @media screen and (max-width: ${({theme}) => theme.screen.width.desktop}px) {
    padding: 60px 0;
    gap: 32px;
  }
  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    padding: 40px 0;
    gap: 24px;
  }
`

const HeaderCard = styled.div`
  width: ${({theme}) => theme.screen.width.desktop}px;
  background: ${({theme}) => theme.card.background};
  box-shadow: ${({theme}) => theme.card.boxShadow};
  border-radius: 20px;
  margin: auto;
  padding: 30px 0;
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.desktop}px) {
    width: ${({theme}) => theme.screen.width.tablet}px;
  }
  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    width: ${({theme}) => theme.screen.width.mobile}px;
  }
`

const HeaderContent = styled.div`
  padding: 04px ${({theme}) => theme.screen.padding.desktop}px;

  @media screen and (max-width: ${({theme}) => theme.screen.width.desktop}px) {
    padding: 00px ${({theme}) => theme.screen.padding.tablet}px;
  }
  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    padding: 0px ${({theme}) => theme.screen.padding.mobile}px;
  }
`

const SectionCard = styled.div`
  width: ${({theme}) => theme.screen.width.desktop}px;
  background: ${({theme}) => theme.card.background};
  box-shadow: ${({theme}) => theme.card.boxShadow};
  border-radius: 20px;
  margin: auto;
  padding: 40px 0;
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.desktop}px) {
    width: ${({theme}) => theme.screen.width.tablet}px;
  }
  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    width: ${({theme}) => theme.screen.width.mobile}px;
  }
`

const SectionContent = styled.div`
  padding: 52px ${({theme}) => theme.screen.padding.desktop}px;

  @media screen and (max-width: ${({theme}) => theme.screen.width.desktop}px) {
    padding: 44px ${({theme}) => theme.screen.padding.tablet}px;
  }
  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    padding: 36px ${({theme}) => theme.screen.padding.mobile}px;
  }
`

const Medium = styled.div`
  font-size: ${(props) => props.size === 's' ? "0.8888rem" : "1.0rem"};
  margin: 0 0 0.5em 0;
  line-height: 1.5;
  font-weight: 400;
  opacity: 0.7;
`


const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({theme}) => theme.color.text};
  margin: 0 0 32px 0;
`

const EducationList = styled.div`
  display: grid;
  gap: 16px;
`

const EducationItem = styled.div`
  padding: 0 0 16px 0;
  border-bottom: 1px solid rgba(127, 127, 127, 0.22);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .education-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 10px;
  }

  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    .education-head {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  
  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: ${({theme}) => theme.color.text};
    margin: 0;
  }
  
  .period {
    display: inline-block;
    color: ${({theme}) => theme.color.primary || '#363636'};
    font-size: 0.75rem;
    letter-spacing: 0.5px;
    white-space: nowrap;
    font-weight: 500;
    opacity: 1;
  }

  .degree {
    margin: 0 0 6px 0;
    font-size: 0.95rem;
    opacity: 0.92;
  }

  .courses {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.6;
    opacity: 0.9;
  }

  em {
    opacity: 0.8;
  }
`

const ExperienceItem = styled.div`
  padding: 0 0 16px 0;
  border-bottom: 1px solid rgba(127, 127, 127, 0.22);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .experience-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 14px;
  }

  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    .experience-head {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: ${({theme}) => theme.color.text};
    margin: 0;
  }

  .company {
    margin: 6px 0 0 0;
    font-size: 0.9rem;
    letter-spacing: 0.25px;
    opacity: 0.9;
  }
  
  .period {
    display: inline-block;
    color: ${({theme}) => theme.color.primary || '#363636'};
    font-size: 0.75rem;
    letter-spacing: 0.5px;
    white-space: nowrap;
    font-weight: 500;
    opacity: 0.8;
  }
  
  ul {
    margin: 14px 0 0 0;
    padding: 0;
    list-style: none;
  }
  
  li {
    margin-bottom: 10px;
    color: ${({theme}) => theme.color.text};
    line-height: 1.6;
    font-size: 0.9rem;
    opacity: 0.8;
    position: relative;
    padding-left: 18px;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 10px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: ${({theme}) => theme.color.primary || '#363636'};
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`

const ExperienceList = styled.div`
  display: grid;
  gap: 16px;
`

// const SkillsNote = styled.div`
//   margin: 0 0 16px 0;
//   color: ${({theme}) => theme.color.text};
//   opacity: 0.75;
//   font-size: 0.92rem;
//   line-height: 1.5;
// `

const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`

const SkillCategory = styled.div`
  background: ${({theme}) => theme.color.primary || '#363636'};
  padding: 8px 18px;
  border-radius: 24px;
  box-shadow: ${({theme}) => theme.card.button.boxShadow.primary};
  display: inline-block;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  h4 {
    font-size: 0.75rem;
    font-weight: 600;
    color: #eee;
    margin: 0;
    letter-spacing: 0.75px;
    text-transform: uppercase;
  }
`

const ButtonCard = styled.div`
  width: ${({theme}) => theme.screen.width.desktop}px;
  margin: auto;
  display: flex;
  justify-content: center;
  padding: 12px ${({theme}) => theme.screen.padding.desktop}px;
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.desktop}px) {
    width: ${({theme}) => theme.screen.width.tablet}px;
  }
  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    width: ${({theme}) => theme.screen.width.mobile}px;
  }
`

const BackButton = styled.button`
  font-size: 0.66rem;
  letter-spacing: 0.75px;
  text-transform: uppercase;
  padding: 5px 15px;
  font-weight: 600;
  border-radius: 24px;
  line-height: 40px;
  color: #eee;
  background: ${({theme}) => theme.color.primary || '#363636'};
  box-shadow: ${({theme}) => theme.card.button.boxShadow.primary};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &::before {
    content: "";
    height: 100%;
    width: 100%;
    background: ${({theme}) => theme.card.button.boxShadow.hover};
    mix-blend-mode: luminosity;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 24px;
    animation: none;
    opacity: 0;
    transition: 0.3s opacity ease-in-out, 0.3s background;
    padding: 12px;
  }
  &:hover::before {
    opacity: ${({theme}) => theme.card.button.hoverIntensity};
    transition: 0.5s opacity ease-in-out, 0.5s background;
  }
  &:hover {
    transform: translateY(-2px);
  }
  
  i {
    margin-left: 8px;
  }
`

export default {
  name: 'About',
  components: {
    AboutSection,
    HeaderCard,
    HeaderContent,
    SectionCard,
    SectionContent,
    Medium,
    SectionTitle,
    EducationList,
    EducationItem,
    ExperienceList,
    ExperienceItem,
    // SkillsNote,
    SkillsGrid,
    SkillCategory,
    ButtonCard,
    BackButton,
    MainTitle,
    Paragraph,
    ButtonText
  }
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
