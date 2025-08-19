import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { scaleIn, fadeInUp, staggerContainer, floatingAnimation, useReducedMotion, smoothScrollTo } from '../utils/animations';
import AnimatedCTAButton from './AnimatedCTAButton';

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const prefersReducedMotion = useReducedMotion();

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateY: -15
    },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        delay: index * 0.15,
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      scale: 1.05,
      rotateY: 5,
      z: 50,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8 + index * 0.1,
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0 0 30px rgba(236, 72, 153, 0.6)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.section 
      id="hero"
      className="min-h-screen flex flex-col justify-start pt-12 md:pt-16 relative overflow-hidden"
      style={prefersReducedMotion ? {} : { y }}
    >
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/BuildersRoundTable.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"
        animate={prefersReducedMotion ? {} : {
          opacity: [0.6, 0.4, 0.6]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 mt-20 md:mt-32">
        {/* Headline and subheadline container */}
        <motion.div 
          className="text-center mb-8 relative z-10"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 text-blox-text-primary"
            variants={scaleIn}
          >
            Welcome to{' '}
            <motion.span 
              className="relative inline-block"
              animate={prefersReducedMotion ? {} : {
                ...floatingAnimation,
                scale: [1, 1.02, 1],
                filter: [
                  "drop-shadow(0 0 10px rgba(20, 184, 166, 0.6))",
                  "drop-shadow(0 0 20px rgba(251, 191, 36, 0.8))",
                  "drop-shadow(0 0 10px rgba(20, 184, 166, 0.6))"
                ]
              }}
              transition={{
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                filter: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                ...floatingAnimation.transition
              }}
              style={{
                background: prefersReducedMotion ? 
                  "linear-gradient(45deg, #14b8a6, #fbbf24)" :
                  "linear-gradient(45deg, #14b8a6 0%, #fbbf24 50%, #14b8a6 100%)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: prefersReducedMotion ? "none" : "gradient-shift 5s ease-in-out infinite"
              }}
            >
              Blox Buddy
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl mb-12 text-blox-text-secondary"
            variants={fadeInUp}
          >
            Your journey to becoming a Roblox game developer starts here!
          </motion.p>
          
          {/* CTA buttons with stagger animation */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={staggerContainer}
          >
            <motion.div
              variants={buttonVariants}
              custom={0}
            >
              <AnimatedCTAButton
                onClick={() => smoothScrollTo('ready')}
                text="Get Started"
                size="large"
              />
            </motion.div>
            
            <motion.button 
              className="px-8 py-4 rounded-lg font-semibold bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black shadow-lg shadow-amber-500/30"
              onClick={() => smoothScrollTo('whatisbloxbuddy')}
              variants={buttonVariants}
              custom={1}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(245, 158, 11, 0.6)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </div>


      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-4 h-4 bg-blox-teal rounded-full opacity-60"
        animate={prefersReducedMotion ? {} : {
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-32 right-16 w-6 h-6 bg-blox-success rounded-full opacity-40"
        animate={prefersReducedMotion ? {} : {
          y: [0, 15, 0],
          x: [0, -15, 0],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.section>
  );
};

export default Hero;