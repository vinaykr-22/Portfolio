export type LineType = 'text' | 'error' | 'success' | 'link' | 'heading' | 'muted' | 'input'

export interface TerminalLine {
  id: string
  type: LineType
  content: string
  href?: string
}

export interface SkillGroup {
  label: string
  items: string[]
}

export interface Project {
  name: string
  status: 'Live' | 'In Progress' | 'Prototype'
  stack: string[]
  description: string
  url?: string
}

export interface ExperienceItem {
  title: string
  org: string
  period: string
  description: string
}

export interface EducationItem {
  institution: string
  degree: string
  period: string
  score: string
}

export interface Certification {
  name: string
  issuer: string
  date: string
}

export interface Profile {
  name: string
  title: string
  location: string
  email: string
  phone: string
  github: string
  githubUrl: string
  linkedin: string
  linkedinUrl: string
  summary: string
  oneLiner: string
  skillGroups: SkillGroup[]
  projects: Project[]
  experience: ExperienceItem[]
  education: EducationItem[]
  certifications: Certification[]
}

export const profile: Profile = {
  name: 'Vinay Kumar Rao Pikala',
  title: 'Frontend Engineer · React Developer',
  location: 'Hyderabad, Telangana, India',
  email: 'vinaykumarra007@gmail.com',
  github: 'vinaykr-22',
  githubUrl: 'https://github.com/vinaykr-22',
  linkedin: 'Vinay Kumar Rao Pikala',
  linkedinUrl: 'https://www.linkedin.com/in/vinay-kumar-rao-pikala-2b3048361',
  oneLiner:
    'IT undergrad who ships responsive React apps, competes in AI hackathons, and architects cloud-ready solutions.',
  summary: `Driven IT undergraduate (B.Tech, expected 2027) with a strong
foundation in full-stack web development, cloud architecture,
and modern AI tools. I build responsive React applications
and compete in major hackathons.`,
  skillGroups: [
    {
      label: 'Languages',
      items: ['Python', 'Java', 'C++', 'JavaScript', 'HTML/CSS'],
    },
    {
      label: 'Web Development',
      items: ['React', 'Vite', 'React Router', 'CSS Architecture'],
    },
    {
      label: 'Cloud & Databases',
      items: ['AWS (S3, RDS, Lambda)', 'MySQL', 'SQLite', 'MongoDB'],
    },
    {
      label: 'Tools & Concepts',
      items: [
        'Git',
        'GitHub',
        'REST APIs',
        'OOP',
        'Data Structures & Algorithms',
        'Machine Learning (K-Means, DBSCAN)',
      ],
    },
  ],
  projects: [
    {
      name: 'SQL Query Debug Agent',
      status: 'Live',
      stack: ['Python', 'FastAPI', 'Docker', 'SQL', 'RL'],
      description:
        'An OpenEnv-compliant reinforcement-learning environment where an AI agent receives a broken SQL query and must submit a corrected query.',
      url: 'https://github.com/vinaykr-22/SQL-Debut-Agent',
    },
    {
      name: 'ResumeSense AI',
      status: 'Live',
      stack: ['React', 'FastAPI', 'Celery', 'Redis', 'ChromaDB', 'Gemini'],
      description:
        'Intelligent platform that analyzes resumes and semantically matches candidates to job postings using vector embeddings.',
      url: 'https://github.com/vinaykr-22/resumesense-ai',
    },
    {
      name: 'University Bus Live Tracking System',
      status: 'In Progress',
      stack: ['Maps API', 'Real-time tracking', 'Portal integration'],
      description:
        'Real-time location tracking system integrated into the university portal to optimize student commutes.',
    },
    {
      name: 'Movie Watchlist Application',
      status: 'Live',
      stack: ['React', 'Vite', 'React Router', 'State management'],
      description:
        'Multi-page tracking application with dynamic rendering, seamless navigation, and complex state management.',
      url: 'https://github.com/vinaykr-22',
    },
    {
      name: 'React Task Manager',
      status: 'Live',
      stack: ['React', 'CRUD', 'State management'],
      description:
        'Comprehensive CRUD application processing task additions, edits, and deletions with zero latency.',
      url: 'https://github.com/vinaykr-22',
    },
    {
      name: 'ShopX',
      status: 'Prototype',
      stack: ['React', 'E-commerce UI'],
      description: 'Front-end prototype for a dual-sided e-commerce platform.',
    },
    {
      name: 'Temple Tranquil',
      status: 'Prototype',
      stack: ['React', 'Booking UI'],
      description:
        'Centralized aggregator for pilgrimage bookings, streamlining user access across multiple portals.',
    },
  ],
  experience: [
    {
      title: 'AI Development Competitor',
      org: 'IBM BOB Hackathon',
      period: 'May 2026',
      description:
        'Collaborated within the ibm-hackathon-lablab team to architect and deploy AI-driven solutions under strict competition deadlines.',
    },
    {
      title: 'Deep Learning Participant',
      org: 'Meta PyTorch Hackathon',
      period: 'Apr 2026',
      description:
        'Developed and submitted deep validation project work for Phase 2, utilizing advanced PyTorch capabilities.',
    },
    {
      title: 'Cloud Virtual Intern',
      org: 'AWS Academy (via AICTE EduSkills)',
      period: 'Jan 2026 – Mar 2026',
      description:
        'Designed and mapped cloud architectures utilizing core AWS services, focusing on deployment models and scalable systems.',
    },
    {
      title: 'Hackathon Nominee',
      org: 'Smart India Hackathon (SIH) 2024',
      period: 'Sep 2024',
      description:
        'Proposed an online platform connecting content creators with industry professionals looking to hire new talent.',
    },
  ],
  education: [
    {
      institution: 'Malla Reddy University',
      degree: 'B.Tech — Information Technology',
      period: 'Expected 2027',
      score: 'CGPA: 8.6/10',
    },
    {
      institution: 'Narayana Junior College',
      degree: 'Intermediate (MPC)',
      period: 'Graduated 2023',
      score: 'Score: 90%',
    },
  ],
  certifications: [
    {
      name: 'Introduction to Modern AI',
      issuer: 'Cisco Networking Academy',
      date: 'Feb 2026',
    },
    {
      name: 'AWS Solutions Architecture Simulation',
      issuer: 'Forage',
      date: 'Jul 2025',
    },
    {
      name: 'Responsive Web Design',
      issuer: 'freeCodeCamp',
      date: 'Jun 2025',
    },
    {
      name: 'Intro to Algorithms and Analysis',
      issuer: 'NPTEL IIT Kharagpur',
      date: '2025',
    },
  ],
}

export const BANNER = `
 ██╗   ██╗██╗███╗   ██╗ █████╗ ██╗   ██╗
 ██║   ██║██║████╗  ██║██╔══██╗╚██╗ ██╔╝
 ██║   ██║██║██╔██╗ ██║███████║ ╚████╔╝
 ╚██╗ ██╔╝██║██║╚██╗██║██╔══██║  ╚██╔╝
  ╚████╔╝ ██║██║ ╚████║██║  ██║   ██║
   ╚═══╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝   ╚═╝
`.trim()

export const BOOT_LINES = [
  'Initializing portfolio shell...',
  'Loading profile modules... OK',
  'Mounting interactive terminal... OK',
  "Type 'help' to explore. Press Enter to begin.",
]
