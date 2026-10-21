import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const finalSix = localFont({
  src: [
    { path: "../fonts/finalsix-book.woff2", weight: "400", style: "normal" },
    { path: "../fonts/finalsix-medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/finalsix-bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/finalsix-heavy.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-final-six",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://brunoalaor.com.br"),
  title: "Bruno Alaor — Ideias em código. Soluções reais.",
  description:
    "Portfólio de Bruno Alaor. Infraestrutura, desenvolvimento e produtos digitais. Conheça o Mimic, meu projeto open source de automação de backups de rede.",
  openGraph: {
    title: "Bruno Alaor — Ideias em código. Soluções reais.",
    description:
      "Infraestrutura, código e design que conectam ideias ao mundo real.",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg", apple: "/apple-touch-icon.png" },
};
export const viewport: Viewport = { themeColor: "#121821" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={finalSix.variable}>
      <body>{children}</body>
    </html>
  );
}
