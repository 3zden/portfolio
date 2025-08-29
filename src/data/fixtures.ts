export default {
  author: "3zden",
  hero: {
    subtitle: "Software Engineer",
    description: ["Engineering large scale software by day.", "Launching boutique products by night."],
    cta: "See Projects",
  },
  products: {
    featured: [
      {
        name: "Smooth Track",
        medium: "Python · GraphQL · Golang",
        summary: "Augmented and Easy Version Controle ",
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
    tagline: "Azzeddine Abouaam — Mohammedia, Morocco",
    links: [
      {
        name: "Twitter",
        url: "https://twitter.com/3zden",
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