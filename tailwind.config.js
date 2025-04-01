/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./projects/**/src/**/*.{html,ts}", // Adjust based on your library folder structure
      "./src/**/*.{html,ts}" // Include app-level files if necessary
    ],
    theme: {
      extend: {},
    },
    plugins: [require('tailwindcss-primeui')]
  
  }
  
  