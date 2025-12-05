import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AppleIntroProps {
  onComplete: () => void;
  logo?: string;
  tagline?: string;
}

export const AppleIntro: React.FC<AppleIntroProps> = ({ 
  onComplete, 
  logo = 'CK',
  tagline = 'Building digital experiences'
}) => {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Show content after a brief delay
    const contentTimer = setTimeout(() => setShowContent(true), 200);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Accelerate then slow down (easing)
        const increment = prev < 50 ? 2 : prev < 90 ? 1 : 0.5;
        return Math.min(prev + increment, 100);
      });
    }, 30);

    // Complete after progress reaches 100%
    const completeTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onComplete();
      }, 800); // Wait for exit animation
    }, 3000);

    return () => {
      clearTimeout(contentTimer);
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 bg-black z-[10000] flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: 'inset(0 0 100% 0)',
            transition: {
              duration: 0.8,
              ease: [0.87, 0, 0.13, 1], // Apple ease
            },
          }}
        >
          <div className="flex flex-col items-center gap-8">
            {/* Logo */}
            <AnimatePresence>
              {showContent && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.87, 0, 0.13, 1],
                  }}
                  className="text-6xl font-bold text-white"
                >
                  {logo}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tagline with clipping mask */}
            <AnimatePresence>
              {showContent && (
                <motion.div
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4,
                    ease: [0.87, 0, 0.13, 1],
                  }}
                >
                  <motion.p
                    className="text-white text-lg tracking-wider"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.6,
                      ease: [0.87, 0, 0.13, 1],
                    }}
                  >
                    {tagline}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress line */}
            <AnimatePresence>
              {showContent && (
                <motion.div
                  className="w-64 h-0.5 bg-neutral-700 overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{
                      type: 'spring',
                      damping: 20,
                      stiffness: 100,
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

