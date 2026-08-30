import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Sparkles,
  Terminal,
  Github,
  Linkedin,
  Mail,
  FileText,
  Volume2,
  VolumeX,
  Command,
  Search,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFX } from '../utils/soundEffects';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  onOpenResume,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    setAudioEnabled(soundFX.isEnabled());
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleAudio = () => {
    const newState = soundFX.toggle();
    setAudioEnabled(newState);
  };

  const navLinks = [
    { label: 'DNA & Focus', href: '#engineering-dna' },
    { label: 'Projects & Demos', href: '#projects' },
    { label: 'Skills & Stack', href: '#skills' },
    { label: 'Deep Tech & Bio', href: '#bio-tech-fusion' },
    { label: 'Milestones', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-slate-950/85 backdrop-blur-xl border-b border-cyan-500/15 shadow-2xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Insignia */}
        <a
          href="#hero"
          id="navbar-brand"
          onClick={() => soundFX.playClick()}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px] shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <div className="w-full h-full rounded-[7px] bg-slate-950 flex items-center justify-center font-mono font-black text-cyan-300 text-xs">
              AN
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-slate-100 tracking-tight group-hover:text-cyan-300 transition-colors">
              {PERSONAL_INFO.name}
            </div>
            <div className="text-[10px] font-mono text-slate-400">IIT Delhi '28</div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              id={`nav-link-${link.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onMouseEnter={() => soundFX.playHover()}
              onClick={() => soundFX.playClick()}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-cyan-300 hover:bg-slate-800/80 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls: Command Palette, Sound Toggle, Resume & Contact */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Quick Command Palette Button */}
          <button
            id="nav-command-palette-btn"
            onClick={() => {
              soundFX.playClick();
              onOpenCommandPalette();
            }}
            onMouseEnter={() => soundFX.playHover()}
            title="Open Command Palette (Cmd + K)"
            className="px-2.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-slate-300 flex items-center gap-1.5 transition"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] text-slate-400 hidden xl:inline">Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-cyan-300">
              ⌘K
            </kbd>
          </button>

          {/* Sound FX Audio Toggle */}
          <button
            id="nav-audio-toggle-btn"
            onClick={handleToggleAudio}
            title={audioEnabled ? 'Mute Web Audio SFX' : 'Enable Web Audio SFX'}
            className={`p-2 rounded-xl border transition flex items-center gap-1.5 ${
              audioEnabled
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            {audioEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-3 bg-cyan-400 animate-pulse" />
                  <span className="w-0.5 h-1.5 bg-cyan-400 animate-pulse" />
                  <span className="w-0.5 h-2.5 bg-cyan-400 animate-pulse" />
                </span>
              </>
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Resume HUD Button */}
          <button
            id="nav-resume-btn"
            onClick={() => {
              soundFX.playClick();
              onOpenResume();
            }}
            onMouseEnter={() => soundFX.playHover()}
            className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-cyan-300 flex items-center gap-1.5 transition"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Resume</span>
          </button>

          {/* Connect CTA */}
          <a
            id="nav-contact-cta"
            href="#contact"
            onClick={() => soundFX.playClick()}
            onMouseEnter={() => soundFX.playHover()}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:opacity-95 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition cursor-pointer"
          >
            Connect
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => onOpenCommandPalette()}
            className="p-2 rounded-lg bg-slate-900 text-cyan-400 border border-slate-800 text-xs font-mono"
          >
            ⌘K
          </button>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-950/95 border-b border-slate-800 backdrop-blur-xl px-4 py-6 space-y-4"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    soundFX.playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-900 hover:text-cyan-300 font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="px-3 py-2 rounded-lg bg-slate-900 text-xs font-mono text-cyan-300 border border-slate-800 flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Resume HUD</span>
              </button>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-bold text-slate-950 bg-cyan-400"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
