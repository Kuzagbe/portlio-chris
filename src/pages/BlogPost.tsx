import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FloatingNav } from "@/components/floating-nav";
import { Footer } from "@/components/footer";
import { getPostBySlug } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) {
        setLoading(false);
        setError("No post slug provided");
        return;
      }
      
      try {
        const sanityPost = await getPostBySlug(slug);
        if (sanityPost) {
          setPost(sanityPost);
          setError(null);
        } else {
          setError("Post not found");
        }
      } catch (err) {
        console.error('Error loading post:', err);
        setError("Error loading post. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col items-center font-sans dark:bg-[#0a0a0a] bg-neutral-100">
        <div className="w-full max-w-[896px] relative flex flex-col shadow-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 dark:bg-[#171717] bg-white">
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-10">
            <p className="text-base text-neutral-500 dark:text-neutral-400">Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen flex flex-col items-center font-sans dark:bg-[#0a0a0a] bg-neutral-100">
        <div className="w-full max-w-[896px] relative flex flex-col shadow-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 dark:bg-[#171717] bg-white">
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-10">
            <h1 className="text-2xl font-bold">Post not found</h1>
            <Link to="/blog" className="text-blue-600 hover:underline">Back to Blog</Link>
          </div>
        </div>
      </main>
    );
  }

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

        <div className="px-4 sm:px-6 md:px-8 lg:px-12 pt-20 pb-10 relative z-10 flex flex-col items-center gap-20">
          {/* Hero Image - only show if image exists */}
          {post.image && (
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full max-w-[672px] h-[384px] object-cover rounded-2xl shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.10)]"
            />
          )}

          {/* Content */}
          <div className="w-full max-w-[574px] flex flex-col gap-6">
            {/* Title */}
            <h1 className="text-[30px] font-extrabold leading-[36px] text-[#101828] dark:text-neutral-100">
              {post.title}
            </h1>

            {/* Intro/Overview */}
            {post.overview && (
              <p className="text-sm leading-6 text-[#364153] dark:text-neutral-400">
                {post.overview}
              </p>
            )}

            {/* Content Sections - only Sanity body */}
            {post.body && (
              <div className="prose dark:prose-invert max-w-none">
                <PortableText value={post.body} />
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}

