'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github, Globe2, Apple, MonitorDown, Terminal, ShoppingBag } from 'lucide-react';
import StoreLink from '@/components/StoreLink';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import type { Project } from '@/lib/types';
import type { Dict } from '@/lib/locale';

export default function ProjectCard({ project, dict, index }: { project: Project; dict: Dict; index: number }) {
  const reducedMotion = useReducedMotion();
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const bundledLogo = project.slug === 'vidrios-veca' ? '/projects/vidrios-veca.svg' : undefined;
  const thumbnail = [project.thumbnail, bundledLogo].find((url) => url && !failedImages.includes(url));
  const color = project.color || '#a9f04d';
  const style = { '--project-accent': color } as CSSProperties;
  const isGameServerExperiment = project.slug === 'game-server-experiments';
  const publicRepos = project.repos?.filter((repo) => repo.isPublic) || [];
  const VisualTag = project.links?.web ? 'a' : 'div';

  return (
    <motion.article
      className={`project-card ${index % 2 ? 'project-card-reverse' : ''}`}
      style={style}
      initial={false}
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
        {thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={thumbnail} className="project-image" src={thumbnail} alt={`${project.i18n.name} logo`} loading="lazy" decoding="async" onError={() => setFailedImages((failed) => [...failed, thumbnail])} />
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
          {project.links?.playStore && <StoreLink href={project.links.playStore} platform="android" />}
          {project.links?.appStore && <StoreLink href={project.links.appStore} platform="ios" />}
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
        </div>
        {publicRepos.length > 0 && <div className="project-repos" role="group" aria-label={dict.repos}>
          {publicRepos.map((repo) => <a key={repo.url} href={repo.url} target="_blank" rel="noopener noreferrer" className="project-repo-link">
            <Github size={14} aria-hidden="true" /> {repo.label || dict.viewRepo} <ArrowUpRight size={12} aria-hidden="true" />
          </a>)}
        </div>}
      </div>
    </motion.article>
  );
}
