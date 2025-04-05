/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: { colors: {
      primary: '#236e0a',      
      secondary: '#58a701',   
      accent: '#ababab',       
      background: '#fffaf2',   
      surface: '#e7e3d9', 
      primaryDark :'#184d25'
    },},
  },
  plugins: [],
}

