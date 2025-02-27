import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#4b45ff", // Updated to new primary color
          200: "#4e48de", // Updated to new hover color
        },
        secondary: {
          100: "#1F1C1B",
          200: "#25272d",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
