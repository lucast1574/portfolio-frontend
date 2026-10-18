'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowDownRight, Github, Linkedin, Mail, Youtube } from 'lucide-react';
import PracticeStrip from './PracticeStrip';
import { LINKEDIN_URL, YOUTUBE_URL } from '@/lib/social';
import type { SiteConfig } from '@/lib/types';
import type { Dict } from '@/lib/locale';

export default function Hero({ site, dict }: { site: SiteConfig; dict: Dict }) {
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
      <section id="top" className="hero-section">
        <a href="#top" className="brand-mark hero-signature" aria-label="Lucas Santillan">LS<span>.</span></a>
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

      <PracticeStrip english={dict.selected === "Selected work"} />

      <div className="social-rail" aria-label="Social links">
        {socials.map(({ href, label, icon: Icon }) => <a key={label} href={href} target={href?.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer" aria-label={label}><Icon size={17} strokeWidth={1.8} /></a>)}
      </div>
    </>
  );
}
