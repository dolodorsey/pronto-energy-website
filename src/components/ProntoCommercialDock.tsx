import Link from "next/link";

export default function ProntoCommercialDock() {
  return (
    <aside className="pronto-commercial-dock" aria-label="Pronto Energy commercial actions">
      <Link href="/retail">Retail placement</Link>
      <Link href="/partners">Wholesale + distribution</Link>
      <Link className="pronto-commercial-dock__primary" href="/connect">Open a Pronto conversation</Link>
    </aside>
  );
}
