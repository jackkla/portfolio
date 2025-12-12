/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'puzzle-primary': '#D4A373', 
        'puzzle-accent': '#EEF1F5',  // New Button Color
        'puzzle-text': '#120F0E',    // New Text Color
        'puzzle-bg': '#FAF9F6',
        'connections-yellow': '#F9DF6D',
        'connections-green': '#A0C35A',
        'connections-blue': '#B0C4EF',
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
