import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { useSanityHero } from "@/hooks/useSanityData";

const AnimatedRoleBadge = ({
  roles = ["Design Engineer", "Frontend Developer", "UI/UX Designer", "Full Stack Engineer"],
  duration = 3000,
}: {
  roles?: string[];
  duration?: number;
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    if (roles.length === 0 || isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, duration);

    return () => clearInterval(interval);
  }, [duration, roles.length, isHovered]);

  return (
    <div className="px-4 py-2 sm:px-5 sm:py-2.5 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg relative overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn("inline-block whitespace-nowrap text-sm sm:text-base font-normal leading-6 text-[#737373] dark:text-neutral-300")}
        >
          {roles[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

// Animated letter component with automatic bounce and colorful animation
const AnimatedLetter = ({ 
  letter, 
  index, 
  isSpace 
}: { 
  letter: string; 
  index: number; 
  isSpace: boolean;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  // Colorful gradient colors for automatic cycling
  const colors = [
    '#3B82F6', // blue
    '#8B5CF6', // purple
    '#EC4899', // pink
    '#F59E0B', // amber
    '#10B981', // emerald
    '#EF4444', // red
    '#06B6D4', // cyan
    '#F97316', // orange
  ];

  // Calculate starting color index for this letter (staggered)
  const startColorIndex = index % colors.length;
  // Create color sequence starting from this letter's position
  const colorSequence = [
    colors[startColorIndex],
    colors[(startColorIndex + 1) % colors.length],
    colors[(startColorIndex + 2) % colors.length],
    colors[(startColorIndex + 3) % colors.length],
    colors[(startColorIndex + 4) % colors.length],
    colors[(startColorIndex + 5) % colors.length],
    colors[(startColorIndex + 6) % colors.length],
    colors[(startColorIndex + 7) % colors.length],
    colors[startColorIndex], // Loop back
  ];

  if (isSpace) {
    return <span className="inline-block">&nbsp;</span>;
  }

  return (
    <motion.span
      className="inline-block cursor-default"
      initial={{ y: -50, opacity: 0 }}
      animate={{ 
        y: [0, -12, 0], // Continuous bounce - more visible
        opacity: 1,
      }}
      transition={{
        // Initial entrance
        opacity: {
          duration: 0.3,
          delay: index * 0.05,
        },
        // Continuous bounce animation - starts immediately after entrance
        y: {
          repeat: Infinity,
          duration: 1.2,
          ease: "easeInOut",
          delay: index * 0.05 + 0.3, // Start shortly after entrance
        },
      }}
      style={{
        color: colorSequence[0], // Set initial color
      }}
      whileHover={{
        scale: 1.3,
        y: -15,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10,
        },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.span
        animate={{
          color: colorSequence,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.1 + 0.5,
        }}
        style={{ display: "inline-block" }}
      >
        {letter}
      </motion.span>
    </motion.span>
  );
};

export const Hero = () => {
  const { data: hero, loading } = useSanityHero(null);
  
  // Use only Sanity data - show loading or empty state if no data
  const nameWords = hero?.name ? hero.name.split(" ") : [];
  const roles = hero?.roles || [];
  const bio = hero?.bio || "";

  if (loading) {
    return (
      <section className="flex flex-col justify-start items-start pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-6 sm:pb-8 md:pb-10">
        <div className="text-sm text-neutral-500 dark:text-neutral-400">
          Loading...
        </div>
      </section>
    );
  }

  if (!hero || (!hero.name && !hero.bio)) {
    return (
      <section className="flex flex-col justify-start items-start pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-6 sm:pb-8 md:pb-10">
        <div className="text-sm text-neutral-500 dark:text-neutral-400">
          No hero content found. Add hero content in your Sanity Studio.
        </div>
      </section>
    );
  }

  // Split name into individual characters for animation
  const nameToDisplay = hero?.name || "Your Name";
  const nameCharacters = nameToDisplay.split("");

  return (
    <section className="flex flex-col justify-start items-start pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-6 sm:pb-8 md:pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 w-full">
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bold leading-tight sm:leading-[36px] md:leading-[40px] text-[#262626] dark:text-white inline-flex flex-wrap">
            {nameCharacters.map((char: string, index: number) => (
              <AnimatedLetter
                key={`${char}-${index}`}
                letter={char}
                index={index}
                isSpace={char === " "}
              />
            ))}
          </h1>
        </div>
        {roles.length > 0 && (
          <AnimatedRoleBadge 
            roles={roles}
            duration={3000}
          />
        )}
      </div>

      {bio && (
        <div className="max-w-lg w-full">
          <p className="text-sm sm:text-base font-normal leading-6 text-[#737373] dark:text-neutral-400">
            {bio}
          </p>
        </div>
      )}
    </section>
  );
};

