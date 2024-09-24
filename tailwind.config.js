/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'dark-marques': '#33333F',
      'primary-color': '#0076D6',
      'secondary-color': '#61AAE6'
    }
  },
  plugins: [],
}