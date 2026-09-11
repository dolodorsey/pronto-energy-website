"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function ProntoConversionLayer() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          formType: "email_updates",
          name: "Email subscriber",
          email: String(form.get("email") ?? ""),
          source: "Pronto Energy website conversion layer",
          fields: {
            intent: "Launch and availability updates",
            consent: true,
            company_website: String(form.get("company_website") ?? ""),
          },
        }),
      });
      if (!response.ok) throw new Error("submit");
      event.currentTarget.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <aside className="pronto-conversion" aria-label="Pronto Energy commercial actions">
      <div className="pronto-conversion__links">
        <Link href="/retail">Retail</Link>
        <Link href="/partners">Wholesale + distribution</Link>
        <Link className="pronto-conversion__primary" href="/connect">Open a Pronto account</Link>
      </div>
      <form className="pronto-conversion__email" onSubmit={submit}>
        <label htmlFor="pronto-updates-email">Drops + placements + events</label>
        <div>
          <input id="pronto-updates-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
          <input className="pronto-honeypot" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button disabled={status === "sending"}>{status === "sending" ? "…" : status === "sent" ? "✓" : "Join ↗"}</button>
        </div>
        <span aria-live="polite">{status === "error" ? "Try again" : status === "sent" ? "You’re in." : ""}</span>
      </form>
    </aside>
  );
}
