/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        grand: ['Grand Hotel', "cursive"],
        poppins: ['Poppins', "sans-serif"],
        playfair: ['Playfair Display', "serif"],
        hand: ['Delicious Handrawn', "cursive"]
      },
      backgroundImage: {
        "banner" : "url(./src/assets/banner.jpg)"
      }
    },
  },
  plugins: [],
}