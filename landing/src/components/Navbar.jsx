import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGamepad } from 'react-icons/fa';
import { navSlideDown, smoothScrollTo, useReducedMotion } from '../utils/animations';
import AnimatedCTAButton from './AnimatedCTAButton';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);

      // Update active section
      const sections = ['hero', 'whatisbloxbuddy', 'ready', 'team', 'discord'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    smoothScrollTo(sectionId);
  };

  const navItems = [
    { id: 'whatisbloxbuddy', label: 'What is Blox Buddy?' },
    { id: 'ready', label: 'Get Started' },
    { id: 'team', label: 'Team' },
    { id: 'discord', label: 'Discord' }
  ];

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={prefersReducedMotion ? {} : navSlideDown}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-blox-darkblue/90 backdrop-blur-md border-b border-blox-glass-border shadow-lg' 
          : 'bg-blox-darkblue/80 backdrop-blur-md border-b border-blox-glass-border'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo area */}
          <motion.div 
            className="flex items-center space-x-2 text-blox-text-primary"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <FaGamepad className="w-6 h-6" />
            <span className="text-xl font-bold text-blox-text-primary">BLOX BUDDY</span>
          </motion.div>
          
          {/* Centered Navigation items */}
          <div className="flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-lg transition-colors duration-300 relative ${
                  activeSection === item.id ? 'text-blox-teal' : 'text-blox-text-secondary hover:text-blox-teal'
                }`}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {item.label}
                {/* Animated underline */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blox-teal"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeSection === item.id ? 1 : 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <AnimatedCTAButton
              onClick={() => handleNavClick('ready')}
              text="Get Started"
              size="small"
            />
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;