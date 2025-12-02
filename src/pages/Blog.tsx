import React from "react";
import { Link } from "react-router-dom";
import { FloatingNav } from "@/components/floating-nav";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { Post } from "@/types";
import { useSanityPosts } from "@/hooks/useSanityData";

const posts: Post[] = [
  {
    _id: "1",
    title: "Advanced CSS Techniques for Modern Web Development",
    slug: { current: "advanced-css" },
    publishedAt: "Thursday, Feb 15, 2024",
    overview: "Explore advanced CSS techniques including CSS Grid, Flexbox, Custom Properties, and modern layout patterns that will take your web development skills ...",
  },
  {
    _id: "2",
    title: "Introduction to Next.js",
    slug: { current: "intro-nextjs" },
    publishedAt: "Friday, Sep 15, 2023",
    overview: "Next.js is a powerful React framework that enables you to build fast, SEO-friendly web applications with server-side rendering and static site generat...",
  },
  {
    _id: "3",
    title: "Mastering React Hooks",
    slug: { current: "mastering-hooks" },
    publishedAt: "Monday, Jan 15, 2024",
    overview: "Learn how to effectively use React Hooks to manage state and side effects in your functional components. A comprehensive guide to useState, useEffect,...",
  },
  {
    _id: "4",
    title: "State Management in React: A Complete Guide",
    slug: { current: "state-management" },
    publishedAt: "Friday, Mar 15, 2024",
    overview: "Explore different state management solutions in React, from local state to global state management with Redux, Zustand, and other modern alternatives.",
  },
  {
    _id: "5",
    title: "Ace your next Javascript Interview",
    slug: { current: "js-interview" },
    publishedAt: "Friday, Jan 1, 2021",
    overview: "Tailwind CSS is a utility-first CSS framework that allows you to build modern websites without ever leaving your HTML. Lets explore the basics of Tail...",
  },
  {
    _id: "6",
    title: "TypeScript Best Practices for 2024",
    slug: { current: "typescript-best-practices" },
    publishedAt: "Thursday, Feb 1, 2024",
    overview: "Learn the most important TypeScript best practices and patterns that will help you write more maintainable and type-safe code in your projects.",
  },
  {
    _id: "7",
    title: "Web Performance Optimization: A Comprehensive Guide",
    slug: { current: "web-performance" },
    publishedAt: "Friday, Mar 1, 2024",
    overview: "Learn essential techniques and best practices for optimizing web performance, from code splitting to image optimization and everything in between.",
  },
];

export default function BlogPage() {
  const { posts: sanityPosts } = useSanityPosts(posts);
  const displayPosts = sanityPosts.length > 0 ? sanityPosts : posts;

  return (
    <main className="min-h-screen flex flex-col items-center font-sans dark:bg-[#0a0a0a] bg-neutral-100">
      <div className="w-full max-w-[896px] relative flex flex-col shadow-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 dark:bg-[#171717] bg-white">
        
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

        <div className="px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-10 relative z-10">
          {/* All blogs Heading */}
          <div className="py-3 sm:py-4 px-2 sm:px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100">
              All blogs
            </h1>
          </div>

          {/* Bio */}
          <div className="max-w-lg pt-3 sm:pt-4 px-2 sm:px-4">
            <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
              I&apos;m a software engineer with a passion for building scalable{" "}
              <br className="hidden sm:block" />
              and efficient systems. I&apos;m currently working as a software{" "}
              <br className="hidden sm:block" />
              engineer at Google.
            </p>
          </div>

          <SectionDivider />

          {/* Blog Posts */}
          <div className="pt-10 pb-6 px-4">
            <div className="flex flex-col gap-6 sm:gap-8">
              {displayPosts.map((post) => {
                // Format publishedAt date if it's from Sanity
                const publishedDate = post.publishedAt 
                  ? typeof post.publishedAt === 'string' && post.publishedAt.includes('T')
                    ? new Date(post.publishedAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
                    : post.publishedAt
                  : '';
                
                return (
                <Link 
                  key={post._id} 
                  to={`/blog/${post.slug.current}`}
                  className="flex flex-col gap-1.5 sm:gap-2 group cursor-pointer"
                >
                  <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-1.5 sm:gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-neutral-800 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-500 whitespace-nowrap">
                      {publishedDate}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed">
                    {post.overview}
                  </p>
                </Link>
                );
              })}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}

