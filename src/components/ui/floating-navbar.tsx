import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

export const FloatingNav = ({
  navItems,
  className,
  showThemeToggle = true,
  profileImage,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactElement;
  }[];
  className?: string;
  showThemeToggle?: boolean;
  profileImage?: string | null;
}) => {
  const { scrollYProgress } = useScroll();
  const { theme, resolvedTheme } = useTheme();
  const normalNavRef = useRef<HTMLDivElement>(null);
  const [profileLeft, setProfileLeft] = useState(0);
  const [contactRight, setContactRight] = useState(0);
  const [normalNavTop, setNormalNavTop] = useState(0);
  const [normalNavLeft, setNormalNavLeft] = useState(0);
  const [normalNavWidth, setNormalNavWidth] = useState(0);

  const [visible, setVisible] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  const isDark = resolvedTheme === 'dark' || theme === 'dark';

  // Transform scroll progress to border radius (0px to 9999px)
  // Start animating from 0 (when at top) to 0.15 (fully rounded)
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.15],
    [0, 9999],
    { clamp: true }
  );

  // Ensure navbar is visible on initial load
  useEffect(() => {
    setIsAtTop(true);
    setVisible(false);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 10;
    
    const updatePosition = () => {
      if (normalNavRef.current) {
        const nav = normalNavRef.current;
        const navRect = nav.getBoundingClientRect();
        
        // Always update normal nav position for seamless transition
        setNormalNavTop(navRect.top);
        setNormalNavLeft(navRect.left);
        setNormalNavWidth(navRect.width);
        
        // Always calculate profile and contact positions (not just when at top)
        const profileElement = nav.querySelector('img[alt="Profile"]') as HTMLElement;
        const contactLink = Array.from(nav.querySelectorAll('a')).find(
          (link) => link.textContent?.trim() === 'Contact'
        ) as HTMLElement;
        
        if (profileElement && contactLink) {
          const profileRect = profileElement.getBoundingClientRect();
          const contactRect = contactLink.getBoundingClientRect();
          setProfileLeft(profileRect.left);
          setContactRight(window.innerWidth - contactRect.right);
          retryCount = 0; // Reset retry count on success
        } else {
          // Retry if elements aren't found (they might still be loading)
          if (retryCount < maxRetries) {
            retryCount++;
            setTimeout(updatePosition, 100 * retryCount); // Exponential backoff
          } else {
            // Fallback: use nav position if elements not found
            setProfileLeft(navRect.left + 16); // Default padding
            setContactRight(window.innerWidth - navRect.right + 16); // Default padding
          }
        }
      }
    };

    // Use requestAnimationFrame for smooth updates
    const rafUpdate = () => {
      requestAnimationFrame(updatePosition);
    };

    // Initial update with retry mechanism
    updatePosition();
    
    // Also try after a short delay to catch async-loaded elements
    const delayedUpdate = setTimeout(() => {
      updatePosition();
    }, 200);
    
    window.addEventListener('resize', rafUpdate);
    window.addEventListener('scroll', rafUpdate, { passive: true });
    
    return () => {
      clearTimeout(delayedUpdate);
      window.removeEventListener('resize', rafUpdate);
      window.removeEventListener('scroll', rafUpdate);
    };
  }, [profileImage]); // Re-run when profileImage changes

  // Direct scroll listener for immediate detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      if (scrollTop < 10) {
        setVisible(false);
        setIsAtTop(true);
      } else {
        // Immediately update state without delay
        setIsAtTop(false);
        setVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const scrollPosition = scrollYProgress.get();
      
      // Show floating nav immediately when any scroll happens (threshold: 0.001)
      if (scrollPosition < 0.001) {
        setVisible(false);
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
        // Show floating nav immediately when scrolling starts
        setVisible(true);
      }
    }
  });

  // Shared nav content component
  const NavContent = ({ isFloating = false }: { isFloating?: boolean }) => (
    <>
      <div className="flex items-center">
        {profileImage && (
          <Link to="/">
            <img
              src={profileImage}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
            />
          </Link>
        )}
      </div>
      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
        {showThemeToggle && (
          <div className="p-1 sm:p-2">
            <ThemeToggle />
          </div>
        )}
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            to={navItem.link}
            className={cn(
              "px-1.5 sm:px-2 py-1 text-xs sm:text-sm font-normal leading-4 sm:leading-5 text-black dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors whitespace-nowrap"
            )}
          >
            <span className="hidden sm:inline">{navItem.name}</span>
            <span className="sm:hidden">{navItem.icon}</span>
          </Link>
        ))}
      </div>
    </>
  );

  return (
    <>
      {/* Normal nav bar - smoothly transforms with increasing border radius as you scroll */}
      <motion.div
        ref={normalNavRef}
        layout
        initial={true}
        animate={{
          opacity: isAtTop ? 1 : 0,
          scale: isAtTop ? 1 : 0.95,
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
        className={cn(
          "flex w-full px-4 sm:px-6 md:px-9 py-2 items-center justify-between dark:bg-[#171717] bg-white relative z-50",
          className
        )}
        style={{
          pointerEvents: isAtTop ? "auto" : "none",
          borderRadius: borderRadius,
        }}
      >
        <NavContent />
      </motion.div>

      {/* Floating nav bar - continues border radius animation from normal nav */}
      {visible && !isAtTop && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.98,
          }}
          transition={{
            duration: 0.2,
            ease: [0.4, 0, 0.2, 1],
          }}
          className={cn(
            "flex fixed px-4 sm:px-6 md:px-9 py-2 items-center justify-between backdrop-blur-md border shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] pointer-events-auto",
            isDark 
              ? "border-white/20" 
              : "border-neutral-200/20"
          )}
          style={{ 
            backgroundColor: isDark 
              ? 'rgba(23, 23, 23, 0.6)' 
              : 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(12px) saturate(180%)',
            WebkitBackdropFilter: 'blur(12px) saturate(180%)',
            borderRadius: borderRadius,
            top: isMobile ? 16 : 24,
            left: isMobile ? 8 : (profileLeft > 0 ? Math.max(8, profileLeft - 30) : Math.max(8, normalNavLeft + 16)),
            right: isMobile ? '8px' : (contactRight > 0 ? `${Math.max(8, contactRight - 30)}px` : `${Math.max(8, window.innerWidth - normalNavLeft - normalNavWidth + 16)}px`),
            zIndex: 999999,
          }}
        >
          <NavContent isFloating={true} />
        </motion.div>
      )}
    </>
  );
};

