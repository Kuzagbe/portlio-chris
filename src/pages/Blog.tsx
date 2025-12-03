import React from "react";
import { Link } from "react-router-dom";
import { FloatingNav } from "@/components/floating-nav";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { useSanityPosts } from "@/hooks/useSanityData";

// Stable empty array reference
const EMPTY_ARRAY: any[] = [];

export default function BlogPage() {
  const { data: sanityPosts, loading, error } = useSanityPosts(EMPTY_ARRAY);
  const displayPosts = Array.isArray(sanityPosts) ? sanityPosts : [];

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
          {/* All blogs Heading */}
          <div className="py-3 sm:py-4 px-2 sm:px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100">
              All blogs
            </h1>
          </div>

          {/* Bio */}
          <div className="max-w-lg pt-3 sm:pt-4 px-2 sm:px-4">
            <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-6 sm:leading-relaxed">
              I write about the craft behind creating products, from shaping{" "}
              <br className="hidden sm:block" />
              clear user experiences to building the systems that support them.{" "}
              <br className="hidden sm:block" />
              My aim is to share practical lessons, thoughtful ideas, and the{" "}
              <br className="hidden sm:block" />
              reasoning that guides real work in technology.
            </p>
          </div>

          <SectionDivider />

          {/* Blog Posts */}
          <div className="pt-10 pb-6 px-4 flex-1">
            <div className="flex flex-col gap-6 sm:gap-8">
              {loading ? (
                <div className="text-center text-sm text-neutral-500 dark:text-neutral-400 py-8">
                  Loading blog posts...
                </div>
              ) : error ? (
                <div className="text-center text-sm text-red-500 dark:text-red-400 py-8">
                  Error loading blog posts. Please try again later.
                </div>
              ) : displayPosts.length === 0 ? (
                <div className="text-center text-sm text-neutral-500 dark:text-neutral-400 py-8">
                  No blog posts found. Add posts in your Sanity Studio.
                </div>
              ) : (
                displayPosts.map((post: any) => {
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

