export default {
  author: "3zden",
  hero: {
    subtitle: "Data Scientist & Software Engineer",
    description: ["Building intelligent systems by day.", "Crafting innovative solutions by night."],
    cta: "View Projects",
  },
  about: {
    summary: [
      "I'm a passionate Software and Machine Learning Engineer with expertise in data analysis, and full-stack development.",
      "I specialize in developing advanced machine learning models, building data pipelines, and creating intelligent systems that solve real-world problems. My approach combines strong analytical skills with technical implementation to deliver impactful solutions.",
      "When I'm not coding or analyzing data, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the tech community."
    ],
    workExperience: [
      {
        title: "Data Scientist Intern",
        company: "DELIOR GROUP",
        period: "July 2025 - August 2025",
        description: [
          "Developed advanced machine learning models for stock-out prediction using time series analysis and Python, improving inventory forecasting accuracy.",
          "Implemented ARIMA, LSTM, and ensemble methods to analyze historical sales data and predict future demand patterns for optimized inventory management.",
          "Engineered feature extraction pipelines processing large-scale retail datasets using Pandas, NumPy, and Scikit-Learn for enhanced model performance.",
          "Built automated forecasting system with real-time data processing capabilities, reducing manual prediction efforts and enabling proactive stock management.",
          "Collaborated with cross-functional teams to translate business requirements into technical solutions, presenting insights through data visualizations using Matplotlib and Seaborn."
        ],
        technologies: ["Python", "Pandas", "NumPy", "Scikit-Learn", "ARIMA", "LSTM", "Matplotlib", "Seaborn", "Time Series Analysis"]
      }
    ],
    studies: [
      {
        degree: "Engineering degree in Computer Science - Innovation & Project Management Assistance (AMOA)",
        institution: "National Institut Of Postes And Telecomunications, Rabat",
        period: "2024 - Now",
        details: [
          "Specialized in Data Analysis, Operational Research, Automatisation, Time Series, Linear Algebra, Probability, Statistics, Calculus"
        ]
      },
      {
        degree: "Technology and Industrial Sciences",
        institution: "CPGE - Classes préparatoires aux grandes écoles",
        period: "2022 - 2024",
        details: [
          "Advanced Linear Algebra, Probability, Statistics, Calculus"
        ]
      }
    ]
  },
  products: {
    featured: [
      {
        name: "Football Player Value Prediction Model",
        medium: "Python · Selenium · Scikit-learn · Pandas · Seaborn",
        summary: "Machine Learning System for Player Valuation",
        copy: [
          "Developed comprehensive machine learning system to predict football player transfer values, achieving accurate market valuations through advanced data analysis and predictive modeling techniques."
        ],
        links: {
          color: "#363636",
          primary: {
            name: "View Project",
            url: "https://github.com/abouaam/football-player-prediction"
          }
        },
        images: [
          "/football-prediction/0.jpg",
          "/football-prediction/1.jpg",
          "/football-prediction/2.jpg",
          "/football-prediction/3.jpg",
        ]
      },
      {
        name: "Interactive Data Visualization Dashboard",
        medium: "SQL Server · Power BI · DAX",
        summary: "Business Intelligence Solution",
        copy: [
          "Created comprehensive business intelligence solution connecting SQL Server databases to Power BI for real-time HR and sales analytics."
        ],
        links: {
          color: "#363636",
          primary: {
            name: "View Project",
            url: "https://github.com/abouaam/data-dashboard"
          }
        },
        images: [
          "/dashboard/0.jpg",
          "/dashboard/1.jpg",
          "/dashboard/2.jpg",
          "/dashboard/3.jpg",
        ]
      }
    ],
    minor: [
      {
        name: "Automated Sales Reporting System",
        description: "End-to-end data pipeline integrating multiple public APIs for real-time sales tracking and inventory management.",
        link: {
          name: "Github",
          url: "https://github.com/abouaam/sales-reporting-system"
        }
      },
      {
        name: "Stock Prediction Model",
        description: "Advanced machine learning models for stock-out prediction using time series analysis.",
        link: {
          name: "Github",
          url: "https://github.com/abouaam/stock-prediction"
        }
      },
      {
        name: "Data Analysis Portfolio",
        description: "Collection of data analysis projects showcasing statistical modeling and visualization skills.",
        link: {
          name: "Github",
          url: "https://github.com/abouaam/data-analysis-portfolio"
        }
      }
    ]
  },
  logoSection: {
    title: "Worked with",
    logos: [
      {
        src: "/logos/delior.svg",
        url: "https://delior-group.com/",
        alt: "DELIOR GROUP"
      },
      {
        src: "/logos/inpt.svg",
        url: "https://www.inpt.ac.ma/",
        alt: "INPT"
      },
      {
        src: "/logos/cpge.svg",
        url: "https://cpge.ma/",
        alt: "CPGE"
      }
    ]
  },
  footer: {
    tagline: "Abouaam Azzeddine — Mohemmadia, Morocco",
    links: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/abouaam-azzeddine/",
        fa: "fab fa-linkedin"
      },
      {
        name: "Github",
        url: "https://github.com/abouaam",
        fa: "fab fa-github"
      },
      {
        name: "Hugging Face",
        url: "https://huggingface.co/abouaam",
        fa: "fab fa-huggingface"
      },
      {
        name: "Email",
        url: "mailto:abouaam.azzeddine@example.com",
        fa: "fa fa-envelope"
      },
    ]
  }
}
