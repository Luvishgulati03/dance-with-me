/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#9035FF',
          dark: '#1B0033',
          darker: '#0D001A',
          gradientStart: '#2A005E',
          gradientEnd: '#4A2BB8',
          gold: '#FFD700',
          textMuted: '#E5E5E5'
        }
      },
      fontFamily: {
        sans: ['"Montserrat"', '"Poppins"', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(to bottom right, #2A005E, #4A2BB8)',
        'card-gradient': 'linear-gradient(to top right, #1B0033, #4A2BB8)',
      }
    },
  },
  plugins: [],
}
