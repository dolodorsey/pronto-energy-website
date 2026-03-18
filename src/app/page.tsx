"use client";
import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════════
   PRONTO ENERGY — V7 EXTRAORDINARY
   PALETTE: Volt Lime / Glacier Blue / Graphite / Silver / Accent Orange
   FEEL: Future fuel. Daytime hype. Premium motion.
   ═══════════════════════════════════════════════════════════════════════ */

const C = {
  graphite: "#1F2933",
  dark: "#0D1117",
  base: "#111921",
  surface: "#182028",
  surface2: "#1E2830",
  volt: "#C7FF2F",
  voltGlow: "rgba(199,255,47,0.08)",
  glacier: "#5EDCFF",
  glacierGlow: "rgba(94,220,255,0.06)",
  orange: "#FF7A00",
  orangeGlow: "rgba(255,122,0,0.06)",
  white: "#FFFFFF",
  silver: "#D9DEE5",
  muted: "rgba(217,222,229,0.45)",
  dim: "rgba(255,255,255,0.08)",
  border: "rgba(255,255,255,0.05)",
};

function useInView(t=0.1){const ref=useRef<HTMLDivElement>(null);const[v,setV]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);o.unobserve(el)}},{threshold:t});o.observe(el);return()=>o.disconnect()},[t]);return[ref,v] as const}
function Rev({children,d=0,y=44}:{children:React.ReactNode;d?:number;y?:number}){const[ref,v]=useInView();return<div ref={ref} style={{transform:v?"translateY(0)":`translateY(${y}px)`,opacity:v?1:0,transition:`all 1.1s cubic-bezier(0.16,1,0.3,1) ${d}s`}}>{children}</div>}

/* ─── FULL-SCREEN VIDEO INTRO → HERO ─── */
function VideoIntroHero() {
  const [phase, setPhase] = useState(0);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2200);
    const t2 = setTimeout(() => setPhase(2), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
    {/* FULL-SCREEN INTRO */}
    <div style={{ position: "fixed", inset: 0, zIndex: phase < 2 ? 10000 : -1, background: C.dark, display: "flex", alignItems: "center", justifyContent: "center", opacity: phase >= 2 ? 0 : 1, transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1)", pointerEvents: phase >= 2 ? "none" : "all" }}>
      <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>
        <video autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7) contrast(1.1) saturate(0.8)" }}>
          <source src="/videos/portal.mp4" type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,${C.dark}44 0%,${C.dark}88 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 3, height: phase >= 1 ? 0 : 48, background: `linear-gradient(180deg,${C.volt},${C.glacier})`, margin: "0 auto 24px", transition: "height 0.8s cubic-bezier(0.16,1,0.3,1)", borderRadius: 2 }} />
            <img src="/images/pronto-logo.png" alt="Pronto Energy" style={{ height: "clamp(100px,22vw,220px)", width: "auto", objectFit: "contain", opacity: phase >= 1 ? 0 : 1, transition: "opacity 0.5s ease" }} />
          </div>
        </div>
      </div>
    </div>

    {/* HERO — video is now BG */}
    <section
      onMouseMove={e => setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })}
      style={{ minHeight: "100vh", position: "relative", overflow: "hidden", display: "flex", alignItems: "center" }}
    >
      <video autoPlay muted loop playsInline style={{ position: "absolute", inset: "-5%", width: "110%", height: "110%", objectFit: "cover", filter: "brightness(0.35) contrast(1.2) saturate(0.6)", transform: `scale(1.02) translate(${(mouse.x - 0.5) * -8}px,${(mouse.y - 0.5) * -8}px)`, transition: "transform 0.3s ease" }}>
        <source src="/videos/portal.mp4" type="video/mp4" />
      </video>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,${C.dark}00 0%,${C.dark}99 70%,${C.dark} 100%)` }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at ${mouse.x * 100}% ${mouse.y * 100}%,${C.voltGlow},transparent 50%)` }} />
      <div style={{ position: "absolute", inset: 0, opacity: 0.12, pointerEvents: "none", mixBlendMode: "overlay", backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      <div style={{ position: "relative", zIndex: 2, padding: "160px clamp(32px,8vw,120px) 120px", maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        <div style={{ opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? "translateY(0)" : "translateY(60px)", transition: "all 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s" }}>
          <div style={{ fontFamily: "'DM Sans',system-ui", fontSize: 11, fontWeight: 600, letterSpacing: "0.7em", textTransform: "uppercase", color: C.volt, marginBottom: 32, display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ width: 40, height: 2, background: `linear-gradient(90deg,${C.volt},${C.glacier})`, display: "inline-block" }} />
            Zero Sugar · No Crash · Six Flavors
          </div>

          <h1 style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(80px,16vw,240px)", fontWeight: 400, lineHeight: 0.85, letterSpacing: "0.04em", color: C.white, margin: 0 }}>
            <span style={{ display: "block", opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? "translateY(0)" : "translateY(100px)", transition: "all 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s" }}>GO</span>
            <span style={{ display: "block", background: `linear-gradient(135deg,${C.volt},${C.glacier})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? "translateY(0)" : "translateY(100px)", transition: "all 1.2s cubic-bezier(0.16,1,0.3,1) 0.45s" }}>PRONTO.</span>
          </h1>

          <div style={{ marginTop: "clamp(28px,4vw,52px)", marginLeft: "clamp(0px,6vw,100px)", maxWidth: 500, opacity: phase >= 2 ? 1 : 0, transition: "opacity 1s ease 1s" }}>
            <p style={{ fontFamily: "'DM Sans',system-ui", fontSize: "clamp(17px,1.5vw,22px)", fontWeight: 300, lineHeight: 1.85, color: C.silver, opacity: 0.65 }}>Five bold flavors. Zero sugar. Clean energy for the ones who move first — from the gym floor to the festival ground.</p>
            <div style={{ display: "flex", gap: 14, marginTop: 40, flexWrap: "wrap" }}>
              <button style={{ fontFamily: "'DM Sans',system-ui", fontSize: 13, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: C.dark, background: C.volt, border: "none", padding: "16px 48px", cursor: "pointer", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 16px 48px ${C.volt}40` }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none" }}>Shop Now</button>
              <button style={{ fontFamily: "'DM Sans',system-ui", fontSize: 13, fontWeight: 400, letterSpacing: "0.16em", textTransform: "uppercase", color: C.white, background: "transparent", border: `1px solid ${C.dim}`, padding: "16px 40px", cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = C.glacier; e.currentTarget.style.color = C.glacier }} onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = C.white }}>Wholesale</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

/* ─── CONSUMER LIFESTYLE — gym + festival ─── */
function LifestyleHero() {
  return (
    <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: C.dark }}>
      {[
        { img: "/images/lifestyle-gym.png", label: "Performance", accent: C.glacier, tag: "Train Different" },
        { img: "/images/lifestyle-festival.png", label: "Festival Season", accent: C.volt, tag: "Outlast Everyone" },
      ].map((s, i) => (
        <div key={i} style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", cursor: "pointer" }}
          onMouseEnter={e => { const img = e.currentTarget.querySelector("img") as HTMLElement; if (img) img.style.transform = "scale(1.04)" }}
          onMouseLeave={e => { const img = e.currentTarget.querySelector("img") as HTMLElement; if (img) img.style.transform = "scale(1)" }}>
          <img src={s.img} alt={s.label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,transparent 40%,${C.dark}ee 100%)` }} />
          <div style={{ position: "absolute", bottom: 32, left: 36 }}>
            <div style={{ fontFamily: "'DM Sans',system-ui", fontSize: 10, fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase", color: s.accent }}>{s.label}</div>
            <div style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(28px,3vw,44px)", letterSpacing: "0.04em", color: C.white, marginTop: 6 }}>{s.tag}</div>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ─── ELEMENTAL HEROES — 6 flavors ─── */
function ElementalHeroes() {
  const heroes = [
    { name: "Blue Vanilla Ice", img: "/images/hero-bluevanilla.png", accent: C.glacier },
    { name: "Dragonfruit", img: "/images/hero-dragonfruit-new.png", accent: C.orange },
    { name: "Matcha", img: "/images/hero-matcha.png", accent: C.volt },
    { name: "Original", img: "/images/hero-original.png", accent: "#FFCC00" },
    { name: "Strawburst", img: "/images/hero-strawburst.png", accent: "#FF4090" },
    { name: "White Pineapple", img: "/images/can-white-pineapple-nobg.png", accent: "#FFD700" },
  ];
  return (
    <section style={{ background: C.dark, padding: "120px 0 80px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.14, pointerEvents: "none" }}>
        <img src="/images/lifestyle-stadium.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.4) saturate(0.3)" }} />
      </div>
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <div style={{ padding: "0 clamp(32px,8vw,120px)", maxWidth: 1400, margin: "0 auto 56px", position: "relative", zIndex: 1 }}>
        <Rev><div style={{ fontFamily: "'DM Sans',system-ui", fontSize: 11, fontWeight: 700, letterSpacing: "0.6em", textTransform: "uppercase", color: C.volt, marginBottom: 20 }}>Elemental Energy</div>
          <h2 style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(44px,7vw,100px)", fontWeight: 400, lineHeight: 0.92, letterSpacing: "0.03em", color: C.white }}>Each Flavor.<br /><span style={{ background: `linear-gradient(135deg,${C.volt},${C.glacier})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Its Own Force.</span></h2></Rev>
      </div>
      <div className="elemental-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 2, padding: "0 2px", position: "relative", zIndex: 1 }}>
        {heroes.map((h, i) => (
          <Rev key={h.name} d={0.06 * i}>
            <div style={{ position: "relative", background: C.surface, overflow: "hidden", cursor: "pointer", transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)" }}
              onMouseEnter={e => { e.currentTarget.style.background = C.surface2; const img = e.currentTarget.querySelector("img"); if (img) (img as HTMLElement).style.transform = "scale(1.05)" }}
              onMouseLeave={e => { e.currentTarget.style.background = C.surface; const img = e.currentTarget.querySelector("img"); if (img) (img as HTMLElement).style.transform = "scale(1)" }}>
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 30%,${h.accent}12,transparent 70%)`, pointerEvents: "none" }} />
              <div style={{ width: "100%", aspectRatio: "3/5", overflow: "hidden" }}>
                <img src={h.img} alt={h.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)" }} />
              </div>
              <div style={{ padding: "18px 20px 24px" }}>
                <div style={{ fontFamily: "'DM Sans',system-ui", fontSize: 7, fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase", color: h.accent, marginBottom: 6 }}>Pronto</div>
                <div style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 20, letterSpacing: "0.05em", color: C.white }}>{h.name}</div>
              </div>
            </div>
          </Rev>
        ))}
      </div>
    </section>
  );
}

/* ─── BEACH SUNSET — full width consumer photo ─── */
function BeachBreak() {
  return (
    <section style={{ position: "relative", height: "60vh", overflow: "hidden" }}>
      <img src="/images/lifestyle/beach-cheers-sunset.png" alt="Friends cheering with Pronto at sunset" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,${C.dark} 0%,transparent 25%,transparent 65%,${C.dark} 100%),linear-gradient(90deg,${C.dark}cc 0%,transparent 50%)` }} />
      <div style={{ position: "absolute", bottom: "clamp(28px,5vh,60px)", left: "clamp(32px,8vw,120px)", zIndex: 2 }}>
        <Rev><div style={{ fontFamily: "'DM Sans',system-ui", fontSize: 10, fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase", color: C.volt }}>The Pronto Life</div>
          <h2 style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(36px,6vw,72px)", letterSpacing: "0.04em", color: C.white, marginTop: 8 }}>Every Moment. Fueled.</h2></Rev>
      </div>
    </section>
  );
}

/* ─── PICK YOUR POWER — 6 flavors, no prices ─── */
function Products() {
  const [hover, setHover] = useState<number | null>(null);
  const products = [
    { name: "Blue Vanilla Ice", img: "/images/products/blue-vanilla-ice.png", desc: "Cool. Smooth. Unstoppable.", accent: C.glacier, bg: "#0D1820" },
    { name: "Dragonfruit", img: "/images/products/dragonfruit.png", desc: "Bold heat. Tropical fire.", accent: C.orange, bg: "#1A100A" },
    { name: "Matcha", img: "/images/products/matcha.png", desc: "Zen focus. Clean power.", accent: C.volt, bg: "#101A0A" },
    { name: "Original", img: "/images/products/original.png", desc: "Pure lightning. The flagship.", accent: "#FFCC00", bg: "#1A180A" },
    { name: "Strawburst", img: "/images/products/strawburst.png", desc: "Sweet explosion. Hits different.", accent: "#FF4090", bg: "#1A0A12" },
    { name: "White Pineapple", img: "/images/can-white-pineapple-light.png", desc: "Tropical clarity. Smooth.", accent: "#FFD700", bg: "#14140F" },
  ];
  return (
    <section id="flavors" style={{ background: C.base, padding: "120px clamp(32px,8vw,120px)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <Rev><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 60 }}>
          <div>
            <div style={{ fontFamily: "'DM Sans',system-ui", fontSize: 11, fontWeight: 700, letterSpacing: "0.6em", textTransform: "uppercase", color: C.volt, marginBottom: 20 }}>6 Bold Flavors</div>
            <h2 style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(48px,7vw,100px)", fontWeight: 400, lineHeight: 0.92, letterSpacing: "0.03em", color: C.white }}>Pick Your<br />Power.</h2>
          </div>
          <p style={{ fontFamily: "'DM Sans',system-ui", fontSize: 16, fontWeight: 300, lineHeight: 1.85, color: C.muted, maxWidth: 400 }}>Each flavor is its own universe. Same clean formula. Different energy.</p>
        </div></Rev>
        <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 2 }}>
          {products.map((p, i) => (
            <Rev key={p.name} d={0.04 * i}>
              <div onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ background: p.bg, padding: "24px 16px 28px", cursor: "pointer", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)", position: "relative", overflow: "hidden", borderTop: `2px solid ${hover === i ? p.accent : "transparent"}` }}>
                <div style={{ position: "absolute", top: 0, right: 0, width: "70%", height: "70%", background: `radial-gradient(circle at 100% 0%,${p.accent}0c,transparent 70%)`, pointerEvents: "none" }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ width: "100%", aspectRatio: "3/4", marginBottom: 18, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "contain", transform: hover === i ? "scale(1.08)" : "scale(1)", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }} />
                  </div>
                  <div style={{ fontFamily: "'DM Sans',system-ui", fontSize: 7, fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase", color: p.accent, marginBottom: 6 }}>Pronto</div>
                  <div style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 18, letterSpacing: "0.04em", color: C.white, marginBottom: 8 }}>{p.name}</div>
                  <p style={{ fontFamily: "'DM Sans',system-ui", fontSize: 13, fontWeight: 300, lineHeight: 1.65, color: C.muted }}>{p.desc}</p>
                </div>
              </div>
            </Rev>
          ))}
        </div>
        <Rev d={0.1}><div style={{ marginTop: 48, position: "relative", overflow: "hidden" }}>
          <img src="/images/all-flavors.png" alt="Full Lineup" style={{ width: "100%", height: "auto", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg,${C.base}cc 0%,transparent 20%,transparent 80%,${C.base}cc 100%)` }} />
        </div></Rev>
      </div>
    </section>
  );
}

/* ─── TRIPLE LIFESTYLE — campfire + selfie + boat ─── */
function TripleLifestyle() {
  const scenes = [
    { img: "/images/lifestyle/campfire-friends.png", label: "After Sunset", tag: "Keep The Fire Going", accent: C.orange },
    { img: "/images/lifestyle/club-selfie.png", label: "Night Energy", tag: "Outlast Everyone", accent: "#FF4090" },
    { img: "/images/lifestyle/cheers-boat-sunset.png", label: "Golden Hour", tag: "On Deck", accent: C.glacier },
  ];
  return (
    <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2, background: C.dark }}>
      {scenes.map((s, i) => (
        <Rev key={i} d={0.06 * i}>
          <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", cursor: "pointer" }}
            onMouseEnter={e => { const img = e.currentTarget.querySelector("img") as HTMLElement; if (img) img.style.transform = "scale(1.04)" }}
            onMouseLeave={e => { const img = e.currentTarget.querySelector("img") as HTMLElement; if (img) img.style.transform = "scale(1)" }}>
            <img src={s.img} alt={s.label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,transparent 40%,${C.dark}ee 100%)` }} />
            <div style={{ position: "absolute", bottom: 32, left: 28 }}>
              <div style={{ fontFamily: "'DM Sans',system-ui", fontSize: 7, fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase", color: s.accent }}>{s.label}</div>
              <div style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(22px,2.5vw,32px)", letterSpacing: "0.04em", color: C.white, marginTop: 6 }}>{s.tag}</div>
            </div>
          </div>
        </Rev>
      ))}
    </section>
  );
}

/* ─── SCIENCE ─── */
function TheScience() {
  const facts = [
    { label: "Caffeine", value: "Natural Green Tea Extract", color: C.volt },
    { label: "Crash Prevention", value: "Extended-Release Formula", color: C.glacier },
    { label: "Amino Profile", value: "L-Theanine + L-Citrulline", color: C.volt },
    { label: "B-Vitamins", value: "B3 · B6 · B12 Complex", color: C.glacier },
    { label: "Sugar", value: "Zero — All Variants", color: C.volt },
    { label: "Certification", value: "NSF Certified · Clean Label", color: C.glacier },
  ];
  return (
    <section id="science" style={{ background: C.dark, padding: "120px clamp(32px,8vw,120px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.14, pointerEvents: "none" }}>
        <img src="/images/lifestyle-gym.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.4) saturate(0.3)" }} />
      </div>
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 70% 50%,${C.voltGlow},transparent 55%)` }} />
      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Rev><div className="science-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'DM Sans',system-ui", fontSize: 11, fontWeight: 700, letterSpacing: "0.6em", textTransform: "uppercase", color: C.volt, marginBottom: 20 }}>The Formula</div>
            <h2 style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(44px,6vw,80px)", fontWeight: 400, lineHeight: 0.92, letterSpacing: "0.03em", color: C.white, marginBottom: 24 }}>Built Different.<br /><span style={{ color: C.glacier }}>By Design.</span></h2>
            <p style={{ fontFamily: "'DM Sans',system-ui", fontSize: 16, fontWeight: 300, lineHeight: 1.9, color: C.muted, marginBottom: 40 }}>Every ingredient earns its spot. No proprietary blends. No artificial dyes. Clean science at effective doses.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              {facts.map(f => (<div key={f.label} style={{ background: C.surface, padding: "22px 18px" }}>
                <div style={{ fontFamily: "'DM Sans',system-ui", fontSize: 7, fontWeight: 700, letterSpacing: "0.45em", textTransform: "uppercase", color: f.color, marginBottom: 8 }}>{f.label}</div>
                <div style={{ fontFamily: "'DM Sans',system-ui", fontSize: 15, fontWeight: 600, color: C.white, lineHeight: 1.4 }}>{f.value}</div>
              </div>))}
            </div>
          </div>
          <div style={{ position: "relative" }}><img src="/images/products/lab-schematic.png" alt="Formula" style={{ width: "100%", height: "auto" }} /><div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,transparent 40%,${C.dark} 100%)` }} /></div>
        </div></Rev>
      </div>
    </section>
  );
}

/* ─── STADIUM + FESTIVAL NIGHT — consumer photo strip ─── */
function ConsumerStrip() {
  return (
    <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 2, background: C.dark }}>
      {[
        { img: "/images/lifestyle/stadium-fans-game-day.png", label: "Game Day" },
        { img: "/images/lifestyle/festival-night-crew.png", label: "Night Crew" },
        { img: "/images/lifestyle/beach-girls-sunset.png", label: "Beach Vibes" },
        { img: "/images/lifestyle/festival-girl-dragonfruit.png", label: "Festival" },
      ].map((s, i) => (
        <Rev key={i} d={0.05 * i}>
          <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", cursor: "pointer" }}
            onMouseEnter={e => { const img = e.currentTarget.querySelector("img") as HTMLElement; if (img) img.style.transform = "scale(1.05)" }}
            onMouseLeave={e => { const img = e.currentTarget.querySelector("img") as HTMLElement; if (img) img.style.transform = "scale(1)" }}>
            <img src={s.img} alt={s.label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,transparent 60%,${C.dark}cc 100%)` }} />
            <div style={{ position: "absolute", bottom: 20, left: 20, fontFamily: "'DM Sans',system-ui", fontSize: 10, fontWeight: 700, letterSpacing: "0.45em", textTransform: "uppercase", color: C.volt }}>{s.label}</div>
          </div>
        </Rev>
      ))}
    </section>
  );
}

/* ─── RETAIL ─── */
function Retail() {
  const channels = [
    { title: "Direct to Consumer", desc: "Order Pronto directly. Bundles, subscriptions, single-unit.", cta: "Shop Now" },
    { title: "Retail Placement", desc: "Grocery, convenience, and specialty retail.", cta: "Retail Inquiry" },
    { title: "Hospitality & Events", desc: "Hotels, venues, gyms, stadiums, corporate.", cta: "Venue Supply" },
    { title: "Wholesale Distribution", desc: "Regional and national distribution.", cta: "Distributor Inquiry" },
  ];
  return (
    <section id="partners" style={{ background: `linear-gradient(180deg,${C.surface} 0%,${C.base} 100%)`, padding: "120px clamp(32px,8vw,120px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.14, pointerEvents: "none" }}>
        <img src="/images/lifestyle-nightclub.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.4) saturate(0.3)" }} />
      </div>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <Rev><div style={{ fontFamily: "'DM Sans',system-ui", fontSize: 11, fontWeight: 700, letterSpacing: "0.6em", textTransform: "uppercase", color: C.volt, marginBottom: 20 }}>Distribution</div>
          <h2 style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(44px,6vw,80px)", fontWeight: 400, lineHeight: 0.92, letterSpacing: "0.03em", color: C.white, marginBottom: 56 }}>Find Pronto<br />Everywhere.</h2></Rev>
        <div className="retail-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 2 }}>
          {channels.map((ch, i) => (<Rev key={ch.title} d={0.06 * i}><div style={{ background: C.dark, padding: "48px 40px", position: "relative", overflow: "hidden", borderLeft: `2px solid ${i % 2 === 0 ? C.volt : C.glacier}` }}>
            <div style={{ fontFamily: "'DM Sans',system-ui", fontSize: 11, fontWeight: 700, letterSpacing: "0.45em", textTransform: "uppercase", color: C.volt, marginBottom: 16 }}>0{i + 1}</div>
            <div style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 28, letterSpacing: "0.03em", color: C.white, marginBottom: 12 }}>{ch.title}</div>
            <p style={{ fontFamily: "'DM Sans',system-ui", fontSize: 14, fontWeight: 300, lineHeight: 1.8, color: C.muted, marginBottom: 28 }}>{ch.desc}</p>
            <button style={{ fontFamily: "'DM Sans',system-ui", fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: C.volt, background: "transparent", border: `1px solid ${C.volt}20`, padding: "10px 24px", cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={e => { e.currentTarget.style.background = `${C.volt}0c`; e.currentTarget.style.borderColor = C.volt }} onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = `${C.volt}20` }}>{ch.cta} →</button>
          </div></Rev>))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function ClosingCTA() {
  return (
    <section style={{ background: C.dark, padding: "160px clamp(32px,8vw,120px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.14, pointerEvents: "none" }}>
        <img src="/images/lifestyle-festival.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.4) saturate(0.3)" }} />
      </div>
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 55% 50%,${C.voltGlow},transparent 45%),radial-gradient(ellipse at 35% 50%,${C.glacierGlow},transparent 45%)` }} />
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
        <Rev>
          <div style={{ fontFamily: "'DM Sans',system-ui", fontSize: 11, fontWeight: 700, letterSpacing: "0.7em", textTransform: "uppercase", color: C.volt, marginBottom: 28 }}>No Crash. No Excuse.</div>
          <h2 style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(64px,10vw,160px)", fontWeight: 400, lineHeight: 0.88, letterSpacing: "0.03em", color: C.white, marginBottom: 28 }}>GO.<br /><span style={{ background: `linear-gradient(135deg,${C.volt},${C.glacier})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>PRONTO.</span></h2>
          <p style={{ fontFamily: "'DM Sans',system-ui", fontSize: 17, fontWeight: 300, lineHeight: 1.9, color: C.muted, maxWidth: 480, margin: "0 auto 48px" }}>Six flavors. Zero sugar. Clean energy for the ones who will not accept a compromise.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{ fontFamily: "'DM Sans',system-ui", fontSize: 13, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: C.dark, background: C.volt, border: "none", padding: "16px 56px", cursor: "pointer", transition: "all 0.4s" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 16px 48px ${C.volt}40` }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none" }}>Shop Pronto</button>
            <button style={{ fontFamily: "'DM Sans',system-ui", fontSize: 13, fontWeight: 400, letterSpacing: "0.16em", textTransform: "uppercase", color: C.white, background: "transparent", border: `1px solid ${C.dim}`, padding: "16px 44px", cursor: "pointer" }}>Wholesale</button>
          </div>
        </Rev>
      </div>
    </section>
  );
}

/* ─── NAV ─── */
function Nav() {
  const [s, setS] = useState(false);
  useEffect(() => { const h = () => setS(window.scrollY > 80); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h) }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999, padding: s ? "10px clamp(24px,6vw,80px)" : "24px clamp(24px,6vw,80px)", display: "flex", justifyContent: "space-between", alignItems: "center", background: s ? `${C.base}f0` : "transparent", backdropFilter: s ? "blur(32px) saturate(1.3)" : "none", borderBottom: s ? `1px solid ${C.border}` : "none", transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src="/images/pronto-logo.png" alt="Pronto Energy" style={{ height: 28, width: "auto", objectFit: "contain" }} />
      </div>
      <div style={{ display: "flex", gap: "clamp(14px,2.5vw,36px)", alignItems: "center" }}>
        {["Flavors", "Science", "Partners"].map(n => (<a key={n} href={`#${n.toLowerCase()}`} className="nav-link-hide" style={{ fontFamily: "'DM Sans',system-ui", fontSize: 11, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: C.muted, textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={e => (e.target as HTMLElement).style.color = C.white} onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(217,222,229,0.45)"}>{n}</a>))}
        <button style={{ fontFamily: "'DM Sans',system-ui", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: C.dark, background: C.volt, border: "none", padding: "9px 24px", cursor: "pointer" }}>Get Pronto</button>
      </div>
    </nav>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (<footer style={{ background: C.dark, borderTop: `1px solid ${C.border}`, padding: "64px clamp(32px,8vw,120px) 40px" }}>
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.5fr repeat(3,1fr)", gap: 48, marginBottom: 56 }}>
        <div><div style={{ marginBottom: 16 }}><img src="/images/pronto-logo.png" alt="Pronto Energy" style={{ height: 32, width: "auto", objectFit: "contain" }} /></div><p style={{ fontFamily: "'DM Sans',system-ui", fontSize: 15, fontWeight: 300, lineHeight: 1.8, color: C.muted }}>Premium energy for performers.<br />No crash. No compromise.</p></div>
        {[{ h: "Flavors", l: ["Blue Vanilla Ice", "Dragonfruit", "Matcha", "Original", "Strawburst", "White Pineapple"] }, { h: "Business", l: ["Wholesale", "Retail", "Hospitality", "Distributor", "Partnerships"] }, { h: "Company", l: ["About", "The Science", "Certifications", "Press", "A KHG Brand"] }].map(col => (<div key={col.h}><div style={{ fontFamily: "'DM Sans',system-ui", fontSize: 10, fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase", color: C.volt, marginBottom: 18 }}>{col.h}</div><ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>{col.l.map(item => <li key={item} style={{ fontFamily: "'DM Sans',system-ui", fontSize: 12, fontWeight: 300, color: C.muted, cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={e => (e.target as HTMLElement).style.color = C.white} onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(217,222,229,0.45)"}>{item}</li>)}</ul></div>))}
      </div>
      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}><div style={{ fontFamily: "'DM Sans',system-ui", fontSize: 10, fontWeight: 300, color: "rgba(255,255,255,0.12)" }}>© 2026 Pronto Energy. A Kollective Hospitality Group Brand.</div><div style={{ display: "flex", gap: 24 }}>{["Privacy", "Terms", "Contact"].map(i => <span key={i} style={{ fontFamily: "'DM Sans',system-ui", fontSize: 10, fontWeight: 300, color: "rgba(255,255,255,0.12)", cursor: "pointer" }}>{i}</span>)}</div></div>
    </div>
  </footer>);
}

export default function ProntoV7() {
  return (
    <div style={{ background: C.base, overflowX: "hidden" }}>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');
@media(max-width:1024px){.elemental-grid{grid-template-columns:repeat(3,1fr)!important}.products-grid{grid-template-columns:repeat(3,1fr)!important}}
@media(max-width:768px){.elemental-grid{grid-template-columns:repeat(2,1fr)!important}.products-grid{grid-template-columns:repeat(2,1fr)!important}.science-grid{grid-template-columns:1fr!important}.retail-grid{grid-template-columns:1fr!important}.footer-grid{grid-template-columns:1fr!important}.nav-link-hide{display:none}}
      `}</style>
      <Nav />
      <VideoIntroHero />
      <LifestyleHero />
      <ElementalHeroes />
      <BeachBreak />
      <Products />
      <TripleLifestyle />
      <TheScience />
      <ConsumerStrip />
      <Retail />
      <ClosingCTA />
      <Footer />
    </div>
  );
}
