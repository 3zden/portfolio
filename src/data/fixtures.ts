export default {
  author: "3zden",
  hero: {
    subtitle: "AI & ML Eng. intern at DELI'S.",
    description: ["Engineering student who speaks fluent Python and broken English.", "I orchestrate chaotic symphonies of code, sprinkle AI magic on everything."],
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
        title: "AI & ML Engineering Intern",
        company: "DELI'S",
        period: "2023 - Present",
        description: [
          "Developed and deployed machine learning models for predictive analytics and customer behavior analysis.",
          "Collaborated with cross-functional teams to integrate AI solutions into existing product infrastructure.",
          "Optimized model performance and reduced inference time by 40% through efficient algorithm design."
        ],
        technologies: ["Python", "TensorFlow", "PyTorch", "Docker", "AWS", "SQL"]
      },
      {
        title: "Software Development Intern",
        company: "Tech Startup",
        period: "2022 - 2023",
        description: [
          "Built scalable web applications using modern frameworks and cloud technologies.",
          "Implemented RESTful APIs and microservices architecture for improved system performance.",
          "Participated in agile development processes and code reviews."
        ],
        technologies: ["React", "Node.js", "MongoDB", "Docker", "Git"]
      }
    ],
    studies: [
      {
        degree: "Bachelor of Engineering in Computer Science",
        institution: "University of Technology",
        period: "2020 - 2024",
        details: [
          "Specialized in Artificial Intelligence and Machine Learning",
          "GPA: 3.8/4.0",
          "Relevant coursework: Data Structures, Algorithms, Machine Learning, Computer Vision, Database Systems"
        ]
      },
      {
        degree: "High School Diploma",
        institution: "Science and Technology High School",
        period: "2017 - 2020",
        details: [
          "Mathematics and Physics concentration",
          "Member of the Computer Science Club",
          "Participated in regional programming competitions"
        ]
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
