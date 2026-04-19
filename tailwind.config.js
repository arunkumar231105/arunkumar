/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#0a0f1e",
          900: "#0d1530",
          800: "#111f40",
          700: "#162550",
        },
        cyan: {
          400: "#00d4ff",
          500: "#00bfe8",
          600: "#00a8cc",
        },
      },
      fontFamily: {
        sora: ["var(--font-sora)", "Sora", "sans-serif"],
        dm: ["var(--font-dm)", "DM Sans", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-up": "slideUp 0.6s ease forwards",
        typewriter: "typewriter 2s steps(20) forwards",
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          from: { boxShadow: "0 0 20px #00d4ff33" },
          to: { boxShadow: "0 0 40px #00d4ff66, 0 0 80px #00d4ff22" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
