/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-connections-yellow',
    'bg-connections-green',
    'bg-connections-blue',
    'bg-connections-purple',
    'bg-connections-pink',
    'border-l-connections-yellow',
    'border-l-connections-green',
    'border-l-connections-blue',
    'border-l-connections-purple',
    'border-l-connections-pink',
  ],
  theme: {
    extend: {
      colors: {
        'puzzle-primary': '#D4A373', 
        'puzzle-accent': '#EEF1F5',
        'puzzle-text': '#120F0E',
        'puzzle-bg': '#FAF9F6',
        
        // Simplified Palette for Site Theme
        'connections-yellow': '#F9DF6D',
        'connections-blue': '#B0C4EF',
        'connections-pink': '#F472B6', 
        
        // Restored Game-Specific Colors (for Connections)
        'connections-green': '#A0C35A',
        'connections-purple': '#BA81C5',
      },
      fontFamily: {
        'display': ['Helvetica', 'Arial', 'sans-serif'],
        'body': ['Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
