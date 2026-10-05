/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        primary: '#181d26',
        'primary-active': '#0d1218',
        ink: '#181d26',
        body: '#333840',
        muted: '#41454d',
        hairline: '#dddddd',
        'border-strong': '#9297a0',
        canvas: '#ffffff',
        'surface-soft': '#f8fafc',
        'surface-strong': '#e0e2e6',
        'surface-dark': '#181d26',
        'signature-coral': '#aa2d00',
        'signature-forest': '#0a2e0e',
        'signature-cream': '#f5e9d4',
        'signature-peach': '#fcab79',
        'signature-mint': '#a8d8c4',
        link: '#1b61c9',
      },
      fontFamily: {
        sans: ['"Haas Groot Disp"', 'Haas', 'Inter', 'sans-serif'],
        display: ['"Haas Groot Disp"', 'Haas', 'sans-serif'],
      },
      spacing: {
        'section': '96px',
        'xxl': '48px',
        'xl': '32px',
        'lg': '24px',
        'md': '16px',
        'sm': '12px',
        'xs': '8px',
        'xxs': '4px',
      },
      borderRadius: {
        'xs': '2px',
        'sm': '6px',
        'md': '10px',
        'lg': '12px',
        'pill': '9999px',
      }
    },
  },
  plugins: [],
}
