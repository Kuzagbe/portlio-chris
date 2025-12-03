import React from "react";
import { FloatingNav } from "@/components/floating-nav";
import { Footer } from "@/components/footer";
import { Timeline } from "@/components/timeline";
import { SectionDivider } from "@/components/section-divider";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import { useSanityAbout } from "@/hooks/useSanityData";
import { urlForImage } from "@/sanity/lib/image";

export default function AboutPage() {
  const { data: about, loading, error } = useSanityAbout(null);
  
  // Use only Sanity data - no fallback
  const displayHeading = about?.heading || "About Me";
  const displayBio = about?.bio || "";
  const displayTravelPhotos = (about?.travelPhotos && Array.isArray(about.travelPhotos) && about.travelPhotos.length > 0) 
    ? about.travelPhotos.map((photo: any, index: number) => {
        // Generate className based on index if not provided
        const positions = [
          "absolute top-10 left-[20%] rotate-[-5deg]",
          "absolute top-40 left-[25%] rotate-[-7deg]",
          "absolute top-5 left-[40%] rotate-[8deg]",
          "absolute top-32 left-[55%] rotate-[10deg]",
          "absolute top-20 right-[35%] rotate-[2deg]",
          "absolute top-24 left-[45%] rotate-[-7deg]",
          "absolute top-8 left-[30%] rotate-[4deg]",
          "absolute top-60 left-[15%] rotate-[-3deg]",
          "absolute top-80 left-[60%] rotate-[6deg]",
          "absolute top-50 right-[25%] rotate-[-8deg]",
          "absolute top-120 left-[35%] rotate-[5deg]",
          "absolute top-200 left-[70%] rotate-[-6deg]",
        ];
        return {
          _key: photo._key || `photo-${index}`,
          id: index + 1,
          location: photo.location,
          image: photo.image,
          className: photo.className || positions[index % positions.length] || `absolute top-${index * 20} left-[${20 + index * 5}%]`
        };
      })
    : [];

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
          {/* About Me Heading */}
          <div className="px-4">
            <h1 className="text-[36px] font-bold leading-[40px] text-[#262626] dark:text-neutral-100">
              {displayHeading}
            </h1>
          </div>

          {/* Bio */}
          <div className="max-w-[512px] pt-4 px-4">
            <p className="text-base font-normal leading-6 text-[#737373] dark:text-neutral-400 whitespace-pre-line">
              {displayBio}
            </p>
          </div>

          <SectionDivider />

          {/* Travelling Section */}
          <div className="pt-10 pb-6 px-4">
            <div className="flex items-center gap-1.5 mb-6">
              <h2 className="text-base font-normal leading-6 text-[#262626] dark:text-neutral-100 flex flex-wrap gap-1.5">
                <span>Travelling</span>
                <span>is</span>
                <span>in</span>
                <span>my</span>
                <span>blood</span>
              </h2>
            </div>

            <div className="relative w-full min-h-[600px] h-[600px] overflow-clip">
              {loading ? (
                <div className="flex items-center justify-center h-full text-sm text-neutral-500 dark:text-neutral-400">
                  Loading travel photos...
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-full text-sm text-red-500 dark:text-red-400">
                  Error loading travel photos. Please try again later.
                </div>
              ) : displayTravelPhotos.length === 0 ? (
                <div className="flex items-center justify-center h-full text-sm text-neutral-500 dark:text-neutral-400">
                  No travel photos found. Add travel photos in your Sanity Studio.
                </div>
              ) : (
                <DraggableCardContainer className="relative flex min-h-full w-full items-center justify-center overflow-clip">
                  {displayTravelPhotos.map((photo: any) => (
                  <DraggableCardBody key={photo._key || photo.id} className={photo.className}>
                    <img
                      src={
                        photo.image 
                          ? (typeof photo.image === 'string' 
                              ? photo.image 
                              : urlForImage(photo.image)?.url() || '')
                          : ''
                      }
                      alt={photo.location}
                      width={184}
                      height={138}
                      className="pointer-events-none relative z-10 w-full h-[138px] object-cover rounded-md"
                    />
                    <h3 className="mt-3 text-center text-sm font-bold leading-5 text-[#404040] dark:text-neutral-300">
                      {photo.location}
                    </h3>
                  </DraggableCardBody>
                  ))}
                </DraggableCardContainer>
              )}
            </div>
          </div>

          <SectionDivider />

          {/* Timeline Section */}
          <Timeline />
        </div>

        <Footer />
      </div>
    </main>
  );
}

