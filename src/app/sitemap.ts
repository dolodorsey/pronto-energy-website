import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://prontoenergydrink.com", changeFrequency: "weekly", priority: 1 },
    { url: "https://prontoenergydrink.com/connect", changeFrequency: "monthly", priority: 0.7 },
    { url: "https://prontoenergydrink.com/safety", changeFrequency: "monthly", priority: 0.7 },
    { url: "https://prontoenergydrink.com/privacy", changeFrequency: "yearly", priority: 0.3 },
    { url: "https://prontoenergydrink.com/terms", changeFrequency: "yearly", priority: 0.3 },
    { url: "https://prontoenergydrink.com/contact", changeFrequency: "monthly", priority: 0.7 },
  ];
}
