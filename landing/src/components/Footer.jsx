import React from 'react';
import { motion } from 'framer-motion';
import { FaDiscord, FaYoutube, FaTwitter, FaGamepad } from 'react-icons/fa';
import { staggerContainer, useReducedMotion } from '../utils/animations';

const Footer = () => {
  const prefersReducedMotion = useReducedMotion();

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const socialIconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }
    }),
    hover: {
      scale: 1.2,
      y: -3,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      borderColor: "#06B6D4",
      boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.footer 
      className="py-12 bg-blox-blackblue backdrop-blur border-t border-blox-glass-border relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      {/* Animated background pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        animate={prefersReducedMotion ? {} : {
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        style={{
          backgroundImage: "linear-gradient(45deg, transparent 40%, rgba(6, 182, 212, 0.1) 50%, transparent 60%)",
          backgroundSize: "40px 40px"
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Three-column grid with stagger animation */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Brand column */}
          <motion.div variants={linkVariants}>
            <motion.div 
              className="flex items-center space-x-2 mb-4 text-blox-text-primary"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <motion.div
                animate={prefersReducedMotion ? {} : {
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <FaGamepad className="w-6 h-6" />
              </motion.div>
              <span className="text-xl font-bold text-blox-text-primary">BLOX BUDDY</span>
            </motion.div>
            <motion.p 
              className="text-sm text-blox-text-muted"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Empowering the next generation of Roblox game developers through
              structured learning and community support.
            </motion.p>
          </motion.div>
          
          {/* Links column */}
          <motion.div variants={linkVariants}>
            <h3 className="font-semibold mb-4 text-blox-text-primary">Quick Links</h3>
            <motion.ul 
              className="space-y-2"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {[
                { href: "#learn", text: "Learning Path" },
                { href: "#community", text: "Community" },
                { href: "#about", text: "About Us" },
                { href: "#parents", text: "For Parents" },
                { href: "#contact", text: "Contact" }
              ].map((link, index) => (
                <motion.li key={link.href} variants={linkVariants}>
                  <motion.a 
                    href={link.href} 
                    className="text-blox-text-muted hover:text-blox-teal transition-colors duration-300 relative inline-block"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    {link.text}
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-blox-teal"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          
          {/* Newsletter column */}
          <motion.div variants={linkVariants}>
            <h3 className="font-semibold mb-4 text-blox-text-primary">Stay Updated</h3>
            <motion.p 
              className="text-sm mb-4 text-blox-white/80"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Get the latest tutorials and community updates delivered to your inbox.
            </motion.p>
            <motion.div 
              className="flex"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <motion.input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-2 bg-blox-glass-white backdrop-blur border border-blox-glass-border rounded-l-lg text-blox-text-primary placeholder-blox-text-muted focus:outline-none focus:border-blox-teal transition-colors duration-300"
                variants={inputVariants}
                whileFocus="focus"
              />
              <motion.button 
                className="px-4 py-2 bg-teal-gradient rounded-r-lg text-blox-text-primary font-semibold shadow-lg shadow-blox-teal/30"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                Subscribe
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Social icons row at bottom */}
        <motion.div 
          className="border-t border-blox-glass-border pt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex justify-between items-center">
            <motion.p 
              className="text-sm text-blox-text-muted"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              © 2025 Blox Buddy. All rights reserved.
            </motion.p>
            
            <motion.div 
              className="flex space-x-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {[
                { icon: FaDiscord, href: "#discord", color: "hover:text-blox-purple-DEFAULT" },
                { icon: FaYoutube, href: "#youtube", color: "hover:text-red-400" },
                { icon: FaTwitter, href: "#twitter", color: "hover:text-blox-teal" }
              ].map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a 
                    key={social.href}
                    href={social.href} 
                    className={`text-blox-text-muted ${social.color} transition-colors duration-300 relative`}
                    variants={socialIconVariants}
                    custom={index}
                    whileHover="hover"
                  >
                    <IconComponent className="w-6 h-6" />
                    
                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full blur-md opacity-0"
                      style={{ 
                        background: social.href === "#discord" ? "#6B46C1" : 
                                   social.href === "#youtube" ? "#ef4444" : "#06B6D4"
                      }}
                      whileHover={{ opacity: 0.3, scale: 1.5 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-8 right-8 w-4 h-4 bg-blox-teal/30 rounded-full"
        animate={prefersReducedMotion ? {} : {
          y: [0, -10, 0],
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-16 left-12 w-3 h-3 bg-blox-success/40 rounded-full"
        animate={prefersReducedMotion ? {} : {
          x: [0, 10, 0],
          y: [0, -5, 0],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </motion.footer>
  );
};

export default Footer;