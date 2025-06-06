/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'happy-blue': '#3B82F6',
        'happy-pink': '#EC4899',
        'happy-orange': '#F59E0B',
        'happy-purple': '#8B5CF6',
      }
    },
  },
  plugins: [],
}
