'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function Konami() {
  const [buf, setBuf] = useState<string[]>([]);
  const [boom, setBoom] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      setBuf((prev) => {
        const next = [...prev, k].slice(-SEQUENCE.length);
        if (next.join(',') === SEQUENCE.join(',')) {
          setBoom(true);
          setTimeout(() => router.push('/login'), 1100);
        }
        return next;
      });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [router]);

  if (!boom) return null;
  return (
    <div className="fixed inset-0 z-[200] pointer-events-none flex items-end justify-center">
      <div className="text-6xl animate-rocket">🚀</div>
    </div>
  );
}
