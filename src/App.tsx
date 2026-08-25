import React, { useRef } from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { InteractiveSkillsSection } from './components/InteractiveSkillsSection';
import { BioDeepTechSection } from './components/BioDeepTechSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="portfolio-app-root" className="relative min-h-screen bg-[#04060c] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden font-sans">
      {/* Dynamic Three.js Particle & Molecular Canvas Background */}
      <AnimatedBackground />

      {/* Top Animated Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Floating Glassmorphic Header Navigation */}
      <Navbar />

      {/* Main Content Layout */}
      <main className="relative z-10">
        {/* 1. Hero Section with Typing Effect & Magnetic CTA */}
        <HeroSection onExploreClick={handleScrollToProjects} />

        {/* 2. Interactive 3D Tilt Project Cards & Live Simulators */}
        <ProjectsSection />

        {/* 3. Orbiting Skills & Toolchain with Hover Holographic Tooltips */}
        <InteractiveSkillsSection />

        {/* 4. Deep Tech Meets Bio-Engineering: IIT Delhi Modeling & Neural Systems */}
        <BioDeepTechSection />

        {/* 5. Academic & Engineering Milestones */}
        <ExperienceTimeline />

        {/* 6. Contact & Collaboration Dispatch Hub */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
