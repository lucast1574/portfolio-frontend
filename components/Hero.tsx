'use client';
import { motion } from 'framer-motion';
import { Github, Linkedin, Youtube, Mail } from 'lucide-react';
import type { SiteConfig } from '@/lib/types';
import type { Dict } from '@/lib/locale';

export default function Hero({ site, dict }: { site: SiteConfig; dict: Dict }) {
  return (
    <section className="relative z-10 min-h-[100svh] flex items-center justify-center px-5 sm:px-6 py-16 sm:py-20 overflow-hidden safe-x">
      {/* Planet glows — más chicos en mobile */}
      <div className="absolute -top-24 -right-24 sm:-top-40 sm:-right-40 w-[320px] h-[320px] sm:w-[600px] sm:h-[600px] rounded-full bg-gradient-to-br from-violet-600/30 via-fuchsia-500/10 to-transparent blur-3xl pointer-events-none" />

      {/* Orbits — solo desktop */}
      <div className="absolute right-12 top-1/2 hidden lg:block">
        <div className="relative w-2 h-2">
          <span className="absolute w-2 h-2 rounded-full bg-violet-400 animate-orbit" />
          <span className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300 animate-orbit" style={{ animationDuration: '14s', animationDirection: 'reverse' }} />
        </div>
      </div>

      <div className="relative max-w-4xl w-full text-center">
        {site.workingOn ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] sm:text-xs tracking-widest text-amber-200 mb-6 sm:mb-8 border border-amber-500/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            {dict.workingOn}: {site.workingOn.title.toUpperCase()}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] sm:text-xs tracking-widest text-violet-200 mb-6 sm:mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {dict.available}
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[2.5rem] leading-[1.05] sm:text-6xl md:text-7xl font-bold tracking-tight px-2"
        >
          <span className="text-gradient break-words">{site.profile.name}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-3 sm:mt-4 text-base sm:text-xl md:text-2xl text-slate-300 font-mono"
        >
          {site.profile.role}
        </motion.p>

        {site.profile.bio && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-5 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed px-2"
          >
            {site.profile.bio}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {site.social.github && (
            <a href={site.social.github} target="_blank" rel="noreferrer" className="p-3 rounded-full glass hover:bg-white/10 active:bg-white/15 transition" aria-label="GitHub">
              <Github size={20} />
            </a>
          )}
          {site.social.linkedin && (
            <a href={site.social.linkedin} target="_blank" rel="noreferrer" className="p-3 rounded-full glass hover:bg-white/10 active:bg-white/15 transition" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          )}
          {site.social.youtube && (
            <a href={site.social.youtube} target="_blank" rel="noreferrer" className="p-3 rounded-full glass hover:bg-white/10 active:bg-white/15 transition" aria-label="YouTube">
              <Youtube size={20} />
            </a>
          )}
          {site.social.email && (
            <a href={`mailto:${site.social.email}`} className="p-3 rounded-full glass hover:bg-white/10 active:bg-white/15 transition" aria-label="Email">
              <Mail size={20} />
            </a>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute left-1/2 -translate-x-1/2 -bottom-4 sm:bottom-8 text-[10px] sm:text-xs text-slate-500 tracking-[0.3em]"
        >
          <span className="block animate-float-med">↓ {dict.scroll.toUpperCase()}</span>
        </motion.div>
      </div>
    </section>
  );
}
