module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  content: [],
  theme: {
    extend: {},
    fontFamily: {
      "noto-serif": ['"Noto Serif"', 'serif']
    }
  },
  plugins: [
    require('tailwind-percentage-property')
  ],
}
