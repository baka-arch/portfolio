import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal,
  Search,
  Sparkles,
  Command,
  FileText,
  FolderGit2,
  Cpu,
  Mail,
  Zap,
  ExternalLink,
  Code2,
  Atom,
  X,
  CornerDownLeft,
  Flame,
} from 'lucide-react';
import { PROJECTS_DATA, PERSONAL_INFO } from '../data/portfolioData';
import { soundFX } from '../utils/soundEffects';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResume,
}) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'quick' | 'terminal'>('quick');
  const [terminalHistory, setTerminalHistory] = useState<
    { type: 'input' | 'output' | 'error' | 'success'; text: string }[]
  >([
    { type: 'output', text: '⚡ ATUL NIGAM — CYBERNETIC TERMINAL v2.8' },
    { type: 'output', text: 'Type "help" for an index of executable commands, or "projects" to query repositories.' },
  ]);
  const [termInput, setTermInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const termInputRef = useRef<HTMLInputElement>(null);
  const termBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      soundFX.playModalOpen();
      setTimeout(() => {
        if (activeTab === 'quick') inputRef.current?.focus();
        else termInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, activeTab]);

  useEffect(() => {
    termBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleNavigate = (hash: string) => {
    soundFX.playClick();
    onClose();
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = termInput.trim().toLowerCase();
    if (!cmd) return;

    soundFX.playTerminalBeep();
    const newHistory = [...terminalHistory, { type: 'input' as const, text: `$ ${termInput}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Available Commands:
  • help           - List available terminal operations
  • projects       - Query portfolio engineering projects & live simulators
  • skills         - Inspect neural, systems & biotech toolchain
  • bio            - View IIT Delhi deep-tech & reactor dynamics research
  • bento          - Jump to engineering DNA & focus dashboard
  • resume         - Launch holographic interactive HUD resume viewer
  • contact        - Jump to direct dispatch terminal
  • arch           - Print Linux kernel & system environment telemetry
  • sudo hire-me   - Unlock immediate collaboration dispatch
  • matrix         - Trigger celebratory visual feedback
  • clear          - Flush terminal screen`,
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'success',
          text: PROJECTS_DATA.map((p, i) => `[${i + 1}] ${p.title} (${p.category}) -> ${p.tags.join(', ')}`).join('\n'),
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: 'Core Toolchain: Python, C++17, Next.js, React 19, FastAPI, Three.js, PyTorch, Linux /proc, RK4 ODEs, Ollama',
        });
        break;

      case 'bio':
        handleNavigate('#bio-tech-fusion');
        newHistory.push({ type: 'success', text: 'Navigating to Biochemical Deep Tech section...' });
        break;

      case 'bento':
        handleNavigate('#engineering-dna');
        newHistory.push({ type: 'success', text: 'Navigating to Engineering DNA Bento Grid...' });
        break;

      case 'resume':
        onClose();
        onOpenResume();
        break;

      case 'contact':
        handleNavigate('#contact');
        newHistory.push({ type: 'success', text: 'Navigating to direct contact terminal...' });
        break;

      case 'arch':
        newHistory.push({
          type: 'output',
          text: `OS: Arch Linux x86_64\nHost: ThinkPad / Custom Rig\nKernel: 6.12.9-arch1-1\nShell: zsh 5.9 + neovim\nWM: Hyprland / Wayland\nCPU: AMD Ryzen 7 / Intel Core i7\nGPU: NVIDIA RTX / CUDA Compute 8.9\nMemory: 32GB DDR5 / 6400MT/s`,
        });
        break;

      case 'sudo hire-me':
        newHistory.push({
          type: 'success',
          text: `ACCESS GRANTED. Atul is open to high-impact AI/ML, Full-Stack Systems & Modeling roles! Dispatching email...`,
        });
        setTimeout(() => {
          window.location.href = `mailto:${PERSONAL_INFO.email}?subject=Collaboration%20Inquiry%20via%20Terminal`;
        }, 1200);
        break;

      case 'matrix':
        newHistory.push({
          type: 'success',
          text: 'Wake up, Neo... The Matrix has you. Follow the white rabbit 🐇',
        });
        soundFX.playChime();
        break;

      case 'clear':
        setTerminalHistory([]);
        setTermInput('');
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `zsh: command not found: ${cmd}. Type "help" for a list of valid commands.`,
        });
        break;
    }

    setTerminalHistory(newHistory);
    setTermInput('');
  };

  const filteredProjects = PROJECTS_DATA.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );

  const quickNavItems = [
    { label: 'Engineering DNA (Bento Grid)', hash: '#engineering-dna', icon: <Cpu className="w-4 h-4 text-cyan-400" /> },
    { label: 'Featured Projects & Simulators', hash: '#projects', icon: <FolderGit2 className="w-4 h-4 text-emerald-400" /> },
    { label: 'Orbital Skills & Toolchain', hash: '#skills', icon: <Sparkles className="w-4 h-4 text-indigo-400" /> },
    { label: 'Deep Tech Meets Bio-Engineering', hash: '#bio-tech-fusion', icon: <Atom className="w-4 h-4 text-teal-400" /> },
    { label: 'Education & Milestones (IIT Delhi)', hash: '#experience', icon: <Flame className="w-4 h-4 text-amber-400" /> },
    { label: 'Contact & Collaboration Dispatch', hash: '#contact', icon: <Mail className="w-4 h-4 text-pink-400" /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl rounded-2xl bg-slate-950/95 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden flex flex-col z-10"
          >
            {/* Modal Header & Tabs */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/60">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    soundFX.playClick();
                    setActiveTab('quick');
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition ${
                    activeTab === 'quick'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Quick Launcher</span>
                </button>

                <button
                  onClick={() => {
                    soundFX.playClick();
                    setActiveTab('terminal');
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition ${
                    activeTab === 'terminal'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Hacker CLI</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenResume();
                  }}
                  className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700/80 hover:border-cyan-500/40 text-[11px] font-mono text-cyan-300 flex items-center gap-1 transition"
                >
                  <FileText className="w-3 h-3 text-cyan-400" />
                  <span>Resume HUD</span>
                </button>

                <button
                  onClick={() => {
                    soundFX.playClick();
                    onClose();
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* View Tab 1: Quick Launcher */}
            {activeTab === 'quick' && (
              <div className="flex flex-col">
                {/* Search Input */}
                <div className="flex items-center px-4 py-3.5 border-b border-slate-800/80 gap-3">
                  <Search className="w-4 h-4 text-cyan-400 shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search projects, skills, tech tags, or navigate..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-mono"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className="text-xs font-mono text-slate-500 hover:text-slate-300"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Results List */}
                <div className="max-h-[380px] overflow-y-auto p-3 space-y-4">
                  {/* Quick Section Navigations */}
                  <div>
                    <div className="px-2 pb-1.5 text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wider">
                      Quick Navigations
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {quickNavItems.map((item) => (
                        <button
                          key={item.hash}
                          onClick={() => handleNavigate(item.hash)}
                          onMouseEnter={() => soundFX.playHover()}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900/50 hover:bg-cyan-950/40 hover:border-cyan-500/30 border border-slate-800/80 text-left text-xs text-slate-200 transition group"
                        >
                          <div className="flex items-center gap-2.5">
                            {item.icon}
                            <span>{item.label}</span>
                          </div>
                          <CornerDownLeft className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filtered Projects */}
                  <div>
                    <div className="px-2 pb-1.5 text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wider">
                      Projects & Simulators ({filteredProjects.length})
                    </div>
                    <div className="space-y-1.5">
                      {filteredProjects.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => handleNavigate('#projects')}
                          onMouseEnter={() => soundFX.playHover()}
                          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-cyan-500/40 text-left transition group"
                        >
                          <div className="space-y-0.5">
                            <div className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                              {p.title}
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono line-clamp-1">
                              {p.subtitle}
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950 text-cyan-300 border border-slate-800">
                              {p.category.split(' ')[0]}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* View Tab 2: Interactive Terminal CLI */}
            {activeTab === 'terminal' && (
              <div className="p-4 flex flex-col h-[380px]">
                <div className="flex-1 overflow-y-auto space-y-2 font-mono text-xs pr-1">
                  {terminalHistory.map((item, idx) => (
                    <div
                      key={idx}
                      className={`whitespace-pre-wrap leading-relaxed ${
                        item.type === 'input'
                          ? 'text-cyan-300 font-semibold'
                          : item.type === 'error'
                          ? 'text-rose-400'
                          : item.type === 'success'
                          ? 'text-emerald-300'
                          : 'text-slate-300'
                      }`}
                    >
                      {item.text}
                    </div>
                  ))}
                  <div ref={termBottomRef} />
                </div>

                {/* CLI Input */}
                <form onSubmit={handleTerminalSubmit} className="mt-3 pt-2 border-t border-slate-800 flex items-center gap-2">
                  <span className="text-cyan-400 font-mono text-xs font-bold">senku@arch:~$</span>
                  <input
                    ref={termInputRef}
                    type="text"
                    value={termInput}
                    onChange={(e) => setTermInput(e.target.value)}
                    placeholder="Type command (e.g. 'help', 'arch', 'sudo hire-me')..."
                    className="flex-1 bg-transparent text-xs font-mono text-slate-100 placeholder-slate-600 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-mono border border-cyan-500/30 hover:bg-cyan-500/30"
                  >
                    RUN
                  </button>
                </form>
              </div>
            )}

            {/* Modal Footer Key Hints */}
            <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950 text-[11px] font-mono text-slate-500 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[10px]">
                    ESC
                  </kbd>{' '}
                  to close
                </span>
                <span className="hidden sm:inline">|</span>
                <span className="hidden sm:flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[10px]">
                    ⌘K
                  </kbd>{' '}
                  global toggle
                </span>
              </div>
              <span className="text-cyan-400 font-semibold">IIT Delhi '28</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
