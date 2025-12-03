import React from "react";
import { motion } from "motion/react";
import { useSanityExperiences } from "@/hooks/useSanityData";
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
} from 'react-icons/si';

// Stable empty array reference
const EMPTY_ARRAY: any[] = [];

export const Experience = () => {
  const headingWords = ["Worked", "at", "reputed", "firms"];
  const { data: experiencesData, loading, error } = useSanityExperiences(EMPTY_ARRAY);
  
  // Use only Sanity data - no fallback
  const experiences = Array.isArray(experiencesData) ? experiencesData : [];

  return (
    <section 
      className="py-6 sm:py-8 md:py-10 border-b border-neutral-100 dark:border-neutral-800"
    >
      <div className="flex items-start gap-4 mb-6 sm:mb-8">
        <h2 className="text-sm sm:text-base font-normal leading-5 sm:leading-6 text-[#262626] dark:text-white">
          {headingWords.join(" ")}
        </h2>
      </div>

      <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
        {loading ? (
          <div className="text-center text-sm text-neutral-500 dark:text-neutral-400 py-8">
            Loading experience...
          </div>
        ) : error ? (
          <div className="text-center text-sm text-red-500 dark:text-red-400 py-8">
            Error loading experience. Please try again later.
          </div>
        ) : experiences.length === 0 ? (
          <div className="text-center text-sm text-neutral-500 dark:text-neutral-400 py-8">
            No experience found. Add experience in your Sanity Studio.
          </div>
        ) : (
          experiences.map((exp: any, expIndex: number) => {
          // Map technology identifiers to react-icons components
          const getTechIcon = (tech: string) => {
            const techLower = tech.toLowerCase().trim();
            
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
              css3: { Icon: SiCss3, bg: "bg-[#1572B6]" },
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

          return (
            <div 
              key={exp._id} 
              className="flex flex-col gap-3 sm:gap-4"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                <div className="flex flex-col gap-1.5 sm:gap-2 flex-1">
                  <h3 className="text-sm sm:text-base font-medium leading-5 sm:leading-6 text-[#171717] dark:text-white">
                    {exp.company}
                  </h3>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2">
                    <span className="text-xs sm:text-sm font-normal leading-4 sm:leading-5 text-[#262626] dark:text-neutral-200">
                      {exp.role}
                    </span>
                    <span className="text-xs sm:text-sm font-normal leading-4 sm:leading-5 text-[#737373] dark:text-neutral-400">
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-normal leading-4 sm:leading-5 text-[#737373] dark:text-neutral-400 max-w-xl">
                    {exp.description}
                  </p>
                  {exp.technologies && (
                    <div className="flex gap-0 mt-1.5 sm:mt-2 flex-wrap">
                      {exp.technologies.map((tech: string, techIndex: number) => {
                        const { bg, icon } = getTechIcon(tech);
                        return (
                          <motion.div
                            key={tech}
                            className={`h-6 w-6 rounded-full ${bg} border border-neutral-300 dark:border-neutral-600 flex items-center justify-center ${techIndex > 0 ? '-ml-2' : ''}`}
                            style={{ zIndex: exp.technologies.length - techIndex }}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ 
                              delay: expIndex * 0.1 + 0.2 + techIndex * 0.05,
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
                  )}
                </div>
                {exp.companyLogo && (
                  <div className="flex-shrink-0 hidden sm:block">
                    <div className="w-[100px] h-[33px] flex items-center justify-center bg-neutral-50 dark:bg-neutral-800 rounded px-2 py-1 border border-neutral-200 dark:border-neutral-700">
                      <img 
                        src={
                          exp.companyLogo 
                            ? (typeof exp.companyLogo === 'string' 
                                ? exp.companyLogo 
                                : urlForImage(exp.companyLogo)?.url() || '')
                            : ''
                        }
                        alt={exp.company} 
                        className="max-w-full max-h-full object-contain opacity-70 dark:opacity-50"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })
        )}
      </div>
    </section>
  );
};

