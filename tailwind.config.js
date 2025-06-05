/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2F6B4F',
          light: '#4D8C6E',
          dark: '#1E4A32',
        },
        secondary: {
          DEFAULT: '#F5A623',
          light: '#F7B84B',
          dark: '#D18A1A',
        },
        dark: '#1A1A1A',
        light: '#F8F9FA',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0, 0, 0, 0.05)',
        hard: '0 4px 20px rgba(0, 0, 0, 0.1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};