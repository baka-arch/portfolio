import React, { useState, useEffect, useRef } from 'react';
import { soundFX } from '../utils/soundEffects';

interface ScrambleTextProps {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
  speed?: number;
  scrambleChars?: string;
}

const DEFAULT_CHARS = '01#%@&*/$!?><~∆λ∑πΩ0123456789ABCDEF';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  triggerOnHover = true,
  speed = 30,
  scrambleChars = DEFAULT_CHARS,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const animationRef = useRef<number | null>(null);

  const startScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    soundFX.playHover();

    let iteration = 0;
    const maxIterations = text.length * 2;

    if (animationRef.current) clearInterval(animationRef.current);

    animationRef.current = window.setInterval(() => {
      setDisplayText((_) =>
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration / 2) {
              return text[index];
            }
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join('')
      );

      iteration += 1;

      if (iteration >= maxIterations) {
        if (animationRef.current) clearInterval(animationRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, speed);
  };

  useEffect(() => {
    setDisplayText(text);
    return () => {
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, [text]);

  return (
    <span
      onMouseEnter={triggerOnHover ? startScramble : undefined}
      className={`inline-block cursor-default select-none ${className}`}
    >
      {displayText}
    </span>
  );
};
