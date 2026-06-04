import { headers } from 'next/headers';

export function detectLocale(): 'es' | 'en' {
  try {
    const h = headers();
    const al = h.get('accept-language') || '';
    const primary = al.split(',')[0]?.toLowerCase() || '';
    if (primary.startsWith('es')) return 'es';
    return 'en';
  } catch {
    return 'en';
  }
}

export const t = (locale: 'es' | 'en', key: keyof typeof messages.en): string => {
  return messages[locale]?.[key] ?? messages.en[key];
};

export const messages = {
  en: {
    role: 'Full Stack Developer',
    selected: 'Selected work',
    projects: 'Projects',
    viewSite: 'Visit site',
    viewRepo: 'Source code',
    download: 'Download',
    technologies: 'Stack',
    backToTop: 'Back to top',
    rights: '© Lucas Santillan',
    scroll: 'Scroll',
    connect: 'Get in touch',
    repos: 'Repositories',
    web: 'Website',
    playStore: 'Google Play',
    appStore: 'App Store',
  },
  es: {
    role: 'Full Stack Developer',
    selected: 'Trabajo seleccionado',
    projects: 'Proyectos',
    viewSite: 'Visitar sitio',
    viewRepo: 'Código fuente',
    download: 'Descargar',
    technologies: 'Stack',
    backToTop: 'Volver arriba',
    rights: '© Lucas Santillan',
    scroll: 'Scroll',
    connect: 'Contacto',
    repos: 'Repositorios',
    web: 'Sitio web',
    playStore: 'Google Play',
    appStore: 'App Store',
  },
} as const;
