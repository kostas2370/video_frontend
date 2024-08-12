const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./components/*.{js,ts,jsx,tsx}"
    ,
  ],
  theme: {
    extend: {padding:{'6':'2rem'}},
  },
  plugins: [],
});