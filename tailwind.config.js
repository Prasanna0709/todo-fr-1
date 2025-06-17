/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        dropShadow: {
        'custom': '4px 4px 12px rgba(0, 0, 0, 0.8)',
      }},
    },
    plugins: [],
  }
  
  