import type { Metadata } from "next";
import { TrustPage } from "@/components/TrustPage";
export const metadata: Metadata = { title: "Terms", description: "Terms governing use of the Pronto Energy website." };
export default function TermsPage() { return <TrustPage eyebrow="Website terms" title="Move responsibly." intro="These terms govern this website. Product supply, wholesale, sponsorship, shipping, pricing, and availability require separate written confirmation.">
  <section><h2>Website use</h2><p>Use this site only for lawful personal or business purposes. Do not submit false information, interfere with the service, or attempt unauthorized access.</p></section>
  <section><h2>Product information</h2><p>Packaging, flavor availability, formulation, nutritional information, distribution, and imagery may change. Always rely on the label on the product in your possession.</p></section>
  <section><h2>No automatic order</h2><p>A form submission is a request, not an accepted order, reservation, sponsorship, territory grant, or guarantee of inventory.</p></section>
  <section><h2>Intellectual property</h2><p>The Pronto name, identity, imagery, and site content are protected materials and may not be commercially reused without permission.</p></section>
  <section><h2>Updates</h2><p>These terms may change as the service develops. The version displayed here is effective July 27, 2026.</p></section>
</TrustPage>; }
