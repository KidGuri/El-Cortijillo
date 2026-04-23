import type { Metadata } from "next";
import { Playfair_Display, Lora, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "El Cortijillo de Juan Diego | Restaurante Mediterráneo en Torrellano, Alicante",
  description:
    "Cocina mediterránea, española y europea de autor en Torrellano, Alicante. Arroces, mariscos, carnes selectas y una bodega excepcional. Travellers' Choice Award. Reserva: +34 965 68 28 17",
  keywords:
    "restaurante torrellano, cocina mediterránea alicante, arroces, mariscos, carnes, vinos, el cortijillo, juan diego",
  openGraph: {
    title: "El Cortijillo de Juan Diego",
    description:
      "Cocina mediterránea de autor en Torrellano, Alicante. 4.6/5 en Google con 2.912+ opiniones. Travellers' Choice Award.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${lora.variable} ${inter.variable} scroll-smooth`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
