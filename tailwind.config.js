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
      primary: '#d7e9d7',      
      secondary: '#375437',   
      accent: '#e7e3d9',       
      background: '#f5f0e6',   
      surface: '#e7e3d9', 
      primaryDark :'#184d25'
    },},
  },
  plugins: [],
}

