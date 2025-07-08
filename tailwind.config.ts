import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "fc-home": ["FC Home", "Arial", "Helvetica", "sans-serif"],
        "fc-home-thin": ["FC Home", "Arial", "Helvetica", "sans-serif"],
        "fc-home-black": ["FC Home", "Arial", "Helvetica", "sans-serif"],
      },
      fontWeight: {
        "fc-thin": "300",
        "fc-regular": "400",
        "fc-black": "900",
      },
      colors: {
        // Cyberpunk 2077 Palette
        cyberpunk: {
          red: "#710000", // Blood Red
          yellow: "#FDF500", // Electric Yellow
          blue: "#37EBF3", // Electric Blue
          pink: "#E456AE", // Magenta Pink
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
