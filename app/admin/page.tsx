'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { gql } from '@/lib/gql';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Save, X, LogOut, Rocket, MessageSquare, Check, Ban, Calendar } from 'lucide-react';

const ADMIN_DATA = `query {
  projects(locale: "es", includeHidden: true) {
    id slug order featured color isMobile tech year visible
    i18n { name tagline description longDescription }
    repos { type url label isPublic }
    links { web playStore appStore }
    screenshots { url caption }
    thumbnail
  }
  siteConfig(locale: "es") {
    profile { name role bio }
    social { github linkedin youtube email }
    avatar
    workingOn { title name proposalId }
  }
  proposals {
    id name email title message status createdAt
  }
}`;

const CREATE = `mutation($input: CreateProjectInput!) { createProject(input: $input) { id } }`;
const UPDATE = `mutation($input: UpdateProjectInput!) { updateProject(input: $input) { id } }`;
const DELETE = `mutation($id: String!) { deleteProject(id: $id) }`;
const LOGOUT = `mutation { logout }`;

const ACCEPT_PROPOSAL = `mutation($id: String!) { acceptProposal(id: $id) { id status } }`;
const REJECT_PROPOSAL = `mutation($id: String!) { rejectProposal(id: $id) { id status } }`;
const COMPLETE_PROPOSAL = `mutation($id: String!) { completeProposal(id: $id) { id status } }`;
const DELETE_PROPOSAL = `mutation($id: String!) { deleteProposal(id: $id) }`;
const CLEAR_WORKING_ON = `mutation { updateSiteConfig(input: { clearWorkingOn: true }) { profile { name } } }`;
const UPDATE_WORKING_ON = `mutation($title: String!, $name: String!) {
  updateSiteConfig(input: { workingOn: { title: $title, name: $name } }) {
    profile { name }
  }
}`;

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
  const [saving, setSaving] = useState(false);

  const [proposals, setProposals] = useState<any[]>([]);
  const [siteConfig, setSiteConfig] = useState<any>(null);
  const [tab, setTab] = useState<'projects' | 'proposals'>('projects');

  async function load() {
    try {
      const r: any = await gql().request(ADMIN_DATA);
      setList(r.projects || []);
      setProposals(r.proposals || []);
      setSiteConfig(r.siteConfig || null);
    } catch (e) {
      console.error(e);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleAcceptProposal(id: string) {
    try {
      await gql().request(ACCEPT_PROPOSAL, { id });
      load();
    } catch (e: any) {
      alert('Error: ' + (e.message || 'unknown'));
    }
  }

  async function handleRejectProposal(id: string) {
    try {
      await gql().request(REJECT_PROPOSAL, { id });
      load();
    } catch (e: any) {
      alert('Error: ' + (e.message || 'unknown'));
    }
  }

  async function handleCompleteProposal(id: string) {
    try {
      await gql().request(COMPLETE_PROPOSAL, { id });
      load();
    } catch (e: any) {
      alert('Error: ' + (e.message || 'unknown'));
    }
  }

  async function handleDeleteProposal(id: string) {
    if (!confirm('¿Borrar esta propuesta permanentemente?')) return;
    try {
      await gql().request(DELETE_PROPOSAL, { id });
      load();
    } catch (e: any) {
      alert('Error: ' + (e.message || 'unknown'));
    }
  }

  async function handleClearWorkingOn() {
    try {
      await gql().request(CLEAR_WORKING_ON);
      load();
    } catch (e: any) {
      alert('Error: ' + (e.message || 'unknown'));
    }
  }

  async function handleSetWorkingOn(title: string, name: string) {
    try {
      await gql().request(UPDATE_WORKING_ON, { title, name });
      load();
    } catch (e: any) {
      alert('Error: ' + (e.message || 'unknown'));
    }
  }

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
    setSaving(true);
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
    } finally {
      setSaving(false);
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
    <main className="relative z-10 min-h-[100svh] p-4 sm:p-6 md:p-10 max-w-6xl mx-auto safe-x">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-10">
        <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
          <Rocket className="text-violet-400" size={22} /> <span className="text-gradient">Mission Control</span>
        </h1>
        <div className="flex gap-2">
          {tab === 'projects' && (
            <button onClick={() => setEditing({ ...blank })} className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-violet-500 text-slate-900 rounded-lg font-semibold hover:bg-violet-400 transition text-sm">
              <Plus size={16} /> Nuevo
            </button>
          )}
          <button onClick={logout} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 glass rounded-lg hover:bg-white/10 transition text-sm">
            <LogOut size={16} /> <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </header>

      {/* Tabs Selector */}
      <div className="flex gap-6 border-b border-white/10 mb-8">
        <button
          onClick={() => setTab('projects')}
          className={`pb-3 text-sm font-semibold tracking-wider transition relative outline-none ${
            tab === 'projects' ? 'text-violet-400' : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          Proyectos
          {tab === 'projects' && (
            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-violet-500" />
          )}
        </button>
        <button
          onClick={() => setTab('proposals')}
          className={`pb-3 text-sm font-semibold tracking-wider transition relative outline-none flex items-center gap-2 ${
            tab === 'proposals' ? 'text-violet-400' : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          <span>Propuestas y Mensajes</span>
          {proposals.filter((p) => p.status === 'pending').length > 0 && (
            <span className="bg-violet-500 text-slate-900 text-[10px] px-2 py-0.5 rounded-full font-extrabold animate-pulse">
              {proposals.filter((p) => p.status === 'pending').length}
            </span>
          )}
          {tab === 'proposals' && (
            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-violet-500" />
          )}
        </button>
      </div>

      {loading && <div className="text-slate-400">Cargando…</div>}

      {!loading && tab === 'projects' && (
        <>
          {list.length === 0 && (
            <div className="glass rounded-xl p-8 text-center text-slate-400">
              <p className="mb-2">Aún no hay proyectos.</p>
              <p className="text-sm text-slate-500">Crea el primero con el botón <b>Nuevo</b> ↑</p>
            </div>
          )}

          <div className="space-y-3">
            {list.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4"
                style={{ borderLeftColor: p.color, borderLeftWidth: 4 }}
              >
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: p.color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold truncate text-sm sm:text-base">{p.i18n?.name || p.slug}</span>
                    {p.featured && <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-amber-400 text-amber-400">★</span>}
                    {!p.visible && <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-500 text-slate-400">HIDDEN</span>}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-mono truncate">{p.slug} · order {p.order} {p.year ? `· ${p.year}` : ''}</div>
                </div>
                <button onClick={() => startEdit(p)} className="p-2 hover:bg-white/10 active:bg-white/15 rounded-lg" aria-label="Edit"><Pencil size={16} /></button>
                <button onClick={() => del(p.id)} className="p-2 hover:bg-rose-500/20 active:bg-rose-500/30 rounded-lg text-rose-400" aria-label="Delete"><Trash2 size={16} /></button>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {!loading && tab === 'proposals' && (
        <>
          {/* Active work in progress banner */}
          {siteConfig?.workingOn ? (
            <div className="glass rounded-xl p-4 mb-6 border border-amber-500/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-xs font-mono tracking-wider text-amber-400 uppercase mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Trabajo en Curso Activo
                </h3>
                <p className="text-sm text-slate-200 font-semibold">{siteConfig.workingOn.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">Cliente: {siteConfig.workingOn.name}</p>
              </div>
              <button
                onClick={handleClearWorkingOn}
                className="px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500/20 active:bg-rose-500/25 text-rose-400 text-xs font-semibold rounded-lg transition border border-rose-500/20"
              >
                Desactivar Estado
              </button>
            </div>
          ) : (
            <div className="glass rounded-xl p-4 mb-6 border border-emerald-500/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-xs font-mono tracking-wider text-emerald-400 uppercase mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Estado Disponible
                </h3>
                <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                  Actualmente se muestra "Disponible para proyectos" en el portfolio. Puedes activar un estado de trabajo aceptando una propuesta de la lista de abajo, o creándolo manualmente.
                </p>
              </div>
              <button
                onClick={() => {
                  const t = prompt('Título del proyecto:');
                  const n = prompt('Nombre del cliente / empresa:');
                  if (t && n) handleSetWorkingOn(t, n);
                }}
                className="px-3.5 py-2 bg-violet-500 hover:bg-violet-400 text-slate-900 font-bold text-xs rounded-lg transition"
              >
                + Activar Manualmente
              </button>
            </div>
          )}

          {/* Proposals List */}
          {proposals.length === 0 && (
            <div className="glass rounded-xl p-8 text-center text-slate-400">
              <p className="mb-2">Aún no hay propuestas ni mensajes.</p>
              <p className="text-sm text-slate-500">Los mensajes enviados desde el formulario de contacto aparecerán aquí.</p>
            </div>
          )}

          <div className="space-y-4">
            {proposals.map((p) => {
              let badgeColor = 'text-slate-400 border-slate-500/20 bg-slate-500/5';
              let badgeText = 'Pendiente';
              if (p.status === 'accepted') {
                badgeColor = 'text-violet-300 border-violet-500/20 bg-violet-500/10';
                badgeText = 'Aceptado (En Curso)';
              } else if (p.status === 'completed') {
                badgeColor = 'text-emerald-300 border-emerald-500/20 bg-emerald-500/10';
                badgeText = 'Completado';
              } else if (p.status === 'rejected') {
                badgeColor = 'text-rose-400 border-rose-500/20 bg-rose-500/10';
                badgeText = 'Rechazado';
              }

              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-xl p-4 sm:p-5 flex flex-col gap-4 border border-white/5 hover:border-white/10 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h4 className="font-semibold text-base text-slate-200">{p.title}</h4>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${badgeColor}`}>
                          {badgeText.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 flex flex-wrap gap-x-2 gap-y-1">
                        <span className="font-medium text-slate-300">{p.name}</span>
                        <span className="text-slate-600">·</span>
                        <a href={`mailto:${p.email}`} className="text-violet-400 hover:underline">{p.email}</a>
                      </p>
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5 sm:self-start mt-1 sm:mt-0">
                      <Calendar size={12} /> {new Date(p.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  <div className="text-sm text-slate-300 bg-black/20 rounded-lg p-3 whitespace-pre-wrap leading-relaxed font-sans border border-white/5">
                    {p.message}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {p.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleAcceptProposal(p.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-violet-500 hover:bg-violet-400 text-slate-900 text-xs font-bold rounded-lg transition"
                        >
                          <Check size={13} /> Aceptar y Empezar
                        </button>
                        <button
                          onClick={() => handleRejectProposal(p.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 glass hover:bg-rose-500/10 hover:text-rose-300 border border-white/10 hover:border-rose-500/20 text-slate-300 text-xs font-semibold rounded-lg transition"
                        >
                          <Ban size={13} /> Rechazar
                        </button>
                      </>
                    )}
                    {p.status === 'accepted' && (
                      <>
                        <button
                          onClick={() => handleCompleteProposal(p.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 text-xs font-bold rounded-lg transition"
                        >
                          <Check size={13} /> Marcar Completado
                        </button>
                        <button
                          onClick={() => handleRejectProposal(p.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 glass hover:bg-rose-500/10 hover:text-rose-300 border border-white/10 hover:border-rose-500/20 text-slate-300 text-xs font-semibold rounded-lg transition"
                        >
                          <Ban size={13} /> Cancelar / Rechazar
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDeleteProposal(p.id)}
                      className="ml-auto p-2 hover:bg-rose-500/20 active:bg-rose-500/30 rounded-lg text-rose-400 transition"
                      title="Eliminar propuesta"
                      aria-label="Delete proposal"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto" onClick={() => setEditing(null)}>
          <div
            className="bg-slate-950 border border-white/10 rounded-t-2xl sm:rounded-2xl max-w-3xl w-full p-5 sm:p-6 max-h-[95svh] sm:max-h-[90vh] overflow-y-auto scrollbar-thin safe-x"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 -mt-5 sm:-mt-6 -mx-5 sm:-mx-6 px-5 sm:px-6 py-4 mb-5 bg-slate-950 border-b border-white/5 flex items-center justify-between z-10">
              <h2 className="text-lg sm:text-xl font-bold">{editing.id ? 'Editar' : 'Nuevo proyecto'}</h2>
              <button onClick={() => setEditing(null)} className="p-2 hover:bg-white/10 rounded" aria-label="Close"><X size={18} /></button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
              <Field label="Slug" v={editing.slug} on={(v) => setEditing({ ...editing, slug: v })} />
              <Field label="Color" v={editing.color} on={(v) => setEditing({ ...editing, color: v })} type="color" />
              <Field label="Order" v={String(editing.order)} on={(v) => setEditing({ ...editing, order: Number(v) || 0 })} type="number" />
              <Field label="Year" v={String(editing.year || '')} on={(v) => setEditing({ ...editing, year: v ? Number(v) : undefined })} type="number" />
              <div className="col-span-2">
                <Field label="Thumbnail URL" v={editing.thumbnail || ''} on={(v) => setEditing({ ...editing, thumbnail: v })} />
              </div>
              <div className="col-span-2">
                <Field label="Tech (comma)" v={editing.tech} on={(v) => setEditing({ ...editing, tech: v })} />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-6 text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} /> Featured</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={editing.visible} onChange={(e) => setEditing({ ...editing, visible: e.target.checked })} /> Visible</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={editing.isMobile} onChange={(e) => setEditing({ ...editing, isMobile: e.target.checked })} /> Mobile app</label>
            </div>

            <Section title="CONTENIDO · ES">
              <Field label="Nombre" v={editing.nameEs} on={(v) => setEditing({ ...editing, nameEs: v })} />
              <Field label="Tagline" v={editing.taglineEs} on={(v) => setEditing({ ...editing, taglineEs: v })} />
              <Field label="Descripción" v={editing.descEs} on={(v) => setEditing({ ...editing, descEs: v })} multiline />
            </Section>

            <Section title="CONTENT · EN (vacío = usa ES)">
              <Field label="Name" v={editing.nameEn} on={(v) => setEditing({ ...editing, nameEn: v })} />
              <Field label="Tagline" v={editing.taglineEn} on={(v) => setEditing({ ...editing, taglineEn: v })} />
              <Field label="Description" v={editing.descEn} on={(v) => setEditing({ ...editing, descEn: v })} multiline />
            </Section>

            <Section title="ENLACES (opcionales)">
              <Field label="Web URL" v={editing.web} on={(v) => setEditing({ ...editing, web: v })} />
              <Field label="Play Store URL" v={editing.playStore} on={(v) => setEditing({ ...editing, playStore: v })} />
              <Field label="App Store URL" v={editing.appStore} on={(v) => setEditing({ ...editing, appStore: v })} />
            </Section>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-mono tracking-widest text-slate-500">REPOSITORIOS</h3>
                <button onClick={() => setEditing({ ...editing, repos: [...editing.repos, { type: 'frontend', url: '', label: '', isPublic: true }] })} className="text-xs px-3 py-1.5 glass rounded">+ Repo</button>
              </div>
              {editing.repos.map((r, i) => (
                <div key={i} className="glass rounded-lg p-2 mb-2">
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <select value={r.type} onChange={(e) => { const c = [...editing.repos]; c[i].type = e.target.value; setEditing({ ...editing, repos: c }); }} className="col-span-4 sm:col-span-2 bg-black/30 border border-white/10 rounded px-2 py-2 text-sm">
                      {['frontend','backend','mobile','fullstack','infra','other'].map((t) => <option key={t}>{t}</option>)}
                    </select>
                    <input placeholder="label" value={r.label} onChange={(e) => { const c = [...editing.repos]; c[i].label = e.target.value; setEditing({ ...editing, repos: c }); }} className="col-span-6 sm:col-span-3 bg-black/30 border border-white/10 rounded px-2 py-2 text-sm" />
                    <label className="col-span-1 text-xs flex items-center gap-1 justify-center"><input type="checkbox" checked={r.isPublic} onChange={(e) => { const c = [...editing.repos]; c[i].isPublic = e.target.checked; setEditing({ ...editing, repos: c }); }} /></label>
                    <button onClick={() => { const c = [...editing.repos]; c.splice(i, 1); setEditing({ ...editing, repos: c }); }} className="col-span-1 text-rose-400 hover:bg-rose-500/20 rounded p-1 flex items-center justify-center"><Trash2 size={14} /></button>
                    <input placeholder="https://github.com/..." value={r.url} onChange={(e) => { const c = [...editing.repos]; c[i].url = e.target.value; setEditing({ ...editing, repos: c }); }} className="col-span-12 sm:col-span-5 bg-black/30 border border-white/10 rounded px-2 py-2 text-sm" />
                  </div>
                </div>
              ))}
            </div>

            <button onClick={save} disabled={saving} className="w-full py-3 bg-violet-500 hover:bg-violet-400 disabled:opacity-60 text-slate-900 rounded-lg font-semibold inline-flex items-center justify-center gap-2 text-base">
              <Save size={16} /> {saving ? 'Guardando…' : 'Guardar'}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-xs font-mono tracking-widest text-slate-500 mb-3">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, v, on, type = 'text', multiline = false }: { label: string; v: string; on: (v: string) => void; type?: string; multiline?: boolean }) {
  const id = `f_${label.replace(/\W/g, '_')}`;
  return (
    <div>
      <label htmlFor={id} className="text-[11px] sm:text-xs font-mono text-slate-500 tracking-widest">{label.toUpperCase()}</label>
      {multiline ? (
        <textarea id={id} value={v} onChange={(e) => on(e.target.value)} rows={3} className="mt-1 w-full bg-black/30 border border-white/10 rounded px-3 py-2 outline-none focus:border-violet-400 text-sm" />
      ) : (
        <input id={id} type={type} value={v} onChange={(e) => on(e.target.value)} className="mt-1 w-full bg-black/30 border border-white/10 rounded px-3 py-2 outline-none focus:border-violet-400 text-sm" />
      )}
    </div>
  );
}
