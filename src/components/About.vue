<template>
  <about-container>
    <about-content>
      <section-container>
        <main-title>About Me</main-title>
        <summary-section>
          <paragraph v-for="(line, index) in summary" :key="index">{{line}}</paragraph>
        </summary-section>
      </section-container>

      <section-container>
        <section-title>Work Experience</section-title>
        <experience-item v-for="(job, index) in workExperience" :key="index">
          <experience-header>
            <job-title>{{job.title}}</job-title>
            <company-name>{{job.company}}</company-name>
            <job-period>{{job.period}}</job-period>
          </experience-header>
          <job-description>
            <paragraph v-for="(description, descIndex) in job.description" :key="descIndex">{{description}}</paragraph>
          </job-description>
          <job-tech v-if="job.technologies">
            <tech-label>Technologies:</tech-label>
            <tech-list>
              <tech-item v-for="(tech, techIndex) in job.technologies" :key="techIndex">{{tech}}</tech-item>
            </tech-list>
          </job-tech>
        </experience-item>
      </section-container>

      <section-container>
        <section-title>Education</section-title>
        <education-item v-for="(study, index) in studies" :key="index">
          <education-header>
            <degree-title>{{study.degree}}</degree-title>
            <institution-name>{{study.institution}}</institution-name>
            <study-period>{{study.period}}</study-period>
          </education-header>
          <education-details v-if="study.details">
            <paragraph v-for="(detail, detailIndex) in study.details" :key="detailIndex">{{detail}}</paragraph>
          </education-details>
        </education-item>
      </section-container>
    </about-content>
  </about-container>
</template>

<script>
import styled from 'vue-styled-components'
import { MainTitle, Paragraph } from './styles/Text.ts'

const AboutContainer = styled.div`
  min-height: 100vh;
  background: ${({theme}) => theme.color.background};
  padding: 100px 0 100px 0;
`

const AboutContent = styled.div`
  max-width: ${({theme}) => theme.screen.width.desktop}px;
  margin: auto;
  padding: 0 ${({theme}) => theme.screen.padding.desktop}px;
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.desktop}px) {
    padding: 0 ${({theme}) => theme.screen.padding.tablet}px;
  }
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    padding: 0 ${({theme}) => theme.screen.padding.mobile}px;
  }
`

const SectionContainer = styled.div`
  margin-bottom: 100px;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 40px;
  color: ${({theme}) => theme.color.text};
  letter-spacing: -0.02em;
  line-height: 1.2;
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    font-size: 2rem;
    margin-bottom: 32px;
  }
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.mobile}px) {
    font-size: 1.75rem;
    margin-bottom: 28px;
  }
`

const SummarySection = styled.div`
  margin-bottom: 60px;
`

const ExperienceItem = styled.div`
  background: ${({theme}) => theme.card.background};
  box-shadow: ${({theme}) => theme.card.boxShadow};
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 32px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.08), inset 1px 1px 2px hsla(0,0%,100%,0.5);
  }
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    padding: 32px;
    margin-bottom: 24px;
  }
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.mobile}px) {
    padding: 28px;
    margin-bottom: 20px;
  }
`

const ExperienceHeader = styled.div`
  margin-bottom: 20px;
`

const JobTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: ${({theme}) => theme.color.text};
  letter-spacing: -0.01em;
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.mobile}px) {
    font-size: 1.3rem;
  }
`

const CompanyName = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 6px 0;
  color: ${({theme}) => theme.color.text};
  opacity: 0.85;
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.mobile}px) {
    font-size: 1rem;
  }
`

const JobPeriod = styled.span`
  font-size: 0.9rem;
  color: ${({theme}) => theme.color.text};
  opacity: 0.7;
  font-weight: 500;
`

const JobDescription = styled.div`
  margin-bottom: 20px;
`

const JobTech = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`

const TechLabel = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({theme}) => theme.color.text};
  opacity: 0.8;
`

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

const TechItem = styled.span`
  background: ${({theme}) => theme.card.button.background};
  box-shadow: ${({theme}) => theme.card.button.boxShadow.secondary};
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({theme}) => theme.card.button.text};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1), inset 1px 1px 2px hsla(0,0%,100%,0.5);
  }
`

const EducationItem = styled.div`
  background: ${({theme}) => theme.card.background};
  box-shadow: ${({theme}) => theme.card.boxShadow};
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 32px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.08), inset 1px 1px 2px hsla(0,0%,100%,0.5);
  }
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    padding: 32px;
    margin-bottom: 24px;
  }
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.mobile}px) {
    padding: 28px;
    margin-bottom: 20px;
  }
`

const EducationHeader = styled.div`
  margin-bottom: 20px;
`

const DegreeTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: ${({theme}) => theme.color.text};
  letter-spacing: -0.01em;
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.mobile}px) {
    font-size: 1.3rem;
  }
`

const InstitutionName = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 6px 0;
  color: ${({theme}) => theme.color.text};
  opacity: 0.85;
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.mobile}px) {
    font-size: 1rem;
  }
`

const StudyPeriod = styled.span`
  font-size: 0.9rem;
  color: ${({theme}) => theme.color.text};
  opacity: 0.7;
  font-weight: 500;
`

const EducationDetails = styled.div`
  margin-top: 20px;
`

export default {
  name: 'About',
  components: {
    AboutContainer,
    AboutContent,
    SectionContainer,
    SectionTitle,
    SummarySection,
    ExperienceItem,
    ExperienceHeader,
    JobTitle,
    CompanyName,
    JobPeriod,
    JobDescription,
    JobTech,
    TechLabel,
    TechList,
    TechItem,
    EducationItem,
    EducationHeader,
    DegreeTitle,
    InstitutionName,
    StudyPeriod,
    EducationDetails,
    MainTitle,
    Paragraph
  },
  props: {
    summary: {
      type: Array,
      default: () => []
    },
    workExperience: {
      type: Array,
      default: () => []
    },
    studies: {
      type: Array,
      default: () => []
    }
  }
}
</script> 