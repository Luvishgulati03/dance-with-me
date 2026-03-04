import { useState, useEffect } from 'react';
import { Save, Check } from 'lucide-react';
import MediaPicker from './MediaPicker';

const PersonasManager = () => {
    const [personas, setPersonas] = useState([]);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const token = localStorage.getItem('admin_token');

    useEffect(() => { fetch('/api/personas').then(r => r.json()).then(setPersonas).catch(console.error); }, []);

    const update = (id, field, value) => {
        setPersonas(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
        setSaved(false);
    };

    const saveAll = async () => {
        setSaving(true);
        const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
        for (const p of personas) {
            await fetch(`/api/personas/${p.id}`, { method: 'PUT', headers, body: JSON.stringify(p) });
        }
        setSaving(false); setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Personas Manager</h1>
                <button onClick={saveAll} disabled={saving} className="flex items-center gap-2 bg-brand-purple hover:bg-brand-purple/80 text-white font-bold py-2 px-6 rounded-xl disabled:opacity-50">
                    {saved ? <><Check className="h-5 w-5" /> Saved</> : <><Save className="h-5 w-5" /> {saving ? 'Saving...' : 'Save All'}</>}
                </button>
            </div>
            <div className="space-y-6">
                {personas.map(p => (
                    <div key={p.id} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <span className="bg-brand-gold/20 text-brand-gold text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">{p.persona_key}</span>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div><label className="block text-xs text-brand-textMuted mb-1">Title (EN)</label>
                                <input value={p.title_en} onChange={e => update(p.id, 'title_en', e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" /></div>
                            <div><label className="block text-xs text-brand-textMuted mb-1">Title (FR)</label>
                                <input value={p.title_fr} onChange={e => update(p.id, 'title_fr', e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" /></div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div><label className="block text-xs text-brand-textMuted mb-1">Description (EN)</label>
                                <textarea value={p.desc_en} onChange={e => update(p.id, 'desc_en', e.target.value)} rows={2} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple resize-y" /></div>
                            <div><label className="block text-xs text-brand-textMuted mb-1">Description (FR)</label>
                                <textarea value={p.desc_fr} onChange={e => update(p.id, 'desc_fr', e.target.value)} rows={2} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple resize-y" /></div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div><label className="block text-xs text-brand-textMuted mb-1">Features (JSON array)</label>
                                <textarea value={JSON.stringify(p.features)} onChange={e => { try { update(p.id, 'features', JSON.parse(e.target.value)); } catch { } }} rows={2} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-purple resize-y" /></div>
                            <div><label className="block text-xs text-brand-textMuted mb-1">Plans (JSON array)</label>
                                <textarea value={JSON.stringify(p.plans)} onChange={e => { try { update(p.id, 'plans', JSON.parse(e.target.value)); } catch { } }} rows={2} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-purple resize-y" /></div>
                        </div>
                        <MediaPicker label="Persona Image" accept="image" value={p.image_url} onChange={url => update(p.id, 'image_url', url)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PersonasManager;
