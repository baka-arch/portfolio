import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Download,
  Printer,
  Copy,
  Check,
  X,
  Sparkles,
  GraduationCap,
  Briefcase,
  Code2,
  Trophy,
  ExternalLink,
  MapPin,
  Mail,
  Calendar,
  Layers,
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA, SKILLS_DATA, EDUCATION_DATA } from '../data/portfolioData';
import { soundFX } from '../utils/soundEffects';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'education' | 'projects' | 'skills'>('overview');
  const [copied, setCopied] = useState(false);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    if (isOpen) {
      soundFX.playModalOpen();
      setIsScanning(true);
      const timer = setTimeout(() => setIsScanning(false), 1400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handlePrint = () => {
    soundFX.playClick();
    window.print();
  };

  const handleCopySummary = () => {
    soundFX.playClick();
    const resumeText = `ATUL NIGAM
IIT Delhi — B.Tech in Biochemical Engineering & Biotechnology ('28)
Email: ${PERSONAL_INFO.email}
GitHub: ${PERSONAL_INFO.github} | LinkedIn: ${PERSONAL_INFO.linkedin}

SUMMARY:
${PERSONAL_INFO.summary}

KEY PROJECTS:
• DocSentinel: AI Document Fraud Detection (FastAPI, Ollama LLMs, PyTorch, OpenCV) - 98.6% Accuracy
• Adiabatic CSTR Dynamic Simulator: Coupled non-linear ODE solver (RK4, Next.js, 60 FPS Canvas)
• NumPy Deep Learning Framework: MNIST 97.2% accuracy implemented purely with vectorized matrix calculus
• Linux System Info: Lightweight C++17 system utility parsing /proc and kernel uname syscalls

TECHNICAL SKILLS:
Python, C++17, React 19, Next.js, FastAPI, Three.js, PyTorch, Linux /proc, Git, Mathematical Modeling`;

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl"
          />

          {/* Holographic Resume Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl bg-slate-950/95 border border-cyan-500/30 shadow-[0_0_60px_rgba(6,182,212,0.25)] flex flex-col z-10 overflow-hidden"
          >
            {/* Holographic Laser Scan Line Animation */}
            {isScanning && (
              <motion.div
                initial={{ top: '0%' }}
                animate={{ top: '100%' }}
                transition={{ duration: 1.3, ease: 'easeInOut' }}
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] z-30 pointer-events-none"
              />
            )}

            {/* Header / HUD Toolbar */}
            <div className="p-4 sm:p-6 border-b border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-100">{PERSONAL_INFO.name}</h2>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                      IIT Delhi '28
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-400">{PERSONAL_INFO.tagline}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  id="resume-copy-summary-btn"
                  onClick={handleCopySummary}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                </button>

                <button
                  id="resume-print-btn"
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-300 text-slate-950 font-semibold text-xs font-mono flex items-center gap-1.5 hover:opacity-95 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>

                <button
                  id="resume-close-btn"
                  onClick={() => {
                    soundFX.playClick();
                    onClose();
                  }}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition ml-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 px-6 py-2.5 bg-slate-950 border-b border-slate-800 text-xs font-mono overflow-x-auto">
              {[
                { id: 'overview', label: 'Executive Overview', icon: <Sparkles className="w-3.5 h-3.5" /> },
                { id: 'education', label: 'IIT Delhi & Track', icon: <GraduationCap className="w-3.5 h-3.5" /> },
                { id: 'projects', label: 'Deep Tech Projects', icon: <Code2 className="w-3.5 h-3.5" /> },
                { id: 'skills', label: 'Skill Matrix & Toolchain', icon: <Layers className="w-3.5 h-3.5" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundFX.playClick();
                    setActiveTab(tab.id as any);
                  }}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                    activeTab === tab.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Tab 1: Executive Overview */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Bio Banner */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/30 space-y-3">
                    <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-semibold">
                      <Sparkles className="w-4 h-4" />
                      <span>Professional Profile</span>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {PERSONAL_INFO.summary}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        {PERSONAL_INFO.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-cyan-400" />
                        {PERSONAL_INFO.email}
                      </span>
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                      <h4 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                        Core Competencies
                      </h4>
                      <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                        <li>Mathematical modeling of complex biological & chemical kinetics (RK4 ODEs)</li>
                        <li>High-concurrency async microservices with Python, FastAPI & Docker</li>
                        <li>Vectorized matrix computations and neural networks from first principles</li>
                        <li>Modern reactive frontend systems with React 19, Next.js, and Three.js WebGL</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                      <h4 className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider">
                        Key Accomplishments
                      </h4>
                      <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                        <li>Engineered DocSentinel local LLM forensic pipeline with 98.6% fraud detection</li>
                        <li>Implemented MNIST 97.2% test accuracy autograd in pure NumPy</li>
                        <li>Active competitive programmer on LeetCode (`bakaSENKU`) and Codeforces (`BAKA_123`)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Education & Academic Track */}
              {activeTab === 'education' && (
                <div className="space-y-4">
                  {EDUCATION_DATA.map((item) => (
                    <div key={item.id} className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <h3 className="text-base font-bold text-slate-100">{item.title}</h3>
                          <div className="text-xs font-mono text-cyan-300 font-semibold">{item.institution}</div>
                        </div>
                        <div className="text-xs font-mono px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-400">
                          {item.period}
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

                      <div className="space-y-1.5 pt-1">
                        {item.achievements.map((ach, idx) => (
                          <div key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                            <span className="text-cyan-400 font-mono font-bold">›</span>
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                        {item.badges.map((badge, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-slate-400 border border-slate-800"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Deep Tech Projects */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  {PROJECTS_DATA.map((proj) => (
                    <div key={proj.id} className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <h3 className="text-base font-bold text-slate-100">{proj.title}</h3>
                          <p className="text-xs font-mono text-cyan-300">{proj.subtitle}</p>
                        </div>
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-slate-300 flex items-center gap-1.5 transition"
                        >
                          <span>Repository</span>
                          <ExternalLink className="w-3 h-3 text-cyan-400" />
                        </a>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">{proj.fullDescription}</p>

                      {/* Tech Roles */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {proj.techStack.map((tech, idx) => (
                          <div key={idx} className="p-2 rounded-lg bg-slate-950 text-xs font-mono border border-slate-800/80 flex items-center justify-between">
                            <span className="text-cyan-300 font-semibold">{tech.name}</span>
                            <span className="text-[10px] text-slate-400 truncate">{tech.role}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 4: Skill Matrix & Toolchain */}
              {activeTab === 'skills' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SKILLS_DATA.map((skill) => (
                    <div key={skill.id} className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-100">{skill.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
                            {skill.category}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-cyan-300">{skill.level}%</span>
                      </div>

                      <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${skill.level}%`,
                            backgroundColor: skill.color,
                          }}
                        />
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">{skill.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>IIT Delhi B.Tech Biotechnology & ML</span>
              <span className="text-cyan-400">Available for High-Impact Roles</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
