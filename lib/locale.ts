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

export type Dict = {
  role: string; selected: string; projects: string; viewSite: string;
  viewRepo: string; download: string; technologies: string; backToTop: string;
  rights: string; scroll: string; connect: string; repos: string;
  web: string; playStore: string; appStore: string;
  available: string; workingOn: string;
  featured: string; mobile: string; webType: string;
};

export const messages: { en: Dict; es: Dict } = {
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
    available: 'AVAILABLE FOR PROJECTS',
    workingOn: 'CURRENTLY WORKING ON',
    featured: 'FEATURED',
    mobile: 'MOBILE',
    webType: 'WEB',
  },
  es: {
    role: 'Desarrollador Full Stack',
    selected: 'Trabajo seleccionado',
    projects: 'Proyectos',
    viewSite: 'Visitar sitio',
    viewRepo: 'Código fuente',
    download: 'Descargar',
    technologies: 'Stack',
    backToTop: 'Volver arriba',
    rights: '© Lucas Santillan',
    scroll: 'Deslizar',
    connect: 'Contacto',
    repos: 'Repositorios',
    web: 'Sitio web',
    playStore: 'Google Play',
    appStore: 'App Store',
    available: 'DISPONIBLE PARA PROYECTOS',
    workingOn: 'TRABAJANDO EN ESTE MOMENTO',
    featured: 'DESTACADO',
    mobile: 'MÓVIL',
    webType: 'WEB',
  },
};

