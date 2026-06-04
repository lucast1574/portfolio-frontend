'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { gql } from '@/lib/gql';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Eye, EyeOff, Save, X, LogOut, Rocket } from 'lucide-react';

const ADMIN_PROJECTS = `query { projects(locale: "es", includeHidden: true) {
  id slug order featured color isMobile tech year visible
  i18n { name tagline description longDescription }
  repos { type url label isPublic }
  links { web playStore appStore }
  screenshots { url caption }
  thumbnail
} }`;

const CREATE = `mutation($input: CreateProjectInput!) { createProject(input: $input) { id } }`;
const UPDATE = `mutation($input: UpdateProjectInput!) { updateProject(input: $input) { id } }`;
const DELETE = `mutation($id: String!) { deleteProject(id: $id) }`;
const LOGOUT = `mutation { logout }`;

type Form = {
  id?: string;
  slug: string;
  color: string;
  order: number;
  featured: boolean;
  visible: boolean;
  isMobile: boolean;
  year?: number;
  thumbnail?: string;
  tech: string;
  nameEs: string; taglineEs: string; descEs: string; longEs: string;
  nameEn: string; taglineEn: string; descEn: string; longEn: string;
  web: string; playStore: string; appStore: string;
  repos: { type: string; url: string; label: string; isPublic: boolean }[];
};

const blank: Form = {
  slug: '', color: '#8b5cf6', order: 0, featured: false, visible: true, isMobile: false,
  tech: '', nameEs: '', taglineEs: '', descEs: '', longEs: '',
  nameEn: '', taglineEn: '', descEn: '', longEn: '',
  web: '', playStore: '', appStore: '', repos: [],
};

export default function Admin() {
  const router = useRouter();
  const [list, setList] = useState<any[]>([]);
  const [editing, setEditing] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const r: any = await gql().request(ADMIN_PROJECTS);
      setList(r.projects || []);
    } catch {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function startEdit(p: any) {
    setEditing({
      id: p.id, slug: p.slug, color: p.color, order: p.order, featured: p.featured,
      visible: p.visible, isMobile: p.isMobile, year: p.year, thumbnail: p.thumbnail,
      tech: (p.tech || []).join(', '),
      nameEs: p.i18n?.name || '', taglineEs: p.i18n?.tagline || '', descEs: p.i18n?.description || '', longEs: p.i18n?.longDescription || '',
      nameEn: '', taglineEn: '', descEn: '', longEn: '',
      web: p.links?.web || '', playStore: p.links?.playStore || '', appStore: p.links?.appStore || '',
      repos: (p.repos || []).map((r: any) => ({ type: r.type, url: r.url, label: r.label || '', isPublic: r.isPublic })),
    });
  }

  async function save() {
    if (!editing) return;
    const input: any = {
      slug: editing.slug, color: editing.color, order: Number(editing.order),
      featured: editing.featured, visible: editing.visible, isMobile: editing.isMobile,
      year: editing.year ? Number(editing.year) : undefined,
      thumbnail: editing.thumbnail || undefined,
      tech: editing.tech.split(',').map((t) => t.trim()).filter(Boolean),
      i18n: {
        es: { name: editing.nameEs, tagline: editing.taglineEs, description: editing.descEs, longDescription: editing.longEs },
        en: { name: editing.nameEn || editing.nameEs, tagline: editing.taglineEn || editing.taglineEs, description: editing.descEn || editing.descEs, longDescription: editing.longEn || editing.longEs },
      },
      links: { web: editing.web || undefined, playStore: editing.playStore || undefined, appStore: editing.appStore || undefined },
      repos: editing.repos.filter((r) => r.url),
      screenshots: [],
    };
    try {
      if (editing.id) await gql().request(UPDATE, { input: { id: editing.id, ...input } });
      else await gql().request(CREATE, { input });
      setEditing(null);
      load();
    } catch (e: any) {
      alert('Error: ' + (e.message || 'unknown'));
    }
  }

  async function del(id: string) {
    if (!confirm('¿Borrar este proyecto?')) return;
    await gql().request(DELETE, { id });
    load();
  }

  async function logout() {
    try { await gql().request(LOGOUT); } catch {}
    document.cookie = 'pf_token=; path=/; max-age=0';
    router.push('/');
  }

  return (
    <main className="relative z-10 min-h-screen p-6 md:p-10 max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <Rocket className="text-violet-400" /> <span className="text-gradient">Mission Control</span>
        </h1>
        <div className="flex gap-2">
          <button onClick={() => setEditing({ ...blank })} className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500 text-slate-900 rounded-lg font-semibold hover:bg-violet-400 transition">
            <Plus size={16} /> Nuevo
          </button>
          <button onClick={logout} className="inline-flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-white/10 transition">
            <LogOut size={16} /> Salir
          </button>
        </div>
      </header>

      {loading && <div className="text-slate-400">Cargando…</div>}

      <div className="space-y-3">
        {list.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-4 flex items-center gap-4"
            style={{ borderLeftColor: p.color, borderLeftWidth: 4 }}
          >
            <div className="w-3 h-3 rounded-full" style={{ background: p.color }} />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{p.i18n?.name || p.slug}</span>
                {p.featured && <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-amber-400 text-amber-400">★</span>}
                {!p.visible && <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-500 text-slate-400">HIDDEN</span>}
              </div>
              <div className="text-xs text-slate-500 font-mono">{p.slug} · order {p.order} {p.year ? `· ${p.year}` : ''}</div>
            </div>
            <button onClick={() => startEdit(p)} className="p-2 hover:bg-white/10 rounded-lg" aria-label="Edit"><Pencil size={16} /></button>
            <button onClick={() => del(p.id)} className="p-2 hover:bg-rose-500/20 rounded-lg text-rose-400" aria-label="Delete"><Trash2 size={16} /></button>
          </motion.div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={() => setEditing(null)}>
          <div className="bg-slate-950 border border-white/10 rounded-2xl max-w-3xl w-full p-6 my-8 max-h-[90vh] overflow-y-auto scrollbar-thin" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{editing.id ? 'Editar proyecto' : 'Nuevo proyecto'}</h2>
              <button onClick={() => setEditing(null)} className="p-2 hover:bg-white/10 rounded"><X size={18} /></button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <Field label="Slug" v={editing.slug} on={(v) => setEditing({ ...editing, slug: v })} />
              <Field label="Color" v={editing.color} on={(v) => setEditing({ ...editing, color: v })} type="color" />
              <Field label="Order" v={String(editing.order)} on={(v) => setEditing({ ...editing, order: Number(v) || 0 })} type="number" />
              <Field label="Year" v={String(editing.year || '')} on={(v) => setEditing({ ...editing, year: v ? Number(v) : undefined })} type="number" />
              <Field label="Thumbnail URL" v={editing.thumbnail || ''} on={(v) => setEditing({ ...editing, thumbnail: v })} />
              <Field label="Tech (comma)" v={editing.tech} on={(v) => setEditing({ ...editing, tech: v })} />
            </div>

            <div className="flex gap-4 mb-6 text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} /> Featured</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={editing.visible} onChange={(e) => setEditing({ ...editing, visible: e.target.checked })} /> Visible</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={editing.isMobile} onChange={(e) => setEditing({ ...editing, isMobile: e.target.checked })} /> Mobile app</label>
            </div>

            <div className="mb-6">
              <h3 className="text-xs font-mono tracking-widest text-slate-500 mb-3">CONTENIDO · ES</h3>
              <div className="space-y-3">
                <Field label="Nombre" v={editing.nameEs} on={(v) => setEditing({ ...editing, nameEs: v })} />
                <Field label="Tagline" v={editing.taglineEs} on={(v) => setEditing({ ...editing, taglineEs: v })} />
                <Field label="Descripción" v={editing.descEs} on={(v) => setEditing({ ...editing, descEs: v })} multiline />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xs font-mono tracking-widest text-slate-500 mb-3">CONTENT · EN (vacío = usa ES)</h3>
              <div className="space-y-3">
                <Field label="Name" v={editing.nameEn} on={(v) => setEditing({ ...editing, nameEn: v })} />
                <Field label="Tagline" v={editing.taglineEn} on={(v) => setEditing({ ...editing, taglineEn: v })} />
                <Field label="Description" v={editing.descEn} on={(v) => setEditing({ ...editing, descEn: v })} multiline />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xs font-mono tracking-widest text-slate-500 mb-3">ENLACES (opcionales)</h3>
              <div className="grid grid-cols-1 gap-3">
                <Field label="Web URL" v={editing.web} on={(v) => setEditing({ ...editing, web: v })} />
                <Field label="Play Store URL" v={editing.playStore} on={(v) => setEditing({ ...editing, playStore: v })} />
                <Field label="App Store URL" v={editing.appStore} on={(v) => setEditing({ ...editing, appStore: v })} />
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-mono tracking-widest text-slate-500">REPOSITORIOS</h3>
                <button onClick={() => setEditing({ ...editing, repos: [...editing.repos, { type: 'frontend', url: '', label: '', isPublic: true }] })} className="text-xs px-2 py-1 glass rounded">+ Repo</button>
              </div>
              {editing.repos.map((r, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 mb-2 items-center">
                  <select value={r.type} onChange={(e) => { const c = [...editing.repos]; c[i].type = e.target.value; setEditing({ ...editing, repos: c }); }} className="col-span-2 bg-black/30 border border-white/10 rounded px-2 py-1 text-sm">
                    {['frontend','backend','mobile','fullstack','infra','other'].map((t) => <option key={t}>{t}</option>)}
                  </select>
                  <input placeholder="https://github.com/..." value={r.url} onChange={(e) => { const c = [...editing.repos]; c[i].url = e.target.value; setEditing({ ...editing, repos: c }); }} className="col-span-6 bg-black/30 border border-white/10 rounded px-2 py-1 text-sm" />
                  <input placeholder="label" value={r.label} onChange={(e) => { const c = [...editing.repos]; c[i].label = e.target.value; setEditing({ ...editing, repos: c }); }} className="col-span-2 bg-black/30 border border-white/10 rounded px-2 py-1 text-sm" />
                  <label className="col-span-1 text-xs flex items-center gap-1"><input type="checkbox" checked={r.isPublic} onChange={(e) => { const c = [...editing.repos]; c[i].isPublic = e.target.checked; setEditing({ ...editing, repos: c }); }} /> pub</label>
                  <button onClick={() => { const c = [...editing.repos]; c.splice(i, 1); setEditing({ ...editing, repos: c }); }} className="col-span-1 text-rose-400 hover:bg-rose-500/20 rounded p-1"><Trash2 size={14} /></button>
                </div>
              ))}
            </div>

            <button onClick={save} className="w-full py-2.5 bg-violet-500 hover:bg-violet-400 text-slate-900 rounded-lg font-semibold inline-flex items-center justify-center gap-2">
              <Save size={16} /> Guardar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function Field({ label, v, on, type = 'text', multiline = false }: { label: string; v: string; on: (v: string) => void; type?: string; multiline?: boolean }) {
  return (
    <div>
      <label className="text-xs font-mono text-slate-500 tracking-widest">{label.toUpperCase()}</label>
      {multiline ? (
        <textarea value={v} onChange={(e) => on(e.target.value)} rows={3} className="mt-1 w-full bg-black/30 border border-white/10 rounded px-3 py-2 outline-none focus:border-violet-400 text-sm" />
      ) : (
        <input type={type} value={v} onChange={(e) => on(e.target.value)} className="mt-1 w-full bg-black/30 border border-white/10 rounded px-3 py-2 outline-none focus:border-violet-400 text-sm" />
      )}
    </div>
  );
}
