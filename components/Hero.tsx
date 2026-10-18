'use client';

import { useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Asterisk, Github, Linkedin, Mail, Youtube, Pause, Play } from 'lucide-react';
import ContactModal from '@/components/ContactModal';
import { LINKEDIN_URL, YOUTUBE_URL } from '@/lib/social';
import type { SiteConfig } from '@/lib/types';
import type { Dict } from '@/lib/locale';

export default function Hero({ site, dict }: { site: SiteConfig; dict: Dict }) {
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const socials = [
    { href: site.social.github, label: 'GitHub', icon: Github },
    { href: site.social.linkedin || LINKEDIN_URL, label: 'LinkedIn', icon: Linkedin },
    { href: YOUTUBE_URL, label: 'YouTube', icon: Youtube },
    { href: site.social.email ? `mailto:${site.social.email}` : undefined, label: 'Email', icon: Mail },
  ].filter((item) => item.href);

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <header className="site-header">
        <a href="#top" className="brand-mark" aria-label="Lucas Santillan, top of page">LS<span>.</span></a>
        <nav className="site-nav" aria-label="Main navigation">
          <div className="language-switch" aria-label="Idioma / Language"><a href="/" lang="es" hrefLang="es" aria-current={dict.selected==='Trabajo seleccionado'?'page':undefined}>ES</a><a href="/en" lang="en" hrefLang="en" aria-current={dict.selected==='Selected work'?'page':undefined}>EN</a></div>
          <button type="button" className="motion-toggle" disabled={Boolean(reducedMotion)} aria-pressed={paused} aria-label={dict.selected==='Trabajo seleccionado'?(paused?'Activar animaciones':'Pausar animaciones'):(paused?'Play animations':'Pause animations')} title={dict.selected==='Trabajo seleccionado'?(paused?'Activar animaciones':'Pausar animaciones'):(paused?'Play animations':'Pause animations')} onClick={event=>{const next=!paused;setPaused(next);const root=event.currentTarget.closest('main');if(root)root.dataset.motion=next?'paused':'full';}}>{paused||reducedMotion?<Play size={15} aria-hidden="true"/>:<Pause size={15} aria-hidden="true"/>}</button>
          <a href="#work">{dict.selected}</a>
          <a href="#youtube">YouTube</a>
          <ContactModal dict={dict} site={site} className="nav-contact"><span className="nav-contact-text">{dict.connect}</span> <ArrowUpRight size={15} /></ContactModal>
        </nav>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-grid" aria-hidden="true" />
        <div className="orbital-path" aria-hidden="true"><span className="orbital-satellite" /><span className="orbital-crosshair" /></div>
        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="hero-orb hero-orb-two" aria-hidden="true" />

        <div className="hero-inner">
          <motion.div className="hero-topline" initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="hero-eyebrow">{site.profile.role || dict.role}</div>
            <div className={`hero-status ${site.workingOn ? 'hero-status-busy' : ''}`}>
              <span className="status-dot" /> {site.workingOn ? `${dict.workingOn}: ${site.workingOn.title}` : dict.available}
            </div>
          </motion.div>

          <h1 className="hero-title" aria-label={site.profile.name}>
            {(site.profile.name || 'Lucas Santillan').split(' ').map((word, index) => (
              <span className="hero-title-line" key={`${word}-${index}`}>
                <motion.span initial={false} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.12 + index * 0.13, ease: [0.16, 1, 0.3, 1] }}>
                  {word}{index === 1 && <span className="hero-period">.</span>}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div className="hero-bottom" initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65 }}>
            <div className="hero-intro">
              <span className="section-kicker">01 / INTRO</span>
              <p>{site.profile.bio || (dict.selected === 'Trabajo seleccionado' ? 'Construyo productos digitales, experiencias y herramientas para ideas que merecen existir.' : 'I build digital products, experiences, and tools for ideas worth bringing to life.')}</p>
            </div>
            <a className="hero-work-link" href="#work" aria-label={dict.selected}>
              <span>{dict.selected}</span><ArrowDownRight size={27} strokeWidth={1.5} />
            </a>
          </motion.div>
        </div>

        <div className="hero-edge-label" aria-hidden="true">PORTFOLIO / {new Date().getFullYear()}</div>
      </section>

      <div className="ticker" aria-hidden="true"><div className="ticker-track">
        {Array.from({ length: 4 }, (_, i) => <span className="ticker-group" key={i}>{['DESIGN', 'BUILD', 'SHIP', 'REPEAT'].map(label => <span className="ticker-item" key={label}>{label}<Asterisk size={22} strokeWidth={2} aria-hidden="true" /></span>)}</span>)}
      </div></div>

      <div className="social-rail" aria-label="Social links">
        {socials.map(({ href, label, icon: Icon }) => <a key={label} href={href} target={href?.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer" aria-label={label}><Icon size={17} strokeWidth={1.8} /></a>)}
      </div>
    </>
  );
}
