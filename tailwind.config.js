/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#ffffff',
        tertiary: '#f5f5f5',
        quaternary: '#e0e0e0',
        text: '#333333',
        border: '#dddddd',
      },
    },
  },
  plugins: [],
}