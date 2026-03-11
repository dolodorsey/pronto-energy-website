"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

/* ─────────────── DATA ─────────────── */
const FLAVORS = [
  { name: "DRAGONFRUIT", tagline: "Ignite the Night", color: "#C82424", img: "/images/product-dragonfruit.png", hero: "/images/hero-dragonfruit-fire.png" },
  { name: "BLUE VANILLA ICE", tagline: "Frost the Competition", color: "#1E5A9E", img: "/images/product-bluevanilla.png", hero: "/images/lifestyle-jet-1.png" },
  { name: "MATCHA", tagline: "Calm Fury", color: "#4CAF50", img: "/images/product-matcha.png", hero: "/images/product-matcha.png" },
  { name: "ORIGINAL", tagline: "Pure Voltage", color: "#E5C14A", img: "/images/product-original.png", hero: "/images/hero-brand-energy.png" },
  { name: "STRAWBURST", tagline: "Launch Sequence", color: "#D94878", img: "/images/product-strawburst.png", hero: "/images/product-strawburst.png" },
];

const LIFESTYLE = [
  { img: "/images/lifestyle-festival.png", label: "FESTIVALS", sub: "Main stage energy" },
  { img: "/images/lifestyle-jet-2.png", label: "ALTITUDE", sub: "35,000 ft focus" },
  { img: "/images/lifestyle-car.png", label: "VELOCITY", sub: "Cockpit companion" },
  { img: "/images/lifestyle-gym.png", label: "TRAINING", sub: "Zero sugar. Max output." },
  { img: "/images/lifestyle-nightclub.png", label: "NIGHTLIFE", sub: "Bar-top presence" },
  { img: "/images/lifestyle-stadium.png", label: "GAME DAY", sub: "Suite-level moments" },
  { img: "/images/lifestyle-beach.png", label: "COASTLINE", sub: "Squad approved" },
];

/* ─────────────── HOOKS ─────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useMouseParallax(intensity = 0.02) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setOffset({ x: (e.clientX - cx) * intensity, y: (e.clientY - cy) * intensity });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [intensity]);
  return offset;
}

/* ─────────────── COMPONENTS ─────────────── */

function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setProgress(p => { if (p >= 100) { clearInterval(iv); setTimeout(onDone, 400); return 100; } return p + 2; }), 30);
    return () => clearInterval(iv);
  }, [onDone]);
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999, background: "#0A0B0E",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      transition: "opacity 0.6s", opacity: progress >= 100 ? 0 : 1, pointerEvents: progress >= 100 ? "none" : "auto"
    }}>
      <div style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(48px, 10vw, 120px)", color: "#C82424", letterSpacing: "0.15em", lineHeight: 1 }}>
        PRONTO
      </div>
      <div style={{ width: 200, height: 2, background: "#1A1D22", marginTop: 24, borderRadius: 1, overflow: "hidden" }}>
        <div style={{ width: `${progress}%`, height: "100%", background: "#C82424", transition: "width 0.1s" }} />
      </div>
      <div style={{ fontFamily: "'DM Mono'", fontSize: 11, color: "#B7BCC5", marginTop: 12, letterSpacing: "0.2em" }}>
        {progress}%
      </div>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? "12px 32px" : "20px 40px",
        background: scrolled ? "rgba(10,11,14,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(200,36,36,0.15)" : "none",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)"
      }}>
        <div style={{ fontFamily: "'Bebas Neue'", fontSize: 28, color: "#C82424", letterSpacing: "0.12em", cursor: "pointer" }}>
          PRONTO<span style={{ color: "#E5C14A", fontSize: 14, verticalAlign: "super", marginLeft: 2 }}>&#9889;</span>
        </div>
        <div className="nav-links" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["FLAVORS", "LIFESTYLE", "FUEL"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              fontFamily: "'DM Mono'", fontSize: 11, color: "#B7BCC5", textDecoration: "none",
              letterSpacing: "0.2em", transition: "color 0.3s"
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#C82424")}
            onMouseLeave={e => (e.currentTarget.style.color = "#B7BCC5")}
            >{l}</a>
          ))}
          <button style={{
            fontFamily: "'DM Mono'", fontSize: 11, letterSpacing: "0.15em",
            background: "#C82424", color: "#F3F5F7", border: "none", padding: "10px 24px",
            cursor: "pointer", transition: "all 0.3s"
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#E5C14A"; e.currentTarget.style.color = "#0A0B0E"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#C82424"; e.currentTarget.style.color = "#F3F5F7"; }}
          >GET PRONTO</button>
        </div>
        <button className="nav-burger" onClick={() => setMenuOpen(!menuOpen)} style={{
          display: "none", background: "none", border: "none", cursor: "pointer", padding: 8
        }}>
          <div style={{ width: 24, height: 2, background: "#C82424", marginBottom: 6, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(3px,3px)" : "none" }} />
          <div style={{ width: 24, height: 2, background: "#C82424", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <div style={{ width: 24, height: 2, background: "#C82424", marginTop: 6, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(3px,-3px)" : "none" }} />
        </button>
      </nav>
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99, background: "rgba(10,11,14,0.98)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32
        }}>
          {["FLAVORS", "LIFESTYLE", "FUEL"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{
              fontFamily: "'Bebas Neue'", fontSize: 48, color: "#F3F5F7", textDecoration: "none", letterSpacing: "0.1em"
            }}>{l}</a>
          ))}
        </div>
      )}
      <style>{`
        @media(max-width:768px){
          .nav-links{display:none !important}
          .nav-burger{display:block !important}
        }
      `}</style>
    </>
  );
}

/* --- SCREEN 1: HERO --- */
function HeroSection({ loaded }: { loaded: boolean }) {
  const mouse = useMouseParallax(0.015);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (loaded && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [loaded]);

  return (
    <section style={{
      position: "relative", height: "100vh", overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <video ref={videoRef} muted loop playsInline style={{
        position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.3,
        transform: `translate(${mouse.x}px, ${mouse.y}px) scale(1.05)`
      }}>
        <source src="/videos/pronto-hero.mp4" type="video/mp4" />
      </video>

      <div style={{
        position: "absolute", inset: 0, opacity: 0.06,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "128px"
      }} />

      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, transparent 30%, #0A0B0E 80%)"
      }} />

      <div style={{
        position: "absolute", width: 500, height: 500,
        background: "radial-gradient(circle, rgba(200,36,36,0.25) 0%, transparent 70%)",
        top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        filter: "blur(60px)", animation: "pulse 4s ease-in-out infinite"
      }} />

      <div style={{
        position: "relative", zIndex: 10, textAlign: "center",
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)",
        transition: "all 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s"
      }}>
        <div style={{
          fontFamily: "'DM Mono'", fontSize: 11, letterSpacing: "0.4em", color: "#E5C14A",
          marginBottom: 24, opacity: loaded ? 1 : 0, transition: "opacity 0.8s 0.6s"
        }}>
          ENERGY DRINK &mdash; 200MG CAFFEINE &mdash; ZERO SUGAR
        </div>

        <h1 style={{
          fontFamily: "'Bebas Neue'", fontSize: "clamp(72px, 14vw, 200px)",
          color: "#F3F5F7", letterSpacing: "0.08em", lineHeight: 0.9,
          textShadow: "0 0 80px rgba(200,36,36,0.4)"
        }}>
          PRONTO
        </h1>

        <p style={{
          fontFamily: "'DM Sans'", fontSize: "clamp(14px, 1.8vw, 20px)",
          color: "#B7BCC5", marginTop: 16, fontWeight: 300, maxWidth: 500, margin: "16px auto 0",
          lineHeight: 1.6
        }}>
          Fuel for the ones who move first.
        </p>

        <div style={{ marginTop: 40, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#flavors" style={{
            fontFamily: "'DM Mono'", fontSize: 12, letterSpacing: "0.15em",
            background: "#C82424", color: "#F3F5F7", textDecoration: "none",
            padding: "14px 40px", display: "inline-block", transition: "all 0.3s",
            border: "1px solid #C82424"
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#C82424"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#C82424"; e.currentTarget.style.color = "#F3F5F7"; }}
          >EXPLORE FLAVORS</a>
          <a href="#fuel" style={{
            fontFamily: "'DM Mono'", fontSize: 12, letterSpacing: "0.15em",
            background: "transparent", color: "#E5C14A", textDecoration: "none",
            padding: "14px 40px", display: "inline-block", transition: "all 0.3s",
            border: "1px solid rgba(229,193,74,0.3)"
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#E5C14A"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(229,193,74,0.3)"; }}
          >WHAT&#39;S INSIDE</a>
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        opacity: loaded ? 0.5 : 0, transition: "opacity 1s 1.5s"
      }}>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #C82424, transparent)", animation: "scrollPulse 2s ease-in-out infinite" }} />
        <span style={{ fontFamily: "'DM Mono'", fontSize: 9, letterSpacing: "0.3em", color: "#B7BCC5" }}>SCROLL</span>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:0.6;transform:translate(-50%,-50%) scale(1)} 50%{opacity:1;transform:translate(-50%,-50%) scale(1.15)} }
        @keyframes scrollPulse { 0%,100%{opacity:0.3} 50%{opacity:0.8} }
      `}</style>
    </section>
  );
}

/* --- SCREEN 2: THESIS --- */
function ThesisSection() {
  const { ref, visible } = useInView();
  return (
    <section ref={ref} style={{
      padding: "clamp(80px, 12vw, 160px) clamp(24px, 6vw, 120px)",
      position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", right: "-10%", top: "10%", width: 400, height: 400,
        background: "radial-gradient(circle, rgba(200,36,36,0.08) 0%, transparent 70%)",
        filter: "blur(80px)"
      }} />

      <div style={{ maxWidth: 900, position: "relative" }}>
        <div style={{
          fontFamily: "'DM Mono'", fontSize: 11, letterSpacing: "0.3em", color: "#C82424",
          marginBottom: 32,
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)"
        }}>
          THE THESIS
        </div>

        <h2 style={{
          fontFamily: "'Bebas Neue'", fontSize: "clamp(36px, 6vw, 80px)",
          color: "#F3F5F7", lineHeight: 1.05, letterSpacing: "0.04em",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s"
        }}>
          ENERGY DRINKS WEREN&#39;T BUILT FOR{" "}
          <span style={{ color: "#C82424" }}>TASTE</span>.{" "}
          WE CHANGED THAT.
        </h2>

        <p style={{
          fontFamily: "'DM Sans'", fontSize: "clamp(15px, 1.5vw, 19px)",
          color: "#B7BCC5", lineHeight: 1.7, maxWidth: 640, marginTop: 32, fontWeight: 300,
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s"
        }}>
          200mg of clean caffeine. Zero sugar. Five flavors that don&#39;t taste like a chemistry experiment.
          Pronto is the energy drink for people who have places to be, stages to command, and standards to keep.
        </p>

        <div style={{
          display: "flex", gap: 48, marginTop: 48, flexWrap: "wrap",
          opacity: visible ? 1 : 0, transition: "opacity 0.8s 0.4s"
        }}>
          {[
            { num: "200", unit: "MG", label: "CLEAN CAFFEINE" },
            { num: "0", unit: "G", label: "SUGAR" },
            { num: "5", unit: "", label: "FLAVORS" },
            { num: "10", unit: "", label: "CALORIES" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 48, color: "#F3F5F7", lineHeight: 1 }}>
                {s.num}<span style={{ fontSize: 20, color: "#E5C14A" }}>{s.unit}</span>
              </div>
              <div style={{ fontFamily: "'DM Mono'", fontSize: 10, color: "#B7BCC5", letterSpacing: "0.2em", marginTop: 4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- SCREEN 3: FLAVOR WALL (Kinetic Burst Signature Interaction) --- */
function FlavorWall() {
  const { ref, visible } = useInView(0.1);
  const [active, setActive] = useState(0);
  const [burst, setBurst] = useState(false);

  const switchFlavor = useCallback((i: number) => {
    if (i === active) return;
    setBurst(true);
    setTimeout(() => { setActive(i); setBurst(false); }, 300);
  }, [active]);

  const flavor = FLAVORS[active];

  return (
    <section id="flavors" ref={ref} style={{
      minHeight: "100vh", position: "relative", overflow: "hidden",
      padding: "clamp(60px, 8vw, 120px) 0"
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 50% 50%, ${flavor.color}15 0%, transparent 60%)`,
        transition: "background 0.6s"
      }} />

      <div style={{
        textAlign: "center", marginBottom: 60, position: "relative", zIndex: 5,
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)"
      }}>
        <div style={{ fontFamily: "'DM Mono'", fontSize: 11, letterSpacing: "0.3em", color: "#C82424", marginBottom: 16 }}>
          THE LINEUP
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(40px, 7vw, 90px)", color: "#F3F5F7", letterSpacing: "0.06em" }}>
          FIVE WAYS TO <span style={{ color: "#E5C14A" }}>MOVE</span>
        </h2>
      </div>

      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: "clamp(24px, 5vw, 80px)", maxWidth: 1200, margin: "0 auto",
        padding: "0 24px", position: "relative", zIndex: 5, flexWrap: "wrap"
      }}>
        <div style={{
          position: "relative", width: "clamp(280px, 30vw, 400px)", aspectRatio: "3/4",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          {[1, 2, 3].map(r => (
            <div key={r} style={{
              position: "absolute", width: `${150 + r * 60}px`, height: `${150 + r * 60}px`,
              border: `1px solid ${flavor.color}`,
              borderRadius: "50%", top: "50%", left: "50%",
              transform: `translate(-50%, -50%) scale(${burst ? 1.5 : 1})`,
              opacity: burst ? 0 : 0.15,
              transition: `all ${0.4 + r * 0.1}s cubic-bezier(0.16,1,0.3,1)`
            }} />
          ))}

          <div style={{
            position: "absolute", width: 300, height: 300,
            background: `radial-gradient(circle, ${flavor.color}40 0%, transparent 70%)`,
            top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            filter: "blur(40px)", transition: "background 0.6s"
          }} />

          <div style={{
            position: "relative", width: "80%", height: "80%",
            transform: burst ? "scale(0.85) rotate(-5deg)" : "scale(1) rotate(0deg)",
            transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
            filter: `drop-shadow(0 20px 40px ${flavor.color}60)`
          }}>
            <Image src={flavor.img} alt={flavor.name} fill style={{ objectFit: "contain" }} sizes="400px" />
          </div>
        </div>

        <div style={{ maxWidth: 400 }}>
          <div style={{
            fontFamily: "'DM Mono'", fontSize: 11, letterSpacing: "0.3em",
            color: flavor.color, marginBottom: 12, transition: "color 0.6s"
          }}>
            {String(active + 1).padStart(2, "0")} / {String(FLAVORS.length).padStart(2, "0")}
          </div>
          <h3 style={{
            fontFamily: "'Bebas Neue'", fontSize: "clamp(36px, 5vw, 64px)",
            color: "#F3F5F7", letterSpacing: "0.06em", lineHeight: 1,
            opacity: burst ? 0 : 1, transform: burst ? "translateY(10px)" : "translateY(0)",
            transition: "all 0.3s"
          }}>
            {flavor.name}
          </h3>
          <p style={{
            fontFamily: "'DM Sans'", fontSize: 16, color: "#B7BCC5", marginTop: 12,
            fontWeight: 300, lineHeight: 1.6,
            opacity: burst ? 0 : 1, transition: "opacity 0.3s"
          }}>
            {flavor.tagline}
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            {FLAVORS.map((f, i) => (
              <button key={i} onClick={() => switchFlavor(i)} style={{
                width: 40, height: 40, borderRadius: "50%",
                background: i === active ? f.color : `${f.color}30`,
                border: i === active ? `2px solid ${f.color}` : "2px solid transparent",
                cursor: "pointer", transition: "all 0.3s",
                transform: i === active ? "scale(1.15)" : "scale(1)"
              }}
              onMouseEnter={e => { if (i !== active) e.currentTarget.style.transform = "scale(1.1)"; }}
              onMouseLeave={e => { if (i !== active) e.currentTarget.style.transform = "scale(1)"; }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- SCREEN 4: VIDEO SHOWCASE --- */
function VideoShowcase() {
  const { ref, visible } = useInView(0.1);
  return (
    <section ref={ref} style={{
      padding: "clamp(60px, 8vw, 120px) clamp(24px, 6vw, 80px)",
      position: "relative"
    }}>
      <div style={{
        textAlign: "center", marginBottom: 48,
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)"
      }}>
        <div style={{ fontFamily: "'DM Mono'", fontSize: 11, letterSpacing: "0.3em", color: "#C82424", marginBottom: 16 }}>
          IN MOTION
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(36px, 6vw, 72px)", color: "#F3F5F7", letterSpacing: "0.06em" }}>
          SEE THE <span style={{ color: "#E5C14A" }}>ENERGY</span>
        </h2>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 500px), 1fr))",
        gap: 24, maxWidth: 1200, margin: "0 auto"
      }}>
        {[
          { src: "/videos/pronto-hero.mp4", label: "BRAND ANIMATION" },
          { src: "/videos/strawburst.mp4", label: "STRAWBURST LAUNCH" },
        ].map((v, i) => (
          <div key={i} style={{
            position: "relative", borderRadius: 2, overflow: "hidden",
            aspectRatio: "16/9", background: "#0D0F12",
            border: "1px solid rgba(200,36,36,0.1)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.15}s`
          }}>
            <video muted loop playsInline autoPlay style={{
              width: "100%", height: "100%", objectFit: "cover"
            }}>
              <source src={v.src} type="video/mp4" />
            </video>
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(transparent, rgba(10,11,14,0.9))",
              padding: "40px 24px 20px"
            }}>
              <span style={{ fontFamily: "'DM Mono'", fontSize: 11, letterSpacing: "0.2em", color: "#E5C14A" }}>
                {v.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --- SCREEN 5: LIFESTYLE GRID --- */
function LifestyleGrid() {
  const { ref, visible } = useInView(0.05);
  return (
    <section id="lifestyle" ref={ref} style={{
      padding: "clamp(60px, 8vw, 120px) clamp(24px, 6vw, 80px)",
      position: "relative"
    }}>
      <div style={{
        textAlign: "center", marginBottom: 60,
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)"
      }}>
        <div style={{ fontFamily: "'DM Mono'", fontSize: 11, letterSpacing: "0.3em", color: "#C82424", marginBottom: 16 }}>
          EVERYWHERE THAT MATTERS
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(36px, 6vw, 72px)", color: "#F3F5F7", letterSpacing: "0.06em" }}>
          WHERE PRONTO <span style={{ color: "#E5C14A" }}>LIVES</span>
        </h2>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
        gap: 16, maxWidth: 1400, margin: "0 auto"
      }}>
        {LIFESTYLE.map((item, i) => (
          <div key={i} style={{
            position: "relative", overflow: "hidden", aspectRatio: i === 0 ? "4/5" : i < 3 ? "3/4" : "1/1",
            cursor: "pointer", gridRow: i === 0 ? "span 2" : undefined,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`
          }}
          onMouseEnter={e => {
            const img = e.currentTarget.querySelector("img") as HTMLElement;
            if (img) img.style.transform = "scale(1.08)";
            const overlay = e.currentTarget.querySelector(".ls-overlay") as HTMLElement;
            if (overlay) overlay.style.opacity = "1";
          }}
          onMouseLeave={e => {
            const img = e.currentTarget.querySelector("img") as HTMLElement;
            if (img) img.style.transform = "scale(1)";
            const overlay = e.currentTarget.querySelector(".ls-overlay") as HTMLElement;
            if (overlay) overlay.style.opacity = "0.7";
          }}
          >
            <Image src={item.img} alt={item.label} fill style={{ objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }} sizes="400px" />
            <div className="ls-overlay" style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(transparent 40%, rgba(10,11,14,0.85))",
              display: "flex", flexDirection: "column", justifyContent: "flex-end",
              padding: 24, transition: "opacity 0.4s", opacity: 0.7
            }}>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 28, color: "#F3F5F7", letterSpacing: "0.06em" }}>
                {item.label}
              </div>
              <div style={{ fontFamily: "'DM Mono'", fontSize: 10, color: "#B7BCC5", letterSpacing: "0.2em", marginTop: 4 }}>
                {item.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --- SCREEN 6: FUEL SPECS --- */
function FuelSection() {
  const { ref, visible } = useInView();
  return (
    <section id="fuel" ref={ref} style={{
      padding: "clamp(80px, 10vw, 160px) clamp(24px, 6vw, 120px)",
      position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", top: 0, left: "50%", width: 1, height: "100%",
        background: "linear-gradient(to bottom, transparent, rgba(200,36,36,0.1), transparent)"
      }} />

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 500px), 1fr))",
        gap: "clamp(40px, 6vw, 80px)", maxWidth: 1200, margin: "0 auto", position: "relative"
      }}>
        <div style={{
          opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-30px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)"
        }}>
          <div style={{ fontFamily: "'DM Mono'", fontSize: 11, letterSpacing: "0.3em", color: "#C82424", marginBottom: 24 }}>
            WHAT&#39;S INSIDE
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(36px, 5vw, 64px)", color: "#F3F5F7", lineHeight: 1.05, letterSpacing: "0.04em" }}>
            CLEAN INGREDIENTS.{" "}
            <span style={{ color: "#E5C14A" }}>NO COMPROMISE.</span>
          </h2>
          <p style={{
            fontFamily: "'DM Sans'", fontSize: 16, color: "#B7BCC5", lineHeight: 1.7,
            marginTop: 24, fontWeight: 300
          }}>
            Every can of Pronto is engineered for sustained energy without the crash.
            No artificial colors. No sugar. No BS. Just clean fuel for people who don&#39;t have time to slow down.
          </p>
        </div>

        <div style={{
          display: "flex", flexDirection: "column", gap: 16,
          opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(30px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s"
        }}>
          {[
            { ingredient: "CAFFEINE", amount: "200mg", desc: "Natural clean energy source" },
            { ingredient: "TAURINE", amount: "1000mg", desc: "Amino acid for endurance" },
            { ingredient: "B-VITAMINS", amount: "Complex", desc: "B3, B6, B12 for metabolism" },
            { ingredient: "L-CARNITINE", amount: "500mg", desc: "Fat-to-fuel conversion" },
            { ingredient: "SUGAR", amount: "0g", desc: "Sweetened with sucralose" },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "16px 0",
              borderBottom: "1px solid rgba(183,188,197,0.08)"
            }}>
              <div>
                <div style={{ fontFamily: "'DM Mono'", fontSize: 12, color: "#F3F5F7", letterSpacing: "0.15em" }}>
                  {item.ingredient}
                </div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#B7BCC5", marginTop: 2, fontWeight: 300 }}>
                  {item.desc}
                </div>
              </div>
              <div style={{
                fontFamily: "'Bebas Neue'", fontSize: 28, color: "#C82424", minWidth: 80, textAlign: "right"
              }}>
                {item.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- SCREEN 7: FULL LINEUP HERO --- */
function LineupHero() {
  const { ref, visible } = useInView(0.1);
  return (
    <section ref={ref} style={{
      padding: "clamp(80px, 10vw, 140px) clamp(24px, 6vw, 80px)",
      textAlign: "center", position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
        background: "linear-gradient(to right, transparent, rgba(229,193,74,0.2), transparent)"
      }} />

      <div style={{
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)"
      }}>
        <div style={{ fontFamily: "'DM Mono'", fontSize: 11, letterSpacing: "0.3em", color: "#E5C14A", marginBottom: 16 }}>
          THE FULL LINEUP
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(36px, 6vw, 72px)", color: "#F3F5F7", letterSpacing: "0.06em" }}>
          FIND YOUR FLAVOR
        </h2>
      </div>

      <div style={{
        display: "flex", justifyContent: "center", gap: "clamp(16px, 3vw, 40px)",
        marginTop: 60, flexWrap: "wrap", maxWidth: 1200, margin: "60px auto 0"
      }}>
        {FLAVORS.map((f, i) => (
          <div key={i} style={{
            position: "relative", width: "clamp(140px, 15vw, 200px)", textAlign: "center",
            cursor: "pointer",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.1}s`
          }}
          onMouseEnter={e => {
            const img = e.currentTarget.querySelector(".lineup-can") as HTMLElement;
            if (img) img.style.transform = "translateY(-12px) scale(1.05)";
          }}
          onMouseLeave={e => {
            const img = e.currentTarget.querySelector(".lineup-can") as HTMLElement;
            if (img) img.style.transform = "translateY(0) scale(1)";
          }}
          >
            <div style={{
              position: "absolute", bottom: "30%", left: "50%", width: 100, height: 100,
              background: `radial-gradient(circle, ${f.color}30 0%, transparent 70%)`,
              transform: "translate(-50%, 0)", filter: "blur(20px)"
            }} />
            <div className="lineup-can" style={{
              position: "relative", width: "100%", aspectRatio: "3/5",
              transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)"
            }}>
              <Image src={f.img} alt={f.name} fill style={{ objectFit: "contain" }} sizes="200px" />
            </div>
            <div style={{
              fontFamily: "'DM Mono'", fontSize: 10, letterSpacing: "0.15em",
              color: "#B7BCC5", marginTop: 16
            }}>
              {f.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --- SCREEN 8: CTA / CONVERSION CLOSE --- */
function CTASection() {
  const { ref, visible } = useInView();
  return (
    <section ref={ref} style={{
      padding: "clamp(80px, 12vw, 180px) clamp(24px, 6vw, 80px)",
      textAlign: "center", position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", width: 600, height: 600,
        background: "radial-gradient(circle, rgba(200,36,36,0.15) 0%, transparent 60%)",
        top: "50%", left: "50%", transform: "translate(-50%, -50%)", filter: "blur(80px)"
      }} />

      <div style={{
        position: "relative", zIndex: 5,
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)"
      }}>
        <h2 style={{
          fontFamily: "'Bebas Neue'", fontSize: "clamp(48px, 10vw, 140px)",
          color: "#F3F5F7", letterSpacing: "0.06em", lineHeight: 0.95
        }}>
          READY WHEN<br />
          <span style={{ color: "#C82424" }}>YOU ARE</span>
        </h2>

        <p style={{
          fontFamily: "'DM Sans'", fontSize: "clamp(14px, 1.5vw, 18px)",
          color: "#B7BCC5", maxWidth: 500, margin: "24px auto 0", fontWeight: 300, lineHeight: 1.6
        }}>
          Find Pronto at select retailers, events, and everywhere the energy needs to be elite.
        </p>

        <div style={{ marginTop: 40, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{
            fontFamily: "'DM Mono'", fontSize: 13, letterSpacing: "0.15em",
            background: "#C82424", color: "#F3F5F7", border: "none",
            padding: "16px 48px", cursor: "pointer", transition: "all 0.3s"
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#E5C14A"; e.currentTarget.style.color = "#0A0B0E"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#C82424"; e.currentTarget.style.color = "#F3F5F7"; }}
          >FIND A RETAILER</button>

          <button style={{
            fontFamily: "'DM Mono'", fontSize: 13, letterSpacing: "0.15em",
            background: "transparent", color: "#F3F5F7",
            border: "1px solid rgba(183,188,197,0.2)",
            padding: "16px 48px", cursor: "pointer", transition: "all 0.3s"
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#C82424"; e.currentTarget.style.color = "#C82424"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(183,188,197,0.2)"; e.currentTarget.style.color = "#F3F5F7"; }}
          >WHOLESALE INQUIRY</button>
        </div>
      </div>
    </section>
  );
}

/* --- FOOTER --- */
function Footer() {
  return (
    <footer style={{
      padding: "48px clamp(24px, 6vw, 80px)",
      borderTop: "1px solid rgba(200,36,36,0.1)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: 24
    }}>
      <div style={{ fontFamily: "'Bebas Neue'", fontSize: 20, color: "#C82424", letterSpacing: "0.1em" }}>
        PRONTO ENERGY<span style={{ color: "#E5C14A", fontSize: 12, verticalAlign: "super", marginLeft: 2 }}>&#9889;</span>
      </div>
      <div style={{ fontFamily: "'DM Mono'", fontSize: 10, color: "#B7BCC5", letterSpacing: "0.15em" }}>
        A KOLLECTIVE HOSPITALITY GROUP BRAND
      </div>
      <div style={{ fontFamily: "'DM Mono'", fontSize: 10, color: "rgba(183,188,197,0.4)", letterSpacing: "0.15em" }}>
        &#169; {new Date().getFullYear()} PRONTO ENERGY
      </div>
    </footer>
  );
}

/* --- CURSOR GLOW --- */
function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return (
    <div ref={glowRef} style={{
      position: "fixed", width: 400, height: 400, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(200,36,36,0.04) 0%, transparent 70%)",
      pointerEvents: "none", zIndex: 0,
      transform: "translate(-50%, -50%)", transition: "left 0.15s, top 0.15s"
    }} />
  );
}

/* ─────────────── MAIN PAGE ─────────────── */
export default function ProntoHome() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Preloader onDone={() => setLoaded(true)} />
      <CursorGlow />
      <Navbar />
      <main>
        <HeroSection loaded={loaded} />
        <ThesisSection />
        <FlavorWall />
        <VideoShowcase />
        <LifestyleGrid />
        <FuelSection />
        <LineupHero />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
