import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pronto Energy — Fuel For The Ones Who Move First",
  description: "Clean energy. No compromise. No crash. 200mg caffeine, zero sugar.",
  openGraph: {
    title: "Pronto Energy",
    description: "Fuel for the ones who move first.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
