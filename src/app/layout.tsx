import type { Metadata } from "next";
import ProntoExperienceLayer from "@/components/ProntoExperienceLayer";
import "./globals.css";
import "./experience-layer.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://pronto-energy.vercel.app"),
  title: "Pronto Energy — Fuel For The Ones Who Move First",
  description: "Six bold flavors and zero sugar. Explore Pronto Energy products, ingredients, retail, partnerships, events, and ordering information.",
  openGraph: {
    title: "Pronto Energy — Six Flavors. Zero Sugar.",
    description: "Explore the Pronto lineup, product information, retail, partnerships, events, and ordering.",
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
      <body><ProntoExperienceLayer/>{children}</body>
    </html>
  );
}
