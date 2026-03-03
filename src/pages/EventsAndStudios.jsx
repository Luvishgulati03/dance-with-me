import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { Calendar, Clock, MapPin, Users, Star, ImagePlus, ArrowRight, Mic2, Music } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const DANCE_VIDEOS = [
    'https://videos.pexels.com/video-files/5973174/5973174-sd_506_960_25fps.mp4',
    'https://videos.pexels.com/video-files/4563407/4563407-sd_506_960_25fps.mp4',
    'https://videos.pexels.com/video-files/6394054/6394054-sd_506_960_25fps.mp4',
    'https://videos.pexels.com/video-files/4740930/4740930-sd_640_360_30fps.mp4',
];

const STUDIO_IMAGES = [
    'https://images.pexels.com/photos/1701202/pexels-photo-1701202.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2188012/pexels-photo-2188012.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/7520744/pexels-photo-7520744.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/4588065/pexels-photo-4588065.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3622614/pexels-photo-3622614.jpeg?auto=compress&cs=tinysrgb&w=600',
];

const EventsAndStudios = () => {
    const { t } = useLanguage();
    const location = useLocation();
    const [activeFilter, setActiveFilter] = useState('all');

    const events = t('eventsPage.events');
    const studioData = t('eventsPage.studioData');
    const filters = t('eventsPage.filters');

    const [heroRef, heroVisible] = useScrollAnimation();
    const [organiserRef, organiserVisible] = useScrollAnimation();
    const [djRef, djVisible] = useScrollAnimation();
    const [studiosRef, studiosVisible] = useScrollAnimation();

    useEffect(() => {
        if (location.hash === '#studios') {
            setTimeout(() => {
                const el = document.getElementById('studios-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [location]);

    const filterKeys = ['all', 'workshop', 'competition', 'social', 'performance', 'festival'];

    const allFiltered = Array.isArray(events)
        ? events.filter((e) => activeFilter === 'all' || e.category?.toLowerCase() === activeFilter)
        : [];

    const organiserEvents = allFiltered.filter((e) => e.eventType === 'organiser');
    const djEvents = allFiltered.filter((e) => e.eventType === 'dj');

    const getCategoryColor = (category) => {
        const colors = {
            festival: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
            workshop: 'bg-green-500/20 text-green-400 border-green-500/30',
            social: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            competition: 'bg-red-500/20 text-red-400 border-red-500/30',
            performance: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
            atelier: 'bg-green-500/20 text-green-400 border-green-500/30',
            spectacle: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
            compétition: 'bg-red-500/20 text-red-400 border-red-500/30',
        };
        return colors[category?.toLowerCase()] || 'bg-brand-purple/20 text-brand-purple border-brand-purple/30';
    };

    const EventCard = ({ event, index, videoSrc }) => (
        <div className={`bg-white/5 rounded-3xl border border-white/10 overflow-hidden hover:border-brand-purple/40 transition-all duration-300 card-hover flex flex-col animate-fade-in-up`} style={{ animationDelay: `${index * 150}ms` }}>
            {/* Video */}
            <div className="h-44 relative overflow-hidden">
                <video autoPlay loop muted playsInline className="event-video">
                    <source src={videoSrc} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
                <div className="absolute top-3 left-3 z-10 flex gap-2">
                    <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full border ${getCategoryColor(event.category)}`}>
                        {event.category}
                    </span>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-brand-gold text-sm mb-2">
                    <Calendar className="h-4 w-4" /><span>{event.date}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-gold transition-colors">{event.title}</h3>
                <p className="text-brand-textMuted text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">{event.description}</p>

                <div className="space-y-2 mb-4 text-sm text-brand-textMuted">
                    <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-brand-gold" /><span>{event.time}</span></div>
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-gold" /><span>{event.location}</span></div>
                    <div className="flex items-center gap-2"><Users className="h-4 w-4 text-brand-gold" /><span>{event.attendees} {t('eventsPage.listing.expected')}</span></div>
                </div>

                {Array.isArray(event.tags) && (
                    <div className="flex flex-wrap gap-2 mb-5">
                        {event.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="bg-white/5 text-brand-textMuted text-xs px-2.5 py-1 rounded-full border border-white/10">{tag}</span>
                        ))}
                    </div>
                )}

                <button className="w-full bg-brand-purple hover:bg-brand-purple/80 text-white font-bold py-3 rounded-full transition-all duration-300 hover:scale-105 text-sm">
                    {t('eventsPage.listing.registerCta')}
                </button>
            </div>
        </div>
    );

    return (
        <div className="bg-brand-dark min-h-screen">
            {/* ═══ HERO ═══ */}
            <section ref={heroRef} className="relative bg-gradient-to-br from-brand-gradientStart via-brand-dark to-brand-darker pt-8 sm:pt-12 pb-16 sm:pb-20 px-4 overflow-hidden">
                <div className="absolute top-10 right-10 w-72 h-72 bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[150px] pointer-events-none" />

                <div className={`max-w-4xl mx-auto relative z-10 ${heroVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <div className="flex items-center gap-2 mb-6">
                        <Calendar className="h-5 w-5 text-brand-gold" />
                        <span className="text-brand-gold text-sm font-bold uppercase tracking-widest">{t('eventsPage.hero.tag')}</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">{t('eventsPage.hero.title')}</h1>
                    <p className="text-lg sm:text-xl text-brand-textMuted max-w-2xl mb-10 leading-relaxed">{t('eventsPage.hero.subtitle')}</p>
                    <div className="flex flex-wrap gap-4">
                        <a href="#events-listing" className="inline-flex items-center gap-2 bg-brand-purple hover:bg-brand-purple/80 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105">
                            {t('eventsPage.hero.browseCta')} <ArrowRight className="h-5 w-5" />
                        </a>
                        <a href="#studios-section" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 px-8 rounded-full transition-colors">
                            {t('eventsPage.hero.studiosCta')}
                        </a>
                    </div>
                </div>
            </section>

            {/* ═══ CATEGORY FILTERS ═══ */}
            <section id="events-listing" className="bg-brand-darker py-8 px-4 border-t border-white/5 sticky top-16 lg:top-20 z-30">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {filterKeys.map((key) => (
                            <button
                                key={key}
                                onClick={() => setActiveFilter(key)}
                                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${activeFilter === key
                                    ? 'bg-brand-purple text-white border-brand-purple scale-105'
                                    : 'bg-white/5 text-brand-textMuted border-white/10 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {typeof filters === 'object' ? filters[key] : key}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ DUAL COLUMNS: ORGANISER + DJ ═══ */}
            <section className="bg-brand-dark py-12 sm:py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
                        {/* ORGANISER EVENTS */}
                        <div ref={organiserRef}>
                            <div className={`mb-8 ${organiserVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-brand-purple/20 flex items-center justify-center">
                                        <Mic2 className="h-5 w-5 text-brand-gold" />
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-white">{t('eventsPage.organiserEvents.title')}</h2>
                                </div>
                                <p className="text-brand-textMuted text-sm leading-relaxed">{t('eventsPage.organiserEvents.subtitle')}</p>
                            </div>

                            <div className="space-y-6">
                                {organiserEvents.length > 0 ? organiserEvents.map((event, idx) => (
                                    <EventCard key={idx} event={event} index={idx} videoSrc={DANCE_VIDEOS[idx % DANCE_VIDEOS.length]} />
                                )) : (
                                    <p className="text-brand-textMuted text-center py-8">No organiser events match this filter.</p>
                                )}
                            </div>
                        </div>

                        {/* DJ EVENTS */}
                        <div ref={djRef}>
                            <div className={`mb-8 ${djVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center">
                                        <Music className="h-5 w-5 text-brand-gold" />
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-white">{t('eventsPage.djEvents.title')}</h2>
                                </div>
                                <p className="text-brand-textMuted text-sm leading-relaxed">{t('eventsPage.djEvents.subtitle')}</p>
                            </div>

                            <div className="space-y-6">
                                {djEvents.length > 0 ? djEvents.map((event, idx) => (
                                    <EventCard key={idx} event={event} index={idx} videoSrc={DANCE_VIDEOS[(idx + 2) % DANCE_VIDEOS.length]} />
                                )) : (
                                    <p className="text-brand-textMuted text-center py-8">No DJ events match this filter.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ STUDIO LISTING ═══ */}
            <section ref={studiosRef} id="studios-section" className="bg-brand-darker py-16 sm:py-20 px-4 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className={`text-center mb-12 sm:mb-14 ${studiosVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-4">{t('eventsPage.studios.title')}</h2>
                        <p className="text-brand-textMuted text-base sm:text-lg max-w-2xl mx-auto">{t('eventsPage.studios.subtitle')}</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {Array.isArray(studioData) && studioData.map((studio, idx) => (
                            <div key={idx} className={`bg-white/5 rounded-3xl border border-white/10 overflow-hidden hover:border-brand-gold/30 transition-all duration-300 card-hover ${studiosVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${idx * 100}ms` }}>
                                {/* Studio Image */}
                                <div className="h-44 overflow-hidden">
                                    <img src={STUDIO_IMAGES[idx % STUDIO_IMAGES.length]} alt={studio.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" loading="lazy" />
                                </div>

                                <div className="p-5 sm:p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg font-bold text-white">{studio.name}</h3>
                                        {studio.rating && (
                                            <div className="flex items-center gap-1 text-brand-gold">
                                                <Star className="h-4 w-4 fill-brand-gold" />
                                                <span className="text-sm font-bold">{studio.rating}</span>
                                                <span className="text-xs text-brand-textMuted">({studio.reviews})</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-start gap-2 text-brand-textMuted text-sm mb-4">
                                        <MapPin className="h-4 w-4 text-brand-purple flex-shrink-0 mt-0.5" /><span>{studio.address}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {Array.isArray(studio.styles) && studio.styles.map((style, sIdx) => (
                                            <span key={sIdx} className="bg-brand-purple/20 text-brand-purple text-xs font-medium px-2.5 py-1 rounded-full border border-brand-purple/20">{style}</span>
                                        ))}
                                    </div>
                                    <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 rounded-full transition-all duration-300 hover:scale-105 text-sm">
                                        {t('eventsPage.studios.viewDetails')}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EventsAndStudios;
