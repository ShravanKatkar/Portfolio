export interface SkillItem {
  name: string;
  category: string;
  shippedProjects: string[];
  description?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  tagline: string;
  skills: SkillItem[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "ai-ml",
    name: "Artificial Intelligence",
    tagline: "The cognitive intelligence & reasoning layer",
    skills: [
      { name: "Generative AI", category: "AI & ML", shippedProjects: ["VaultAI", "A.L.I.A.S.", "CodeGuard", "CineSense"] },
      { name: "Retrieval-Augmented Generation (RAG)", category: "AI & ML", shippedProjects: ["VaultAI (0.9538 Hit@1)", "CineSense", "CodeGuard", "A.L.I.A.S."] },
      { name: "Large Language Models (LLMs)", category: "AI & ML", shippedProjects: ["VaultAI (Ollama)", "CodeGuard (Llama 3.1 8B)", "CineSense (Groq Llama 3.3 70B)", "A.L.I.A.S."] },
      { name: "Computer Vision", category: "AI & ML", shippedProjects: ["CivicMind AI (YOLOv8 & BLIP)"] },
      { name: "Natural Language Processing (NLP)", category: "AI & ML", shippedProjects: ["VaultAI", "NeuroPersona", "CodeGuard", "A.L.I.A.S."] },
      { name: "Deep Learning", category: "AI & ML", shippedProjects: ["NeuroPersona (LSTM)", "CodeGuard (QLoRA)"] },
      { name: "Machine Learning", category: "AI & ML", shippedProjects: ["TransitAI (XGBoost)", "CineSense (ALS Matrix Factorization)"] },
      { name: "Prompt Engineering & Guardrails", category: "AI & ML", shippedProjects: ["CineSense (0% Hallucination)", "A.L.I.A.S.", "CodeGuard"] }
    ]
  },
  {
    id: "frameworks",
    name: "Frameworks & Libraries",
    tagline: "Specialized runtimes, models & toolchains",
    skills: [
      { name: "FastAPI", category: "Frameworks", shippedProjects: ["VaultAI", "A.L.I.A.S.", "CivicMind AI", "CineSense", "CodeGuard", "TransitAI"] },
      { name: "LangChain", category: "Frameworks", shippedProjects: ["VaultAI", "A.L.I.A.S.", "CineSense", "CivicMind AI"] },
      { name: "LangGraph", category: "Frameworks", shippedProjects: ["CodeGuard (Parallel multi-agent state graph)"] },
      { name: "YOLOv8", category: "Frameworks", shippedProjects: ["CivicMind AI (Hazard object detection)"] },
      { name: "BLIP", category: "Frameworks", shippedProjects: ["CivicMind AI (Scene understanding & captioning)"] },
      { name: "Ollama", category: "Frameworks", shippedProjects: ["VaultAI (Local on-device LLM inference)"] },
      { name: "ChromaDB", category: "Frameworks", shippedProjects: ["VaultAI (Local persistent vector database)"] },
      { name: "PyTorch", category: "Frameworks", shippedProjects: ["CodeGuard (QLoRA fine-tuning)", "CivicMind AI"] },
      { name: "Hugging Face", category: "Frameworks", shippedProjects: ["CodeGuard", "CivicMind AI"] },
      { name: "Groq", category: "Frameworks", shippedProjects: ["CineSense (Llama 3.3 70B)", "A.L.I.A.S."] }
    ]
  },
  {
    id: "programming",
    name: "Programming",
    tagline: "Core computational foundations",
    skills: [
      { name: "Python", category: "Languages", shippedProjects: ["VaultAI", "A.L.I.A.S.", "CivicMind AI", "CineSense", "CodeGuard", "TransitAI"] },
      { name: "C", category: "Languages", shippedProjects: ["Algorithms", "Data structures & low-level memory operations"] },
      { name: "SQL", category: "Languages", shippedProjects: ["HackerRank Advanced SQL", "PostgreSQL (pgvector)", "SQLite", "MySQL"] },
      { name: "Java", category: "Languages", shippedProjects: ["TransitAI (Spring Boot microservice)", "A.L.I.A.S."] },
      { name: "TypeScript / JavaScript", category: "Languages", shippedProjects: ["Portfolio 2.0", "CineSense", "IronFit Gym"] },
      { name: "HTML5 & CSS3", category: "Languages", shippedProjects: ["Responsive layouts", "Modern web typography"] }
    ]
  },
  {
    id: "backend",
    name: "Backend & Databases",
    tagline: "APIs, streaming protocols & persistent storage",
    skills: [
      { name: "REST APIs", category: "Backend", shippedProjects: ["VaultAI", "A.L.I.A.S.", "CineSense", "CivicMind AI", "TransitAI"] },
      { name: "WebSockets", category: "Backend", shippedProjects: ["A.L.I.A.S. (Real-time IPC)", "TransitAI (Fleet telemetry STOMP)"] },
      { name: "JSON & Schema Design", category: "Backend", shippedProjects: ["All API contracts and structured LLM payloads"] },
      { name: "ChromaDB", category: "Databases", shippedProjects: ["VaultAI (195 evaluation RRF benchmark)"] },
      { name: "SQLite", category: "Databases", shippedProjects: ["A.L.I.A.S. (Persistent memory)", "CivicMind AI", "NeuroPersona"] },
      { name: "PostgreSQL & pgvector", category: "Databases", shippedProjects: ["CineSense (Vector similarity search)", "TransitAI"] },
      { name: "MySQL", category: "Databases", shippedProjects: ["Relational schemas & advanced query optimizations"] },
      { name: "Redis", category: "Databases", shippedProjects: ["CineSense (Dual-tier cache)", "TransitAI"] }
    ]
  },
  {
    id: "testing",
    name: "Testing & DevOps",
    tagline: "Deterministic verification & deployment",
    skills: [
      { name: "Git & GitHub", category: "DevOps", shippedProjects: ["All open-source repositories and CI actions"] },
      { name: "Pytest", category: "Testing", shippedProjects: ["VaultAI (Phase 2 passed 26/26 automated tests)"] },
      { name: "Postman", category: "Testing", shippedProjects: ["API endpoint benchmarking and contract validation"] },
      { name: "Regression Testing", category: "Testing", shippedProjects: ["VaultAI API defect resolution & test coverage"] },
      { name: "Docker", category: "DevOps", shippedProjects: ["CodeGuard (Containerized GitHub action)", "CineSense"] },
      { name: "Vite", category: "Tools", shippedProjects: ["Portfolio 2.0", "CineSense", "IronFit Gym"] }
    ]
  }
];
