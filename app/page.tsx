import { gql, PROJECTS_QUERY, SITE_QUERY } from '@/lib/gql';
import { detectLocale, messages, t as tr } from '@/lib/locale';
import type { Project, SiteConfig } from '@/lib/types';
import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import Konami from '@/components/Konami';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

async function fetchData(locale: 'es' | 'en'): Promise<{ projects: Project[]; site: SiteConfig }> {
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

export default async function Home() {
  const locale = detectLocale();
  const { projects, site } = await fetchData(locale);
  const dict = messages[locale];

  return (
    <main className="relative">
      <Konami />
      <Hero site={site} dict={dict} />

      {projects.length > 0 && (
        <section className="relative z-10 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 mb-6 sm:mb-8 safe-x">
            <h2 className="text-[10px] sm:text-sm font-mono tracking-[0.3em] text-slate-500 uppercase">
              ✦ {dict.selected}
            </h2>
          </div>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} dict={dict} index={i} />
          ))}
        </section>
      )}

      <ContactForm dict={dict} />

      <Footer dict={dict} />
    </main>
  );
}
