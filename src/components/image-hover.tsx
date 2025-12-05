import React from 'react';
import { motion } from 'motion/react';

interface ImageHoverProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export const ImageHover: React.FC<ImageHoverProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
}) => {
  return (
    <motion.div
      className={`relative overflow-hidden group ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{
        duration: 0.3,
        ease: [0.87, 0, 0.13, 1],
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      {/* Gold/Black gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

