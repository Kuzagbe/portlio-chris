import React from "react";
import { FloatingNav } from "@/components/floating-nav";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSanityContact } from "@/hooks/useSanityData";

export default function ContactPage() {
  const { data: contact, loading } = useSanityContact(null);
  
  // Use only Sanity data - no fallback
  const displayHeading = contact?.heading || "Contact Me";
  const displayDescription = contact?.description || "I'm open to freelancing offers. Reach out to me to inquire more about my work.";

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
          {/* Contact Me Heading */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-[36px] font-bold leading-tight sm:leading-[36px] md:leading-[40px] text-[#262626] dark:text-neutral-100">
              {displayHeading}
            </h1>
          </div>

          {/* Bio */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <p className="text-sm sm:text-base font-normal leading-6 sm:leading-7 text-[#737373] dark:text-neutral-400 max-w-2xl whitespace-pre-line">
              {displayDescription}
            </p>
          </div>

          <SectionDivider />

          {/* Contact Form */}
          <form className="w-full my-6 sm:my-8 md:my-10">
            <div className="mx-auto flex max-w-xl flex-col gap-6 sm:gap-7">
              {/* Full name */}
              <div className="flex flex-col gap-2.5 sm:gap-3">
                <Label htmlFor="name" className="text-base sm:text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Full name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Tyler Durden"
                />
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-2.5 sm:gap-3">
                <Label htmlFor="email" className="text-base sm:text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tyler@projectmayhem.com"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2.5 sm:gap-3">
                <Label htmlFor="message" className="text-base sm:text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="You're crazy good, never change."
                />
              </div>

              {/* Send message button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-md border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-6 sm:px-8 py-3 sm:py-2.5 text-base sm:text-sm font-medium text-neutral-700 dark:text-neutral-200 shadow-[0px_4px_8px_0px_var(--color-neutral-200)_inset] dark:shadow-[0px_4px_8px_0px_var(--color-neutral-700)_inset] transition-all hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:shadow-[0px_2px_4px_0px_var(--color-neutral-200)_inset] dark:hover:shadow-[0px_2px_4px_0px_var(--color-neutral-700)_inset] active:scale-[0.98]"
                >
                  Send message
                </button>
              </div>
            </div>
          </form>

          <SectionDivider />

          {/* Empty Section */}
          <div className="pt-8 sm:pt-10 md:pt-12 pb-6 sm:pb-8 md:pb-10 flex-1">
            {/* Empty section - ready for future content */}
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}

