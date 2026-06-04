import { gql, PROJECTS_QUERY, SITE_QUERY } from '@/lib/gql';
import { detectLocale, t as tr } from '@/lib/locale';
import type { Project, SiteConfig } from '@/lib/types';
import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import Footer from '@/components/Footer';
import Konami from '@/components/Konami';

export const dynamic = 'force-dynamic';

async function fetchData(locale: 'es' | 'en'): Promise<{ projects: Project[]; site: SiteConfig }> {
  try {
    const c = gql();
    const [p, s] = await Promise.all([
      c.request<{ projects: Project[] }>(PROJECTS_QUERY, { locale }),
      c.request<{ siteConfig: SiteConfig }>(SITE_QUERY, { locale }),
    ]);
    return { projects: p.projects || [], site: s.siteConfig };
  } catch (e) {
    return {
      projects: [],
      site: {
        profile: { name: 'Lucas Santillan', role: tr(locale, 'role'), bio: '' },
        social: { github: 'https://github.com/lucast1574' },
      },
    };
  }
}

export default async function Home() {
  const locale = detectLocale();
  const { projects, site } = await fetchData(locale);
  const t = (k: any) => tr(locale, k);

  return (
    <main className="relative">
      <Konami />
      <Hero site={site} t={t} />

      {projects.length > 0 && (
        <section className="relative z-10 py-16">
          <div className="max-w-6xl mx-auto px-6 mb-8">
            <h2 className="text-sm font-mono tracking-[0.3em] text-slate-500 uppercase">
              ✦ {t('selected')}
            </h2>
          </div>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} t={t} index={i} />
          ))}
        </section>
      )}

      <Footer t={t} />
    </main>
  );
}
