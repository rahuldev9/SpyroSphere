/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  extend: {
    animation: {
      'fade-in': 'fadeIn 0.5s ease-out forwards',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: 0, transform: 'scale(0.9)' },
        '100%': { opacity: 1, transform: 'scale(1)' },
      },
    },
  },
}
// tailwind.config.js
