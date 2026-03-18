"use client";
import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════════
   PRONTO ENERGY — V6 EXTRAORDINARY
   Video intro → becomes hero BG. Custom brand palette. No templates.
   ═══════════════════════════════════════════════════════════════════════ */

const C={
  base:"#080A0D",dark:"#050608",surface:"#0E1116",surface2:"#141820",
  red:"#E02828",redDeep:"#9B1414",redGlow:"rgba(224,40,40,0.10)",
  gold:"#E5C14A",goldDim:"rgba(229,193,74,0.06)",
  green:"#2AD468",greenGlow:"rgba(42,212,104,0.08)",
  light:"#F4F6F8",cream:"#E8E4DC",
  muted:"rgba(255,255,255,0.38)",dim:"rgba(255,255,255,0.10)",
  border:"rgba(255,255,255,0.05)",
  blue:"#2B7FD4",pink:"#E04090",white:"#D0CCC4"
};

function useInView(t=0.12){const ref=useRef<HTMLDivElement>(null);const[v,setV]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);o.unobserve(el)}},{threshold:t});o.observe(el);return()=>o.disconnect()},[t]);return[ref,v] as const}

function Rev({children,d=0,y=40,className=""}:{children:React.ReactNode;d?:number;y?:number;className?:string}){
  const[ref,v]=useInView();
  return<div ref={ref} className={className} style={{transform:v?`translateY(0)`:`translateY(${y}px)`,opacity:v?1:0,transition:`all 1.1s cubic-bezier(0.16,1,0.3,1) ${d}s`}}>{children}</div>
}

/* ─── VIDEO INTRO → HERO BACKGROUND ─── */
function VideoIntroHero(){
  const[phase,setPhase]=useState(0); // 0=intro, 1=expanding, 2=hero
  const[mouse,setMouse]=useState({x:0.5,y:0.5});
  const videoRef=useRef<HTMLVideoElement>(null);

  useEffect(()=>{
    const t1=setTimeout(()=>setPhase(1),2200);
    const t2=setTimeout(()=>setPhase(2),3200);
    return()=>{clearTimeout(t1);clearTimeout(t2)};
  },[]);

  return(
    <>
    {/* INTRO OVERLAY */}
    <div style={{
      position:"fixed",inset:0,zIndex:phase<2?10000:-1,
      background:C.dark,
      display:"flex",alignItems:"center",justifyContent:"center",
      opacity:phase>=2?0:1,
      transition:"opacity 0.8s cubic-bezier(0.16,1,0.3,1)",
      pointerEvents:phase>=2?"none":"all"
    }}>
      {/* Centered video window that expands */}
      <div style={{
        width:phase>=1?"100vw":"clamp(280px,40vw,500px)",
        height:phase>=1?"100vh":"clamp(200px,30vh,350px)",
        overflow:"hidden",
        transition:"all 1s cubic-bezier(0.16,1,0.3,1)",
        position:"relative",
      }}>
        <video ref={videoRef} autoPlay muted loop playsInline style={{
          width:"100%",height:"100%",objectFit:"cover",
          filter:"brightness(0.7) contrast(1.15) saturate(0.85)"
        }}>
          <source src="/videos/portal.mp4" type="video/mp4"/>
        </video>
        {/* Brand mark overlay */}
        <div style={{
          position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",
          opacity:phase>=1?0:1,transition:"opacity 0.6s ease"
        }}>
          <div style={{textAlign:"center"}}>
            <div style={{fontFamily:"'DM Sans',system-ui",fontSize:"8px",fontWeight:600,letterSpacing:"0.6em",textTransform:"uppercase",color:C.red,marginBottom:"12px"}}>Premium Energy</div>
            <div style={{fontFamily:"'DM Sans',system-ui",fontSize:"clamp(28px,5vw,48px)",fontWeight:900,letterSpacing:"0.08em",color:C.light}}>PRONTO</div>
          </div>
        </div>
      </div>
      {/* Corner accent lines */}
      <div style={{position:"absolute",top:"clamp(20px,4vh,40px)",left:"clamp(20px,4vw,40px)",width:phase>=1?0:40,height:1,background:C.red,transition:"width 0.6s ease"}}/>
      <div style={{position:"absolute",bottom:"clamp(20px,4vh,40px)",right:"clamp(20px,4vw,40px)",width:phase>=1?0:40,height:1,background:C.green,transition:"width 0.6s ease"}}/>
    </div>

    {/* HERO SECTION — video is now the BG */}
    <section
      onMouseMove={e=>setMouse({x:e.clientX/window.innerWidth,y:e.clientY/window.innerHeight})}
      style={{
        minHeight:"100vh",position:"relative",overflow:"hidden",
        display:"flex",alignItems:"center",
      }}
    >
      {/* Video BG */}
      <video autoPlay muted loop playsInline style={{
        position:"absolute",inset:"-5%",width:"110%",height:"110%",objectFit:"cover",
        filter:"brightness(0.25) contrast(1.2) saturate(0.6)",
        transform:`scale(1.02) translate(${(mouse.x-0.5)*-8}px,${(mouse.y-0.5)*-8}px)`,
        transition:"transform 0.3s ease"
      }}>
        <source src="/videos/portal.mp4" type="video/mp4"/>
      </video>

      {/* Gradient overlays */}
      <div style={{position:"absolute",inset:0,background:`linear-gradient(180deg,${C.dark}00 0%,${C.dark}88 60%,${C.dark} 100%)`}}/>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at ${mouse.x*100}% ${mouse.y*100}%,${C.redGlow},transparent 50%)`}}/>

      {/* Grain */}
      <div style={{position:"absolute",inset:0,opacity:0.04,pointerEvents:"none",mixBlendMode:"overlay",backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`}}/>

      {/* Content */}
      <div style={{position:"relative",zIndex:2,padding:"160px clamp(32px,8vw,120px) 120px",maxWidth:"1400px",margin:"0 auto",width:"100%"}}>
        <div style={{
          opacity:phase>=2?1:0,transform:phase>=2?"translateY(0)":"translateY(60px)",
          transition:"all 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s"
        }}>
          <div style={{fontFamily:"'DM Sans',system-ui",fontSize:"9px",fontWeight:600,letterSpacing:"0.6em",textTransform:"uppercase",color:C.red,marginBottom:"28px",display:"flex",alignItems:"center",gap:"14px"}}>
            <span style={{width:"32px",height:"1px",background:C.red,display:"inline-block"}}/>Zero Sugar · No Crash · Five Flavors
          </div>

          <h1 style={{fontFamily:"'DM Sans',system-ui",fontSize:"clamp(64px,12vw,180px)",fontWeight:900,lineHeight:0.82,letterSpacing:"-0.05em",color:C.light,margin:0}}>
            <span style={{display:"block",opacity:phase>=2?1:0,transform:phase>=2?"translateY(0)":"translateY(80px)",transition:"all 1.2s cubic-bezier(0.16,1,0.3,1) 0.4s"}}>GO</span>
            <span style={{display:"block",color:C.red,opacity:phase>=2?1:0,transform:phase>=2?"translateY(0)":"translateY(80px)",transition:"all 1.2s cubic-bezier(0.16,1,0.3,1) 0.55s",textShadow:`0 0 120px ${C.red}30`}}>PRONTO.</span>
          </h1>

          <div style={{marginTop:"clamp(32px,4vw,56px)",marginLeft:"clamp(0px,8vw,120px)",maxWidth:"480px",opacity:phase>=2?1:0,transition:"opacity 1s ease 1s"}}>
            <p style={{fontFamily:"'DM Sans',system-ui",fontSize:"clamp(14px,1.2vw,18px)",fontWeight:300,lineHeight:1.85,color:C.muted}}>
              Five bold flavors. Zero sugar. Clean energy for the ones who move first — from the gym floor to the festival ground.
            </p>
            <div style={{display:"flex",gap:"14px",marginTop:"36px",flexWrap:"wrap"}}>
              <button style={{fontFamily:"'DM Sans',system-ui",fontSize:"10px",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:C.light,background:`linear-gradient(135deg,${C.red},${C.redDeep})`,border:"none",padding:"16px 48px",cursor:"pointer",transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 12px 40px ${C.red}40`}} onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}>Shop Now</button>
              <button style={{fontFamily:"'DM Sans',system-ui",fontSize:"10px",fontWeight:400,letterSpacing:"0.18em",textTransform:"uppercase",color:C.light,background:"transparent",border:`1px solid ${C.dim}`,padding:"16px 36px",cursor:"pointer",transition:"all 0.3s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.red;e.currentTarget.style.color=C.red}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.dim;e.currentTarget.style.color=C.light}}>Wholesale</button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{position:"absolute",bottom:"32px",left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",opacity:phase>=2?0.3:0,transition:"opacity 1s ease 2s"}}>
        <div style={{width:1,height:32,background:`linear-gradient(180deg,transparent,${C.red})`,animation:"pulse 2s ease-in-out infinite"}}/>
        <div style={{fontFamily:"'DM Sans',system-ui",fontSize:"7px",letterSpacing:"0.4em",textTransform:"uppercase",color:C.muted}}>Scroll</div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:0.3}50%{opacity:1}}`}</style>
    </section>
    </>
  );
}

/* ─── ELEMENTAL HEROES — 5 flavors with effects ─── */
function ElementalHeroes(){
  const heroes = [
    { name:"Blue Vanilla Ice", img:"/images/hero-bluevanilla.png", accent:C.blue, glow:"rgba(43,127,212,0.12)" },
    { name:"Dragonfruit", img:"/images/hero-dragonfruit-new.png", accent:"#E03020", glow:"rgba(224,48,32,0.12)" },
    { name:"Matcha", img:"/images/hero-matcha.png", accent:C.green, glow:"rgba(42,212,104,0.12)" },
    { name:"Original", img:"/images/hero-original.png", accent:C.gold, glow:"rgba(229,193,74,0.12)" },
    { name:"Strawburst", img:"/images/hero-strawburst.png", accent:C.pink, glow:"rgba(224,64,144,0.12)" },
  ];
  return(
    <section style={{background:C.dark,padding:"120px 0 80px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,opacity:0.03,pointerEvents:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`}}/>
      <div style={{padding:"0 clamp(32px,8vw,120px)",maxWidth:"1400px",margin:"0 auto 56px"}}>
        <Rev><div style={{fontFamily:"'DM Sans',system-ui",fontSize:"9px",fontWeight:600,letterSpacing:"0.55em",textTransform:"uppercase",color:C.red,marginBottom:"20px"}}>Elemental Energy</div>
        <h2 style={{fontFamily:"'DM Sans',system-ui",fontSize:"clamp(36px,5.5vw,80px)",fontWeight:900,lineHeight:0.88,letterSpacing:"-0.045em",color:C.light}}>Each Flavor.<br/><span style={{color:C.red}}>Its Own Force.</span></h2></Rev>
      </div>
      <div className="elemental-grid" style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"2px",padding:"0 2px"}}>
        {heroes.map((h,i)=>(
          <Rev key={h.name} d={0.06*i}>
            <div style={{position:"relative",background:C.surface,overflow:"hidden",cursor:"pointer",transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)"}}
              onMouseEnter={e=>{e.currentTarget.style.background=C.surface2;const img=e.currentTarget.querySelector('img');if(img)(img as HTMLElement).style.transform="scale(1.05)"}}
              onMouseLeave={e=>{e.currentTarget.style.background=C.surface;const img=e.currentTarget.querySelector('img');if(img)(img as HTMLElement).style.transform="scale(1)"}}>
              <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 30%,${h.glow},transparent 70%)`,pointerEvents:"none"}}/>
              <div style={{position:"relative",width:"100%",aspectRatio:"3/5",overflow:"hidden"}}>
                <img src={h.img} alt={h.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.7s cubic-bezier(0.16,1,0.3,1)"}}/>
              </div>
              <div style={{padding:"18px 20px 24px",position:"relative",zIndex:1}}>
                <div style={{fontFamily:"'DM Sans',system-ui",fontSize:"7px",fontWeight:700,letterSpacing:"0.45em",textTransform:"uppercase",color:h.accent,marginBottom:"6px"}}>Pronto</div>
                <div style={{fontFamily:"'DM Sans',system-ui",fontSize:"17px",fontWeight:800,letterSpacing:"-0.02em",color:C.light}}>{h.name}</div>
              </div>
            </div>
          </Rev>
        ))}
      </div>
    </section>
  );
}

/* ─── LIFESTYLE BREAK — beach photo full width ─── */
function LifestyleBreak(){
  return(
    <section style={{position:"relative",height:"65vh",overflow:"hidden"}}>
      <img src="/images/lifestyle/beach-cheers-sunset.png" alt="Friends cheering with Pronto at sunset beach" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 40%"}}/>
      <div style={{position:"absolute",inset:0,background:`linear-gradient(180deg,${C.dark} 0%,transparent 20%,transparent 70%,${C.dark} 100%),linear-gradient(90deg,${C.dark}cc 0%,transparent 40%)`}}/>
      <div style={{position:"absolute",bottom:"clamp(32px,6vh,80px)",left:"clamp(32px,8vw,120px)",zIndex:2}}>
        <Rev><div style={{fontFamily:"'DM Sans',system-ui",fontSize:"8px",fontWeight:600,letterSpacing:"0.5em",textTransform:"uppercase",color:C.red,marginBottom:"14px"}}>The Pronto Life</div>
        <h2 style={{fontFamily:"'DM Sans',system-ui",fontSize:"clamp(32px,5vw,64px)",fontWeight:900,lineHeight:0.9,letterSpacing:"-0.04em",color:C.light}}>Every Moment.<br/><span style={{color:C.red}}>Fueled.</span></h2></Rev>
      </div>
    </section>
  );
}

/* ─── PICK YOUR POWER — 6 flavors (White Pineapple added), NO PRICES ─── */
function Products(){const[hover,setHover]=useState<number|null>(null);const products=[
  {name:"Blue Vanilla Ice",img:"/images/products/blue-vanilla-ice.png",desc:"Cool. Smooth. Unstoppable. Arctic blue for a crisp clean finish.",accent:C.blue,bg:"#0A1018"},
  {name:"Dragonfruit",img:"/images/products/dragonfruit.png",desc:"Bold heat. Tropical fire. Slow-burn energy that sustains.",accent:"#E03020",bg:"#160A0A"},
  {name:"Matcha",img:"/images/products/matcha.png",desc:"Zen focus. Clean power. Balanced output meets green energy.",accent:C.green,bg:"#0A160C"},
  {name:"Original",img:"/images/products/original.png",desc:"The flagship. Pure lightning in a can. Zero compromise.",accent:C.gold,bg:"#16140A"},
  {name:"Strawburst",img:"/images/products/strawburst.png",desc:"Sweet explosion. Rocket-fuel kick that hits different.",accent:C.pink,bg:"#160A10"},
  {name:"White Pineapple",img:"/images/products/white-pineapple.png",desc:"Tropical clarity. Clean sweetness. The smooth operator.",accent:C.white,bg:"#121210"},
];return(
<section id="flavors" style={{background:C.base,padding:"120px clamp(32px,8vw,120px)"}}>
  <div style={{maxWidth:"1400px",margin:"0 auto"}}>
    <Rev><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:"24px",marginBottom:"56px"}}>
      <div>
        <div style={{fontFamily:"'DM Sans',system-ui",fontSize:"9px",fontWeight:600,letterSpacing:"0.55em",textTransform:"uppercase",color:C.red,marginBottom:"18px"}}>6 Bold Flavors</div>
        <h2 style={{fontFamily:"'DM Sans',system-ui",fontSize:"clamp(40px,6vw,80px)",fontWeight:900,lineHeight:0.88,letterSpacing:"-0.045em",color:C.light}}>Pick Your<br/>Power.</h2>
      </div>
      <p style={{fontFamily:"'DM Sans',system-ui",fontSize:"15px",fontWeight:300,lineHeight:1.85,color:C.muted,maxWidth:"380px"}}>Each flavor is its own universe. Same clean formula. Different energy.</p>
    </div></Rev>
    <div className="products-grid" style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:"2px"}}>
      {products.map((p,i)=>(
        <Rev key={p.name} d={0.05*i}>
          <div onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)} style={{
            background:p.bg,padding:"24px 16px 28px",cursor:"pointer",transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)",
            position:"relative",overflow:"hidden",borderTop:`2px solid ${hover===i?p.accent:"transparent"}`
          }}>
            <div style={{position:"absolute",top:0,right:0,width:"70%",height:"70%",background:`radial-gradient(circle at 100% 0%,${p.accent}10,transparent 70%)`,pointerEvents:"none"}}/>
            <div style={{position:"relative",zIndex:1}}>
              <div style={{width:"100%",aspectRatio:"3/4",marginBottom:"18px",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
                <img src={p.img} alt={p.name} style={{width:"100%",height:"100%",objectFit:"contain",transform:hover===i?"scale(1.08)":"scale(1)",transition:"transform 0.6s cubic-bezier(0.16,1,0.3,1)"}}/>
              </div>
              <div style={{fontFamily:"'DM Sans',system-ui",fontSize:"7px",fontWeight:700,letterSpacing:"0.45em",textTransform:"uppercase",color:p.accent,marginBottom:"6px"}}>Pronto</div>
              <div style={{fontFamily:"'DM Sans',system-ui",fontSize:"15px",fontWeight:800,letterSpacing:"-0.02em",color:C.light,marginBottom:"8px"}}>{p.name}</div>
              <p style={{fontFamily:"'DM Sans',system-ui",fontSize:"11px",fontWeight:300,lineHeight:1.65,color:C.muted}}>{p.desc}</p>
            </div>
          </div>
        </Rev>
      ))}
    </div>
    {/* Full lineup below */}
    <Rev d={0.15}><div style={{marginTop:"48px",position:"relative",overflow:"hidden"}}>
      <img src="/images/all-flavors.png" alt="Pronto Energy Full Lineup" style={{width:"100%",height:"auto",display:"block"}}/>
      <div style={{position:"absolute",inset:0,background:`linear-gradient(90deg,${C.base}cc 0%,transparent 20%,transparent 80%,${C.base}cc 100%)`}}/>
    </div></Rev>
  </div>
</section>)}

/* ─── DUAL LIFESTYLE — campfire + club selfie ─── */
function DualLifestyle(){
  return(
    <section style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2px",background:C.dark}}>
      <div style={{position:"relative",aspectRatio:"4/5",overflow:"hidden"}}>
        <img src="/images/lifestyle/campfire-friends.png" alt="Friends around campfire with Pronto" style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.8s cubic-bezier(0.16,1,0.3,1)"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.03)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}/>
        <div style={{position:"absolute",inset:0,background:`linear-gradient(180deg,transparent 50%,${C.dark}ee 100%)`}}/>
        <div style={{position:"absolute",bottom:"32px",left:"32px"}}>
          <div style={{fontFamily:"'DM Sans',system-ui",fontSize:"7px",fontWeight:700,letterSpacing:"0.5em",textTransform:"uppercase",color:C.red}}>After Sunset</div>
          <div style={{fontFamily:"'DM Sans',system-ui",fontSize:"22px",fontWeight:800,letterSpacing:"-0.03em",color:C.light,marginTop:"6px"}}>Keep The Fire Going.</div>
        </div>
      </div>
      <div style={{position:"relative",aspectRatio:"4/5",overflow:"hidden"}}>
        <img src="/images/lifestyle/club-selfie.png" alt="Club selfie with Pronto Dragonfruit" style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.8s cubic-bezier(0.16,1,0.3,1)"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.03)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}/>
        <div style={{position:"absolute",inset:0,background:`linear-gradient(180deg,transparent 50%,${C.dark}ee 100%)`}}/>
        <div style={{position:"absolute",bottom:"32px",left:"32px"}}>
          <div style={{fontFamily:"'DM Sans',system-ui",fontSize:"7px",fontWeight:700,letterSpacing:"0.5em",textTransform:"uppercase",color:C.pink}}>Night Energy</div>
          <div style={{fontFamily:"'DM Sans',system-ui",fontSize:"22px",fontWeight:800,letterSpacing:"-0.03em",color:C.light,marginTop:"6px"}}>Outlast Everyone.</div>
        </div>
      </div>
    </section>
  );
}

/* ─── SCIENCE ─── */
function TheScience(){const facts=[
  {label:"Caffeine",value:"Natural Green Tea Extract",color:C.green},
  {label:"Crash Prevention",value:"Extended-Release Formula",color:C.red},
  {label:"Amino Profile",value:"L-Theanine + L-Citrulline",color:C.green},
  {label:"B-Vitamins",value:"B3 · B6 · B12 Complex",color:C.red},
  {label:"Sugar",value:"Zero — All Variants",color:C.green},
  {label:"Certification",value:"NSF Certified · Clean Label",color:C.red}
];return(
<section id="science" style={{background:C.dark,padding:"120px clamp(32px,8vw,120px)",position:"relative",overflow:"hidden"}}>
  <div style={{position:"absolute",inset:0,opacity:0.03,pointerEvents:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`}}/>
  <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 70% 50%,${C.redGlow},transparent 55%)`}}/>
  <div style={{maxWidth:"1400px",margin:"0 auto",position:"relative",zIndex:1}}>
    <Rev>
      <div className="science-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"80px",alignItems:"center"}}>
        <div>
          <div style={{fontFamily:"'DM Sans',system-ui",fontSize:"9px",fontWeight:600,letterSpacing:"0.55em",textTransform:"uppercase",color:C.red,marginBottom:"20px"}}>The Formula</div>
          <h2 style={{fontFamily:"'DM Sans',system-ui",fontSize:"clamp(36px,5vw,64px)",fontWeight:900,lineHeight:0.88,letterSpacing:"-0.045em",color:C.light,marginBottom:"24px"}}>Built Different.<br/><span style={{color:C.red}}>By Design.</span></h2>
          <p style={{fontFamily:"'DM Sans',system-ui",fontSize:"15px",fontWeight:300,lineHeight:1.9,color:C.muted,marginBottom:"40px"}}>Every ingredient earns its spot. No proprietary blends. No artificial dyes. Clean science at effective doses.</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2px"}}>
            {facts.map(f=>(<div key={f.label} style={{background:C.surface,padding:"22px 18px"}}>
              <div style={{fontFamily:"'DM Sans',system-ui",fontSize:"7px",fontWeight:700,letterSpacing:"0.4em",textTransform:"uppercase",color:f.color,marginBottom:"8px"}}>{f.label}</div>
              <div style={{fontFamily:"'DM Sans',system-ui",fontSize:"13px",fontWeight:600,color:C.light,lineHeight:1.4}}>{f.value}</div>
            </div>))}
          </div>
        </div>
        <div style={{position:"relative"}}>
          <img src="/images/products/lab-schematic.png" alt="Pronto Formula" style={{width:"100%",height:"auto"}}/>
          <div style={{position:"absolute",inset:0,background:`linear-gradient(180deg,transparent 40%,${C.dark} 100%)`}}/>
        </div>
      </div>
    </Rev>
  </div>
</section>)}

/* ─── RETAIL ─── */
function Retail(){const channels=[
  {title:"Direct to Consumer",desc:"Order Pronto directly. Bundles, subscriptions, and single-unit.",cta:"Shop Now"},
  {title:"Retail Placement",desc:"Grocery, convenience, and specialty retail partnerships.",cta:"Retail Inquiry"},
  {title:"Hospitality & Events",desc:"Supply to hotels, venues, gyms, stadiums, corporate events.",cta:"Venue Supply"},
  {title:"Wholesale Distribution",desc:"Regional and national distribution for volume operators.",cta:"Distributor Inquiry"}
];return(
<section id="partners" style={{background:`linear-gradient(180deg,${C.surface} 0%,${C.base} 100%)`,padding:"120px clamp(32px,8vw,120px)"}}>
  <div style={{maxWidth:"1400px",margin:"0 auto"}}>
    <Rev><div style={{fontFamily:"'DM Sans',system-ui",fontSize:"9px",fontWeight:600,letterSpacing:"0.55em",textTransform:"uppercase",color:C.red,marginBottom:"20px"}}>Distribution</div>
    <h2 style={{fontFamily:"'DM Sans',system-ui",fontSize:"clamp(36px,5vw,64px)",fontWeight:900,lineHeight:0.88,letterSpacing:"-0.045em",color:C.light,marginBottom:"56px"}}>Find Pronto<br/>Everywhere.</h2></Rev>
    <div className="retail-grid" style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"2px"}}>
      {channels.map((ch,i)=>(<Rev key={ch.title} d={0.06*i}><div style={{background:C.dark,padding:"48px 40px",position:"relative",overflow:"hidden",borderLeft:`2px solid ${i%2===0?C.red:C.green}`}}>
        <div style={{fontFamily:"'DM Sans',system-ui",fontSize:"9px",fontWeight:700,letterSpacing:"0.4em",textTransform:"uppercase",color:C.red,marginBottom:"16px"}}>0{i+1}</div>
        <div style={{fontFamily:"'DM Sans',system-ui",fontSize:"24px",fontWeight:800,letterSpacing:"-0.03em",color:C.light,marginBottom:"12px"}}>{ch.title}</div>
        <p style={{fontFamily:"'DM Sans',system-ui",fontSize:"14px",fontWeight:300,lineHeight:1.8,color:C.muted,marginBottom:"28px"}}>{ch.desc}</p>
        <button style={{fontFamily:"'DM Sans',system-ui",fontSize:"9px",fontWeight:600,letterSpacing:"0.3em",textTransform:"uppercase",color:C.red,background:"transparent",border:`1px solid ${C.red}25`,padding:"10px 24px",cursor:"pointer",transition:"all 0.3s"}} onMouseEnter={e=>{e.currentTarget.style.background=`${C.red}10`;e.currentTarget.style.borderColor=C.red}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor=`${C.red}25`}}>{ch.cta} →</button>
      </div></Rev>))}
    </div>
  </div>
</section>)}

/* ─── CTA ─── */
function ClosingCTA(){return(
<section style={{background:C.dark,padding:"160px clamp(32px,8vw,120px)",position:"relative",overflow:"hidden"}}>
  <div style={{position:"absolute",inset:0,opacity:0.03,pointerEvents:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`}}/>
  <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 55% 50%,${C.redGlow},transparent 50%),radial-gradient(ellipse at 35% 50%,${C.greenGlow},transparent 50%)`}}/>
  <div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center",position:"relative",zIndex:2}}>
    <Rev>
      <div style={{fontFamily:"'DM Sans',system-ui",fontSize:"9px",fontWeight:600,letterSpacing:"0.6em",textTransform:"uppercase",color:C.red,marginBottom:"28px"}}>No Crash. No Excuse.</div>
      <h2 style={{fontFamily:"'DM Sans',system-ui",fontSize:"clamp(48px,8vw,120px)",fontWeight:900,lineHeight:0.85,letterSpacing:"-0.05em",color:C.light,marginBottom:"28px"}}>GO.<br/><span style={{color:C.red}}>PRONTO.</span></h2>
      <p style={{fontFamily:"'DM Sans',system-ui",fontSize:"16px",fontWeight:300,lineHeight:1.9,color:C.muted,maxWidth:"460px",margin:"0 auto 48px"}}>Six flavors. Zero sugar. Clean energy for the ones who will not accept a compromise.</p>
      <div style={{display:"flex",gap:"14px",justifyContent:"center",flexWrap:"wrap"}}>
        <button style={{fontFamily:"'DM Sans',system-ui",fontSize:"10px",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:C.light,background:`linear-gradient(135deg,${C.red},${C.redDeep})`,border:"none",padding:"16px 56px",cursor:"pointer",transition:"all 0.4s"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 12px 40px ${C.red}40`}} onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}>Shop Pronto</button>
        <button style={{fontFamily:"'DM Sans',system-ui",fontSize:"10px",fontWeight:400,letterSpacing:"0.18em",textTransform:"uppercase",color:C.light,background:"transparent",border:`1px solid ${C.dim}`,padding:"16px 40px",cursor:"pointer"}}>Wholesale</button>
      </div>
    </Rev>
  </div>
</section>)}

/* ─── NAV (overlays everything) ─── */
function Nav(){const[s,setS]=useState(false);useEffect(()=>{const h=()=>setS(window.scrollY>80);window.addEventListener("scroll",h,{passive:true});return()=>window.removeEventListener("scroll",h)},[]);return(
<nav style={{position:"fixed",top:0,left:0,right:0,zIndex:9999,padding:s?"10px clamp(24px,6vw,80px)":"24px clamp(24px,6vw,80px)",display:"flex",justifyContent:"space-between",alignItems:"center",background:s?`${C.base}f0`:"transparent",backdropFilter:s?"blur(32px) saturate(1.3)":"none",borderBottom:s?`1px solid ${C.border}`:"none",transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)"}}>
<div style={{display:"flex",alignItems:"center",gap:"10px"}}><div style={{width:"6px",height:"26px",background:`linear-gradient(180deg,${C.red},${C.green})`,borderRadius:"3px"}}/><span style={{fontFamily:"'DM Sans',system-ui",fontSize:"17px",fontWeight:900,color:C.light,letterSpacing:"0.08em"}}>PRONTO</span></div>
<div style={{display:"flex",gap:"clamp(14px,2.5vw,36px)",alignItems:"center"}}>
{["Flavors","Science","Partners"].map(n=>(<a key={n} href={`#${n.toLowerCase()}`} className="nav-link-hide" style={{fontFamily:"'DM Sans',system-ui",fontSize:"9px",fontWeight:500,letterSpacing:"0.25em",textTransform:"uppercase",color:C.muted,textDecoration:"none",transition:"color 0.3s"}} onMouseEnter={e=>(e.target as HTMLElement).style.color=C.light} onMouseLeave={e=>(e.target as HTMLElement).style.color=C.muted}>{n}</a>))}
<button style={{fontFamily:"'DM Sans',system-ui",fontSize:"9px",fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:C.light,background:`linear-gradient(135deg,${C.red},${C.redDeep})`,border:"none",padding:"9px 24px",cursor:"pointer"}}>Get Pronto</button></div></nav>)}

/* ─── FOOTER ─── */
function Footer(){return(<footer style={{background:C.dark,borderTop:`1px solid ${C.border}`,padding:"64px clamp(32px,8vw,120px) 40px"}}>
<div style={{maxWidth:"1400px",margin:"0 auto"}}>
<div className="footer-grid" style={{display:"grid",gridTemplateColumns:"1.5fr repeat(3,1fr)",gap:"48px",marginBottom:"56px"}}>
<div><div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"16px"}}><div style={{width:"6px",height:"26px",background:`linear-gradient(180deg,${C.red},${C.green})`,borderRadius:"3px"}}/><span style={{fontFamily:"'DM Sans',system-ui",fontSize:"18px",fontWeight:900,color:C.light,letterSpacing:"0.08em"}}>PRONTO</span></div><p style={{fontFamily:"'DM Sans',system-ui",fontSize:"13px",fontWeight:300,lineHeight:1.8,color:C.muted}}>Premium energy for performers.<br/>No crash. No compromise.</p></div>
{[{h:"Flavors",l:["Blue Vanilla Ice","Dragonfruit","Matcha","Original","Strawburst","White Pineapple"]},{h:"Business",l:["Wholesale","Retail","Hospitality","Distributor","Partnerships"]},{h:"Company",l:["About","The Science","Certifications","Press","A KHG Brand"]}].map(col=>(<div key={col.h}><div style={{fontFamily:"'DM Sans',system-ui",fontSize:"8px",fontWeight:700,letterSpacing:"0.45em",textTransform:"uppercase",color:C.red,marginBottom:"18px"}}>{col.h}</div><ul style={{listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:"10px"}}>{col.l.map(item=><li key={item} style={{fontFamily:"'DM Sans',system-ui",fontSize:"12px",fontWeight:300,color:C.muted,cursor:"pointer",transition:"color 0.2s"}} onMouseEnter={e=>(e.target as HTMLElement).style.color=C.light} onMouseLeave={e=>(e.target as HTMLElement).style.color="rgba(255,255,255,0.38)"}>{item}</li>)}</ul></div>))}
</div>
<div style={{borderTop:`1px solid ${C.border}`,paddingTop:"24px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px"}}><div style={{fontFamily:"'DM Sans',system-ui",fontSize:"10px",fontWeight:300,color:"rgba(255,255,255,0.15)"}}>© 2026 Pronto Energy. A Kollective Hospitality Group Brand.</div><div style={{display:"flex",gap:"24px"}}>{["Privacy","Terms","Contact"].map(i=><span key={i} style={{fontFamily:"'DM Sans',system-ui",fontSize:"10px",fontWeight:300,color:"rgba(255,255,255,0.15)",cursor:"pointer"}}>{i}</span>)}</div></div>
</div></footer>)}

/* ─── RESPONSIVE + MAIN ─── */
export default function ProntoV6(){return(<div style={{background:C.base,overflowX:"hidden"}}>
<style>{`
@media(max-width:1024px){.elemental-grid{grid-template-columns:repeat(3,1fr)!important}.products-grid{grid-template-columns:repeat(3,1fr)!important}}
@media(max-width:768px){.elemental-grid{grid-template-columns:repeat(2,1fr)!important}.products-grid{grid-template-columns:repeat(2,1fr)!important}.science-grid{grid-template-columns:1fr!important}.retail-grid{grid-template-columns:1fr!important}.footer-grid{grid-template-columns:1fr!important}.nav-link-hide{display:none}}
`}</style>
<Nav/>
<VideoIntroHero/>
<ElementalHeroes/>
<LifestyleBreak/>
<Products/>
<DualLifestyle/>
<TheScience/>
<Retail/>
<ClosingCTA/>
<Footer/>
</div>)}
