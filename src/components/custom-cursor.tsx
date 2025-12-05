import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';

type CursorVariant = 'default' | 'project' | 'contact' | 'link';

export const CustomCursor = () => {
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for project links/cards
      const projectElement = target.closest('a[href*="/projects"]') || 
                            target.closest('[data-cursor="project"]') ||
                            (target.closest('a') && target.closest('a')?.getAttribute('href')?.startsWith('http') && !target.closest('a')?.getAttribute('href')?.includes('mailto:'));
      
      if (projectElement) {
        setCursorText('View');
        setCursorVariant('project');
        return;
      }
      
      // Check for contact buttons/links
      const contactElement = target.closest('[data-cursor="contact"]') ||
                            target.closest('form button[type="submit"]') ||
                            (target.tagName === 'BUTTON' && (target.textContent?.toLowerCase().includes('contact') || target.textContent?.toLowerCase().includes('send')));
      
      if (contactElement) {
        setCursorText('👋');
        setCursorVariant('contact');
        return;
      }
      
      // Check for regular links and buttons
      if (
        target.tagName === 'A' ||
        target.closest('a') ||
        target.tagName === 'BUTTON' ||
        target.closest('button')
      ) {
        setCursorText('');
        setCursorVariant('link');
        return;
      }
      
      // Default state
      setCursorText('');
      setCursorVariant('default');
    };

    // Initialize cursor position
    if (typeof window !== 'undefined') {
      setMousePosition({ 
        x: window.innerWidth / 2, 
        y: window.innerHeight / 2 
      });
    }

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver, true);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver, true);
    };
  }, []);

  // Cursor variants - matching the example pattern
  const variants = {
    default: {
      opacity: 1,
      height: 10,
      width: 10,
      fontSize: '16px',
      backgroundColor: '#1e91d6',
      x: mousePosition.x,
      y: mousePosition.y,
      transition: {
        type: 'spring',
        mass: 0.6,
      },
    },
    project: {
      opacity: 1,
      backgroundColor: '#fff',
      color: '#000',
      height: 80,
      width: 80,
      fontSize: '18px',
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 28,
      },
    },
    contact: {
      opacity: 1,
      backgroundColor: '#FFBCBC',
      color: '#000',
      height: 64,
      width: 64,
      fontSize: '32px',
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 28,
      },
    },
    link: {
      opacity: 1,
      backgroundColor: '#1e91d6',
      height: 20,
      width: 20,
      fontSize: '16px',
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 28,
      },
    },
  };

  const spring = {
    type: 'spring',
    stiffness: 500,
    damping: 28,
  };

  if (!isMounted) return null;

  return (
    <>
      {/* Hide default cursor only on desktop */}
      <style>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
      
      <div ref={containerRef}>
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center font-medium"
          variants={variants}
          animate={cursorVariant}
          transition={spring}
          style={{
            mixBlendMode: cursorVariant === 'default' || cursorVariant === 'link' ? 'difference' : 'normal',
          }}
        >
          {cursorText && (
            <span className="cursorText text-center leading-none">
              {cursorText}
            </span>
          )}
        </motion.div>
      </div>
    </>
  );
};
