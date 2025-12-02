import React from "react";
import { motion } from "motion/react";
import { Project } from "@/types";
import { useSanityProjects } from "@/hooks/useSanityData";

const dummyProjects: Project[] = [
  {
    _id: "1",
    title: "Macbook Mockup",
    slug: { current: "macbook-mockup" },
    description: "A mockup of a Macbook that showcases the product and its features",
    tags: ["react", "nextjs", "tailwind"],
    link: "#",
  },
  {
    _id: "2",
    title: "Instant Feedback",
    slug: { current: "instant-feedback" },
    description: "An interactive feedback system that provides instant responses to user actions",
    tags: ["vue", "nuxt", "tailwind"],
    link: "#",
  },
  {
    _id: "3",
    title: "Apple Clone",
    slug: { current: "apple-clone" },
    description: "A clone of Apple's website that showcases their products and services",
    tags: ["html", "css", "tailwind"],
    link: "#",
  },
];

export const Projects = () => {
  const headingWords = ["I", "love", "building", "things"];
  const { projects } = useSanityProjects(dummyProjects);

  return (
    <section 
      id="projects" 
      className="py-6 sm:py-8 md:py-10 border-b border-neutral-100 dark:border-neutral-800"
    >
       <div className="flex items-start gap-4 mb-6 sm:mb-8">
        <div className="inline-flex px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md">
           <h2 className="text-sm sm:text-base font-normal leading-5 sm:leading-6 text-[#262626] dark:text-white">
             {headingWords.join(" ")}
           </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {projects.map((project, index) => {
          // Tech stack icon mapping - updated to match design
          const getTechIcon = (tag: string) => {
            const icons: Record<string, { bg: string; icon: React.ReactNode }> = {
              react: { 
                bg: "bg-neutral-800 dark:bg-neutral-800", 
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                    <ellipse cx="12" cy="12" rx="11" ry="4.5" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.8"/>
                    <ellipse cx="12" cy="12" rx="11" ry="4.5" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.8" transform="rotate(60 12 12)"/>
                    <ellipse cx="12" cy="12" rx="11" ry="4.5" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.8" transform="rotate(-60 12 12)"/>
                  </svg>
                )
              },
              typescript: { 
                bg: "bg-blue-600", 
                icon: (
                  <span className="text-[8px] font-bold text-white">TS</span>
                )
              },
              nextjs: { 
                bg: "bg-neutral-800 dark:bg-neutral-800", 
                icon: (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                    <path d="M11.5715 0c-.1763 0-.3096.0006-.358.0036-.0486.003-.111.0066-.1392.0086a12.5144 12.5144 0 0 0-.5476.0367c-.1356.012-.2817.028-.408.0466a12.504 12.504 0 0 0-8.3587 5.848A12.2382 12.2382 0 0 0 .003 11.454v.09c.001.048.003.085.003.111v.09c.003.06.0066.123.0086.171.002.048.0036.18.0036.36a12.515 12.515 0 0 0 .311 2.69 12.502 12.502 0 0 0 8.654 8.6458c.09.02.18.038.27.054.135.024.27.045.39.062.06.009.12.0165.18.024.06.007.135.012.195.0165.06.005.18.0066.36.0066.048 0 .085-.002.111-.003h.09c.06-.002.123-.005.171-.0086.27-.024.54-.06.81-.111a12.515 12.515 0 0 0 2.7-.621 12.502 12.502 0 0 0 8.655-8.6458c.02-.09.038-.18.054-.27.024-.135.045-.27.062-.39.009-.06.0165-.12.024-.18.007-.06.012-.135.0165-.195.005-.06.0066-.18.0066-.36 0-.048-.002-.085-.003-.111v-.09a12.301 12.301 0 0 0-.0036-.36 12.515 12.515 0 0 0-.311-2.7 12.502 12.502 0 0 0-8.655-8.6448c-.09-.02-.18-.038-.27-.054a12.532 12.532 0 0 0-1.17-.15c-.06-.009-.12-.0165-.18-.024a2.1107 2.1107 0 0 0-.195-.0165C11.862.0066 11.73 0 11.5715 0z"/>
                  </svg>
                )
              },
              tailwind: { 
                bg: "bg-cyan-500", 
                icon: (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                    <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.15 14.47 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.15 9.47 12 7 12z"/>
                  </svg>
                )
              },
              vue: { 
                bg: "bg-green-500", 
                icon: (
                  <span className="text-[8px] font-bold text-white">V</span>
                )
              },
              nuxt: { 
                bg: "bg-teal-600 dark:bg-teal-700", 
                icon: (
                  <span className="text-[8px] font-bold text-white">N</span>
                )
              },
              html: { 
                bg: "bg-orange-500", 
                icon: (
                  <span className="text-[8px] font-bold text-white">5</span>
                )
              },
              css: { 
                bg: "bg-blue-500", 
                icon: (
                  <span className="text-[8px] font-bold text-white">3</span>
                )
              },
              javascript: {
                bg: "bg-yellow-500",
                icon: (
                  <span className="text-[8px] font-bold text-white">JS</span>
                )
              },
              threejs: {
                bg: "bg-neutral-800 dark:bg-neutral-800",
                icon: (
                  <span className="text-[8px] font-bold text-white">3D</span>
                )
              },
              nodejs: {
                bg: "bg-green-600",
                icon: (
                  <span className="text-[8px] font-bold text-white">N</span>
                )
              },
              framer: {
                bg: "bg-purple-600",
                icon: (
                  <span className="text-[8px] font-bold text-white">F</span>
                )
              },
            };
            return icons[tag.toLowerCase()] || { bg: "bg-neutral-500", icon: <span className="text-[8px] font-bold text-white">•</span> };
          };

          return (
            <motion.div 
              key={project._id} 
              className="flex flex-col gap-3 sm:gap-4 cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              {/* Project Image */}
              <motion.div 
                className="relative w-full h-40 sm:h-44 md:h-48 rounded-lg sm:rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={
                    project.mainImage || 
                    (project.title === "Macbook Mockup" 
                      ? "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop&auto=format"
                      : project.title === "Instant Feedback"
                      ? "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&auto=format"
                      : "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format")
                  }
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
                {/* Overlay gradient on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              
              {/* Project Info */}
              <motion.div 
                className="flex flex-col gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <motion.h3 
                  className="text-sm sm:text-base font-medium leading-5 sm:leading-6 text-[#262626] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                  whileHover={{ x: 2 }}
                >
                  {project.title}
                </motion.h3>
                <p className="text-xs sm:text-sm font-normal leading-4 sm:leading-5 text-[#737373] dark:text-neutral-400">
                  {project.description}
                </p>
                
                {/* Technology Icons */}
                <div className="flex gap-0 mt-2 flex-wrap">
                  {project.tags?.map((tag: string, tagIndex: number) => {
                    const { bg, icon } = getTechIcon(tag);
                    return (
                      <motion.div
                        key={tag}
                        className={`h-6 w-6 rounded-full ${bg} border border-neutral-300 dark:border-neutral-600 flex items-center justify-center ${tagIndex > 0 ? '-ml-2' : ''}`}
                        style={{ zIndex: project.tags.length - tagIndex }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: index * 0.1 + 0.3 + tagIndex * 0.05,
                          type: "spring",
                          stiffness: 200,
                          damping: 15
                        }}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                      >
                        {icon}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
