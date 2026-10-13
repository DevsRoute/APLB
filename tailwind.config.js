/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ap: {
          text:  '#404040',   // AP black gray — primary text
          text2: '#4e4d4d',   // close variant used on sidebar nav items
          dark:  '#4b4b4b',   // AP dark gray — sidebar top/bottom bars, active template
          mid:   '#b8b8b8',   // AP medium gray — sidebar body
          light: '#dcdcdc',   // AP header gray — middle panel bg, active nav row
          cyan:  '#00ffff',   // AP bright cyan — placeholder highlight
          scroll:'#bbc3cf',   // scrollbar thumb
        },
      },
    },
  },
  plugins: [],
};
