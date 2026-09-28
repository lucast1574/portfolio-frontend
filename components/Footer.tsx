'use client';

import { ArrowUp, ArrowUpRight } from 'lucide-react';
import ContactModal from '@/components/ContactModal';
import { LINKEDIN_URL } from '@/lib/social';
import type { Dict } from '@/lib/locale';
import type { SiteConfig } from '@/lib/types';

export default function Footer({ dict, site }: { dict: Dict; site: SiteConfig }) {
  const isSpanish = dict.selected === 'Trabajo seleccionado';
  return (
    <>
      <section id="contact" className="contact-section">
        <div className="contact-inner">
          <span className="section-kicker">03 / {dict.connect}</span>
          <h2 className="contact-title">{isSpanish ? 'Hagamos' : "Let’s make"}<br /><em>{isSpanish ? 'algo grande.' : 'it happen.'}</em></h2>
          <ContactModal dict={dict} site={site} className="contact-link">{isSpanish ? 'Envíame un mensaje' : 'Send me a message'} <ArrowUpRight size={25} strokeWidth={1.5} /></ContactModal>
          <div className="contact-alternatives">
            <span>{isSpanish ? 'También podemos conectar en' : 'You can also find me on'}</span>
            <a href={site.social.linkedin || LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15} /></a>
            <a href={site.social.github || 'https://github.com/lucast1574'} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a>
            {site.social.email && <a href={`mailto:${site.social.email}`}>{isSpanish ? 'Correo' : 'Email'} <ArrowUpRight size={15} /></a>}
          </div>
        </div>
      </section>
      <footer className="site-footer">
        <div className="site-footer-inner">
          <span>{dict.rights} · {new Date().getFullYear()}</span>
          <span>{isSpanish ? 'Diseñado y desarrollado por Lucas' : 'Designed and developed by Lucas'}</span>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={15} /> {dict.backToTop}</button>
        </div>
      </footer>
    </>
  );
}
