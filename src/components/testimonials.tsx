import React from "react";
import { motion, useAnimationControls } from "motion/react";
import { useSanityTestimonials } from "@/hooks/useSanityData";
import { urlForImage } from "@/sanity/lib/image";


// Stable empty array reference
const EMPTY_ARRAY: any[] = [];

// Testimonial Card Wrapper with state management
const TestimonialCardWrapper = ({ 
  testimonial, 
  onMouseEnter,
  onMouseLeave 
}: {
  testimonial: any;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  // Handle Sanity image object exactly like projects do
  const imageUrl = testimonial.image 
    ? (typeof testimonial.image === 'string' 
        ? testimonial.image 
        : urlForImage(testimonial.image)?.url() || '')
    : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces&auto=format';
  
  // Text truncation
  const maxLength = 120; // Characters before truncation
  const shouldTruncate = testimonial.text && testimonial.text.length > maxLength;
  const displayText = shouldTruncate && !isExpanded 
    ? testimonial.text.substring(0, maxLength) + '...' 
    : testimonial.text;
  
  return (
    <div 
      className="min-w-[200px] sm:min-w-[240px] max-w-[200px] sm:max-w-[240px] p-3 sm:p-4 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-lg sm:rounded-xl flex flex-col justify-between gap-3 sm:gap-4 min-h-[160px] sm:min-h-[192px]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex-1 flex flex-col gap-2">
        <p className="text-xs sm:text-sm font-normal leading-4 sm:leading-5 text-[#404040] dark:text-neutral-300 flex-1">
          {displayText}
        </p>
        {shouldTruncate && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline self-start mt-1"
          >
            {isExpanded ? 'less' : 'more...'}
          </button>
        )}
      </div>
      <div className="flex items-center gap-2 mt-auto">
        <img 
          src={imageUrl}
          alt={testimonial.name || 'Testimonial'} 
          width={32} 
          height={32} 
          className="rounded-full flex-shrink-0 w-8 h-8 object-cover border border-neutral-200 dark:border-neutral-700"
          loading="lazy"
          onError={(e) => {
            // Fallback to placeholder on error
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces&auto=format';
          }}
        />
        <span className="text-xs sm:text-sm font-normal leading-4 sm:leading-5 text-[#737373] dark:text-neutral-400 truncate">
          {testimonial.name}
        </span>
      </div>
    </div>
  );
};

export const Testimonials = () => {
  const headingWords = ["People", "love", "my", "work"];
  const { data: testimonialsDataRaw, loading, error } = useSanityTestimonials(EMPTY_ARRAY);
  
  // Use only Sanity data - no fallback
  // Deduplicate by _id to prevent duplicates from Sanity
  const testimonialsData = React.useMemo(() => {
    if (!Array.isArray(testimonialsDataRaw) || testimonialsDataRaw.length === 0) {
      return [];
    }
    
    // Remove duplicates based on _id - strict deduplication
    const seen = new Set<string>();
    const uniqueTestimonials: any[] = [];
    
    for (const item of testimonialsDataRaw) {
      if (!item) continue;
      
      const id = item._id || item.id;
      if (id) {
        if (!seen.has(id)) {
          seen.add(id);
          uniqueTestimonials.push(item);
        }
        // Skip if we've already seen this ID
      } else {
        // If no ID, check by content to avoid duplicates
        const contentKey = `${item?.name || ''}-${item?.text?.substring(0, 50) || ''}`;
        if (contentKey && !seen.has(contentKey)) {
          seen.add(contentKey);
          uniqueTestimonials.push(item);
        }
      }
    }
    
    // Debug: log if duplicates were found
    if (testimonialsDataRaw.length !== uniqueTestimonials.length) {
      console.log(`Testimonials: Removed ${testimonialsDataRaw.length - uniqueTestimonials.length} duplicates`);
    }
    
    return uniqueTestimonials;
  }, [testimonialsDataRaw]);
  
  const controls = useAnimationControls();
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    if (!isPaused && testimonialsData.length > 4) {
      // Calculate scroll distance - scroll through all items
      // Each item is approximately 240px width + 24px gap = 264px per item
      const itemWidth = 264;
      const scrollDistance = testimonialsData.length * itemWidth;
      
      // Create smooth infinite scroll: scroll through all, then reset instantly
      controls.start({
        x: [0, -scrollDistance],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: testimonialsData.length * 3, // Speed: 3 seconds per item
            ease: "linear",
          }
        }
      });
    } else {
      controls.stop();
      controls.set({ x: 0 });
    }
  }, [isPaused, controls, testimonialsData.length]);

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
        {loading ? (
          <div className="text-center text-sm text-neutral-500 dark:text-neutral-400 py-8">
            Loading testimonials...
          </div>
        ) : error ? (
          <div className="text-center text-sm text-red-500 dark:text-red-400 py-8">
            Error loading testimonials. Please try again later.
          </div>
        ) : testimonialsData.length === 0 ? (
          <div className="text-center text-sm text-neutral-500 dark:text-neutral-400 py-8">
            No testimonials found. Add testimonials in your Sanity Studio.
          </div>
        ) : (
          <motion.div 
            className="flex gap-4 sm:gap-6"
            animate={testimonialsData.length > 4 ? controls : undefined}
            style={testimonialsData.length > 4 ? {} : { x: 0 }}
          >
            {/* Show unique testimonials only - no duplication */}
            {testimonialsData.map((t: any, i: number) => {
              return (
                <TestimonialCardWrapper
                  key={t._id || `testimonial-${i}`}
                  testimonial={t}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                />
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};


