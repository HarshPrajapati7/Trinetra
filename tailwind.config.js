/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gis: {
          bg: '#222222',
          panel: '#2b2d30',
          nav: '#1e1e1e',
          text: '#e0e0e0',
          muted: '#909090',
          border: '#181a1c',
          active: '#3b5a82',
          accent: '#ffffff',
          'panel-light': '#36383b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
