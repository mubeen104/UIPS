/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f5f1',
          100: '#b3e0d6',
          200: '#80cbb9',
          300: '#4db69c',
          400: '#2da88a',
          500: '#3d9177',
          600: '#357e69',
          700: '#2d6b5a',
          800: '#25584b',
          900: '#1d453c',
        },
        accent: {
          50: '#f0f5f4',
          100: '#d4e4e0',
          200: '#b8d3cc',
          300: '#9bc1b8',
          400: '#7fb0a4',
          500: '#629f90',
          600: '#4d7f73',
          700: '#3d6559',
          800: '#2e4c43',
          900: '#1f322d',
        },
      },
    },
  },
  plugins: [],
};
