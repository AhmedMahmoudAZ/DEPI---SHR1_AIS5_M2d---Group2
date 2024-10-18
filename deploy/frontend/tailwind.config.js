/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Make sure Tailwind scans all your React components
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00a82e",
        secondary: "#f9f6f1",
        dark: "#171717",
      },
    },
  },
  plugins: [],
};
