import type { Metadata } from "next";
import ProntoExperienceLayer from "@/components/ProntoExperienceLayer";
import ProntoCommercialDock from "@/components/ProntoCommercialDock";
import "./globals.css";
import "./experience-layer.css";
import "./commercial-seo.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pronto-energy-website.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Pronto Energy",
  title: { default: "Pronto Energy — Fuel For The Ones Who Move First", template: "%s — Pronto Energy" },
  description: "Pronto Energy is a six-flavor energy drink brand built for retail, distribution, fitness, hospitality, events and culture. Explore products, placement and commercial partnerships.",
  keywords: ["Pronto Energy","energy drink","energy drink wholesale","energy drink distribution","retail energy drink","event energy drink","fitness beverage","Pronto flavors"],
  category: "Food & Beverage",
  creator: "Pronto Energy",
  publisher: "Pronto Energy",
  alternates: { canonical: `${SITE_URL}/` },
  robots: { index:true, follow:true, googleBot:{ index:true, follow:true, "max-image-preview":"large", "max-snippet":-1, "max-video-preview":-1 } },
  openGraph: { title:"Pronto Energy — Six Flavors. Built For Momentum.", description:"Explore Pronto products, retail placement, distribution, events and commercial partnerships.", type:"website", url:`${SITE_URL}/`, siteName:"Pronto Energy", locale:"en_US", images:[{url:"/images/products/all-flavors-lineup.png",alt:"Pronto Energy flavor lineup"}] },
  twitter: { card:"summary_large_image", title:"Pronto Energy", description:"Fuel for the ones who move first.", images:["/images/products/all-flavors-lineup.png"] },
};

const structuredData = {
  "@context":"https://schema.org",
  "@graph":[
    {"@type":"WebSite","@id":`${SITE_URL}/#website`,url:`${SITE_URL}/`,name:"Pronto Energy",description:"Energy drink brand built for retail, distribution, fitness, hospitality, events and culture.",publisher:{"@id":`${SITE_URL}/#organization`},inLanguage:"en-US"},
    {"@type":"Organization","@id":`${SITE_URL}/#organization`,name:"Pronto Energy",url:`${SITE_URL}/`,description:"Energy beverage brand and commercial platform.",image:`${SITE_URL}/images/products/all-flavors-lineup.png`},
    {"@type":"Brand","@id":`${SITE_URL}/#brand`,name:"Pronto Energy",url:`${SITE_URL}/`,description:"Energy drink brand built around movement, flavor and commercial placement.",image:`${SITE_URL}/images/products/all-flavors-lineup.png`},
    {"@type":"Product","@id":`${SITE_URL}/#product`,name:"Pronto Energy",description:"Six-flavor energy drink lineup for retail, distribution, events, fitness and hospitality channels.",category:"Energy Drink",brand:{"@id":`${SITE_URL}/#brand`},image:`${SITE_URL}/images/products/all-flavors-lineup.png`}
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g,"\\u003c") }} />
        <ProntoExperienceLayer/>{children}<ProntoCommercialDock/>
      </body>
    </html>
  );
}
