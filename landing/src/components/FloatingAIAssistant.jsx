import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../utils/animations';

const FloatingAIAssistant = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleClick = () => {
    // TODO: Implement N8n workflow integration for AI chat
    console.log('AI Assistant clicked - will integrate with N8n workflow');
  };

  const assistantVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: -20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 1.2
      }
    },
    hover: {
      scale: 1.1,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const pulseVariants = {
    animate: {
      boxShadow: [
        "0 0 0 0 rgba(255, 215, 0, 0.6)",
        "0 0 0 20px rgba(255, 215, 0, 0)",
        "0 0 0 0 rgba(255, 215, 0, 0)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeOut"
      }
    }
  };

  const tooltipVariants = {
    hidden: {
      opacity: 0,
      x: 10,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <div className="fixed top-32 right-12 z-40">
      <motion.div
        className="relative"
        initial="hidden"
        animate="visible"
        variants={assistantVariants}
        whileHover="hover"
        whileTap="tap"
        onHoverStart={() => {
          setIsHovered(true);
          setShowTooltip(true);
        }}
        onHoverEnd={() => {
          setIsHovered(false);
          setShowTooltip(false);
        }}
        onClick={handleClick}
      >
        {/* Main AI Assistant Image */}
        <motion.div
          className="w-48 h-48 rounded-full overflow-hidden cursor-pointer border-4 border-blox-glass-border bg-blox-glass-white backdrop-blur-md shadow-lg"
          animate={prefersReducedMotion ? {} : pulseVariants.animate}
        >
          <img 
            src="/jimiHacksBloxBuddy.png" 
            alt="Jimi - AI Assistant" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Animated glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-full bg-blox-teal opacity-0 blur-md"
          animate={{
            opacity: isHovered ? 0.3 : 0,
            scale: isHovered ? 1.2 : 1
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Floating chat indicator */}
        <motion.div
          className="absolute -top-2 -right-2 w-8 h-8 bg-blox-teal rounded-full border-4 border-white"
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-blox-darkblue2 border border-blox-glass-border rounded-lg px-3 py-2 text-sm text-blox-text-primary whitespace-nowrap shadow-lg backdrop-blur-md"
              variants={tooltipVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <span>Ask me anything! 💬</span>
              
              {/* Tooltip arrow */}
              <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-blox-darkblue2" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle floating animation */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={prefersReducedMotion ? {} : {
            y: [0, -3, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};

export default FloatingAIAssistant;