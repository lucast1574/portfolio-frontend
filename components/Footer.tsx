'use client';
import { ArrowUp } from 'lucide-react';

export default function Footer({ t }: { t: (k: any) => string }) {
  return (
    <footer className="relative z-10 px-6 py-12 border-t border-white/5 mt-24">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <div className="font-mono">{t('rights')} · {new Date().getFullYear()}</div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center gap-2 hover:text-violet-300 transition"
        >
          <ArrowUp size={14} /> {t('backToTop')}
        </button>
      </div>
    </footer>
  );
}
