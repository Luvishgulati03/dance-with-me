import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { ArrowLeft, Trophy, Sparkles, Star, Flame, Crown, Zap, Music, Users, Mic2 } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const BADGE_DATA = {
    dancer: {
        icon: <Users className="h-6 w-6" />,
        color: 'brand-purple',
        gradient: 'from-purple-600/20 to-purple-900/20',
        borderColor: 'border-purple-500/30',
        badges: [
            { name: 'Spark', level: 1, icon: <Zap className="h-5 w-5" />, desc: 'Just getting started — ignite your dance journey.' },
            { name: 'Groover', level: 2, icon: <Music className="h-5 w-5" />, desc: 'Finding your rhythm and moving with confidence.' },
            { name: 'Spotlight', level: 3, icon: <Sparkles className="h-5 w-5" />, desc: 'Standing out on the dance floor with style.' },
            { name: 'Pulse', level: 4, icon: <Flame className="h-5 w-5" />, desc: 'The heartbeat of every event — unstoppable energy.' },
            { name: 'Icon', level: 5, icon: <Crown className="h-5 w-5" />, desc: 'A legend in the community — inspiring others.' },
        ],
    },
    artist: {
        icon: <Mic2 className="h-6 w-6" />,
        color: 'green-400',
        gradient: 'from-green-600/20 to-green-900/20',
        borderColor: 'border-green-500/30',
        badges: [
            { name: 'Seed', level: 1, icon: <Zap className="h-5 w-5" />, desc: 'Planting the seeds of your teaching career.' },
            { name: 'Crafter', level: 2, icon: <Sparkles className="h-5 w-5" />, desc: 'Crafting unique routines and building your audience.' },
            { name: 'Mentor', level: 3, icon: <Star className="h-5 w-5" />, desc: 'Guiding students and shaping their skills.' },
            { name: 'Master', level: 4, icon: <Flame className="h-5 w-5" />, desc: 'Mastered the art of teaching — highly rated.' },
            { name: 'Luminary', level: 5, icon: <Crown className="h-5 w-5" />, desc: 'A shining light in the community — top-tier instructor.' },
        ],
    },
    dj: {
        icon: <Music className="h-6 w-6" />,
        color: 'brand-gold',
        gradient: 'from-amber-600/20 to-amber-900/20',
        borderColor: 'border-amber-500/30',
        badges: [
            { name: 'Beat', level: 1, icon: <Zap className="h-5 w-5" />, desc: 'Dropping your first beats and building your sound.' },
            { name: 'Rhythm', level: 2, icon: <Music className="h-5 w-5" />, desc: 'Finding your groove and growing your playlist.' },
            { name: 'Maestro', level: 3, icon: <Star className="h-5 w-5" />, desc: 'Conducting the dance floor with precision.' },
            { name: 'Architect', level: 4, icon: <Flame className="h-5 w-5" />, desc: 'Designing unforgettable sonic experiences.' },
            { name: 'Sonic', level: 5, icon: <Crown className="h-5 w-5" />, desc: 'The ultimate sound master — legendary status.' },
        ],
    },
    organiser: {
        icon: <Trophy className="h-6 w-6" />,
        color: 'red-400',
        gradient: 'from-red-600/20 to-red-900/20',
        borderColor: 'border-red-500/30',
        badges: [
            { name: 'Host', level: 1, icon: <Zap className="h-5 w-5" />, desc: 'Hosting your first events and welcoming the community.' },
            { name: 'Connector', level: 2, icon: <Users className="h-5 w-5" />, desc: 'Bringing people together and building networks.' },
            { name: 'Curator', level: 3, icon: <Star className="h-5 w-5" />, desc: 'Curating exceptional experiences for attendees.' },
            { name: 'Producer', level: 4, icon: <Flame className="h-5 w-5" />, desc: 'Producing large-scale events with impact.' },
            { name: 'Visionary', level: 5, icon: <Crown className="h-5 w-5" />, desc: 'A visionary leader shaping the future of dance events.' },
        ],
    },
};

const PERSONA_LABELS = {
    dancer: 'Dancer',
    artist: 'Artist (Instructor)',
    dj: 'DJ',
    organiser: 'Organiser',
};

const LEVEL_COLORS = [
    'bg-gray-500/20 text-gray-400 border-gray-500/40',
    'bg-green-500/20 text-green-400 border-green-500/40',
    'bg-blue-500/20 text-blue-400 border-blue-500/40',
    'bg-purple-500/20 text-purple-400 border-purple-500/40',
    'bg-amber-500/20 text-amber-300 border-amber-400/40',
];

const BadgesPage = () => {
    const { t } = useLanguage();
    const [heroRef, heroVisible] = useScrollAnimation();

    return (
        <div className="bg-brand-dark min-h-screen">
            {/* HERO */}
            <section ref={heroRef} className="relative pt-8 sm:pt-12 pb-12 px-4 overflow-hidden">
                <div className="absolute top-10 right-10 w-72 h-72 bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />
                <div className={`max-w-5xl mx-auto relative z-10 ${heroVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <Link to="/product" className="text-brand-textMuted hover:text-brand-gold text-sm font-medium flex items-center gap-1 mb-8 transition-colors">
                        <ArrowLeft className="h-4 w-4" /> {t('featurePages.backToProduct')}
                    </Link>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
                        {t('featurePages.badges.title')}
                    </h1>
                    <p className="text-lg sm:text-xl text-brand-textMuted leading-relaxed max-w-3xl">
                        {t('featurePages.badges.subtitle')}
                    </p>
                </div>
            </section>

            {/* BADGE SECTIONS */}
            {Object.entries(BADGE_DATA).map(([personaKey, persona]) => {
                const [ref, visible] = useScrollAnimation(0.1);
                return (
                    <section key={personaKey} ref={ref} className="py-12 sm:py-16 px-4 border-t border-white/5">
                        <div className="max-w-6xl mx-auto">
                            {/* Persona Header */}
                            <div className={`flex items-center gap-4 mb-8 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${persona.gradient} flex items-center justify-center text-${persona.color} border ${persona.borderColor}`}>
                                    {persona.icon}
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-white">{PERSONA_LABELS[personaKey]}</h2>
                                    <p className="text-brand-textMuted text-sm">5 levels · Earn through activity & reviews</p>
                                </div>
                            </div>

                            {/* Badges Row */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                {persona.badges.map((badge, idx) => (
                                    <div
                                        key={badge.name}
                                        className={`relative bg-white/5 rounded-2xl border border-white/10 p-5 text-center hover:border-brand-purple/40 transition-all duration-300 card-hover ${visible ? 'animate-scale-in' : 'opacity-0'}`}
                                        style={{ animationDelay: `${idx * 120}ms` }}
                                    >
                                        {/* Level indicator */}
                                        <div className="absolute top-3 right-3">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${LEVEL_COLORS[idx]}`}>
                                                Lv.{badge.level}
                                            </span>
                                        </div>

                                        {/* Badge Icon Holder */}
                                        <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${persona.gradient} border ${persona.borderColor} flex items-center justify-center text-white/80`}>
                                            {badge.icon}
                                        </div>

                                        {/* Badge Name */}
                                        <h3 className="text-base font-bold text-white mb-2">{badge.name}</h3>
                                        <p className="text-brand-textMuted text-xs leading-relaxed">{badge.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            })}
        </div>
    );
};

export default BadgesPage;
