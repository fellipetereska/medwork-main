/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: '1px',
      },
    }
  },
  fontFamily: {
    body: ['Open Sans']
  },
  plugins: [],
}