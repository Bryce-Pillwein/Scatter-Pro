import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        d: {
          DEFAULT: 'hsl(0, 0%, 13%)',
          l15: 'hsl(0, 0%, 15%)',
          l18: 'hsl(0, 0%, 18%)',
          l20: 'hsl(0, 0%, 20%)',
          l25: 'hsl(0, 0%, 20%)',
          l30: 'hsl(0, 0%, 20%)',

          l97: 'hsl(0 0% 97%)',
          l95: 'hsl(0 0% 95%)',
          l92: 'hsl(0 0% 92%)',
          l90: 'hsl(0 0% 90%)',
          l85: 'hsl(0 0% 85%)',
          l80: 'hsl(0 0% 80%)',
          l70: 'hsl(0 0% 70%)',
          l60: 'hsl(0 0% 60%)',
        },
        geotech: {
          orange: 'rgb(243, 122, 55)',
          blue: 'rgb(20, 147, 162)',
        }
      }
    },
  },
  plugins: [],
};
export default config;
