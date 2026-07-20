/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF7F0',
        charcoal: '#1C1712',
        beige: {
          DEFAULT: '#E8DDC9',
          light: '#F3ECDC',
          dark: '#D8C9AC',
        },
        gold: {
          DEFAULT: '#C7A567',
          soft: '#EFE3C8',
          dark: '#A6813F',
        },
        rose: '#B98B72',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      boxShadow: {
        soft: '0 20px 60px -20px rgba(28, 23, 18, 0.18)',
        card: '0 12px 30px -12px rgba(28, 23, 18, 0.14)',
      },
      backgroundImage: {
        'stitch-line':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='6' viewBox='0 0 24 6'%3E%3Cpath d='M0 3 L10 3' stroke='%23C7A567' stroke-width='1.4' stroke-dasharray='2 3' stroke-linecap='round'/%3E%3C/svg%3E\")",
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
