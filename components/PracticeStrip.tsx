import { ArrowDownRight, Globe2, Smartphone, Workflow } from 'lucide-react';

export default function PracticeStrip({ english }: { english: boolean }) {
  const areas = english
    ? [{ Icon: Globe2, label: 'Web experiences' }, { Icon: Smartphone, label: 'Mobile apps' }, { Icon: Workflow, label: 'APIs & platforms' }]
    : [{ Icon: Globe2, label: 'Experiencias web' }, { Icon: Smartphone, label: 'Apps móviles' }, { Icon: Workflow, label: 'APIs y plataformas' }];
  return <section className="practice-strip" aria-label={english ? 'What I build' : 'Lo que construyo'}>
    <div className="practice-statement"><span>{english ? 'DESIGN + DEVELOPMENT' : 'DISEÑO + DESARROLLO'}</span><p>{english ? 'From an idea to a product.' : 'De la idea al producto.'}</p></div>
    <ul>{areas.map(({ Icon, label }) => <li key={label}><Icon size={19} strokeWidth={1.5} aria-hidden="true"/>{label}</li>)}</ul>
    <a href="#work">{english ? 'Explore my work' : 'Explora mis proyectos'}<ArrowDownRight size={22} aria-hidden="true"/></a>
  </section>;
}
