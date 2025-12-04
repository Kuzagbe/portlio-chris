import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface ShapeProps {
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  shape: "blob" | "star" | "circle" | "triangle" | "diamond";
}

const AbstractShape = ({ x, y, size, color, delay, shape }: ShapeProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = React.useState(false);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(mouseX, springConfig);
  const ySpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [17.5, -17.5]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-17.5, 17.5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const renderShape = () => {
    const baseStyle = {
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
    };

    switch (shape) {
      case "blob":
        return (
          <motion.div
            style={{
              ...baseStyle,
              borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
              opacity: 0.8,
              filter: "blur(0.5px)",
            }}
            animate={{
              borderRadius: [
                "30% 70% 70% 30% / 30% 30% 70% 70%",
                "70% 30% 30% 70% / 70% 70% 30% 30%",
                "30% 70% 70% 30% / 30% 30% 70% 70%",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          />
        );
      case "star":
        return (
          <motion.svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            style={{ overflow: "visible" }}
          >
            <motion.polygon
              points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
              fill={color}
              opacity={0.9}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                delay,
              }}
            />
          </motion.svg>
        );
      case "circle":
        return (
          <motion.div
            style={{
              ...baseStyle,
              borderRadius: "50%",
              opacity: 0.75,
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          />
        );
      case "triangle":
        return (
          <motion.svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            style={{ overflow: "visible" }}
          >
            <motion.polygon
              points="50,10 90,90 10,90"
              fill={color}
              opacity={0.85}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
                delay,
              }}
            />
          </motion.svg>
        );
      case "diamond":
        return (
          <motion.div
            style={{
              ...baseStyle,
              transform: "rotate(45deg)",
              opacity: 0.8,
            }}
            animate={{
              rotate: [45, 405],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              delay,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
        pointerEvents: "auto",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      whileHover={{
        scale: 1.3,
        zIndex: 10,
      }}
      animate={{
        y: isHovered ? [0, -10, 0] : [0, -5, 0],
      }}
      transition={{
        y: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
    >
      {renderShape()}
    </motion.div>
  );
};

export const AbstractDesign = () => {
  const allShapes: Array<{
    x: number;
    y: number;
    size: number;
    color: string;
    delay: number;
    shape: "blob" | "star" | "circle" | "triangle" | "diamond";
  }> = [
    // Blobs
    { x: 10, y: 20, size: 60, color: "#3B82F6", delay: 0, shape: "blob" },
    { x: 80, y: 30, size: 80, color: "#8B5CF6", delay: 0.5, shape: "blob" },
    { x: 20, y: 70, size: 50, color: "#EC4899", delay: 1, shape: "blob" },
    { x: 75, y: 60, size: 70, color: "#F59E0B", delay: 1.5, shape: "blob" },
    
    // Stars
    { x: 15, y: 45, size: 40, color: "#10B981", delay: 0.2, shape: "star" },
    { x: 85, y: 15, size: 35, color: "#EF4444", delay: 0.7, shape: "star" },
    { x: 50, y: 50, size: 45, color: "#06B6D4", delay: 1.2, shape: "star" },
    { x: 70, y: 80, size: 30, color: "#F97316", delay: 1.7, shape: "star" },
    
    // Circles
    { x: 5, y: 10, size: 25, color: "#A855F7", delay: 0.3, shape: "circle" },
    { x: 90, y: 50, size: 30, color: "#14B8A6", delay: 0.8, shape: "circle" },
    { x: 30, y: 85, size: 35, color: "#F43F5E", delay: 1.3, shape: "circle" },
    { x: 60, y: 10, size: 28, color: "#EAB308", delay: 1.8, shape: "circle" },
    
    // Triangles
    { x: 40, y: 25, size: 40, color: "#6366F1", delay: 0.4, shape: "triangle" },
    { x: 25, y: 55, size: 35, color: "#22C55E", delay: 0.9, shape: "triangle" },
    { x: 65, y: 40, size: 38, color: "#F59E0B", delay: 1.4, shape: "triangle" },
    
    // Diamonds
    { x: 45, y: 75, size: 32, color: "#EC4899", delay: 0.6, shape: "diamond" },
    { x: 95, y: 70, size: 28, color: "#3B82F6", delay: 1.1, shape: "diamond" },
    { x: 8, y: 60, size: 30, color: "#10B981", delay: 1.6, shape: "diamond" },
  ];

  // Filter to only show shapes on the right side (x > 50)
  const shapes = allShapes.filter(shape => shape.x > 50);

  return (
    <div 
      className="absolute left-0 right-0 h-64 sm:h-80 md:h-96 overflow-visible pointer-events-none z-0" 
      style={{ 
        perspective: "1000px",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
        {shapes.map((shape, index) => (
          <AbstractShape key={index} {...shape} />
        ))}
      </div>
    </div>
  );
};

