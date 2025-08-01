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
  padding: 80px 0;
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
  margin-bottom: 80px;
`

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 32px;
  color: ${({theme}) => theme.color.text};
`

const SummarySection = styled.div`
  margin-bottom: 40px;
`

const ExperienceItem = styled.div`
  background: ${({theme}) => theme.card.background};
  box-shadow: ${({theme}) => theme.card.boxShadow};
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    padding: 24px;
  }
`

const ExperienceHeader = styled.div`
  margin-bottom: 16px;
`

const JobTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: ${({theme}) => theme.color.text};
`

const CompanyName = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  margin: 0 0 4px 0;
  color: ${({theme}) => theme.color.text};
  opacity: 0.8;
`

const JobPeriod = styled.span`
  font-size: 0.875rem;
  color: ${({theme}) => theme.color.text};
  opacity: 0.6;
`

const JobDescription = styled.div`
  margin-bottom: 16px;
`

const JobTech = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`

const TechLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({theme}) => theme.color.text};
  opacity: 0.7;
`

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const TechItem = styled.span`
  background: ${({theme}) => theme.card.button.background};
  box-shadow: ${({theme}) => theme.card.button.boxShadow.secondary};
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({theme}) => theme.card.button.text};
`

const EducationItem = styled.div`
  background: ${({theme}) => theme.card.background};
  box-shadow: ${({theme}) => theme.card.boxShadow};
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  
  @media screen and (max-width: ${({theme}) => theme.screen.width.tablet}px) {
    padding: 24px;
  }
`

const EducationHeader = styled.div`
  margin-bottom: 16px;
`

const DegreeTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: ${({theme}) => theme.color.text};
`

const InstitutionName = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  margin: 0 0 4px 0;
  color: ${({theme}) => theme.color.text};
  opacity: 0.8;
`

const StudyPeriod = styled.span`
  font-size: 0.875rem;
  color: ${({theme}) => theme.color.text};
  opacity: 0.6;
`

const EducationDetails = styled.div`
  margin-top: 16px;
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