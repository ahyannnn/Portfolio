import type { EducationItem, ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    id: "solaris-capstone",
    role: "Backend Developer & System Architect — SOLARIS Capstone",
    organization: "Pambayang Dalubhasaan ng Marilao",
    period: "Fourth Year - Present",
    location: "Marilao, Bulacan",
    summary:
      "Team capstone building SOLARIS, a booking and billing system for solar projects (MERN web + Flutter mobile).",
    highlights: [
      "Designed and implemented the backend architecture and database structure — server-side logic, API endpoints, and data processing.",
      "Established system infrastructure and communication across web app, backend services, database, and the Flutter companion app.",
      "Handle system-level testing, debugging, integration, and core technical implementation.",
    ],
    tags: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Flutter"],
    kind: "Project",
  },
  {
    id: "rentahanan-coursework",
    role: "Developer — Rentahanan",
    organization: "Pambayang Dalubhasaan ng Marilao",
    period: "Third year",
    summary:
      "School project — web system for apartment applications and billing (React + Flask + MySQL).",
    highlights: [
      "Designed the Flask backend architecture and MySQL database — server logic, endpoints, and data processing.",
      "Built frontend-backend integration and the overall technical infrastructure, plus backend testing and debugging.",
    ],
    tags: ["React", "Flask", "MySQL", "REST APIs"],
    kind: "Project",
  },
];

export const education: EducationItem[] = [
  {
    degree: "BS Information Technology",
    school: "Pambayang Dalubhasaan ng Marilao",
    period: "2023 — 2027",
    location: "Abangan Norte, Marilao, Bulacan",
    details: [
      "Relevant coursework: web development, databases, and capstone project (SOLARIS).",
      "Member — League of Information and Technology Enthusiasts (LITE).",
    ],
  },
];
