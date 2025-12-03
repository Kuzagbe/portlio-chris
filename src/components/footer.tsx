import React from "react";
import { Github, Linkedin, Instagram } from "lucide-react";
import { useSanityContact } from "@/hooks/useSanityData";

export const Footer = () => {
  const { data: contact } = useSanityContact(null);
  
  const socialLinks = contact?.socialLinks || {};
  const instagramUrl = socialLinks?.instagram || null;
  const linkedinUrl = socialLinks?.linkedin || null;
  const githubUrl = socialLinks?.github || null;

  return (
    <div className="w-full dark:bg-[#171717] bg-white border-t border-neutral-100 dark:border-neutral-800 px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
      <p className="text-xs font-normal leading-4 text-[#737373] dark:text-neutral-400 text-center sm:text-left">
        Built with love by CCK
      </p>
      <div className="flex gap-3 sm:gap-4">
        {instagramUrl && (
          <a 
            href={instagramUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors" 
            aria-label="Instagram"
          >
            <Instagram size={16} />
          </a>
        )}
        {linkedinUrl && (
          <a 
            href={linkedinUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors" 
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
        )}
        {githubUrl && (
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors" 
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
        )}
      </div>
    </div>
  );
};

