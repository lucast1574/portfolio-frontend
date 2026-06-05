'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Github, Globe } from 'lucide-react';
import type { Project } from '@/lib/types';
import type { Dict } from '@/lib/locale';

const PLAYSTORE_ICON = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png';
const APPSTORE_ICON = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/512px-Download_on_the_App_Store_Badge.svg.png';

export default function ProjectCard({ project, dict, index }: { project: Project; dict: Dict; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15, margin: '0px 0px -80px 0px' });
  const color = project.color || '#8b5cf6';
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-12 sm:py-20 md:py-24 px-5 sm:px-6 safe-x"
    >
      {/* color flood — más sutil en mobile */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 sm:opacity-40"
        style={{
          background: `radial-gradient(ellipse 80% 60% at ${isEven ? '20%' : '80%'} 50%, ${color}22 0%, transparent 70%)`,
        }}
      />

      <div className={`relative max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center ${isEven ? '' : 'md:[direction:rtl]'}`}>
        {/* Visual */}
        <div className="md:[direction:ltr]">
          <motion.div
            whileHover={{ scale: 1.02, rotateY: isEven ? 3 : -3 }}
            transition={{ duration: 0.4 }}
            className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden glass group"
            style={{ boxShadow: `0 20px 50px -15px ${color}55` }}
          >
            {project.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.thumbnail}
                alt={project.i18n.name}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-5xl sm:text-6xl font-bold" style={{ color }}>
                {project.i18n.name?.slice(0, 2).toUpperCase() || '✦'}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {project.year && (
              <span className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[10px] sm:text-xs font-mono px-2 py-1 rounded-md bg-black/40 backdrop-blur">
                {project.year}
              </span>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="md:[direction:ltr]">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span
              className="text-[10px] sm:text-xs font-mono tracking-[0.2em] uppercase"
              style={{ color }}
            >
              {String(index + 1).padStart(2, '0')} · {project.isMobile ? 'MOBILE' : 'WEB'}
            </span>
            {project.featured && (
              <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded border" style={{ borderColor: color, color }}>
                ★ FEATURED
              </span>
            )}
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 break-words" style={{ color }}>
            {project.i18n.name}
          </h3>

          {project.i18n.tagline && (
            <p className="text-base sm:text-lg text-slate-300 mb-3 sm:mb-4">{project.i18n.tagline}</p>
          )}

          {project.i18n.description && (
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-5 sm:mb-6">{project.i18n.description}</p>
          )}

          {project.tech?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] sm:text-xs font-mono px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full glass"
                  style={{ borderColor: `${color}55` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Action links */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {project.links?.web && (
              <a
                href={project.links.web}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition hover:scale-105 active:scale-95 text-sm sm:text-base"
                style={{ background: color, color: '#0a0a14' }}
              >
                <Globe size={16} /> {dict.web}
              </a>
            )}

            {project.links?.windows && (
              <a
                href={project.links.windows}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2 rounded-lg glass hover:bg-white/10 active:bg-white/15 transition text-xs sm:text-sm font-medium"
              >
                <svg className="w-4 h-4 fill-current text-sky-400" viewBox="0 0 24 24">
                  <path d="M0 3.449L9.75 2.1v9.45H0V3.449zM0 12.45h9.75v9.45L0 20.551v-8.1zM11.25 1.9L24 0v11.55H11.25V1.9zM11.25 12.45H24v11.55l-12.75-1.9v-9.65z"/>
                </svg>
                <span>Windows</span>
              </a>
            )}

            {project.links?.macOS && (
              <a
                href={project.links.macOS}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2 rounded-lg glass hover:bg-white/10 active:bg-white/15 transition text-xs sm:text-sm font-medium"
              >
                <svg className="w-4 h-4 fill-current text-slate-300" viewBox="0 0 24 24">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.029-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.51 12.06 1.005 1.45 2.187 3.068 3.765 3.008 1.522-.06 2.094-.98 3.935-.98 1.829 0 2.355.98 3.948.948 1.62-.029 2.666-1.468 3.655-2.902 1.146-1.675 1.612-3.3 1.642-3.389-.03-.015-3.142-1.2-3.175-4.793-.029-3.005 2.475-4.444 2.5-4.458-1.41-2.07-3.582-2.3-4.348-2.352-1.844-.15-3.616 1.132-4.506 1.132zM15.983 4.154c.783-.951 1.31-2.276 1.162-3.595-1.133.045-2.51.754-3.321 1.705-.694.8-1.3 2.147-1.133 3.438 1.258.098 2.535-.631 3.292-1.548z"/>
                </svg>
                <span>macOS</span>
              </a>
            )}

            {project.links?.linux && (
              <a
                href={project.links.linux}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2 rounded-lg glass hover:bg-white/10 active:bg-white/15 transition text-xs sm:text-sm font-medium"
              >
                <svg className="w-4 h-4 fill-current text-amber-500" viewBox="0 0 24 24">
                  <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm-1.67 6.13c-.39-.39-1.02-.39-1.41 0a.996.996 0 000 1.41l2.5 2.5-2.5 2.5a.996.996 0 101.41 1.41l3.21-3.21a.996.996 0 000-1.41l-3.21-3.2zm4.17 6.37h2.5c.55 0 1-.45 1-1s-.45-1-1-1h-2.5c-.55 0-1 .45-1 1s.45 1 1 1z"/>
                </svg>
                <span>Linux</span>
              </a>
            )}

            {project.links?.msStore && (
              <a
                href={project.links.msStore}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2 rounded-lg glass hover:bg-white/10 active:bg-white/15 transition text-xs sm:text-sm font-medium"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 23 23">
                  <path fill="#f35325" d="M0 0h11v11H0z"/>
                  <path fill="#81bc06" d="M12 0h11v11H12z"/>
                  <path fill="#05a6f0" d="M0 12h11v11H0z"/>
                  <path fill="#ffba08" d="M12 12h11v11H12z"/>
                </svg>
                <span>MS Store</span>
              </a>
            )}

            {project.repos?.filter((r) => r.isPublic).map((repo) => (
              <a
                key={repo.url}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2 rounded-lg glass hover:bg-white/10 active:bg-white/15 transition text-xs sm:text-sm"
              >
                <Github size={16} />
                <span className="font-mono">{repo.label || repo.type}</span>
              </a>
            ))}

            {project.links?.playStore && (
              <a href={project.links.playStore} target="_blank" rel="noreferrer" className="hover:scale-105 active:scale-95 transition" aria-label="Google Play">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={PLAYSTORE_ICON} alt="Google Play" className="h-9 sm:h-10" loading="lazy" decoding="async" />
              </a>
            )}

            {project.links?.appStore && (
              <a href={project.links.appStore} target="_blank" rel="noreferrer" className="hover:scale-105 active:scale-95 transition" aria-label="App Store">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={APPSTORE_ICON} alt="App Store" className="h-9 sm:h-10" loading="lazy" decoding="async" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
