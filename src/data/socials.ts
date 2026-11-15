export interface SocialLink {
  label: string;
  url: string;
  icon: string;
  handle?: string;
  highlight?: boolean;
}

const baseUrl = import.meta.env.BASE_URL || '/';

export const PERSONAL_INFO = {
  name: "Shravan Katkar",
  fullName: "Shravan Suresh Katkar",
  role: "AI Developer & Generative AI Engineer",
  headline: "BUILDING INTELLIGENCE. ENGINEERING EXPERIENCES.",
  subheadline: "Turning complex ideas into intelligent, practical software.",
  description: "AI Developer and B.Sc. Computer Science undergraduate (8.73 CGPA, expected 2027) building production-style Generative AI and machine learning systems, including RAG pipelines, LLM integrations, and computer vision applications.",
  location: "Pune, India",
  email: "shravankatkar818@gmail.com",
  phone: "+91 93097 35116",
  availability: "AVAILABLE FOR OPPORTUNITIES",
  degree: "B.Sc. Computer Science (8.73 CGPA)",
  expectedGraduation: "2027",
  github: "https://github.com/ShravanKatkar",
  linkedin: "https://www.linkedin.com/in/shravankatkar",
  resumePath: `${baseUrl}resume.pdf`,
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "GitHub",
    url: PERSONAL_INFO.github,
    icon: "github",
    handle: "@ShravanKatkar",
    highlight: true,
  },
  {
    label: "LinkedIn",
    url: PERSONAL_INFO.linkedin,
    icon: "linkedin",
    handle: "in/shravankatkar",
    highlight: true,
  },
  {
    label: "Email",
    url: `mailto:${PERSONAL_INFO.email}?subject=Opportunity%20for%20Shravan`,
    icon: "mail",
    handle: PERSONAL_INFO.email,
  },
];
