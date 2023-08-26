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
        primary: "#0141ff",
        secondary: "#00b8ff",
      },
      fontFamily: {
        sans: ["Roboto", "Arial", "sans-serif"],
      },
      screens: {
        sm: "500px", // Small screens like smartphones
        md: "700px", // Medium screens like tablets
        lg: "1024px", // Large screens like laptops
        xl: "1280px", // Extra large screens like desktops
      },
    },
  },
  plugins: [],
};
export default config;
