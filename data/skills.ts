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
    description: "APIs and server logic used in school and capstone work.",
    skills: ["Node.js", "REST APIs"],
  },
  {
    title: "Database",
    description: "Relational data modeling and queries.",
    skills: ["MySQL", "PostgreSQL"],
  },
  {
    title: "Tools",
    description: "Daily workflow for building and shipping.",
    skills: ["Git", "GitHub", "VS Code", "Figma"],
  },
];
