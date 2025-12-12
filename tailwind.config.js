/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'puzzle-primary': '#D4A373', // Keep for legacy/accents if needed, but deprioritize
        'puzzle-accent': '#EEF1F5',
        'puzzle-text': '#120F0E',
        'puzzle-bg': '#FAF9F6',
        
        // Simplified Palette
        'connections-yellow': '#F9DF6D',
        'connections-blue': '#B0C4EF',
        'connections-pink': '#F472B6', // Standardized Pink
      },
      fontFamily: {
        'display': ['Helvetica', 'Arial', 'sans-serif'],
        'body': ['Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
