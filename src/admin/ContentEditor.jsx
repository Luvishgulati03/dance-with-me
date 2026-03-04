import { useState, useEffect } from 'react';
import { Save, Check } from 'lucide-react';

const PAGES = [
    { key: 'home', label: 'Home Page' },
    { key: 'product', label: 'Product Page' },
    { key: 'plans', label: 'Plans Page' },
    { key: 'personas', label: 'Personas Page' },
    { key: 'faq', label: 'FAQ Page' },
    { key: 'eventsPage', label: 'Events & Studios Page' },
    { key: 'nav', label: 'Navigation' },
    { key: 'footer', label: 'Footer' },
];

const ContentEditor = () => {
    const [content, setContent] = useState([]);
    const [activePage, setActivePage] = useState('home');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const token = localStorage.getItem('admin_token');

    useEffect(() => {
        fetch('/api/content').then(r => r.json()).then(setContent).catch(console.error);
    }, []);

    const pageContent = content.filter(c => c.page === activePage);
    const grouped = pageContent.reduce((acc, item) => {
        if (!acc[item.section]) acc[item.section] = [];
        acc[item.section].push(item);
        return acc;
    }, {});

    const updateLocal = (id, field, value) => {
        setContent(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
        setSaved(false);
    };

    const saveAll = async () => {
        setSaving(true);
        const items = content.filter(c => c.page === activePage).map(c => ({
            page: c.page, section: c.section, content_key: c.content_key,
            value_en: c.value_en, value_fr: c.value_fr,
        }));
        await fetch('/api/content/bulk', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ items }),
        });
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Page Content Editor</h1>
                <button onClick={saveAll} disabled={saving} className="flex items-center gap-2 bg-brand-purple hover:bg-brand-purple/80 text-white font-bold py-2 px-6 rounded-xl transition-all disabled:opacity-50">
                    {saved ? <><Check className="h-5 w-5" /> Saved</> : <><Save className="h-5 w-5" /> {saving ? 'Saving...' : 'Save All'}</>}
                </button>
            </div>

            {/* Page tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
                {PAGES.map(p => (
                    <button key={p.key} onClick={() => setActivePage(p.key)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${activePage === p.key ? 'bg-brand-purple text-white' : 'bg-white/5 text-brand-textMuted hover:bg-white/10 hover:text-white'}`}>
                        {p.label}
                    </button>
                ))}
            </div>

            {/* Content fields grouped by section */}
            <div className="space-y-6">
                {Object.entries(grouped).map(([section, items]) => (
                    <div key={section} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h3 className="text-brand-gold text-sm font-bold uppercase tracking-wider mb-4">{section}</h3>
                        <div className="space-y-4">
                            {items.map(item => (
                                <div key={item.id} className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-brand-textMuted mb-1">{item.content_key} (English)</label>
                                        <textarea
                                            value={item.value_en}
                                            onChange={(e) => updateLocal(item.id, 'value_en', e.target.value)}
                                            rows={item.value_en.length > 100 ? 3 : 1}
                                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple resize-y"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-brand-textMuted mb-1">{item.content_key} (French)</label>
                                        <textarea
                                            value={item.value_fr}
                                            onChange={(e) => updateLocal(item.id, 'value_fr', e.target.value)}
                                            rows={item.value_fr.length > 100 ? 3 : 1}
                                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple resize-y"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContentEditor;
