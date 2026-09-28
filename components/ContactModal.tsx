'use client';

import { FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, Github, Linkedin, Send, X } from 'lucide-react';
import { gql } from '@/lib/gql';
import { LINKEDIN_URL } from '@/lib/social';
import type { Dict } from '@/lib/locale';
import type { SiteConfig } from '@/lib/types';

const CREATE_MESSAGE = `mutation($input:CreateProposalInput!){createProposal(input:$input){id}}`;

export default function ContactModal({ dict, site, className, children }: {
  dict: Dict; site: SiteConfig; className: string; children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const firstInput = useRef<HTMLInputElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const isSpanish = dict.connect === 'Contacto';

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => firstInput.current?.focus(), 50);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); return; }
      if (event.key !== 'Tab' || !dialog.current) return;
      const focusable = Array.from(dialog.current.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input:not(:disabled), textarea:not(:disabled)'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = previous; window.clearTimeout(focusTimer); window.removeEventListener('keydown', onKeyDown); };
  }, [open]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      await gql().request(CREATE_MESSAGE, { input: {
        name: name.trim(), email: email.trim(), title: subject.trim(), message: message.trim(),
      } });
      setStatus('success');
      setName(''); setEmail(''); setSubject(''); setMessage('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <button className={className} type="button" onClick={() => { setStatus('idle'); setOpen(true); }} aria-haspopup="dialog">
        {children}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="contact-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
            <motion.div ref={dialog} className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title" initial={{ opacity: 0, y: 35, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .98 }} transition={{ duration: .28, ease: [0.16, 1, 0.3, 1] }}>
              <div className="contact-modal-top"><span className="section-kicker">03 / {dict.connect}</span><button type="button" className="modal-close" onClick={() => setOpen(false)} aria-label={isSpanish ? 'Cerrar' : 'Close'}><X size={22} /></button></div>
              <h2 id="contact-modal-title">{isSpanish ? 'Hablemos de' : 'Tell me about'}<br /><em>{isSpanish ? 'tu idea.' : 'your idea.'}</em></h2>
              {status === 'success' ? (
                <div className="modal-success" role="status"><span><Check size={27} /></span><h3>{isSpanish ? 'Mensaje recibido' : 'Message received'}</h3><p>{isSpanish ? 'Gracias por escribirme. Revisaré tu mensaje en el backoffice y te responderé por correo.' : 'Thanks for reaching out. I’ll read your message and reply by email.'}</p><button type="button" onClick={() => setOpen(false)}>{isSpanish ? 'Cerrar' : 'Close'} <ArrowUpRight size={17} /></button></div>
              ) : (
                <form className="contact-form" onSubmit={submit}>
                  <div className="contact-form-row">
                    <label>{isSpanish ? 'Nombre' : 'Name'}<input ref={firstInput} value={name} onChange={(e) => setName(e.target.value)} maxLength={120} autoComplete="name" required placeholder={isSpanish ? 'Tu nombre' : 'Your name'} /></label>
                    <label>{isSpanish ? 'Correo electrónico' : 'Email'}<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" maxLength={254} autoComplete="email" required placeholder="you@example.com" /></label>
                  </div>
                  <label>{isSpanish ? 'Asunto' : 'Subject'}<input value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={160} required placeholder={isSpanish ? '¿En qué puedo ayudarte?' : 'What can I help with?'} /></label>
                  <label>{isSpanish ? 'Mensaje' : 'Message'}<textarea value={message} onChange={(e) => setMessage(e.target.value)} maxLength={4000} required rows={5} placeholder={isSpanish ? 'Cuéntame un poco sobre tu proyecto...' : 'Tell me a little about your project...'} /></label>
                  {status === 'error' && <p className="contact-form-error" role="alert">{isSpanish ? 'No se pudo enviar el mensaje. Inténtalo de nuevo.' : 'Your message could not be sent. Please try again.'}</p>}
                  <button type="submit" className="contact-submit" disabled={status === 'sending'}>{status === 'sending' ? (isSpanish ? 'Enviando...' : 'Sending...') : (isSpanish ? 'Enviar mensaje' : 'Send message')} <Send size={17} /></button>
                </form>
              )}
              <div className="modal-socials"><span>{isSpanish ? 'O encuéntrame aquí' : 'Or find me here'}</span><a href={site.social.linkedin || LINKEDIN_URL} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a><a href={site.social.github || 'https://github.com/lucast1574'} target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
