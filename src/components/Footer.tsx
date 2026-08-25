import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Github, Linkedin, Mail, ArrowUp, Heart, Sparkles, Terminal, Code2, Trophy } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="relative z-10 border-t border-slate-800/80 bg-slate-950/90 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Academic Credential */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="text-sm font-bold text-slate-100">{PERSONAL_INFO.name}</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400">
              IIT Delhi
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Biochemical Engineering & Biotechnology | AI/ML & Full-Stack Systems
          </p>
        </div>

        {/* System Status Indicator & Copyright */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>ALL SYSTEMS OPERATIONAL</span>
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            Crafted with Three.js, React, Tailwind & Motion
          </p>
        </div>

        {/* Back to Top & Social Links */}
        <div className="flex items-center gap-4">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            title="LeetCode Profile"
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-400 transition"
          >
            <Code2 className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.codeforces}
            target="_blank"
            rel="noopener noreferrer"
            title="Codeforces Profile"
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-blue-400 transition"
          >
            <Trophy className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 transition shadow-[0_0_12px_rgba(6,182,212,0.2)]"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
