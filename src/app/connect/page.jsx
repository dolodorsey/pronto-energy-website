'use client';

import { KHGFormGrid } from '../../components/KHGForms';

const DIRECT_FORMS = [
  ['Wholesale', 'https://khg-forms.vercel.app/water/pronto-energy/wholesale'],
  ['Retail Placement', 'https://khg-forms.vercel.app/water/pronto-energy/retail'],
  ['Distribution', 'https://khg-forms.vercel.app/water/pronto-energy/distribution'],
  ['Events & Sponsorships', 'https://khg-forms.vercel.app/water/pronto-energy/events'],
];

export default function ConnectPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#080808' }}>
      <section style={{
        padding: 'clamp(100px, 15vw, 180px) clamp(20px, 5vw, 80px) clamp(40px, 6vw, 80px)',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 300, color: '#fff',
          letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 16,
        }}>
          Connect With Us
        </h1>
        <p style={{ fontSize: 'clamp(14px, 1.5vw, 17px)', color: 'rgba(255,255,255,0.62)', maxWidth: 620, margin: '0 auto', lineHeight: 1.6 }}>
          Choose a direct sales or activation inquiry, or use the existing connection forms below.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10, marginTop: 26 }}>
          {DIRECT_FORMS.map(([label, href]) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" style={{
              padding: '12px 16px', border: '1px solid rgba(245,185,66,.58)', color: '#fff4d2',
              textDecoration: 'none', fontSize: 10, fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase',
            }}>{label} ↗</a>
          ))}
        </div>
        <a href="https://khg-forms.vercel.app/water/pronto-energy" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: 16, color: '#f5b942', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', textDecoration: 'none' }}>View every Pronto Energy inquiry →</a>
      </section>
      <KHGFormGrid brandKey="pronto_energy" showSelective={false} />
    </main>
  );
}
