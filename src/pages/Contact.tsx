import React from "react";
import { FloatingNav } from "@/components/floating-nav";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSanityContact } from "@/hooks/useSanityData";

export default function ContactPage() {
  const defaultContact = {
    heading: "Contact Me",
    description: "I'm open to freelancing offers. Reach out to me to inquire more about my work."
  };
  const { data: contact = defaultContact } = useSanityContact(defaultContact);
  
  const displayHeading = contact?.heading || defaultContact.heading;
  const displayDescription = contact?.description || defaultContact.description;

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
          {/* Contact Me Heading */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-[36px] font-bold leading-[40px] text-[#262626] dark:text-neutral-100">
              {displayHeading}
            </h1>
          </div>

          {/* Bio */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <p className="text-base font-normal leading-6 text-[#737373] dark:text-neutral-400 max-w-2xl whitespace-pre-line">
              {displayDescription}
            </p>
          </div>

          <SectionDivider />

          {/* Contact Form */}
          <form className="mx-auto my-6 border-y border-neutral-100 dark:border-neutral-800 px-4 py-12 shadow-[0px_-1px_4px_#F5F5F5_inset] dark:shadow-[0px_-1px_4px_rgba(255,255,255,0.05)_inset]">
            <div className="mx-auto flex max-w-lg flex-col gap-5">
              {/* Full name */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-sm font-medium tracking-tight text-neutral-600 dark:text-neutral-400">
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
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-sm font-medium tracking-tight text-neutral-600 dark:text-neutral-400">
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
              <div className="flex flex-col gap-2">
                <Label htmlFor="message" className="text-sm font-medium tracking-tight text-neutral-600 dark:text-neutral-400">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="You're crazy good, never change."
                />
              </div>

              {/* Send message button */}
              <button
                type="submit"
                className="rounded-md border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-4 py-1.5 text-sm text-neutral-700 dark:text-neutral-200 shadow-[0px_4px_8px_0px_var(--color-neutral-200)_inset] dark:shadow-[0px_4px_8px_0px_var(--color-neutral-700)_inset] transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700"
              >
                Send message
              </button>
            </div>
          </form>

          <SectionDivider />

          {/* Empty Section */}
          <div className="pt-8 sm:pt-10 md:pt-12 pb-6 sm:pb-8 md:pb-10 min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh]">
            {/* Empty section - ready for future content */}
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}

