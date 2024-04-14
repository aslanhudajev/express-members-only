/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.pug"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  darkMode: "selector",
  plugins: [],
};
