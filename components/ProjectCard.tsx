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
