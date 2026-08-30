import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Project } from '../types/portfolio';
import { Github, Linkedin, ExternalLink, Sparkles, ArrowRight, ShieldCheck, Activity, Cpu, Gamepad2, Terminal } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation angle (max 14 degrees)
    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const getIcon = () => {
    switch (project.interactiveType) {
      case 'docsentinel':
        return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
      case 'cstr':
        return <Activity className="w-5 h-5 text-emerald-400" />;
      case 'neuralnet':
        return <Cpu className="w-5 h-5 text-purple-400" />;
      case 'cuberun':
        return <Gamepad2 className="w-5 h-5 text-pink-400" />;
      case 'sysinfo':
        return <Terminal className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="perspective-1000 h-full"
    >
      <div
        ref={cardRef}
        id={`project-card-${project.id}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(project)}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${
            isHovered ? '1.02, 1.02, 1.02' : '1, 1, 1'
          })`,
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
        }}
        className="group relative h-full flex flex-col justify-between rounded-2xl p-6 cursor-pointer overflow-hidden border transition-all duration-300 bg-slate-950/80 backdrop-blur-xl hover:shadow-[0_20px_50px_-15px_rgba(6,182,212,0.25)]"
      >
        {/* Border Accent Gradient */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{
            border: `1px solid ${project.colorGradient.border}`,
            boxShadow: isHovered ? `inset 0 0 25px ${project.colorGradient.border}` : 'none',
          }}
        />

        {/* Dynamic Interactive Mouse Glare Effect */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 260px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, ${glarePos.opacity}), transparent)`,
          }}
        />

        {/* Card Header & Badges */}
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm flex items-center justify-center"
              >
                {getIcon()}
              </div>
              <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                {project.category}
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-cyan-950/70 text-cyan-300 border border-cyan-500/30 group-hover:border-cyan-400 transition">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Interactive</span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
              {project.title}
            </h3>
            <p className="text-xs font-mono text-slate-400 mt-1">{project.subtitle}</p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
            {project.shortDescription}
          </p>

          {/* Metric Highlights Pill Grid */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {project.metrics.slice(0, 2).map((m, i) => (
              <div key={i} className="p-2 rounded-lg bg-slate-900/70 border border-slate-800/80 text-center">
                <div className="text-xs font-mono font-bold text-cyan-300">{m.value}</div>
                <div className="text-[10px] text-slate-400 truncate">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Card Footer: Tech Stack Tags & Interactive CTA */}
        <div className="relative z-10 pt-5 mt-4 border-t border-slate-800/80 space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-slate-400 group-hover:text-cyan-300 flex items-center gap-1.5 transition-colors">
              <span>Open Live Simulator</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>

            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={project.id === 'cuberun' ? 'View on LinkedIn' : 'View GitHub Repository'}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition"
              >
                {project.id === 'cuberun' ? <Linkedin className="w-4 h-4 text-cyan-400" /> : <Github className="w-4 h-4" />}
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
