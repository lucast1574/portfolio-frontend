'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github, Globe2, Play, Apple, MonitorDown, Terminal, ShoppingBag } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { Project } from '@/lib/types';
import type { Dict } from '@/lib/locale';

export default function ProjectCard({ project, dict, index }: { project: Project; dict: Dict; index: number }) {
  const reducedMotion = useReducedMotion();
  const color = project.color || '#a9f04d';
  const style = { '--project-accent': color } as CSSProperties;
  const isGameServerExperiment = project.slug === 'game-server-experiments';
  const VisualTag = project.links?.web ? 'a' : 'div';

  return (
    <motion.article
      className={`project-card ${index % 2 ? 'project-card-reverse' : ''}`}
      style={style}
      initial={reducedMotion ? false : { opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.13 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <VisualTag
        className="project-visual"
        href={project.links?.web || undefined}
        target={project.links?.web ? '_blank' : undefined}
        rel={project.links?.web ? 'noopener noreferrer' : undefined}
        aria-label={project.links?.web ? `${dict.viewSite}: ${project.i18n.name}` : undefined}
      >
        <div className="project-visual-grid" aria-hidden="true" />
        <span className="project-visual-index">{String(index + 1).padStart(2, '0')} / {project.year || (isGameServerExperiment ? 'LAB' : project.isMobile ? 'APP' : 'WEB')}</span>
        {project.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="project-image" src={project.thumbnail} alt={`${project.i18n.name} logo`} loading="lazy" decoding="async" />
        ) : (
          <span className="project-fallback" aria-hidden="true">{project.i18n.name?.slice(0, 2).toUpperCase()}</span>
        )}
        <span className="project-visual-corner" aria-hidden="true"><ArrowUpRight size={25} strokeWidth={1.4} /></span>
      </VisualTag>

      <div className="project-copy">
        <div className="project-meta"><span className="project-meta-line" />{isGameServerExperiment ? 'OPEN SOURCE EXPERIMENT' : project.isMobile ? 'APP + WEB' : 'DIGITAL PRODUCT'} <span className="project-meta-separator">/</span> {String(index + 1).padStart(2, '0')}</div>
        <h3>{project.i18n.name}</h3>
        {project.i18n.tagline && <p className="project-tagline">{project.i18n.tagline}</p>}
        {project.i18n.description && <p className="project-description">{project.i18n.description}</p>}
        {project.tech?.length > 0 && <div className="project-tech">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>}

        <div className="project-links">
          {project.links?.web && <a href={project.links.web} target="_blank" rel="noreferrer" className="project-link project-link-primary">
            <Globe2 size={17} /> {project.slug === 'leasy-ops' ? 'Backoffice' : dict.viewSite} <ArrowUpRight size={16} />
          </a>}
          {project.links?.playStore && <a href={project.links.playStore} target="_blank" rel="noreferrer" className="project-link project-link-outline">
            <Play size={17} fill="currentColor" /> Google Play <ArrowUpRight size={16} />
          </a>}
          {project.links?.appStore && <a href={project.links.appStore} target="_blank" rel="noreferrer" className="project-link project-link-outline">
            <Apple size={17} /> App Store <ArrowUpRight size={16} />
          </a>}
          {project.links?.windows && <a href={project.links.windows} target="_blank" rel="noreferrer" className="project-link project-link-outline">
            <MonitorDown size={17} /> Windows <ArrowUpRight size={16} />
          </a>}
          {project.links?.macOS && <a href={project.links.macOS} target="_blank" rel="noreferrer" className="project-link project-link-outline">
            <Apple size={17} /> macOS <ArrowUpRight size={16} />
          </a>}
          {project.links?.linux && <a href={project.links.linux} target="_blank" rel="noreferrer" className="project-link project-link-outline">
            <Terminal size={17} /> Linux <ArrowUpRight size={16} />
          </a>}
          {project.links?.msStore && <a href={project.links.msStore} target="_blank" rel="noreferrer" className="project-link project-link-outline">
            <ShoppingBag size={17} /> Microsoft Store <ArrowUpRight size={16} />
          </a>}
          {project.repos?.filter((repo) => repo.isPublic).map((repo) => <a key={repo.url} href={repo.url} target="_blank" rel="noreferrer" className="project-link project-link-outline">
            <Github size={17} /> {repo.label || dict.viewRepo} <ArrowUpRight size={16} />
          </a>)}
        </div>
      </div>
    </motion.article>
  );
}
