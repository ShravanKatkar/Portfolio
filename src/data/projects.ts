export interface Project {
  id: string;
  number: string;
  title: string;
  badge: "Flagship" | "Hero Project" | "Production Web App" | "AI System";
  period: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  architectureWorkflow: string[];
  features: string[];
  metrics?: { value: string; label: string }[];
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  liveNote?: string;
  visualTheme: {
    accentColor: string;
    diagramType: "rag" | "multi-agent" | "recsys" | "desktop" | "vision" | "transit" | "lstm" | "web";
  };
}

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "alias",
    number: "01",
    title: "A.L.I.A.S. — Advanced Logical Interface and Assistant System",
    badge: "Flagship",
    period: "Oct 2025 – Dec 2025",
    tagline: "Voice-activated Windows desktop AI assistant with multi-model routing, SQLite persistent memory, and OS automation.",
    description: "A desktop AI assistant connecting multiple LLM providers with streamed responses, persistent conversation history, speech interaction, document-based RAG, and native desktop automation.",
    problem: "Commercial voice assistants either suffer from high cloud latency, lack deep native operating system privileges, or lack contextual awareness of active developer workflows.",
    solution: "Built a Windows desktop AI assistant connecting multiple LLM providers (Groq, Gemini, OpenAI) with streamed responses and persistent conversation history through a Python FastAPI backend and Electron interface.",
    architectureWorkflow: [
      "Voice Input Capture via real-time Speech-to-Text (STT) listener",
      "Multi-model dynamic router evaluates complexity and selects optimal LLM (Groq / Gemini / OpenAI)",
      "Context Extraction parses active IDE buffer (VS Code) and browser DOM",
      "SQLite Persistent Memory maintains conversation state across sessions",
      "Native Desktop Automation executes Windows shell actions, application launching, and hotkeys",
      "FastAPI WebSockets stream bimodal token responses and low-latency voice synthesis (TTS)"
    ],
    features: [
      "Built a Windows desktop AI assistant connecting multiple LLM providers with streamed responses and persistent conversation history.",
      "Integrated document-based RAG, speech interaction, and desktop automation through a Python backend and Electron interface.",
      "Hands-free interaction with real-time Speech-to-Text (STT) and low-latency Text-to-Speech (TTS) voice synthesis.",
      "Persistent long-term memory architecture powered by SQLite local database for personalized cross-session context.",
      "Deep Windows OS system automation: application launching, multimedia control, file management, and native hotkeys.",
      "Context-aware active window intelligence dynamically inspecting code editors and web browsers."
    ],
    metrics: [
      { value: "0ms", label: "Cloud Dependency for Core OS Actions" },
      { value: "Multi-LLM", label: "Groq · Gemini · OpenAI" },
      { value: "Native", label: "Windows OS Integration" }
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Electron",
      "LangChain",
      "SQLite",
      "WebSockets",
      "React",
      "PyQt6",
      "Socket.IO"
    ],
    githubUrl: "https://github.com/ShravanKatkar/A.L.I.A.S.---Advanced-Logical-Interface-and-Assistant-System",
    visualTheme: {
      accentColor: "#38BDF8",
      diagramType: "desktop"
    }
  },
  {
    id: "vaultai",
    number: "02",
    title: "VaultAI — Offline RAG Document Intelligence Platform",
    badge: "Hero Project",
    period: "Feb 2026 – March 2026",
    tagline: "Privacy-first offline RAG platform with 0.9538 Hit@1 retrieval benchmark and local LLM inference.",
    description: "An offline document intelligence application with local LLM inference, document ingestion, text processing, embedding generation, and persistent vector search running 100% on-device.",
    problem: "Privacy regulations and corporate IP concerns prevent legal, medical, and engineering teams from uploading confidential documents to cloud AI services.",
    solution: "Engineered an end-to-end on-device document processing pipeline with LangChain, ChromaDB vector indexing, and Ollama runtime. Evaluated hybrid retrieval using 65 questions across 3 runs (195 evaluations) with Reciprocal Rank Fusion (RRF) and reranking.",
    architectureWorkflow: [
      "Document Ingestion: Parses raw PDF, TXT, and Markdown files on-device",
      "Recursive Character Chunking optimizes token overlap without splitting semantic units",
      "Dense Embeddings generated locally via quantized on-device embedding models",
      "ChromaDB Persistent Vector Store indexes embeddings with HNSW cosine similarity",
      "Hybrid Retrieval: 195 evaluations completed with Reciprocal Rank Fusion (RRF) and reranking",
      "Local LLM (Llama 3 / Phi-3 / Mistral via Ollama) streams grounded answers with zero cloud telemetry"
    ],
    features: [
      "Engineered an offline document intelligence application with local LLM inference, document ingestion, text processing, embedding generation, and persistent vector search.",
      "Evaluated hybrid retrieval using 65 questions across 3 runs, completing 195 retrieval evaluations with Reciprocal Rank Fusion (RRF) and reranking.",
      "Recorded 0.9538 Hit@1 and 0.9769 Mean Reciprocal Rank (MRR) in the supplied retrieval benchmark.",
      "Resolved backend API reliability defects and expanded automated regression coverage; recorded Phase 2 test run passed 26/26 tests.",
      "Dynamic local model discovery supporting multiple open-source LLMs including Llama 3, Phi-3, and Mistral."
    ],
    metrics: [
      { value: "0.9538", label: "Hit@1 Benchmark" },
      { value: "0.9769", label: "Mean Reciprocal Rank (MRR)" },
      { value: "195", label: "Retrieval Evaluations" },
      { value: "26/26", label: "Automated Tests Passed" }
    ],
    technologies: [
      "Python",
      "FastAPI",
      "LangChain",
      "ChromaDB",
      "Ollama",
      "React",
      "RAG",
      "Pytest",
      "Docker"
    ],
    githubUrl: "https://github.com/ShravanKatkar/VaultAI-",
    liveUrl: "https://vault-ai-gamma.vercel.app/",
    visualTheme: {
      accentColor: "#38BDF8",
      diagramType: "rag"
    }
  },
  {
    id: "civicmind",
    number: "03",
    title: "CivicMind AI — Worker Safety Intelligence Platform",
    badge: "Hero Project",
    period: "Jan 2026 – Feb 2026",
    tagline: "Computer vision and multimodal reasoning platform for sanitation worker workplace hazard assessment.",
    description: "An AI-driven safety monitoring platform detecting environmental and physical hazards for sanitation workers using computer vision and multimodal reasoning.",
    problem: "Frontline municipal and sanitation workers frequently encounter hazardous chemicals, biohazards, and toxic working conditions without automated real-time safety warnings.",
    solution: "Combined YOLOv8 object detection and BLIP scene understanding with a deterministic risk-scoring engine for workplace hazard assessment. Designed location-aware risk reporting, multilingual alerts, and a supervisor dashboard for field monitoring.",
    architectureWorkflow: [
      "Worker captures photo or submits voice note via PWA or mobile browser",
      "YOLOv8 object detection identifies physical hazards and obstacles in frame",
      "BLIP scene understanding models interpret environmental context and risk tier",
      "Deterministic Risk-Scoring Engine categorizes threat level (Low, Moderate, Critical)",
      "Location-aware risk reporting dispatches multilingual alerts to field supervisors",
      "Supervisor dashboard aggregates field telemetry for proactive occupational monitoring"
    ],
    features: [
      "Combined YOLOv8 object detection and BLIP scene understanding with a deterministic risk-scoring engine for workplace hazard assessment.",
      "Designed location-aware risk reporting, multilingual alerts, and a supervisor dashboard for field monitoring.",
      "Real-time hazard detection across 7 risk categories with custom logic validation.",
      "Voice-based on-site hazard reporting for hands-busy frontline workers.",
      "Mobile-accessible local network deployment engineered for low-bandwidth environments."
    ],
    metrics: [
      { value: "YOLOv8 + BLIP", label: "Dual Vision Engine" },
      { value: "7", label: "Risk Categories Detected" },
      { value: "Multilingual", label: "Real-Time Field Alerts" }
    ],
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "YOLOv8",
      "BLIP",
      "SQLite",
      "LangChain",
      "PWA"
    ],
    githubUrl: "https://github.com/ShravanKatkar",
    liveUrl: "https://civic-mind-9uve.vercel.app/",
    visualTheme: {
      accentColor: "#06B6D4",
      diagramType: "vision"
    }
  },
  {
    id: "cinesense",
    number: "04",
    title: "CineSense — Hybrid AI Movie Discovery & Grounded RAG Assistant",
    badge: "Hero Project",
    period: "September 2026",
    tagline: "Cinema intelligence platform across 10,000+ titles combining 2-stage hybrid recommendation with a 0% hallucination ReAct agent.",
    description: "A full-stack cinema intelligence platform featuring a 2-stage hybrid recommendation pipeline (5 algorithmic tiers fused via RRF & MMR) coupled with an autonomous ReAct AI Agent with a 0% hallucination guarantee.",
    problem: "Standard collaborative filtering suffers from cold-start issues and cannot explain recommendations conversational, while ungrounded LLMs hallucinate titles and metadata.",
    solution: "Combined ALS Matrix Factorization (64 latent factors), Item-Item Collaborative Filtering, and Neural Semantic Vector Embeddings into a candidate pool fused by RRF and MMR, strictly whitelisting candidate movies for an autonomous Groq Llama 3.3 70B ReAct agent.",
    architectureWorkflow: [
      "User preferences & conversational query ingested by FastAPI backend",
      "Candidate Generation: ALS Matrix Factorization + Neural kNN Embeddings + TF-IDF",
      "Reciprocal Rank Fusion (RRF) combines scores; Maximal Marginal Relevance (MMR) diversifies output",
      "PostgreSQL 16 + pgvector provides high-dimension vector similarity lookup",
      "Autonomous ReAct agent (Groq Llama 3.3 70B) explains recommendations with candidate whitelist grounding",
      "Redis 7 dual-tier caching layer returns sub-millisecond cached responses"
    ],
    features: [
      "Two-stage recsys: ALS Matrix Factorization (64 latent factors), Item-Item CF, Neural Semantic Embeddings (kNN), TF-IDF, and Bayesian Popularity.",
      "Candidate ranking fused via Reciprocal Rank Fusion (RRF) and diversified with Maximal Marginal Relevance (MMR).",
      "Autonomous ReAct agent powered by Groq Llama 3.3 70B with candidate whitelist grounding to guarantee zero hallucinations.",
      "Dual-tier caching with Redis 7 & in-memory TTL plus live telemetry feedback loop.",
      "Built with React 19, Vite, Tailwind CSS, FastAPI Python 3.12, and PostgreSQL 16 + pgvector."
    ],
    metrics: [
      { value: "10K+", label: "Movie Titles" },
      { value: "5", label: "Ranking Tiers" },
      { value: "64", label: "Latent Factors" },
      { value: "0%", label: "Hallucination Guarantee" }
    ],
    technologies: [
      "FastAPI",
      "React",
      "Python",
      "PostgreSQL",
      "pgvector",
      "Redis",
      "Groq",
      "LangChain",
      "RAG",
      "Docker"
    ],
    githubUrl: "https://github.com/ShravanKatkar/CineSense",
    liveUrl: "https://cinesense-app.onrender.com/",
    liveNote: "Cloud server may take ~30s to wake up on initial visit",
    visualTheme: {
      accentColor: "#F59E0B",
      diagramType: "recsys"
    }
  },
  {
    id: "agrimind",
    number: "05",
    title: "AgriMind AI — AI-Driven Agricultural Advisory Platform",
    badge: "AI System",
    period: "2026",
    tagline: "Computer vision crop disease diagnostic suite and micro-climate yield forecasting assistant.",
    description: "An AI-powered smart agriculture platform combining computer vision for leaf pathogen detection with micro-climate predictive models and vernacular voice advisory for precision farming.",
    problem: "Smallholder farmers lack immediate access to agricultural experts, leading to delayed pest diagnosis and suboptimal pesticide/fertilizer usage.",
    solution: "Engineered a dual-engine architecture pairing a lightweight CNN leaf pathogen classifier with an offline-capable RAG advisory database and XGBoost soil/weather yield predictor.",
    architectureWorkflow: [
      "Farmer uploads crop leaf photograph via smartphone camera",
      "CNN Vision Model classifies pathogen / leaf rust with confidence scoring",
      "Micro-Climate Engine queries soil moisture, pH, and local meteorological forecasts",
      "RAG Fertilizer Advisor formulates targeted chemical and organic treatment plans",
      "Audio Synthesis delivers spoken advisory in regional languages with offline synchronization"
    ],
    features: [
      "Computer vision leaf disease diagnosis across major cash crops with instant severity assessment.",
      "Hyper-local weather and soil telemetry integration for dynamic yield optimization.",
      "Vernacular voice-driven agricultural advisory built for low-literacy field usability.",
      "Offline-first mobile architecture syncing field records upon network reconnect.",
      "Integrated chemical dosage calculator preventing environmental over-fertilization."
    ],
    metrics: [
      { value: "98.2%", label: "Pathogen Accuracy" },
      { value: "Offline", label: "Local PWA Mode" },
      { value: "Regional", label: "Vernacular Voice" }
    ],
    technologies: [
      "Python",
      "FastAPI",
      "PyTorch",
      "CNN",
      "React",
      "ChromaDB",
      "Tailwind CSS",
      "Docker"
    ],
    githubUrl: "https://github.com/ShravanKatkar",
    visualTheme: {
      accentColor: "#10B981",
      diagramType: "vision"
    }
  },
  {
    id: "codeguard",
    number: "05",
    title: "CodeGuard — Autonomous Multi-Agent Code Review System",
    badge: "Hero Project",
    period: "July 2026",
    tagline: "Multi-agent AI review system featuring LangGraph state routing and fine-tuned QLoRA vulnerability detection.",
    description: "An autonomous multi-agent AI system designed to review GitHub Pull Requests like a senior engineering team, featuring LangGraph state routing and a fine-tuned vulnerability detection agent.",
    problem: "Manual code reviews create delivery bottlenecks, while basic LLMs overlook deep multi-file dependencies, AST call-graph nuances, and security exploits.",
    solution: "Built a collaborative multi-agent architecture where LangGraph routes code diffs in parallel across specialized reviewer personas (Security, Architecture RAG, Code Quality, Refactoring), backed by a fine-tuned QLoRA Llama 3.1 8B model.",
    architectureWorkflow: [
      "GitHub PR webhook triggers containerized Docker review action",
      "Codebase RAG parses AST function & class hierarchies for structural context",
      "LangGraph State Router dispatches parallel review tasks to specialized agents",
      "Security Reviewer (Fine-tuned QLoRA Llama 3.1 8B) detects vulnerability patterns",
      "Architecture Agent verifies design consistency and cross-module couplings",
      "Arbiter synthesizes comments into structured, line-anchored GitHub review feedback"
    ],
    features: [
      "Dynamic parallel state routing via LangGraph coordinating Planner, Security, Architecture RAG, and Refactor reviewers.",
      "Fine-tuned QLoRA Security Agent (Llama 3.1 8B) delivering +2.3% vulnerability detection and 61% lower latency over base models.",
      "Codebase RAG layer indexing AST function/class definitions for deep contextual semantic retrieval.",
      "Interactive Streamlit dashboard visualizing PR metrics, vulnerability breakdowns, and base vs. fine-tuned benchmark comparisons.",
      "Containerized Docker action posting structured review comments directly to GitHub PRs."
    ],
    metrics: [
      { value: "+2.3%", label: "Vulnerability Detection" },
      { value: "61%", label: "Lower Latency" },
      { value: "4", label: "Specialized Agents" }
    ],
    technologies: [
      "Python",
      "LangGraph",
      "LangChain",
      "PyTorch",
      "QLoRA",
      "RAG",
      "Streamlit",
      "Docker",
      "Llama 3.1"
    ],
    githubUrl: "https://github.com/ShravanKatkar/CodeGuard",
    liveUrl: "https://codeguard-bm3d38xaaeqhvxppuhcbgv.streamlit.app/",
    visualTheme: {
      accentColor: "#10B981",
      diagramType: "multi-agent"
    }
  },
  {
    id: "transitai",
    number: "06",
    title: "TransitAI — Distributed Transit & Real-Time Fleet Platform",
    badge: "AI System",
    period: "2026",
    tagline: "Microservices platform for live bus telemetry, XGBoost crowd/ETA predictions, and Haversine anti-fraud ticketing.",
    description: "A production-ready distributed intelligent public transit platform featuring microservices for live fleet telemetry, ML-driven ETA & crowd forecasting, automated digital pass issuing, and fraud prevention.",
    problem: "Urban transit systems suffer from unpredictable schedules, crowded buses, and physical ticket counter lines prone to ticket counterfeiting.",
    solution: "Architected a hybrid distributed platform pairing a high-throughput Java 21 Spring Boot core microservice with a Python FastAPI ML service for predictive forecasting and anti-fraud velocity checks.",
    architectureWorkflow: [
      "Bus GPS telemetry streamed via WebSocket STOMP protocol",
      "Java Spring Boot microservice coordinates fleet scheduling and ticket transactions",
      "FastAPI ML microservice runs XGBoost regression for dynamic ETA calculation",
      "Crowd density classification categorizes bus occupancy levels",
      "Haversine velocity detector (v > 120 km/h) flags and invalidates duplicated QR passes"
    ],
    features: [
      "Distributed microservice architecture: Java 21 Spring Boot core backend + FastAPI Python ML service + React 19 frontend.",
      "Real-time vehicle telemetry and live bus tracking streamed via WebSocket STOMP.",
      "XGBoost dynamic ETA prediction and rush-hour crowd density classification models.",
      "Anti-fraud anomaly detector calculating Haversine distance & travel velocity (v > 120 km/h) to block QR ticket duplication.",
      "Role-based portals for Passengers, Drivers, Conductors, and Fleet Administrators."
    ],
    metrics: [
      { value: "Spring Boot + FastAPI", label: "Dual Microservices" },
      { value: "WebSocket", label: "Real-Time STOMP Streams" },
      { value: "XGBoost", label: "ETA & Crowd Prediction" }
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "FastAPI",
      "Python",
      "React",
      "PostgreSQL",
      "Redis",
      "WebSockets",
      "Docker"
    ],
    githubUrl: "https://github.com/ShravanKatkar/TransitAI",
    visualTheme: {
      accentColor: "#EC4899",
      diagramType: "transit"
    }
  },
  {
    id: "neuropersona",
    number: "07",
    title: "NeuroPersona — Adaptive AI Personality Engine",
    badge: "AI System",
    period: "2025",
    tagline: "Hybrid ANN, LSTM, and NLP architecture for multi-turn personality modeling and emotional tone control.",
    description: "Advanced AI system for personality modeling and behavioral analytics using hybrid deep learning techniques — combining ANN, RNN (LSTM), and NLP pipelines for emotion and intent detection.",
    problem: "Standard chatbots maintain rigid, monotonic styles and fail to adapt their emotional tone to user sentiment and behavioral history.",
    solution: "Built a sequence-aware neural network combining LSTM recurrent layers with an NLP feature extraction pipeline to track emotional trajectory and dynamically modulate conversational response characteristics.",
    architectureWorkflow: [
      "User dialogue processed through tokenization and sentiment lexical parsing",
      "LSTM sequence model captures emotional trajectory across multiple conversational turns",
      "Behavioral profiling engine classifies emotional state and psychological archetype",
      "Response generator adapts tone parameters (empathy, formality, technical depth)",
      "Interactive Streamlit analytics dashboard visualizes live emotion metrics"
    ],
    features: [
      "Hybrid ANN + RNN (LSTM) + NLP architecture for emotional profiling.",
      "Context-aware conversation memory with behavioral state tracking.",
      "LSTM sequence modeling with dynamic emotional tone control.",
      "Real-time emotion trend visualization dashboards.",
      "Deployed as an interactive Streamlit analytics platform."
    ],
    technologies: [
      "TensorFlow",
      "Keras",
      "LSTM",
      "NLP",
      "Python",
      "SQLite",
      "Matplotlib",
      "Streamlit"
    ],
    githubUrl: "https://github.com/ShravanKatkar",
    liveUrl: "https://mu3gs2mdiyhy6cltzee53k.streamlit.app/",
    visualTheme: {
      accentColor: "#A855F7",
      diagramType: "lstm"
    }
  },
  {
    id: "ironfit",
    number: "08",
    title: "IronFit Gym — High-Performance Fitness Platform",
    badge: "Production Web App",
    period: "June 2026",
    tagline: "Production web application engineered with fluid animations, dynamic membership flows, and sub-second transitions.",
    description: "A modern, responsive web application for IronFit Gym engineered with fluid physics-based animations, dynamic membership discovery, and high-conversion user flows deployed live to production.",
    problem: "Traditional fitness websites suffer from slow load times, static cluttered tables, and friction-filled signup flows on mobile devices.",
    solution: "Engineered a high-performance modern web application with React 19, Vite, and Tailwind CSS, featuring smooth Framer Motion interactions, class scheduling filters, and optimized lead capture.",
    architectureWorkflow: [
      "Client requests served with sub-second page transitions via Vite bundle splitting",
      "Interactive membership tier matrices with real-time perk comparison",
      "Class scheduling module filtering by workout type and personal trainer",
      "Mobile-first responsive layout with touch-optimized interaction targets",
      "Live production deployment configured with custom domain at ironfitgym.online"
    ],
    features: [
      "Built with React 19, Vite, Tailwind CSS v3, and React Router DOM for sub-second page transitions.",
      "Interactive UI enhanced with Framer Motion fluid animations and Lucide React iconography.",
      "Comprehensive membership tier comparison, pricing matrices, and perk breakdown tables.",
      "Dynamic class schedule modules with category filters and personal trainer booking workflows.",
      "100% production deployment with custom domain configuration at ironfitgym.online."
    ],
    technologies: [
      "React",
      "Tailwind CSS",
      "Vite",
      "JavaScript",
      "Framer Motion",
      "Web App"
    ],
    githubUrl: "https://github.com/ShravanKatkar/IronFit-gym-",
    liveUrl: "https://www.ironfitgym.online/",
    visualTheme: {
      accentColor: "#E11D48",
      diagramType: "web"
    }
  }
];
