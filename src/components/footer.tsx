import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <div className="w-full dark:bg-[#171717] bg-white border-t border-neutral-100 dark:border-neutral-800 px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
      <p className="text-xs font-normal leading-4 text-[#737373] dark:text-neutral-400 text-center sm:text-left">
        Built with love by Manu Arora
      </p>
      <div className="flex gap-3 sm:gap-4">
        <a href="#" className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors" aria-label="Twitter">
          <Twitter size={16} />
        </a>
        <a href="#" className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors" aria-label="LinkedIn">
          <Linkedin size={16} />
        </a>
        <a href="#" className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors" aria-label="GitHub">
          <Github size={16} />
        </a>
      </div>
    </div>
  );
};

