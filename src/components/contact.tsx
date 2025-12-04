import React from "react";
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const headingWords = ["Get", "in", "touch"];
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');
  
  // Initialize EmailJS (same as Contact page)
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
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
        throw new Error('EmailJS is not configured. Please set up your EmailJS credentials in .env file.');
      }
      
      // Debug logging
      console.log('Sending email with:', {
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID,
        publicKey: EMAILJS_PUBLIC_KEY.substring(0, 5) + '...'
      });
      
      // Send email using EmailJS
      const templateParams = {
        from_name: email.split('@')[0] || 'Visitor', // Use email prefix as name
        from_email: email,
        message: message || 'Someone wants to get in touch!',
        to_email: 'kuzagbechristopher@gmail.com', // Your email address
      };
      
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );
      
      console.log('Email sent successfully:', response);
      
      setSubmitStatus('success');
      setEmail('');
      setMessage('');
      
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
        setErrorMessage('Email service not configured. Please check your EmailJS setup.');
      } else {
        setErrorMessage('Failed to send message. Please check your EmailJS configuration or try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  };
  
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  };

  return (
    <section 
      id="contact" 
      className="py-6 sm:py-8 md:py-10"
    >
      <div className="flex items-start gap-4 mb-6 sm:mb-8">
        <h2 className="text-sm sm:text-base font-normal leading-5 sm:leading-6 text-[#262626] dark:text-white">
          {headingWords.join(" ")}
        </h2>
      </div>

      <div className="max-w-lg mb-6 sm:mb-8">
        <p className="text-sm sm:text-base font-normal leading-5 sm:leading-6 text-[#737373] dark:text-neutral-400">
          I&apos;m currently looking for new opportunities. Whether you have a question or want to say hi, hit that button.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg w-full">
        <div className="relative">
          <input 
            type="email" 
            placeholder="Your email"
            value={email}
            onChange={handleEmailChange}
            required
            disabled={isSubmitting}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-24 sm:pr-32 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm text-neutral-800 dark:text-white placeholder:text-[rgba(64,64,64,0.5)] dark:placeholder:text-neutral-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button 
            type="submit"
            disabled={isSubmitting}
            className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 px-2 sm:px-4 py-1 sm:py-1.5 bg-neutral-100 dark:bg-neutral-800 text-xs sm:text-sm font-normal leading-4 sm:leading-5 text-[#404040] dark:text-neutral-200 rounded-md border border-neutral-200 dark:border-neutral-700 shadow-inner whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            <span className="hidden sm:inline">{isSubmitting ? 'Sending...' : 'Send Enquiry'}</span>
            <span className="sm:hidden">{isSubmitting ? '...' : 'Send'}</span>
          </button>
        </div>
        
        {/* Optional message field */}
        <textarea
          placeholder="Your message (optional)"
          value={message}
          onChange={handleMessageChange}
          disabled={isSubmitting}
          rows={3}
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm text-neutral-800 dark:text-white placeholder:text-[rgba(64,64,64,0.5)] dark:placeholder:text-neutral-500 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
        
        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="p-3 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <p className="text-sm text-green-700 dark:text-green-400">
              Message sent successfully! I&apos;ll get back to you soon.
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
      </form>
    </section>
  );
};
