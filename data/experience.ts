import type { EducationItem, ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    id: "solaris-capstone",
    role: "Backend Developer — SOLARIS Capstone",
    organization: "Pambayang Dalubhasaan ng Marilao",
    period: "Present",
    location: "Marilao, Bulacan",
    summary:
      "Team capstone building SOLARIS, a booking and billing system for solar projects (MERN web + Flutter mobile).",
    highlights: [
      "Build backend API endpoints and data handling for bookings, billing, and project records.",
      "Collaborate with frontend and mobile teammates on API contracts and data models.",
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
      "School project — web system for apartment applications and billing.",
    highlights: [
      "Built flows for tenant applications and billing records.",
      "TODO: Add the real stack and your specific contributions once confirmed.",
    ],
    tags: ["Web Development"],
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
      "TODO: Add honors, organizations, or certifications if applicable.",
    ],
  },
];
