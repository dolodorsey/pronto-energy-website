import type { Metadata } from "next";
import { TrustPage } from "@/components/TrustPage";
export const metadata: Metadata = { title: "Contact", description: "Contact Pronto Energy for product support, retail, wholesale, distribution, or partnerships." };
export default function ContactPage() { return <TrustPage eyebrow="Choose your lane" title="Let’s move." intro="Tell us what you need and where you operate. A submission begins a conversation; it does not confirm product, price, territory, or delivery.">
  <section><h2>Consumer and product support</h2><p>Questions about a product, can, flavor, or existing request.</p><a className="trust-cta" href="/forms/inquiry?interest=product-support">Contact support</a></section>
  <section><h2>Retail, venues and wholesale</h2><p>Share your company, market, expected volume, timing, and intended channel.</p><a className="trust-cta" href="/forms/group_pricing?interest=wholesale">Start a business inquiry</a></section>
  <section><h2>Distribution and partnerships</h2><p>For territory, event, sponsorship, and strategic partnership conversations.</p><a className="trust-cta" href="/forms/group_pricing?interest=distribution">Talk distribution</a></section>
</TrustPage>; }
