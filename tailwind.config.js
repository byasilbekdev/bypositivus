/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./*.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      keyframes: {
        slider: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "auto-slider": "slider 10s linear infinite",
      },
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1240px",
      },
    },
  },
  plugins: [],
};
