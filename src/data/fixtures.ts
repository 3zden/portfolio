export default {
  author: "3zden",
  hero: {
    subtitle: "SWE Intern @ Ortavox Ai",
    description: ["Engineering software that grows with purpose.", "Quality code built with clarity first."],
        cta: [
      {
        text: "See Projects",
        link: "#products"
      },
      {
        text: "About",
        link: "#/about"
      }
    ],
  },
  products: {
    featured: [
      {
        name: "CloCost",
        medium: "Spring Boot · React · Multi-Cloud",
        summary: "Cloud Cost Analysis Platform.",
        copy: [
            "Real-time multi-cloud cost analytics and optimization platform.",
        ],
        links: {
          color: "#363636",
          primary: { 
            name: "Discover",
            url: "https://3zden.github.io/CloCost/"
          }
        },
        images: [
          "/clocost/0.png",
          // "/clocost/1.jpg",
          // "/clocost/2.jpg",
          // "/clocost/3.jpg",
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
        name: "more3zdenAI",
        description: "AI assistant that answers questions about me.",
        link: {
          name: "Github",
          url: "https://github.com/3zden/more3zdenAI"
        }
      },
      {
        name: "QueueCare",
        description: "Hospital Queue Management System.",
        link: {
          name: "Github",
          url: "https://github.com/3zden/QueueCare"
        }
      },
      {
        name: "Portfolio",
        description: "Neumorphic personal portfolio website.",
        link: {
          name: "Github",
          url: "https://github.com/3zden/portfolio"
        }
      }
    ]
  },
  logoSection: {
    title: "Others",
    // Only supports 0-3 at the moment
    logos: [
      {
        src: "/logos/leetcode.svg",
        url: "https://leetcode.com/3zden/",
        alt: "LeetCode"
      },
      {
        src: "/logos/spotify.svg",
        url: "https://open.spotify.com/user/31cdrl5f2jy4xnixo4ikloqf2sva?si=e4fc45cf12984b9c",
        alt: "Spotify"
      }
  ]
  },
  footer: {
    tagline: "Azzeddine Abouaam — Mohammedia, Morocco",
    links: [
      {
        name: "Twitter",
        url: "https://x.com/3zden_",
        fa: "fab fa-twitter" // Code from: https://fontawesome.com/v5/icons/twitter?s=brands
      },
      {
        name: "Medium",
        url: "https://medium.com/@3zden",
        fa: "fab fa-medium"
      },
      {
        name: "Github",
        url: "https://github.com/3zden",
        fa: "fab fa-github"
      },
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/3zden/",
        fa: "fab fa-linkedin"
      },
      {
        name: "Email",
        url: "mailto:azeddineabouaam1@gmail.com",
        fa: "fa fa-envelope"
      },
    ]
  }
}