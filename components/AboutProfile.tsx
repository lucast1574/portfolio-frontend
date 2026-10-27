import Image from 'next/image';
import { Code2, Cpu, Layers3, Smartphone } from 'lucide-react';

export default function AboutProfile({ locale }: { locale: 'es' | 'en' }) {
  const es = locale === 'es';
  const practices = [
    { icon: Code2, label: es ? 'Desarrollo Full Stack' : 'Full Stack development' },
    { icon: Cpu, label: 'AI Engineer' },
    { icon: Layers3, label: es ? 'Productos y plataformas web' : 'Web products and platforms' },
    { icon: Smartphone, label: es ? 'Aplicaciones y experiencias móviles' : 'Apps and mobile experiences' },
  ];

  return (
    <section className="profile-about profile-about-with-photo" id="about" aria-labelledby="profile-about-title">
      <figure className="profile-portrait">
        <div className="profile-portrait-orbit" aria-hidden="true" />
        <div className="profile-portrait-image">
          <Image src="/lucas-santillan.jpg" alt={es ? 'Retrato de Lucas Santillan, desarrollador Full Stack y AI Engineer' : 'Portrait of Lucas Santillan, Full Stack Developer and AI Engineer'} width={960} height={960} sizes="(max-width: 760px) calc(100vw - 48px), 420px" />
        </div>
        <figcaption><span>Lucas Santillan</span><span>{es ? 'Ideas → productos' : 'Ideas → products'}</span></figcaption>
      </figure>
      <div className="profile-about-copy">
        <p className="section-kicker">{es ? 'Sobre mí' : 'About me'}</p>
        <h2 id="profile-about-title">{es ? 'Soy Lucas Santillan.' : 'I’m Lucas Santillan.'}</h2>
        <p>{es ? 'Desarrollo software que conecta una idea con un producto que se puede usar. Trabajo en aplicaciones web y móviles, APIs e interfaces, con atención a cómo se construyen y cómo se sienten.' : 'I develop software that connects an idea with a product people can use. I work on web and mobile applications, APIs and interfaces, paying attention to how they are built and how they feel.'}</p>
        <p>{es ? 'En este portafolio comparto mis productos, experimentos y proyectos. Cada trabajo muestra el problema, las tecnologías y un enlace para conocerlo.' : 'This portfolio brings together my products, experiments and projects. Each piece of work includes its purpose, technologies and a link to explore it.'}</p>
        <ul>{practices.map(({ icon: Icon, label }) => <li key={label}><Icon aria-hidden="true" /><span>{label}</span></li>)}</ul>
      </div>
    </section>
  );
}
