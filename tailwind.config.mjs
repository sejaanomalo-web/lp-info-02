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
          navy:            "#201747",
          "navy-light":    "#2d1f5e",
          "navy-dark":     "#150e30",
          "navy-surface":  "#1a1240",
          terracotta:      "#D3451E",
          "terracotta-hover": "#b83516",
          cream:           "#F1DAB2",
          white:           "#FFFFFF",
          paper:           "#FFFDF8"
        }
      },
      boxShadow: {
        premium:       "0 18px 48px rgba(17, 11, 35, 0.5)",
        soft:          "0 10px 30px rgba(0, 0, 0, 0.3)",
        "terracotta":  "0 8px 30px rgba(211, 69, 30, 0.35)",
        "card-hover":  "0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(211,69,30,0.2)"
      },
      borderRadius: {
        xl2: "1.25rem"
      },
      backgroundImage: {
        noise: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.04) 0, rgba(255,255,255,0) 35%), radial-gradient(circle at 80% 0%, rgba(211,69,30,0.08) 0, rgba(211,69,30,0) 32%), radial-gradient(circle at 60% 80%, rgba(241,218,178,0.06) 0, rgba(241,218,178,0) 28%)"
      },
      animation: {
        "cta-pulse":   "ctaPulse 3s ease-in-out infinite",
        "price-glow":  "priceGlow 4s ease-in-out infinite",
        "hero-fade":   "heroFadeUp 0.9s cubic-bezier(0.19,1,0.22,1) both"
      },
      keyframes: {
        ctaPulse: {
          "0%, 100%": { boxShadow: "0 4px 20px rgba(211,69,30,0.25)" },
          "50%":       { boxShadow: "0 4px 36px rgba(211,69,30,0.55), 0 0 0 6px rgba(211,69,30,0.08)" }
        },
        priceGlow: {
          "0%, 100%": { boxShadow: "0 0 0 1px rgba(211,69,30,0.2), 0 24px 64px rgba(0,0,0,0.5)" },
          "50%":       { boxShadow: "0 0 0 1px rgba(211,69,30,0.5), 0 24px 64px rgba(0,0,0,0.5), 0 0 80px rgba(211,69,30,0.12)" }
        },
        heroFadeUp: {
          from: { opacity: "0", transform: "translateY(40px)", filter: "blur(4px)" },
          to:   { opacity: "1", transform: "translateY(0)",    filter: "blur(0)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
