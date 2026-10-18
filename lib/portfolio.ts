import { gql, PROJECTS_QUERY, SITE_QUERY } from '@/lib/gql';
import { t as tr } from '@/lib/locale';
import type { Project, SiteConfig } from '@/lib/types';
export async function fetchPortfolio(locale: 'es' | 'en'): Promise<{ projects: Project[]; site: SiteConfig }> {
  const fallback = {
    projects: [] as Project[],
    site: {
      profile: { name: 'Lucas Santillan', role: tr(locale, 'role'), bio: '' },
      social: { github: 'https://github.com/lucast1574' },
    } as SiteConfig,
  };
  try {
    const c = gql();
    const [p, s] = await Promise.all([
      c.request<{ projects: Project[] }>(PROJECTS_QUERY, { locale }).catch(() => ({ projects: [] })),
      c.request<{ siteConfig: SiteConfig }>(SITE_QUERY, { locale }).catch(() => ({ siteConfig: fallback.site })),
    ]);
    return { projects: p.projects || [], site: s.siteConfig || fallback.site };
  } catch (e) {
    console.error('fetchData failed:', (e as any)?.message || e);
    return fallback;
  }
}

