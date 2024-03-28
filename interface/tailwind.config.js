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
      backgroundImage: {
        'logo':"url(/src/components/media/logo_menu.png)",
      }
    }
  },
  fontFamily: {
    body: ['Open Sans']
  },
  plugins: [],
}