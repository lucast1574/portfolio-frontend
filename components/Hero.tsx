'use client';
import { motion } from 'framer-motion';
import { Github, Linkedin, Youtube, Mail } from 'lucide-react';
import type { SiteConfig } from '@/lib/types';
import type { Dict } from '@/lib/locale';

export default function Hero({ site, dict }: { site: SiteConfig; dict: Dict }) {
  return (
    <section className="relative z-10 min-h-[100vh] flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-violet-600/30 via-fuchsia-500/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-500/20 via-cyan-400/5 to-transparent blur-3xl pointer-events-none" />

      <div className="absolute right-12 top-1/2 hidden md:block">
        <div className="relative w-2 h-2">
          <span className="absolute w-2 h-2 rounded-full bg-violet-400 animate-orbit" />
          <span className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300 animate-orbit" style={{ animationDuration: '14s', animationDirection: 'reverse' }} />
        </div>
      </div>

      <div className="relative max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs tracking-widest text-violet-200 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          AVAILABLE FOR PROJECTS
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >
          <span className="text-gradient">{site.profile.name}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 text-xl md:text-2xl text-slate-300 font-mono"
        >
          {site.profile.role}
        </motion.p>

        {site.profile.bio && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-6 max-w-2xl mx-auto text-slate-400 leading-relaxed"
          >
            {site.profile.bio}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          {site.social.github && (
            <a href={site.social.github} target="_blank" rel="noreferrer" className="p-3 rounded-full glass hover:bg-white/10 transition" aria-label="GitHub">
              <Github size={20} />
            </a>
          )}
          {site.social.linkedin && (
            <a href={site.social.linkedin} target="_blank" rel="noreferrer" className="p-3 rounded-full glass hover:bg-white/10 transition" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          )}
          {site.social.youtube && (
            <a href={site.social.youtube} target="_blank" rel="noreferrer" className="p-3 rounded-full glass hover:bg-white/10 transition" aria-label="YouTube">
              <Youtube size={20} />
            </a>
          )}
          {site.social.email && (
            <a href={`mailto:${site.social.email}`} className="p-3 rounded-full glass hover:bg-white/10 transition" aria-label="Email">
              <Mail size={20} />
            </a>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-8 text-xs text-slate-500 tracking-[0.3em]"
        >
          <span className="block animate-float-med">↓ {dict.scroll.toUpperCase()}</span>
        </motion.div>
      </div>
    </section>
  );
}
