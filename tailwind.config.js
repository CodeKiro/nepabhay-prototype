/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nepa:Bhay Brand Colors
        nepabhay: {
          red: "#ef3b2d",
          white: "#edf2f8",
          blue: "#1877f2",
          black: "#0e0e10",
        },
        // Override default colors to match brand
        primary: "#ef3b2d",
        secondary: "#1877f2",
        background: "#edf2f8",
        foreground: "#0e0e10",
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
