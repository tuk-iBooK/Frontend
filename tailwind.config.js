/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      pot: "705px",
      "lg-pot": "960px",
    },
    extend: {
      animation: {
        spin: "spin 1s linear infinite",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
