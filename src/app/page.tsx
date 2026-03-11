"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// ═══════════════════════════════════════════════════════════════════
// PRONTO ENERGY — "KINETIC VOLTAGE" V2
// ═══════════════════════════════════════════════════════════════════
// Aesthetic: Midnight warehouse × neon signage × industrial energy
// Material: Brushed steel, matte black, liquid gold foil
// Motion: FAST, explosive, kinetic bursts
// ONE Dominant Interaction: Product reveal = flavor explosion
// Palette: #0D0F12 base / #C82424 red / #E5C14A gold / #B7BCC5 silver
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
  matcha: "#7CB342",
  blue: "#1565C0",
  pink: "#D81B60",
};

// ─── Grain ───
const Grain = () => (
  <div style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none", mixBlendMode: "overlay", opacity: 0.035 }}>
    <svg width="100%" height="100%"><filter id="g"><feTurbulence baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#g)" /></svg>
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
    width: 350, height: 350, borderRadius: "50%",
    background: `radial-gradient(circle, ${C.red}08 0%, transparent 60%)`,
    transform: `translate(${pos.x - 175}px, ${pos.y - 175}px)`,
    transition: "transform 0.08s linear",
  }} />;
}

// ─── Preloader with Video ───
function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 800);
    const t3 = setTimeout(() => setPhase(3), 2400);
    const t4 = setTimeout(() => setPhase(4), 3200);
    const t5 = setTimeout(() => onComplete(), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [onComplete]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 10000, background: C.void,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column",
      opacity: phase >= 4 ? 0 : 1, transition: "opacity 0.4s ease",
      pointerEvents: phase >= 4 ? "none" : "all",
    }}>
      <video
        src="/videos/pronto-hero.mp4"
        autoPlay
        muted
        playsInline
        style={{
          width: "clamp(200px, 30vw, 400px)",
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? "scale(1)" : "scale(0.8)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
      <div style={{
        marginTop: 32,
        fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(20px, 3vw, 36px)",
        letterSpacing: "0.35em", color: C.white,
        opacity: phase >= 3 ? 1 : 0, transform: phase >= 3 ? "translateY(0)" : "translateY(15px)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        PRONTO<span style={{ color: C.red }}>.</span>
      </div>
      <div style={{
        width: phase >= 1 ? 80 : 0, height: 2, background: C.red,
        marginTop: 16, transition: "width 1s cubic-bezier(0.16, 1, 0.3, 1)",
      }} />
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
  const t: Record<string, string> = { up: "translateY(50px)", left: "translateX(60px)", right: "translateX(-60px)", scale: "scale(0.92)" };
  return (
    <div ref={ref} style={{ ...style, opacity: vis ? 1 : 0, transform: vis ? "none" : t[dir] || t.up, transition: `all 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`, willChange: "transform, opacity" }}>
      {children}
    </div>
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
      padding: "18px 6vw", display: "flex", justifyContent: "space-between", alignItems: "center",
      background: s ? `${C.base}F0` : "transparent",
      backdropFilter: s ? "blur(24px) saturate(1.4)" : "none",
      borderBottom: s ? `1px solid ${C.steel}` : "1px solid transparent",
      transition: "all 0.5s ease",
    }}>
      <a href="#" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: "0.15em", color: C.white, textDecoration: "none" }}>
        PRONTO<span style={{ color: C.red }}>⚡</span>
      </a>
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {["Flavors", "Lifestyle", "Find Us"].map(i => (
          <a key={i} href={`#${i.toLowerCase().replace(" ", "-")}`} className="nav-link" style={{
            fontFamily: "'DM Mono', monospace", fontSize: 10,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: C.dim, textDecoration: "none", transition: "all 0.3s ease",
          }}>{i}</a>
        ))}
        <a href="#order" style={{
          fontFamily: "'Bebas Neue', sans-serif", fontSize: 14,
          letterSpacing: "0.15em", color: C.void, background: C.red,
          padding: "8px 22px", textDecoration: "none", transition: "all 0.3s ease",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = C.gold; }}
        onMouseLeave={e => { e.currentTarget.style.background = C.red; }}
        >ORDER</a>
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════════
function Hero() {
  const [ready, setReady] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => { setTimeout(() => setReady(true), 3600); }, []);

  return (
    <section
      onMouseMove={(e) => setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })}
      style={{ height: "100vh", position: "relative", overflow: "hidden", background: C.void, cursor: "crosshair" }}
    >
      {/* Background hero image */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        opacity: ready ? 0.15 : 0,
        transition: "opacity 2s ease 0.5s",
      }}>
        <Image src="/images/hero-brand-energy.png" alt="Pronto Energy" fill style={{ objectFit: "cover", objectPosition: "center" }} priority />
      </div>

      {/* Diagonal red slash */}
      <div style={{
        position: "absolute", top: "-20%", right: "-10%",
        width: "60vw", height: "140vh",
        background: `linear-gradient(135deg, ${C.red}0A, ${C.red}03)`,
        transform: `rotate(-12deg) translate(${(mouse.x - 0.5) * 20}px, ${(mouse.y - 0.5) * 10}px)`,
        transition: "transform 0.5s ease", zIndex: 1,
      }} />

      {/* Grid lines */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2, opacity: 0.03 }}>
        {[20, 40, 60, 80].map(p => (<div key={`v${p}`} style={{ position: "absolute", top: 0, bottom: 0, left: `${p}%`, width: 1, background: C.silver }} />))}
        {[25, 50, 75].map(p => (<div key={`h${p}`} style={{ position: "absolute", left: 0, right: 0, top: `${p}%`, height: 1, background: C.silver }} />))}
      </div>

      {/* Hero content */}
      <div style={{ position: "absolute", bottom: "12vh", left: "6vw", zIndex: 5 }}>
        <div style={{
          fontFamily: "'DM Mono', monospace", fontSize: 9,
          letterSpacing: "0.4em", textTransform: "uppercase", color: C.red,
          marginBottom: 20, opacity: ready ? 1 : 0, transform: ready ? "translateX(0)" : "translateX(-20px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <span style={{ width: 32, height: 2, background: C.red, display: "inline-block" }} />
          Energy Redefined
        </div>

        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(72px, 18vw, 280px)", lineHeight: 0.85, letterSpacing: "0.02em", color: C.white, margin: 0 }}>
          <span style={{ display: "block", opacity: ready ? 1 : 0, transform: ready ? "translateY(0) skewX(0)" : "translateY(100%) skewX(-3deg)", transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s" }}>PRONTO</span>
          <span style={{ display: "block", color: C.red, opacity: ready ? 1 : 0, transform: ready ? "translateY(0) skewX(0)" : "translateY(100%) skewX(-3deg)", transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.35s", WebkitTextStroke: `1px ${C.red}`, textShadow: `0 0 80px ${C.red}30` }}>ENERGY</span>
        </h1>

        <div style={{ marginTop: 32, marginLeft: "clamp(60px, 10vw, 160px)", opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(13px, 1.1vw, 16px)", fontWeight: 300, color: C.silver, lineHeight: 1.6, maxWidth: 320 }}>
            Fuel for the ones who move first.<br />5 bold flavors. Zero sugar. No crash.
          </p>
        </div>
      </div>

      {/* Right side — product shot */}
      <div style={{ position: "absolute", right: "8vw", top: "50%", transform: "translateY(-50%)", zIndex: 4, opacity: ready ? 1 : 0, transition: "opacity 1.2s ease 0.8s", width: "clamp(180px, 18vw, 320px)", height: "clamp(300px, 35vh, 500px)" }}>
        <Image src="/images/product-original.png" alt="Pronto Energy Original" fill style={{ objectFit: "contain", filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.6))" }} />
      </div>

      {/* Bottom CTA bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 6, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 6vw", borderTop: `1px solid ${C.steel}`, opacity: ready ? 1 : 0, transition: "opacity 1s ease 1s" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: C.dim }}>Scroll ↓</span>
        <a href="#flavors" style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: C.void, background: C.red, padding: "10px 28px", textDecoration: "none", transition: "all 0.3s ease" }}
          onMouseEnter={e => { e.currentTarget.style.background = C.gold; }}
          onMouseLeave={e => { e.currentTarget.style.background = C.red; }}
        >Explore Flavors</a>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// THESIS
// ═══════════════════════════════════════════════════════════════════
function Thesis() {
  return (
    <section style={{ minHeight: "100vh", background: C.base, display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: "-4vw", top: "50%", transform: "translateY(-50%)", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(200px, 35vw, 500px)", color: C.steel, opacity: 0.06, lineHeight: 0.8, userSelect: "none" }}>FUEL</div>

      <div className="thesis-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", padding: "140px 6vw", gap: "6vw", position: "relative", zIndex: 1, width: "100%" }}>
        <div>
          <R><div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: C.red, marginBottom: 40, display: "flex", alignItems: "center", gap: 12 }}><span style={{ width: 32, height: 2, background: C.red, display: "inline-block" }} />The Standard</div></R>
          <R delay={0.1}><h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 0.95, letterSpacing: "0.02em", color: C.white, margin: "0 0 40px" }}>YOUR ENERGY DRINK<br /><span style={{ color: C.red }}>DOESN&apos;T RESPECT YOU.</span><br />PRONTO DOES.</h2></R>
          <R delay={0.2}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(14px, 1.2vw, 17px)", fontWeight: 300, lineHeight: 1.8, color: C.silver, opacity: 0.5, maxWidth: 420, marginLeft: 44 }}>No sugar crashes. No mystery chemicals. No apologies. Pronto is clean energy engineered for people who build at midnight and perform at noon.</p></R>
        </div>
        <R delay={0.15} dir="right">
          <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", overflow: "hidden" }}>
            <Image src="/images/hero-dragonfruit-fire.png" alt="Pronto Dragonfruit" fill style={{ objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${C.base}, transparent 40%)` }} />
          </div>
        </R>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PRODUCTS — 5 flavors with real product images
// ═══════════════════════════════════════════════════════════════════
function Products() {
  const [active, setActive] = useState(0);
  const flavors = [
    { name: "ORIGINAL", tag: "The Foundation", color: C.gold, desc: "200mg clean caffeine. Zero sugar. Full force. The one that started it.", cal: "10", caff: "200mg", sugar: "0g", image: "/images/product-original.png" },
    { name: "DRAGONFRUIT", tag: "Fire Mode", color: C.red, desc: "Dragonfruit + taurine + B12. When ordinary energy fails, fire mode activates.", cal: "10", caff: "200mg", sugar: "0g", image: "/images/product-dragonfruit.png" },
    { name: "BLUE VANILLA ICE", tag: "Smooth Altitude", color: C.blue, desc: "Blue vanilla + electrolytes + clean caffeine. The flavor that flies first class.", cal: "10", caff: "200mg", sugar: "0g", image: "/images/product-bluevanilla.png" },
    { name: "MATCHA", tag: "Zen Energy", color: C.matcha, desc: "Ceremonial matcha + L-theanine + ginseng. Focused calm meets sustained power.", cal: "5", caff: "150mg", sugar: "0g", image: "/images/product-matcha.png" },
    { name: "STRAWBURST", tag: "Launch Sequence", color: C.pink, desc: "Strawberry + goji + vitamin C. Sweet. Bold. Unstoppable.", cal: "10", caff: "200mg", sugar: "0g", image: "/images/product-strawburst.png" },
  ];
  const f = flavors[active];

  return (
    <section id="flavors" style={{ minHeight: "100vh", background: C.void, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "30%", right: "15%", width: "clamp(300px, 40vw, 600px)", height: "clamp(300px, 40vw, 600px)", borderRadius: "50%", background: `radial-gradient(circle, ${f.color}10, transparent 70%)`, transition: "background 0.8s ease" }} />

      <div style={{ padding: "120px 6vw", position: "relative", zIndex: 1 }}>
        <R><div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: C.red, marginBottom: 64, display: "flex", alignItems: "center", gap: 12 }}><span style={{ width: 32, height: 2, background: C.red, display: "inline-block" }} />The Lineup</div></R>

        <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4vw", alignItems: "center" }}>
          <div>
            <R delay={0.1}><div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 48 }}>
              {flavors.map((fl, i) => (
                <button key={fl.name} onClick={() => setActive(i)} style={{
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(11px, 1.1vw, 16px)",
                  letterSpacing: "0.08em", color: active === i ? C.void : C.dim,
                  background: active === i ? f.color : "transparent",
                  border: active === i ? "none" : `1px solid ${C.steel}`,
                  padding: "8px 14px", cursor: "pointer",
                  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                }}>{fl.name}</button>
              ))}
            </div></R>

            <R delay={0.15}><div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: f.color, marginBottom: 16, transition: "color 0.4s ease" }}>{f.tag}</div></R>

            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 6vw, 90px)", lineHeight: 0.9, color: C.white, margin: "0 0 24px" }}>{f.name}</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: C.silver, opacity: 0.5, maxWidth: 380, marginBottom: 40 }}>{f.desc}</p>

            <R delay={0.3}><div style={{ display: "flex", gap: 24 }}>
              {[{ l: "Calories", v: f.cal }, { l: "Caffeine", v: f.caff }, { l: "Sugar", v: f.sugar }].map(n => (
                <div key={n.l} style={{ padding: "12px 0", borderRight: `1px solid ${C.steel}`, paddingRight: 24 }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: f.color, lineHeight: 1, transition: "color 0.4s ease" }}>{n.v}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: C.dim, marginTop: 4 }}>{n.l}</div>
                </div>
              ))}
            </div></R>
          </div>

          <R delay={0.2} dir="scale">
            <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "absolute", width: "clamp(250px, 22vw, 420px)", height: "clamp(250px, 22vw, 420px)", borderRadius: "50%", background: `radial-gradient(circle, ${f.color}08, transparent 60%)`, boxShadow: `0 0 120px ${f.color}08`, transition: "all 0.6s ease" }} />
              <div style={{ position: "relative", width: "100%", height: "100%", transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}>
                <Image src={f.image} alt={`Pronto ${f.name}`} fill style={{ objectFit: "contain", filter: `drop-shadow(0 20px 60px ${f.color}20)`, transition: "filter 0.6s ease" }} />
              </div>
            </div>
          </R>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// STRAWBURST VIDEO SECTION
// ═══════════════════════════════════════════════════════════════════
function StrawburstDrop() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ref, vis] = useInView(0.3);

  useEffect(() => {
    if (vis && videoRef.current) { videoRef.current.play().catch(() => {}); }
  }, [vis]);

  return (
    <section ref={ref} style={{ position: "relative", overflow: "hidden", background: C.void }}>
      <div className="strawburst-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "80vh" }}>
        <div style={{ position: "relative", overflow: "hidden", minHeight: 400 }}>
          <video ref={videoRef} src="/videos/strawburst.mp4" muted playsInline loop style={{ width: "100%", height: "100%", objectFit: "cover", opacity: vis ? 1 : 0, transition: "opacity 1s ease" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, transparent 60%, ${C.void})` }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 6vw" }}>
          <R><div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: C.pink, marginBottom: 32, display: "flex", alignItems: "center", gap: 12 }}><span style={{ width: 32, height: 2, background: C.pink, display: "inline-block" }} />New Flavor Drop</div></R>
          <R delay={0.1}><h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 7vw, 100px)", lineHeight: 0.9, color: C.white, margin: "0 0 24px" }}>STRAW<span style={{ color: C.pink }}>BURST</span></h2></R>
          <R delay={0.2}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, lineHeight: 1.8, color: C.silver, opacity: 0.5, maxWidth: 360, marginBottom: 40 }}>Sweet strawberry meets explosive energy. Rocket-fueled with goji berry, vitamin C, and 200mg clean caffeine. This isn&apos;t a sip — it&apos;s a launch.</p></R>
          <R delay={0.3}><a href="#order" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: "0.15em", color: C.void, background: C.pink, padding: "14px 36px", textDecoration: "none", display: "inline-block", width: "fit-content", transition: "all 0.3s ease" }}
            onMouseEnter={e => { e.currentTarget.style.background = C.gold; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.pink; }}
          >GET IT FIRST</a></R>
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
    { v: "5", u: "", l: "Bold Flavors" },
  ];
  return (
    <section style={{ padding: "140px 6vw", background: C.base, position: "relative" }}>
      <R><h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(56px, 10vw, 160px)", lineHeight: 0.85, color: C.white, margin: "0 0 80px", letterSpacing: "0.02em" }}>THE<br /><span style={{ color: C.red }}>NUMBERS.</span></h2></R>
      <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
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
// LIFESTYLE — Real photo grid
// ═══════════════════════════════════════════════════════════════════
function LifestyleCard({ title, image, desc }: { title: string; image: string; desc: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", cursor: "default" }}>
      <Image src={image} alt={title} fill style={{ objectFit: "cover", transform: hov ? "scale(1.05)" : "scale(1)", transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }} />
      <div style={{ position: "absolute", inset: 0, background: hov ? `linear-gradient(to top, ${C.void}E0 0%, ${C.void}40 50%, transparent)` : `linear-gradient(to top, ${C.void}90 0%, transparent 50%)`, transition: "background 0.4s ease" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px" }}>
        <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(18px, 2vw, 28px)", color: C.white, letterSpacing: "0.05em", margin: "0 0 6px" }}>{title}</h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 300, lineHeight: 1.6, color: C.silver, opacity: hov ? 0.7 : 0, transform: hov ? "translateY(0)" : "translateY(8px)", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", maxWidth: 280 }}>{desc}</p>
      </div>
    </div>
  );
}

function Lifestyle() {
  const scenes = [
    { title: "Private Aviation", image: "/images/lifestyle-jet-2.png", desc: "Blue Vanilla Ice at 40,000 feet. Work. Fly. Dominate." },
    { title: "Festival Season", image: "/images/lifestyle-festival.png", desc: "Main stage energy. Pronto keeps the crowd moving." },
    { title: "The Gym", image: "/images/lifestyle-gym.png", desc: "Pre-workout clarity. Post-workout recovery. All day power." },
    { title: "Luxury Rides", image: "/images/lifestyle-car.png", desc: "Dragonfruit in the cupholder. Nighttime drive. Fire mode on." },
    { title: "Beach Days", image: "/images/lifestyle-beach.png", desc: "Five flavors. Zero limits. The cooler is stacked." },
    { title: "Game Day VIP", image: "/images/lifestyle-stadium.png", desc: "Skybox energy. Blue Vanilla Ice on the table. Victory." },
  ];
  return (
    <section id="lifestyle" style={{ padding: "140px 6vw 80px", background: C.void, position: "relative" }}>
      <R><div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: C.red, marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}><span style={{ width: 32, height: 2, background: C.red, display: "inline-block" }} />Where It Hits</div></R>
      <R delay={0.1}><h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 0.95, color: C.white, margin: "0 0 64px" }}>THE <span style={{ color: C.red }}>LIFESTYLE.</span></h2></R>
      <div className="lifestyle-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3 }}>
        {scenes.map((s, i) => (<R key={s.title} delay={0.06 * i}><LifestyleCard {...s} /></R>))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// NIGHTLIFE — Full-width bar lineup
// ═══════════════════════════════════════════════════════════════════
function NightlifeStrip() {
  return (
    <section style={{ position: "relative", height: "60vh", overflow: "hidden" }}>
      <Image src="/images/lifestyle-nightclub.png" alt="Pronto at the club" fill style={{ objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${C.void}F0 0%, ${C.void}40 30%, ${C.void}40 70%, ${C.void}F0 100%)` }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", zIndex: 2 }}>
        <R><div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: C.red, marginBottom: 20 }}>After Dark</div></R>
        <R delay={0.1}><h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 10vw, 140px)", lineHeight: 0.9, color: C.white, textAlign: "center", textShadow: `0 0 80px ${C.void}` }}>THE LINEUP<span style={{ color: C.red }}>.</span></h2></R>
        <R delay={0.2}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, color: C.silver, opacity: 0.6, textAlign: "center", maxWidth: 400, marginTop: 16 }}>Every bar. Every bottle service. Every VIP room. Pronto is the nightlife standard.</p></R>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// DISTRIBUTION
// ═══════════════════════════════════════════════════════════════════
function Distribution() {
  return (
    <section id="find-us" style={{ padding: "140px 6vw", background: C.base, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: "-3vw", top: "50%", transform: "translateY(-50%)", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(120px, 18vw, 260px)", color: C.steel, opacity: 0.06, whiteSpace: "nowrap" }}>AVAILABLE</div>
      <div className="dist-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6vw", position: "relative", zIndex: 1 }}>
        <div>
          <R><h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 0.95, color: C.white, margin: "0 0 24px" }}>FIND<br /><span style={{ color: C.gold }}>PRONTO.</span></h2></R>
          <R delay={0.1}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: C.silver, opacity: 0.5, maxWidth: 360 }}>Select convenience stores, gyms, nightlife venues, and direct to your door. Wholesale available for qualifying retailers.</p></R>
        </div>
        <R delay={0.15}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            {["Atlanta", "Houston", "Miami", "Los Angeles", "Charlotte", "Las Vegas", "Washington DC", "New York"].map((c) => (
              <div key={c} style={{ padding: "16px 12px", background: C.steel, fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: "0.1em", color: C.silver, transition: "all 0.3s ease", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.background = C.red; e.currentTarget.style.color = C.white; }}
                onMouseLeave={e => { e.currentTarget.style.background = C.steel; e.currentTarget.style.color = C.silver; }}
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
      <div style={{ padding: "100px 6vw", position: "relative", zIndex: 1, width: "100%" }}>
        <div className="cta-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6vw", alignItems: "center" }}>
          <div>
            <R><h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(56px, 12vw, 180px)", lineHeight: 0.85, color: C.white, margin: "0 0 40px" }}>GET<br /><span style={{ color: C.red }}>PRONTO.</span></h2></R>
            <R delay={0.15}><div style={{ maxWidth: 480 }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: C.silver, opacity: 0.5, marginBottom: 36 }}>Early access. New flavors first. Exclusive drops. No spam.</p>
              {!done ? (
                <div style={{ display: "flex", border: `1px solid ${C.steel}` }}>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={{ flex: 1, padding: "16px 20px", fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 300, border: "none", outline: "none", background: "transparent", color: C.white, letterSpacing: "0.03em" }} />
                  <button onClick={() => email && setDone(true)} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: "0.15em", padding: "16px 28px", background: C.red, color: C.white, border: "none", cursor: "pointer", transition: "background 0.3s ease" }}
                    onMouseEnter={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.color = C.void; }}
                    onMouseLeave={e => { e.currentTarget.style.background = C.red; e.currentTarget.style.color = C.white; }}
                  >JOIN</button>
                </div>
              ) : (
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: C.gold, letterSpacing: "0.1em" }}>YOU&apos;RE IN. ⚡</div>
              )}
            </div></R>
          </div>
          <R delay={0.2} dir="right">
            <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden" }}>
              <Image src="/images/lifestyle-beach.png" alt="Pronto Beach" fill style={{ objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${C.void}80, transparent)` }} />
            </div>
          </R>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───
function Footer() {
  return (
    <footer style={{ background: C.base, padding: "56px 6vw 40px", borderTop: `1px solid ${C.steel}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
        <div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: C.white, letterSpacing: "0.1em", marginBottom: 8 }}>PRONTO<span style={{ color: C.red }}> ENERGY</span> ⚡</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: C.dim, opacity: 0.3, letterSpacing: "0.1em" }}>© 2026 Pronto Energy — A Kollective Hospitality Group Brand</div>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Instagram", "TikTok", "Contact", "Wholesale"].map(l => (
            <a key={l} href="#" style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: C.dim, textDecoration: "none", opacity: 0.3, transition: "opacity 0.3s ease" }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "1"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "0.3"; }}
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
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: ${C.red}40; color: ${C.white}; }
        html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
        body { overflow-x: hidden; background: ${C.void}; }
        .nav-link:hover { opacity: 1 !important; color: ${C.white} !important; }
        @media (max-width: 900px) {
          .thesis-grid, .products-grid, .strawburst-grid, .dist-grid, .cta-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .lifestyle-grid { grid-template-columns: 1fr 1fr !important; }
          nav > div:last-child .nav-link { display: none; }
        }
        @media (max-width: 600px) {
          .lifestyle-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Grain />
      <CursorSpark />
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <Nav />
      <Hero />
      <Thesis />
      <Products />
      <StrawburstDrop />
      <Proof />
      <Lifestyle />
      <NightlifeStrip />
      <Distribution />
      <Conversion />
      <Footer />
    </div>
  );
}
