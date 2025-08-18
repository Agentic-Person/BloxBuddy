// AnimatedCTAButton.jsx - React/Next.js Component
// Can be used in any React or Next.js project

import React from 'react';

const AnimatedCTAButton = ({ onClick, text = "Chat with Our AI", className = "" }) => {
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
    <>
      <style jsx>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cta-wrapper {
          position: relative;
          display: inline-block;
          animation: fadeInUp 0.5s ease-out 0.6s both;
        }

        .gradient-border {
          position: absolute;
          inset: -2px;
          border-radius: 14px;
          background: linear-gradient(45deg, 
            #FFD700, #4A69BD, #7B68EE, 
            #6A5ACD, #FFC107, #FF8C00, #FFD700);
          background-size: 400% 400%;
          animation: shimmer 3s ease-in-out infinite;
          opacity: 0.75;
          filter: blur(0.5px);
          transition: opacity 0.3s;
        }

        .cta-wrapper:hover .gradient-border {
          opacity: 1;
        }

        .cta-button {
          position: relative;
          padding: 16px 32px;
          background: linear-gradient(135deg, #1a1a3a 0%, #2d2d5a 100%);
          color: #FFD700;
          font-size: 18px;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(255, 215, 0, 0.3);
        }

        .sparkles-container {
          position: relative;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sparkle {
          position: absolute;
          color: #FFD700;
          font-size: 10px;
          animation: sparkle 2s infinite;
          pointer-events: none;
        }
      `}</style>

      <div className={`cta-wrapper ${className}`}>
        {/* Animated gradient border */}
        <div className="gradient-border"></div>
        
        {/* Main button */}
        <button className="cta-button" onClick={onClick}>
          <div className="sparkles-container">
            {sparklePositions.map((pos, i) => (
              <span
                key={i}
                className="sparkle"
                style={pos}
              >
                {i % 2 === 0 ? '✨' : '⭐'}
              </span>
            ))}
          </div>
          {text}
        </button>
      </div>
    </>
  );
};

export default AnimatedCTAButton;

// Usage Example:
// import AnimatedCTAButton from './AnimatedCTAButton';
// 
// function MyComponent() {
//   return (
//     <AnimatedCTAButton 
//       onClick={() => console.log('Chat opened!')}
//       text="Chat with Our AI"
//     />
//   );
// }