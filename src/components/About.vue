<template>
  <div>
    <about-section>
      <about-card>
        <card-contents>
          <left-container>
            <div>
              <main-title>About Me</main-title>
              <medium>Software Engineer</medium>
              
              <education-container>
                <section-title>Education</section-title>
                <education-item>
                  <h3>National Institut Of Postes And Telecomunications, Rabat</h3>
                  <span class="period">2024-Now</span>
                  <paragraph><strong>Engineering degree in Computer Science - Innovation & Project Management Assistance (AMOA)</strong></paragraph>
                  <paragraph><em>Highlighted Courses:</em> Data Analysis, Operational Research, Automatisation, Time Series, Linear Algebra, Probability, Statistics, Calculus</paragraph>
                </education-item>
                
                <education-item>
                  <h3>CPGE - Preparatory Classes for Engineering Schools</h3>
                  <span class="period">2022-2024</span>
                  <paragraph><strong>Technology and Industrial Sciences</strong></paragraph>
                  <paragraph><em>Highlighted Courses:</em> Advanced Linear Algebra, Probability, Statistics, Calculus</paragraph>
                </education-item>
              </education-container>

              <experience-container>
                <section-title>Work Experience</section-title>
                <experience-item>
                  <h3>Software Engineer Intern</h3>
                  <span class="period">July 2025 – August 2025</span>
                  <paragraph><strong>DELIOR GROUP</strong></paragraph>
                  <ul>
                    <li>Built a full-stack web application for stock monitoring using MongoDB, Express.js, React and Node.js.</li>
                    <li>Conducted comprehensive EDA and feature engineering using seaborn/matplotlib for data visualization and pandas
                        for creating lag variables, seasonality indicators, and rolling statistics</li>
                    <li>Integrated ML-powered stock-out prediction system using Python, TensorFlow, and scikit-learn, achieving 85% accuracy and reducing inventory shortages by 40%</li>
                    <li>Deployed on AWS using Docker for scalable infrastructure and Git/GitHub for collaborative version control.</li>
                    <li>Developed ARIMA + neural network forecasting pipeline (pandas, NumPy) for automated supply chain optimization</li>
                  </ul>
                </experience-item>
              </experience-container>

              <skills-container>
                <section-title>Technical Skills</section-title>
                <skills-grid>
                  <skill-category><h4>Python</h4></skill-category>
                  <skill-category><h4>SQL</h4></skill-category>
                  <skill-category><h4>R</h4></skill-category>
                  <skill-category><h4>Java</h4></skill-category>
                  <skill-category><h4>C</h4></skill-category>
                  <skill-category><h4>Scikit-Learn</h4></skill-category>
                  <skill-category><h4>NumPy</h4></skill-category>
                  <skill-category><h4>Pandas</h4></skill-category>
                  <skill-category><h4>Matplotlib</h4></skill-category>
                  <skill-category><h4>Selenium</h4></skill-category>
                  <skill-category><h4>SciPy</h4></skill-category>
                  <skill-category><h4>Linux</h4></skill-category>
                  <skill-category><h4>Git/Github</h4></skill-category>
                  <skill-category><h4>Power BI</h4></skill-category>
                  <skill-category><h4>SQL Server</h4></skill-category>
                  <skill-category><h4>PostgreSQL</h4></skill-category>
                  <skill-category><h4>MySQL</h4></skill-category>
                  <skill-category><h4>MongoDB</h4></skill-category>
                </skills-grid>
              </skills-container>
            </div>
            <button-container>
              <back-button @click="$router.push('/')">
                <button-text>Back to Home</button-text>
                <i class="fas fa-arrow-left"></i>
              </back-button>
            </button-container>
          </left-container>
        </card-contents>
      </about-card>
    </about-section>
  </div>
</template>

<script>
import styled from 'vue-styled-components'
import { MainTitle, Paragraph, ButtonText } from './styles/Text.ts'
import light from '../themes/light.ts'

const AboutSection = styled.section`
  padding: 80px 0;
  background: ${({theme}) => theme.color.background};
`

const AboutCard = styled.div`
  width: ${({theme}) => theme.screen.width.desktop}px;
  background: ${({theme}) => theme.card.background};
  box-shadow: ${({theme}) => theme.card.boxShadow};
  border-radius: 20px;
  margin: auto;
  margin-bottom: 80px;
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.desktop}px) {
    width: ${({theme}) => theme.screen.width.tablet}px;
    margin-bottom: 40px;
  }
  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    width: ${({theme}) => theme.screen.width.mobile}px;
    margin-bottom: 40px;
  }
`

const CardContents = styled.div`
  display: flex;
  padding: 64px ${({theme}) => theme.screen.padding.desktop}px;

  @media screen and (max-width: ${({theme}) => theme.screen.width.desktop}px) {
    padding: 40px ${({theme}) => theme.screen.padding.tablet}px;
    width: ${({theme}) => theme.screen.width.tablet - theme.screen.padding.tablet * 2}px;
    margin: 0;
  }

  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    padding: 40px ${({theme}) => theme.screen.padding.mobile}px;
    width: ${({theme}) => theme.screen.width.mobile - theme.screen.padding.mobile * 2}px;
  }
`

const LeftContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

const Medium = styled.div`
  font-weight: 400;
  font-size: 0.75rem;
  letter-spacing: 0.75px;
  margin-bottom: 1.5em;
  opacity: 0.8;
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({theme}) => theme.color.text};
  margin: 0 0 16px 0;
`

const EducationContainer = styled.div`
  margin-bottom: 32px;
  padding: 24px;
  background: ${({theme}) => theme.color.cardBackground || 'rgba(255,255,255,0.02)'};
  border-radius: 12px;
  border: 1px solid ${({theme}) => theme.color.border || 'rgba(255,255,255,0.05)'};
  
  &:first-of-type {
    margin-top: 24px;
  }
`

const ExperienceContainer = styled.div`
  margin-bottom: 32px;
  padding: 24px;
  background: ${({theme}) => theme.color.cardBackground || 'rgba(255,255,255,0.02)'};
  border-radius: 12px;
  border: 1px solid ${({theme}) => theme.color.border || 'rgba(255,255,255,0.05)'};
`

const SkillsContainer = styled.div`
  margin-bottom: 32px;
  padding: 24px;
  background: ${({theme}) => theme.color.cardBackground || 'rgba(255,255,255,0.02)'};
  border-radius: 12px;
  border: 1px solid ${({theme}) => theme.color.border || 'rgba(255,255,255,0.05)'};
`

const EducationItem = styled.div`
  margin-bottom: 24px;
  
  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: ${({theme}) => theme.color.text};
    margin-bottom: 8px;
  }
  
  .period {
    display: inline-block;
    background: ${({theme}) => theme.color.primary || '#363636'};
    color: white;
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 0.75rem;
    letter-spacing: 0.5px;
    margin-bottom: 12px;
  }
`

const ExperienceItem = styled.div`
  margin-bottom: 24px;
  
  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: ${({theme}) => theme.color.text};
    margin-bottom: 8px;
  }
  
  .period {
    display: inline-block;
    background: ${({theme}) => theme.color.primary || '#363636'};
    color: white;
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 0.75rem;
    letter-spacing: 0.5px;
    margin-bottom: 12px;
  }
  
  ul {
    margin: 12px 0;
    padding-left: 20px;
  }
  
  li {
    margin-bottom: 8px;
    color: ${({theme}) => theme.color.text};
    line-height: 1.5;
    font-size: 0.9rem;
  }
`

const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
  margin-bottom: 16px;
`

const SkillCategory = styled.div`
  background: ${({theme}) => theme.color.primary || '#363636'};
  padding: 8px 18px;
  border-radius: 24px;
  box-shadow: ${({theme}) => theme.card.button.boxShadow.primary};
  margin-bottom: 8px;
  margin-right: 6px;
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
  
  paragraph {
    display: none;
  }
`

const ButtonContainer = styled.div`
  margin-top: 32px;
`

const BackButton = styled.button`
  font-size: 0.66rem;
  letter-spacing: 0.75px;
  text-transform: uppercase;
  padding: 0.05rem 1.5rem;
  font-weight: 600;
  border-radius: 24px;
  line-height: 40px;
  color: #eee;
  background: ${({theme}) => theme.color.primary || '#363636'};
  box-shadow: ${({theme}) => theme.card.button.boxShadow.primary};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
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
  }
  &:hover::before {
    opacity: ${({theme}) => theme.card.button.hoverIntensity};
    transition: 0.5s opacity ease-in-out, 0.5s background;
  }
  &:hover {
    transform: translateY(0px);
  }
  
  i {
    margin-left: 8px;
  }
`

export default {
  name: 'About',
  components: {
    AboutSection,
    AboutCard,
    CardContents,
    LeftContainer,
    Medium,
    SectionTitle,
    EducationContainer,
    ExperienceContainer,
    SkillsContainer,
    EducationItem,
    ExperienceItem,
    SkillsGrid,
    SkillCategory,
    ButtonContainer,
    BackButton,
    MainTitle,
    Paragraph,
    ButtonText
  },
  computed: {
    theme() {
      // Use light theme as default since we're not using ThemeProvider wrapper
      return light
    }
  }
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
