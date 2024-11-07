/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navBgColor: "var(--navBgColor)",
        textLight: "var(--textLight)",
        textRed: "var(--textRed)",
        redHover: "var(--redHover)",
      },
    },
  },
  plugins: [],
};
