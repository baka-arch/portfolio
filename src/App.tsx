import React, { useState, useEffect } from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BentoGridSection } from './components/BentoGridSection';
import { ProjectsSection } from './components/ProjectsSection';
import { InteractiveSkillsSection } from './components/InteractiveSkillsSection';
import { BioDeepTechSection } from './components/BioDeepTechSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleScrollToProjects = () => {
    const el = document.getElementById('engineering-dna');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="portfolio-app-root" className="relative min-h-screen bg-[#04060c] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden font-sans">
      {/* Subtle Noise / Film Grain Filter */}
      <div className="fixed inset-0 pointer-events-none film-grain z-[1] opacity-60" />

      {/* Dynamic Three.js Particle & Molecular Canvas Background */}
      <AnimatedBackground />

      {/* Top Animated Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Floating Glassmorphic Header Navigation */}
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* Main Content Layout */}
      <main className="relative z-10">
        {/* 1. Hero Section with Typing Effect & Magnetic CTA */}
        <HeroSection
          onExploreClick={handleScrollToProjects}
          onOpenResume={() => setResumeModalOpen(true)}
        />

        {/* 2. Engineering DNA & Focus Bento Grid */}
        <BentoGridSection />

        {/* 3. Interactive 3D Tilt Project Cards & Live Simulators */}
        <ProjectsSection />

        {/* 4. Orbiting Skills & Toolchain with Hover Holographic Tooltips */}
        <InteractiveSkillsSection />

        {/* 5. Deep Tech Meets Bio-Engineering: IIT Delhi Modeling & Neural Systems */}
        <BioDeepTechSection />

        {/* 6. Academic & Engineering Milestones */}
        <ExperienceTimeline />

        {/* 7. Contact & Collaboration Dispatch Hub */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Command Palette & Hacker CLI */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* Holographic Resume / CV HUD Viewer */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
}
