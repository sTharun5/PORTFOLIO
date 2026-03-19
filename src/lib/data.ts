import {
  Workflow, Server, Braces, Database, FileCode, Binary, Cpu, Terminal
} from 'lucide-react';

export const NAV_ITEMS = [
  { label: 'Expertise', id: 'expertise' },
  { label: 'Projects', id: 'projects' },
  { label: 'Credentials', id: 'credentials' },
];

export const PROJECTS = [
  {
    title: 'Smart OD Portal',
    tagline: 'Autonomous AI Approvals',
    url: 'https://automation-nu-dusky.vercel.app',
    github: 'https://github.com/sTharun5/Automation',
    description: 'Zero-touch PDF parsing OCR engine with an intelligent fraud detection pipeline.',
    stack: ['react.js', 'Node.js', 'MySQL', 'Prisma']
  },
  {
    title: 'WhiffAndWrap Architecture',
    tagline: 'Luxury Backend Pipeline',
    github: 'https://github.com/sTharun5/WhiffAndWrap',
    description: 'Resilient data models for complex inventory and secure payment logic.',
    stack: ['JavaScript', 'Node.js', 'APIs']
  },
  {
    title: 'Currency Exchange Engine',
    tagline: 'Real-time Synchronization',
    url: 'https://tharun-cc.netlify.app/',
    github: 'https://github.com/sTharun5/currency-converter',
    description: 'Live continuous external API sync supporting major global currencies.',
    stack: ['JavaScript', 'REST API']
  },
  {
    title: 'Tic-Tac-Toe',
    tagline: 'Minimax Algorithm',
    url: 'https://stharun5.github.io/Tic-Tac-Toe/',
    github: 'https://github.com/sTharun5/Tic-Tac-Toe',
    description: 'Competitive two-player strategy game powered by an unbeatable Minimax AI algorithm.',
    stack: ['HTML', 'CSS', 'JavaScript']
  },
  {
    title: 'Virtual AI Mouse',
    tagline: 'Gesture-Driven Interaction',
    github: 'https://github.com/sTharun5',
    description: 'A touchless computing interface using computer vision to track hand landmarks for real-time cursor control and gesture commands.',
    stack: ['Python', 'OpenCV', 'MediaPipe']
  },
  {
    title: 'Number Plate Detection',
    tagline: 'Automated Traffic Vision',
    github: 'https://github.com/sTharun5',
    description: 'Intelligent surveillance system utilizing deep learning for automatic license plate recognition (ALPR) and character extraction.',
    stack: ['Python', 'YOLOv8', 'EasyOCR']
  }
];

export const CERTS = [
  {
    title: 'Core Java (97%)',
    issuer: 'NPTEL Elite Gold',
    url: 'https://portfolio-stharun5s-projects.vercel.app/nptel.png',
  },
  {
    title: 'C Programming Core',
    issuer: 'Udemy Verified',
    url: 'https://portfolio-stharun5s-projects.vercel.app/udemy.png',
  }
];

export const PRO_SKILLS = [
  { name: 'Problem Solving', icon: Workflow },
  { name: 'Node.js', icon: Server },
  { name: 'Express.js', icon: Braces },
  { name: 'SQL / DB', icon: Database },
  { name: 'Java Core', icon: FileCode },
  { name: 'C Language', icon: Binary },
  { name: 'JavaScript', icon: Cpu },
  { name: 'Git / Vercel', icon: Terminal },
];

export const PERSONAL_TRAITS = [
  'Problem-solving', 'Logical thinking', 'Quick learner', 'Adaptability',
  'Time management', 'Team collaboration', 'Clear communication', 
  'Attention to detail', 'Clean coding', 'Debugging skills', 
  'Self-motivated', 'Ownership mindset'
];
