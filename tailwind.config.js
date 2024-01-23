/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // backgrounds
        pale_red: "#f18e74",
        slate: "#11686d",
        sky_blue: "#0388f9",
        chocolate: "#b56203",
        light_green: "#7baa38",

        // typography colors
        primary: "#13203a",
        heading: "grey",

        // objects
        button_1: "#7baa38",
      },

      backgroundImage: {
        "gradient-160": "linear-gradient(160deg, var(--tw-gradient-stops))",
        "gradient-62": "linear-gradient(160deg, var(--tw-gradient-stops))",
        "gradient-135": "linear-gradient(160deg, var(--tw-gradient-stops))",
        "gradient-90": "linear-gradient(160deg, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
