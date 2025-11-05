/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./presentation/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {

      colors: {
        primary: '#3D64F4',
        authbackground: '#1F2B43'

      },

      fontFamily: {
        'spacemono': ['SpaceMono', 'sans-serif'],
      }

    },
  },
  plugins: [],
}

