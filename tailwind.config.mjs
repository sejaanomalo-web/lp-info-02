/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./lib/**/*.{js,jsx,ts,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#201747",
          terracotta: "#D3451E",
          cream: "#F1DAB2",
          paper: "#FFFDF8"
        }
      },
      boxShadow: {
        premium: "0 18px 48px rgba(17, 11, 35, 0.24)",
        soft: "0 10px 30px rgba(17, 11, 35, 0.12)"
      },
      borderRadius: {
        xl2: "1.25rem"
      },
      backgroundImage: {
        noise:
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0, rgba(255,255,255,0) 35%), radial-gradient(circle at 80% 0%, rgba(211,69,30,0.16) 0, rgba(211,69,30,0) 32%), radial-gradient(circle at 60% 80%, rgba(241,218,178,0.18) 0, rgba(241,218,178,0) 28%)"
      }
    }
  },
  plugins: []
};

export default config;
