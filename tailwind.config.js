// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  // THIS IS THE MOST IMPORTANT PART
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Make sure this line correctly scans your src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}