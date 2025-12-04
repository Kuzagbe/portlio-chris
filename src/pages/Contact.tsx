import React from "react";
import { FloatingNav } from "@/components/floating-nav";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSanityContact } from "@/hooks/useSanityData";
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const { data: contact, loading } = useSanityContact(null);
  
  // Use only Sanity data - no fallback
  const displayHeading = contact?.heading || "Contact Me";
  const displayDescription = contact?.description || "I'm open to freelancing offers. Reach out to me to inquire more about my work.";
  
  // Form state
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');
  
  // Initialize EmailJS (you'll need to set these in your .env file)
  // Get these from https://www.emailjs.com/
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
  
  React.useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) {
      try {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.log('EmailJS initialized with Public Key:', EMAILJS_PUBLIC_KEY.substring(0, 5) + '...');
      } catch (error) {
        console.error('Error initializing EmailJS:', error);
      }
    } else {
      console.warn('EmailJS Public Key not found in environment variables');
    }
  }, [EMAILJS_PUBLIC_KEY]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Reset status when user starts typing
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Please fill in all fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    try {
      // Check if EmailJS is configured
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        throw new Error('EmailJS is not configured. Please set up your EmailJS credentials.');
      }
      
      // Debug logging
      console.log('Sending email with:', {
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID,
        publicKey: EMAILJS_PUBLIC_KEY.substring(0, 5) + '...'
      });
      
      // Send email using EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'kuzagbechristopher@gmail.com', // Your email address
      };
      
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );
      
      console.log('Email sent successfully:', response);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
      
    } catch (error: any) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      
      // More specific error messages
      if (error.text) {
        setErrorMessage(error.text);
      } else if (error.message) {
        setErrorMessage(error.message);
      } else if (error.status === 400 || error.text?.includes('Account not found')) {
        setErrorMessage('EmailJS account not found. Please verify your Public Key, Service ID, and Template ID in the .env file. Make sure they match your EmailJS dashboard.');
      } else if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        setErrorMessage('Email service not configured. Please check your EmailJS setup. See EMAILJS_SETUP.md for instructions.');
      } else {
        setErrorMessage('Failed to send message. Please check your EmailJS configuration or try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <form onSubmit={handleSubmit} className="w-full my-6 sm:my-8 md:my-10">
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
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
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
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
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
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-3 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-700 dark:text-green-400">
                    Message sent successfully! I'll get back to you soon.
                  </p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <p className="text-sm text-red-700 dark:text-red-400">
                    {errorMessage || 'Failed to send message. Please try again.'}
                  </p>
                </div>
              )}

              {/* Send message button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto rounded-md border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-6 sm:px-8 py-3 sm:py-2.5 text-base sm:text-sm font-medium text-neutral-700 dark:text-neutral-200 shadow-[0px_4px_8px_0px_var(--color-neutral-200)_inset] dark:shadow-[0px_4px_8px_0px_var(--color-neutral-700)_inset] transition-all hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:shadow-[0px_2px_4px_0px_var(--color-neutral-200)_inset] dark:hover:shadow-[0px_2px_4px_0px_var(--color-neutral-700)_inset] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send message'}
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

