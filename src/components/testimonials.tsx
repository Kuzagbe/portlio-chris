import React from "react";
import { motion, useAnimationControls } from "motion/react";
import { useSanityTestimonials } from "@/hooks/useSanityData";
import { urlForImage } from "@/sanity/lib/image";


// Fallback testimonials (only used if no Sanity data)
const fallbackTestimonials = [
  {
    _id: "1",
    name: "Elon Musk",
    text: "Manu is so great with his work, our production was shut down within the first day itself. Highly recommended.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces&auto=format"
  },
  {
    _id: "2",
    name: "Mark Zuckerberg",
    text: "Working with Manu was a game-changer for our startup. His technical expertise and problem-solving skills are unmatched.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces&auto=format"
  },
  {
    _id: "3",
    name: "Sundar Pichai",
    text: "Manu delivered our project ahead of schedule and exceeded all expectations. His attention to detail is remarkable.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces&auto=format"
  }
];

// Stable empty array reference
const EMPTY_ARRAY: any[] = [];

export const Testimonials = () => {
  const headingWords = ["People", "love", "my", "work"];
  const { data: testimonialsDataRaw, loading, error } = useSanityTestimonials(EMPTY_ARRAY);
  
  // Use Sanity data if available, otherwise use fallback
  // Deduplicate by _id to prevent duplicates
  const testimonialsData = React.useMemo(() => {
    const data = Array.isArray(testimonialsDataRaw) && testimonialsDataRaw.length > 0 
      ? testimonialsDataRaw 
      : fallbackTestimonials;
    
    // Remove duplicates based on _id
    const seen = new Set();
    return data.filter((item: any) => {
      const id = item._id || item.id || JSON.stringify(item);
      if (seen.has(id)) {
        return false;
      }
      seen.add(id);
      return true;
    });
  }, [testimonialsDataRaw]);
  
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
            {/* Duplicating for infinite scroll effect - only duplicate unique items */}
            {Array.isArray(testimonialsData) && testimonialsData.length > 0 && [...testimonialsData, ...testimonialsData].map((t: any, i: number) => {
              const imageUrl = t.image 
                ? (typeof t.image === 'string' 
                    ? t.image 
                    : urlForImage(t.image)?.url() || '')
                : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces&auto=format';
              
              // Create unique key: use _id and index, with a prefix to distinguish duplicates
              const uniqueKey = t._id 
                ? `${t._id}-${i < testimonialsData.length ? 'original' : 'duplicate'}-${i}` 
                : `testimonial-${i}`;
              
              return (
                <div 
                  key={uniqueKey}
                  className="min-w-[200px] sm:min-w-[240px] max-w-[200px] sm:max-w-[240px] p-3 sm:p-4 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-lg sm:rounded-xl flex flex-col justify-between gap-3 sm:gap-4 h-40 sm:h-48 cursor-pointer"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                    <p className="text-xs sm:text-sm font-normal leading-4 sm:leading-5 text-[#404040] dark:text-neutral-300">
                        {t.text}
                    </p>
                    <div className="flex items-center gap-2">
                        <img 
                          src={imageUrl}
                          alt={t.name || 'Testimonial'} 
                          width={32} 
                          height={32} 
                          className="rounded-full flex-shrink-0 w-8 h-8 object-cover"
                          loading="lazy"
                        />
                        <span className="text-xs sm:text-sm font-normal leading-4 sm:leading-5 text-[#737373] dark:text-neutral-400">
                          {t.name}
                        </span>
                    </div>
                </div>
              );
            })}
        </motion.div>
      </div>
    </section>
  );
};


