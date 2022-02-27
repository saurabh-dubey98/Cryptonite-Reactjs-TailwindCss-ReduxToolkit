module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'raleway': ['Raleway', 'sans-serif']
      },
      colors: {
        'very-dark-blue': '#072227',
        'light-blue': '#35858B',
        'light-blue-2': '#4FBDBA',
        'very-light-blue': '#AEFEFF',

      },
      boxShadow: {
        cardShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px'
      }
    },
  },
  plugins: [],
}