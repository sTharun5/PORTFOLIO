import { KnowledgeChunk } from './types';

export const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  // --- Aptean TLX Experience ---
  {
    id: 'exp-aptean-tsql-sync',
    title: 'Aptean TLX: Enterprise T-SQL Data Synchronization',
    category: 'experience',
    importance: 10,
    keywords: [
      'aptean', 'tlx', 'internship', 't-sql', 'sql server', 'stored procedures', 
      'synchronization', 'pipeline', 'data engineering', 'daily sync', 'batch'
    ],
    content: `At Aptean (Transportation & Logistics division / TLX), Tharun S serves as a Data Engineering Intern. He engineered and rigorously tested enterprise-grade T-SQL stored procedures executing automated daily data synchronization across production datasets. His work ensures consistent operational state across complex supply chain data models with transactional integrity.`,
    sourceUrl: 'https://linkedin.com/in/tharuntech',
    sourceType: 'linkedin'
  },
  {
    id: 'exp-aptean-genai-views',
    title: 'Aptean TLX: GenAI Views & Polaris/Visualizer Scenarios',
    category: 'experience',
    importance: 10,
    keywords: [
      'genai views', 'tms', 'fap', 'freight audit', 'polaris', 'visualizer', 
      'scenarios', 'prompt alignment', 'semantic modeling', 'transportation management'
    ],
    content: `Engineered specialized GenAI database views for Transportation Management System (TMS) and Freight Audit & Payment (FAP) datasets. Tharun harmonized shipment and freight mapping schemas, standardizing data types and business semantics for downstream AI tools. Configured and validated Polaris/Visualizer GenAI scenarios for lane profitability, carrier scorecards, shipment tracking, and routing economics with tight prompt-to-view semantic alignment.`,
    sourceUrl: 'https://linkedin.com/in/tharuntech',
    sourceType: 'linkedin'
  },
  {
    id: 'exp-aptean-mcp-server',
    title: 'Aptean TLX: Model Context Protocol (MCP) Agent Server',
    category: 'experience',
    importance: 10,
    keywords: [
      'mcp', 'model context protocol', 'ai agent', 'autonomous', 'tools', 
      'ip liability', 'audit agent', 'shipment data', 'server'
    ],
    content: `Built a secure local Model Context Protocol (MCP) server exposing enterprise TMS and FAP shipment datasets directly to autonomous AI agent tools. This local MCP implementation acts as the bridge connecting LLM-driven agents with enterprise SQL Server data, directly accelerating the production rollout of Aptean's IP Liability Audit agent.`,
    sourceUrl: 'https://linkedin.com/in/tharuntech',
    sourceType: 'linkedin'
  },
  {
    id: 'exp-aptean-multi-company',
    title: 'Aptean TLX: Multi-Company Architecture & Tenant Isolation',
    category: 'experience',
    importance: 9,
    keywords: [
      'coid', 'multi-company', 'multi-tenant', 'client identifiers', 'data isolation', 
      'security', 'shared database', 'enterprise architecture'
    ],
    content: `Architected database logic handling multi-company discovery and company identifiers (COID) in shared enterprise database environments. Ensured strict multi-tenant data isolation and client boundary enforcement during large-scale automated data sync procedures across diverse transportation clients.`,
    sourceUrl: 'https://linkedin.com/in/tharuntech',
    sourceType: 'linkedin'
  },
  {
    id: 'exp-aptean-performance-tuning',
    title: 'Aptean TLX: SQL Performance & Query Optimization',
    category: 'experience',
    importance: 9,
    keywords: [
      'performance tuning', 'execution plans', 'indexes', 'b-trees', 'temp tables', 
      'query optimization', 'data quality', 'least cost pricesheets'
    ],
    content: `Investigated and resolved enterprise SQL bottlenecks through execution plan analysis, strategic temporary table structures, and B-tree indexing strategies. Refactored complex algorithms such as least-cost pricesheet matching and rectified schema discrepancies across production views to enhance data quality and reduce runtime.`,
    sourceUrl: 'https://linkedin.com/in/tharuntech',
    sourceType: 'linkedin'
  },

  // --- Featured Projects ---
  {
    id: 'proj-freight-audit',
    title: 'AI-Powered Freight Audit Agent (Flagship Project)',
    category: 'projects',
    importance: 10,
    keywords: [
      'freight audit', 'rapidocr', 'onnx runtime', 'mcp', 'ocr', 'invoice parsing', 
      'bills of lading', 'fraud detection', 'sql server', 'autonomous agent'
    ],
    content: `Developed an enterprise-grade multimodal freight audit pipeline combining RapidOCR on ONNX Runtime with a local Model Context Protocol (MCP) server. Extracts invoice line items, carrier charges, and payment terms from unstructured shipping documents and automatically cross-validates them against authoritative SQL Server shipment records. Integrated workload grouping to cluster incoming shipments and maximize auditing throughput.`,
    sourceUrl: 'https://github.com/sTharun5',
    sourceType: 'github'
  },
  {
    id: 'proj-alpr-cloud',
    title: 'Cloud-Based AI Vehicle Number Plate Recognition',
    category: 'projects',
    importance: 9,
    keywords: [
      'alpr', 'anpr', 'license plate', 'number plate', 'opencv', 'easyocr', 
      'aws ec2', 'aws s3', 'rds mysql', 'computer vision', 'accuracy'
    ],
    content: `Engineered an end-to-end Automated License Plate Recognition (ALPR) cloud pipeline with 92%+ test accuracy across challenging angles and lighting conditions. Ingests edge camera video streams to AWS S3, runs bilateral filtering and morphological contour localization in OpenCV, extracts alphanumeric characters via EasyOCR, and persists audit logs to AWS RDS MySQL. Hosted on AWS EC2.`,
    sourceUrl: 'https://github.com/sTharun5/number-plate-detection',
    sourceType: 'github'
  },
  {
    id: 'proj-od-approval',
    title: 'OD Approval Ecosystem with OCR Fraud Detection',
    category: 'projects',
    importance: 8,
    keywords: [
      'od approval', 'on duty', 'workflow', 'rbac', 'fraud detection', 
      'react', 'node.js', 'express', 'mysql', 'prisma', 'pdf parsing'
    ],
    content: `Full-stack academic on-duty authorization platform featuring intelligent OCR verification to detect forged or tampered event certificates. Built with React, Express.js REST APIs, Python OCR verification engine, and MySQL with multi-tiered role-based access control (Student, Faculty Advisor, Head of Department, Dean).`,
    sourceUrl: 'https://automation-nu-dusky.vercel.app',
    sourceType: 'demo'
  },
  {
    id: 'proj-railway-system',
    title: 'ACID-Compliant Railway Reservation Engine',
    category: 'projects',
    importance: 8,
    keywords: [
      'railway reservation', 'java', 'jdbc', 'mysql', 'acid', 
      'transactions', 'concurrency', 'pnr', 'booking engine'
    ],
    content: `Engineered a concurrent Java booking engine utilizing JDBC and MySQL with strict ACID guarantees. Handles seat availability tracking, passenger manifests, dynamic waiting list prioritization, and ticket cancellation refunds. Designed robust transactional rollback handlers to guarantee zero double-booking under concurrent load.`,
    sourceUrl: 'https://github.com/sTharun5/java_course',
    sourceType: 'github'
  },

  // --- Education & Academic Credentials ---
  {
    id: 'edu-btech',
    title: 'B.Tech in Artificial Intelligence & Data Science (CGPA 8.95)',
    category: 'education',
    importance: 10,
    keywords: [
      'education', 'btech', 'degree', 'bannari amman', 'college', 'cgpa', 
      'grades', 'artificial intelligence', 'data science', 'distinction'
    ],
    content: `Pursuing B.Tech in Artificial Intelligence & Data Science at Bannari Amman Institute of Technology (2022–2026) with an outstanding CGPA of 8.95 / 10.0 (First Class with High Distinction). Coursework spans Distributed Database Systems, Machine Learning, Big Data Engineering, and Object-Oriented Software Design. Graduating Class of 2026.`,
    sourceUrl: 'https://linkedin.com/in/tharuntech',
    sourceType: 'linkedin'
  },
  {
    id: 'cert-nptel-java',
    title: 'IIT Kharagpur NPTEL Java: 97% Elite Gold + Top 1%',
    category: 'certifications',
    importance: 10,
    keywords: [
      'nptel', 'java', 'iit kharagpur', 'topper', 'elite', 'gold', 
      'certification', 'exam', '97 percent', 'roll number'
    ],
    content: `Awarded Elite + Top 1% Gold Medalist rank by IIT Kharagpur in NPTEL Programming in Java (Jan–Apr 2025) out of 16,040 nationwide candidates. Achieved 97% overall score (perfect 25/25 in continuous assignments, 72/75 in proctored national exam). Verification Roll Number: NPTEL25CS57S1149000693. Demonstrates mastery over JVM internals, memory management, multithreading, and Java concurrency.`,
    sourceUrl: '/nptel.png',
    sourceType: 'credential'
  },
  {
    id: 'cert-udemy-c',
    title: 'C Programming Core Verification (Udemy)',
    category: 'certifications',
    importance: 7,
    keywords: [
      'c language', 'pointers', 'memory management', 'udemy', 'low level', 'structs'
    ],
    content: `Completed 25.5 hours intensive C Programming Core Certification covering low-level pointer arithmetic, dynamic memory allocation (malloc/free), stack/heap management, file I/O, and data structure implementations. Verification ID: UC-bf46b573-0177-4003-abad-dd956cda72ab.`,
    sourceUrl: '/udemy.png',
    sourceType: 'credential'
  },
  {
    id: 'lead-java-trainer',
    title: 'Java Trainer & Academic Peer Mentor',
    category: 'leadership',
    importance: 8,
    keywords: [
      'leadership', 'trainer', 'mentor', 'teaching', 'peer', 'java trainer', 'bannari amman'
    ],
    content: `Served as Java Trainer and Peer Mentor at Bannari Amman Institute of Technology (2024–2025). Trained and mentored junior engineering students preparing for Oracle Java certifications and campus technical recruitment interviews, formulating hands-on coding problem sets in object-oriented architecture and algorithmic data structures.`,
    sourceUrl: 'https://linkedin.com/in/tharuntech',
    sourceType: 'linkedin'
  },

  // --- Skills & Stack ---
  {
    id: 'skill-data-eng',
    title: 'Enterprise Data Engineering & SQL Competencies',
    category: 'skills',
    importance: 9,
    keywords: [
      'skills', 'sql server', 't-sql', 'stored procedures', 'views', 
      'query optimization', 'indexing', 'b-trees', 'data validation'
    ],
    content: `Core competencies in enterprise Data Engineering: SQL Server, T-SQL, Stored Procedures, Database Views, ETL/ELT Synchronization, Complex Analytical Joins, Subqueries, Clustered/Non-Clustered Indexing, Query Optimization, Execution Plan Analysis, and Data Validation.`,
    sourceUrl: 'https://linkedin.com/in/tharuntech',
    sourceType: 'internal'
  },
  {
    id: 'skill-genai-mcp',
    title: 'GenAI, Autonomous Agents & MCP Stack',
    category: 'skills',
    importance: 9,
    keywords: [
      'skills', 'genai', 'mcp', 'model context protocol', 'ai agents', 
      'prompt engineering', 'rapidocr', 'onnx runtime', 'langchain'
    ],
    content: `Core competencies in Applied GenAI: Model Context Protocol (MCP) server development, autonomous tool-calling AI agents, Polaris/Visualizer scenario design, prompt-to-view semantic alignment, RapidOCR, and ONNX Runtime accelerated inference.`,
    sourceUrl: 'https://linkedin.com/in/tharuntech',
    sourceType: 'internal'
  },
  {
    id: 'skill-cloud-platforms',
    title: 'Cloud Platforms & Infrastructure',
    category: 'skills',
    importance: 8,
    keywords: [
      'skills', 'cloud', 'aws', 'ec2', 's3', 'rds', 'mysql', 'microsoft fabric', 'docker'
    ],
    content: `Cloud and lakehouse tooling: Microsoft Fabric, AWS EC2 compute, AWS S3 object storage, AWS RDS MySQL, multi-tenant database isolation (COID), and Git/GitHub CI/CD workflows.`,
    sourceUrl: 'https://linkedin.com/in/tharuntech',
    sourceType: 'internal'
  },

  // --- Contact & Profile Details ---
  {
    id: 'contact-profile',
    title: 'Contact Information & Verified Profiles',
    category: 'contact',
    importance: 10,
    keywords: [
      'contact', 'email', 'phone', 'linkedin', 'github', 'leetcode', 
      'hire', 'resume', 'availability', 'location'
    ],
    content: `Full Name: Tharun S | Email: stharun612@gmail.com | Phone: +91 7418774959 | Location: Tamil Nadu & Karnataka, India (Open to Relocation) | Availability: Open for Full-Time Data Engineering & GenAI roles (Class of 2026) | LinkedIn: https://linkedin.com/in/tharuntech | GitHub: https://github.com/sTharun5 | LeetCode: https://leetcode.com/u/user3651Q/ (300+ Problems Solved).`,
    sourceUrl: 'https://linkedin.com/in/tharuntech',
    sourceType: 'linkedin'
  }
];
