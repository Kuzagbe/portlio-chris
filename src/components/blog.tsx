import React from "react";
import { Post } from "@/types";
import { useSanityPosts } from "@/hooks/useSanityData";

const dummyPosts: Post[] = [
  {
    _id: "1",
    title: "Advanced CSS Techniques for Modern Web Development",
    slug: { current: "advanced-css" },
    publishedAt: "Thursday, Feb 15, 2024",
    overview: "Explore advanced CSS techniques including CSS Grid, Flexbox, Custom Properties, and modern layout patterns that will tak...",
  },
  {
    _id: "2",
    title: "Introduction to Next.js",
    slug: { current: "intro-nextjs" },
    publishedAt: "Friday, Sep 15, 2023",
    overview: "Next.js is a powerful React framework that enables you to build fast, SEO-friendly web applications with server-side ren...",
  },
  {
    _id: "3",
    title: "Mastering React Hooks",
    slug: { current: "mastering-hooks" },
    publishedAt: "Monday, Jan 15, 2024",
    overview: "Learn how to effectively use React Hooks to manage state and side effects in your functional components. A comprehensive...",
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
    overview: "Tailwind CSS is a utility-first CSS framework that allows you to build modern websites without ever leaving your HTML. Lets explore the basics of Tailwind.",
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

export const Blog = () => {
  const { posts } = useSanityPosts(dummyPosts);
  // Show only first 3 posts
  const displayedPosts = posts.slice(0, 3);
  const headingWords = ["Sharing", "knowledge", "as", "I", "learn"];

  return (
    <section 
      id="blog" 
      className="py-6 sm:py-8 md:py-10 border-b border-neutral-100 dark:border-neutral-800"
    >
      <div className="flex items-start gap-4 mb-6 sm:mb-8">
        <h2 className="text-sm sm:text-base font-normal leading-5 sm:leading-6 text-[#262626] dark:text-white">
          {headingWords.join(" ")}
        </h2>
      </div>

      <div className="flex flex-col gap-6 sm:gap-8">
        {displayedPosts.map((post) => (
          <div 
            key={post._id} 
            className="flex flex-col gap-1.5 sm:gap-2 cursor-pointer"
          >
             <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-1.5 sm:gap-2">
                <h3 className="text-sm sm:text-base font-bold leading-5 sm:leading-6 text-[#262626] dark:text-white">
                  {post.title}
                </h3>
                <span className="text-xs sm:text-sm font-normal leading-4 sm:leading-5 text-[#737373] dark:text-neutral-400 whitespace-nowrap">
                  {post.publishedAt}
                </span>
             </div>
             <p className="text-xs sm:text-sm font-normal leading-4 sm:leading-5 text-[#737373] dark:text-neutral-400 max-w-xl">
               {post.overview}
             </p>
          </div>
        ))}
      </div>
    </section>
  );
};
