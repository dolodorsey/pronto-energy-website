import type { Metadata } from "next";
import { TrustPage } from "@/components/TrustPage";
export const metadata: Metadata = { title: "Product Safety", description: "Responsible-use guidance for Pronto Energy products." };
export default function SafetyPage() { return <TrustPage eyebrow="Know your can" title="Energy with awareness." intro="Formulas and caffeine levels must be confirmed from the label on the specific Pronto product in your possession.">
  <section><h2>Read the label</h2><p>Review the serving size, ingredient list, caffeine declaration, nutrition facts, allergens, warnings, and storage instructions before consuming. The physical label controls if website information differs.</p></section>
  <section><h2>Caffeine awareness</h2><p>Caffeinated energy products are not appropriate for everyone. Do not combine them casually with other caffeine sources. Follow product warnings and speak with a qualified health professional if you are pregnant, nursing, under medical care, sensitive to caffeine, or unsure whether the product is appropriate for you.</p></section>
  <section><h2>Not medical advice</h2><p>Website content is general product and brand information. It is not medical, nutritional, or performance advice and is not intended to diagnose, treat, cure, or prevent disease.</p></section>
  <section><h2>Questions or concerns</h2><p>Keep the can and lot information when contacting us about a product concern.</p><a className="trust-cta" href="/forms/inquiry?interest=product-support">Contact product support</a></section>
</TrustPage>; }
