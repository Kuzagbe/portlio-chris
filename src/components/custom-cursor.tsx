import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

type CursorVariant = 'default' | 'project' | 'contact' | 'link';

export const CustomCursor = () => {
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [isMounted, setIsMounted] = useState(false);

  // Motion values for cursor position
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Spring physics for smooth cursor movement
  const springConfig = { damping: 28, stiffness: 500, mass: 0.6 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsMounted(true);
    
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
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
      cursorX.set(window.innerWidth / 2);
      cursorY.set(window.innerHeight / 2);
    }

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver, true);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver, true);
    };
  }, [cursorX, cursorY]);

  // Cursor variants
  const variants = {
    default: {
      opacity: 1,
      height: 10,
      width: 10,
      fontSize: '16px',
      backgroundColor: '#1e91d6',
      x: 0,
      y: 0,
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
      x: -32,
      y: -32,
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
      x: -32,
      y: -32,
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
      x: -10,
      y: -10,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 28,
      },
    },
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
      
      {/* Custom cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          x: springX,
          y: springY,
        }}
      >
        <motion.div
          className="rounded-full flex items-center justify-center font-medium"
          variants={variants}
          animate={cursorVariant}
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
      </motion.div>
    </>
  );
};
