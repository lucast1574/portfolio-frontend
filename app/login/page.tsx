'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { gql, LOGIN_MUTATION } from '@/lib/gql';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

export default function LoginPage() {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const r: any = await gql().request(LOGIN_MUTATION, { username: u, password: p });
      if (r?.login?.token) {
        document.cookie = `pf_token=${r.login.token}; path=/; max-age=${7 * 24 * 60 * 60}; samesite=lax`;
        router.push('/admin');
      } else {
        setErr('Invalid credentials');
      }
    } catch (e: any) {
      setErr('Invalid credentials');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative z-10 min-h-screen flex items-center justify-center px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />
      <motion.form
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={submit}
        className="relative w-full max-w-sm glass rounded-2xl p-8 space-y-5"
      >
        <div className="flex items-center justify-center mb-2">
          <div className="p-3 rounded-full bg-violet-500/20 text-violet-300 animate-glow-pulse">
            <Rocket size={24} />
          </div>
        </div>
        <h1 className="text-center text-xl font-bold text-gradient">Mission Control</h1>

        <div>
          <label className="text-xs font-mono text-slate-400 tracking-widest">USER</label>
          <input
            value={u}
            onChange={(e) => setU(e.target.value)}
            className="mt-1 w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-violet-400"
            autoFocus
            autoComplete="username"
          />
        </div>
        <div>
          <label className="text-xs font-mono text-slate-400 tracking-widest">PASSWORD</label>
          <input
            type="password"
            value={p}
            onChange={(e) => setP(e.target.value)}
            className="mt-1 w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-violet-400"
            autoComplete="current-password"
          />
        </div>
        {err && <div className="text-sm text-rose-400">{err}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg bg-violet-500 hover:bg-violet-400 transition font-semibold text-slate-900 disabled:opacity-50"
        >
          {loading ? 'Launching…' : 'LAUNCH 🚀'}
        </button>
      </motion.form>
    </main>
  );
}
