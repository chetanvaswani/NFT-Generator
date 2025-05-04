import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        grayShade: "#181818"
      },
      fontFamily: {
        franklin: ['Franklin Gothic Medium', 'Arial Narrow', 'Arial', 'sans-serif'],
      },
      keyframes: {
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0.75' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { backgroundColor: 'white', opacity: '0' },
          "50%": {opacity: '0'},
          '100%': { backgroundColor: 'black', opacity: '1' },
        },
        fadeInDisplay: {
          '0%': { backgroundColor: 'white', opacity: '0' },
          '70%': { backgroundColor: 'white', opacity: '0' },
          '100%': { backgroundColor: 'black', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        fadeOut: 'fadeOut 2s forwards',
        slideDown: 'slideDown 0.8s ease forwards 0.5s',
        fadeIn: 'fadeIn 1.3s ease forwards',
        fadeInDisplay: 'fadeInDisplay 2s ease forwards',
        slideInLeft: 'slideInLeft 0.7s ease forwards 0.7s',
      },
    },
  },
  plugins: [],
};
export default config;