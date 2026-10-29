// Edit this file to swap in your real details.
export const profile = {
  name: "Nithin Reddy",
  initials: "NR",
  field: "Cybersecurity Engineer",
  tagline: "Cybersecurity engineer building tools that find vulnerabilities before attackers do.",
  email: "nithinofficial3093@gmail.com",
  cvUrl: "#",
  about:
    "Cybersecurity-focused Computer Science graduate with hands-on experience in malware detection, API security, security automation and SIEM development. Published researcher (IEEE Xplore) who also builds full-stack and AI products.",
  facts: [
    { label: "Based in", value: "Chennai, India" },
    { label: "Education", value: "SRMIST, B.Tech CSE (Cyber Security), CGPA 8.5" },
    { label: "Interests", value: "AI, Cyber Security, UI/UX" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/Nithinreddy3093" },
    { label: "LinkedIn", href: "https://linkedin.com/in/nithin-marthala" },
    { label: "Email", href: "mailto:nithinofficial3093@gmail.com" },
  ],
};

export const skills = [
  { group: "Security", items: ["OWASP Top 10", "OWASP API Security Top 10", "Network Security", "Malware Analysis", "Vulnerability Assessment", "SIEM"] },
  { group: "Languages", items: ["Python", "Java", "JavaScript", "TypeScript", "Go", "SQL"] },
  { group: "Web & Backend", items: ["React (Vite)", "Node.js", "Express", "FastAPI", "Flask", "REST APIs", "GraphQL"] },
  { group: "AI & ML", items: ["Scikit-learn", "LangChain", "NLP", "RAG", "Streamlit"] },
  { group: "Data & Cloud", items: ["MongoDB", "MySQL", "PostgreSQL", "SQLite", "Firebase", "AWS", "Docker", "Linux"] },
  { group: "Tools", items: ["Git", "GitHub Actions"] },
];

export type ProjectCategory = "Security" | "Full-Stack" | "AI";

export type Project = {
  title: string; blurb: string; tags: string[]; category: ProjectCategory;
  live: string; code: string;
  problem: string; role: string; process: string; result: string; hue: number;
};

export const projects: Project[] = [
  { title: "Secrets Scanner", blurb: "CLI that hunts leaked keys, tokens and passwords across source code and full Git history.", tags: ["Python", "Go", "Git Internals"], category: "Security", live: "#", code: "#", hue: 265,
    problem: "Leaked credentials in repos and commit history are a top breach vector.", role: "Solo — design and implementation.", process: "Pattern matching plus Shannon entropy to cut false positives; Have-I-Been-Pwned k-anonymity checks verify credentials without sending plaintext secrets.", result: "Generates SARIF reports that plug straight into CI/CD pipelines." },
  { title: "API Security Scanner", blurb: "Scans REST and GraphQL APIs against the OWASP API Security Top 10.", tags: ["Python", "FastAPI", "React"], category: "Security", live: "#", code: "#", hue: 250,
    problem: "BOLA, broken auth and injection flaws slip past manual API reviews.", role: "Solo — engine and dashboard.", process: "Built a fuzzing engine targeting BOLA, broken authentication, injection and access-control flaws; React dashboard prioritizes findings by severity.", result: "Turns a manual week-long API review into an automated scan." },
  { title: "SIEM Dashboard", blurb: "Collects, normalizes and correlates logs from many sources into one searchable timeline.", tags: ["Flask", "React", "MongoDB", "MySQL"], category: "Security", live: "#", code: "#", hue: 280,
    problem: "Incident investigation is slow when logs live in silos.", role: "Solo — pipeline and UI.", process: "Normalization layer, correlation rules and severity-based alerts over a searchable event timeline.", result: "A working mini-SIEM for incident investigation and threat hunting practice." },
  { title: "Since: Smart Market Watchlist", blurb: "Surfaces what meaningfully changed in your stocks since you last checked.", tags: ["Node.js", "Express", "TypeScript", "React", "SQLite"], category: "Full-Stack", live: "#", code: "#", hue: 140,
    problem: "Watchlists show prices, not what actually changed and why it matters.", role: "Full-stack, built in 72 hours for the Groww \"Code 2026\" Hackathon.", process: "Evidence cards powered by a severity/meaning-detection engine and a stock relationship graph, over live data from Yahoo Chart API, NSE deals and Google News RSS.", result: "Finalist-built hackathon project, delivered working in 72 hours." },
  { title: "MailMind", blurb: "Autonomous AI email agent for Gmail that triages your inbox.", tags: ["Chrome Extension", "JavaScript", "AI APIs"], category: "AI", live: "#", code: "#", hue: 45,
    problem: "Inbox triage eats hours every week.", role: "Solo — extension and agent logic.", process: "Per-sender trust scoring and tone adaptation, with OAuth scope minimization and encrypted sender profile storage for privacy.", result: "A security-first AI assistant that drafts and sorts like you would." },
  { title: "AI PR Reviewer", blurb: "LLM code reviews posted automatically as PR comments.", tags: ["Node.js", "Express", "GitHub API", "Claude API"], category: "AI", live: "#", code: "#", hue: 210,
    problem: "Review queues stall when reviewers are busy.", role: "Solo — webhook service.", process: "Listens to GitHub PR webhooks, fetches the diff and posts an LLM-generated review; secured with HMAC-SHA256 signature verification using constant-time comparison, plus async processing.", result: "First-pass reviews land in seconds, humans focus on the hard parts." },
  { title: "AI Resume Matcher & ATS", blurb: "Matches resumes to job descriptions with semantic similarity.", tags: ["Python", "NLP", "LangChain", "Streamlit"], category: "AI", live: "#", code: "#", hue: 90,
    problem: "Keyword ATS filters miss strong candidates who phrase things differently.", role: "Solo — model and app.", process: "Sentence-BERT semantic similarity between resumes and job descriptions, wrapped in a Streamlit app.", result: "Ranks candidates by meaning, not keyword overlap." },
  { title: "Question-Answering Bot with RAG", blurb: "Context-aware Q&A over your own documents.", tags: ["Python", "LangChain", "OpenAI API", "FAISS"], category: "AI", live: "#", code: "#", hue: 20,
    problem: "LLMs hallucinate when answers live in private documents.", role: "Solo — retrieval pipeline.", process: "Retrieval-augmented generation with a FAISS vector database grounding answers in source documents.", result: "Answers stay grounded in the actual corpus with citations." },
];

export const research = {
  title: "Android Malware Detection System",
  venue: "Published in IEEE Xplore",
  docNo: "Document No. 11382580",
  link: "https://ieeexplore.ieee.org/document/11382580",
  text: "An ML/DL framework for detecting Android malware from behavior data, comparing Random Forest, XGBoost, LightGBM, Bi-LSTM and GRU models, with SMOTE class balancing and StandardScaler preprocessing.",
};

export const timeline = [
  { when: "Jul 2025 — Sep 2025", title: "Web Developer Intern, Digisys InnoSol Pvt. Ltd.", kind: "Internship", text: "Built responsive React (Vite) UI components from design specs and fixed cross-browser and responsiveness bugs during QA cycles." },
  { when: "2023 — 2026", title: "Convenor & Committee Head, Directorate of Student Affairs, SRMIST", kind: "Leadership", text: "Led 500+ committee heads, members and volunteers and increased technical workshop participation by 30%." },
  { when: "Ongoing", title: "Founder, Mana Nithinu", kind: "Venture", text: "Educational content brand for B.Tech students on placement preparation and career guidance." },
  { when: "2022 — 2026", title: "B.Tech CSE (Cyber Security), SRMIST", kind: "Education", text: "CGPA 8.5. Coursework spanning security, networks, systems and machine learning." },
];

export const counters = [
  { label: "People led", value: 500, suffix: "+" },
  { label: "Workshop participation increase", value: 30, suffix: "%" },
  { label: "IEEE publication", value: 1, suffix: "" },
  { label: "Certifications", value: 7, suffix: "" },
];

export const awards = [
  { title: "Techquezt — Top 1.3%", org: "Out of 28,460 participants", year: "" },
  { title: "Best Domain Head Award", org: "Directorate of Student Affairs, SRMIST", year: "" },
  { title: "Groww \"Code 2026\" Hackathon", org: "Finalist-built project in 72 hours", year: "" },
];

export const certifications = [
  "Fortinet Certified Associate in Cybersecurity",
  "AWS Academy Graduate — Machine Learning Foundations",
  "Cisco Networking Basics",
  "HackerRank Python",
  "HackerRank SQL",
  "NPTEL Java",
  "Coursera Cryptography 1",
];

export const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "research", label: "Research" },
  { id: "experience", label: "Journey" },
  { id: "achievements", label: "Awards" },
  { id: "contact", label: "Contact" },
];
