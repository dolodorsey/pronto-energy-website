import type { MetadataRoute } from "next";
import { sitePages } from "@/lib/site-pages";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pronto-energy-website.vercel.app";
export default function sitemap(): MetadataRoute.Sitemap { const lastModified=new Date("2026-09-11T00:00:00Z"); return ["",...Object.keys(sitePages),"connect","forms"].map((route,index)=>({url:`${SITE_URL}${route?`/${route}`:"/"}`,lastModified,changeFrequency:route==="connect"||route==="forms"?"monthly":"weekly",priority:index===0?1:route==="retail"||route==="partners"||route==="events"?0.95:0.85})); }
