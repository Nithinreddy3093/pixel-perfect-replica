// Edit this file to swap in your real details.
export const profile = {
  name: "Alex Rivera",
  initials: "AR",
  field: "Computer Science",
  tagline: "Computer Science student building thoughtful, human-scale software.",
  email: "alex.rivera@example.com",
  cvUrl: "#",
  about:
    "I'm a third-year CS student who loves the space where engineering meets design. I build web apps, tinker with graphics, and care a lot about software that feels calm and obvious to use. Outside of code you'll find me sketching, climbing, or reading about cities.",
  facts: [
    { label: "Based in", value: "Lisbon, Portugal" },
    { label: "University", value: "University of Lisbon, BSc CS" },
    { label: "Currently learning", value: "Rust & WebGPU" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Twitter", href: "https://x.com" },
    { label: "Dribbble", href: "https://dribbble.com" },
  ],
};

export const skills = [
  { group: "Languages", items: ["TypeScript", "Python", "Java", "C", "SQL", "Rust"] },
  { group: "Frameworks", items: ["React", "Node.js", "Three.js", "FastAPI", "Tailwind", "PyTorch"] },
  { group: "Design Tools", items: ["Figma", "Blender", "Illustrator", "Framer"] },
  { group: "Soft Skills", items: ["Communication", "Team leadership", "Mentoring", "Writing"] },
];

export type Project = {
  title: string; blurb: string; tags: string[]; live: string; code: string;
  problem: string; role: string; process: string; result: string; hue: number;
};

export const projects: Project[] = [
  { title: "Campus Commons", blurb: "A room-booking app used by 4,000 students.", tags: ["React", "Node", "Postgres"], live: "#", code: "#", hue: 35,
    problem: "Booking study rooms meant queueing at a front desk.", role: "Lead developer, team of 3.", process: "Interviewed 30 students, prototyped in Figma, shipped weekly.", result: "Adopted campus-wide; booking time fell from 10 min to 20 s." },
  { title: "Tidewatch", blurb: "Visualising coastal sea-level data in 3D.", tags: ["Three.js", "D3", "Python"], live: "#", code: "#", hue: 220,
    problem: "Climate datasets are hard for the public to read.", role: "Solo — data + frontend.", process: "Cleaned NOAA data, built an interactive terrain model.", result: "Featured in a local science museum exhibit." },
  { title: "Notely", blurb: "Offline-first markdown notes with sync.", tags: ["TypeScript", "IndexedDB", "PWA"], live: "#", code: "#", hue: 140,
    problem: "Students lose notes on patchy Wi-Fi.", role: "Full-stack developer.", process: "CRDT-based sync, extensive offline testing.", result: "1.2k GitHub stars, used in two courses." },
  { title: "Sortify", blurb: "Algorithm visualiser for first-year students.", tags: ["React", "Framer Motion"], live: "#", code: "#", hue: 60,
    problem: "Sorting algorithms feel abstract on a whiteboard.", role: "Designer & developer.", process: "Paired with a TA to map common misconceptions.", result: "Now part of the intro algorithms course." },
  { title: "Greenline", blurb: "Hackathon winner: carbon-aware route planner.", tags: ["FastAPI", "Maps", "ML"], live: "#", code: "#", hue: 160,
    problem: "Commuters can't compare trip emissions.", role: "Backend & ML, team of 4.", process: "48 hours, open transit data, lightweight model.", result: "1st place at HackLisboa 2025." },
  { title: "Paper Type", blurb: "A generative poster tool for print designers.", tags: ["Canvas", "WebGL"], live: "#", code: "#", hue: 0,
    problem: "Designers wanted quick generative layouts.", role: "Solo side project.", process: "Iterated with five designers over a month.", result: "Used for a student gallery identity." },
];

export const timeline = [
  { when: "2026 — now", title: "Frontend Intern, Lumen Labs", kind: "Internship", text: "Building design-system components and 3D product viewers." },
  { when: "2025", title: "Winner, HackLisboa", kind: "Hackathon", text: "Led backend for a carbon-aware route planner." },
  { when: "2024 — 2025", title: "President, Code Club", kind: "Club", text: "Grew membership to 200 and ran weekly workshops." },
  { when: "2024", title: "Volunteer Tutor, CodeBridge", kind: "Volunteering", text: "Taught programming basics to high-schoolers." },
  { when: "2023 — 2027", title: "BSc Computer Science", kind: "Education", text: "Coursework: graphics, HCI, distributed systems, ML." },
];

export const counters = [
  { label: "Projects built", value: 24 },
  { label: "Hackathons", value: 7 },
  { label: "Certifications", value: 5 },
  { label: "Years learning", value: 6 },
];

export const awards = [
  { title: "Dean's List", org: "University of Lisbon", year: "2025" },
  { title: "1st Place, HackLisboa", org: "HackLisboa", year: "2025" },
  { title: "AWS Cloud Practitioner", org: "Amazon Web Services", year: "2024" },
  { title: "Google UX Certificate", org: "Coursera", year: "2024" },
];

export const testimonials = [
  { quote: "Alex combines rare technical depth with genuine care for the people using the software.", name: "Dr. Helena Costa", role: "Professor, HCI" },
  { quote: "The calmest person in a 48-hour hackathon — and the one who shipped the backend.", name: "Miguel Santos", role: "Teammate" },
  { quote: "Alex's components are now the backbone of our design system.", name: "Priya Shah", role: "Engineering Mentor, Lumen Labs" },
];

export const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Journey" },
  { id: "achievements", label: "Awards" },
  { id: "contact", label: "Contact" },
];
