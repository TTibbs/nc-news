/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navBg: "var(--nav-bg)",
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        redPrimary: "var(--red-primary)",
        redHover: "var(--redHover)",
      },
    },
  },
  plugins: [],
};
