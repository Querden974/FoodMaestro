/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#60B5FF',
          light: '#AFDDFF'
        },
        secondary: {
          DEFAULT: '#FF9149',
          light: '#FFECDB',
        },
        error: {
          DEFAULT: '#FF0000',
        }

      }
    },
  },
  plugins: [],
}