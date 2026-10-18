"use client";
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
export default function BrandEntrance({ locale }: { locale: 'es' | 'en' }) {
  const storageKey = 'lucas-brand-entrance-v1';
  const root = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const element = root.current;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || location.hash || preference.matches) return;
    try {
      if (sessionStorage.getItem(storageKey) && !started.current) return;
      sessionStorage.setItem(storageKey, "seen");
    } catch { /* Private browsing still gets a finite, dismissible entrance. */ }
    started.current = true;
    element.hidden = false;
    const main = element.closest("main");
    if (main) main.dataset.entrance = "active";
    const dismiss = () => {
      element.hidden = true;
      if (main) delete main.dataset.entrance;
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Tab") dismiss();
    };
    const timer = setTimeout(dismiss, 1850);
    window.addEventListener("keydown", onKey);
    preference.addEventListener("change", dismiss);
    return () => {
      clearTimeout(timer);
      dismiss();
      window.removeEventListener("keydown", onKey);
      preference.removeEventListener("change", dismiss);
    };
  }, [storageKey]);
  return <div ref={root} hidden className="brand-entrance entrance-lucas">
    <div className="brand-entrance-art" aria-hidden="true">
      <svg className="entrance-orbit" viewBox="0 0 400 400" fill="none"><ellipse cx="200" cy="200" rx="175" ry="90"/><ellipse cx="200" cy="200" rx="175" ry="90" transform="rotate(60 200 200)"/><ellipse cx="200" cy="200" rx="175" ry="90" transform="rotate(120 200 200)"/></svg>
      <svg className="brand-entrance-logo entrance-monogram" viewBox="0 0 140 100" fill="none"><path d="M20 16v68h43M119 22c-22-17-47-4-47 13 0 20 48 9 48 31 0 19-30 27-49 12"/></svg>
      <p className="brand-entrance-caption">Lucas Santillan <span>Full Stack Developer</span></p><span className="brand-entrance-line"/>
    </div>
    <button type="button" className="brand-entrance-skip" onClick={()=>{if(root.current){root.current.hidden=true;const main=root.current.closest('main');if(main)delete main.dataset.entrance;}}}>{locale==='es'?'Entrar al portafolio':'Enter portfolio'} <ArrowRight size={18} aria-hidden="true"/></button>
  </div>;
}
