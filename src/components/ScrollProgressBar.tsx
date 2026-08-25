import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setPercentage(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <div id="scroll-progress-container" className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Glow bar */}
      <motion.div
        id="scroll-progress-bar"
        className="h-[3px] bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-500 origin-left shadow-[0_0_12px_rgba(6,182,212,0.8)]"
        style={{ scaleX }}
      />
      {/* Subtle indicator pill when scrolling */}
      {percentage > 2 && (
        <div
          id="scroll-percentage-pill"
          className="absolute right-4 top-3 px-2 py-0.5 rounded-full bg-slate-950/80 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 backdrop-blur-md transition-opacity duration-300 opacity-80"
        >
          {percentage}%
        </div>
      )}
    </div>
  );
};
