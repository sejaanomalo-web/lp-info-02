import { Titillium_Web } from "next/font/google";
import "./globals.css";

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
  display: "swap",
  variable: "--font-titillium"
});

export const metadata = {
  title: "Arquiteto de Ideias | Diego Knebel",
  description:
    "Transforme conhecimento confuso em comunicacao clara, memoravel e influente com o metodo Arquiteto de Ideias.",
  openGraph: {
    title: "Arquiteto de Ideias | Diego Knebel",
    description:
      "Uma landing page premium para um treinamento de comunicacao com estrutura, autoridade e clareza.",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${titillium.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
