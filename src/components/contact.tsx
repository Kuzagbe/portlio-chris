import React from "react";

export const Contact = () => {
  const headingWords = ["Get", "in", "touch"];
  const [email, setEmail] = React.useState("");

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

      <div className="flex flex-col gap-4 max-w-lg w-full">
        <div className="relative">
          <input 
            type="email" 
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-24 sm:pr-32 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm text-neutral-800 dark:text-white placeholder:text-[rgba(64,64,64,0.5)] dark:placeholder:text-neutral-500"
          />
          <button 
            type="button" 
            className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 px-2 sm:px-4 py-1 sm:py-1.5 bg-neutral-100 dark:bg-neutral-800 text-xs sm:text-sm font-normal leading-4 sm:leading-5 text-[#404040] dark:text-neutral-200 rounded-md border border-neutral-200 dark:border-neutral-700 shadow-inner whitespace-nowrap"
          >
            <span className="hidden sm:inline">Send Enquiry</span>
            <span className="sm:hidden">Send</span>
          </button>
        </div>
      </div>
    </section>
  );
};
