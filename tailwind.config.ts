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
        d: {
          DEFAULT: 'hsl(0, 0%, 13%)',
          l15: 'hsl(0, 0%, 15%)',
          l18: 'hsl(0, 0%, 18%)',
          l20: 'hsl(0, 0%, 20%)',
          l25: 'hsl(0, 0%, 20%)',
          l30: 'hsl(0, 0%, 20%)',
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
