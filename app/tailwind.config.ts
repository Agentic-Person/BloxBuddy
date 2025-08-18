import type { Config } from "tailwindcss";
const sharedConfig = require('../shared/styles/tailwind.config.shared');

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../shared/**/*.{js,jsx,ts,tsx}", // Include shared components
  ],
  ...sharedConfig,
  plugins: [],
};

export default config;