import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSanityMobileInteractions } from "@/hooks/useSanityData";

interface MobileInteraction {
  _id: string;
  name: string;
  year: string;
  videoUrl?: string;
  order?: number;
}

// Stable empty array reference
const EMPTY_ARRAY: any[] = [];

export const MobileInteractions = () => {
  const { data: interactionsData, loading, error } = useSanityMobileInteractions(EMPTY_ARRAY);
  
  // Use Sanity data, limit to 15 items, and ensure proper typing
  const interactions: MobileInteraction[] = React.useMemo(() => {
    if (!Array.isArray(interactionsData) || interactionsData.length === 0) {
      return [];
    }
    // Limit to 15 items and ensure they have the required fields
    return interactionsData
      .slice(0, 15)
      .filter((item: any) => item && item.name && item.year)
      .map((item: any) => ({
        _id: item._id || `interaction-${item.name}`,
        name: item.name,
        year: item.year,
        videoUrl: item.videoUrl || undefined,
        order: item.order,
      }));
  }, [interactionsData]);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [selectedInteraction, setSelectedInteraction] = React.useState<MobileInteraction | null>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (hoveredIndex !== null) {
      const interaction = interactions[hoveredIndex];
      setSelectedInteraction(interaction);
      // Debug: Log video URL if available
      if (interaction?.videoUrl) {
        console.log('Video URL for', interaction.name, ':', interaction.videoUrl);
      }
    } else {
      // Delay clearing to allow smooth transition
      const timer = setTimeout(() => {
        setSelectedInteraction(null);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [hoveredIndex, interactions]);

  // Ensure video plays automatically when it loads
  React.useEffect(() => {
    if (videoRef.current && selectedInteraction?.videoUrl) {
      const video = videoRef.current;
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Error playing video:', error);
        });
      }
    }
  }, [selectedInteraction]);

  return (
    <section className="py-10 sm:py-12 md:py-16 border-b border-neutral-100 dark:border-neutral-800">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-sm sm:text-base font-normal leading-5 sm:leading-6 text-[#262626] dark:text-white">
          Mobile Interactions
        </h2>
      </div>

      {loading ? (
        <div className="text-center text-sm text-neutral-500 dark:text-neutral-400 py-8">
          Loading mobile interactions...
        </div>
      ) : error ? (
        <div className="text-center text-sm text-red-500 dark:text-red-400 py-8">
          Error loading mobile interactions. Please try again later.
        </div>
      ) : interactions.length === 0 ? (
        <div className="text-center text-sm text-neutral-500 dark:text-neutral-400 py-8">
          No mobile interactions found. Add interactions in your Sanity Studio.
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative min-h-[600px] sm:min-h-[700px] lg:min-h-[750px]">
        {/* Left Side - List of Interactions */}
        <div className="w-full lg:w-1/3 flex-shrink-0">
          <div className="space-y-1">
            {interactions.map((interaction, index) => (
              <motion.div
                key={interaction._id}
                className="relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div
                  className={`px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    hoveredIndex === index
                      ? "bg-neutral-100 dark:bg-neutral-800 text-[#262626] dark:text-white shadow-sm"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
                  }`}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base font-medium">
                      {interaction.name}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-500">
                      {interaction.year}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side - iPhone Mockup */}
        <div className="w-full lg:w-2/3 flex items-center justify-center lg:justify-end lg:h-full">
          <AnimatePresence mode="wait">
            {selectedInteraction ? (
              <motion.div
                key={selectedInteraction.name}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative"
              >
                {/* iPhone Frame */}
                <div className="relative w-[280px] sm:w-[320px] md:w-[360px] mx-auto">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-[3rem] blur-xl opacity-20" />
                  
                  {/* iPhone Outer Frame */}
                  <div className="relative bg-neutral-900 dark:bg-neutral-800 rounded-[3rem] p-2 shadow-2xl border border-neutral-700 dark:border-neutral-700">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-neutral-900 dark:bg-neutral-800 rounded-b-2xl z-10" />
                    
                    {/* Screen */}
                    <div className="relative bg-white dark:bg-neutral-900 rounded-[2.5rem] overflow-hidden">
                      {/* Status Bar */}
                      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-neutral-50 to-transparent dark:from-neutral-900 dark:to-transparent z-20 flex items-center justify-between px-6 pt-1">
                        <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">4:32</span>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-2 border border-neutral-900 dark:border-neutral-100 rounded-sm">
                            <div className="w-3 h-1.5 bg-neutral-900 dark:bg-neutral-100 rounded-sm m-0.5" />
                          </div>
                          <svg className="w-4 h-4 text-neutral-900 dark:text-neutral-100" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                          </svg>
                        </div>
                      </div>

                      {/* Video Container */}
                      <div className="aspect-[9/19.5] bg-gradient-to-br from-blue-50 to-purple-50 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center relative overflow-hidden">
                        {selectedInteraction.videoUrl && selectedInteraction.videoUrl.trim() !== '' ? (
                          <video
                            ref={videoRef}
                            key={selectedInteraction.videoUrl}
                            src={selectedInteraction.videoUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            className="w-full h-full object-cover"
                            style={{ display: 'block' }}
                            onLoadedData={(e) => {
                              const video = e.target as HTMLVideoElement;
                              video.play().catch(error => {
                                console.error('Error auto-playing video:', error);
                              });
                            }}
                            onError={(e) => {
                              console.error('Video failed to load:', selectedInteraction.videoUrl);
                              const target = e.target as HTMLVideoElement;
                              target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="text-center p-8 w-full h-full flex flex-col items-center justify-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                              {selectedInteraction.name}
                            </p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                              {selectedInteraction.videoUrl ? 'Video loading...' : 'Add video URL in Sanity'}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Home Indicator */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-neutral-900 dark:bg-neutral-100 rounded-full" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-[280px] sm:w-[320px] md:w-[360px] mx-auto flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                    <svg className="w-12 h-12 text-neutral-400 dark:text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Hover over an interaction to preview
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      )}
    </section>
  );
};

