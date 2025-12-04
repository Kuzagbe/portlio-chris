import React from "react";
import { motion } from "motion/react";
import { useSanityProjects } from "@/hooks/useSanityData";
import { urlForImage } from "@/sanity/lib/image";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiPython,
  SiGo,
  SiRust,
  SiPhp,
  SiRuby,
  SiSwift,
  SiKotlin,
  SiDocker,
  SiKubernetes,
  SiAmazonwebservices,
  SiGooglecloud,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiGraphql,
  SiApollographql,
  SiRedux,
  SiVuedotjs,
  SiAngular,
  SiNextdotjs,
  SiExpress,
  SiDjango,
  SiFlask,
  SiSpring,
  SiTailwindcss,
  SiBootstrap,
  SiSass,
  SiLess,
  SiWebpack,
  SiVite,
  SiJest,
  SiCypress,
  SiGit,
  SiGithub,
  SiGitlab,
  SiBitbucket,
  SiFigma,
  SiAdobexd,
  SiFirebase,
  SiSupabase,
  SiVercel,
  SiNetlify,
  SiHeroku,
  SiShopify,
  SiWordpress,
  SiDrupal,
  SiHtml5,
  SiCss3,
  SiThreedotjs,
  SiFramer,
} from 'react-icons/si';

// Tech stack icon mapping - moved outside component to prevent recreation
const getTechIcon = (tag: string) => {
  const techLower = tag.toLowerCase().trim();
  
  // Map technology names to icon components and background colors
  const iconMap: Record<string, { Icon: React.ComponentType<any>; bg: string }> = {
    react: { Icon: SiReact, bg: "bg-[#61DAFB]" },
    typescript: { Icon: SiTypescript, bg: "bg-[#3178C6]" },
    javascript: { Icon: SiJavascript, bg: "bg-[#F7DF1E]" },
    'node.js': { Icon: SiNodedotjs, bg: "bg-[#339933]" },
    nodejs: { Icon: SiNodedotjs, bg: "bg-[#339933]" },
    python: { Icon: SiPython, bg: "bg-[#3776AB]" },
    go: { Icon: SiGo, bg: "bg-[#00ADD8]" },
    rust: { Icon: SiRust, bg: "bg-[#000000]" },
    php: { Icon: SiPhp, bg: "bg-[#777BB4]" },
    ruby: { Icon: SiRuby, bg: "bg-[#CC342D]" },
    swift: { Icon: SiSwift, bg: "bg-[#FA7343]" },
    kotlin: { Icon: SiKotlin, bg: "bg-[#7F52FF]" },
    docker: { Icon: SiDocker, bg: "bg-[#2496ED]" },
    kubernetes: { Icon: SiKubernetes, bg: "bg-[#326CE5]" },
    aws: { Icon: SiAmazonwebservices, bg: "bg-[#232F3E]" },
    googlecloud: { Icon: SiGooglecloud, bg: "bg-[#4285F4]" },
    mongodb: { Icon: SiMongodb, bg: "bg-[#47A248]" },
    postgresql: { Icon: SiPostgresql, bg: "bg-[#336791]" },
    mysql: { Icon: SiMysql, bg: "bg-[#4479A1]" },
    redis: { Icon: SiRedis, bg: "bg-[#DC382D]" },
    graphql: { Icon: SiGraphql, bg: "bg-[#E10098]" },
    apollo: { Icon: SiApollographql, bg: "bg-[#311C87]" },
    redux: { Icon: SiRedux, bg: "bg-[#764ABC]" },
    vue: { Icon: SiVuedotjs, bg: "bg-[#4FC08D]" },
    angular: { Icon: SiAngular, bg: "bg-[#DD0031]" },
    nextjs: { Icon: SiNextdotjs, bg: "bg-[#000000]" },
    'next.js': { Icon: SiNextdotjs, bg: "bg-[#000000]" },
    express: { Icon: SiExpress, bg: "bg-[#000000]" },
    django: { Icon: SiDjango, bg: "bg-[#092E20]" },
    flask: { Icon: SiFlask, bg: "bg-[#000000]" },
    spring: { Icon: SiSpring, bg: "bg-[#6DB33F]" },
    tailwindcss: { Icon: SiTailwindcss, bg: "bg-[#06B6D4]" },
    tailwind: { Icon: SiTailwindcss, bg: "bg-[#06B6D4]" },
    bootstrap: { Icon: SiBootstrap, bg: "bg-[#7952B3]" },
    sass: { Icon: SiSass, bg: "bg-[#CC6699]" },
    scss: { Icon: SiSass, bg: "bg-[#CC6699]" },
    less: { Icon: SiLess, bg: "bg-[#1D365D]" },
    webpack: { Icon: SiWebpack, bg: "bg-[#8DD6F9]" },
    vite: { Icon: SiVite, bg: "bg-[#646CFF]" },
    jest: { Icon: SiJest, bg: "bg-[#C21325]" },
    cypress: { Icon: SiCypress, bg: "bg-[#17202C]" },
    git: { Icon: SiGit, bg: "bg-[#F05032]" },
    github: { Icon: SiGithub, bg: "bg-[#181717]" },
    gitlab: { Icon: SiGitlab, bg: "bg-[#FC6D26]" },
    bitbucket: { Icon: SiBitbucket, bg: "bg-[#0052CC]" },
    figma: { Icon: SiFigma, bg: "bg-[#F24E1E]" },
    adobexd: { Icon: SiAdobexd, bg: "bg-[#FF61F6]" },
    firebase: { Icon: SiFirebase, bg: "bg-[#FFCA28]" },
    supabase: { Icon: SiSupabase, bg: "bg-[#3ECF8E]" },
    vercel: { Icon: SiVercel, bg: "bg-[#000000]" },
    netlify: { Icon: SiNetlify, bg: "bg-[#00C7B7]" },
    heroku: { Icon: SiHeroku, bg: "bg-[#430098]" },
    shopify: { Icon: SiShopify, bg: "bg-[#96BF48]" },
    wordpress: { Icon: SiWordpress, bg: "bg-[#21759B]" },
    drupal: { Icon: SiDrupal, bg: "bg-[#0678BE]" },
    html5: { Icon: SiHtml5, bg: "bg-[#E34F26]" },
    html: { Icon: SiHtml5, bg: "bg-[#E34F26]" },
    css3: { Icon: SiCss3, bg: "bg-[#1572B6]" },
    css: { Icon: SiCss3, bg: "bg-[#1572B6]" },
    threejs: { Icon: SiThreedotjs, bg: "bg-[#000000]" },
    'three.js': { Icon: SiThreedotjs, bg: "bg-[#000000]" },
    framer: { Icon: SiFramer, bg: "bg-[#0055FF]" },
  };

  const match = iconMap[techLower] || iconMap[techLower.replace(/\s+/g, '')];
  
  if (match) {
    const { Icon, bg } = match;
    return {
      bg,
      icon: <Icon className="text-white" size={14} />,
    };
  }

  // Fallback for unknown technologies
  return {
    bg: "bg-neutral-500",
    icon: <span className="text-[8px] font-bold text-white">•</span>,
  };
};

// Stable empty array reference to prevent re-renders
const EMPTY_ARRAY: any[] = [];

export const Projects = () => {
  const headingWords = ["I", "love", "building", "things"];
  const { data: projectsData, loading, error } = useSanityProjects(EMPTY_ARRAY);
  
  // Use Sanity data only - no fallback to dummy data
  const projects = Array.isArray(projectsData) ? projectsData : [];

  return (
    <section 
      id="projects" 
      className="py-6 sm:py-8 md:py-10 border-b border-neutral-100 dark:border-neutral-800 relative overflow-hidden"
    >
       <div className="flex items-start gap-4 mb-6 sm:mb-8">
        <motion.div 
          className="inline-flex px-3 py-1.5 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-200/50 dark:border-blue-800/50 rounded-lg backdrop-blur-sm shadow-sm"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
           <motion.h2 
             className="text-sm sm:text-base font-normal leading-5 sm:leading-6 text-[#262626] dark:text-white"
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
           >
             {headingWords.map((word, i) => (
               <motion.span
                 key={i}
                 className="inline-block mr-1"
                 initial={{ opacity: 0, y: -10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 200 }}
               >
                 {word}
               </motion.span>
             ))}
           </motion.h2>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {loading ? (
          <div className="col-span-full text-center text-sm text-neutral-500 dark:text-neutral-400 py-8">
            Loading projects...
          </div>
        ) : error ? (
          <div className="col-span-full text-center text-sm text-red-500 dark:text-red-400 py-8">
            Error loading projects. Please try again later.
          </div>
        ) : projects.length === 0 ? (
          <div className="col-span-full text-center text-sm text-neutral-500 dark:text-neutral-400 py-8">
            No projects found. Add projects in your Sanity Studio.
          </div>
        ) : (
          projects.map((project: any, index: number) => {
            const imageUrl = project.mainImage 
              ? (typeof project.mainImage === 'string' 
                  ? project.mainImage 
                  : urlForImage(project.mainImage)?.url() || '')
              : '';

            return (
              <motion.div 
                key={project._id} 
                className="flex flex-col gap-3 sm:gap-4 cursor-pointer group relative"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Project Image Container with glassmorphism */}
                <motion.div 
                  className="relative w-full h-40 sm:h-44 md:h-48 rounded-xl overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 shadow-lg group-hover:shadow-2xl transition-all duration-300"
                  whileHover={{ 
                    scale: 1.03,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {imageUrl && (
                    <motion.img
                      src={imageUrl}
                      alt={project.title || 'Project'}
                      width={256}
                      height={180}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      loading="lazy"
                    />
                  )}
                  
                  {/* Animated overlay gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Shine effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                  
                  {/* Project link indicator */}
                  <motion.div
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-lg"
                    initial={{ scale: 0, rotate: -180 }}
                    whileHover={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <svg className="w-4 h-4 text-neutral-700 dark:text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </motion.div>
                </motion.div>
                
                {/* Project Info with enhanced styling */}
                <motion.div 
                  className="flex flex-col gap-2 px-1"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                >
                  <motion.h3 
                    className="text-sm sm:text-base font-semibold leading-5 sm:leading-6 text-[#262626] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300"
                    whileHover={{ x: 4 }}
                  >
                    {project.title}
                  </motion.h3>
                  <motion.p 
                    className="text-xs sm:text-sm font-normal leading-4 sm:leading-5 text-[#737373] dark:text-neutral-400 line-clamp-2"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {project.description}
                  </motion.p>
                  
                  {/* Technology Icons with enhanced animations */}
                  {project.tags && project.tags.length > 0 && (
                    <motion.div 
                      className="flex gap-0 mt-3 flex-wrap"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      {project.tags.map((tag: string, tagIndex: number) => {
                        const { bg, icon } = getTechIcon(tag);
                        return (
                          <motion.div
                            key={`${project._id}-${tag}-${tagIndex}`}
                            className={`h-7 w-7 rounded-full ${bg} border-2 border-white/50 dark:border-neutral-800/50 flex items-center justify-center shadow-md ${tagIndex > 0 ? '-ml-2' : ''} group/icon`}
                            style={{ zIndex: project.tags.length - tagIndex }}
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ 
                              delay: index * 0.1 + 0.5 + tagIndex * 0.08,
                              type: "spring",
                              stiffness: 200,
                              damping: 15
                            }}
                            whileHover={{ 
                              scale: 1.4, 
                              rotate: [0, -10, 10, -10, 0],
                              zIndex: 50,
                              y: -4
                            }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {icon}
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            );
          })
        )}
      </div>
    </section>
  );
};
