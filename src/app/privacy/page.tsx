import type { Metadata } from "next";
import { TrustPage } from "@/components/TrustPage";
export const metadata: Metadata = { title: "Privacy", description: "How Pronto Energy handles information submitted through this website." };
export default function PrivacyPage() { return <TrustPage eyebrow="Trust" title="Privacy, plainly." intro="We collect only what is needed to answer requests, support customers and partners, and understand the website experience.">
  <section><h2>Information you provide</h2><p>When you contact us, we may receive your name, email, phone, company, market, product interests, and the details you choose to include.</p></section>
  <section><h2>How it is used</h2><p>We use submitted information to respond, qualify consumer and business inquiries, provide support, maintain records, prevent misuse, and measure website performance.</p></section>
  <section><h2>Service providers</h2><p>Trusted hosting, communications, form, analytics, and customer-management providers may process information for us. We do not sell personal information.</p></section>
  <section><h2>Your choices</h2><p>You may ask to access, correct, or delete submitted information through our contact page. Some records may be retained for security, legal, or transaction requirements.</p></section>
  <section><h2>Updates</h2><p>This notice may change as the service develops. The version displayed here is effective July 27, 2026.</p></section>
</TrustPage>; }
