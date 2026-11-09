export interface EducationItem {
  degree: string;
  field: string;
  cgpa: string;
  college: string;
  university: string;
  expectedYear: string;
  status: string;
  hscCollege?: string;
  hscScore?: string;
  highlights: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issuedDate: string;
  credentialId?: string;
  instructor?: string;
  duration?: string;
  image: string;
  description: string;
}

export const EDUCATION: EducationItem = {
  degree: "Bachelor of Science (B.Sc.)",
  field: "Computer Science",
  cgpa: "8.73 CGPA",
  college: "JSPM’s Rajarshi Shahu Commerce and Science College, Pune",
  university: "Savitribai Phule Pune University (SPPU)",
  expectedYear: "2027",
  status: "In Progress",
  hscCollege: "Shree Samarth Uchha Madhyamik Vidyalay, Pune",
  hscScore: "76.17%",
  highlights: [
    "Maintaining an 8.73 CGPA with rigorous study in Data Structures, Relational Databases, Operating Systems, and Machine Learning.",
    "JSPM’s Rajarshi Shahu Commerce & Science College, affiliated with Savitribai Phule Pune University (SPPU).",
    "Hands-on architectural experimentation: local LLM inference, hybrid vector search evaluation (0.9538 Hit@1), and multi-agent systems."
  ]
};

const baseUrl = import.meta.env.BASE_URL || '/';

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "udemy-genai",
    title: "Complete Generative AI Course With Langchain and Huggingface",
    issuer: "Udemy",
    instructor: "Krish Naik, KRISHAI Technologies",
    duration: "57.5 total hours",
    issuedDate: "May 25, 2026",
    image: `${baseUrl}assets/udemy-genai.jpg`,
    description: "Comprehensive hands-on mastery of Large Language Models, LangChain orchestration, Hugging Face pipelines, vector databases (ChromaDB, Pinecone, FAISS), RAG architectures, and fine-tuning."
  },
  {
    id: "hackerrank-sql",
    title: "SQL (Advanced)",
    issuer: "HackerRank",
    credentialId: "384D48F6701E",
    issuedDate: "May 30, 2026",
    image: `${baseUrl}assets/hackerrank-sql.png`,
    description: "Rigorous verification of advanced query optimization, recursive CTEs, window functions, complex joins, indexing strategies, and database schema manipulation under time-constrained assessments."
  },
  {
    id: "hack-the-horizon",
    title: "Hack The Horizon 2.0",
    issuer: "VIT Chennai / Zuntra Digital",
    instructor: "Organized by AI Club, VIT Chennai & SW VIT Chennai",
    duration: "24-hour Hackathon Participant",
    issuedDate: "August 14, 2025",
    image: `${baseUrl}assets/hack-the-horizon.jpg`,
    description: "24-hour intensive competitive hackathon solving practical engineering and AI challenges under tight deadlines, collaborating on rapid prototyping and architecture deployment."
  }
];
