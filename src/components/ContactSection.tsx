import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  Mail,
  Copy,
  Check,
  Send,
  Github,
  Linkedin,
  Terminal,
  Sparkles,
  MapPin,
  Clock,
  ArrowUpRight,
  Code2,
  Trophy,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      `Portfolio Inquiry from ${name || 'Collaborator'}`
    )}&body=${encodeURIComponent(`Sender Email: ${email}\n\nMessage:\n${message}`)}`;
    
    window.location.href = mailtoUrl;
    setIsSent(true);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#06b6d4', '#10b981', '#a855f7'],
    });
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono"
        >
          <Mail className="w-3.5 h-3.5 text-cyan-400" />
          <span>Direct Channel</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-100"
        >
          Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-400">Exceptional</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base leading-relaxed"
        >
          Open for high-impact AI/ML engineering, full-stack systems development, and biochemical computational modeling. Reach out directly or dispatch a message below.
        </motion.p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Info & Quick Copy */}
        <div className="lg:col-span-5 space-y-5">
          {/* Quick Email Card */}
          <div className="p-6 rounded-3xl bg-slate-950/80 border border-cyan-500/30 backdrop-blur-md space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Active Inbox
              </span>
              <span className="text-xs font-mono text-slate-500">IIT Delhi</span>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-slate-400">Direct Email Address</div>
              <div className="text-base sm:text-lg font-bold font-mono text-slate-100 break-all">
                {PERSONAL_INFO.email}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                id="copy-email-btn"
                onClick={handleCopyEmail}
                className="flex-1 py-2.5 px-4 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-200 font-medium text-xs flex items-center justify-center gap-2 transition"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy to Clipboard</span>
                  </>
                )}
              </button>

              <a
                id="direct-mailto-link"
                href={`mailto:${PERSONAL_INFO.email}`}
                className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition"
              >
                <span>Compose</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Social Links Cards */}
          <div className="grid grid-cols-2 gap-3">
            <a
              id="contact-github-card"
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-slate-300 group-hover:text-white" />
                <span className="text-xs font-semibold text-slate-200">GitHub</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            </a>

            <a
              id="contact-linkedin-card"
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <Linkedin className="w-5 h-5 text-cyan-400" />
                <span className="text-xs font-semibold text-slate-200">LinkedIn</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            </a>

            <a
              id="contact-leetcode-card"
              href={PERSONAL_INFO.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-900 transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <Code2 className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-semibold text-slate-200">LeetCode</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
            </a>

            <a
              id="contact-codeforces-card"
              href={PERSONAL_INFO.codeforces}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-blue-500/40 hover:bg-slate-900 transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-blue-400" />
                <span className="text-xs font-semibold text-slate-200">Codeforces</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
            </a>
          </div>

          {/* Location & Status Card */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-slate-300 font-medium">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <Clock className="w-4 h-4" />
              <span>{PERSONAL_INFO.status}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Dispatch Terminal */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-950/90 border border-slate-800/90 backdrop-blur-md">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-semibold text-slate-200">Dispatch Message Terminal</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">Fast & Direct</span>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400" htmlFor="sender-name">
                  Your Name
                </label>
                <input
                  id="sender-name"
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-slate-200 text-xs transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400" htmlFor="sender-email">
                  Your Email
                </label>
                <input
                  id="sender-email"
                  type="email"
                  required
                  placeholder="elena@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-slate-200 text-xs transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-400" htmlFor="message-body">
                Message or Project Scope
              </label>
              <textarea
                id="message-body"
                required
                rows={4}
                placeholder="Discussing an engineering opportunity, research collaboration, or full-stack project..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-slate-200 text-xs transition resize-none"
              />
            </div>

            <button
              id="submit-contact-btn"
              type="submit"
              className="w-full py-3 px-6 rounded-xl font-semibold text-xs font-mono text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-300 hover:opacity-95 shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Send className="w-4 h-4 text-slate-950" />
              <span>{isSent ? 'DISPATCHED VIA CLIENT (OPENING MAIL)' : 'DISPATCH MESSAGE'}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
