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
    tagline: "Desktop AI assistant integrating LLM conversations, RAG, voice interaction, memory, and desktop automation.",
    description: "Developed a desktop AI assistant integrating LLM-based conversations, Retrieval-Augmented Generation (RAG), voice interaction, conversational memory, and desktop automation. Built with an extensive 274-case evaluation framework covering response quality, RAG retrieval, multi-turn context retention, automation safety, and voice latency.",
    problem: "Desktop AI assistants often struggle to balance unconstrained LLM reasoning with low-latency local execution, robust multi-turn context retention, high-recall document retrieval, and foolproof operating system automation safety.",
    solution: "Architected A.L.I.A.S. using Python, FastAPI, Electron, React, LangChain, ChromaDB, SQLite, WebSockets, and LLMs. Engineered a comprehensive 274-case empirical benchmark verifying response quality (98.1%), automation accuracy (98.1%), context retention (96.9%), RAG retrieval (90.4% Hit@5), and 100% destructive command safety.",
    architectureWorkflow: [
      "Voice & Text Input capture via real-time Speech-to-Text (STT) and WebSocket interface",
      "Multi-model LLM dynamic router evaluates prompt intent and dispatches streamed tokens",
      "ChromaDB Vector Store executes grounded document RAG with 32.5 ms mean retrieval latency",
      "SQLite Persistent Memory maintains conversation state across multi-turn sessions (96.9% retention)",
      "Automation Engine triggers OS actions, app launching, file ops, and window management (98.1% accuracy)",
      "Strict Automation Safety Guardrails evaluate commands, blocking 7/7 destructive execution attempts"
    ],
    features: [
      "Developed a desktop AI assistant integrating LLM-based conversations, Retrieval-Augmented Generation (RAG), voice interaction, conversational memory, and desktop automation.",
      "Built a benchmarking and evaluation framework covering 274 evaluation cases across response quality, RAG, context retention, automation, and voice.",
      "Achieved 98.1% response-quality pass rate (104/106), 98.1% automation accuracy (51/52), and 96.9% multi-turn context retention (31/32) in the reported evaluation.",
      "Evaluated RAG retrieval across multiple configurations, achieving 90.4% Hit@5 in the baseline results and 32.5 ms mean vector retrieval latency.",
      "Implemented automation safety checks with 0 false positives across 9 negative test cases and blocked all 7/7 tested destructive commands.",
      "Benchmarked LLM latency, TTFT, throughput, and voice synthesis performance; documented provider-specific results, errors, and evaluation limitations."
    ],
    metrics: [
      { value: "274", label: "Empirical Evaluation Cases" },
      { value: "98.1%", label: "Response Quality Pass (104/106)" },
      { value: "98.1%", label: "Automation Accuracy (51/52)" },
      { value: "96.9%", label: "Context Retention (31/32)" },
      { value: "90.4%", label: "RAG Retrieval Hit@5" },
      { value: "100%", label: "Blocked Destructive Commands (7/7)" }
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Electron",
      "React",
      "LangChain",
      "ChromaDB",
      "SQLite",
      "WebSockets",
      "LLMs"
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
    title: "CivicMind AI — Multimodal Sanitation Worker Safety Platform",
    badge: "Hero Project",
    period: "Jan 2026 – Feb 2026",
    tagline: "Multimodal sanitation worker safety platform combining YOLOv8 hazard detection, BLIP contextual reasoning, and LRU-cached RAG.",
    description: "A multimodal worker safety intelligence platform detecting environmental and physical hazards on CPU via optimized dual-vision reasoning (YOLOv8 & BLIP) coupled with sub-millisecond LRU-cached RAG retrieval and a 20-endpoint FastAPI architecture.",
    problem: "Frontline municipal and sanitation workers frequently encounter hazardous chemicals, biohazards, and toxic working conditions without automated real-time safety warnings, while standard multimodal vision pipelines are too slow for real-time edge CPU deployment.",
    solution: "Engineered an end-to-end multimodal hazard perception pipeline with BLIP caption-pass optimization, image downscaling, and PyTorch inference mode. Added LRU-cached vector RAG retrieval with 100% Hit@5 and expanded unit and integration test coverage across 150 scenario validations.",
    architectureWorkflow: [
      "Worker captures photo or submits voice note via PWA or mobile browser",
      "YOLOv8 object detection identifies physical hazards and obstacles in frame",
      "BLIP scene understanding models interpret environmental context and risk tier with PyTorch inference mode",
      "Deterministic Risk-Scoring Engine categorizes threat level (Low, Moderate, Critical) across 25 validated cases",
      "LRU-cached RAG retrieval delivers safety protocol guidelines in <0.01 ms",
      "Location-aware risk reporting dispatches multilingual alerts to field supervisors via 20-endpoint FastAPI backend"
    ],
    features: [
      "Reduced end-to-end multimodal hazard assessment latency by 59.7% (5.20 s to 2.10 s) on CPU through BLIP caption-pass optimization, image downscaling, and PyTorch inference mode.",
      "Optimized RAG retrieval using an LRU cache, reducing repeated-query latency from 216.9 ms to under 0.01 ms on cache hits while maintaining 100% Hit@5 across 35 queries.",
      "Expanded backend tests from 2 to 33 (100% pass, 66% coverage); validated 150 scenarios (96% pass) and 25/25 risk-engine cases, alongside a 20-endpoint FastAPI backend and multilingual supervisor dashboard."
    ],
    metrics: [
      { value: "59.7%", label: "CPU Latency Cut (5.2s → 2.1s)" },
      { value: "<0.01 ms", label: "RAG Cache Hit Latency" },
      { value: "100%", label: "Hit@5 across 35 Queries" },
      { value: "33/33", label: "Tests Passed (100% Pass)" }
    ],
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "YOLOv8",
      "BLIP",
      "Whisper",
      "ChromaDB"
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
    title: "CineSense — Hybrid AI Movie Recommendation & Grounded RAG Platform",
    badge: "Hero Project",
    period: "May 2026 – Jun 2026",
    tagline: "Hybrid recommendation and grounded ReAct assistant across 10,000+ titles with calibrated RRF, MMR, and sub-millisecond lookup.",
    description: "A production-grade cinema discovery platform fusing collaborative filtering (Implicit ALS) and neural embeddings via calibrated Reciprocal Rank Fusion & MMR, backed by an in-memory CatalogStore and an autonomous 0% hallucination Groq Llama-3.3-70B ReAct agent.",
    problem: "Traditional collaborative filtering suffers from cold-start latency and poor top-N ranking metrics, while ungrounded LLM chatbots hallucinate nonexistent movies and invalid metadata.",
    solution: "Implemented a 2-stage hybrid recommendation pipeline with calibrated Reciprocal Rank Fusion (RRF) and Maximal Marginal Relevance (MMR) re-ranking, an in-memory CatalogStore achieving sub-millisecond item lookups, and a candidate-whitelisted Groq Llama-3.3-70B ReAct assistant backed by a 50-test benchmark suite.",
    architectureWorkflow: [
      "User preferences & conversational query ingested by high-throughput FastAPI backend",
      "Candidate Generation: Implicit ALS Matrix Factorization (64 latent factors) + Neural kNN Embeddings",
      "Reciprocal Rank Fusion (RRF) combines rank scores; Maximal Marginal Relevance (MMR) diversifies output",
      "In-memory CatalogStore executes movie metadata lookups in 0.72 ms",
      "Autonomous ReAct agent (Groq Llama-3.3-70B) explains recommendations with candidate whitelist grounding",
      "Dual-tier Redis + PostgreSQL pgvector caching layer returns sub-millisecond responses with 100% candidate validation"
    ],
    features: [
      "Improved hybrid recommendation NDCG@10 by 221.8% (0.0308 to 0.0991) and Recall@10 by 307.5% (0.0332 to 0.1353) across 561 temporal-split users using calibrated Reciprocal Rank Fusion and MMR re-ranking.",
      "Reduced movie lookup latency by 97.5% (29.02 ms to 0.72 ms) and cold-start recommendation latency by 97.2% (1,189.9 ms to 33.0 ms) through an in-memory CatalogStore.",
      "Developed a grounded ReAct movie assistant using Groq Llama-3.3-70B and candidate-whitelist validation, achieving 100% candidate-ID validation and 74.06% Hit@5 across 320 queries; implemented dual-tier caching and a 50-test benchmark suite (100% pass rate)."
    ],
    metrics: [
      { value: "+221.8%", label: "NDCG@10 Improvement" },
      { value: "+307.5%", label: "Recall@10 Improvement" },
      { value: "0.72 ms", label: "CatalogStore Lookup Latency" },
      { value: "100%", label: "Candidate-ID Validation" }
    ],
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "PyTorch",
      "Implicit",
      "Groq",
      "PostgreSQL",
      "pgvector",
      "Redis",
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
