/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto' : ['Roboto', "sans-serif"]
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}