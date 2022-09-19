/** @type {import('tailwindcss').Config} */


module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primaryBlack: "#00040f",
        primaryBlackOpcity: 'rgba(0,0,0,0.5)',
        primaryBlue: "#070124",
        primaryWhite: "#ffffff",
        primaryRed: "#FF0000",
        secondary: "#00f6ff",
        pink:'#FF1493',
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        dimBlack: "#1e1e1e",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
       transitionDuration: {
        '0': '0ms',
        '2000': '2000ms',
      }
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
