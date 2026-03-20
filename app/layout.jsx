import { Titillium_Web } from "next/font/google";
import "./globals.css";

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
  display: "swap",
  variable: "--font-titillium"
});

export const metadata = {
  title: "Arquiteto de Ideias · Diego Knebel",
  description:
    "Fale, Convença e Envolva. O método de comunicação estratégica para mentores, líderes e criadores que já superaram o medo de falar, e querem clareza, estrutura e autoridade real.",
  icons: {
    icon: "/logos/logo-icone-terracota.png",
    apple: "/logos/logo-icone-terracota.png"
  },
  themeColor: "#201747",
  openGraph: {
    title: "Arquiteto de Ideias · Diego Knebel",
    description:
      "Fale, Convença e Envolva. O método de comunicação estratégica para mentores e líderes.",
    type: "website",
    images: [{ url: "/logos/logo-footer-claro.png", width: 1099, height: 386 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Arquiteto de Ideias · Diego Knebel",
    images: ["/logos/logo-footer-claro.png"]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${titillium.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
