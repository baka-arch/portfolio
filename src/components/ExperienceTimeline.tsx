import React from 'react';
import { motion } from 'motion/react';
import { EDUCATION_DATA } from '../data/portfolioData';
import {
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Calendar,
  MapPin,
  Sparkles,
  Award,
} from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono"
        >
          <Award className="w-3.5 h-3.5 text-cyan-400" />
          <span>Academic & Engineering Track</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-100"
        >
          Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">Milestones</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base leading-relaxed"
        >
          A timeline of academic rigor at IIT Delhi and continuous deep tech engineering.
        </motion.p>
      </div>

      {/* Timeline Nodes */}
      <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-32 space-y-12">
        {EDUCATION_DATA.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="relative pl-6 sm:pl-8 group"
          >
            {/* Timeline Dot Indicator */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 shadow-[0_0_12px_#22d3ee] group-hover:scale-125 transition-transform" />

            {/* Time Stamp Badge on the Left (Desktop) */}
            <div className="sm:absolute sm:-left-32 sm:top-1 text-xs font-mono text-cyan-300 font-semibold mb-2 sm:mb-0">
              {item.period}
            </div>

            {/* Card Content */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-cyan-500/40 backdrop-blur-md transition-all duration-300 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-100">{item.title}</h3>
                  <div className="text-sm font-medium text-cyan-300">{item.institution}</div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{item.location}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>

              {/* Achievements Bullet Points */}
              <div className="space-y-2 pt-1">
                {item.achievements.map((ach, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-900">
                {item.badges.map((badge, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-slate-900 text-slate-400 border border-slate-800"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
