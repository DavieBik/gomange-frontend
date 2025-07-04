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
          DEFAULT: '#455D58', // Verde grisáceo elegante
          50: '#F4F7F6',
          100: '#E3EAE7',
          200: '#C1D3CD',
          300: '#9EBBB3',
          400: '#7CA399',
          500: '#5A8B7F',
          600: '#455D58', // Base
          700: '#344843',
          800: '#22332D',
          900: '#101D18',
        },
        secondary: {
          DEFAULT: '#F5A623',
          50: '#FEF4E3',
          100: '#FDE9C7',
          200: '#FBD38F',
          300: '#F9BD57',
          400: '#F7A82F',
          500: '#F5A623', // Base
          600: '#D18A1A',
          700: '#9E6714',
          800: '#6B450D',
          900: '#382207',
        },
        accent: {
          DEFAULT: '#2C4637', // Verde bosque profundo
          50: '#EAF3F0',
          100: '#CFE3DA',
          200: '#A0C7B5',
          300: '#72AB90',
          400: '#4C8B6E',
          500: '#2C4637', // Main accent
          600: '#203429',
          700: '#14221B',
          800: '#08100D',
          900: '#000000',
        },
        light: '#F9F7F1',
        dark: '#232323',
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#424242',
          800: '#212121',
          900: '#0F0F0F',
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        lobster: ['Lobster', 'cursive'], // Fuente para el logo
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0, 0, 0, 0.05)',
        hard: '0 4px 20px rgba(0, 0, 0, 0.1)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 3s ease-in-out infinite',
      },
      scale: {
        '105': '1.05',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    // Plugin personalizado para botones
    function({ addComponents }) {
      addComponents({
        // Botón primario - Más visible con colores ajustados
        '.btn-primary': {
          '@apply inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 border border-primary-700 hover:border-primary-800': {},
        },
        // Botón secundario (outline) - Fondo blanco con borde marrón y texto marrón
        '.btn-secondary': {
          '@apply inline-flex items-center justify-center bg-white hover:bg-primary-50 text-primary-600 border-2 border-primary-600 hover:border-primary-700 font-bold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2': {},
        },
        // Botón terciario - Mismo estilo que secundario
        '.btn-tertiary': {
          '@apply inline-flex items-center justify-center bg-white hover:bg-primary-50 text-primary-600 border-2 border-primary-600 hover:border-primary-700 font-bold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2': {},
        },
        // Alias para compatibilidad (mismo que btn-tertiary)
        '.btn-nav': {
          '@apply btn-tertiary': {},
        },
        // Botón pequeño para cards - base
        '.btn-card': {
          '@apply inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md focus:outline-none focus:ring-1 focus:ring-offset-1': {},
        },
        // Botón card secundario - más vibrante
        '.btn-card-secondary': {
          '@apply btn-card bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-400 border border-secondary-600': {},
        },
        // Botón card outline - mejor contraste
        '.btn-card-outline': {
          '@apply btn-card bg-white/90 text-primary-700 hover:bg-white border border-white/50 hover:border-white focus:ring-white shadow-md': {},
        },
        // Botón card con estilo secundario - fondo blanco, borde y texto marrón
        '.btn-card-outline-primary': {
          '@apply btn-card bg-white text-primary-700 hover:bg-primary-50 border border-primary-600 hover:border-primary-700 focus:ring-primary-400 shadow-md': {},
        },
        // Alternativa: botón card para fondos oscuros
        '.btn-card-dark': {
          '@apply btn-card bg-white/20 text-white hover:bg-white/30 border border-white/30 hover:border-white/50 focus:ring-white backdrop-blur-sm': {},
        },
        // Variantes de tamaño
        '.btn-sm': {
          '@apply px-4 py-2 text-sm': {},
        },
        '.btn-lg': {
          '@apply px-8 py-4 text-lg': {},
        },
        // Estados especiales
        '.btn-disabled': {
          '@apply opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none pointer-events-none': {},
        },
        '.btn-loading': {
          '@apply opacity-75 cursor-wait pointer-events-none': {},
        },
        // Botón de texto simple
        '.btn-text': {
          '@apply inline-flex items-center justify-center text-primary-600 hover:text-primary-700 font-semibold px-3 py-2 rounded-md transition-colors duration-200 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1': {},
        },
        // Botones para tabs - versiones con bordes
        '.btn-tab-active': {
          '@apply inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-md border-2 border-primary-700 hover:border-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2': {},
        },
        '.btn-tab-inactive': {
          '@apply inline-flex items-center justify-center bg-white hover:bg-primary-50 text-primary-700 border-2 border-primary-600 font-bold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2': {},
        },
      })
    },
  ],
}