'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

// Mobile: 5 taps rápidos en la esquina superior derecha
const TAP_COUNT = 5;
const TAP_WINDOW_MS = 1500;

export default function Konami() {
  const [boom, setBoom] = useState(false);
  const router = useRouter();
  const taps = useRef<number[]>([]);

  useEffect(() => {
    const buf: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      buf.push(k);
      if (buf.length > SEQUENCE.length) buf.shift();
      if (buf.join(',') === SEQUENCE.join(',')) {
        trigger();
      }
    };
    const trigger = () => {
      setBoom(true);
      setTimeout(() => router.push('/login'), 1100);
    };
    const onTouchEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      if (!t) return;
      // Only count taps in the top-right 80x80 area
      if (t.clientX < window.innerWidth - 80 || t.clientY > 80) return;
      const now = Date.now();
      taps.current = [...taps.current.filter((ts) => now - ts < TAP_WINDOW_MS), now];
      if (taps.current.length >= TAP_COUNT) {
        taps.current = [];
        trigger();
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [router]);

  if (!boom) return null;
  return (
    <div className="fixed inset-0 z-[200] pointer-events-none flex items-end justify-center">
      <div className="text-6xl animate-rocket">🚀</div>
    </div>
  );
}
