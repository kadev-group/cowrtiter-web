/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#161816',
        "primary-hover": 'rgba(22,24,22,0.9)',
      },
      "inset-0": {
        inset: 0
      }
    },
  },
  plugins: [],
}
