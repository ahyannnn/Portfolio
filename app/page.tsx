import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <ProjectGrid />
      <About />
      <SkillsSection />
      <ExperienceTimeline />
      <ContactSection />
    </div>
  );
}
