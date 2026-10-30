/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chlorophyll: {
          DEFAULT: '#09261C',
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          800: '#0d3829',
          900: '#09261C',
          950: '#041610'
        },
        pine: {
          DEFAULT: '#051A13',
          dark: '#03120d'
        },
        alabaster: '#FBFBFA',
        vellum: '#F4F4EE',
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22'
        },
        terracotta: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12'
        }
      },
      fontFamily: {
        sans: ['"Sporting Grotesque"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Sporting Grotesque"', '"Outfit"', 'system-ui', 'sans-serif'],
        heading: ['"Sporting Grotesque"', '"Outfit"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glass': '0 12px 40px -10px rgba(4, 47, 46, 0.22), inset 0 1px 1px 0 rgba(255, 255, 255, 0.85)',
        'glass-lg': '0 24px 60px -12px rgba(4, 47, 46, 0.32), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)',
        'glass-dark': '0 24px 60px -12px rgba(0, 0, 0, 0.55), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
        'spotlight': '0 0 40px -5px rgba(16, 185, 129, 0.25)',
        'spotlight-amber': '0 0 40px -5px rgba(249, 115, 22, 0.25)',
      }
    },
  },
  plugins: [],
}
