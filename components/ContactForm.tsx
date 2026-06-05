'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { gql } from '@/lib/gql';
import type { Dict } from '@/lib/locale';

const CREATE_PROPOSAL = `
  mutation CreateProposal($input: CreateProposalInput!) {
    createProposal(input: $input) {
      id
    }
  }
`;

export default function ContactForm({ dict }: { dict: Dict }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const isEs = dict.connect === 'Contacto';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !title || !message) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      await gql().request(CREATE_PROPOSAL, {
        input: { name, email, title, message },
      });
      setStatus('success');
      setName('');
      setEmail('');
      setTitle('');
      setMessage('');
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMsg(
        err.message || 
        (isEs 
          ? 'Ocurrió un error al enviar tu propuesta. Por favor intenta de nuevo.' 
          : 'An error occurred while sending your proposal. Please try again.')
      );
    }
  }

  return (
    <section id="contact" className="relative z-10 py-16 sm:py-24 px-5 sm:px-6 safe-x">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-[10px] sm:text-xs font-mono tracking-[0.3em] text-slate-500 uppercase mb-2">
            ✦ {dict.connect.toUpperCase()}
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-gradient">
            {isEs ? 'Trabajemos juntos' : "Let's build something"}
          </p>
          <p className="mt-2 text-sm text-slate-400">
            {isEs 
              ? 'Envíame una propuesta para tu proyecto y hablemos de cómo hacerlo realidad.' 
              : 'Submit a proposal for your project and let’s discuss how to make it happen.'}
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-6 sm:p-8 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8 space-y-4"
              >
                <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 text-emerald-400 rounded-full mb-2">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-lg font-semibold text-slate-200">
                  {isEs ? '¡Propuesta recibida!' : 'Proposal received!'}
                </h3>
                <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                  {isEs 
                    ? 'Gracias por contactarme. Revisaré los detalles y te responderé lo antes posible.' 
                    : 'Thank you for reaching out. I will review the details and get back to you as soon as possible.'}
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-6 px-5 py-2 glass rounded-lg hover:bg-white/10 active:bg-white/15 text-xs font-semibold tracking-wider uppercase transition"
                >
                  {isEs ? 'Enviar otro mensaje' : 'Send another message'}
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {status === 'error' && (
                  <div className="flex gap-3 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg text-sm">
                    <AlertCircle className="flex-shrink-0" size={18} />
                    <div>{errorMsg}</div>
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-[11px] font-mono text-slate-500 tracking-wider mb-1.5 uppercase">
                    {isEs ? 'Nombre / Empresa' : 'Name / Company'}
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    disabled={status === 'loading'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-violet-400 text-slate-200 text-sm transition"
                    placeholder={isEs ? 'Tu nombre' : 'Your name'}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[11px] font-mono text-slate-500 tracking-wider mb-1.5 uppercase">
                    {isEs ? 'Correo electrónico' : 'Email Address'}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    disabled={status === 'loading'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-violet-400 text-slate-200 text-sm transition"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="title" className="block text-[11px] font-mono text-slate-500 tracking-wider mb-1.5 uppercase">
                    {isEs ? 'Título de la propuesta' : 'Proposal Title'}
                  </label>
                  <input
                    id="title"
                    type="text"
                    required
                    disabled={status === 'loading'}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-violet-400 text-slate-200 text-sm transition"
                    placeholder={isEs ? 'Ej: App Móvil para Delivery' : 'e.g. Mobile App for E-commerce'}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[11px] font-mono text-slate-500 tracking-wider mb-1.5 uppercase">
                    {isEs ? 'Detalles del proyecto' : 'Project Details'}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    disabled={status === 'loading'}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-violet-400 text-slate-200 text-sm transition resize-none"
                    placeholder={isEs ? 'Describe brevemente tu idea, alcance y plazos...' : 'Briefly describe your idea, scope, and deadlines...'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full mt-2 py-3.5 bg-violet-500 hover:bg-violet-400 disabled:opacity-60 text-slate-900 rounded-xl font-bold inline-flex items-center justify-center gap-2 text-sm transition shadow-lg shadow-violet-500/20"
                >
                  <Send size={15} />
                  {status === 'loading' 
                    ? (isEs ? 'Enviando...' : 'Sending...') 
                    : (isEs ? 'Enviar Propuesta' : 'Submit Proposal')}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
