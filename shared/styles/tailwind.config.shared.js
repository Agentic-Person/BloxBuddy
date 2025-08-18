/** Shared Tailwind Configuration for Blox Buddy Ecosystem */

const sharedConfig = {
  theme: {
    extend: {
      colors: {
        'blox': {
          // Dark blue professional palette
          blackblue: '#001c38',      // Deepest background
          darkblue: '#001d39',        // Primary backgrounds
          darkblue2: '#002246',       // Secondary backgrounds
          
          // Purple colors for gradient
          purple: {
            deep: '#2D1B69',          // Deep purple for gradient start
            dark: '#4C2E83',          // Mid purple
            DEFAULT: '#6B46C1',       // Lighter purple
          },
          
          // Primary accent colors
          teal: '#36b0d9',            // Main CTAs and links
          
          // Text colors
          text: {
            primary: '#FFFFFF',        // Headers and titles
            secondary: '#DDDDDD',      // Primary text
            muted: '#9ab6e0',         // Secondary text
            body: '#596d8c',          // Body text
          },
          
          // Interactive states
          success: '#10B981',         // Success states
          warning: '#F59E0B',         // Warning states
          error: '#EF4444',           // Error states
          
          // Glass effects
          glass: {
            white: 'rgba(255, 255, 255, 0.08)',
            light: 'rgba(255, 255, 255, 0.04)',
            border: 'rgba(54, 176, 217, 0.2)',  // Teal border
          }
        }
      },
      backgroundImage: {
        // Main gradient: Dark purple to dark blue
        'blox-gradient': 'linear-gradient(135deg, #2D1B69 0%, #001d39 100%)',
        
        // Alternative gradients
        'blox-gradient-radial': 'radial-gradient(ellipse at top, #4C2E83 0%, #001c38 100%)',
        'blox-gradient-vertical': 'linear-gradient(180deg, #2D1B69 0%, #002246 100%)',
        
        // Hero section gradient (from your palette)
        'hero-gradient': 'linear-gradient(135deg, #1782ac 0%, #053a56 100%)',
        
        // Button gradients
        'teal-gradient': 'linear-gradient(135deg, #36b0d9 0%, #1782ac 100%)',
        'purple-gradient': 'linear-gradient(135deg, #6B46C1 0%, #2D1B69 100%)',
      },
      boxShadow: {
        'glow-teal': '0 0 20px rgba(54, 176, 217, 0.5)',
        'glow-teal-strong': '0 0 30px rgba(54, 176, 217, 0.6)',
        'glow-success': '0 0 20px rgba(16, 185, 129, 0.5)',
        'glow-warning': '0 0 20px rgba(245, 158, 11, 0.5)',
        'glow-error': '0 0 20px rgba(239, 68, 68, 0.5)',
        'glow-yellow': '0 0 30px rgba(250, 204, 21, 0.4)',
        'glow-purple': '0 0 30px rgba(124, 58, 237, 0.4)',
      },
      animation: {
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'sparkle': 'sparkle 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
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
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 0 0 rgba(54, 176, 217, 0.7)',
            opacity: '1'
          },
          '50%': { 
            boxShadow: '0 0 0 10px rgba(54, 176, 217, 0)',
            opacity: '0.9'
          }
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    }
  }
};

module.exports = sharedConfig;