import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion, smoothScrollTo } from '../utils/animations';
import AnimatedCTAButton from './AnimatedCTAButton';
import { useGameStore } from '../store/gameStore';

// Lazy load the 3D scene for better performance
const Scene3D = lazy(() => import('./3d/Scene3D'));
const ObjectPalette = lazy(() => import('./3d/ObjectPalette'));

const Hero3D: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { deleteMode } = useGameStore();

  return (
    <section 
      id="hero"
      className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900"
    >
      {/* Title and subtitle overlay */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-24 md:pt-32">
        <motion.div 
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-white drop-shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Welcome to{' '}
            <motion.span 
              className="relative inline-block"
              animate={prefersReducedMotion ? undefined : {
                y: [0, -10, 0],
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                background: prefersReducedMotion ? 
                  "linear-gradient(45deg, #10B981, #F59E0B)" :
                  "linear-gradient(45deg, #10B981 0%, #F59E0B 50%, #10B981 100%)",
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
            className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-200 drop-shadow-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Build Your Dreams in 3D - Your Roblox Journey Starts Here!
          </motion.p>
          
          {/* CTA buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div>
              <AnimatedCTAButton
                onClick={() => smoothScrollTo('ready')}
                text="Enter Padawan Training"
                size="large"
              />
            </div>
            
            <motion.button 
              className="px-8 py-4 rounded-lg font-semibold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-shadow"
              onClick={() => smoothScrollTo('whatisbloxbuddy')}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(245, 158, 11, 0.6)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              Explain Please
            </motion.button>
          </motion.div>
        </motion.div>
      </div>


      {/* 3D Interactive Game Window - Centered layout */}
      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <motion.div 
          style={{ width: '90%', maxWidth: '1200px', aspectRatio: '16/9' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        >
        {/* Game Window with Landing Page Styling */}
        <div className="w-full h-full relative rounded-3xl overflow-hidden shadow-2xl isolate">
          {/* Fancy Border - Gradient with glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-1 rounded-3xl">
            <div className="w-full h-full bg-slate-900/95 backdrop-blur-sm rounded-3xl overflow-hidden relative">
              
              {/* Control Instructions - Top left, moved right 100px */}
              <div className="absolute top-4 z-30" style={{ left: 'calc(1rem + 100px)' }}>
                <motion.div 
                  className="text-white/70 text-xs space-y-1 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.1, duration: 0.5 }}
                >
                  <div>Press R to rotate objects</div>
                  <div>Press D to delete objects</div>
                </motion.div>
              </div>

              {/* Floating Object Palette - Left side, vertically centered */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.9, duration: 0.5 }}
                >
                  <ObjectPalette />
                </motion.div>
              </div>

              {/* Full-width 3D Game Board */}
              <div className="w-full h-full relative bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 overflow-hidden">
                
                {/* Holographic CTA Window - Top right, moved 300px left */}
                <div className="absolute top-4 z-40" style={{ right: 'calc(1rem + 300px)' }}>
                  <motion.div 
                    className="relative group cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Holographic border with golden glow */}
                    <div className="relative bg-black/30 backdrop-blur-md rounded-xl p-4 border border-yellow-400/60 shadow-lg">
                      {/* Golden glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-yellow-400/20 rounded-xl blur-sm -z-10"></div>
                      
                      {/* Content */}
                      <div className="text-center">
                        {/* Default text */}
                        <div className="group-hover:opacity-0 transition-opacity duration-300">
                          <div className="text-yellow-300 text-sm font-medium leading-tight">
                            Build your farm<br />in under 1 minute
                          </div>
                        </div>
                        
                        {/* Hover text */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="text-yellow-100 text-2xl font-bold tracking-wider">
                            PLAY
                          </div>
                        </div>
                      </div>
                      
                      {/* Animated border shimmer */}
                      <div className="absolute inset-0 rounded-xl border border-yellow-400/40 animate-pulse"></div>
                    </div>
                    
                    {/* Extra glow on hover */}
                    <div className="absolute inset-0 bg-yellow-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-20"></div>
                  </motion.div>
                </div>
                
                {/* Delete Mode Indicator */}
                {deleteMode && (
                  <motion.div 
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    🗑️ DELETE MODE - Click objects to remove
                  </motion.div>
                )}
                
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-white text-xl animate-pulse">Loading 3D Scene...</div>
                  </div>
                }>
                  <Scene3D />
                </Suspense>
              </div>
            </div>
          </div>
          
          {/* Glow effect around the border */}
          <div className="absolute -inset-2 bg-gradient-to-r from-green-400/20 via-blue-500/20 to-purple-600/20 rounded-3xl blur-xl -z-10"></div>
        </div>
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-4 h-4 bg-green-400 rounded-full opacity-60 z-30"
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
        className="absolute top-40 right-16 w-6 h-6 bg-orange-400 rounded-full opacity-40 z-30"
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

      {/* Gradient overlay at bottom for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent z-15 pointer-events-none" />
    </section>
  );
};

export default Hero3D;