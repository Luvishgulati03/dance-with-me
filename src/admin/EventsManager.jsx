import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import MediaPicker from './MediaPicker';

const EMPTY_EVENT = {
    title_en: '', title_fr: '', date: '', time: '', location_en: '', location_fr: '',
    category: 'Festival', event_type: 'organiser', description_en: '', description_fr: '',
    full_description_en: '', full_description_fr: '', tags: [], attendees: '', featured: false,
    image_url: '', video_url: '', sort_order: 0,
};

const CATEGORIES = ['Festival', 'Social', 'Performance', 'Competition'];

const EventsManager = () => {
    const [events, setEvents] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(EMPTY_EVENT);
    const [tagsInput, setTagsInput] = useState('');
    const token = localStorage.getItem('admin_token');

    const fetchEvents = () => fetch('/api/events').then(r => r.json()).then(setEvents).catch(console.error);
    useEffect(() => { fetchEvents(); }, []);

    const openNew = () => { setForm(EMPTY_EVENT); setTagsInput(''); setEditing('new'); };
    const openEdit = (e) => { setForm({ ...e }); setTagsInput(e.tags?.join(', ') || ''); setEditing(e.id); };
    const close = () => { setEditing(null); setForm(EMPTY_EVENT); };

    const handleSave = async () => {
        const body = { ...form, tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean) };
        const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
        if (editing === 'new') {
            await fetch('/api/events', { method: 'POST', headers, body: JSON.stringify(body) });
        } else {
            await fetch(`/api/events/${editing}`, { method: 'PUT', headers, body: JSON.stringify(body) });
        }
        close(); fetchEvents();
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this event?')) return;
        await fetch(`/api/events/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
        fetchEvents();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Events Manager</h1>
                <button onClick={openNew} className="flex items-center gap-2 bg-brand-purple hover:bg-brand-purple/80 text-white font-bold py-2 px-6 rounded-xl transition-all">
                    <Plus className="h-5 w-5" /> Add Event
                </button>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5"><tr>
                        <th className="px-6 py-4 text-xs text-brand-textMuted uppercase">Title</th>
                        <th className="px-6 py-4 text-xs text-brand-textMuted uppercase hidden md:table-cell">Date</th>
                        <th className="px-6 py-4 text-xs text-brand-textMuted uppercase hidden md:table-cell">Category</th>
                        <th className="px-6 py-4 text-xs text-brand-textMuted uppercase">Actions</th>
                    </tr></thead>
                    <tbody className="divide-y divide-white/5">
                        {events.map(event => (
                            <tr key={event.id} className="hover:bg-white/5">
                                <td className="px-6 py-4 text-white text-sm">{event.title_en}</td>
                                <td className="px-6 py-4 text-brand-textMuted text-sm hidden md:table-cell">{event.date}</td>
                                <td className="px-6 py-4 hidden md:table-cell">
                                    <span className="bg-brand-purple/20 text-brand-purple text-xs px-3 py-1 rounded-full">{event.category}</span>
                                </td>
                                <td className="px-6 py-4"><div className="flex gap-2">
                                    <button onClick={() => openEdit(event)} className="text-brand-textMuted hover:text-brand-gold transition-colors"><Pencil className="h-4 w-4" /></button>
                                    <button onClick={() => handleDelete(event.id)} className="text-brand-textMuted hover:text-red-400 transition-colors"><Trash2 className="h-4 w-4" /></button>
                                </div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editing !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={close}>
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                    <div className="relative bg-brand-dark border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">{editing === 'new' ? 'Add Event' : 'Edit Event'}</h2>
                            <button onClick={close} className="text-brand-textMuted hover:text-white"><X className="h-5 w-5" /></button>
                        </div>
                        <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div><label className="block text-xs text-brand-textMuted mb-1">Title (English)</label>
                                    <input value={form.title_en} onChange={e => setForm({ ...form, title_en: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" /></div>
                                <div><label className="block text-xs text-brand-textMuted mb-1">Title (French)</label>
                                    <input value={form.title_fr} onChange={e => setForm({ ...form, title_fr: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" /></div>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div><label className="block text-xs text-brand-textMuted mb-1">Date</label>
                                    <input value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" placeholder="March 15, 2026" /></div>
                                <div><label className="block text-xs text-brand-textMuted mb-1">Time</label>
                                    <input value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" placeholder="6:00 PM – 11:00 PM" /></div>
                                <div><label className="block text-xs text-brand-textMuted mb-1">Category</label>
                                    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple">
                                        {CATEGORIES.map(c => <option key={c} value={c} className="bg-brand-dark">{c}</option>)}
                                    </select></div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div><label className="block text-xs text-brand-textMuted mb-1">Location (English)</label>
                                    <input value={form.location_en} onChange={e => setForm({ ...form, location_en: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" /></div>
                                <div><label className="block text-xs text-brand-textMuted mb-1">Location (French)</label>
                                    <input value={form.location_fr} onChange={e => setForm({ ...form, location_fr: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" /></div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div><label className="block text-xs text-brand-textMuted mb-1">Description (English)</label>
                                    <textarea value={form.description_en} onChange={e => setForm({ ...form, description_en: e.target.value })} rows={2} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple resize-y" /></div>
                                <div><label className="block text-xs text-brand-textMuted mb-1">Description (French)</label>
                                    <textarea value={form.description_fr} onChange={e => setForm({ ...form, description_fr: e.target.value })} rows={2} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple resize-y" /></div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div><label className="block text-xs text-brand-textMuted mb-1">Tags (comma-separated)</label>
                                    <input value={tagsInput} onChange={e => setTagsInput(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" placeholder="Hip-Hop, Salsa, Contemporary" /></div>
                                <div><label className="block text-xs text-brand-textMuted mb-1">Attendees</label>
                                    <input value={form.attendees} onChange={e => setForm({ ...form, attendees: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" placeholder="500+" /></div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <MediaPicker label="Video" accept="video" value={form.video_url} onChange={url => setForm({ ...form, video_url: url })} />
                                <MediaPicker label="Image" accept="image" value={form.image_url} onChange={url => setForm({ ...form, image_url: url })} />
                            </div>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                                    <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="rounded" /> Featured
                                </label>
                                <div><label className="block text-xs text-brand-textMuted mb-1">Sort Order</label>
                                    <input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} className="w-20 bg-white/10 border border-white/20 rounded-xl px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" /></div>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 bg-brand-purple hover:bg-brand-purple/80 text-white font-bold py-3 rounded-xl transition-all"><Save className="h-5 w-5" /> Save</button>
                            <button onClick={close} className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-colors">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventsManager;
