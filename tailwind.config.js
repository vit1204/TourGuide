/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],

 theme:{
  extend:{
    colors:{
      primary: '#FFA300',
      primary_darker: '#FF8C00',
      secondary: '#1B4965',
      gray: '#979797'
  
      
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

