import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { EducationSection } from "@/components/EducationSection";
import { ContactSection } from "@/components/ContactSection";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
      <Hero />
      <Separator />
      <About />
      <Separator />
      <SkillsSection />
      <Separator />
      <ProjectGrid />
      <Separator />
      <ExperienceTimeline />
      <Separator />
      <EducationSection />
      <Separator />
      <ContactSection />
    </div>
  );
}
