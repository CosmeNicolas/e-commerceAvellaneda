/**
 @type {import('tailwindcss').Config} */
 const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'rosa': '#E966A0',
        'negroMate': '#191825',
        'lila': '#E384FF',
        'fucsia': '#FB2576',
      },
      transitionDuration: {
        '3000': '3000ms', // Define la duración de 3 segundos
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}

