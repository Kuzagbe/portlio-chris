import React from "react";
import { useSanityPosts } from "@/hooks/useSanityData";

// Stable empty array reference
const EMPTY_ARRAY: any[] = [];

export const Blog = () => {
  const { data: postsData, loading, error } = useSanityPosts(EMPTY_ARRAY);
  
  // Use only Sanity data - no fallback
  const posts = Array.isArray(postsData) ? postsData : [];
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
        {loading ? (
          <div className="text-center text-sm text-neutral-500 dark:text-neutral-400 py-8">
            Loading blog posts...
          </div>
        ) : error ? (
          <div className="text-center text-sm text-red-500 dark:text-red-400 py-8">
            Error loading blog posts. Please try again later.
          </div>
        ) : displayedPosts.length === 0 ? (
          <div className="text-center text-sm text-neutral-500 dark:text-neutral-400 py-8">
            No blog posts found. Add posts in your Sanity Studio.
          </div>
        ) : (
          displayedPosts.map((post: any) => (
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
        ))
        )}
      </div>
    </section>
  );
};
