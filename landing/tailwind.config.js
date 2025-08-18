/** @type {import('tailwindcss').Config} */
const sharedConfig = require('../shared/styles/tailwind.config.shared');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "../shared/**/*.{js,jsx,ts,tsx}", // Include shared components
  ],
  ...sharedConfig,
  plugins: [],
}