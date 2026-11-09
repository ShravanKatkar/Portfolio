import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.floor(Math.random() * 8) + 4;
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 400);
          }, 200);
          return 100;
        }
        return next;
      });
    }, 35);

    const safetyTimeout = setTimeout(() => {
      setIsFinished(true);
      setTimeout(onComplete, 200);
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
    };
  }, [onComplete, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#09090b] text-[#F4F1EA] select-none"
          onClick={() => {
            setIsFinished(true);
            setTimeout(onComplete, 100);
          }}
          title="Click to enter"
        >
          {/* Subtle Background Radial Glow */}
          <div
            className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 blur-[100px]"
            style={{ background: 'radial-gradient(circle, rgba(252,107,47,0.4) 0%, transparent 70%)' }}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Giant Dynamic Counter */}
            <span className="font-display text-7xl sm:text-9xl font-extrabold tracking-tighter text-white tabular-nums">
              {progress}
            </span>

            {/* Candidate Identity */}
            <div className="mt-4">
              <span className="font-display text-xs sm:text-sm text-[#8E8C86] tracking-[0.35em] uppercase font-semibold">
                SHRAVAN KATKAR
              </span>
            </div>

            {/* Precision Loading Bar Track */}
            <div className="w-44 sm:w-56 h-[2px] bg-white/10 mt-6 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FC6B2F] transition-all duration-75 ease-out shadow-[0_0_12px_rgba(252,107,47,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
