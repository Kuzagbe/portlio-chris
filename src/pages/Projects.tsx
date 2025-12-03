import React from "react";
import { motion } from "motion/react";
import { FloatingNav } from "@/components/floating-nav";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
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

// Stable empty array reference to prevent re-renders
const EMPTY_ARRAY: any[] = [];

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

export default function ProjectsPage() {
  const { data: sanityProjects, loading, error } = useSanityProjects(EMPTY_ARRAY);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  
  // Use Sanity data only - no fallback to dummy data
  const allProjects = Array.isArray(sanityProjects) ? sanityProjects : [];
  
  // Filter projects based on selected category
  const displayProjects = React.useMemo(() => {
    if (selectedCategory === 'all') {
      return allProjects;
    }
    return allProjects.filter((project: any) => project.category === selectedCategory);
  }, [allProjects, selectedCategory]);
  
  const categories = [
    { value: 'all', label: 'All' },
    { value: 'ux-design', label: 'UX Design' },
    { value: 'ux-engineering', label: 'UX Engineering' },
    { value: 'product-management', label: 'Product Management' },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center font-sans dark:bg-[#0a0a0a] bg-neutral-100">
      <div className="w-full max-w-[896px] relative flex flex-col min-h-screen shadow-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 dark:bg-[#171717] bg-white">
        
        {/* Diagonal Stripe Patterns (Left and Right) */}
        <div 
          className="hidden sm:block absolute left-0 top-0 bottom-0 w-4 md:w-6 lg:w-8 border-r border-neutral-200 dark:border-neutral-800 pointer-events-none z-10 bg-fixed"
          style={{
            backgroundImage: "repeating-linear-gradient(315deg, var(--pattern-fg) 0, var(--pattern-fg) 1px, transparent 0, transparent 50%)",
            backgroundSize: "10px 10px",
            "--pattern-fg": "rgba(156, 163, 175, 0.3)"
          } as React.CSSProperties}
        >
          <div className="w-full h-full dark:hidden" />
          <div 
            className="w-full h-full hidden dark:block" 
            style={{ "--pattern-fg": "rgba(156, 163, 175, 0.4)" } as React.CSSProperties}
          />
        </div>
        
        <div 
          className="hidden sm:block absolute right-0 top-0 bottom-0 w-4 md:w-6 lg:w-8 border-l border-neutral-200 dark:border-neutral-800 pointer-events-none z-10 bg-fixed"
          style={{
            backgroundImage: "repeating-linear-gradient(315deg, var(--pattern-fg) 0, var(--pattern-fg) 1px, transparent 0, transparent 50%)",
            backgroundSize: "10px 10px",
            "--pattern-fg": "rgba(156, 163, 175, 0.3)"
          } as React.CSSProperties}
        >
          <div className="w-full h-full dark:hidden" />
          <div 
            className="w-full h-full hidden dark:block" 
            style={{ "--pattern-fg": "rgba(156, 163, 175, 0.4)" } as React.CSSProperties}
          />
        </div>

        {/* Navigation */}
        <div className="px-4 sm:px-6 md:px-9 py-2 relative z-50">
          <FloatingNav />
        </div>
          
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-10 relative z-10 flex-1 flex flex-col">
          {/* Projects Heading */}
          <div className="py-3 sm:py-4 px-2 sm:px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100">
              Projects
            </h1>
          </div>

          {/* Bio */}
          <div className="max-w-lg pt-3 sm:pt-4 px-2 sm:px-4">
            <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-6 sm:leading-relaxed">
              I am a multidisciplinary builder with experience in software{" "}
              <br className="hidden sm:block" />
              engineering, product design, product management, and project{" "}
              <br className="hidden sm:block" />
              management. I design how a product should feel, plan how it{" "}
              <br className="hidden sm:block" />
              should work, and build the systems that bring it to life.
            </p>
          </div>

          <SectionDivider />

          {/* I love building things Section */}
          <div className="pt-10 pb-6 px-4 flex-1">
            <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6 flex-wrap">
              <h2 className="text-sm sm:text-base font-normal text-neutral-800 dark:text-neutral-100 flex flex-wrap gap-1.5">
                <span>I</span>
                <span>love</span>
                <span>building</span>
                <span>things</span>
              </h2>
              
              {/* Filter Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                      selectedCategory === category.value
                        ? 'bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative">
              {loading ? (
                <div className="col-span-full text-center text-sm text-neutral-500 dark:text-neutral-400 py-8">
                  Loading projects...
                </div>
              ) : error ? (
                <div className="col-span-full text-center text-sm text-red-500 dark:text-red-400 py-8">
                  Error loading projects. Please try again later.
                </div>
              ) : displayProjects.length === 0 ? (
                <div className="col-span-full text-center text-sm text-neutral-500 dark:text-neutral-400 py-8">
                  {selectedCategory === 'all' 
                    ? 'No projects found. Add projects in your Sanity Studio.'
                    : `No ${categories.find(c => c.value === selectedCategory)?.label || 'projects'} found. Try selecting a different category.`
                  }
                </div>
              ) : (
                displayProjects.map((project: any, index: number) => {
                const imageUrl = (project as any).mainImage 
                  ? (typeof (project as any).mainImage === 'string' 
                      ? (project as any).mainImage 
                      : urlForImage((project as any).mainImage)?.url() || '')
                  : '';
                
                return (
                <motion.div
                    key={project._id}
                  className="w-full pb-4 flex flex-col cursor-pointer group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  >
                    <div className="flex flex-col">
                    <motion.div 
                      className="relative w-full h-40 sm:h-44 md:h-48 rounded-lg sm:rounded-xl overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      {imageUrl && (
                        <motion.img
                          src={imageUrl}
                          alt={project.title || 'Project'}
                          width={256}
                          height={180}
                          className="w-full h-full object-cover rounded-lg sm:rounded-xl"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          loading="lazy"
                        />
                      )}
                      {/* Overlay gradient on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                    <motion.div 
                      className="pt-3 sm:pt-4 pb-2 sm:pb-4 flex flex-col justify-between gap-3 sm:gap-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <div className="pt-1 sm:pt-2 flex flex-col gap-1.5 sm:gap-2">
                        <motion.h3 
                          className="text-sm sm:text-base font-medium text-neutral-500 dark:text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                          whileHover={{ x: 2 }}
                        >
                            {project.title}
                        </motion.h3>
                        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed whitespace-pre-line">
                            {project.description}
                          </p>
                        </div>
                      {/* Technology Icons */}
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex gap-0 mt-2 flex-wrap">
                          {project.tags.map((tag: string, tagIndex: number) => {
                            const { bg, icon } = getTechIcon(tag);
                            return (
                              <motion.div
                                key={`${project._id}-${tag}-${tagIndex}`}
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
                      )}
                    </motion.div>
                  </div>
                </motion.div>
                );
              })
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}

