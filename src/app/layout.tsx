import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pronto Energy — Fuel For The Ones Who Move First",
  description: "5 bold flavors. Zero sugar. No crash. 200mg clean caffeine. Pronto Energy is built for the ones who move first.",
  openGraph: {
    title: "Pronto Energy — 5 Flavors. Zero Compromise.",
    description: "Fuel for the ones who move first. Original, Dragonfruit, Blue Vanilla Ice, Matcha, Strawburst.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pronto Energy",
    description: "Fuel for the ones who move first.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
