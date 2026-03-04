import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import MediaPicker from './MediaPicker';

const EMPTY = { name: '', address_en: '', address_fr: '', styles: [], rating: 0, reviews: 0, image_url: '', sort_order: 0 };

const StudiosManager = () => {
    const [studios, setStudios] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [stylesInput, setStylesInput] = useState('');
    const token = localStorage.getItem('admin_token');

    const fetchStudios = () => fetch('/api/studios').then(r => r.json()).then(setStudios).catch(console.error);
    useEffect(() => { fetchStudios(); }, []);

    const openNew = () => { setForm(EMPTY); setStylesInput(''); setEditing('new'); };
    const openEdit = (s) => { setForm({ ...s }); setStylesInput(s.styles?.join(', ') || ''); setEditing(s.id); };
    const close = () => { setEditing(null); };

    const handleSave = async () => {
        const body = { ...form, styles: stylesInput.split(',').map(s => s.trim()).filter(Boolean) };
        const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
        if (editing === 'new') {
            await fetch('/api/studios', { method: 'POST', headers, body: JSON.stringify(body) });
        } else {
            await fetch(`/api/studios/${editing}`, { method: 'PUT', headers, body: JSON.stringify(body) });
        }
        close(); fetchStudios();
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this studio?')) return;
        await fetch(`/api/studios/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
        fetchStudios();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Studios Manager</h1>
                <button onClick={openNew} className="flex items-center gap-2 bg-brand-purple hover:bg-brand-purple/80 text-white font-bold py-2 px-6 rounded-xl"><Plus className="h-5 w-5" /> Add Studio</button>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5"><tr>
                        <th className="px-6 py-4 text-xs text-brand-textMuted uppercase">Name</th>
                        <th className="px-6 py-4 text-xs text-brand-textMuted uppercase hidden md:table-cell">Address</th>
                        <th className="px-6 py-4 text-xs text-brand-textMuted uppercase hidden md:table-cell">Rating</th>
                        <th className="px-6 py-4 text-xs text-brand-textMuted uppercase">Actions</th>
                    </tr></thead>
                    <tbody className="divide-y divide-white/5">
                        {studios.map(s => (
                            <tr key={s.id} className="hover:bg-white/5">
                                <td className="px-6 py-4 text-white text-sm">{s.name}</td>
                                <td className="px-6 py-4 text-brand-textMuted text-sm hidden md:table-cell">{s.address_en}</td>
                                <td className="px-6 py-4 text-brand-gold text-sm hidden md:table-cell">⭐ {s.rating}</td>
                                <td className="px-6 py-4"><div className="flex gap-2">
                                    <button onClick={() => openEdit(s)} className="text-brand-textMuted hover:text-brand-gold"><Pencil className="h-4 w-4" /></button>
                                    <button onClick={() => handleDelete(s.id)} className="text-brand-textMuted hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
                                </div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {editing !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={close}>
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                    <div className="relative bg-brand-dark border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">{editing === 'new' ? 'Add' : 'Edit'} Studio</h2>
                            <button onClick={close} className="text-brand-textMuted hover:text-white"><X className="h-5 w-5" /></button>
                        </div>
                        <div className="space-y-4">
                            <div><label className="block text-xs text-brand-textMuted mb-1">Name</label>
                                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" /></div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div><label className="block text-xs text-brand-textMuted mb-1">Address (EN)</label>
                                    <input value={form.address_en} onChange={e => setForm({ ...form, address_en: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" /></div>
                                <div><label className="block text-xs text-brand-textMuted mb-1">Address (FR)</label>
                                    <input value={form.address_fr} onChange={e => setForm({ ...form, address_fr: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" /></div>
                            </div>
                            <div><label className="block text-xs text-brand-textMuted mb-1">Styles (comma-separated)</label>
                                <input value={stylesInput} onChange={e => setStylesInput(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" placeholder="Hip-Hop, Salsa, Jazz" /></div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div><label className="block text-xs text-brand-textMuted mb-1">Rating</label>
                                    <input type="number" step="0.1" value={form.rating} onChange={e => setForm({ ...form, rating: parseFloat(e.target.value) || 0 })} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" /></div>
                                <div><label className="block text-xs text-brand-textMuted mb-1">Reviews</label>
                                    <input type="number" value={form.reviews} onChange={e => setForm({ ...form, reviews: parseInt(e.target.value) || 0 })} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" /></div>
                            </div>
                            <MediaPicker label="Studio Image" accept="image" value={form.image_url} onChange={url => setForm({ ...form, image_url: url })} />
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

export default StudiosManager;
