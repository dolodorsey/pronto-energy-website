"use client";
import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════════
// PRONTO ENERGY — "KINETIC VOLTAGE"
// ═══════════════════════════════════════════════════════════════════
// Aesthetic: Midnight warehouse × neon signage × industrial energy
// Material: Brushed steel, matte black, liquid gold foil
// Motion Grammar: FAST, explosive, kinetic bursts — opposite of Infinity's calm
// ONE Dominant Interaction: Product reveal = flavor explosion
// Palette: #0D0F12 base / #C82424 red / #E5C14A gold / #B7BCC5 silver / #F3F5F7 white
// ═══════════════════════════════════════════════════════════════════

const C = {
  void: "#0A0B0E",
  base: "#0D0F12",
  red: "#C82424",
  gold: "#E5C14A",
  silver: "#B7BCC5",
  white: "#F3F5F7",
  steel: "#1A1D22",
  dim: "#8A8F98",
  hotred: "#E02D2D",
  ember: "#FF4136",
};


// ─── Grain ───
const Grain = () => (
  <div style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none", mixBlendMode: "overlay", opacity: 0.04 }}>
    <svg width="100%" height="100%"><filter id="g"><feTurbulence baseFrequency="0.7" numOctaves="4" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#g)" /></svg>
  </div>
);

// ─── Cursor Spark ───
function CursorSpark() {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  useEffect(() => {
    const m = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, []);
  return <div style={{
    position: "fixed", zIndex: 9998, pointerEvents: "none",
    width: 400, height: 400, borderRadius: "50%",
    background: `radial-gradient(circle, ${C.red}06 0%, transparent 60%)`,
    transform: `translate(${pos.x - 200}px, ${pos.y - 200}px)`,
    transition: "transform 0.1s linear",
  }} />;
}

// ─── Preloader ───
function Preloader({ onComplete }: { onComplete: () => void }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setP(1), 100);
    const t2 = setTimeout(() => setP(2), 1200);
    const t3 = setTimeout(() => setP(3), 2000);
    const t4 = setTimeout(() => onComplete(), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 10000, background: C.void,
      display: "flex", alignItems: "center", justifyContent: "center",
      opacity: p >= 3 ? 0 : 1, transition: "opacity 0.4s ease",
      pointerEvents: p >= 3 ? "none" : "all",
    }}>
      <div>
        <div style={{
          width: p >= 1 ? 80 : 0, height: 3, background: C.red,
          margin: "0 auto 24px", transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }} />
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif", fontSize: 28,
          letterSpacing: "0.3em", color: C.white,
          opacity: p >= 2 ? 1 : 0, transform: p >= 2 ? "translateY(0)" : "translateY(10px)",
          transition: "all 0.5s ease",
        }}>PRONTO</div>
      </div>
    </div>
  );
}

// ─── useInView ───
function useInView(t = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.unobserve(el); } }, { threshold: t });
    obs.observe(el);
    return () => obs.disconnect();
  }, [t]);
  return [ref, v] as const;
}

// ─── Reveal ───
function R({ children, delay = 0, dir = "up", style = {} }: { children: React.ReactNode; delay?: number; dir?: string; style?: React.CSSProperties }) {
  const [ref, vis] = useInView();
  const t: Record<string, string> = { up: "translateY(50px)", left: "translateX(60px)", right: "translateX(-60px)", scale: "scale(0.9)" };
  return (
    <div ref={ref} style={{ ...style, opacity: vis ? 1 : 0, transform: vis ? "none" : t[dir] || t.up, transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`, willChange: "transform, opacity" }}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// HERO — Explosive, diagonal, condensed type at 18vw
// ═══════════════════════════════════════════════════════════════════
function Hero() {
  const [ready, setReady] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => { setTimeout(() => setReady(true), 2600); }, []);

  return (
    <section
      onMouseMove={(e) => setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })}
      style={{ height: "100vh", position: "relative", overflow: "hidden", background: C.void, cursor: "crosshair" }}
    >
      {/* Diagonal red slash */}
      <div style={{
        position: "absolute", top: "-20%", right: "-10%",
        width: "60vw", height: "140vh",
        background: `linear-gradient(135deg, ${C.red}08, ${C.red}03)`,
        transform: `rotate(-12deg) translate(${(mouse.x - 0.5) * 20}px, ${(mouse.y - 0.5) * 10}px)`,
        transition: "transform 0.5s ease",
        zIndex: 0,
      }} />

      {/* Grid lines — industrial feel */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, opacity: 0.04 }}>
        {[20, 40, 60, 80].map(p => (
          <div key={`v${p}`} style={{ position: "absolute", top: 0, bottom: 0, left: `${p}%`, width: 1, background: C.silver }} />
        ))}
        {[25, 50, 75].map(p => (
          <div key={`h${p}`} style={{ position: "absolute", left: 0, right: 0, top: `${p}%`, height: 1, background: C.silver }} />
        ))}
      </div>

      {/* Radial energy pulse */}
      <div style={{
        position: "absolute",
        left: "55%", top: "45%",
        width: "clamp(400px, 50vw, 700px)", height: "clamp(400px, 50vw, 700px)",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${C.red}06, transparent 60%)`,
        transform: `translate(-50%, -50%) scale(${ready ? 1.2 : 0.8})`,
        transition: "transform 3s cubic-bezier(0.16, 1, 0.3, 1)",
        zIndex: 1,
      }} />

      {/* Hero content — asymmetric, left-heavy */}
      <div style={{ position: "absolute", bottom: "12vh", left: "6vw", zIndex: 3 }}>
        {/* Micro label */}
        <div style={{
          fontFamily: "'DM Mono', monospace", fontSize: 9,
          letterSpacing: "0.4em", textTransform: "uppercase", color: C.red,
          marginBottom: 20,
          opacity: ready ? 1 : 0, transform: ready ? "translateX(0)" : "translateX(-20px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <span style={{ width: 32, height: 2, background: C.red, display: "inline-block" }} />
          Energy Redefined
        </div>

        {/* MASSIVE headline */}
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(72px, 18vw, 280px)",
          lineHeight: 0.85, letterSpacing: "0.02em",
          color: C.white, margin: 0,
        }}>
          <span style={{
            display: "block",
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0) skewX(0)" : "translateY(100%) skewX(-3deg)",
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}>
            PRONTO
          </span>
          <span style={{
            display: "block",
            color: C.red,
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0) skewX(0)" : "translateY(100%) skewX(-3deg)",
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.35s",
            WebkitTextStroke: `1px ${C.red}`,
            textShadow: `0 0 60px ${C.red}30`,
          }}>
            ENERGY
          </span>
        </h1>

        {/* Tagline — offset right */}
        <div style={{
          marginTop: 32, marginLeft: "clamp(60px, 10vw, 160px)",
          opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s",
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(13px, 1.1vw, 16px)",
            fontWeight: 300, color: C.silver, lineHeight: 1.6, maxWidth: 320,
          }}>
            Fuel for the ones who move first.<br />
            Clean energy. No compromise. No crash.
          </p>
        </div>
      </div>

      {/* Right side — vertical "EST" */}
      <div style={{
        position: "absolute", right: "5vw", bottom: "15vh", zIndex: 3,
        fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(80px, 10vw, 140px)",
        color: C.steel, lineHeight: 0.85, writingMode: "vertical-rl",
        opacity: ready ? 0.15 : 0, transition: "opacity 1.5s ease 0.8s",
      }}>24</div>

      {/* Bottom CTA bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 6vw",
        borderTop: `1px solid ${C.steel}`,
        opacity: ready ? 1 : 0, transition: "opacity 1s ease 1s",
      }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: C.dim }}>Scroll ↓</span>
        <a href="#products" style={{
          fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.25em",
          textTransform: "uppercase", color: C.void, background: C.red,
          padding: "10px 28px", textDecoration: "none",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={e => { ((e.target as HTMLElement)).style.background = C.gold; ((e.target as HTMLElement)).style.color = C.void; }}
        onMouseLeave={e => { ((e.target as HTMLElement)).style.background = C.red; ((e.target as HTMLElement)).style.color = C.void; }}
        >Shop Now</a>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// THESIS — Why Pronto
// ═══════════════════════════════════════════════════════════════════
function Thesis() {
  return (
    <section style={{ minHeight: "100vh", background: C.base, display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
      {/* Massive ghost text */}
      <div style={{ position: "absolute", right: "-4vw", top: "50%", transform: "translateY(-50%)", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(200px, 35vw, 500px)", color: C.steel, opacity: 0.08, lineHeight: 0.8, userSelect: "none" }}>FUEL</div>

      <div style={{ padding: "140px 6vw", position: "relative", zIndex: 1, maxWidth: "50vw" }}>
        <R><div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: C.red, marginBottom: 40, display: "flex", alignItems: "center", gap: 12 }}><span style={{ width: 32, height: 2, background: C.red, display: "inline-block" }} />The Standard</div></R>

        <R delay={0.1}><h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 0.95, letterSpacing: "0.02em", color: C.white, margin: "0 0 40px" }}>
          YOUR ENERGY DRINK<br />
          <span style={{ color: C.red }}>DOESN&apos;T RESPECT YOU.</span><br />
          PRONTO DOES.
        </h2></R>

        <R delay={0.2}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(14px, 1.2vw, 17px)", fontWeight: 300, lineHeight: 1.8, color: C.silver, opacity: 0.5, maxWidth: 420, marginLeft: 44 }}>
          No sugar crashes. No mystery chemicals. No apologies.
          Pronto is clean energy engineered for people who build at midnight and perform at noon.
        </p></R>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PRODUCTS — Kinetic Burst reveal
// ═══════════════════════════════════════════════════════════════════
function Products() {
  const [active, setActive] = useState(0);
  const flavors = [
    { name: "ORIGINAL", tag: "The Foundation", color: C.red, desc: "200mg clean caffeine. Zero sugar. Full force. The one that started it.", cal: "10", caff: "200mg", sugar: "0g" },
    { name: "CITRUS VOLT", tag: "Electric Sunrise", color: C.gold, desc: "Blood orange + yuzu + ginger. Morning energy that hits different.", cal: "15", caff: "200mg", sugar: "0g" },
    { name: "MIDNIGHT", tag: "Dark Mode", color: "#6B4EE6", desc: "Blackberry + activated charcoal + L-theanine. Focused. Quiet. Lethal.", cal: "5", caff: "250mg", sugar: "0g" },
  ];
  const f = flavors[active];

  return (
    <section id="products" style={{ minHeight: "100vh", background: C.void, position: "relative", overflow: "hidden" }}>
      {/* Background burst from active flavor color */}
      <div style={{
        position: "absolute", top: "30%", right: "15%",
        width: "clamp(300px, 40vw, 600px)", height: "clamp(300px, 40vw, 600px)",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${f.color}08, transparent 70%)`,
        transition: "background 0.8s ease",
      }} />

      <div style={{ padding: "120px 6vw", position: "relative", zIndex: 1 }}>
        <R><div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: C.red, marginBottom: 64, display: "flex", alignItems: "center", gap: 12 }}><span style={{ width: 32, height: 2, background: C.red, display: "inline-block" }} />The Lineup</div></R>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "6vw", alignItems: "center" }}>
          <div>
            {/* Flavor tabs */}
            <R delay={0.1}><div style={{ display: "flex", gap: 8, marginBottom: 48 }}>
              {flavors.map((fl, i) => (
                <button key={fl.name} onClick={() => setActive(i)} style={{
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(14px, 1.5vw, 20px)",
                  letterSpacing: "0.1em", color: active === i ? C.void : C.dim,
                  background: active === i ? f.color : "transparent",
                  border: active === i ? "none" : `1px solid ${C.steel}`,
                  padding: "8px 20px", cursor: "pointer",
                  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                }}>{fl.name}</button>
              ))}
            </div></R>

            <R delay={0.15}><div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: f.color, marginBottom: 16, transition: "color 0.4s ease" }}>{f.tag}</div></R>

            <R delay={0.2}><h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 6vw, 90px)", lineHeight: 0.9, color: C.white, margin: "0 0 24px", transition: "all 0.4s ease" }}>{f.name}</h3></R>

            <R delay={0.25}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: C.silver, opacity: 0.5, maxWidth: 380, marginBottom: 40 }}>{f.desc}</p></R>

            {/* Specs — horizontal industrial bar */}
            <R delay={0.3}><div style={{ display: "flex", gap: 0, borderTop: `1px solid ${C.steel}`, borderBottom: `1px solid ${C.steel}` }}>
              {[{ l: "Calories", v: f.cal }, { l: "Caffeine", v: f.caff }, { l: "Sugar", v: f.sugar }].map((s, i) => (
                <div key={s.l} style={{ flex: 1, padding: "20px 16px", borderRight: i < 2 ? `1px solid ${C.steel}` : "none" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: "0.25em", textTransform: "uppercase", color: C.dim, marginBottom: 6 }}>{s.l}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: f.color, transition: "color 0.4s ease" }}>{s.v}</div>
                </div>
              ))}
            </div></R>

            <R delay={0.4}><a href="#order" style={{
              display: "inline-block", marginTop: 36,
              fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.2em",
              textTransform: "uppercase", color: C.void, background: f.color,
              padding: "14px 36px", textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => { ((e.target as HTMLElement)).style.background = C.white; }}
            onMouseLeave={e => { ((e.target as HTMLElement)).style.background = f.color; }}
            >Add to Cart</a></R>
          </div>

          {/* Can visualization */}
          <R delay={0.12} dir="left">
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", height: "clamp(400px, 50vh, 600px)" }}>
              {/* Energy ring */}
              <div style={{
                position: "absolute",
                width: "clamp(200px, 16vw, 280px)", height: "clamp(200px, 16vw, 280px)",
                borderRadius: "50%",
                border: `1px solid ${f.color}15`,
                boxShadow: `0 0 80px ${f.color}06`,
                transition: "all 0.6s ease",
              }} />
              <div style={{
                position: "absolute",
                width: "clamp(280px, 22vw, 380px)", height: "clamp(280px, 22vw, 380px)",
                borderRadius: "50%",
                border: `1px solid ${f.color}08`,
              }} />

              {/* Can */}
              <div style={{
                width: "clamp(70px, 5.5vw, 90px)",
                height: "clamp(200px, 26vh, 320px)",
                background: `linear-gradient(180deg, ${C.steel}, ${C.base})`,
                border: `1px solid ${C.steel}`,
                borderRadius: "8px 8px 12px 12px",
                position: "relative",
                boxShadow: `0 30px 60px ${C.void}80, -4px 0 20px ${f.color}05, 4px 0 20px ${f.color}05`,
                transition: "box-shadow 0.6s ease",
              }}>
                {/* Top rim */}
                <div style={{
                  position: "absolute", top: 0, left: 4, right: 4, height: 12,
                  background: `linear-gradient(180deg, ${C.silver}15, transparent)`,
                  borderRadius: "6px 6px 0 0",
                }} />
                {/* Color band */}
                <div style={{
                  position: "absolute", top: "20%", left: 0, right: 0, height: "35%",
                  background: `linear-gradient(180deg, ${f.color}20, ${f.color}08)`,
                  transition: "background 0.6s ease",
                }} />
                {/* Label */}
                <div style={{
                  position: "absolute", top: "30%", left: 0, right: 0,
                  textAlign: "center",
                }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 10, letterSpacing: "0.2em", color: f.color, opacity: 0.6, transition: "color 0.4s ease" }}>PRONTO</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 7, letterSpacing: "0.15em", color: C.silver, opacity: 0.3, marginTop: 2 }}>ENERGY</div>
                </div>
                {/* Bottom */}
                <div style={{
                  position: "absolute", bottom: 0, left: 4, right: 4, height: 8,
                  background: `linear-gradient(0deg, ${C.silver}08, transparent)`,
                  borderRadius: "0 0 10px 10px",
                }} />
              </div>

              {/* Floating data */}
              <div style={{ position: "absolute", top: "10%", right: "5%", fontFamily: "'DM Mono', monospace", fontSize: 8, color: f.color, opacity: 0.2, letterSpacing: "0.2em", transition: "color 0.4s ease" }}>{f.caff}</div>
              <div style={{ position: "absolute", bottom: "15%", left: "5%", fontFamily: "'DM Mono', monospace", fontSize: 8, color: C.dim, opacity: 0.15, letterSpacing: "0.2em" }}>{f.sugar} SUGAR</div>
            </div>
          </R>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PROOF
// ═══════════════════════════════════════════════════════════════════
function Proof() {
  const stats = [
    { v: "0", u: "g", l: "Sugar" },
    { v: "200", u: "mg", l: "Clean Caffeine" },
    { v: "10", u: "cal", l: "Per Can" },
    { v: "∅", u: "", l: "Crash" },
  ];
  return (
    <section style={{ padding: "140px 6vw", background: C.base, position: "relative" }}>
      <R><h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(56px, 10vw, 160px)", lineHeight: 0.85, color: C.white, margin: "0 0 80px", letterSpacing: "0.02em" }}>
        THE<br /><span style={{ color: C.red }}>NUMBERS.</span>
      </h2></R>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {stats.map((s, i) => (
          <R key={s.l} delay={0.08 + i * 0.08}>
            <div style={{ padding: "40px 20px 40px 0", borderLeft: i > 0 ? `1px solid ${C.steel}` : "none", paddingLeft: i > 0 ? 20 : 0 }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 6vw, 80px)", color: C.red, lineHeight: 1, display: "flex", alignItems: "baseline" }}>
                {s.v}<span style={{ fontSize: "clamp(16px, 2vw, 24px)", fontFamily: "'DM Mono', monospace", marginLeft: 4, color: C.dim }}>{s.u}</span>
              </div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: C.dim, marginTop: 12 }}>{s.l}</div>
            </div>
          </R>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// LIFESTYLE — Where Pronto Lives
// ═══════════════════════════════════════════════════════════════════
function Lifestyle() {
  const scenes = [
    { title: "Studio Sessions", desc: "3AM in the booth. The beat is almost there. Pronto keeps the clarity." },
    { title: "Night Shift", desc: "Warehouse floors. Server rooms. Emergency rooms. Where ordinary energy fails." },
    { title: "Game Day", desc: "Tournament brackets. LAN parties. Esports arenas. Reaction time is everything." },
    { title: "The Hustle", desc: "Side project at midnight. Pitch deck at dawn. Pronto bridges the gap." },
  ];

  return (
    <section style={{ padding: "140px 6vw", background: C.void, position: "relative" }}>
      <R><div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: C.red, marginBottom: 64, display: "flex", alignItems: "center", gap: 12 }}><span style={{ width: 32, height: 2, background: C.red, display: "inline-block" }} />Where It Hits</div></R>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
        {scenes.map((s, i) => (
          <R key={s.title} delay={0.08 * i}>
            <SceneCard {...s} index={i} />
          </R>
        ))}
      </div>
    </section>
  );
}

function SceneCard({ title, desc, index }: { title: string; desc: string; index: number }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: "clamp(40px, 4vw, 64px)",
        background: hov ? C.steel : C.base,
        border: `1px solid ${hov ? C.red + "30" : C.steel}`,
        cursor: "default",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 16, right: 20,
        fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(60px, 6vw, 100px)",
        color: C.steel, opacity: hov ? 0.15 : 0.05,
        transition: "opacity 0.4s ease", lineHeight: 1,
      }}>0{index + 1}</div>

      <h3 style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(24px, 2.5vw, 36px)",
        color: hov ? C.red : C.white,
        margin: "0 0 12px", letterSpacing: "0.05em",
        transition: "color 0.3s ease",
      }}>{title}</h3>
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14, fontWeight: 300, lineHeight: 1.7,
        color: C.silver, opacity: 0.5, maxWidth: 320,
      }}>{desc}</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// DISTRIBUTION
// ═══════════════════════════════════════════════════════════════════
function Distribution() {
  return (
    <section style={{ padding: "140px 6vw", background: C.base, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: "-3vw", top: "50%", transform: "translateY(-50%)", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(120px, 18vw, 260px)", color: C.steel, opacity: 0.06, whiteSpace: "nowrap" }}>AVAILABLE</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6vw", position: "relative", zIndex: 1 }}>
        <div>
          <R><h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 0.95, color: C.white, margin: "0 0 24px" }}>FIND<br /><span style={{ color: C.gold }}>PRONTO.</span></h2></R>
          <R delay={0.1}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: C.silver, opacity: 0.5, maxWidth: 360 }}>Select convenience stores, gyms, nightlife venues, and direct to your door. Wholesale available for qualifying retailers.</p></R>
        </div>

        <R delay={0.15}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            {["Atlanta", "New York", "Miami", "Houston", "LA", "Chicago", "Pittsburgh", "Charlotte"].map((c) => (
              <div key={c} style={{
                padding: "16px 12px", background: C.steel,
                fontFamily: "'Bebas Neue', sans-serif", fontSize: 16,
                letterSpacing: "0.1em", color: C.silver,
                transition: "all 0.3s ease", cursor: "default",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = C.red; (e.currentTarget as HTMLElement).style.color = C.white; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = C.steel; (e.currentTarget as HTMLElement).style.color = C.silver; }}
              >{c}</div>
            ))}
          </div>
        </R>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CONVERSION
// ═══════════════════════════════════════════════════════════════════
function Conversion() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section id="order" style={{ minHeight: "80vh", background: C.void, display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: "-5vw", top: "50%", transform: "translateY(-50%)", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(200px, 40vw, 500px)", color: C.steel, opacity: 0.04, lineHeight: 0.8 }}>GO</div>

      <div style={{ padding: "100px 6vw", position: "relative", zIndex: 1 }}>
        <R><h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(56px, 12vw, 180px)", lineHeight: 0.85, color: C.white, margin: "0 0 40px" }}>
          GET<br /><span style={{ color: C.red }}>PRONTO.</span>
        </h2></R>

        <R delay={0.15}><div style={{ maxWidth: 480 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: C.silver, opacity: 0.5, marginBottom: 36 }}>Early access. New flavors first. Exclusive drops. No spam.</p>
          {!done ? (
            <div style={{ display: "flex", border: `1px solid ${C.steel}` }}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={{ flex: 1, padding: "16px 20px", fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 300, border: "none", outline: "none", background: "transparent", color: C.white, letterSpacing: "0.03em" }} />
              <button onClick={() => email && setDone(true)} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: "0.15em", padding: "16px 28px", background: C.red, color: C.white, border: "none", cursor: "pointer", transition: "background 0.3s ease" }}
              onMouseEnter={e => { ((e.target as HTMLElement)).style.background = C.gold; ((e.target as HTMLElement)).style.color = C.void; }}
              onMouseLeave={e => { ((e.target as HTMLElement)).style.background = C.red; ((e.target as HTMLElement)).style.color = C.white; }}
              >JOIN</button>
            </div>
          ) : (
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: C.gold, letterSpacing: "0.1em" }}>YOU&apos;RE IN. ⚡</div>
          )}
        </div></R>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// NAV
// ═══════════════════════════════════════════════════════════════════
function Nav() {
  const [s, setS] = useState(false);
  useEffect(() => {
    const fn = () => setS(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "20px 6vw", display: "flex", justifyContent: "space-between", alignItems: "center",
      background: s ? `${C.base}F5` : "transparent",
      backdropFilter: s ? "blur(20px) saturate(1.3)" : "none",
      borderBottom: s ? `1px solid ${C.steel}` : "1px solid transparent",
      transition: "all 0.5s ease",
    }}>
      <a href="#" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: "0.15em", color: C.white, textDecoration: "none" }}>PRONTO</a>
      <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
        {["Products", "About", "Find"].map(i => (
          <a key={i} href="#" style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: C.dim, textDecoration: "none", opacity: 0.7, transition: "all 0.3s ease" }}
          onMouseEnter={e => { ((e.target as HTMLElement)).style.opacity = "1"; ((e.target as HTMLElement)).style.color = C.white; }}
          onMouseLeave={e => { ((e.target as HTMLElement)).style.opacity = "0.7"; ((e.target as HTMLElement)).style.color = C.dim; }}
          >{i}</a>
        ))}
        <a href="#order" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: "0.15em", color: C.void, background: C.red, padding: "6px 18px", textDecoration: "none", transition: "all 0.3s ease" }}
        onMouseEnter={e => { ((e.target as HTMLElement)).style.background = C.gold; }}
        onMouseLeave={e => { ((e.target as HTMLElement)).style.background = C.red; }}
        >ORDER</a>
      </div>
    </nav>
  );
}

// ─── FOOTER ───
function Footer() {
  return (
    <footer style={{ background: C.base, padding: "56px 6vw 40px", borderTop: `1px solid ${C.steel}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: C.white, letterSpacing: "0.1em", marginBottom: 8 }}>PRONTO<span style={{ color: C.red }}> ENERGY</span></div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: C.dim, opacity: 0.3, letterSpacing: "0.1em" }}>© 2026 Pronto Energy — A Kollective Hospitality Group Brand</div>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Instagram", "TikTok", "Contact"].map(l => (
            <a key={l} href="#" style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: C.dim, textDecoration: "none", opacity: 0.3, transition: "opacity 0.3s ease" }}
            onMouseEnter={e => { ((e.target as HTMLElement)).style.opacity = "1"; }}
            onMouseLeave={e => { ((e.target as HTMLElement)).style.opacity = "0.3"; }}
            >{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════════════
export default function ProntoEnergy() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div style={{ margin: 0, padding: 0, overflowX: "hidden", background: C.void }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: ${C.red}40; color: ${C.white}; }
        html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
        body { overflow-x: hidden; }
        @media (max-width: 900px) {
          div[style*="grid-template-columns: 1.2fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="repeat(4"] { grid-template-columns: 1fr 1fr !important; }
          h1 { font-size: 56px !important; }
          h2 { font-size: 44px !important; }
          section > div { padding-left: 6vw !important; padding-right: 6vw !important; }
          nav > div:first-child ~ div a:not(:last-child) { display: none; }
        }
      `}</style>
      <Grain />
      <CursorSpark />
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <Nav />
      <Hero />
      <Thesis />
      <Products />
      <Proof />
      <Lifestyle />
      <Distribution />
      <Conversion />
      <Footer />
    </div>
  );
}
