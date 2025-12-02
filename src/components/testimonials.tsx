import React from "react";
import { motion, useAnimationControls } from "motion/react";


const testimonials = [
  {
    id: 1,
    name: "Elon Musk",
    text: "Manu is so great with his work, our production was shut down within the first day itself. Highly recommended.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces&auto=format"
  },
  {
    id: 2,
    name: "Mark Zuckerberg",
    text: "Working with Manu was a game-changer for our startup. His technical expertise and problem-solving skills are unmatched.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces&auto=format"
  },
  {
    id: 3,
    name: "Sundar Pichai",
    text: "Manu delivered our project ahead of schedule and exceeded all expectations. His attention to detail is remarkable.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces&auto=format"
  }
];

export const Testimonials = () => {
  const headingWords = ["People", "love", "my", "work"];
  const controls = useAnimationControls();
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    if (!isPaused) {
      controls.start({
        x: ["0%", "-50%"],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          }
        }
      });
    } else {
      controls.stop();
    }
  }, [isPaused, controls]);

  return (
    <section 
      className="py-6 sm:py-8 md:py-10 border-b border-neutral-100 dark:border-neutral-800 overflow-hidden"
    >
      <div className="flex items-start gap-4 mb-6 sm:mb-8">
        <h2 className="text-sm sm:text-base font-normal leading-5 sm:leading-6 text-[#262626] dark:text-white">
          {headingWords.join(" ")}
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <motion.div 
          className="flex gap-4 sm:gap-6"
          animate={controls}
        >
            {/* Duplicating for infinite scroll effect */}
            {[...testimonials, ...testimonials].map((t, i) => (
                <div 
                  key={i} 
                  className="min-w-[200px] sm:min-w-[240px] max-w-[200px] sm:max-w-[240px] p-3 sm:p-4 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-lg sm:rounded-xl flex flex-col justify-between gap-3 sm:gap-4 h-40 sm:h-48 cursor-pointer"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                    <p className="text-xs sm:text-sm font-normal leading-4 sm:leading-5 text-[#404040] dark:text-neutral-300">
                        {t.text}
                    </p>
                    <div className="flex items-center gap-2">
                        <img 
                          src={t.image} 
                          alt={t.name} 
                          width={32} 
                          height={32} 
                          className="rounded-full flex-shrink-0 w-8 h-8 object-cover"
                        />
                        <span className="text-xs sm:text-sm font-normal leading-4 sm:leading-5 text-[#737373] dark:text-neutral-400">
                          {t.name}
                        </span>
                    </div>
                </div>
            ))}
        </motion.div>
      </div>
    </section>
  );
};

