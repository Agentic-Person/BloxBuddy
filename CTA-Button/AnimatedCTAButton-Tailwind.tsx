// AnimatedCTAButton-Tailwind.tsx
// For use with Tailwind CSS projects
// Requires adding custom animations to tailwind.config.js

import React from 'react';

interface AnimatedCTAButtonProps {
  onClick?: () => void;
  text?: string;
  className?: string;
}

const AnimatedCTAButton: React.FC<AnimatedCTAButtonProps> = ({ 
  onClick, 
  text = "Chat with Our AI",
  className = "" 
}) => {
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

  return (
    <div className={`relative inline-block group ${className}`}>
      {/* Animated gradient border background */}
      <div 
        className="absolute -inset-[2px] rounded-[14px] opacity-75 blur-[0.5px] group-hover:opacity-100 transition-opacity animate-shimmer"
        style={{
          background: 'linear-gradient(45deg, #FFD700, #4A69BD, #7B68EE, #6A5ACD, #FFC107, #FF8C00, #FFD700)',
          backgroundSize: '400% 400%',
        }}
      />
      
      {/* Main button */}
      <button
        onClick={onClick}
        className="relative px-8 py-4 bg-gradient-to-br from-[#1a1a3a] to-[#2d2d5a] text-yellow-400 text-lg font-semibold rounded-xl cursor-pointer inline-flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-400/30"
      >
        <div className="relative w-6 h-6 flex items-center justify-center">
          {sparklePositions.map((pos, i) => (
            <span
              key={i}
              className="absolute text-yellow-400 text-xs pointer-events-none animate-sparkle"
              style={{
                ...pos,
                fontSize: '10px'
              }}
            >
              {i % 2 === 0 ? '✨' : '⭐'}
            </span>
          ))}
        </div>
        {text}
      </button>
    </div>
  );
};

export default AnimatedCTAButton;

/* 
IMPORTANT: Add these animations to your tailwind.config.js:

module.exports = {
  theme: {
    extend: {
      animation: {
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'sparkle': 'sparkle 2s infinite',
      },
      keyframes: {
        'shimmer': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        'sparkle': {
          '0%, 100%': {
            opacity: '0',
            transform: 'scale(0) rotate(0deg)'
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1) rotate(180deg)'
          }
        }
      }
    }
  }
}

Usage:
import AnimatedCTAButton from './AnimatedCTAButton';

function MyComponent() {
  return (
    <AnimatedCTAButton 
      onClick={() => console.log('Chat opened!')}
      text="Chat with Our AI"
      className="mt-4"
    />
  );
}
*/