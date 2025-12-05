import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FloatingNav } from "@/components/floating-nav";
import { Footer } from "@/components/footer";
import { getPostBySlug } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/image";

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
        <div className="w-full max-w-[896px] relative flex flex-col min-h-screen shadow-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 dark:bg-[#171717] bg-white">
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-10 flex-1 flex items-center justify-center">
            <p className="text-base text-neutral-500 dark:text-neutral-400">Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen flex flex-col items-center font-sans dark:bg-[#0a0a0a] bg-neutral-100">
        <div className="w-full max-w-[896px] relative flex flex-col min-h-screen shadow-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 dark:bg-[#171717] bg-white">
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-10 flex-1 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">Post not found</h1>
            <Link to="/blog" className="text-blue-600 hover:underline">Back to Blog</Link>
          </div>
        </div>
      </main>
    );
  }

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

        <div className="px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-8 md:pt-10 pb-10 relative z-10 flex-1 flex flex-col items-center gap-8 sm:gap-12">
          {/* Main Image - First, at the top */}
          {post.mainImage && (
            <div className="w-full max-w-[672px]">
              {typeof post.mainImage === 'string' ? (
                <img 
                  src={post.mainImage} 
                  alt={post.mainImage?.alt || post.title || 'Post image'}
                  className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.10)]"
                />
              ) : (
                <img 
                  src={urlForImage(post.mainImage)?.url() || ''} 
                  alt={post.mainImage?.alt || post.title || 'Post image'}
                  className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.10)]"
                />
              )}
            </div>
          )}

          {/* Content Container */}
          <div className="w-full max-w-[672px] flex flex-col gap-6 sm:gap-8">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-[30px] font-extrabold leading-tight sm:leading-[36px] text-[#101828] dark:text-neutral-100">
              {post.title}
            </h1>

            {/* Overview - Second, after title */}
            {post.overview && (
              <p className="text-sm sm:text-base leading-6 sm:leading-7 text-[#364153] dark:text-neutral-400">
                {post.overview}
              </p>
            )}

            {/* Body - Third, after overview */}
            {post.body && (
              <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none 
                prose-headings:text-[#101828] dark:prose-headings:text-neutral-100
                prose-p:text-[#364153] dark:prose-p:text-neutral-400 prose-p:leading-7
                prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-[#101828] dark:prose-strong:text-neutral-100
                prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-neutral-100 dark:prose-code:bg-neutral-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-blockquote:border-l-4 prose-blockquote:border-neutral-300 dark:prose-blockquote:border-neutral-600
                prose-blockquote:pl-4 prose-blockquote:italic
                prose-img:rounded-lg prose-img:shadow-md
                prose-pre:bg-neutral-900 dark:prose-pre:bg-neutral-800 prose-pre:text-neutral-100">
                <PortableText 
                  value={post.body}
                  components={{
                    types: {
                      image: ({ value }: any) => {
                        if (!value?.asset) return null;
                        const imageUrl = urlForImage(value)?.url();
                        if (!imageUrl) return null;
                        return (
                          <figure className="my-6 sm:my-8">
                            <img 
                              src={imageUrl} 
                              alt={value.alt || 'Post content image'}
                              className="w-full h-auto rounded-lg shadow-md"
                            />
                            {value.caption && (
                              <figcaption className="text-xs sm:text-sm text-center text-neutral-500 dark:text-neutral-400 mt-2">
                                {value.caption}
                              </figcaption>
                            )}
                          </figure>
                        );
                      },
                      code: ({ value }: any) => {
                        if (!value?.code) return null;
                        return (
                          <pre className="bg-neutral-900 dark:bg-neutral-800 text-neutral-100 p-4 rounded-lg overflow-x-auto my-4 sm:my-6">
                            <code className={`language-${value.language || 'javascript'}`}>
                              {value.code}
                            </code>
                          </pre>
                        );
                      },
                    },
                    marks: {
                      link: ({ children, value }: any) => {
                        const target = value?.blank ? '_blank' : undefined;
                        const rel = value?.blank ? 'noopener noreferrer' : undefined;
                        return (
                          <a href={value?.href} target={target} rel={rel} className="text-blue-600 dark:text-blue-400 hover:underline">
                            {children}
                          </a>
                        );
                      },
                      code: ({ children }: any) => {
                        return (
                          <code className="bg-neutral-100 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded text-sm font-mono">
                            {children}
                          </code>
                        );
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}

