/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        buddy: {
          pink: '#fdedee',
          pinkDark: '#fce4e6',
          lime: '#dcf786',
          limeDark: '#c9ea6b',
          blue: '#c2edfc',
          plum: '#80235c',
          plumHover: '#6a1b4b',
          plumLight: '#fbeff5',
          dark: '#111827',
          gray: '#4b5563',
          border: '#e5e7eb'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
        '5xl': '40px'
      }
    },
  },
  plugins: [],
}
