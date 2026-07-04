/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#ffffff",
          card: "#ffffff",
        },
        ink: "#16130e",
        retro: {
          orange: "#e2572b",
          teal: "#567e88",
        },
        // Legacy tokens remapped to the retro palette so stray usages stay on-theme
        navy: {
          950: "#ffffff",
          900: "#ffffff",
          800: "#ffffff",
          700: "#ffffff",
        },
        cyan: {
          400: "#567e88",
          500: "#4a707a",
          600: "#e2572b",
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
          from: { boxShadow: "0 0 0 rgba(0,0,0,0)" },
          to: { boxShadow: "0 4px 24px rgba(22,19,14,0.15)" },
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
