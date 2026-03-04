import { useState, useEffect } from 'react';
import { Save, Check } from 'lucide-react';

const PlansManager = () => {
    const [plans, setPlans] = useState([]);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const token = localStorage.getItem('admin_token');

    useEffect(() => { fetch('/api/plans').then(r => r.json()).then(setPlans).catch(console.error); }, []);

    const update = (id, field, value) => {
        setPlans(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
        setSaved(false);
    };

    const saveAll = async () => {
        setSaving(true);
        const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
        for (const plan of plans) {
            await fetch(`/api/plans/${plan.id}`, { method: 'PUT', headers, body: JSON.stringify(plan) });
        }
        setSaving(false); setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Plans Manager</h1>
                <button onClick={saveAll} disabled={saving} className="flex items-center gap-2 bg-brand-purple hover:bg-brand-purple/80 text-white font-bold py-2 px-6 rounded-xl disabled:opacity-50">
                    {saved ? <><Check className="h-5 w-5" /> Saved</> : <><Save className="h-5 w-5" /> {saving ? 'Saving...' : 'Save All'}</>}
                </button>
            </div>
            <div className="space-y-6">
                {plans.map(plan => (
                    <div key={plan.id} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div><label className="block text-xs text-brand-textMuted mb-1">Plan Name</label>
                                <input value={plan.name} onChange={e => update(plan.id, 'name', e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" /></div>
                            <div><label className="block text-xs text-brand-textMuted mb-1">Price</label>
                                <input value={plan.price} onChange={e => update(plan.id, 'price', e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" /></div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div><label className="block text-xs text-brand-textMuted mb-1">Perfect For (EN)</label>
                                <textarea value={plan.perfect_for_en} onChange={e => update(plan.id, 'perfect_for_en', e.target.value)} rows={2} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple resize-y" /></div>
                            <div><label className="block text-xs text-brand-textMuted mb-1">Perfect For (FR)</label>
                                <textarea value={plan.perfect_for_fr} onChange={e => update(plan.id, 'perfect_for_fr', e.target.value)} rows={2} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple resize-y" /></div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div><label className="block text-xs text-brand-textMuted mb-1">Features (EN)</label>
                                <input value={plan.features_en} onChange={e => update(plan.id, 'features_en', e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" /></div>
                            <div><label className="block text-xs text-brand-textMuted mb-1">Features (FR)</label>
                                <input value={plan.features_fr} onChange={e => update(plan.id, 'features_fr', e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" /></div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div><label className="block text-xs text-brand-textMuted mb-1">Available On</label>
                                <input value={plan.available_on} onChange={e => update(plan.id, 'available_on', e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple" /></div>
                            <div className="flex items-center gap-4 pt-4">
                                <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                                    <input type="checkbox" checked={plan.is_popular} onChange={e => update(plan.id, 'is_popular', e.target.checked)} className="rounded" /> Most Popular
                                </label>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlansManager;
