import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Paredes Tunisie — Produits d'hygiène professionnelle",
    template: "%s | Paredes Tunisie",
  },
  description:
    "Distributeur exclusif Paredes en Tunisie. Essuyage, hygiène et entretien professionnel. Livraison dans toute la Tunisie, paiement à la livraison.",
  keywords: [
    "Paredes",
    "Tunisie",
    "hygiène professionnelle",
    "essuyage",
    "entretien",
    "produits hygiène",
    "TND",
  ],
  openGraph: {
    title: "Paredes Tunisie — Produits d'hygiène professionnelle",
    description:
      "Distributeur exclusif Paredes en Tunisie. Essuyage, hygiène et entretien professionnel.",
    locale: "fr_TN",
    type: "website",
    siteName: "Paredes Tunisie",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
