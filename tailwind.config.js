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
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}
