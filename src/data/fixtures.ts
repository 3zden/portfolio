export default {
  author: "3zden",
  hero: {
    subtitle: "Software Engineering Student",
    description: ["Engineering large scale software by day.", "Launching boutique products by night."],
    cta: "Browse Products",
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
        name: "DoubleText",
        medium: "React · GraphQL · Golang",
        summary: "The #1 Texting Analysis App",
        copy: [
          "Learn from millions of your messages, without giving up your data or privacy."
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
      {
        name: "ClimbList",
        medium: "React · Next.js",
        summary: "Construction is now in progress.",
        copy: [
          "Compare and track grades between gyms around the country.",
        ],
        links: {
          color: "#363636",
          primary: {
            name: "Learn more",
            url: "https://climblist.com/"
          }
        },
        images: [
          "/climblist/0.jpg",
          "/climblist/1.jpg",
        ]
      }
    ],
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
    tagline: "Sam Zhong Sheng Xie — Melbourne, Australia",
    links: [
      {
        name: "Twitter",
        url: "https://twitter.com/samxstudio",
        fa: "fab fa-twitter"
      },
      {
        name: "Medium",
        url: "https://medium.com/@samxie",
        fa: "fab fa-medium"
      },
      {
        name: "Github",
        url: "https://github.com/samzx",
        fa: "fab fa-github"
      },
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/xiesam/",
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
