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
      typography: (theme) => ({
        invert: {
          css: {
            "--tw-prose-body": theme("colors.zinc.300"),
            "--tw-prose-headings": theme("colors.white"),
            "--tw-prose-links": theme("colors.primary.100"),
            "--tw-prose-bold": theme("colors.white"),
            "--tw-prose-counters": theme("colors.zinc.400"),
            "--tw-prose-bullets": theme("colors.zinc.400"),
            "--tw-prose-quotes": theme("colors.zinc.300"),
            "--tw-prose-code": theme("colors.white"),
            "--tw-prose-hr": theme("colors.zinc.700"),
            "--tw-prose-th-borders": theme("colors.zinc.700"),
            "--tw-prose-td-borders": theme("colors.zinc.700"),
          },
        },
      }),
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
