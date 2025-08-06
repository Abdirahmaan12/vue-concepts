/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 👈 ku dar tan si toggle uu shaqeeyo
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
        'sm-custom': '600px',
        'md-xl': '900px',
        'tablet': '768px',
        'desktop': '1024px',
        '2xl': '1440px'
      }
    },
  },
  plugins: [],
}
