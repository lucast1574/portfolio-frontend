import { fetchPortfolio } from '@/lib/portfolio';
import { messages } from '@/lib/locale';
import Hero from './Hero';
import ProjectCard from './ProjectCard';
import Footer from './Footer';
import Konami from './Konami';
import AboutProfile from './AboutProfile';
import CreatorChannel from './CreatorChannel';
import ProfileSchema from './ProfileSchema';
import DocumentLocale from './DocumentLocale';

export default async function Portfolio({ locale }: { locale: "es" | "en" }) {
  const { projects, site } = await fetchPortfolio(locale);
  const dict = messages[locale];

  return (
    <main className="relative portfolio-motion" lang={locale}>
      <a className="skip-content" href="#about">{locale === "es" ? "Ir al contenido" : "Skip to content"}</a>
      <DocumentLocale locale={locale} />
      <ProfileSchema locale={locale} site={site} projects={projects} />
      <Konami />
      <Hero site={site} dict={dict} />
      <AboutProfile locale={locale} />

      {projects.length > 0 && (
        <section id="work" className="work-section">
          <div className="work-header">
            <div>
              <span className="section-kicker">02 / {dict.projects}</span>
              <h2>{dict.selected}<span>.</span></h2>
            </div>
            <span className="work-count">({String(projects.length).padStart(2, '0')}) / {new Date().getFullYear()}</span>
          </div>
          <div className="project-list">
            {projects.map((p, i) => <ProjectCard key={p.id} project={p} dict={dict} index={i} />)}
          </div>
        </section>
      )}

      <CreatorChannel locale={locale} />
      <Footer dict={dict} site={site} />
    </main>
  );
}
