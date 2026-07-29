import Image from 'next/image';
import Link from 'next/link';
import styles from './EditorialPage.module.css';
import { sitePages, siteProfile } from '@/lib/site-pages';

const flavors = [
  ['/images/products/blue-vanilla-ice.png', 'Blue Vanilla Ice', 'COOL / CREAMY'],
  ['/images/products/dragonfruit.png', 'Dragonfruit', 'BRIGHT / TROPICAL'],
  ['/images/products/matcha.png', 'Matcha', 'GREEN / TEA-LED'],
  ['/images/products/original.png', 'Original', 'THE PRONTO CORE'],
  ['/images/products/strawburst.png', 'Strawburst', 'PINK / FRUIT-LED'],
  ['/images/products/white-pineapple.png', 'White Pineapple', 'LIGHT / TROPICAL'],
];

function ProntoFeature({ slug }) {
  if (slug === 'flavors') return <section className={styles.flavorWall}>
    <header><p>THE COMPLETE LINE</p><h2>Choose your energy.</h2><span>Flavor descriptions express creative direction. The current can governs formula and product facts.</span></header>
    <div>{flavors.map(([src,name,note],index)=><figure key={name}><span>0{index+1}</span><Image src={src} alt={`${name} Pronto Energy can`} width={650} height={900}/><figcaption><strong>{name}</strong><small>{note}</small></figcaption></figure>)}</div>
  </section>;
  if (slug === 'ingredients') return <section className={styles.labelTruth}>
    <div><p>THE SOURCE OF TRUTH</p><h2>The can outranks the campaign.</h2><span>Marketing creates desire. The physical label carries the ingredient, nutrition, caffeine, serving, warning, and certification record for the product in hand.</span></div>
    <Image src="/images/products/all-flavors-elemental.png" alt="Pronto Energy product family" width={1500} height={1000}/>
    <ol>{['Match the flavor and format','Read Nutrition Facts','Read ingredients and caffeine','Review warnings and serving guidance','Confirm market-specific documentation','Do not infer medical or performance outcomes'].map((x,i)=><li key={x}><b>0{i+1}</b>{x}</li>)}</ol>
  </section>;
  if (slug === 'retail') return <section className={styles.retailSystem}>
    <header><p>SHELF READINESS</p><h2>A placement is an operating promise.</h2></header>
    <div>{[['01','Cold','Confirmed refrigeration, planogram, assortment, and visibility.'],['02','Clear','Staff understands the line, pricing, claims, and current availability.'],['03','Replenished','Forecast, reorder cadence, out-of-stock reporting, and account owner.'],['04','Activated','Approved sampling, content, display, launch window, and local support.'],['05','Measured','Sell-through, flavor mix, repeat orders, feedback, and next decision.']].map(([n,t,c])=><article key={t}><b>{n}</b><h3>{t}</h3><p>{c}</p></article>)}</div>
  </section>;
  if (slug === 'partners') return <section className={styles.routeMap}>
    <div><p>ROUTE TO MARKET</p><h2>Product does not move itself.</h2><span>Every growth lane needs an accountable seller, buyer, warehouse, delivery route, merchandising standard, report, and renewal decision.</span></div>
    <ol>{[['Maker','Approved product and documentation'],['Pronto','Brand, assortment, commercial terms'],['Distributor','Territory, sales, storage, delivery'],['Account','Placement, staff, cold availability'],['Consumer','Trial, experience, repeat demand']].map(([t,c],i)=><li key={t}><b>0{i+1}</b><strong>{t}</strong><span>{c}</span></li>)}</ol>
  </section>;
  if (slug === 'events') return <section className={styles.activationGallery}>
    <header><p>ACTIVATION, NOT DECORATION</p><h2>Show up cold, visible, staffed, permitted, and measurable.</h2></header>
    {[['/images/lifestyle/festival-crowd-all-flavors.png','Festival supply'],['/images/lifestyle/stadium-fans-game-day.png','Game-day placement'],['/images/lifestyle/club-selfie.png','Nightlife visibility']].map(([src,label],i)=><figure key={src}><Image src={src} alt={label} width={1000} height={1200}/><figcaption><span>0{i+1}</span>{label}</figcaption></figure>)}
  </section>;
  if (slug === 'about') return <section className={styles.movementGrid}>
    <header><p>THE BRAND TERRITORY</p><h2>Energy is a setting.</h2><span>Pronto belongs where movement is already happening—not inside an invented performance promise.</span></header>
    {[['/images/lifestyle/gym-girl-blue-vanilla.png','TRAIN'],['/images/lifestyle/festival-girl-dragonfruit.png','GATHER'],['/images/lifestyle/cheers-boat-sunset.png','MOVE']].map(([src,label])=><figure key={src}><Image src={src} alt="" width={900} height={1100}/><figcaption>{label}</figcaption></figure>)}
  </section>;
  return <section className={styles.answerBoard}><header><p>FAST ANSWERS / HARD BOUNDARIES</p><h2>Know what is current.</h2></header>{sitePages.faq.sections.map(section=><details key={section.title}><summary>{section.title}<span>+</span></summary><p>{section.body[0]}</p></details>)}</section>;
}

export function EditorialPage({ page, slug }) {
  const related = Object.entries(sitePages)
    .filter(([key]) => key !== slug)
    .slice(0, 3);

  return (
    <div
      className={styles.site}
      style={{
        '--accent': siteProfile.accent,
        '--accent-soft': siteProfile.accentSoft,
        '--background': siteProfile.background,
        '--surface': siteProfile.surface,
        '--ink': siteProfile.ink,
        '--muted': siteProfile.muted,
      }}
    >
      <header className={styles.header}>
        <Link href="/" className={styles.logo} aria-label={`${siteProfile.name} home`}>
          <Image src={siteProfile.logo} alt={siteProfile.name} width={180} height={60} priority />
        </Link>
        <nav aria-label="Primary navigation">
          {siteProfile.nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <Link href="/forms" className={styles.headerAction}>Start an inquiry</Link>
      </header>

      <main>
        <section className={styles.hero}>
          <Image src={page.hero ?? siteProfile.hero} alt="" fill sizes="100vw" priority />
          <div className={styles.heroShade} />
          <div className={styles.heroCopy}>
            <p>{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <span>{page.intro}</span>
          </div>
        </section>

        <section className={styles.facts} aria-label="Key facts">
          {page.facts.map(([value, label]) => (
            <article key={value}><strong>{value}</strong><span>{label}</span></article>
          ))}
        </section>

        <ProntoFeature slug={slug} />

        <section className={styles.reading}>
          <header>
            <p>PRODUCT & BUSINESS BRIEF</p>
            <h2>Details before hype.</h2>
          </header>
          <div className={styles.sections}>
            {page.sections.map((section, index) => (
              <article key={section.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2>{section.title}</h2>
                  {section.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets?.length ? (
                    <ul>{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.related}>
          <p>CONTINUE EXPLORING</p>
          <div>
            {related.map(([key, item]) => (
              <Link href={`/${key}`} key={key}>
                <span>{item.eyebrow}</span>
                <strong>{item.title}</strong>
                <b aria-hidden="true">↗</b>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <p>READY TO MOVE?</p>
          <h2>Tell us where Pronto should show up.</h2>
          <div>
            <Link href="/forms">Choose an inquiry</Link>
            <Link href="/connect">View every contact path</Link>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <strong>{siteProfile.name}</strong>
        <nav>{siteProfile.nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
        <span>© 2026 Pronto Energy. Review the current package for product-specific facts.</span>
      </footer>
    </div>
  );
}
