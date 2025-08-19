import React from 'react';
import { motion } from 'framer-motion';
import { scaleIn, fadeInUp, staggerContainer, useReducedMotion } from '../utils/animations';

const CTASection = () => {
  const prefersReducedMotion = useReducedMotion();

  const buttonVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    tap: { scale: 0.95 }
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        "0 0 20px rgba(236, 72, 153, 0.3)",
        "0 0 40px rgba(236, 72, 153, 0.6)",
        "0 0 20px rgba(236, 72, 153, 0.3)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section 
      id="ready"
      className="py-24 w-full bg-purple-gradient relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated background pattern */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        animate={prefersReducedMotion ? {} : {
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Centered content area */}
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Headline container */}
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-blox-text-primary"
            variants={scaleIn}
          >
            Ready to Start Your{' '}
            <motion.span
              className="inline-block"
              animate={prefersReducedMotion ? {} : {
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Game Dev
            </motion.span>{' '}
            Journey?
          </motion.h2>
          
          {/* Subtext container */}
          <motion.p 
            className="text-xl md:text-2xl mb-12 text-blox-text-secondary"
            variants={fadeInUp}
          >
            Join thousands of young developers learning to create amazing Roblox games.
            Start your free learning journey today!
          </motion.p>
          
          {/* Two animated buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={staggerContainer}
          >
            <motion.button 
              className="px-8 py-4 rounded-lg font-semibold bg-teal-gradient text-blox-text-primary relative overflow-hidden shadow-lg shadow-blox-teal/30"
              variants={buttonVariants}
              custom={0}
              whileHover="hover"
              whileTap="tap"
              animate={prefersReducedMotion ? {} : glowVariants.animate}
            >
              {/* Button background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blox-teal to-blox-teal opacity-0"
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Start Learning Now</span>
              
              {/* Animated underline */}
              <motion.div
                className="absolute bottom-2 left-1/2 w-0 h-0.5 bg-blox-teal"
                whileHover={{ 
                  width: "80%", 
                  x: "-50%" 
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
            
            <motion.button 
              className="px-8 py-4 rounded-lg font-semibold backdrop-blur border-2 border-blox-teal text-blox-teal relative overflow-hidden group hover:bg-blox-teal hover:text-blox-darkblue"
              variants={buttonVariants}
              custom={1}
              whileHover="hover"
              whileTap="tap"
            >
              {/* Hover background effect */}
              <motion.div
                className="absolute inset-0 bg-blox-teal opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="relative z-10 group-hover:text-blox-darkblue transition-colors duration-300"
              >
                Join Discord Community
              </motion.span>
              
              {/* Animated border effect */}
              <motion.div
                className="absolute inset-0 border-2 border-blox-teal opacity-0"
                whileHover={{ opacity: 1 }}
                animate={prefersReducedMotion ? {} : {
                  borderRadius: ["8px", "16px", "8px"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.button>
          </motion.div>

          {/* Floating CTA elements */}
          <motion.div 
            className="flex justify-center items-center mt-8 space-x-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.div
              className="text-blox-text-secondary text-sm"
              animate={prefersReducedMotion ? {} : {
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              100% Free Forever
            </motion.div>
            <motion.div 
              className="w-2 h-2 bg-blox-text-primary rounded-full"
              animate={prefersReducedMotion ? {} : {
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="text-blox-text-secondary text-sm"
              animate={prefersReducedMotion ? {} : {
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              No Credit Card Required
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative floating elements */}
      <motion.div
        className="absolute top-16 left-16 w-8 h-8 bg-blox-text-primary/20 rounded-full"
        animate={prefersReducedMotion ? {} : {
          y: [0, -20, 0],
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-20 w-6 h-6 bg-blox-text-primary/30 rounded-full"
        animate={prefersReducedMotion ? {} : {
          y: [0, 15, 0],
          x: [0, -10, 0],
          scale: [1, 0.8, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </motion.section>
  );
};

export default CTASection;