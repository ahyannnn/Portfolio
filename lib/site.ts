export const site = {
  name: "Ian George Sanico",
  shortName: "Ian Sanico",
  role: "IT Student & Aspiring Full-Stack Developer",
  tagline:
    "IT student focused on backend development — building reliable APIs, databases, and clean web applications with modern tools.",
  description:
    "Portfolio of Ian George Sanico, an IT student and aspiring full-stack developer showcasing projects, skills, education, and experience in modern web development.",
  // TODO: Replace with your real domain once deployed, e.g. https://yourdomain.dev
  url: "https://example.com",
  email: "iangeorgesanico@gmail.com",
  github: "https://github.com/ahyannnn",
  linkedin: "https://www.linkedin.com/in/ian-george-sanico-6a3b19435",
  resumeHref: "/resume.pdf",
  university: "Pambayang Dalubhasaan ng Marilao",
  degree: "BS Information Technology",
  period: "2023 — 2027",
  location: "Marilao, Bulacan, Philippines",
} as const;

export type Site = typeof site;

export const navLinks = [
  { href: "/#top", label: "Index" },
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;

export type NavLink = (typeof navLinks)[number];
