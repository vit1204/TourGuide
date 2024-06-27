/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
 theme:{
  extend:{
    colors:{
      primary: '#1877F2',
      blue_dark:"#002db3",

     
      
    },
    fontFamily: {
      Nlight: ["NeueMontreal-Light", "sans-serif" ],
            Nbold: ["NeueMontreal-Bold", "sans-serif" ],
                  Nregular: ["NeueMontreal-Regular", "sans-serif" ],
                        Nmedium: ["NeueMontreal-Medium", "sans-serif" ],

      


    }
  }
 }, 
  plugins: [],
}

