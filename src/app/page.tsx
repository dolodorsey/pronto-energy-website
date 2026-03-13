"use client";
import type { ReactNode } from "react";
import { useState, useEffect, useRef, MutableRefObject } from "react";

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const C = {
  base:      "#080808",
  deep:      "#050505",
  surface:   "#0f0f0f",
  panel:     "rgba(255,255,255,0.03)",
  border:    "rgba(255,255,255,0.07)",
  red:       "#d42020",
  redDeep:   "#8a0e0e",
  redGlow:   "rgba(212,32,32,0.14)",
  green:     "#1a7a1a",
  greenBright:"#22c55e",
  greenGlow: "rgba(34,197,94,0.12)",
  cream:     "#f0ece4",
  muted:     "rgba(255,255,255,0.48)",
  dim:       "rgba(255,255,255,0.22)",
  border2:   "rgba(255,255,255,0.06)",
};
const F = {
  serif: "'Cormorant Garamond','Playfair Display',Georgia,serif",
  sans:  "'DM Sans','Inter',system-ui,sans-serif",
};

function useInView(t = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    o.observe(el); return () => o.disconnect();
  }, []);
  return [ref, v];
}
function Reveal({ children, d = 0 }) {
  const [ref, v] = useInView();
  return <div ref={ref} style={{ transform: v ? "translateY(0)" : "translateY(32px)", opacity: v ? 1 : 0, transition: `all 0.9s cubic-bezier(0.16,1,0.3,1) ${d}s` }}>{children}</div>;
}
const Grain = ({ o = 0.04 }) => (
  <div style={{ position:"absolute", inset:0, opacity:o, pointerEvents:"none", backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
);

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [s, setS] = useState(false);
  useEffect(() => { const h=()=>setS(window.scrollY>60); window.addEventListener("scroll",h,{passive:true}); return ()=>window.removeEventListener("scroll",h); },[]);
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, padding:s?"14px clamp(24px,4vw,64px)":"26px clamp(24px,4vw,64px)", display:"flex", justifyContent:"space-between", alignItems:"center", background:s?"rgba(8,8,8,0.96)":"transparent", backdropFilter:s?"blur(28px)":"none", borderBottom:s?`1px solid ${C.border}`:"none", transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
        {/* Logo mark */}
        <div style={{ width:"8px", height:"28px", background:`linear-gradient(180deg, ${C.red}, ${C.green})`, borderRadius:"4px" }}/>
        <div>
          <div style={{ fontFamily:F.sans, fontSize:"7px", letterSpacing:"0.5em", textTransform:"uppercase", color:C.red, marginBottom:"2px" }}>Premium Energy</div>
          <span style={{ fontFamily:F.sans, fontSize:"18px", fontWeight:800, color:C.cream, letterSpacing:"0.06em" }}>PRONTO</span>
        </div>
      </div>
      <div style={{ display:"flex", gap:"clamp(14px,2.5vw,36px)", alignItems:"center" }}>
        {["Products","Science","Retail","Partners"].map(n=>(
          <a key={n} href={`#${n.toLowerCase()}`} style={{ fontFamily:F.sans, fontSize:"10px", fontWeight:500, letterSpacing:"0.22em", textTransform:"uppercase", color:C.muted, textDecoration:"none", transition:"color 0.3s" }} onMouseEnter={e=>e.target.style.color=C.cream} onMouseLeave={e=>e.target.style.color=C.muted}>{n}</a>
        ))}
        <button style={{ fontFamily:F.sans, fontSize:"10px", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:C.cream, background:`linear-gradient(135deg,${C.red},${C.redDeep})`, border:"none", padding:"10px 28px", cursor:"pointer", transition:"all 0.3s" }} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>Get Pronto</button>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(()=>{ setTimeout(()=>setLoaded(true),80); },[]);

  const specs = ["300mg Natural Caffeine","5g Amino Blend","B-Vitamin Complex","Zero Sugar · Zero Crash","Clean Label Certified"];

  return (
    <section style={{ minHeight:"100vh", position:"relative", overflow:"hidden", background:`radial-gradient(ellipse at 75% 25%, ${C.redGlow} 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, ${C.greenGlow} 0%, transparent 55%), ${C.base}`, display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"0 clamp(32px,6vw,96px) 96px" }}>
      <Grain o={0.04}/>
      {/* Grid */}
      <div style={{ position:"absolute", inset:0, opacity:0.03, backgroundImage:"linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)", backgroundSize:"80px 80px" }}/>
      {/* Glow orbs */}
      <div style={{ position:"absolute", top:"15%", right:"6%", width:"480px", height:"480px", borderRadius:"50%", background:`radial-gradient(circle,${C.redGlow},transparent 70%)`, pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:"15%", left:"4%", width:"320px", height:"320px", borderRadius:"50%", background:`radial-gradient(circle,${C.greenGlow},transparent 70%)`, pointerEvents:"none" }}/>

      <div style={{ position:"relative", zIndex:2, maxWidth:"1400px", margin:"0 auto", width:"100%", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px", alignItems:"flex-end" }}>
        {/* Left: Copy */}
        <div>
          <div style={{ fontFamily:F.sans, fontSize:"9px", letterSpacing:"0.55em", textTransform:"uppercase", color:C.red, opacity:loaded?1:0, transition:"opacity 0.9s ease 0.3s", marginBottom:"20px" }}>
            Performance Energy · KHG Brands
          </div>
          <h1 style={{ fontFamily:F.sans, fontSize:"clamp(56px,10vw,140px)", fontWeight:900, lineHeight:0.85, letterSpacing:"-0.04em", color:C.cream, opacity:loaded?1:0, transform:loaded?"translateY(0)":"translateY(44px)", transition:"all 1.1s cubic-bezier(0.16,1,0.3,1) 0.5s" }}>
            PRON<br/>
            <span style={{ color:C.red }}>TO.</span>
          </h1>
          <p style={{ fontFamily:F.sans, fontSize:"clamp(14px,1.2vw,17px)", lineHeight:1.85, color:C.muted, maxWidth:"460px", marginTop:"28px", opacity:loaded?1:0, transition:"opacity 0.9s ease 0.9s" }}>
            Clean energy engineered for performers, creators, and operators who cannot afford a crash. No junk. No compromise. Just what you need to go.
          </p>
          <div style={{ display:"flex", gap:"16px", marginTop:"44px", opacity:loaded?1:0, transition:"opacity 0.9s ease 1.2s", flexWrap:"wrap" }}>
            <button style={{ fontFamily:F.sans, fontSize:"10px", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:C.cream, background:`linear-gradient(135deg,${C.red},${C.redDeep})`, border:"none", padding:"15px 44px", cursor:"pointer", transition:"all 0.3s" }} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>Shop Now</button>
            <button style={{ fontFamily:F.sans, fontSize:"10px", fontWeight:500, letterSpacing:"0.15em", textTransform:"uppercase", color:C.cream, background:"transparent", border:`1px solid ${C.border}`, padding:"15px 38px", cursor:"pointer", transition:"all 0.3s" }} onMouseEnter={e=>{ e.currentTarget.style.borderColor=C.red; e.currentTarget.style.color=C.red; }} onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.cream; }}>Wholesale Inquiry</button>
          </div>
        </div>

        {/* Right: Specs panel */}
        <div style={{ opacity:loaded?1:0, transition:"opacity 1s ease 1.0s" }}>
          <div style={{ padding:"48px 40px", background:C.panel, border:`1px solid ${C.border}`, position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:`linear-gradient(90deg,${C.red},${C.green})` }}/>
            <Grain o={0.02}/>
            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ fontFamily:F.sans, fontSize:"9px", fontWeight:600, letterSpacing:"0.4em", textTransform:"uppercase", color:C.red, marginBottom:"28px" }}>What's Inside</div>
              <ul style={{ listStyle:"none", padding:0, margin:"0 0 36px", display:"flex", flexDirection:"column", gap:"16px" }}>
                {specs.map(s=>(
                  <li key={s} style={{ display:"flex", alignItems:"center", gap:"14px" }}>
                    <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:`linear-gradient(135deg,${C.red},${C.green})`, flexShrink:0 }}/>
                    <span style={{ fontFamily:F.sans, fontSize:"14px", fontWeight:500, color:C.cream }}>{s}</span>
                  </li>
                ))}
              </ul>
              <div style={{ width:"100%", height:"1px", background:`linear-gradient(90deg,${C.red}40,${C.green}40)`, marginBottom:"24px" }}/>
              <div style={{ fontFamily:F.sans, fontSize:"11px", color:C.dim, lineHeight:1.6 }}>NSF Certified · Informed Sport Approved · Made in the USA</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PRODUCTS ────────────────────────────────────────────────────────────────
function Products() {
  const [hover, setHover] = useState(null);
  const products = [
    { name:"Pronto Original", type:"Original Formula", desc:"The flagship. 300mg clean caffeine, 5g amino blend, B-vitamins. Built for sustained output.", price:"$3.99", accent:C.red },
    { name:"Pronto Zero", type:"Zero Calorie", desc:"All the performance. Zero sugar, zero calories, zero compromise. Clean fuel for the disciplined.", price:"$3.99", accent:C.greenBright },
    { name:"Pronto Sport", type:"Hydration Performance", desc:"Electrolyte-enhanced formula built for physical performance, recovery, and sustained hydration.", price:"$4.49", accent:C.red },
    { name:"Pronto ULTRA", type:"Max Strength", desc:"400mg extended-release caffeine + nootropic stack. For when you need maximum sustained output.", price:"$4.99", accent:C.greenBright },
  ];
  return (
    <section id="products" style={{ background:C.base, padding:"120px clamp(32px,6vw,96px)" }}>
      <div style={{ maxWidth:"1400px", margin:"0 auto" }}>
        <Reveal>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"24px", marginBottom:"64px" }}>
            <div>
              <div style={{ fontFamily:F.sans, fontSize:"9px", letterSpacing:"0.48em", textTransform:"uppercase", color:C.red, marginBottom:"16px" }}>Product Line</div>
              <h2 style={{ fontFamily:F.sans, fontSize:"clamp(36px,5vw,72px)", fontWeight:900, lineHeight:0.9, letterSpacing:"-0.04em", color:C.cream }}>The Pronto<br/>Range</h2>
            </div>
            <p style={{ fontFamily:F.sans, fontSize:"15px", lineHeight:1.8, color:C.muted, maxWidth:"380px" }}>Four distinct formulas. One standard — no crash, no compromise, no filler.</p>
          </div>
        </Reveal>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"2px", background:C.border }}>
          {products.map((p,i)=>(
            <div key={p.name} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)} style={{ background:hover===i?C.surface:C.base, padding:"44px 32px", cursor:"pointer", transition:"background 0.3s", position:"relative", overflow:"hidden" }}>
              {hover===i&&<div style={{ position:"absolute", inset:0, background:`radial-gradient(circle at 50% 0%, ${p.accent}12, transparent 70%)` }}/>}
              <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:hover===i?p.accent:"transparent", transition:"background 0.3s" }}/>
              <div style={{ position:"relative", zIndex:1 }}>
                {/* Can representation */}
                <div style={{ width:"48px", height:"80px", background:`linear-gradient(180deg,${p.accent}30,${p.accent}10)`, border:`1px solid ${p.accent}30`, borderRadius:"6px", marginBottom:"28px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <div style={{ fontFamily:F.sans, fontSize:"8px", fontWeight:800, color:p.accent, letterSpacing:"0.1em", textTransform:"uppercase", writingMode:"vertical-rl", transform:"rotate(180deg)" }}>PRONTO</div>
                </div>
                <div style={{ fontFamily:F.sans, fontSize:"8px", fontWeight:600, letterSpacing:"0.38em", textTransform:"uppercase", color:p.accent, marginBottom:"8px" }}>{p.type}</div>
                <div style={{ fontFamily:F.sans, fontSize:"22px", fontWeight:800, letterSpacing:"-0.02em", color:C.cream, marginBottom:"12px" }}>{p.name}</div>
                <p style={{ fontFamily:F.sans, fontSize:"13px", lineHeight:1.7, color:C.muted, marginBottom:"24px" }}>{p.desc}</p>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div style={{ fontFamily:F.sans, fontSize:"20px", fontWeight:800, color:p.accent }}>{p.price}</div>
                  <button style={{ fontFamily:F.sans, fontSize:"9px", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:p.accent, background:"transparent", border:`1px solid ${p.accent}30`, padding:"8px 18px", cursor:"pointer", transition:"all 0.3s", opacity:hover===i?1:0 }} onMouseEnter={e=>e.currentTarget.style.background=`${p.accent}15`} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>Buy →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SCIENCE ──────────────────────────────────────────────────────────────────
function TheScience() {
  const facts = [
    { label:"Caffeine Source", value:"Natural · Green Tea Extract", color:C.greenBright },
    { label:"Crash Prevention", value:"Extended-Release Formula", color:C.red },
    { label:"Amino Profile", value:"L-Theanine + L-Citrulline", color:C.greenBright },
    { label:"B-Vitamin Stack", value:"B3 · B6 · B12 Complex", color:C.red },
    { label:"Sugar Content", value:"Zero — All Variants", color:C.greenBright },
    { label:"Certification", value:"NSF Certified · Clean Label", color:C.red },
  ];
  return (
    <section id="science" style={{ background:C.surface, padding:"120px clamp(32px,6vw,96px)", position:"relative", overflow:"hidden" }}>
      <Grain o={0.03}/>
      <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse at 30% 50%, ${C.redGlow}, transparent 60%), radial-gradient(ellipse at 70% 50%, ${C.greenGlow}, transparent 60%)` }}/>
      <div style={{ maxWidth:"1400px", margin:"0 auto", position:"relative", zIndex:1 }}>
        <Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px", alignItems:"center" }}>
            <div>
              <div style={{ fontFamily:F.sans, fontSize:"9px", letterSpacing:"0.48em", textTransform:"uppercase", color:C.red, marginBottom:"16px" }}>The Formula</div>
              <h2 style={{ fontFamily:F.sans, fontSize:"clamp(32px,4.5vw,64px)", fontWeight:900, lineHeight:0.9, letterSpacing:"-0.04em", color:C.cream, marginBottom:"24px" }}>Built Different.<br/><span style={{ color:C.red }}>By Design.</span></h2>
              <p style={{ fontFamily:F.sans, fontSize:"15px", lineHeight:1.85, color:C.muted, marginBottom:"40px" }}>Every ingredient in Pronto earns its spot. No proprietary blends masking underdosed actives. No artificial dyes. No excuse-based formulas. Just clean science at effective doses.</p>
              <div style={{ display:"flex", gap:"32px", flexWrap:"wrap" }}>
                {[["300mg","Caffeine"],["5g","Amino Blend"],["100%","DV B-Vitamins"]].map(([v,l])=>(
                  <div key={l}>
                    <div style={{ fontFamily:F.sans, fontSize:"clamp(28px,3vw,40px)", fontWeight:900, color:C.red, lineHeight:1 }}>{v}</div>
                    <div style={{ fontFamily:F.sans, fontSize:"9px", fontWeight:500, letterSpacing:"0.28em", textTransform:"uppercase", color:C.muted, marginTop:"6px" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2px", background:C.border }}>
              {facts.map(f=>(
                <div key={f.label} style={{ background:C.base, padding:"28px 24px" }}>
                  <div style={{ fontFamily:F.sans, fontSize:"8px", fontWeight:600, letterSpacing:"0.35em", textTransform:"uppercase", color:f.color, marginBottom:"10px" }}>{f.label}</div>
                  <div style={{ fontFamily:F.sans, fontSize:"14px", fontWeight:600, color:C.cream, lineHeight:1.4 }}>{f.value}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── RETAIL & WHOLESALE ───────────────────────────────────────────────────────
function RetailWholesale() {
  const channels = [
    { title:"Direct to Consumer", desc:"Order Pronto directly. Bundles, subscriptions, and single-unit purchases available for immediate delivery.", cta:"Shop Now" },
    { title:"Retail Placement", desc:"Grocery, convenience, and specialty retail partnerships available. Minimum volume and territory requirements apply.", cta:"Retail Inquiry" },
    { title:"Hospitality & Events", desc:"Supply Pronto to hotels, venues, gyms, stadiums, and corporate events. High-volume contracts welcomed.", cta:"Venue Supply" },
    { title:"Wholesale Distribution", desc:"Regional and national distribution partnerships for operators looking to carry Pronto in volume.", cta:"Distributor Inquiry" },
  ];
  return (
    <section id="retail" style={{ background:C.base, padding:"120px clamp(32px,6vw,96px)" }}>
      <div style={{ maxWidth:"1400px", margin:"0 auto" }}>
        <Reveal>
          <div style={{ fontFamily:F.sans, fontSize:"9px", letterSpacing:"0.48em", textTransform:"uppercase", color:C.red, marginBottom:"16px" }}>Distribution</div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"24px", marginBottom:"64px" }}>
            <h2 style={{ fontFamily:F.sans, fontSize:"clamp(32px,4.5vw,64px)", fontWeight:900, lineHeight:0.9, letterSpacing:"-0.04em", color:C.cream }}>Find Pronto<br/>Everywhere.</h2>
            <p style={{ fontFamily:F.sans, fontSize:"15px", lineHeight:1.8, color:C.muted, maxWidth:"360px" }}>From direct orders to large-scale wholesale — multiple paths to get Pronto in hand.</p>
          </div>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"2px", background:C.border }}>
          {channels.map((ch,i)=>(
            <div key={ch.title} style={{ background:C.surface, padding:"52px 44px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, bottom:0, width:"2px", background:`linear-gradient(180deg,${C.red},${C.green})` }}/>
              <div style={{ paddingLeft:"28px" }}>
                <div style={{ fontFamily:F.sans, fontSize:"9px", fontWeight:600, letterSpacing:"0.38em", textTransform:"uppercase", color:C.red, marginBottom:"16px" }}>0{i+1}</div>
                <div style={{ fontFamily:F.sans, fontSize:"26px", fontWeight:800, letterSpacing:"-0.02em", color:C.cream, marginBottom:"14px" }}>{ch.title}</div>
                <p style={{ fontFamily:F.sans, fontSize:"14px", lineHeight:1.75, color:C.muted, marginBottom:"28px" }}>{ch.desc}</p>
                <button style={{ fontFamily:F.sans, fontSize:"9px", fontWeight:600, letterSpacing:"0.25em", textTransform:"uppercase", color:C.red, background:"transparent", border:`1px solid ${C.red}30`, padding:"10px 24px", cursor:"pointer", transition:"all 0.3s" }} onMouseEnter={e=>{ e.currentTarget.style.background=`${C.red}12`; e.currentTarget.style.transform="translateY(-2px)"; }} onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.transform="translateY(0)"; }}>{ch.cta} →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CLOSING CTA ──────────────────────────────────────────────────────────────
function ClosingCTA() {
  return (
    <section style={{ background:C.surface, padding:"160px clamp(32px,6vw,96px)", position:"relative", overflow:"hidden" }}>
      <Grain o={0.04}/>
      <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse at 60% 50%, ${C.redGlow}, transparent 60%), radial-gradient(ellipse at 30% 50%, ${C.greenGlow}, transparent 60%)` }}/>
      {/* Floating text */}
      {["PRONTO","ENERGY","CLEAN","FUEL","GO"].map((w,i)=>(
        <div key={w} style={{ position:"absolute", fontFamily:F.sans, fontSize:`${40+i*16}px`, fontWeight:900, color:"rgba(255,255,255,0.03)", top:`${15+i*15}%`, left:`${8+i*18}%`, letterSpacing:"-0.04em", pointerEvents:"none", userSelect:"none" }}>{w}</div>
      ))}
      <div style={{ maxWidth:"860px", margin:"0 auto", textAlign:"center", position:"relative", zIndex:2 }}>
        <Reveal>
          <div style={{ fontFamily:F.sans, fontSize:"9px", letterSpacing:"0.55em", textTransform:"uppercase", color:C.red, marginBottom:"28px" }}>No Crash. No Excuse.</div>
          <h2 style={{ fontFamily:F.sans, fontSize:"clamp(40px,7vw,96px)", fontWeight:900, lineHeight:0.87, letterSpacing:"-0.04em", color:C.cream, marginBottom:"28px" }}>
            GO.<br/>
            <span style={{ color:C.red }}>PRONTO.</span>
          </h2>
          <p style={{ fontFamily:F.sans, fontSize:"16px", lineHeight:1.85, color:C.muted, maxWidth:"480px", margin:"0 auto 52px" }}>
            Clean energy for the operators. The creators. The ones who cannot afford a crash and will not accept a compromise.
          </p>
          <div style={{ display:"flex", gap:"16px", justifyContent:"center", flexWrap:"wrap" }}>
            <button style={{ fontFamily:F.sans, fontSize:"10px", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:C.cream, background:`linear-gradient(135deg,${C.red},${C.redDeep})`, border:"none", padding:"16px 52px", cursor:"pointer", transition:"all 0.3s" }} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>Shop Pronto</button>
            <button style={{ fontFamily:F.sans, fontSize:"10px", fontWeight:500, letterSpacing:"0.15em", textTransform:"uppercase", color:C.cream, background:"transparent", border:`1px solid ${C.border}`, padding:"16px 40px", cursor:"pointer", transition:"all 0.3s" }} onMouseEnter={e=>{ e.currentTarget.style.borderColor=C.red; e.currentTarget.style.color=C.red; }} onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.cream; }}>Wholesale Inquiry</button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background:C.deep, borderTop:`1px solid ${C.border}`, padding:"64px clamp(32px,6vw,96px) 40px" }}>
      <div style={{ maxWidth:"1400px", margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1.5fr repeat(3,1fr)", gap:"48px", marginBottom:"64px" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"16px" }}>
              <div style={{ width:"6px", height:"24px", background:`linear-gradient(180deg,${C.red},${C.green})`, borderRadius:"3px" }}/>
              <span style={{ fontFamily:F.sans, fontSize:"20px", fontWeight:900, color:C.cream, letterSpacing:"0.06em" }}>PRONTO</span>
            </div>
            <p style={{ fontFamily:F.sans, fontSize:"13px", lineHeight:1.7, color:C.muted }}>Premium energy for performers. No crash. No compromise.</p>
            <div style={{ marginTop:"20px", fontFamily:F.sans, fontSize:"12px", color:C.dim }}>info@prontoenergy.com</div>
          </div>
          {[
            { h:"Products", l:["Pronto Original","Pronto Zero","Pronto Sport","Pronto ULTRA","Bundle Deals"] },
            { h:"Business", l:["Wholesale Inquiry","Retail Placement","Hospitality Supply","Distributor Program","Brand Partnerships"] },
            { h:"Company", l:["About Pronto","The Science","Certifications","Media & Press","A KHG Brand"] },
          ].map(col=>(
            <div key={col.h}>
              <div style={{ fontFamily:F.sans, fontSize:"8px", fontWeight:600, letterSpacing:"0.4em", textTransform:"uppercase", color:C.red, marginBottom:"20px" }}>{col.h}</div>
              <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:"10px" }}>
                {col.l.map(i=><li key={i} style={{ fontFamily:F.sans, fontSize:"13px", color:C.muted }}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:"24px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"16px" }}>
          <div style={{ fontFamily:F.sans, fontSize:"11px", color:"rgba(255,255,255,0.2)" }}>© 2026 Pronto Energy. A KHG Brand. All rights reserved.</div>
          <div style={{ display:"flex", gap:"24px" }}>
            {["Privacy","Terms","Contact"].map(i=><span key={i} style={{ fontFamily:F.sans, fontSize:"11px", color:"rgba(255,255,255,0.22)", cursor:"pointer" }}>{i}</span>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function ProntoEnergyV3() {
  return (
    <div style={{ background:C.base }}>
      <Nav/>
      <Hero/>
      <Products/>
      <TheScience/>
      <RetailWholesale/>
      <ClosingCTA/>
      <Footer/>
    </div>
  );
}
