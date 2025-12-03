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
    <div className="px-2 py-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md relative overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn("inline-block whitespace-nowrap text-xs sm:text-sm font-normal leading-5 text-[#737373] dark:text-neutral-300")}
        >
          {roles[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
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

  return (
    <section className="flex flex-col justify-start items-start pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-6 sm:pb-8 md:pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 w-full">
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bold leading-tight sm:leading-[36px] md:leading-[40px] text-[#262626] dark:text-white">
            {nameWords.length > 0 ? nameWords.join(" ") : "Your Name"}
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

