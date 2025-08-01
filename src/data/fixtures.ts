export default {
  author: "3zden",
  hero: {
    subtitle: "AI & ML Eng. intern at DELI'S.",
    description: ["Engineering student who speaks fluent Python.", "I orchestrate chaotic symphonies of code."],
    cta: "See Projects",
    resumeUrl: "/resume.pdf",
    aboutUrl: "/about",
  },
  about: {
    summary: [
      "I'm a passionate engineering student with a deep interest in artificial intelligence and machine learning. My journey in tech started with curiosity and has evolved into a commitment to building intelligent solutions that make a difference.",
      "When I'm not coding or studying, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I believe in continuous learning and pushing the boundaries of what's possible with technology."
    ],
    workExperience: [
      {
        title: "Data Scientist Intern",
        company: "DELIOR GROUP",
        period: "July 2025 – August 2025",
        description: [
          "Developed advanced ML models for stock-out prediction using time series analysis and Python",
          "Implemented ARIMA, LSTM, and ensemble methods for demand forecasting",
          "Built automated forecasting system with real-time data processing capabilities",
          "Collaborated with cross-functional teams and created data visualizations using Matplotlib and Seaborn"
        ],
        technologies: ["Python", "ARIMA", "LSTM", "Time Series Analysis", "Matplotlib", "Seaborn", "Machine Learning"]
      }
    ],
    studies: [
      {
        degree: "Engineering degree in Computer Science - Innovation & Project Management Assistance (AMOA)",
        institution: "National Institute of Posts and Telecommunications, Rabat",
        period: "2024 - Present",
        details: [
          "Key courses: Data Analysis, Operational Research, Automation, Time Series, Linear Algebra, Probability, Statistics, Calculus"
        ]
      },
      {
        degree: "CPGE - Classes Préparatoires aux Grandes Écoles",
        institution: "Technology and Industrial Sciences",
        period: "2022 - 2024",
        details: [
          "Key courses: Advanced Linear Algebra, Probability, Statistics, Calculus"
        ]
      }
    ],
    projects: [
      {
        name: "Football Player Value Prediction Model",
        period: "June 2025",
        description: [
          "Built ML system to predict player transfer values using Python, Selenium, Scikit-learn",
          "Scraped 2,000+ player records with automated web scraping pipeline",
          "Implemented ensemble of 7 ML algorithms with cross-validation optimization"
        ],
        technologies: ["Python", "Selenium", "Scikit-learn", "Web Scraping", "Machine Learning", "Ensemble Methods"]
      },
      {
        name: "Interactive Data Visualization Dashboard",
        period: "December 2024",
        description: [
          "Created BI solution connecting SQL Server to Power BI for HR and sales analytics",
          "Developed interactive dashboards with DAX calculations, improving performance by 40%"
        ],
        technologies: ["Power BI", "SQL Server", "DAX", "Data Visualization", "Business Intelligence"]
      },
      {
        name: "Automated Sales Reporting System",
        period: "January 2025",
        description: [
          "Built end-to-end Python pipeline with MySQL integration for real-time sales tracking",
          "Reduced manual tracking by 80% through automation"
        ],
        technologies: ["Python", "MySQL", "Automation", "Data Pipeline", "Real-time Tracking"]
      }
    ]
  },
  products: {
    featured: [
      {
        name: "Predictive models",
        medium: "Python · ML · Golang",
        summary: "The #1 Texting Analysis App",
        copy: [
          "Learn fromillions of your messages, without giving up your data or privacy."
        ],
        links: {
          color: "#363636",
          primary: {
            name: "Discover",
            url: "https://doubletext.me/"
          }
        },
        images: [
          "/doubletext/0.jpg",
          "/doubletext/1.jpg",
          "/doubletext/2.jpg",
          "/doubletext/3.jpg",
        ]
      },
      // {
      //   name: "ClimbList",
      //   medium: "React · Next.js",
      //   summary: "Construction is now in progress.",
      //   copy: [
      //     "Compare and track grades between gyms around the country.",
      //   ],
      //   links: {
      //     color: "#363636",
      //     primary: {
      //       name: "Learn more",
      //       url: "https://climblist.com/"
      //     }
      //   },
      //   images: [
      //     "/climblist/0.jpg",
      //     "/climblist/1.jpg",
      //   ]
      // }
    ],
    // Only supports 0-3 at the moment
    minor: [
      {
        name: "Volunteer Portal",
        description: "Find and track volunteer opportunities.",
        link: {
          name: "Github",
          url: "https://github.com/zendesk/volunteer_portal"
        }
      },
      {
        name: "Weightless VR",
        description: "Short survival experience on an abandoned planet.",
        link: {
          name: "Download",
          url: "https://samzx.itch.io/weightless-vr"
        }
      },
      {
        name: "Soft Portfolio",
        description: "Neumorphic personal portfolio website.",
        link: {
          name: "Github",
          url: "https://github.com/samzx/soft-portfolio"
        }
      }
    ]
  },
  logoSection: {
    title: "As hired by",
    // Only supports 0-3 at the moment
    logos: [
      {
        src: "/logos/unimelb.svg",
        url: "https://unimelb.edu.au/",
        alt: "Unimelb"
      },
      {
        src: "/logos/zendesk.svg",
        url: "https://www.zendesk.com/",
        alt: "Zendesk"
      },
      {
        src: "/logos/cashapp.svg",
        url: "https://cash.app/",
        alt: "Cash App"
      }
  ]
  },
  footer: {
    tagline: "Azzeddine Abouaam — Mohemmadia, Morocco",
    links: [
      {
        name: "Github",
        url: "https://github.com/3zden/",
        fa: "fab fa-github"
      },
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/3zden/",
        fa: "fab fa-linkedin"
      },
      {
        name: "Email",
        url: "mailto:contact@samxie.net",
        fa: "fa fa-envelope"
      },
    ]
  }
}
