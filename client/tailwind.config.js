/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"], // Adjusted for create-react-app
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        lora: ["Lora", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-out forwards",
        progress: "progress 3s linear",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      colors: {
        primary: "#4F46E5", // Indigo color
        secondary: "#F59E0B", // Yellow color
        success: "#10B981", // Green color
        danger: "#EF4444", // Red color
        info: "#3B82F6", // Blue color
        warning: "#FBBF24", // Amber color
      },
      boxShadow: {
        "outline-primary": "0 0 0 3px rgba(79, 70, 229, 0.5)", // Primary outline shadow
      },
      borderRadius: {
        "4xl": "2rem", // Add a larger border radius option
      },
      transitionProperty: {
        width: "width",
        height: "height",
        spacing: "margin, padding",
      },
    },
  },
  plugins: [],
};
