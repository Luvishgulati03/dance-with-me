import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Save, Upload } from 'lucide-react';

const MediaManager = () => {
    const [mediaItems, setMediaItems] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ context: '', url: '', type: 'image' });
    const token = localStorage.getItem('admin_token');

    const fetchMedia = () => fetch('/api/upload/media').then(r => r.json()).then(setMediaItems).catch(console.error);
    useEffect(() => { fetchMedia(); }, []);

    const openNew = () => { setForm({ context: '', url: '', type: 'image' }); setEditing('new'); };
    const openEdit = (m) => { setForm({ ...m }); setEditing(m.id); };
    const close = () => setEditing(null);

    const handleSave = async () => {
        const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
        if (editing === 'new') {
            await fetch('/api/upload/media', { method: 'POST', headers, body: JSON.stringify(form) });
        } else {
            await fetch(`/api/upload/media/${editing}`, { method: 'PUT', headers, body: JSON.stringify(form) });
        }
        close(); fetchMedia();
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this media item?')) return;
        await fetch(`/api/upload/media/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
        fetchMedia();
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0]; if (!file) return;
        const fd = new FormData(); fd.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
        const data = await res.json();
        setForm(prev => ({ ...prev, url: data.url }));
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Media Manager</h1>
                <button onClick={openNew} className="flex items-center gap-2 bg-brand-purple hover:bg-brand-purple/80 text-white font-bold py-2 px-6 rounded-xl"><Plus className="h-5 w-5" /> Add Media</button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mediaItems.map(m => (
                    <div key={m.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors">
                        <div className="h-32 rounded-xl overflow-hidden bg-black/30 mb-3 flex items-center justify-center">
                            {m.type === 'image' ? (
                                <img src={m.url} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                            ) : (
                                <video src={m.url} className="w-full h-full object-cover" muted />
                            )}
                        </div>
                        <p className="text-white text-sm font-medium truncate">{m.context}</p>
                        <p className="text-brand-textMuted text-xs truncate mt-1">{m.url}</p>
                        <span className="bg-brand-purple/20 text-brand-purple text-xs px-2 py-0.5 rounded-full mt-2 inline-block">{m.type}</span>
                        <div className="flex gap-2 mt-3">
                            <button onClick={() => openEdit(m)} className="text-brand-textMuted hover:text-brand-gold text-xs flex items-center gap-1"><Pencil className="h-3 w-3" /> Edit</button>
                            <button onClick={() => handleDelete(m.id)} className="text-brand-textMuted hover:text-red-400 text-xs flex items-center gap-1"><Trash2 className="h-3 w-3" /> Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            {editing !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={close}>
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                    <div className="relative bg-brand-dark border border-white/10 rounded-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">{editing === 'new' ? 'Add' : 'Edit'} Media</h2>
                            <button onClick={close} className="text-brand-textMuted hover:text-white"><X className="h-5 w-5" /></button>
                        </div>
                        <div className="space-y-4">
                            <div><label className="block text-xs text-brand-textMuted mb-1">Context (e.g. hero_video, studio_image_1)</label>
                                <input value={form.context} onChange={e => setForm({ ...form, context: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" /></div>
                            <div><label className="block text-xs text-brand-textMuted mb-1">Type</label>
                                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple">
                                    <option value="image" className="bg-brand-dark">Image</option>
                                    <option value="video" className="bg-brand-dark">Video</option>
                                </select></div>
                            <div><label className="block text-xs text-brand-textMuted mb-1">URL (paste or upload)</label>
                                <input value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple mb-2" />
                                <input type="file" accept="image/*,video/*" onChange={handleUpload} className="text-sm text-brand-textMuted file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-brand-purple file:text-white file:text-xs file:cursor-pointer" /></div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 bg-brand-purple hover:bg-brand-purple/80 text-white font-bold py-3 rounded-xl"><Save className="h-5 w-5" /> Save</button>
                            <button onClick={close} className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediaManager;
