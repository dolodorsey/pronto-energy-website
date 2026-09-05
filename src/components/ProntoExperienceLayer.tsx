"use client";
import { useEffect, useState } from "react";

const MODES=[
  {key:"TRAIN",accent:"#5EDCFF",sub:"STRENGTH / CONDITIONING"},
  {key:"PLAY",accent:"#C7FF2F",sub:"COURT / FIELD / COMPETE"},
  {key:"TRAVEL",accent:"#D9DEE5",sub:"FLIGHT / CITY / LONG DAY"},
  {key:"NIGHT",accent:"#FF7A00",sub:"FESTIVAL / CROWD / LATE"},
] as const;

export default function ProntoExperienceLayer(){
  const [active,setActive]=useState(0);
  const [progress,setProgress]=useState(0);
  const [entered,setEntered]=useState(false);
  const [mouse,setMouse]=useState({x:-500,y:-500});
  useEffect(()=>{
    const onScroll=()=>{const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);setProgress(Math.min(1,scrollY/max));setEntered(scrollY>innerHeight*.62);};
    const onMove=(e:MouseEvent)=>setMouse({x:e.clientX,y:e.clientY});
    const heroHeading=document.querySelector<HTMLElement>("main section h1");
    const heroCopy=heroHeading?.parentElement;
    if(heroCopy) heroCopy.classList.add("pronto-hero-copy-overlay");
    const heroSection=heroHeading?.closest("section");
    if(heroSection) heroSection.classList.add("pronto-clean-hero");
    onScroll();window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("mousemove",onMove,{passive:true});
    return()=>{window.removeEventListener("scroll",onScroll);window.removeEventListener("mousemove",onMove)};
  },[]);
  const mode=MODES[active];
  return <>
    <div className="pronto-progress"><i style={{width:`${progress*100}%`,background:mode.accent}}/></div>
    <div className="pronto-energy-field" aria-hidden="true" style={{transform:`translate3d(${mouse.x-260}px,${mouse.y-260}px,0)`,background:`radial-gradient(circle,${mode.accent}20 0%,${mode.accent}08 34%,transparent 70%)`}}/>
    <aside className={`pronto-mode-console ${entered?"entered":""}`} style={{"--mode-accent":mode.accent} as React.CSSProperties}>
      <span>LIVE MODE</span><strong>{mode.key}</strong><small>{mode.sub}</small>
      <div>{MODES.map((m,i)=><button key={m.key} aria-label={`Switch to ${m.key}`} className={i===active?"active":""} onClick={()=>setActive(i)} style={{"--dot":m.accent} as React.CSSProperties}>{m.key}</button>)}</div>
    </aside>
    <div className="pronto-speed-lines" aria-hidden="true" style={{opacity:.14+.22*progress}}/>
  </>;
}
