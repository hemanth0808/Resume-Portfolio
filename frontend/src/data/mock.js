// Mock data for Hemanth Challa's Portfolio
export const portfolioData = {
  personal: {
    name: "Hemanth Challa",
    title: "Full Stack Developer",
    email: "challa.hemanth2001@gmail.com",
    phone: "+91 7036797256",
    linkedin: "https://linkedin.com/in/hemanth-challa",
    github: "https://github.com/hemanthchalla",
    location: "India",
    summary: "Results-driven Full Stack Developer skilled in designing and developing scalable web applications using Next.js, TypeScript, React.js, Node.js, PostgreSQL, MySQL, and Generative AI (Gen AI). Expertise in clean code, performance optimization, API integration, cloud solutions, and chatbot development."
  },

  experience: [
    {
      id: 1,
      company: "Linkfields Innovations",
      position: "Software Engineer 1",
      duration: "Jun 2023 - Present",
      type: "professional",
      featured: true,
      projects: [
        {
          name: "Linkworks",
          description: "Built core features of a SaaS-based HR management platform using RemixJS and Prisma, streamlining hiring and onboarding workflows and reducing manual HR effort by 30%.",
          technologies: ["RemixJS", "Prisma", "TypeScript", "PostgreSQL"],
          achievements: [
            "Created a Graph Builder tool that enables customizable visualizations and boosts data analysis speed by 40%",
            "Integrated an AI Prompt Generator, reducing job form completion time by 60%",
            "Enhanced operational efficiency by automating repetitive HR tasks"
          ],
          link: "#",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
        },
        {
          name: "ENS CMS",
          description: "Designed a multi-service portal for ENS, resulting in a 25% increase in online service inquiries.",
          technologies: ["Umbraco", "APIs", "JavaScript", "CSS"],
          achievements: [
            "Partnered with designers and developers to ensure responsive design on all screen sizes",
            "Integrated Umbraco APIs, ensuring real-time data synchronization and performance optimization",
            "Designed and implemented custom APIs to streamline content management workflows"
          ],
          link: "#",
          image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop"
        },
        {
          name: "Everything Insure",
          description: "Played a key role in building a Vehicle Insurance Management System, automating 80% of backend processes using Azure Functions and Workflows.",
          technologies: ["Azure Functions", "SQL", "C#", "REST APIs"],
          achievements: [
            "Implemented SQL stored procedures to handle 2+ insurance-related workflows efficiently",
            "Enabled users to compare and select policies from 5+ insurance providers",
            "Improved user satisfaction and conversion rates significantly"
          ],
          link: "#",
          image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop"
        }
      ]
    }
  ],

  educationProjects: [
    {
      id: 1,
      name: "Placement Portal Management",
      description: "Facilitated over 500 students in uploading and sharing placement details, enabling staff to monitor student progress and download offer letters.",
      technologies: ["HTML", "CSS", "PHP", "SQL", "PhpMyAdmin"],
      duration: "Feb 2022 - Jun 2022",
      achievements: [
        "Developed an eligibility-list feature, allowing staff to generate lists for specific job openings in seconds",
        "Enhanced data management efficiency by 20%",
        "Designed and implemented PHP sessions to maintain user states, improving application performance by 25%"
      ],
      link: "#",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      name: "Lung Infection Detection and Identification",
      description: "Leveraged the UNET++ segmentation model to identify lung infections in CT scans.",
      technologies: ["HTML", "CSS", "Deep Learning", "Flask", "Python"],
      duration: "Jan 2023 - May 2023",
      achievements: [
        "Processed a dataset of 2,112 CT scans, using 70% for training and 30% for testing",
        "Achieved a model accuracy of 84.67% for 30 epochs, and 87.25% for 100 epochs",
        "Performance measured by the Dice coefficient with reliable infection identification"
      ],
      link: "#",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      name: "Vendor Management System",
      description: "Developed core features to calculate delivery rates, quality rating averages, and vendor response times, reducing monthly reporting time by 20 hours.",
      technologies: ["Django", "Python", "REST API"],
      duration: "Sep 2023 - Dec 2023",
      achievements: [
        "Created a vendor evaluation framework based on quality and fulfillment metrics",
        "Improved supply chain efficiency by 15%",
        "Reduced monthly reporting time by 20 hours"
      ],
      link: "#",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
    }
  ],

  education: {
    institution: "MVGR College of Engineering",
    degree: "Bachelor of Technology in Information Technology",
    duration: "Jul 2019 - May 2023",
    cgpa: "8.73"
  },

  skills: {
    frontend: ["HTML5", "CSS3", "JavaScript (ES6)", "TypeScript", "React.js", "Next.js", "Remix.js", "TailwindCSS", "Redux"],
    backend: ["C", "C#", "Python", "Java", "C++", "Bash Scripting", "Node.js", "Express.js", "Django", "Prisma", "MySQL", "PostgreSQL", "REST APIs"],
    cloud: ["Git", "GitHub", "Docker", "AWS", "Azure", "Ansible", "Version Control Systems", "Umbraco CMS"],
    tools: ["Postman", "Linux", "Debugging", "SCRUM", "Data Structures & Algorithms", "Performance Optimization", "Agile"]
  },

  internships: [
    {
      company: "SmartInternz",
      position: "Salesforce Developer",
      duration: "Apr 2022 - Jun 2022",
      achievements: [
        "Completed two Salesforce super badges and accumulated over 50,000 points on the platform",
        "Designed a Salesforce-based stationery store to manage inventory and daily operations",
        "Built 15+ Lightning components to enhance user interaction and responsiveness"
      ]
    },
    {
      company: "EduSkills", 
      position: "Robotic Process Automation Developer",
      duration: "Oct 2021 - Dec 2021",
      achievements: [
        "Gained hands-on experience in automation, completing 15+ small tasks and developing 20+ automation scripts",
        "Implemented RPA solutions to streamline business processes",
        "Reduced data entry time by 50%, report generation by 40%, and invoice processing by 60%"
      ]
    }
  ],

  achievements: [
    "Finalist in Technological Business Hackathon 2.0 by AIESEC, Oct 2021",
    "Participated in a 24-hour coding sprint at Swecha Freedom Fest (Sprint 2021)",
    "Achieved top 5% rank by earning gold badges in Python and Java on HackerRank"
  ],

  certifications: [
    "Amazon S3 Storage", "DevOps Tools", "Python Programming Essentials", 
    "Cybersecurity Essentials", "HackerRank Python", "Deep Learning AI", 
    "Linux", "AWS", "HTML", "Social Networks", "Salesforce"
  ],

  activities: [
    "Served as an NCC Cadet (2A CTR Unit), holding B and C certificates",
    "Led and collaborated in teamwork exercises and leadership training during CATC and cadre camps",
    "Represented MVGR College in 200m and 4x100m relay at the Aditya Inter-College Sports Meet"
  ]
};

export const designThemes = {
  monochrome: {
    name: "Modern Monochrome",
    active: true
  },
  colorful: {
    name: "Tech Colorful", 
    active: false
  }
};