import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILLS_DATA } from '../data/portfolioData';
import { SkillItem } from '../types/portfolio';
import {
  Code2,
  Terminal,
  GitBranch,
  Layers,
  Palette,
  Zap,
  Box,
  Activity,
  Sparkles,
  Info,
  Pause,
  Play,
  RotateCw,
} from 'lucide-react';

export const InteractiveSkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);
  const [isOrbitPaused, setIsOrbitPaused] = useState<boolean>(false);
  const [orbitAngleOffset, setOrbitAngleOffset] = useState<number>(0);

  // Animation frame for orbiting skills
  useEffect(() => {
    if (isOrbitPaused || hoveredSkill !== null) return;

    let animId: number;
    const updateOrbit = () => {
      setOrbitAngleOffset((prev) => (prev + 0.005) % (Math.PI * 2));
      animId = requestAnimationFrame(updateOrbit);
    };

    animId = requestAnimationFrame(updateOrbit);
    return () => cancelAnimationFrame(animId);
  }, [isOrbitPaused, hoveredSkill]);

  const categories = ['All', 'AI & ML', 'Full-Stack & Systems', 'Core & Low-Level', 'Bio-Engineering & Math'];

  const filteredSkills =
    activeCategory === 'All'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === activeCategory);

  const getSkillIcon = (name: string) => {
    switch (name) {
      case 'Python':
        return <span className="font-bold text-xs">Py</span>;
      case 'C++':
        return <Code2 className="w-5 h-5" />;
      case 'Next.js & React':
        return <Layers className="w-5 h-5" />;
      case 'FastAPI':
        return <Zap className="w-5 h-5" />;
      case 'Linux & Bash':
        return <Terminal className="w-5 h-5" />;
      case 'Git & GitHub':
        return <GitBranch className="w-5 h-5" />;
      case 'Figma & UI/UX':
        return <Palette className="w-5 h-5" />;
      case 'Three.js & WebGL':
        return <Box className="w-5 h-5" />;
      case 'Biochemical Systems':
        return <Activity className="w-5 h-5" />;
      default:
        return <Code2 className="w-5 h-5" />;
    }
  };

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Orbital Stack & Mastery</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-100"
        >
          Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">Skills & Toolchain</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base leading-relaxed"
        >
          Hover over any orbiting technological node to freeze its trajectory and inspect production experience, benchmarks, and real-world implementation contexts.
        </motion.p>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`skills-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-400/60 shadow-[0_0_10px_rgba(99,102,241,0.3)]'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Orbit Stage & Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Orbital 3D/2D Planetary System Viewport */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[460px] sm:min-h-[520px] rounded-3xl bg-slate-950/70 border border-slate-800/80 p-4 overflow-hidden">
          {/* Orbital Rings */}
          <div className="absolute w-[200px] h-[200px] rounded-full border border-dashed border-cyan-500/15 pointer-events-none" />
          <div className="absolute w-[300px] h-[300px] rounded-full border border-dashed border-indigo-500/15 pointer-events-none" />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-dashed border-emerald-500/15 pointer-events-none" />

          {/* Central Bio-Neural Nexus */}
          <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-400/40 shadow-[0_0_35px_rgba(6,182,212,0.4)] flex flex-col items-center justify-center text-center p-2 cursor-pointer transition-transform hover:scale-105">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping absolute -top-1 right-3" />
            <div className="text-[11px] font-mono font-bold text-cyan-300">IIT DELHI</div>
            <div className="text-[9px] text-slate-400">Core Nexus</div>
          </div>

          {/* Orbiting Tech Nodes */}
          {filteredSkills.map((skill, index) => {
            const currentAngle = skill.orbitAngle + orbitAngleOffset * (skill.orbitSpeed > 0 ? 1 : -1) * 1.5;
            // Elliptical coordinates
            const x = Math.cos(currentAngle) * (skill.orbitRadius * 0.95);
            const y = Math.sin(currentAngle) * (skill.orbitRadius * 0.75);

            const isHovered = hoveredSkill?.id === skill.id;

            return (
              <div
                key={skill.id}
                id={`orbit-node-${skill.id}`}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  transition: hoveredSkill ? 'all 0.2s ease-out' : 'transform 0.05s linear',
                }}
                className={`absolute z-20 flex flex-col items-center cursor-pointer group`}
              >
                {/* Node Pill Icon */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
                    isHovered
                      ? 'scale-125 bg-cyan-950 border-2 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.8)] text-cyan-200'
                      : 'bg-slate-900/90 border border-slate-700/80 text-slate-300 hover:border-cyan-400 hover:text-white shadow-lg'
                  }`}
                  style={{
                    boxShadow: isHovered ? `0 0 20px ${skill.color}` : 'none',
                  }}
                >
                  {getSkillIcon(skill.name)}
                </div>

                {/* Node Label */}
                <span
                  className={`mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium transition-all whitespace-nowrap ${
                    isHovered
                      ? 'bg-slate-900 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'bg-slate-950/80 text-slate-400 border border-slate-800'
                  }`}
                >
                  {skill.name.split(' ')[0]}
                </span>
              </div>
            );
          })}

          {/* Orbit Controls (Pause / Resume) */}
          <div className="absolute bottom-4 left-4 z-30 flex items-center gap-2">
            <button
              id="toggle-orbit-pause-btn"
              onClick={() => setIsOrbitPaused(!isOrbitPaused)}
              className="px-3 py-1 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition"
            >
              {isOrbitPaused ? (
                <>
                  <Play className="w-3 h-3 text-emerald-400" />
                  <span>Resume Orbit</span>
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3 text-cyan-400" />
                  <span>Pause Orbit</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Detailed Holographic Inspector Card */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-950/80 border border-slate-800 relative min-h-[460px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {hoveredSkill ? (
              <motion.div
                key={hoveredSkill.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-900 border border-slate-700"
                      style={{ color: hoveredSkill.color }}
                    >
                      {getSkillIcon(hoveredSkill.name)}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-100">{hoveredSkill.name}</h4>
                      <span className="text-xs font-mono text-slate-400">{hoveredSkill.category}</span>
                    </div>
                  </div>

                  <div className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
                    {hoveredSkill.yearsOfExperience}
                  </div>
                </div>

                {/* Proficiency Gauge */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Engineering Proficiency</span>
                    <span className="text-cyan-300 font-bold">{hoveredSkill.level}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${hoveredSkill.level}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: hoveredSkill.color,
                        boxShadow: `0 0 10px ${hoveredSkill.color}`,
                      }}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  {hoveredSkill.description}
                </div>

                {/* Practical Highlight */}
                <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200 space-y-1">
                  <div className="font-mono font-semibold text-cyan-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Key Real-World Application:
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{hoveredSkill.highlight}</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 text-center space-y-3 my-auto"
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                  <Info className="w-6 h-6" />
                </div>
                <h4 className="text-base font-semibold text-slate-200">Interactive Stack Inspector</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Hover over or touch any technological sphere in the orbital system to inspect technical mastery, real-world pipelines, and practical applications.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>IIT Delhi Biotech & ML</span>
            <span>Zero Slop Architecture</span>
          </div>
        </div>
      </div>
    </section>
  );
};
