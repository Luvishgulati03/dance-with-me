import { useState, useEffect } from 'react';
import { Save, Check } from 'lucide-react';
import MediaPicker from './MediaPicker';

const FeaturesManager = () => {
    const [features, setFeatures] = useState([]);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const token = localStorage.getItem('admin_token');

    useEffect(() => { fetch('/api/features').then(r => r.json()).then(setFeatures).catch(console.error); }, []);

    const update = (id, field, value) => {
        setFeatures(prev => prev.map(f => f.id === id ? { ...f, [field]: value } : f));
        setSaved(false);
    };

    const saveAll = async () => {
        setSaving(true);
        const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
        for (const f of features) {
            await fetch(`/api/features/${f.id}`, { method: 'PUT', headers, body: JSON.stringify(f) });
        }
        setSaving(false); setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Features Manager</h1>
                <button onClick={saveAll} disabled={saving} className="flex items-center gap-2 bg-brand-purple hover:bg-brand-purple/80 text-white font-bold py-2 px-6 rounded-xl disabled:opacity-50">
                    {saved ? <><Check className="h-5 w-5" /> Saved</> : <><Save className="h-5 w-5" /> {saving ? 'Saving...' : 'Save All'}</>}
                </button>
            </div>
            <div className="space-y-6">
                {features.map(f => (
                    <div key={f.id} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-brand-purple/20 text-brand-purple text-xs font-bold px-3 py-1 rounded-full">{f.feature_key}</span>
                            <span className="text-brand-textMuted text-xs">/{f.slug}</span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div><label className="block text-xs text-brand-textMuted mb-1">Title (EN)</label>
                                <input value={f.title_en} onChange={e => update(f.id, 'title_en', e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" /></div>
                            <div><label className="block text-xs text-brand-textMuted mb-1">Title (FR)</label>
                                <input value={f.title_fr} onChange={e => update(f.id, 'title_fr', e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" /></div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div><label className="block text-xs text-brand-textMuted mb-1">Subtitle (EN)</label>
                                <textarea value={f.subtitle_en} onChange={e => update(f.id, 'subtitle_en', e.target.value)} rows={2} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple resize-y" /></div>
                            <div><label className="block text-xs text-brand-textMuted mb-1">Subtitle (FR)</label>
                                <textarea value={f.subtitle_fr} onChange={e => update(f.id, 'subtitle_fr', e.target.value)} rows={2} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple resize-y" /></div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div><label className="block text-xs text-brand-textMuted mb-1">Description (EN)</label>
                                <textarea value={f.desc_en} onChange={e => update(f.id, 'desc_en', e.target.value)} rows={2} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple resize-y" /></div>
                            <div><label className="block text-xs text-brand-textMuted mb-1">Description (FR)</label>
                                <textarea value={f.desc_fr} onChange={e => update(f.id, 'desc_fr', e.target.value)} rows={2} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple resize-y" /></div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <MediaPicker label="Feature Image" accept="image" value={f.image_url} onChange={url => update(f.id, 'image_url', url)} />
                            <MediaPicker label="Feature Video" accept="video" value={f.video_url} onChange={url => update(f.id, 'video_url', url)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturesManager;
