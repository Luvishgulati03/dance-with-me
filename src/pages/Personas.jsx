import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { X, ArrowRight, Users, Mic2, Music, Calendar, Smartphone, Check } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const PERSONA_DATA = [
    {
        key: 'dancer',
        icon: <Users className="h-8 w-8" />,
        color: 'brand-purple',
        gradient: 'from-purple-600 to-purple-900',
        borderHover: 'hover:border-purple-500/50',
        image: 'https://images.pexels.com/photos/2188012/pexels-photo-2188012.jpeg?auto=compress&cs=tinysrgb&w=600',
        features: ['1:1 Class', '1:Many Classes', 'Dance Challenges', 'Scrolling Feed', 'Find Your Connection', 'Badges & Levels', 'Community Chat'],
        plans: ['Stage', 'Spotlight', 'Star'],
    },
    {
        key: 'artist',
        icon: <Mic2 className="h-8 w-8" />,
        color: 'green-400',
        gradient: 'from-green-600 to-green-900',
        borderHover: 'hover:border-green-500/50',
        image: 'https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?auto=compress&cs=tinysrgb&w=600',
        features: ['1:1 Class (Teach)', '1:Many Classes (Host)', 'Video Program', 'Scrolling Feed', 'Badges & Levels', 'Community Chat', 'Referral Code'],
        plans: ['Spotlight', 'Star'],
    },
    {
        key: 'dj',
        icon: <Music className="h-8 w-8" />,
        color: 'brand-gold',
        gradient: 'from-amber-600 to-amber-900',
        borderHover: 'hover:border-amber-500/50',
        image: 'https://images.pexels.com/photos/1701202/pexels-photo-1701202.jpeg?auto=compress&cs=tinysrgb&w=600',
        features: ['Music Playlist', 'Video Program', 'Scrolling Feed', 'Badges & Levels', 'Community Chat', 'Referral Code', 'Find Your Connection'],
        plans: ['Spotlight', 'Star'],
    },
    {
        key: 'organiser',
        icon: <Calendar className="h-8 w-8" />,
        color: 'red-400',
        gradient: 'from-red-600 to-red-900',
        borderHover: 'hover:border-red-500/50',
        image: 'https://images.pexels.com/photos/7520744/pexels-photo-7520744.jpeg?auto=compress&cs=tinysrgb&w=600',
        features: ['Events Management', 'Community Chat', 'Badges & Levels', 'Scrolling Feed', 'Referral Code', 'Find Your Connection'],
        plans: ['Star'],
    },
];

const Personas = () => {
    const { t } = useLanguage();
    const [selectedPersona, setSelectedPersona] = useState(null);
    const [heroRef, heroVisible] = useScrollAnimation();
    const [cardsRef, cardsVisible] = useScrollAnimation(0.05);

    const personaItems = t('personas.items');

    return (
        <div className="bg-brand-dark min-h-screen">
            {/* HERO */}
            <section ref={heroRef} className="relative pt-8 sm:pt-12 pb-16 px-4 overflow-hidden">
                <div className="absolute top-10 right-10 w-72 h-72 bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />
                <div className={`max-w-4xl mx-auto text-center relative z-10 ${heroVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
                        {t('personas.title')}
                    </h1>
                    <p className="text-lg sm:text-xl text-brand-textMuted max-w-2xl mx-auto">
                        {t('personas.subtitle')}
                    </p>
                </div>
            </section>

            {/* PERSONA CARDS */}
            <section ref={cardsRef} className="py-12 sm:py-16 px-4">
                <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.isArray(personaItems) && personaItems.map((persona, idx) => {
                        const data = PERSONA_DATA[idx];
                        return (
                            <div
                                key={idx}
                                onClick={() => setSelectedPersona(idx)}
                                className={`group cursor-pointer bg-white/5 rounded-3xl border border-white/10 overflow-hidden ${data.borderHover} transition-all duration-300 card-hover flex flex-col ${cardsVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                                style={{ animationDelay: `${idx * 150}ms` }}
                            >
                                {/* Image */}
                                <div className="h-48 overflow-hidden relative">
                                    <img src={data.image} alt={persona.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent" />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/10 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">
                                            {persona.num}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${data.gradient} flex items-center justify-center text-white/80`}>
                                            {data.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-brand-gold transition-colors">{persona.title}</h3>
                                    </div>
                                    <p className="text-brand-textMuted text-sm leading-relaxed flex-grow mb-4">{persona.desc}</p>
                                    <span className="text-brand-gold text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                        View Details <ArrowRight className="h-4 w-4" />
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className="py-12 px-4 border-t border-white/5">
                <div className="max-w-3xl mx-auto text-center">
                    <Link to="/plans" className="inline-flex items-center gap-2 bg-brand-purple hover:bg-brand-purple/80 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105">
                        {t('personas.joinCta')} <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>
            </section>

            {/* POPUP MODAL */}
            {selectedPersona !== null && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" onClick={() => setSelectedPersona(null)}>
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                    <div className="relative bg-brand-dark border border-white/10 rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setSelectedPersona(null)} className="absolute top-4 right-4 z-10 bg-brand-dark/80 hover:bg-white/20 rounded-full p-2 transition-colors">
                            <X className="h-5 w-5 text-white" />
                        </button>

                        {/* Modal Image */}
                        <div className="h-44 overflow-hidden rounded-t-3xl relative">
                            <img src={PERSONA_DATA[selectedPersona].image} alt="" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent" />
                        </div>

                        <div className="p-6 sm:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${PERSONA_DATA[selectedPersona].gradient} flex items-center justify-center text-white/80`}>
                                    {PERSONA_DATA[selectedPersona].icon}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{personaItems[selectedPersona].title}</h2>
                                    <p className="text-brand-textMuted text-sm">{personaItems[selectedPersona].desc}</p>
                                </div>
                            </div>

                            {/* Features Access */}
                            <div className="mb-6">
                                <h3 className="text-brand-gold text-sm font-bold uppercase tracking-wider mb-3">Features Access</h3>
                                <div className="space-y-2">
                                    {PERSONA_DATA[selectedPersona].features.map((feat, i) => (
                                        <div key={i} className="flex items-center gap-2 text-white text-sm">
                                            <Check className="h-4 w-4 text-brand-purple flex-shrink-0" />
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Available Plans */}
                            <div className="mb-6">
                                <h3 className="text-brand-gold text-sm font-bold uppercase tracking-wider mb-3">Available Plans</h3>
                                <div className="flex gap-2">
                                    {PERSONA_DATA[selectedPersona].plans.map((plan, i) => (
                                        <span key={i} className="bg-brand-purple/20 text-brand-purple text-sm font-medium px-4 py-2 rounded-full border border-brand-purple/30">
                                            {plan}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Link to="/plans" onClick={() => setSelectedPersona(null)} className="flex-1 bg-brand-purple hover:bg-brand-purple/80 text-white font-bold py-3 rounded-full text-center text-sm transition-all hover:scale-105">
                                    Choose a Plan
                                </Link>
                                <button onClick={() => setSelectedPersona(null)} className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 rounded-full text-sm transition-colors">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Personas;
