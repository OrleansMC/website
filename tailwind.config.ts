import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'dark-950': '#12121e',
        'dark-900': '#141520',
        'dark-850': '#171722',
        'dark-800': '#1a1a25',
        'dark-750': '#1d1d28',
        'dark-700': '#20202b',
        'dark-650': '#23232e',
        'dark-600': '#262631',
        'dark-550': '#292935',
        'dark-500': '#2c2c38',
        'dark-450': '#2f2f3b',
        'dark-400': '#32323e',
        'dark-350': '#353541',
        'dark-300': '#383844',
        'dark-250': '#3b3b47',
        'dark-200': '#3e3e4a',
        'dark-150': '#41414d',
        'dark-100': '#444450',
      }
    },
    screens: {
      '2xl': { 'max': '1536px' },
      // => @media (max-width: 1535px) { ... }

      'xl': { 'max': '1280px' },
      // => @media (max-width: 1279px) { ... }

      'lg': { 'max': '1024px' },
      // => @media (max-width: 1023px) { ... }

      'md': { 'max': '768px' },
      // => @media (max-width: 767px) { ... }

      'sm': { 'max': '640px' },
      // => @media (max-width: 639px) { ... }
    }
  },
  plugins: [],
};
export default config;
