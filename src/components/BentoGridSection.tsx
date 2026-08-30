import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Clock,
  Code2,
  Terminal,
  Trophy,
  Sparkles,
  Zap,
  Radio,
  Cpu,
  Flame,
  Globe2,
  ShieldCheck,
  Headphones,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Maximize2,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFX } from '../utils/soundEffects';
import { ScrambleText } from './ScrambleText';

export const BentoGridSection: React.FC = () => {
  // Live IST Time
  const [istTime, setIstTime] = useState('');
  const [isCopiedNeofetch, setIsCopiedNeofetch] = useState(false);
  const [isPlayingAudioSim, setIsPlayingAudioSim] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setIstTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Canvas visualizer animation for focus audio
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barCount = 28;
      const barWidth = canvas.width / barCount - 2;

      for (let i = 0; i < barCount; i++) {
        const height = isPlayingAudioSim
          ? Math.abs(Math.sin(phase + i * 0.25) * (canvas.height * 0.75)) + 4
          : 4;

        const x = i * (barWidth + 2);
        const y = canvas.height - height;

        const gradient = ctx.createLinearGradient(0, y, 0, canvas.height);
        gradient.addColorStop(0, '#38bdf8');
        gradient.addColorStop(1, '#06b6d4');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, height);
      }

      phase += 0.08;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlayingAudioSim]);

  const handleCopyArchInfo = () => {
    soundFX.playClick();
    const archText = `OS: Arch Linux x86_64\nKernel: 6.12.9-arch1-1\nWM: Hyprland (Wayland)\nEditor: Neovim + Lua\nPrimary Compiler: g++ 14.2 (C++17/20)\nLocal LLM: Ollama (Llama 3 / Mistral)`;
    navigator.clipboard.writeText(archText);
    setIsCopiedNeofetch(true);
    setTimeout(() => setIsCopiedNeofetch(false), 2500);
  };

  return (
    <section id="engineering-dna" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono"
        >
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>Systems & Mindset</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-100"
        >
          Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">DNA & Focus</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base leading-relaxed"
        >
          A real-time telemetry dashboard covering competitive programming benchmarks, environment architecture, live timezone synchronization, and developer habits.
        </motion.p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Bento 1: Live IST Timezone & Base (4 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onMouseEnter={() => soundFX.playHover()}
          className="md:col-span-4 p-6 rounded-3xl bg-slate-950/80 border border-slate-800/90 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <Globe2 className="w-4 h-4 text-cyan-400" />
              <span>TIMEZONE TELEMETRY</span>
            </div>
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE / IST
            </span>
          </div>

          <div className="space-y-2">
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-100 tracking-tight">
              {istTime || '00:00:00 AM'}
            </div>
            <div className="text-xs font-mono text-slate-400">
              New Delhi, India (UTC +05:30)
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-xs text-slate-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">🏛️</span>
              <span className="font-semibold text-slate-200">IIT Delhi Campus</span>
            </div>
            <span className="text-[11px] font-mono text-cyan-300">Class of '28</span>
          </div>
        </motion.div>

        {/* Bento 2: Competitive Programming Hub (8 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onMouseEnter={() => soundFX.playHover()}
          className="md:col-span-8 p-6 rounded-3xl bg-slate-950/80 border border-slate-800/90 hover:border-amber-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>COMPETITIVE CODING & PROBLEM SOLVING</span>
            </div>
            <span className="text-xs font-mono text-slate-400">C++17 Algorithmic Rigor</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* LeetCode Card */}
            <a
              href={PERSONAL_INFO.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition flex items-center justify-between group/lc"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-slate-200">LeetCode Profile</span>
                </div>
                <div className="text-lg font-bold font-mono text-amber-300">bakaSENKU</div>
                <div className="text-[11px] text-slate-400">Data Structures & Dynamic Programming</div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-600 group-hover/lc:text-amber-400 transition-colors" />
            </a>

            {/* Codeforces Card */}
            <a
              href={PERSONAL_INFO.codeforces}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition flex items-center justify-between group/cf"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-bold text-slate-200">Codeforces Profile</span>
                </div>
                <div className="text-lg font-bold font-mono text-blue-300">BAKA_123</div>
                <div className="text-[11px] text-slate-400">Contest Rating & Low-Level Kernels</div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-600 group-hover/cf:text-blue-400 transition-colors" />
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              C++ Standard Template Library (STL)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Graph Theory & Tree Decompositions
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Dynamic Programming & Bitmasking
            </span>
          </div>
        </motion.div>

        {/* Bento 3: Linux & Arch Environment HUD (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onMouseEnter={() => soundFX.playHover()}
          className="md:col-span-7 p-6 rounded-3xl bg-slate-950/80 border border-slate-800/90 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>KERNEL & WORKSTATION HUD</span>
            </div>
            <button
              onClick={handleCopyArchInfo}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 hover:text-cyan-300 flex items-center gap-1.5 transition"
            >
              {isCopiedNeofetch ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{isCopiedNeofetch ? 'Copied Specs' : 'Copy Telemetry'}</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 font-mono text-xs text-slate-300 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-300 font-bold">senku@arch-workstation</span>
              <span className="text-slate-500 text-[11px]">uptime: continuous</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] pt-1">
              <div><span className="text-slate-500">OS:</span> Arch Linux (x86_64)</div>
              <div><span className="text-slate-500">Shell:</span> zsh + Neovim (Lua)</div>
              <div><span className="text-slate-500">Compiler:</span> g++ 14.2 / Clang</div>
              <div><span className="text-slate-500">Inference:</span> Ollama + Llama 3</div>
              <div><span className="text-slate-500">Simulators:</span> RK4 ODEs (60 FPS)</div>
              <div><span className="text-slate-500">Container:</span> Docker + Compose</div>
            </div>
          </div>

          <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Primary Driver: Linux Kernel & Syscalls</span>
            <span className="text-emerald-400">Zero Slop Workflows</span>
          </div>
        </motion.div>

        {/* Bento 4: Audio / Deep Focus Frequency Station (5 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onMouseEnter={() => soundFX.playHover()}
          className="md:col-span-5 p-6 rounded-3xl bg-slate-950/80 border border-slate-800/90 hover:border-teal-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between space-y-5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-teal-300 font-semibold">
              <Headphones className="w-4 h-4 text-teal-400" />
              <span>NEURAL FREQUENCY NODE</span>
            </div>
            <button
              onClick={() => {
                soundFX.playClick();
                setIsPlayingAudioSim(!isPlayingAudioSim);
              }}
              className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono text-cyan-300 hover:border-cyan-400"
            >
              {isPlayingAudioSim ? 'PAUSE SPECTRUM' : 'ACTIVATE'}
            </button>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-bold text-slate-100">Deep Focus & Flow State</div>
            <div className="text-xs text-slate-400 leading-relaxed">
              Synthesizing dark ambient & bio-cybernetic soundscapes during deep mathematical & tensor optimization sessions.
            </div>
          </div>

          {/* Real-time spectrum canvas */}
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-center">
            <canvas ref={canvasRef} width={260} height={40} className="w-full h-10" />
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span>Harmonic Resonance: 432Hz</span>
            <span className="text-cyan-400">Peak Cognition</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
