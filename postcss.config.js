module.exports = {
  plugins: [
    // @see https://tailwindcss.com/docs/using-with-preprocessors#nesting
    require('postcss-nesting'),
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
