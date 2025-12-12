/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'puzzle-primary': '#D4A373', // Terracotta-ish
        'puzzle-accent': '#E76F51',  // Bright pop
        'puzzle-bg': '#FAF9F6',      // Off-white
        'connections-yellow': '#F9DF6D',
        'connections-green': '#A0C35A',
        'connections-blue': '#B0C4EF',
        'connections-purple': '#BA81C5',
      },
      fontFamily: {
        'display': ['"Space Mono"', 'monospace'],
        'body': ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}
