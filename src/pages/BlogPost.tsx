import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FloatingNav } from "@/components/floating-nav";
import { Footer } from "@/components/footer";
import { getPostBySlug } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";

// Sample blog post content - in a real app, this would come from a CMS or API
const blogPosts: Record<string, {
  title: string;
  image: string;
  intro: string;
  content: Array<{
    type: 'heading' | 'subheading' | 'paragraph';
    text: string;
  }>;
}> = {
  "intro-nextjs": {
    title: "Introduction to Next.js",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop&auto=format",
    intro: "Next.js has revolutionized the way developers build React applications by providing a robust framework that addresses many common challenges in modern web development.",
    content: [
      { type: 'heading', text: 'What is Next.js?' },
      { type: 'paragraph', text: 'Next.js is a React framework that enables functionality such as server-side rendering, static site generation, and API routes. Created by Vercel, it simplifies the development process while offering powerful features out of the box.' },
      { type: 'heading', text: 'Key Features' },
      { type: 'subheading', text: '1. Rendering Options' },
      { type: 'paragraph', text: 'Next.js offers multiple rendering strategies: Server-Side Rendering (SSR), Static Site Generation (SSG), and Client-Side Rendering. This flexibility allows developers to choose the best approach for each page.' },
      { type: 'subheading', text: '2. File-based Routing' },
      { type: 'paragraph', text: 'The framework implements an intuitive file-based routing system. Simply create a file in the pages directory, and it automatically becomes a route in your application.' },
      { type: 'subheading', text: '3. API Routes' },
      { type: 'paragraph', text: 'Next.js allows you to build API endpoints within your application using the same file-based routing system, making it a complete full-stack solution.' },
      { type: 'subheading', text: '4. Built-in Optimizations' },
      { type: 'paragraph', text: 'Image optimization, code splitting, and bundle optimization come pre-configured, ensuring your application performs well without additional setup.' },
      { type: 'heading', text: 'Getting Started' },
      { type: 'paragraph', text: 'Next.js provides an excellent developer experience with minimal configuration. Whether you\'re building a blog, e-commerce site, or complex web application, Next.js offers the tools to create fast, SEO-friendly, and user-friendly experiences.' },
    ]
  },
  "advanced-css": {
    title: "Advanced CSS Techniques for Modern Web Development",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=450&fit=crop&auto=format",
    intro: "Explore advanced CSS techniques including CSS Grid, Flexbox, Custom Properties, and modern layout patterns that will take your web development skills to the next level.",
    content: [
      { type: 'heading', text: 'CSS Grid and Flexbox' },
      { type: 'paragraph', text: 'CSS Grid and Flexbox are powerful layout systems that have revolutionized how we create responsive designs. Understanding when to use each is crucial for modern web development.' },
      { type: 'heading', text: 'Custom Properties' },
      { type: 'paragraph', text: 'CSS Custom Properties (CSS Variables) allow you to store values that can be reused throughout your stylesheet, making your CSS more maintainable and dynamic.' },
    ]
  },
  "mastering-hooks": {
    title: "Mastering React Hooks",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop&auto=format",
    intro: "Learn how to effectively use React Hooks to manage state and side effects in your functional components. A comprehensive guide to useState, useEffect, and more.",
    content: [
      { type: 'heading', text: 'Understanding Hooks' },
      { type: 'paragraph', text: 'React Hooks allow you to use state and other React features in functional components, making your code more reusable and easier to understand.' },
    ]
  },
  "state-management": {
    title: "State Management in React: A Complete Guide",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop&auto=format",
    intro: "Explore different state management solutions in React, from local state to global state management with Redux, Zustand, and other modern alternatives.",
    content: [
      { type: 'heading', text: 'State Management Options' },
      { type: 'paragraph', text: 'Choosing the right state management solution depends on your application\'s complexity and requirements. From simple useState to complex global state management libraries.' },
    ]
  },
  "js-interview": {
    title: "Ace your next Javascript Interview",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop&auto=format",
    intro: "Tailwind CSS is a utility-first CSS framework that allows you to build modern websites without ever leaving your HTML. Let's explore the basics of Tailwind.",
    content: [
      { type: 'heading', text: 'Interview Preparation' },
      { type: 'paragraph', text: 'Preparing for JavaScript interviews requires understanding core concepts, algorithms, and modern JavaScript features.' },
    ]
  },
  "typescript-best-practices": {
    title: "TypeScript Best Practices for 2024",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=450&fit=crop&auto=format",
    intro: "Learn the most important TypeScript best practices and patterns that will help you write more maintainable and type-safe code in your projects.",
    content: [
      { type: 'heading', text: 'TypeScript Patterns' },
      { type: 'paragraph', text: 'Understanding TypeScript best practices helps you write more robust and maintainable code with better type safety.' },
    ]
  },
  "web-performance": {
    title: "Web Performance Optimization: A Comprehensive Guide",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop&auto=format",
    intro: "Learn essential techniques and best practices for optimizing web performance, from code splitting to image optimization and everything in between.",
    content: [
      { type: 'heading', text: 'Performance Optimization' },
      { type: 'paragraph', text: 'Web performance is crucial for user experience. Learn techniques like code splitting, lazy loading, and image optimization to improve your site\'s speed.' },
    ]
  },
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) {
        setLoading(false);
        return;
      }
      
      try {
        const sanityPost = await getPostBySlug(slug);
        if (sanityPost) {
          setPost(sanityPost);
        } else {
          // Fallback to dummy data
          const dummyPost = blogPosts[slug];
          if (dummyPost) {
            setPost(dummyPost);
          }
        }
      } catch (error) {
        console.error('Error loading post:', error);
        // Fallback to dummy data
        const dummyPost = slug ? blogPosts[slug] : null;
        if (dummyPost) {
          setPost(dummyPost);
        }
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
            {(post.intro || post.overview) && (
              <p className="text-sm leading-6 text-[#364153] dark:text-neutral-400">
                {post.intro ? (
                  post.intro.split('<br/>').map((line: string, i: number, arr: string[]) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < arr.length - 1 && <br />}
                    </React.Fragment>
                  ))
                ) : (
                  post.overview
                )}
              </p>
            )}

            {/* Content Sections - handle both Sanity body and dummy content */}
            {post.body ? (
              <div className="prose dark:prose-invert max-w-none">
                <PortableText value={post.body} />
              </div>
            ) : post.content ? (
              post.content.map((section: any, index: number) => {
                if (section.type === 'heading') {
                  return (
                    <h2 
                      key={index}
                      className="text-xl font-bold leading-7 text-[#101828] dark:text-neutral-100 pt-2"
                    >
                      {section.text}
                    </h2>
                  );
                } else if (section.type === 'subheading') {
                  return (
                    <h3 
                      key={index}
                      className="text-lg font-semibold leading-7 text-[#101828] dark:text-neutral-100 pt-4"
                    >
                      {section.text}
                    </h3>
                  );
                } else {
                  return (
                    <p 
                      key={index}
                      className="text-sm leading-6 text-[#364153] dark:text-neutral-400"
                    >
                      {section.text.split('<br/>').map((line: string, i: number, arr: string[]) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < arr.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  );
                }
              })
            ) : null}
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}

