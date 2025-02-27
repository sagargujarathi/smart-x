/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#3b82f6", // Base blue
          200: "#2563eb", // Darker blue
          300: "#60a5fa", // Lighter blue
          900: "#1e3a8a", // Very dark blue
        },
        secondary: {
          100: "#1f2937", // Dark gray
          200: "#111827", // Darker gray
        },
      },
    },
  },
  plugins: [],
};
