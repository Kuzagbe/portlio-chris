import React from "react";
import { motion } from "motion/react";
import { Experience as ExperienceType } from "@/types";
import { useSanityExperiences } from "@/hooks/useSanityData";

const dummyExperience: ExperienceType[] = [
  {
    _id: "1",
    company: "Google",
    role: "Senior Frontend Engineer",
    duration: "June 2020 - Present",
    description: "Led the development of key features for Google Cloud Platform's web console while improving performance metrics by 35%.",
    technologies: ["React", "TypeScript", "Redux", "GraphQL", "Jest", "Cypress"],
  },
  {
    _id: "2",
    company: "Microsoft",
    role: "Software Engineer",
    duration: "August 2018 - May 2020",
    description: "Worked on the Microsoft Teams web application, implementing real-time collaboration features and UI components.",
    technologies: ["React", "JavaScript", "Azure", "WebRTC", "Webpack", "SASS"],
  },
  {
    _id: "3",
    company: "Airbnb",
    role: "Frontend Developer",
    duration: "January 2017 - July 2018",
    description: "Developed and maintained core components of Airbnb's booking platform.",
    technologies: ["React", "Redux", "Node.js", "Express", "MongoDB", "Styled Components"],
  },
  {
    _id: "4",
    company: "Shopify",
    role: "Freelance Web Developer",
    duration: "March 2019 - December 2019",
    description: "Designed and developed custom Shopify themes for enterprise clients with optimized checkout flows.",
    technologies: ["JavaScript", "HTML5", "CSS3", "SCSS", "Shopify API"],
  },
  {
    _id: "5",
    company: "Adobe",
    role: "Freelance Frontend Consultant",
    duration: "September 2016 - November 2016",
    description: "Consulted on the redesign of Adobe's Creative Cloud web application.",
    technologies: ["HTML5", "JavaScript", "CSS3"],
  },
];

export const Experience = () => {
  const headingWords = ["Worked", "at", "reputed", "firms"];
  const { experiences } = useSanityExperiences(dummyExperience);

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
        {experiences.map((exp, expIndex) => {
          const getTechIcon = (tech: string) => {
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
              redux: { 
                bg: "bg-purple-600", 
                icon: (
                  <span className="text-[8px] font-bold text-white">R</span>
                )
              },
              graphql: { 
                bg: "bg-pink-600", 
                icon: (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                    <path d="M12.001 0c-2.4 0-4.4.8-6 2.4-1.6 1.6-2.4 3.6-2.4 6 0 2.4.8 4.4 2.4 6 1.6 1.6 3.6 2.4 6 2.4 2.4 0 4.4-.8 6-2.4 1.6-1.6 2.4-3.6 2.4-6 0-2.4-.8-4.4-2.4-6-1.6-1.6-3.6-2.4-6-2.4zm0 2.4c1.6 0 3 .4 4.2 1.2 1.2.8 2 2 2.4 3.6h-2.4c-.2-1-.8-1.8-1.8-2.4-1-.6-2.2-1-3.6-1-1.4 0-2.6.4-3.6 1-1 .6-1.6 1.4-1.8 2.4H5.4c.4-1.6 1.2-2.8 2.4-3.6 1.2-.8 2.6-1.2 4.2-1.2zm-6 6c.8 0 1.4.2 2 .6.6.4 1 .8 1.2 1.4h2.4c-.2-1-.8-1.8-1.8-2.4-1-.6-2.2-1-3.6-1-1.4 0-2.6.4-3.6 1-1 .6-1.6 1.4-1.8 2.4H3.4c.2-.6.6-1 1.2-1.4.6-.4 1.2-.6 2-.6zm12 0c.8 0 1.4.2 2 .6.6.4 1 .8 1.2 1.4h2.4c-.2-1-.8-1.8-1.8-2.4-1-.6-2.2-1-3.6-1-1.4 0-2.6.4-3.6 1-1 .6-1.6 1.4-1.8 2.4h2.4c.2-.6.6-1 1.2-1.4.6-.4 1.2-.6 2-.6zM6 13.2c-1.4 0-2.6.4-3.6 1-1 .6-1.6 1.4-1.8 2.4h2.4c.2-.6.6-1 1.2-1.4.6-.4 1.2-.6 2-.6.8 0 1.4.2 2 .6.6.4 1 .8 1.2 1.4h2.4c-.2-1-.8-1.8-1.8-2.4-1-.6-2.2-1-3.6-1zm12 0c-1.4 0-2.6.4-3.6 1-1 .6-1.6 1.4-1.8 2.4h2.4c.2-.6.6-1 1.2-1.4.6-.4 1.2-.6 2-.6.8 0 1.4.2 2 .6.6.4 1 .8 1.2 1.4h2.4c-.2-1-.8-1.8-1.8-2.4-1-.6-2.2-1-3.6-1zm-6 6c-2.4 0-4.4.8-6 2.4-1.6 1.6-2.4 3.6-2.4 6 0 2.4.8 4.4 2.4 6 1.6 1.6 3.6 2.4 6 2.4 2.4 0 4.4-.8 6-2.4 1.6-1.6 2.4-3.6 2.4-6 0-2.4-.8-4.4-2.4-6-1.6-1.6-3.6-2.4-6-2.4z"/>
                  </svg>
                )
              },
              jest: { 
                bg: "bg-orange-500", 
                icon: (
                  <span className="text-[8px] font-bold text-white">J</span>
                )
              },
              cypress: { 
                bg: "bg-green-600", 
                icon: (
                  <span className="text-[8px] font-bold text-white">C</span>
                )
              },
              javascript: { 
                bg: "bg-yellow-500", 
                icon: (
                  <span className="text-[8px] font-bold text-white">JS</span>
                )
              },
              azure: { 
                bg: "bg-blue-500", 
                icon: (
                  <span className="text-[8px] font-bold text-white">A</span>
                )
              },
              webrtc: { 
                bg: "bg-green-500", 
                icon: (
                  <span className="text-[8px] font-bold text-white">W</span>
                )
              },
              webpack: { 
                bg: "bg-blue-400", 
                icon: (
                  <span className="text-[8px] font-bold text-white">W</span>
                )
              },
              sass: { 
                bg: "bg-pink-500", 
                icon: (
                  <span className="text-[8px] font-bold text-white">S</span>
                )
              },
              "node.js": { 
                bg: "bg-green-600", 
                icon: (
                  <span className="text-[8px] font-bold text-white">N</span>
                )
              },
              nodejs: { 
                bg: "bg-green-600", 
                icon: (
                  <span className="text-[8px] font-bold text-white">N</span>
                )
              },
              express: { 
                bg: "bg-gray-600", 
                icon: (
                  <span className="text-[8px] font-bold text-white">E</span>
                )
              },
              mongodb: { 
                bg: "bg-green-700", 
                icon: (
                  <span className="text-[8px] font-bold text-white">M</span>
                )
              },
              "styled components": { 
                bg: "bg-pink-500", 
                icon: (
                  <span className="text-[8px] font-bold text-white">SC</span>
                )
              },
              html5: { 
                bg: "bg-orange-500", 
                icon: (
                  <span className="text-[8px] font-bold text-white">5</span>
                )
              },
              css3: { 
                bg: "bg-blue-500", 
                icon: (
                  <span className="text-[8px] font-bold text-white">3</span>
                )
              },
              scss: { 
                bg: "bg-pink-500", 
                icon: (
                  <span className="text-[8px] font-bold text-white">S</span>
                )
              },
              "shopify api": { 
                bg: "bg-green-600", 
                icon: (
                  <span className="text-[8px] font-bold text-white">S</span>
                )
              },
            };
            return icons[tech.toLowerCase()] || { bg: "bg-neutral-500", icon: <span className="text-[8px] font-bold text-white">•</span> };
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
                      {exp.technologies.map((tech, techIndex) => {
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
                        src={exp.companyLogo}
                        alt={exp.company} 
                        className="max-w-full max-h-full object-contain opacity-70 dark:opacity-50"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

