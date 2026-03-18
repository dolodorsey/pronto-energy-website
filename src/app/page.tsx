"use client";
import { useState, useEffect, useRef } from "react";

const C={
  base:"#0D0F12",dark:"#080A0D",surface:"#13161C",surface2:"#181C24",
  red:"#C82424",redDeep:"#8a0e0e",redGlow:"rgba(200,36,36,0.12)",
  gold:"#E5C14A",goldDim:"rgba(229,193,74,0.08)",
  silver:"#B7BCC5",light:"#F3F5F7",
  green:"#22c55e",greenGlow:"rgba(34,197,94,0.10)",
  muted:"rgba(255,255,255,0.45)",dim:"rgba(255,255,255,0.15)",
  border:"rgba(255,255,255,0.07)",
  blue:"#1e6bb8",pink:"#d94090"
};
const F={serif:"'Cormorant Garamond',Georgia,serif",sans:"'DM Sans',system-ui,sans-serif"};

function useInView(t=0.1){const ref=useRef<HTMLDivElement>(null);const[v,setV]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);o.unobserve(el)}},{threshold:t});o.observe(el);return()=>o.disconnect()},[t]);return[ref,v] as const}
function Reveal({children,d=0}:{children:React.ReactNode;d?:number}){const[ref,v]=useInView();return<div ref={ref} style={{transform:v?"translateY(0)":"translateY(32px)",opacity:v?1:0,transition:`all 0.9s cubic-bezier(0.16,1,0.3,1) ${d}s`}}>{children}</div>}
const Grain=({o=0.04}:{o?:number})=>(<div style={{position:"absolute",inset:0,opacity:o,pointerEvents:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`}}/>);

/* ─── NAV ─── */
function Nav(){const[s,setS]=useState(false);useEffect(()=>{const h=()=>setS(window.scrollY>60);window.addEventListener("scroll",h,{passive:true});return()=>window.removeEventListener("scroll",h)},[]);return(
<nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:s?"12px clamp(24px,4vw,64px)":"22px clamp(24px,4vw,64px)",display:"flex",justifyContent:"space-between",alignItems:"center",background:s?`${C.base}f2`:"transparent",backdropFilter:s?"blur(28px)":"none",borderBottom:s?`1px solid ${C.border}`:"none",transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)"}}>
<div style={{display:"flex",alignItems:"center",gap:"10px"}}><div style={{width:"8px",height:"28px",background:`linear-gradient(180deg,${C.red},${C.green})`,borderRadius:"4px"}}/><div><div style={{fontFamily:F.sans,fontSize:"7px",letterSpacing:"0.5em",textTransform:"uppercase",color:C.red,marginBottom:"2px"}}>Premium Energy</div><span style={{fontFamily:F.sans,fontSize:"18px",fontWeight:800,color:C.light,letterSpacing:"0.06em"}}>PRONTO</span></div></div>
<div style={{display:"flex",gap:"clamp(14px,2.5vw,36px)",alignItems:"center"}}>
{["Flavors","Science","Lifestyle","Partners"].map(n=>(<a key={n} href={`#${n.toLowerCase()}`} className="nav-link-hide" style={{fontFamily:F.sans,fontSize:"10px",fontWeight:500,letterSpacing:"0.22em",textTransform:"uppercase",color:C.muted,textDecoration:"none",transition:"color 0.3s"}} onMouseEnter={e=>(e.target as HTMLElement).style.color=C.light} onMouseLeave={e=>(e.target as HTMLElement).style.color=C.muted}>{n}</a>))}
<button style={{fontFamily:F.sans,fontSize:"10px",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:C.light,background:`linear-gradient(135deg,${C.red},${C.redDeep})`,border:"none",padding:"10px 28px",cursor:"pointer"}}>Get Pronto</button></div></nav>)}

/* ─── HERO ─── */
function Hero(){const[loaded,setLoaded]=useState(false);useEffect(()=>{setTimeout(()=>setLoaded(true),200)},[]);return(
<section style={{minHeight:"100vh",background:`linear-gradient(135deg,${C.dark} 0%,${C.base} 50%,${C.surface} 100%)`,position:"relative",overflow:"hidden",display:"flex",alignItems:"center",padding:"120px clamp(32px,6vw,80px) 80px"}}>
<Grain o={0.04}/>
<div style={{position:"absolute",top:"-10%",right:"-5%",width:"55vw",height:"55vw",borderRadius:"50%",background:`radial-gradient(circle,${C.redGlow},transparent 60%)`,animation:"drift 9s ease-in-out infinite",pointerEvents:"none"}}/>
<div style={{position:"absolute",bottom:"-15%",left:"-8%",width:"50vw",height:"50vw",borderRadius:"50%",background:`radial-gradient(circle,${C.greenGlow},transparent 60%)`,animation:"drift 11s ease-in-out infinite reverse",pointerEvents:"none"}}/>
<style>{`@keyframes drift{0%,100%{transform:translate(0,0)}50%{transform:translate(15px,-15px)}}@media(max-width:900px){.hero-grid{grid-template-columns:1fr!important}.nav-link-hide{display:none}.prods-grid{grid-template-columns:repeat(2,1fr)!important}.science-grid{grid-template-columns:1fr!important}.retail-grid{grid-template-columns:1fr!important}.footer-grid{grid-template-columns:1fr!important}}`}</style>

<div className="hero-grid" style={{position:"relative",zIndex:2,maxWidth:"1400px",margin:"0 auto",width:"100%",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(32px,4vw,64px)",alignItems:"center"}}>
<div style={{opacity:loaded?1:0,transform:loaded?"scale(1)":"scale(0.95)",transition:"all 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s"}}>
<div style={{border:`1px solid ${C.dim}`,background:C.dark,overflow:"hidden"}}><video autoPlay muted loop playsInline style={{width:"100%",height:"auto",display:"block"}}><source src="/videos/portal.mp4" type="video/mp4"/></video></div>
<div style={{marginTop:"10px",display:"flex",justifyContent:"space-between"}}><div style={{fontFamily:F.sans,fontSize:"8px",letterSpacing:"0.4em",textTransform:"uppercase",color:C.muted}}>Flavor Multiverse</div><div style={{fontFamily:F.sans,fontSize:"8px",letterSpacing:"0.3em",textTransform:"uppercase",color:C.red}}>5 Bold Flavors</div></div></div>

<div>
<div style={{fontFamily:F.sans,fontSize:"9px",letterSpacing:"0.55em",textTransform:"uppercase",color:C.red,opacity:loaded?1:0,transition:"opacity 0.9s ease 0.3s",marginBottom:"20px",display:"flex",alignItems:"center",gap:"12px"}}><span style={{width:"32px",height:"1px",background:C.red}}/>Zero Sugar · No Crash</div>
<h1 style={{fontFamily:F.sans,fontSize:"clamp(52px,9vw,130px)",fontWeight:900,lineHeight:0.85,letterSpacing:"-0.04em",color:C.light,opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(44px)",transition:"all 1.1s cubic-bezier(0.16,1,0.3,1) 0.5s"}}>PRON<br/><span style={{color:C.red}}>TO.</span></h1>
<p style={{fontFamily:F.sans,fontSize:"clamp(13px,1.1vw,16px)",lineHeight:1.85,color:C.muted,maxWidth:"460px",marginTop:"24px",opacity:loaded?1:0,transition:"opacity 0.9s ease 0.9s"}}>Five bold flavors. Zero sugar. No crash. Fuel for the ones who move first — from the gym floor to the festival ground.</p>
<div style={{display:"flex",gap:"14px",marginTop:"36px",opacity:loaded?1:0,transition:"opacity 0.9s ease 1.2s",flexWrap:"wrap"}}>
<button style={{fontFamily:F.sans,fontSize:"10px",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:C.light,background:`linear-gradient(135deg,${C.red},${C.redDeep})`,border:"none",padding:"14px 40px",cursor:"pointer",transition:"all 0.3s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>Shop Now</button>
<button style={{fontFamily:F.sans,fontSize:"10px",fontWeight:500,letterSpacing:"0.15em",textTransform:"uppercase",color:C.light,background:"transparent",border:`1px solid ${C.dim}`,padding:"14px 32px",cursor:"pointer",transition:"all 0.3s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.red;e.currentTarget.style.color=C.red}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.dim;e.currentTarget.style.color=C.light}}>Wholesale</button></div></div></div></section>)}

/* ─── ELEMENTAL HERO SHOTS — 5 flavors with splash/fire/ice/energy effects ─── */
function ElementalHeroes(){
  const heroes = [
    { name:"Blue Vanilla Ice", img:"/images/hero-bluevanilla.png", accent:C.blue, glow:"rgba(30,107,184,0.15)" },
    { name:"Dragonfruit", img:"/images/hero-dragonfruit-new.png", accent:"#c83020", glow:"rgba(200,48,32,0.15)" },
    { name:"Matcha", img:"/images/hero-matcha.png", accent:C.green, glow:"rgba(34,197,94,0.15)" },
    { name:"Original", img:"/images/hero-original.png", accent:C.gold, glow:"rgba(229,193,74,0.15)" },
    { name:"Strawburst", img:"/images/hero-strawburst.png", accent:C.pink, glow:"rgba(217,64,144,0.15)" },
  ];
  return(
    <section style={{background:`linear-gradient(180deg,${C.base} 0%,${C.dark} 100%)`,padding:"100px 0 80px",position:"relative",overflow:"hidden"}}>
      <Grain o={0.03}/>
      <div style={{padding:"0 clamp(32px,6vw,80px)",maxWidth:"1400px",margin:"0 auto 48px"}}>
        <Reveal><div style={{fontFamily:F.sans,fontSize:"9px",letterSpacing:"0.48em",textTransform:"uppercase",color:C.red,marginBottom:"16px"}}>Elemental Energy</div>
        <h2 style={{fontFamily:F.sans,fontSize:"clamp(32px,4.5vw,64px)",fontWeight:900,lineHeight:0.9,letterSpacing:"-0.04em",color:C.light}}>Each Flavor.<br/><span style={{color:C.red}}>Its Own Force.</span></h2></Reveal>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"2px",padding:"0 2px"}}>
        {heroes.map((h,i)=>(
          <Reveal key={h.name} d={0.08*i}>
            <div style={{position:"relative",background:C.dark,overflow:"hidden"}}>
              <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 40%,${h.glow},transparent 70%)`,pointerEvents:"none"}}/>
              <div style={{position:"relative",width:"100%",aspectRatio:"3/5",overflow:"hidden"}}>
                <img src={h.img} alt={h.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.6s cubic-bezier(0.16,1,0.3,1)"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.04)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}/>
                <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"60px 20px 20px",background:"linear-gradient(transparent,rgba(0,0,0,0.8)"}}/>
              </div>
              <div style={{padding:"16px 20px 24px",position:"relative",zIndex:1}}>
                <div style={{fontFamily:F.sans,fontSize:"7px",fontWeight:600,letterSpacing:"0.4em",textTransform:"uppercase",color:h.accent,marginBottom:"6px"}}>Pronto</div>
                <div style={{fontFamily:F.sans,fontSize:"16px",fontWeight:800,letterSpacing:"-0.02em",color:C.light}}>{h.name}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── PRODUCTS — 5 flavors cards with real images ─── */
function Products(){const[hover,setHover]=useState<number|null>(null);const products=[
  {name:"Blue Vanilla Ice",img:"/images/products/blue-vanilla-ice.png",desc:"Cool. Smooth. Unstoppable. Arctic blue for a crisp clean finish.",price:"$3.99",accent:C.blue,bg:"#0D1218"},
  {name:"Dragonfruit",img:"/images/products/dragonfruit.png",desc:"Bold heat. Tropical fire. Slow-burn energy that sustains.",price:"$3.99",accent:"#c83020",bg:"#180D0D"},
  {name:"Matcha",img:"/images/products/matcha.png",desc:"Zen focus. Clean power. Balanced output meets green energy.",price:"$3.99",accent:C.green,bg:"#0D1810"},
  {name:"Original",img:"/images/products/original.png",desc:"The flagship. Pure lightning in a can. Zero compromise.",price:"$3.99",accent:C.gold,bg:"#18160D"},
  {name:"Strawburst",img:"/images/products/strawburst.png",desc:"Sweet explosion. Rocket-fuel kick that hits different.",price:"$3.99",accent:C.pink,bg:"#180D14"}
];return(
<section id="flavors" style={{background:C.base,padding:"120px clamp(32px,6vw,80px)"}}><div style={{maxWidth:"1400px",margin:"0 auto"}}><Reveal><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:"24px",marginBottom:"48px"}}><div><div style={{fontFamily:F.sans,fontSize:"9px",letterSpacing:"0.48em",textTransform:"uppercase",color:C.red,marginBottom:"16px"}}>5 Bold Flavors</div><h2 style={{fontFamily:F.sans,fontSize:"clamp(36px,5vw,72px)",fontWeight:900,lineHeight:0.9,letterSpacing:"-0.04em",color:C.light}}>Pick Your<br/>Power.</h2></div><p style={{fontFamily:F.sans,fontSize:"14px",lineHeight:1.8,color:C.muted,maxWidth:"360px"}}>Each flavor is its own universe. Same clean formula. Different energy.</p></div></Reveal>
<div className="prods-grid" style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"2px"}}>{products.map((p,i)=>(<div key={p.name} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)} style={{background:p.bg,padding:"28px 18px",cursor:"pointer",transition:"all 0.3s",position:"relative",overflow:"hidden",borderTop:`2px solid ${hover===i?p.accent:"transparent"}`}}>
<div style={{position:"absolute",top:0,right:0,width:"60%",height:"60%",background:`radial-gradient(circle at 100% 0%,${p.accent}15,transparent 70%)`,pointerEvents:"none"}}/>
<div style={{position:"relative",zIndex:1}}><div style={{width:"100%",aspectRatio:"3/4",marginBottom:"16px",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}><img src={p.img} alt={p.name} style={{width:"100%",height:"100%",objectFit:"contain",transform:hover===i?"scale(1.06)":"scale(1)",transition:"transform 0.5s cubic-bezier(0.16,1,0.3,1)"}}/></div>
<div style={{fontFamily:F.sans,fontSize:"7px",fontWeight:600,letterSpacing:"0.38em",textTransform:"uppercase",color:p.accent,marginBottom:"6px"}}>Pronto</div>
<div style={{fontFamily:F.sans,fontSize:"16px",fontWeight:800,letterSpacing:"-0.02em",color:C.light,marginBottom:"8px"}}>{p.name}</div>
<p style={{fontFamily:F.sans,fontSize:"11px",lineHeight:1.65,color:C.muted,marginBottom:"16px"}}>{p.desc}</p>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}><div style={{fontFamily:F.sans,fontSize:"16px",fontWeight:800,color:p.accent}}>{p.price}</div></div></div></div>))}</div>
<Reveal d={0.2}><div style={{marginTop:"40px",position:"relative",overflow:"hidden"}}><img src="/images/all-flavors.png" alt="Pronto Energy Full Lineup" style={{width:"100%",height:"auto",display:"block"}}/><div style={{position:"absolute",inset:0,background:`linear-gradient(90deg,${C.base}cc 0%,transparent 25%,transparent 75%,${C.base}cc 100%)`}}/></div></Reveal></div></section>)}

/* ─── LIFESTYLE GALLERY ─── */
function Lifestyle(){const images=[
  {src:"/images/lifestyle/cheers-boat-sunset.png",label:"Golden Hour"},
  {src:"/images/lifestyle/festival-girl-dragonfruit.png",label:"Festival Season"},
  {src:"/images/lifestyle/gym-girl-blue-vanilla.png",label:"Performance"},
  {src:"/images/lifestyle/stadium-fans-game-day.png",label:"Game Day"},
  {src:"/images/lifestyle/beach-girls-sunset.png",label:"Beach Vibes"},
  {src:"/images/lifestyle/festival-night-crew.png",label:"Night Energy"}
];return(
<section id="lifestyle" style={{background:`linear-gradient(180deg,${C.surface} 0%,${C.base} 100%)`,padding:"120px 0",position:"relative",overflow:"hidden"}}><Grain o={0.03}/><div style={{padding:"0 clamp(32px,6vw,80px)",maxWidth:"1400px",margin:"0 auto 48px"}}><Reveal><div style={{fontFamily:F.sans,fontSize:"9px",letterSpacing:"0.48em",textTransform:"uppercase",color:C.red,marginBottom:"16px"}}>The Pronto Life</div><h2 style={{fontFamily:F.sans,fontSize:"clamp(32px,4.5vw,64px)",fontWeight:900,lineHeight:0.9,letterSpacing:"-0.04em",color:C.light}}>Wherever You<br/><span style={{color:C.red}}>Go.</span></h2></Reveal></div>
<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"3px",padding:"0 3px"}}>{images.map((img,i)=>(<div key={i} style={{position:"relative",overflow:"hidden",aspectRatio:i===0||i===3?"16/10":"3/4"}}><img src={img.src} alt={img.label} loading="lazy" style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.8s cubic-bezier(0.16,1,0.3,1)"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.04)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}/><div style={{position:"absolute",bottom:0,left:0,right:0,padding:"40px 24px 20px",background:"linear-gradient(transparent,rgba(0,0,0,0.7))"}}><div style={{fontFamily:F.sans,fontSize:"8px",fontWeight:600,letterSpacing:"0.4em",textTransform:"uppercase",color:C.red}}>{img.label}</div></div></div>))}</div></section>)}

/* ─── SCIENCE ─── */
function TheScience(){const facts=[
  {label:"Caffeine",value:"Natural Green Tea Extract",color:C.green},
  {label:"Crash Prevention",value:"Extended-Release Formula",color:C.red},
  {label:"Amino Profile",value:"L-Theanine + L-Citrulline",color:C.green},
  {label:"B-Vitamins",value:"B3 · B6 · B12 Complex",color:C.red},
  {label:"Sugar",value:"Zero — All Variants",color:C.green},
  {label:"Certification",value:"NSF Certified · Clean Label",color:C.red}
];return(
<section id="science" style={{background:C.dark,padding:"120px clamp(32px,6vw,80px)",position:"relative",overflow:"hidden"}}><Grain o={0.03}/><div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 70% 50%,${C.redGlow},transparent 55%)`}}/>
<div style={{maxWidth:"1400px",margin:"0 auto",position:"relative",zIndex:1}}><Reveal><div className="science-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"64px",alignItems:"center"}}><div><div style={{fontFamily:F.sans,fontSize:"9px",letterSpacing:"0.48em",textTransform:"uppercase",color:C.red,marginBottom:"16px"}}>The Formula</div><h2 style={{fontFamily:F.sans,fontSize:"clamp(32px,4.5vw,56px)",fontWeight:900,lineHeight:0.9,letterSpacing:"-0.04em",color:C.light,marginBottom:"20px"}}>Built Different.<br/><span style={{color:C.red}}>By Design.</span></h2><p style={{fontFamily:F.sans,fontSize:"14px",lineHeight:1.85,color:C.muted,marginBottom:"32px"}}>Every ingredient earns its spot. No proprietary blends. No artificial dyes. Clean science at effective doses.</p>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2px"}}>{facts.map(f=>(<div key={f.label} style={{background:C.surface,padding:"20px 16px"}}><div style={{fontFamily:F.sans,fontSize:"7px",fontWeight:600,letterSpacing:"0.35em",textTransform:"uppercase",color:f.color,marginBottom:"6px"}}>{f.label}</div><div style={{fontFamily:F.sans,fontSize:"12px",fontWeight:600,color:C.light,lineHeight:1.4}}>{f.value}</div></div>))}</div></div>
<div style={{position:"relative"}}><img src="/images/products/lab-schematic.png" alt="Pronto Pilot Schematic" style={{width:"100%",height:"auto"}}/><div style={{position:"absolute",inset:0,background:`linear-gradient(180deg,transparent 50%,${C.dark} 100%)`}}/></div></div></Reveal></div></section>)}

/* ─── RETAIL ─── */
function Retail(){const channels=[
  {title:"Direct to Consumer",desc:"Order Pronto directly. Bundles, subscriptions, and single-unit.",cta:"Shop Now"},
  {title:"Retail Placement",desc:"Grocery, convenience, and specialty retail partnerships.",cta:"Retail Inquiry"},
  {title:"Hospitality & Events",desc:"Supply to hotels, venues, gyms, stadiums, corporate events.",cta:"Venue Supply"},
  {title:"Wholesale Distribution",desc:"Regional and national distribution for volume operators.",cta:"Distributor Inquiry"}
];return(
<section id="partners" style={{background:`linear-gradient(180deg,${C.surface} 0%,${C.base} 100%)`,padding:"120px clamp(32px,6vw,80px)"}}><div style={{maxWidth:"1400px",margin:"0 auto"}}><Reveal><div style={{fontFamily:F.sans,fontSize:"9px",letterSpacing:"0.48em",textTransform:"uppercase",color:C.red,marginBottom:"16px"}}>Distribution</div><h2 style={{fontFamily:F.sans,fontSize:"clamp(32px,4.5vw,56px)",fontWeight:900,lineHeight:0.9,letterSpacing:"-0.04em",color:C.light,marginBottom:"48px"}}>Find Pronto<br/>Everywhere.</h2></Reveal>
<div className="retail-grid" style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"2px"}}>{channels.map((ch,i)=>(<div key={ch.title} style={{background:C.dark,padding:"44px 36px",position:"relative",overflow:"hidden",borderLeft:`2px solid ${i%2===0?C.red:C.green}`}}><div style={{fontFamily:F.sans,fontSize:"9px",fontWeight:600,letterSpacing:"0.38em",textTransform:"uppercase",color:C.red,marginBottom:"14px"}}>0{i+1}</div><div style={{fontFamily:F.sans,fontSize:"22px",fontWeight:800,letterSpacing:"-0.02em",color:C.light,marginBottom:"10px"}}>{ch.title}</div><p style={{fontFamily:F.sans,fontSize:"13px",lineHeight:1.75,color:C.muted,marginBottom:"24px"}}>{ch.desc}</p><button style={{fontFamily:F.sans,fontSize:"9px",fontWeight:600,letterSpacing:"0.25em",textTransform:"uppercase",color:C.red,background:"transparent",border:`1px solid ${C.red}30`,padding:"9px 20px",cursor:"pointer"}}>{ch.cta} →</button></div>))}</div></div></section>)}

/* ─── CTA ─── */
function ClosingCTA(){return(<section style={{background:C.dark,padding:"140px clamp(32px,6vw,80px)",position:"relative",overflow:"hidden"}}><Grain o={0.04}/><div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 60% 50%,${C.redGlow},transparent 55%),radial-gradient(ellipse at 30% 50%,${C.greenGlow},transparent 55%)`}}/>
<div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center",position:"relative",zIndex:2}}><Reveal><div style={{fontFamily:F.sans,fontSize:"9px",letterSpacing:"0.55em",textTransform:"uppercase",color:C.red,marginBottom:"24px"}}>No Crash. No Excuse.</div><h2 style={{fontFamily:F.sans,fontSize:"clamp(40px,7vw,96px)",fontWeight:900,lineHeight:0.87,letterSpacing:"-0.04em",color:C.light,marginBottom:"24px"}}>GO.<br/><span style={{color:C.red}}>PRONTO.</span></h2><p style={{fontFamily:F.sans,fontSize:"15px",lineHeight:1.85,color:C.muted,maxWidth:"440px",margin:"0 auto 44px"}}>Five flavors. Zero sugar. Clean energy for the ones who will not accept a compromise.</p>
<div style={{display:"flex",gap:"14px",justifyContent:"center",flexWrap:"wrap"}}><button style={{fontFamily:F.sans,fontSize:"10px",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:C.light,background:`linear-gradient(135deg,${C.red},${C.redDeep})`,border:"none",padding:"15px 48px",cursor:"pointer"}}>Shop Pronto</button><button style={{fontFamily:F.sans,fontSize:"10px",fontWeight:500,letterSpacing:"0.15em",textTransform:"uppercase",color:C.light,background:"transparent",border:`1px solid ${C.dim}`,padding:"15px 36px",cursor:"pointer"}}>Wholesale</button></div></Reveal></div></section>)}

/* ─── FOOTER ─── */
function Footer(){return(<footer style={{background:C.dark,borderTop:`1px solid ${C.border}`,padding:"56px clamp(32px,6vw,80px) 36px"}}><div style={{maxWidth:"1400px",margin:"0 auto"}}><div className="footer-grid" style={{display:"grid",gridTemplateColumns:"1.5fr repeat(3,1fr)",gap:"40px",marginBottom:"48px"}}><div><div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"14px"}}><div style={{width:"6px",height:"24px",background:`linear-gradient(180deg,${C.red},${C.green})`,borderRadius:"3px"}}/><span style={{fontFamily:F.sans,fontSize:"18px",fontWeight:900,color:C.light,letterSpacing:"0.06em"}}>PRONTO</span></div><p style={{fontFamily:F.sans,fontSize:"12px",lineHeight:1.7,color:C.muted}}>Premium energy for performers. No crash. No compromise.</p></div>
{[{h:"Flavors",l:["Blue Vanilla Ice","Dragonfruit","Matcha","Original","Strawburst"]},{h:"Business",l:["Wholesale","Retail","Hospitality","Distributor","Partnerships"]},{h:"Company",l:["About","The Science","Certifications","Press","A KHG Brand"]}].map(col=>(<div key={col.h}><div style={{fontFamily:F.sans,fontSize:"8px",fontWeight:600,letterSpacing:"0.4em",textTransform:"uppercase",color:C.red,marginBottom:"16px"}}>{col.h}</div><ul style={{listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:"8px"}}>{col.l.map(item=><li key={item} style={{fontFamily:F.sans,fontSize:"12px",color:C.muted,cursor:"pointer"}}>{item}</li>)}</ul></div>))}</div>
<div style={{borderTop:`1px solid ${C.border}`,paddingTop:"20px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px"}}><div style={{fontFamily:F.sans,fontSize:"10px",color:"rgba(255,255,255,0.2)"}}>© 2026 Pronto Energy. A KHG Brand.</div><div style={{display:"flex",gap:"20px"}}>{["Privacy","Terms","Contact"].map(i=><span key={i} style={{fontFamily:F.sans,fontSize:"10px",color:"rgba(255,255,255,0.2)",cursor:"pointer"}}>{i}</span>)}</div></div></div></footer>)}

export default function ProntoEnergyV5(){return(<div style={{background:C.base}}><Nav/><Hero/><ElementalHeroes/><Products/><Lifestyle/><TheScience/><Retail/><ClosingCTA/><Footer/></div>)}
