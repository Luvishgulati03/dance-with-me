import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';

const EMPTY = { question_en: '', question_fr: '', answer_en: '', answer_fr: '', sort_order: 0 };

const FAQManager = () => {
    const [faqs, setFaqs] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const token = localStorage.getItem('admin_token');

    const fetchFaqs = () => fetch('/api/faqs').then(r => r.json()).then(setFaqs).catch(console.error);
    useEffect(() => { fetchFaqs(); }, []);

    const openNew = () => { setForm(EMPTY); setEditing('new'); };
    const openEdit = (f) => { setForm({ ...f }); setEditing(f.id); };
    const close = () => setEditing(null);

    const handleSave = async () => {
        const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
        if (editing === 'new') {
            await fetch('/api/faqs', { method: 'POST', headers, body: JSON.stringify(form) });
        } else {
            await fetch(`/api/faqs/${editing}`, { method: 'PUT', headers, body: JSON.stringify(form) });
        }
        close(); fetchFaqs();
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this FAQ?')) return;
        await fetch(`/api/faqs/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
        fetchFaqs();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">FAQ Manager</h1>
                <button onClick={openNew} className="flex items-center gap-2 bg-brand-purple hover:bg-brand-purple/80 text-white font-bold py-2 px-6 rounded-xl"><Plus className="h-5 w-5" /> Add FAQ</button>
            </div>
            <div className="space-y-3">
                {faqs.map(faq => (
                    <div key={faq.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-medium text-sm truncate">{faq.question_en}</p>
                            <p className="text-brand-textMuted text-xs mt-1 truncate">{faq.answer_en}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                            <button onClick={() => openEdit(faq)} className="text-brand-textMuted hover:text-brand-gold"><Pencil className="h-4 w-4" /></button>
                            <button onClick={() => handleDelete(faq.id)} className="text-brand-textMuted hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
                        </div>
                    </div>
                ))}
            </div>
            {editing !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={close}>
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                    <div className="relative bg-brand-dark border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">{editing === 'new' ? 'Add' : 'Edit'} FAQ</h2>
                            <button onClick={close} className="text-brand-textMuted hover:text-white"><X className="h-5 w-5" /></button>
                        </div>
                        <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div><label className="block text-xs text-brand-textMuted mb-1">Question (EN)</label>
                                    <input value={form.question_en} onChange={e => setForm({ ...form, question_en: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" /></div>
                                <div><label className="block text-xs text-brand-textMuted mb-1">Question (FR)</label>
                                    <input value={form.question_fr} onChange={e => setForm({ ...form, question_fr: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" /></div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div><label className="block text-xs text-brand-textMuted mb-1">Answer (EN)</label>
                                    <textarea value={form.answer_en} onChange={e => setForm({ ...form, answer_en: e.target.value })} rows={3} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple resize-y" /></div>
                                <div><label className="block text-xs text-brand-textMuted mb-1">Answer (FR)</label>
                                    <textarea value={form.answer_fr} onChange={e => setForm({ ...form, answer_fr: e.target.value })} rows={3} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple resize-y" /></div>
                            </div>
                            <div><label className="block text-xs text-brand-textMuted mb-1">Sort Order</label>
                                <input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} className="w-20 bg-white/10 border border-white/20 rounded-xl px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" /></div>
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

export default FAQManager;
