"use client";
import type { ReactNode } from "react";
import { useState, useEffect, useRef } from "react";

const C={base:"#080808",surface:"#0f0f0f",border:"rgba(255,255,255,0.07)",red:"#d42020",redDeep:"#8a0e0e",redGlow:"rgba(212,32,32,0.14)",green:"#22c55e",greenGlow:"rgba(34,197,94,0.10)",cream:"#f0ece4",muted:"rgba(255,255,255,0.48)",dim:"rgba(255,255,255,0.22)"};
const F={serif:"'Cormorant Garamond','Playfair Display',Georgia,serif",sans:"'DM Sans','Inter',system-ui,sans-serif"};
function useInView(t=0.1){const ref=useRef<HTMLDivElement>(null);const[v,setV]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold:t});o.observe(el);return()=>o.disconnect();},[]);return[ref,v];}
function Reveal({children, d = 0}: {children: ReactNode; d?: number}){const[ref,v]=useInView();return<div ref={ref} style={{transform:v?"translateY(0)":"translateY(32px)",opacity:v?1:0,transition:`all 0.9s cubic-bezier(0.16,1,0.3,1) ${d}s`}}>{children}</div>;}
const Grain=()=>(<div style={{position:"absolute",inset:0,opacity:0.04,pointerEvents:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`}}/>);

function Nav(){const[s,setS]=useState(false);useEffect(()=>{const h=()=>setS(window.scrollY>60);window.addEventListener("scroll",h,{passive:true});return()=>window.removeEventListener("scroll",h);},[]);return(<nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:s?"14px clamp(24px,4vw,64px)":"26px clamp(24px,4vw,64px)",display:"flex",justifyContent:"space-between",alignItems:"center",background:s?"rgba(8,8,8,0.96)":"transparent",backdropFilter:s?"blur(28px)":"none",borderBottom:s?`1px solid ${C.border}`:"none",transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)"}}><div style={{display:"flex",alignItems:"center",gap:"10px"}}><div style={{width:"8px",height:"28px",background:`linear-gradient(180deg,${C.red},${C.green})`,borderRadius:"4px"}}/><div><div style={{fontFamily:F.sans,fontSize:"7px",letterSpacing:"0.5em",textTransform:"uppercase",color:C.red,marginBottom:"2px"}}>Premium Energy</div><span style={{fontFamily:F.sans,fontSize:"18px",fontWeight:800,color:C.cream,letterSpacing:"0.06em"}}>PRONTO</span></div></div><div style={{display:"flex",gap:"clamp(14px,2.5vw,36px)",alignItems:"center"}}>{["Products","Science","Retail","Partners"].map(n=>(<a key={n} href="#" style={{fontFamily:F.sans,fontSize:"10px",fontWeight:500,letterSpacing:"0.22em",textTransform:"uppercase",color:C.muted,textDecoration:"none"}}>{n}</a>))}<button style={{fontFamily:F.sans,fontSize:"10px",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:C.cream,background:`linear-gradient(135deg,${C.red},${C.redDeep})`,border:"none",padding:"10px 28px",cursor:"pointer"}}>Get Pronto</button></div></nav>);}

const PRODUCTS=[{name:"Pronto Original",type:"Original Formula",desc:"300mg clean caffeine, 5g amino blend. Built for sustained output.",price:"$3.99",accent:C.red},{name:"Pronto Zero",type:"Zero Calorie",desc:"All the performance. Zero sugar, zero calories. Clean fuel.",price:"$3.99",accent:C.green},{name:"Pronto Sport",type:"Hydration",desc:"Electrolyte-enhanced formula for physical performance and recovery.",price:"$4.49",accent:C.red},{name:"Pronto ULTRA",type:"Max Strength",desc:"400mg extended-release + nootropic stack for maximum output.",price:"$4.99",accent:C.green}];

export default function ProntoEnergyV3(){const[loaded,setLoaded]=useState(false);const[hover,setHover]=useState(null);useEffect(()=>{setTimeout(()=>setLoaded(true),80);},[]);
return(<div style={{background:C.base}}>
<Nav/>
<section style={{minHeight:"100vh",position:"relative",overflow:"hidden",background:`radial-gradient(ellipse at 75% 25%, ${C.redGlow} 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, ${C.greenGlow} 0%, transparent 55%), ${C.base}`,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"0 clamp(32px,6vw,96px) 96px"}}>
<Grain/>
<div style={{position:"absolute",inset:0,opacity:0.03,backgroundImage:"linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)",backgroundSize:"80px 80px"}}/>
<div style={{position:"absolute",top:"15%",right:"6%",width:"480px",height:"480px",borderRadius:"50%",background:`radial-gradient(circle,${C.redGlow},transparent 70%)`,pointerEvents:"none"}}/>
<div style={{position:"relative",zIndex:2,maxWidth:"1400px",margin:"0 auto",width:"100%",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"80px",alignItems:"flex-end"}}>
<div>
<div style={{fontFamily:F.sans,fontSize:"9px",letterSpacing:"0.55em",textTransform:"uppercase",color:C.red,opacity:loaded?1:0,transition:"opacity 0.9s ease 0.3s",marginBottom:"20px"}}>Performance Energy · KHG Brands</div>
<h1 style={{fontFamily:F.sans,fontSize:"clamp(56px,10vw,140px)",fontWeight:900,lineHeight:0.85,letterSpacing:"-0.04em",color:C.cream,opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(44px)",transition:"all 1.1s cubic-bezier(0.16,1,0.3,1) 0.5s"}}>PRON<br/><span style={{color:C.red}}>TO.</span></h1>
<p style={{fontFamily:F.sans,fontSize:"clamp(14px,1.2vw,17px)",lineHeight:1.85,color:C.muted,maxWidth:"460px",marginTop:"28px",opacity:loaded?1:0,transition:"opacity 0.9s ease 0.9s"}}>Clean energy engineered for performers, creators, and operators who cannot afford a crash. No junk. No compromise.</p>
<div style={{display:"flex",gap:"16px",marginTop:"44px",opacity:loaded?1:0,transition:"opacity 0.9s ease 1.2s",flexWrap:"wrap"}}>
<button style={{fontFamily:F.sans,fontSize:"10px",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:C.cream,background:`linear-gradient(135deg,${C.red},${C.redDeep})`,border:"none",padding:"15px 44px",cursor:"pointer"}}>Shop Now</button>
<button style={{fontFamily:F.sans,fontSize:"10px",fontWeight:500,letterSpacing:"0.15em",textTransform:"uppercase",color:C.cream,background:"transparent",border:`1px solid ${C.border}`,padding:"15px 38px",cursor:"pointer"}}>Wholesale Inquiry</button>
</div></div>
<div style={{opacity:loaded?1:0,transition:"opacity 1s ease 1.0s"}}>
<div style={{padding:"48px 40px",background:"rgba(255,255,255,0.03)",border:`1px solid ${C.border}`,position:"relative",overflow:"hidden"}}>
<div style={{position:"absolute",top:0,left:0,right:0,height:"2px",background:`linear-gradient(90deg,${C.red},${C.green})`}}/>
<div style={{fontFamily:F.sans,fontSize:"9px",fontWeight:600,letterSpacing:"0.4em",textTransform:"uppercase",color:C.red,marginBottom:"28px"}}>What&apos;s Inside</div>
{["300mg Natural Caffeine","5g Amino Blend","B-Vitamin Complex","Zero Sugar · Zero Crash","Clean Label Certified"].map(s=>(<div key={s} style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"16px"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:`linear-gradient(135deg,${C.red},${C.green})`,flexShrink:0}}/><span style={{fontFamily:F.sans,fontSize:"14px",fontWeight:500,color:C.cream}}>{s}</span></div>))}
<div style={{marginTop:"20px",fontFamily:F.sans,fontSize:"11px",color:C.dim}}>NSF Certified · Informed Sport · Made in USA</div>
</div></div></div></section>

<section style={{background:C.base,padding:"120px clamp(32px,6vw,96px)"}}>
<div style={{maxWidth:"1400px",margin:"0 auto"}}>
<Reveal><div style={{fontFamily:F.sans,fontSize:"9px",letterSpacing:"0.48em",textTransform:"uppercase",color:C.red,marginBottom:"16px"}}>Product Line</div>
<h2 style={{fontFamily:F.sans,fontSize:"clamp(36px,5vw,72px)",fontWeight:900,lineHeight:0.9,letterSpacing:"-0.04em",color:C.cream,marginBottom:"64px"}}>The Pronto Range</h2></Reveal>
<div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"2px",background:C.border}}>
{PRODUCTS.map((p,i)=>(<div key={p.name} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)} style={{background:hover===i?C.surface:C.base,padding:"44px 32px",cursor:"pointer",transition:"background 0.3s",position:"relative",overflow:"hidden"}}>
<div style={{position:"absolute",top:0,left:0,right:0,height:"2px",background:hover===i?p.accent:"transparent",transition:"background 0.3s"}}/>
<div style={{width:"48px",height:"80px",background:`linear-gradient(180deg,${p.accent}30,${p.accent}10)`,border:`1px solid ${p.accent}30`,borderRadius:"6px",marginBottom:"28px",display:"flex",alignItems:"center",justifyContent:"center"}}>
<div style={{fontFamily:F.sans,fontSize:"8px",fontWeight:800,color:p.accent,writingMode:"vertical-rl",transform:"rotate(180deg)"}}>PRONTO</div>
</div>
<div style={{fontFamily:F.sans,fontSize:"8px",fontWeight:600,letterSpacing:"0.38em",textTransform:"uppercase",color:p.accent,marginBottom:"8px"}}>{p.type}</div>
<div style={{fontFamily:F.sans,fontSize:"22px",fontWeight:800,letterSpacing:"-0.02em",color:C.cream,marginBottom:"12px"}}>{p.name}</div>
<p style={{fontFamily:F.sans,fontSize:"13px",lineHeight:1.7,color:C.muted,marginBottom:"20px"}}>{p.desc}</p>
<div style={{fontFamily:F.sans,fontSize:"20px",fontWeight:800,color:p.accent}}>{p.price}</div>
</div>))}
</div></div></section>

<section style={{background:C.surface,padding:"160px clamp(32px,6vw,96px)",position:"relative",overflow:"hidden"}}>
<Grain/>
<div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 60% 50%, ${C.redGlow}, transparent 60%), radial-gradient(ellipse at 30% 50%, ${C.greenGlow}, transparent 60%)`}}/>
<div style={{maxWidth:"860px",margin:"0 auto",textAlign:"center",position:"relative",zIndex:2}}>
<Reveal>
<div style={{fontFamily:F.sans,fontSize:"9px",letterSpacing:"0.55em",textTransform:"uppercase",color:C.red,marginBottom:"28px"}}>No Crash. No Excuse.</div>
<h2 style={{fontFamily:F.sans,fontSize:"clamp(40px,7vw,96px)",fontWeight:900,lineHeight:0.87,letterSpacing:"-0.04em",color:C.cream,marginBottom:"28px"}}>GO.<br/><span style={{color:C.red}}>PRONTO.</span></h2>
<p style={{fontFamily:F.sans,fontSize:"16px",lineHeight:1.85,color:C.muted,maxWidth:"480px",margin:"0 auto 52px"}}>Clean energy for the operators. The creators. The ones who will not accept a compromise.</p>
<div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap"}}>
<button style={{fontFamily:F.sans,fontSize:"10px",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:C.cream,background:`linear-gradient(135deg,${C.red},${C.redDeep})`,border:"none",padding:"16px 52px",cursor:"pointer"}}>Shop Pronto</button>
<button style={{fontFamily:F.sans,fontSize:"10px",fontWeight:500,letterSpacing:"0.15em",textTransform:"uppercase",color:C.cream,background:"transparent",border:`1px solid ${C.border}`,padding:"16px 40px",cursor:"pointer"}}>Wholesale Inquiry</button>
</div></Reveal></div></section>

<footer style={{background:"#050505",borderTop:`1px solid ${C.border}`,padding:"64px clamp(32px,6vw,96px) 40px"}}>
<div style={{maxWidth:"1400px",margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"16px"}}>
<div style={{display:"flex",alignItems:"center",gap:"8px"}}><div style={{width:"6px",height:"24px",background:`linear-gradient(180deg,${C.red},${C.green})`,borderRadius:"3px"}}/><span style={{fontFamily:F.sans,fontSize:"20px",fontWeight:900,color:C.cream,letterSpacing:"0.06em"}}>PRONTO</span></div>
<div style={{fontFamily:F.sans,fontSize:"11px",color:"rgba(255,255,255,0.22)"}}>© 2026 Pronto Energy. A KHG Brand. All rights reserved.</div>
</div></footer>
</div>);}
