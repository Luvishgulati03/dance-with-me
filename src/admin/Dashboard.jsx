import { useState, useEffect } from 'react';
import { Calendar, Building2, CreditCard, HelpCircle, Star, Users, FileText } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({});
    const token = localStorage.getItem('admin_token');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [events, studios, plans, faqs, features, personas] = await Promise.all([
                    fetch('/api/events').then(r => r.json()),
                    fetch('/api/studios').then(r => r.json()),
                    fetch('/api/plans').then(r => r.json()),
                    fetch('/api/faqs').then(r => r.json()),
                    fetch('/api/features').then(r => r.json()),
                    fetch('/api/personas').then(r => r.json()),
                ]);
                setStats({
                    events: events.length,
                    studios: studios.length,
                    plans: plans.length,
                    faqs: faqs.length,
                    features: features.length,
                    personas: personas.length,
                });
            } catch (err) {
                console.error(err);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { label: 'Events', count: stats.events, icon: Calendar, color: 'text-purple-400', bg: 'bg-purple-500/20' },
        { label: 'Studios', count: stats.studios, icon: Building2, color: 'text-green-400', bg: 'bg-green-500/20' },
        { label: 'Plans', count: stats.plans, icon: CreditCard, color: 'text-blue-400', bg: 'bg-blue-500/20' },
        { label: 'FAQs', count: stats.faqs, icon: HelpCircle, color: 'text-amber-400', bg: 'bg-amber-500/20' },
        { label: 'Features', count: stats.features, icon: Star, color: 'text-pink-400', bg: 'bg-pink-500/20' },
        { label: 'Personas', count: stats.personas, icon: Users, color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map(card => {
                    const Icon = card.icon;
                    return (
                        <div key={card.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center ${card.color}`}>
                                    <Icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-brand-textMuted text-sm">{card.label}</p>
                                    <p className="text-2xl font-bold text-white">{card.count ?? '...'}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Dashboard;
