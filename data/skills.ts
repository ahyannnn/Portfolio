import type { SkillCategory } from "@/types";

/** Only list technologies backed by real project/coursework evidence. */
export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    description: "Interfaces I have built with in projects and coursework.",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend",
    description: "APIs and server logic used in capstone and school work.",
    skills: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Database",
    description: "Data modeling and queries across SQL and NoSQL.",
    skills: ["MongoDB", "MySQL", "PostgreSQL"],
  },
  {
    title: "Mobile",
    description: "Companion mobile app for the SOLARIS capstone.",
    skills: ["Flutter"],
  },
  {
    title: "Tools",
    description: "Daily workflow for building and shipping.",
    skills: ["Git", "GitHub", "VS Code", "Figma"],
  },
];
