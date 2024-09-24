/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter'
      },
      colors: {
        'bgmarques': '#E7E7E7',
        'primary-color': '#0076D6',
        'secondary-color': '#61AAE6',
        'primary-map': '#F6E1B9',
        'secondary-map': '#FEFEE9'
      }
    },
  },
  plugins: [],
}