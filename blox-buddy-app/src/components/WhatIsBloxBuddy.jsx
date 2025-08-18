import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '../utils/animations';

const WhatIsBloxBuddy = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const prefersReducedMotion = useReducedMotion();

  const educationalCards = [
    {
      title: "Learn at Your Own Pace",
      description: "Self-paced learning that fits your schedule",
      image: "blocks_buddy_1_learn_at_your_pace.webp",
      borderColor: "border-blox-teal"
    },
    {
      title: "Curated YouTube Learning",
      description: "Hand-picked tutorials from the best creators",
      image: "blocks_buddy_2_curated_youtube.png",
      borderColor: "border-purple-500"
    },
    {
      title: "Perfect for Parents & Homeschoolers",
      description: "Structured curriculum with clear learning objectives",
      image: "blocks_buddy_3_parents_homeschoolers.png",
      borderColor: "border-blox-teal"
    },
    {
      title: "Master Essential Skills",
      description: "From basic building to advanced scripting",
      image: "blocks_buddy_4_master_skills.png",
      borderColor: "border-purple-500"
    },
    {
      title: "Build Real Games",
      description: "Create and publish your own Roblox games",
      image: "blocks_buddy_5_build_real_games.png",
      borderColor: "border-blox-teal"
    },
    {
      title: "Teams",
      description: "Collaborate with other group members to build and form your own teams",
      image: "blocks_buddy_6_build_team.png",
      borderColor: "border-purple-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 0.2
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.section 
      id="whatisbloxbuddy"
      className="py-16"
      style={prefersReducedMotion ? {} : { y: y * 0.5 }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section title with fade in animation */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <motion.h2 
            className="text-4xl font-bold mb-4 text-blox-text-primary"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            What is{' '}
            <motion.span 
              className="text-blox-teal"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Blox Buddy
            </motion.span>
            ?
          </motion.h2>
          <motion.p 
            className="text-lg text-blox-text-secondary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Your complete learning platform for Roblox game development
          </motion.p>
        </motion.div>

        {/* Educational cards with alternating animations */}
        <motion.div 
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {educationalCards.map((card, index) => {
            const isOdd = index % 2 === 0;
            const gradientClass = index % 2 === 0 ? 'bg-teal-gradient' : 'bg-purple-gradient';
            
            return (
              <motion.div 
                key={index}
                className={`flex ${isOdd ? 'flex-row' : 'flex-row-reverse'} items-center`}
                variants={cardVariants}
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                initial="hidden"
              >
                {/* Image area - 40% with parallax effect */}
                <motion.div 
                  className="w-2/5 flex justify-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <motion.div 
                    className={`w-full aspect-video rounded-lg overflow-hidden shadow-lg cursor-pointer border-2 ${card.borderColor} border-opacity-60`}
                    variants={imageVariants}
                    whileHover="hover"
                    style={{ willChange: 'transform' }}
                  >
                    <img 
                      src={`/${card.image}`}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </motion.div>
                
                {/* Center padding area - 20% */}
                <div className="w-1/5">
                  {/* Empty space for centrifugal separation */}
                </div>
                
                {/* Content area - 40% */}
                <motion.div 
                  className="w-2/5 bg-blox-darkblue2/50 backdrop-blur border border-blox-glass-border rounded-lg p-6 cursor-pointer"
                  variants={contentVariants}
                  whileHover="hover"
                  style={{ willChange: 'transform' }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <motion.h3 
                    className="text-2xl font-bold mb-4 text-blox-teal"
                    initial={{ opacity: 0, x: isOdd ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p 
                    className="text-lg text-blox-text-muted"
                    initial={{ opacity: 0, x: isOdd ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {card.description}
                  </motion.p>

                  {/* Animated accent line */}
                  <motion.div
                    className="mt-4 h-1 bg-gradient-to-r from-blox-teal to-blox-success rounded-full"
                    initial={{ scaleX: 0, originX: isOdd ? 0 : 1 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-1/2 left-8 w-3 h-3 bg-blox-teal rounded-full opacity-50"
          animate={prefersReducedMotion ? {} : {
            y: [0, -15, 0],
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-12 w-5 h-5 bg-blox-success/60 rounded-full"
          animate={prefersReducedMotion ? {} : {
            y: [0, 20, 0],
            x: [0, -10, 0],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.section>
  );
};

export default WhatIsBloxBuddy;