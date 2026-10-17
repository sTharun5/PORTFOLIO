import {
  Database,
  Terminal,
  BrainCircuit,
  Cloud
} from 'lucide-react';

export const PERSONAL_INFO = {
  name: 'Tharun S',
  role: 'Data Engineering Intern',
  company: 'Aptean (TLX)',
  tagline: 'Architecting Distributed Data Synchronization & Enterprise GenAI Systems',
  email: 'stharun612@gmail.com',
  phone: '+91 7418774959',
  phoneFormatted: '+91 74187 74959',
  location: 'Tamil Nadu & Karnataka, India',
  availability: 'Available for Full-Time Roles (Class of 2026)',
  github: 'https://github.com/sTharun5',
  linkedin: 'https://linkedin.com/in/tharuntech',
  leetcode: 'https://leetcode.com/u/user3651Q/',
  cgpa: '8.95',
  maxCgpa: '10.0',
  summary: `Data Engineering Intern at Aptean (TLX) engineering high-performance SQL Server and T-SQL synchronization stored procedures, database views, and secure multi-company access architectures. Actively builds production GenAI data foundations, Polaris/Visualizer scenario engines, and local Model Context Protocol (MCP) servers exposing logistics shipment data to autonomous AI audit agents.`
};

export const NAV_ITEMS = [
  { label: 'Experience', id: 'experience' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Leadership & Certs', id: 'credentials' },
  { label: 'Education', id: 'education' },
  { label: 'Contact', id: 'contact' }
];

export const EXPERIENCE = [
  {
    role: 'Data Engineering Intern',
    company: 'Aptean (TLX)',
    location: 'Bangalore, India',
    period: '2026 – Present',
    type: 'Internship • Active Position',
    department: 'Transportation & Logistics (TLX)',
    description:
      'Working on core enterprise database pipelines using SQL Server, T-SQL stored procedures, and multi-company architectures for daily data synchronization. Also establishing GenAI data foundations, Polaris scenario models, and Model Context Protocol (MCP) servers for autonomous freight audit agents.',
    impactAreas: [
      {
        title: 'T-SQL Data Synchronization & Multi-Company Architecture',
        points: [
          'Developed and tested optimized T-SQL stored procedures for automated daily data synchronization across enterprise datasets.',
          'Engineered database structures supporting company-level data syncing, COID/client identifiers, and rigorous multi-tenant data access boundaries in shared environments.'
        ]
      },
      {
        title: 'Enterprise GenAI Views & Polaris Scenarios',
        points: [
          'Created GenAI views for Transportation Management System (TMS) and Freight Audit & Payment (FAP) datasets, harmonizing shipment and mapping data, aligning column names, data types, and business definitions for downstream analytics.',
          'Built and tested Visualizer/Polaris GenAI scenarios for lane analysis, shipment data, carrier scorecards, and routing economics, configuring scenario relationships, business rules, and prompt-to-view semantic alignment.'
        ]
      },
      {
        title: 'Model Context Protocol (MCP) & Autonomous AI Agents',
        points: [
          'Built a local MCP (Model Context Protocol) server to securely expose TMS/FAP shipment data to AI agent tools, advancing toward production integration for the IP Liability Audit agent.',
          'Contributed to an AI freight-audit workflow combining OCR to extract freight-document details and validate payment information against SQL Server shipment records, exploring workload grouping to maximize throughput.'
        ]
      },
      {
        title: 'SQL Performance Engineering & Data Quality',
        points: [
          'Investigated and resolved complex SQL performance and data-quality bottlenecks, including stored-procedure execution plan tuning, temporary-table/indexing approaches, least-cost pricesheet logic, and mismatched view columns.'
        ]
      }
    ],
    skills: [
      'SQL Server',
      'T-SQL',
      'Stored Procedures',
      'Model Context Protocol (MCP)',
      'GenAI Scenarios',
      'Microsoft Fabric',
      'Database Views',
      'Query Optimization',
      'Indexing',
      'Data Synchronization',
      'RapidOCR',
      'Data Modeling'
    ]
  }
];

export const SKILL_CATEGORIES = [
  {
    title: 'Data Engineering & SQL',
    icon: Database,
    color: 'from-indigo-500/20 to-sky-500/20',
    borderColor: 'border-indigo-500/30',
    accentColor: 'text-indigo-400',
    description: 'Enterprise relational data modeling, query optimization, and synchronization.',
    skills: [
      { name: 'SQL Server', level: 'Advanced' },
      { name: 'T-SQL', level: 'Advanced' },
      { name: 'Stored Procedures', level: 'Advanced' },
      { name: 'Database Views', level: 'Advanced' },
      { name: 'Data Synchronization', level: 'Advanced' },
      { name: 'Complex Joins & Subqueries', level: 'Advanced' },
      { name: 'Indexing & B-Trees', level: 'Proficient' },
      { name: 'Query Optimization', level: 'Proficient' },
      { name: 'Data Validation & Cleansing', level: 'Advanced' }
    ]
  },
  {
    title: 'GenAI & Agentic Systems',
    icon: BrainCircuit,
    color: 'from-sky-500/20 to-emerald-500/20',
    borderColor: 'border-sky-500/30',
    accentColor: 'text-sky-400',
    description: 'Autonomous agent interfaces, semantic prompt grounding, and OCR models.',
    skills: [
      { name: 'Model Context Protocol (MCP)', level: 'Specialist' },
      { name: 'AI Agents Architecture', level: 'Advanced' },
      { name: 'GenAI Scenarios & Workflows', level: 'Advanced' },
      { name: 'Prompt & Rule Design', level: 'Advanced' },
      { name: 'RapidOCR & Computer Vision', level: 'Proficient' },
      { name: 'ONNX Runtime', level: 'Proficient' }
    ]
  },
  {
    title: 'Data Platforms & Cloud',
    icon: Cloud,
    color: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'border-emerald-500/30',
    accentColor: 'text-emerald-400',
    description: 'Modern lakehouse platforms, cloud compute, and managed relational stores.',
    skills: [
      { name: 'Microsoft Fabric', level: 'Proficient' },
      { name: 'AWS EC2', level: 'Proficient' },
      { name: 'AWS S3', level: 'Proficient' },
      { name: 'AWS RDS MySQL', level: 'Proficient' },
      { name: 'MySQL Engine', level: 'Advanced' },
      { name: 'Multi-Tenant Isolation (COID)', level: 'Advanced' }
    ]
  },
  {
    title: 'Programming & Core CS',
    icon: Terminal,
    color: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'border-amber-500/30',
    accentColor: 'text-amber-400',
    description: 'System software development, algorithms, and full-stack backend APIs.',
    skills: [
      { name: 'Python', level: 'Advanced' },
      { name: 'Java (Core & OOP)', level: 'Elite (Top 1%)' },
      { name: 'JDBC Persistence', level: 'Advanced' },
      { name: 'Node.js & Express.js', level: 'Proficient' },
      { name: 'React.js & Next.js', level: 'Proficient' },
      { name: 'Git & GitHub Workflows', level: 'Advanced' },
      { name: 'C Language', level: 'Certified' }
    ]
  }
];

export const FEATURED_PROJECTS = [
  {
    title: 'AI-Powered Freight Audit Agent',
    tagline: 'Autonomous Multimodal Document Validation & MCP Integration',
    category: 'GenAI & Data Engineering',
    isPrimaryResume: true,
    description:
      'Engineered an intelligent enterprise freight audit pipeline that extracts document invoice data using RapidOCR on ONNX Runtime and cross-validates payment types against live shipment datasets in SQL Server.',
    architecture:
      'Client Documents -> RapidOCR (ONNX) -> Local MCP Server -> SQL Server (TMS/FAP Data) -> IP Liability AI Audit Agent',
    highlights: [
      'Built a local MCP (Model Context Protocol) server exposing shipment and pricing tables securely to autonomous AI audit agents.',
      'Employed RapidOCR running on ONNX Runtime to perform high-accuracy character recognition on freight invoices and bills of lading.',
      'Explored workload grouping algorithms to classify and batch incoming shipments by audit workload, reducing processing latency.'
    ],
    stack: ['Python', 'RapidOCR', 'ONNX Runtime', 'MCP', 'SQL Server', 'T-SQL'],
    github: 'https://github.com/sTharun5',
    status: 'Aptean Enterprise Research'
  },
  {
    title: 'Cloud-Based AI Vehicle Number Plate Recognition',
    tagline: 'Distributed Real-Time ALPR Pipeline on AWS Cloud',
    category: 'Computer Vision & Cloud Architecture',
    isPrimaryResume: true,
    description:
      'Developed an end-to-end automated license plate recognition (ALPR) system deployed on AWS cloud infrastructure, achieving 92%+ test accuracy across varied camera angles and illumination conditions.',
    architecture:
      'Edge Camera Streams -> AWS S3 Storage -> OpenCV Preprocessing -> EasyOCR Text Extraction -> AWS EC2 Compute -> AWS RDS MySQL',
    highlights: [
      'Constructed complete computer vision pipeline using OpenCV for bilateral filtering, edge detection, and morphological localization.',
      'Extracted alphanumeric characters using EasyOCR and persisted verified vehicle logs into AWS RDS MySQL.',
      'Orchestrated cloud deployment on AWS EC2 instances connected to AWS S3 buckets for high-throughput image ingestion.'
    ],
    stack: ['Python', 'OpenCV', 'EasyOCR', 'AWS EC2', 'AWS S3', 'RDS MySQL'],
    github: 'https://github.com/sTharun5/number-plate-detection',
    metrics: '92%+ Recognition Accuracy'
  },
  {
    title: 'OD Approval Ecosystem',
    tagline: 'AI-Assisted Academic Workflow with Fraud Detection',
    category: 'Full-Stack & Intelligent Workflows',
    isPrimaryResume: true,
    description:
      'Designed and planned an intelligent on-duty approval ecosystem incorporating automated PDF parsing, OCR verification, fraud detection checks, and multi-tier role-based approval routing.',
    architecture:
      'React UI -> Express.js API Gateway -> Python AI OCR & Fraud Engine -> MySQL Database Storage',
    highlights: [
      'Architected an automated document verification concept using Python OCR to validate certificates and flag manipulated documents.',
      'Engineered a scalable multi-role workflow with distinct permissions for students, faculty advisors, department heads, and deans.',
      'Built high-performance REST APIs in Node.js/Express.js with transactional MySQL schema design.'
    ],
    stack: ['React', 'Node.js', 'Express.js', 'Python', 'MySQL', 'Prisma'],
    github: 'https://github.com/sTharun5/Automation',
    url: 'https://automation-nu-dusky.vercel.app'
  },
  {
    title: 'Railway Reservation System',
    tagline: 'ACID-Compliant Concurrent Booking & Manifest Engine',
    category: 'Enterprise Java & Database Systems',
    isPrimaryResume: true,
    description:
      'Engineered a comprehensive Java desktop and backend application leveraging JDBC for bulletproof database transaction management, concurrency controls, and passenger quota allocation in MySQL.',
    architecture:
      'Java Application Layer -> JDBC Connector Pool -> MySQL Transactional Engine (ACID Guarantees)',
    highlights: [
      'Constructed normalized relational schema managing passenger manifests, trains, stations, fares, and real-time seat availability.',
      'Implemented JDBC transaction commit and rollback handlers to prevent race conditions and double-booking during peak reservations.',
      'Included ticket booking, PNR status querying, dynamic waiting list logic, and cancellation refunds.'
    ],
    stack: ['Java', 'JDBC', 'MySQL', 'OOP Design', 'SQL Schema'],
    github: 'https://github.com/sTharun5/java_course'
  }
];

export const ARCHIVED_PROJECTS = [
  {
    title: 'Currency Exchange Engine',
    tagline: 'Real-Time Synchronous Conversion',
    url: 'https://currency-converter-p9af15a7q-stharun5s-projects.vercel.app/',
    github: 'https://github.com/sTharun5/currency-converter',
    description: 'Live continuous external API sync supporting major global currencies with high-precision rate conversion.',
    stack: ['JavaScript', 'REST API', 'CSS3']
  },
  {
    title: 'WhiffAndWrap Architecture',
    tagline: 'Luxury Goods Backend Engine',
    github: 'https://github.com/sTharun5/WhiffAndWrap',
    description: 'Resilient data models for complex e-commerce inventory, order state machines, and payment logic.',
    stack: ['JavaScript', 'Node.js', 'APIs']
  },
  {
    title: 'Minimax Tic-Tac-Toe',
    tagline: 'Classic Game Tree Optimization',
    url: 'https://tic-tac-toe-tic-tac-toe-flax.vercel.app/',
    github: 'https://github.com/sTharun5/Tic-Tac-Toe',
    description: 'Interactive strategy game implementing the recursive minimax algorithm for optimal game-state search.',
    stack: ['HTML5', 'CSS3', 'JavaScript']
  },
  {
    title: 'Virtual AI Mouse',
    tagline: 'Computer Vision Landmark Tracking',
    github: 'https://github.com/sTharun5',
    description: 'Touchless computing interface utilizing OpenCV and MediaPipe hand landmarks for cursor manipulation.',
    stack: ['Python', 'OpenCV', 'MediaPipe']
  }
];

export const CERTIFICATIONS = [
  {
    title: 'Programming In Java (97%)',
    issuer: 'NPTEL • IIT Kharagpur (Govt. of India)',
    period: 'Jan – Apr 2025',
    distinction: 'Elite + Top 1% Topper (Ranked among 16,040 Candidates)',
    description:
      'Rigorous 12-week computer science curriculum covering object-oriented architecture, multi-threading, JVM memory internals, streams, and collection frameworks. Scored 25/25 in continuous assignments and 72/75 in proctored national exam.',
    credentialUrl: '/nptel.png',
    verifyNumber: 'NPTEL25CS57S1149000693',
    featured: true
  },
  {
    title: 'C Programming For Beginners',
    issuer: 'Udemy • Learn Programming Academy',
    period: 'Jan 2025',
    distinction: '25.5 Hours Comprehensive Mastery',
    description:
      'Deep dive into memory management, pointers, dynamic memory allocation, structs, file I/O, and low-level software optimization.',
    credentialUrl: '/udemy.png',
    verifyNumber: 'UC-bf46b573-0177-4003-abad-dd956cda72ab',
    featured: false
  }
];

export const LEADERSHIP = [
  {
    role: 'Java Trainer & Peer Mentor',
    organization: 'Bannari Amman Institute of Technology',
    period: '2024 – 2025',
    type: 'Academic Leadership',
    description:
      'Mentored and trained junior computer science students preparing for Oracle Java certifications and campus recruitment drives. Formulated problem sets on data structures, object-oriented design, and algorithmic problem-solving in Java.'
  }
];

export const EDUCATION = [
  {
    institution: 'Bannari Amman Institute of Technology',
    location: 'Sathyamangalam, Tamil Nadu',
    degree: 'B.Tech in Artificial Intelligence & Data Science',
    period: '2022 – 2026',
    score: '8.95',
    maxScore: '10.0',
    scoreLabel: 'CGPA',
    status: 'Final Year / Graduating 2026',
    distinction: 'First Class with Distinction',
    highlights: [
      'Academic Distinction with CGPA 8.95 / 10.0',
      'Specialized in Database Management, Distributed Pipelines, Machine Learning, and Big Data Engineering',
      'Actively led technical peer workshops on Java and SQL architecture'
    ]
  },
  {
    institution: 'Alvas PU College',
    location: 'Moodbidri, Mangalore, Karnataka',
    degree: 'Class XII (Pre-University Course - PCMC)',
    period: '2021 – 2022',
    score: '89%',
    maxScore: '100%',
    scoreLabel: 'Aggregate',
    status: 'Completed',
    distinction: 'Distinction',
    highlights: ['Strong foundation in Physics, Chemistry, Mathematics, and Computer Science']
  },
  {
    institution: 'Rotary Central School (CBSE)',
    location: 'Mangalore, Karnataka',
    degree: 'Class X (Secondary School Examination)',
    period: '2019 – 2020',
    score: '80%',
    maxScore: '100%',
    scoreLabel: 'Aggregate',
    status: 'Completed',
    distinction: 'First Class',
    highlights: ['CBSE Curriculum with core focus on Mathematics and Science']
  }
];

export const KEY_METRICS = [
  { label: 'B.Tech CGPA', value: '8.95', subtext: 'Distinction', highlight: 'text-amber-400' },
  { label: 'Aptean (TLX)', value: 'Data Eng', subtext: 'Active Intern', highlight: 'text-indigo-400' },
  { label: 'NPTEL Java', value: 'Top 1%', subtext: '97% Elite Gold', highlight: 'text-emerald-400' },
  { label: 'LeetCode', value: '300+', subtext: 'Problems Solved', highlight: 'text-sky-400' }
];

export const PROFESSIONAL_TRAITS = [
  'Data Modeling & Schema Design',
  'T-SQL Query Tuning',
  'Distributed Pipelines',
  'Autonomous AI Agents (MCP)',
  'Logical Problem Solving',
  'Multi-Company Data Isolation',
  'Clean Code Architecture',
  'Fast Technology Adaptability',
  'Cross-Functional Collaboration'
];
