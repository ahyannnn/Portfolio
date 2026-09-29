export const site = {
  name: "[YOUR NAME]",
  shortName: "[YOUR NAME]",
  role: "IT Student & Aspiring Developer",
  tagline:
    "IT student building clean, practical web applications with modern tools.",
  description:
    "Portfolio of an IT student showcasing projects, skills, education, and experience in modern web development.",
  // TODO: Replace with your real domain once deployed, e.g. https://yourname.dev
  url: "https://example.com",
  email: "[YOUR EMAIL]",
  github: "https://github.com/[YOUR GITHUB]",
  linkedin: "https://linkedin.com/in/[YOUR LINKEDIN]",
  resumeHref: "/resume.pdf",
  university: "[YOUR UNIVERSITY]",
  degree: "[YOUR DEGREE / PROGRAM]",
  period: "[START] — [END]",
  location: "[YOUR CITY, COUNTRY]",
} as const;

export type Site = typeof site;

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;

export type NavLink = (typeof navLinks)[number];
