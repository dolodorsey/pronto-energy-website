import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://prontoenergydrink.com"),
  title: {
    default: "Pronto Energy — Fuel For The Ones Who Move First",
    template: "%s | Pronto Energy",
  },
  description: "Bold flavor and unmistakable energy for the ones who move first. Explore Pronto and connect with our consumer and business teams.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Pronto Energy — Move First",
    description: "Bold flavor and unmistakable energy for the ones who move first.",
    url: "/",
    siteName: "Pronto Energy",
    type: "website",
    images: [{ url: "/images/hero-brand-energy.png", width: 1200, height: 630, alt: "Pronto Energy flavor lineup" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pronto Energy",
    description: "Fuel for the ones who move first.",
    images: ["/images/hero-brand-energy.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
