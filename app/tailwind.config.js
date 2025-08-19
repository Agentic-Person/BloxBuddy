/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'blox-darkblue': '#0a0f1c',
        'blox-darkblue2': '#111827',
        'blox-purple-deep': '#1e1b4b',
        'blox-purple': {
          'DEFAULT': '#6366f1',
          'deep': '#1e1b4b'
        },
        'blox-teal': '#14b8a6',
        'blox-success': '#10b981',
        'blox-glass-border': 'rgba(255, 255, 255, 0.1)',
        'blox-text-primary': '#f8fafc',
        'blox-text-secondary': '#cbd5e1',
        'blox-text-muted': '#94a3b8',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}