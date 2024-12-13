/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: { xs: "520px" },
      fontSize: { xxs: ["0.625rem", "1rem"] },
      colors: {
        primary: "#192852",
        secondary: "#3298F1",
        lightgray: "#acacac",
        darkgray: "#414141",
        error: "#f00",
      },
      backgroundImage: {
        gradient: "linear-gradient(to right, #063bc4, #680fad)",
        "gradient-transparent":
          "linear-gradient(to bottom, #5D14B0BD, #680fad00)",
      },
      boxShadow: { box: "0 1px 5px 0 rgba(0, 0, 0, 0.1)" },
    },
  },
  plugins: [],
};
