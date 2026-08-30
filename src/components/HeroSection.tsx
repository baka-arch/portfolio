import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  ArrowDown,
  Terminal,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Activity,
  Code2,
  Trophy,
  FileText,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/soundEffects';
import { ScrambleText } from './ScrambleText';

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onOpenResume }) => {
  // Typewriter effect state
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(70);

  const skills = PERSONAL_INFO.skillsTypewriter;

  useEffect(() => {
    const currentFullText = skills[textIndex];

    const handleType = () => {
      if (!isDeleting) {
        setDisplayedText(currentFullText.substring(0, displayedText.length + 1));
        setTypingSpeed(60);

        if (displayedText.length + 1 === currentFullText.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayedText(currentFullText.substring(0, displayedText.length - 1));
        setTypingSpeed(30);

        if (displayedText.length === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % skills.length);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, textIndex, skills, typingSpeed]);

  // Magnetic Button Physics
  const btnRef = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const magneticX = useSpring(mouseX, springConfig);
  const magneticY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x * 0.45);
    mouseY.set(y * 0.45);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const triggerConfettiCelebration = () => {
    soundFX.playClick();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#10b981', '#8b5cf6', '#38bdf8'],
    });
    onExploreClick();
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-20 pb-16 z-10 max-w-6xl mx-auto text-center"
    >
      {/* Top Academic & Institution Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onMouseEnter={() => soundFX.playHover()}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)] text-xs text-slate-300 font-mono mb-6 cursor-default"
      >
        <GraduationCap className="w-4 h-4 text-cyan-400" />
        <span>IIT Delhi</span>
        <span className="text-slate-600">|</span>
        <span className="text-cyan-300">Biochemical Engineering & Biotechnology</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
      </motion.div>

      {/* Main Headline */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="space-y-4 max-w-4xl"
      >
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100">
          Hello, I'm{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 drop-shadow-sm">
            <ScrambleText text={PERSONAL_INFO.name} />
          </span>
        </h1>

        {/* Dynamic Typewriter Subheading */}
        <div className="h-12 flex items-center justify-center text-lg sm:text-2xl font-mono text-slate-300 font-medium">
          <span className="text-cyan-400 mr-2">&gt;</span>
          <span className="text-slate-200">{displayedText}</span>
          <span className="w-2.5 h-6 bg-cyan-400 ml-1 inline-block animate-pulse" />
        </div>

        {/* Bio Summary Paragraph */}
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed pt-2">
          {PERSONAL_INFO.summary}
        </p>
      </motion.div>

      {/* Action Buttons & Magnetic CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-4 mt-8"
      >
        {/* Magnetic Explore Button */}
        <motion.button
          ref={btnRef}
          id="hero-magnetic-explore-btn"
          style={{ x: magneticX, y: magneticY }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => soundFX.playHover()}
          onMouseLeave={handleMouseLeave}
          onClick={triggerConfettiCelebration}
          className="group relative px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 hover:from-cyan-300 hover:to-teal-200 shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all duration-200 flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>Explore My Work</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        {/* Resume HUD Viewer Button */}
        <button
          id="hero-resume-btn"
          onClick={() => {
            soundFX.playClick();
            onOpenResume();
          }}
          onMouseEnter={() => soundFX.playHover()}
          className="px-6 py-3.5 rounded-xl font-medium text-sm text-cyan-300 bg-slate-900/90 hover:bg-slate-850 border border-cyan-500/30 hover:border-cyan-400 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>Resume / CV</span>
        </button>

        {/* Contact / Email Button */}
        <a
          id="hero-email-btn"
          href={`mailto:${PERSONAL_INFO.email}`}
          onMouseEnter={() => soundFX.playHover()}
          onClick={() => soundFX.playClick()}
          className="px-6 py-3.5 rounded-xl font-medium text-sm text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/40 backdrop-blur-md transition-all flex items-center gap-2"
        >
          <Mail className="w-4 h-4 text-cyan-400" />
          <span>Get in Touch</span>
        </a>

        {/* Social Links */}
        <div className="flex items-center gap-2 ml-1">
          <a
            id="hero-github-link"
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            onMouseEnter={() => soundFX.playHover()}
            onClick={() => soundFX.playClick()}
            className="p-3 rounded-xl bg-slate-900/90 text-slate-400 hover:text-slate-100 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            id="hero-linkedin-link"
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            onMouseEnter={() => soundFX.playHover()}
            onClick={() => soundFX.playClick()}
            className="p-3 rounded-xl bg-slate-900/90 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            id="hero-leetcode-link"
            href={PERSONAL_INFO.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            title="LeetCode Profile"
            onMouseEnter={() => soundFX.playHover()}
            onClick={() => soundFX.playClick()}
            className="p-3 rounded-xl bg-slate-900/90 text-slate-400 hover:text-amber-400 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition"
          >
            <Code2 className="w-4 h-4" />
          </a>
          <a
            id="hero-codeforces-link"
            href={PERSONAL_INFO.codeforces}
            target="_blank"
            rel="noopener noreferrer"
            title="Codeforces Profile"
            onMouseEnter={() => soundFX.playHover()}
            onClick={() => soundFX.playClick()}
            className="p-3 rounded-xl bg-slate-900/90 text-slate-400 hover:text-blue-400 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition"
          >
            <Trophy className="w-4 h-4" />
          </a>
        </div>
      </motion.div>

      {/* Quick Metrics & Bio Highlights Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-12 w-full max-w-4xl"
      >
        {PERSONAL_INFO.quickStats.map((stat, i) => (
          <div
            key={i}
            id={`hero-stat-${i}`}
            onMouseEnter={() => soundFX.playHover()}
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-md text-left transition hover:border-cyan-500/30 hover:bg-slate-900/80"
          >
            <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-300">
              {stat.value}
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-0.5">{stat.label}</div>
            <div className="text-[11px] text-slate-500 truncate mt-0.5">{stat.note}</div>
          </div>
        ))}
      </motion.div>

      {/* Scroll Down Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 text-xs font-mono cursor-pointer hover:text-cyan-400 transition"
        onClick={() => {
          soundFX.playClick();
          onExploreClick();
        }}
      >
        <span>Scroll to Explore</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce text-cyan-400" />
      </motion.div>
    </section>
  );
};
