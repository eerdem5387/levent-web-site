import type { Metadata } from "next";
import { Hind, Lexend_Deca } from "next/font/google";
import "./globals.css";

const hind = Hind({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-hind",
});

const lexendDeca = Lexend_Deca({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "Levent Kolej",
  description: "Levent Kolej resmi web sitesi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${hind.variable} ${lexendDeca.variable}`}>
      <body className="antialiased" style={{ fontFamily: "var(--tg-body-font-family)" }}>
        {children}
      </body>
    </html>
  );
}
