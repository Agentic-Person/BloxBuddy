import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useAnimations';

const AnimatedCTAButton = ({ 
  onClick, 
  text = "Get Started",
  className = "",
  size = "large", // "small" | "large"
  variant = "primary" // "primary" | "secondary"
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  const sparklePositions = [
    { top: '-12px', left: '-12px', animationDelay: '0s' },
    { top: '-12px', right: '-12px', animationDelay: '0.3s' },
    { bottom: '-12px', left: '-12px', animationDelay: '0.6s' },
    { bottom: '-12px', right: '-12px', animationDelay: '0.9s' },
    { top: '50%', left: '-16px', transform: 'translateY(-50%)', animationDelay: '1.2s' },
    { top: '50%', right: '-16px', transform: 'translateY(-50%)', animationDelay: '1.5s' },
    { top: '-16px', left: '50%', transform: 'translateX(-50%)', animationDelay: '0.2s' },
    { bottom: '-16px', left: '50%', transform: 'translateX(-50%)', animationDelay: '0.8s' },
    { top: '-8px', left: '0', animationDelay: '1.1s' },
    { bottom: '-8px', right: '0', animationDelay: '1.4s' }
  ];

  const sizeClasses = {
    small: "px-6 py-2 text-lg",
    large: "px-8 py-4 text-lg md:text-xl"
  };

  const sparkleContainerSize = {
    small: "w-5 h-5",
    large: "w-6 h-6"
  };

  const variantClasses = {
    primary: "bg-gradient-to-br from-[#1a1a3a] to-[#2d2d5a] text-yellow-400",
    secondary: "bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-black"
  };

  return (
    <motion.div 
      className={`relative inline-block group ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Animated gradient border background */}
      <div 
        className={`absolute -inset-[2px] rounded-[14px] opacity-75 blur-[0.5px] group-hover:opacity-100 transition-opacity ${
          prefersReducedMotion ? '' : 'animate-shimmer'
        }`}
        style={{
          background: variant === 'primary' 
            ? 'linear-gradient(45deg, #FFD700, #4A69BD, #7B68EE, #6A5ACD, #FFC107, #FF8C00, #FFD700)'
            : 'linear-gradient(45deg, #F59E0B, #EF4444, #EC4899, #8B5CF6, #3B82F6, #10B981, #F59E0B)',
          backgroundSize: '400% 400%',
        }}
      />
      
      {/* Main button */}
      <motion.button
        onClick={onClick}
        className={`relative ${sizeClasses[size]} ${variantClasses[variant]} font-semibold rounded-xl cursor-pointer inline-flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-400/30`}
        whileHover={{ 
          boxShadow: variant === 'primary' 
            ? "0 10px 25px rgba(255, 215, 0, 0.4)"
            : "0 10px 25px rgba(245, 158, 11, 0.4)"
        }}
      >
        <div className={`relative ${sparkleContainerSize[size]} flex items-center justify-center`}>
          {!prefersReducedMotion && sparklePositions.map((pos, i) => (
            <span
              key={i}
              className="absolute text-yellow-400 text-xs pointer-events-none animate-sparkle"
              style={{
                ...pos,
                fontSize: '10px',
                animationDelay: pos.animationDelay
              }}
            >
              {i % 2 === 0 ? '✨' : '⭐'}
            </span>
          ))}
          {/* Static sparkle for reduced motion */}
          {prefersReducedMotion && (
            <span className="text-yellow-400 text-xs">✨</span>
          )}
        </div>
        {text}
      </motion.button>
    </motion.div>
  );
};

export default AnimatedCTAButton;