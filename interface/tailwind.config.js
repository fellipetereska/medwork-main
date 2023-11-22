/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        'custom-checkbox': '#000000',
      },
    },
  },
  fontFamily: {
    body: ['Open Sans']
  },
  plugins: [],
}