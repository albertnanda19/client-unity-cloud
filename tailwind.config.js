/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
      },
      screens: {
        'lg': '960px',
        'xl': '1200px',
      },
      colors: {
        primary: {
          '100': '#091C36',
          '200': '#0E294E',
          '300': '#0D366D'
        } ,
        secondary: {
          '100': '#4CDFFF',
          '200': '#3730A3',
          '300': '#005fff',
        },
        "info-message": '#cbe5fe',
        "info-text": '#29629d'
      },
      boxShadow: {
        custom: '0px 7px 12px -4px rgba(0,0,0,0.75)',
        custom2: '0px 5px 5px -2px rgba(0,0,0,0.75)',
        custom3: '0px 10px 5px -10px rgba(0,0,0,0.75);',
        'secondary-300': '0 0 0 3px rgba(0, 95, 255, 0.5)',
      }
    },
  },
  plugins: [],
}

