import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useContent } from '../contexts/ContentContext';
import { Check, Calendar, MapPin, ArrowRight, Smartphone, Music, Users, Heart, Shield } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import EventModal from '../components/EventModal';
import PhoneCarousel from '../components/PhoneCarousel';

const DANCE_VIDEOS = [
    'https://videos.pexels.com/video-files/5973174/5973174-sd_506_960_25fps.mp4',
    'https://videos.pexels.com/video-files/4563407/4563407-sd_506_960_25fps.mp4',
    'https://videos.pexels.com/video-files/6394054/6394054-sd_506_960_25fps.mp4',
];

const STUDIO_IMAGES = [
    'https://images.pexels.com/photos/1701202/pexels-photo-1701202.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2188012/pexels-photo-2188012.jpeg?auto=compress&cs=tinysrgb&w=600',
];

const CAROUSEL_ITEMS = [
    { label: '1:1 Class', image: '/images/app-home.jpeg' },
    { label: '1:Many Classes', image: '/images/app-home.jpeg' },
    { label: 'Video Program', image: '/images/app-video-program.jpeg' },
    { label: 'Music Playlist', image: '/images/app-playlist.jpeg' },
    { label: 'Find Your Connection', image: '/images/app-connection.png' },
    { label: 'Badges & Levels' },
    { label: 'Referral Code' },
    { label: 'Dance Challenges' },
    { label: 'Scrolling Feed', image: '/images/app-feed.jpeg' },
    { label: 'Community Chat', image: '/images/app-chat.jpeg' },
];

const Home = () => {
    const { t, language } = useLanguage();
    const { events: apiEvents, studios: apiStudios, plans: apiPlans, media: apiMedia, getContent } = useContent();
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Map API data to display format
    const eventCards = apiEvents.length > 0 ? apiEvents.map(e => ({
        title: language === 'fr' ? e.title_fr : e.title_en,
        date: e.date,
        time: e.time,
        location: language === 'fr' ? e.location_fr : e.location_en,
        category: e.category,
        description: language === 'fr' ? e.description_fr : e.description_en,
        fullDescription: language === 'fr' ? (e.full_description_fr || e.full_description_en) : e.full_description_en,
        tags: e.tags,
        attendees: e.attendees,
        image_url: e.image_url,
        video_url: e.video_url,
    })) : t('home.eventCards');

    const studioCards = apiStudios.length > 0 ? apiStudios.map(s => ({
        name: s.name,
        address: language === 'fr' ? s.address_fr : s.address_en,
        styles: s.styles,
        rating: s.rating,
        reviews: s.reviews,
        image_url: s.image_url,
    })) : t('home.studioCards');

    const planItems = apiPlans.length > 0 ? apiPlans.map(p => ({
        name: p.name,
        price: p.price,
        perfectFor: language === 'fr' ? p.perfect_for_fr : p.perfect_for_en,
        availableOn: p.available_on,
        features: language === 'fr' ? p.features_fr : p.features_en,
    })) : t('plans.items');

    // Dynamic media
    const heroVideoUrl = apiMedia.find(m => m.context === 'hero_video')?.url || 'https://videos.pexels.com/video-files/2795738/2795738-uhd_2560_1440_25fps.mp4';
    const danceVideos = [
        apiMedia.find(m => m.context === 'dance_video_1')?.url || DANCE_VIDEOS[0],
        apiMedia.find(m => m.context === 'dance_video_2')?.url || DANCE_VIDEOS[1],
        apiMedia.find(m => m.context === 'dance_video_3')?.url || DANCE_VIDEOS[2],
    ];
    const studioImages = [
        apiMedia.find(m => m.context === 'studio_image_1')?.url || STUDIO_IMAGES[0],
        apiMedia.find(m => m.context === 'studio_image_2')?.url || STUDIO_IMAGES[1],
        apiMedia.find(m => m.context === 'studio_image_3')?.url || STUDIO_IMAGES[2],
    ];

    // Dynamic app link
    const appLink = getContent('home', 'app', 'appLink', language) || 'https://loadly.io/1dapWESq';

    const [appRef, appVisible] = useScrollAnimation();
    const [carouselRef, carouselVisible] = useScrollAnimation();
    const [eventsRef, eventsVisible] = useScrollAnimation();
    const [studiosRef, studiosVisible] = useScrollAnimation();
    const [plansRef, plansVisible] = useScrollAnimation();
    const [whyRef, whyVisible] = useScrollAnimation();

    const planStyles = [
        { bgColor: 'bg-brand-dark base-gradient', border: 'border-white/10' },
        { bgColor: 'bg-gradient-to-br from-[#2A005E] to-[#4A2BB8]', border: 'border-brand-purple/50 scale-105 shadow-2xl z-10' },
        { bgColor: 'bg-brand-dark base-gradient', border: 'border-brand-gold/30', badge: t('plans.mostPopular') },
    ];

    const whyUsPoints = [
        { icon: <Shield className="h-7 w-7" />, title: t('home.whyUs.safe'), desc: t('home.whyUs.safeDesc') },
        { icon: <Users className="h-7 w-7" />, title: t('home.whyUs.community'), desc: t('home.whyUs.communityDesc') },
        { icon: <Music className="h-7 w-7" />, title: t('home.whyUs.allInOne'), desc: t('home.whyUs.allInOneDesc') },
        { icon: <Heart className="h-7 w-7" />, title: t('home.whyUs.passion'), desc: t('home.whyUs.passionDesc') },
    ];

    return (
        <div>
            {/* ═══════════ SECTION 1 — HERO ═══════════ */}
            <section className="relative h-screen w-full flex bg-brand-dark/50 items-center justify-center -mt-16 lg:-mt-20 overflow-hidden">
                <video autoPlay loop muted playsInline className="absolute z-[-1] w-auto min-w-full min-h-full max-w-none object-cover opacity-60">
                    <source src={heroVideoUrl} type="video/mp4" />
                </video>
                <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto mt-16 lg:mt-20">
                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 sm:mb-8 tracking-tight drop-shadow-lg animate-fade-in-up">
                        {t('home.hero.title')}
                    </h1>
                    <Link to="/plans" className="inline-block bg-brand-purple hover:bg-brand-purple/90 text-white font-bold text-base sm:text-lg py-3 sm:py-4 px-8 sm:px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(144,53,255,0.5)] animate-fade-in-up delay-300">
                        {t('home.hero.cta')}
                    </Link>
                </div>
            </section>

            {/* ═══════════ SECTION 2 — APP SHOWCASE WITH TEXT ═══════════ */}
            <section ref={appRef} className="relative overflow-hidden bg-brand-dark">
                <div className={`flex flex-col md:flex-row items-center max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 gap-10 md:gap-16 ${appVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                    <div className="md:w-1/2">
                        <h2 className={`text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white leading-tight mb-4 sm:mb-6 ${appVisible ? 'animate-slide-left' : 'opacity-0'}`}>
                            {t('home.app.heading')}
                        </h2>
                        <p className={`text-brand-textMuted text-base sm:text-lg leading-relaxed mb-6 ${appVisible ? 'animate-slide-left delay-200' : 'opacity-0'}`}>
                            {t('home.app.description')}
                        </p>
                        <a href={appLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-brand-purple hover:bg-brand-purple/80 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105">
                            {t('home.app.cta')} <ArrowRight className="h-5 w-5" />
                        </a>
                    </div>
                    <div className={`md:w-1/2 flex justify-center ${appVisible ? 'animate-slide-right delay-300' : 'opacity-0'}`}>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
                                <div className="w-72 h-72 bg-brand-purple/20 rounded-full blur-[80px]" />
                            </div>
                            <div className="w-56 sm:w-64 md:w-72 animate-float">
                                <div className="bg-gray-900 rounded-[3rem] p-3 shadow-2xl border border-white/10 animate-pulse-glow">
                                    <div className="bg-gray-900 w-28 h-6 rounded-full mx-auto -mt-1 mb-2 relative z-10" />
                                    <div className="bg-gradient-to-b from-brand-gradientStart to-brand-dark rounded-[2.3rem] overflow-hidden aspect-[9/19] flex flex-col items-center justify-center border border-white/5 relative">
                                        <img src="/images/app-home.jpeg" alt="Dance With Me App" className="absolute inset-0 w-full h-full object-cover object-top" loading="lazy" />
                                    </div>
                                    <div className="w-28 h-1 bg-white/30 rounded-full mx-auto mt-3" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════ SECTION 2B — EXPLORE THE APP CAROUSEL ═══════════ */}
            <section ref={carouselRef} className="bg-brand-darker py-16 sm:py-24 px-4 border-t border-white/5 overflow-hidden">
                <div className="max-w-5xl mx-auto">
                    <div className={`text-center mb-10 ${carouselVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-4">
                            {t('product.exploreFeatures')}
                        </h2>
                        <p className="text-brand-textMuted text-base sm:text-lg max-w-2xl mx-auto">
                            {t('product.exploreSubtitle')}
                        </p>
                    </div>
                    <div className={carouselVisible ? 'animate-fade-in-up delay-300' : 'opacity-0'}>
                        <PhoneCarousel items={CAROUSEL_ITEMS} />
                    </div>
                    <div className={`text-center mt-10 ${carouselVisible ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
                        <Link to="/product" className="inline-flex items-center gap-2 bg-brand-purple hover:bg-brand-purple/80 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105">
                            {t('home.app.cta')} <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══════════ SECTION 3 — EVENTS NEAR YOU ═══════════ */}
            <section ref={eventsRef} className="bg-brand-darker py-16 sm:py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className={`text-center mb-12 sm:mb-14 ${eventsVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-4">
                            {t('home.events.heading')}
                        </h2>
                        <p className="text-brand-textMuted text-base sm:text-lg max-w-2xl mx-auto">
                            {t('home.events.subheading')}
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
                        {Array.isArray(eventCards) && eventCards.map((event, idx) => (
                            <div
                                key={idx}
                                onClick={() => setSelectedEvent(event)}
                                className={`group cursor-pointer bg-white/5 rounded-3xl border border-white/10 overflow-hidden hover:border-brand-purple/50 transition-all duration-300 card-hover ${eventsVisible ? `animate-fade-in-up delay-${(idx + 1) * 200}` : 'opacity-0'}`}
                            >
                                {/* Video Background */}
                                <div className="h-48 relative overflow-hidden">
                                    <video autoPlay loop muted playsInline className="event-video">
                                        <source src={event.video_url || danceVideos[idx % danceVideos.length]} type="video/mp4" />
                                    </video>
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
                                    <div className="absolute top-3 left-3 z-10">
                                        <span className="bg-brand-purple/80 text-white text-xs font-bold uppercase px-3 py-1 rounded-full backdrop-blur-sm">
                                            {event.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 sm:p-6">
                                    <div className="flex items-center gap-2 text-brand-gold text-sm mb-2">
                                        <Calendar className="h-4 w-4" /><span>{event.date}</span>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-brand-gold transition-colors">
                                        {event.title}
                                    </h3>
                                    <p className="text-brand-textMuted text-sm leading-relaxed mb-4 line-clamp-2">{event.description}</p>
                                    <div className="flex items-center gap-2 text-brand-textMuted text-sm">
                                        <MapPin className="h-4 w-4 text-brand-purple" /><span className="truncate">{event.location}</span>
                                    </div>
                                </div>
                                <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                                    <span className="text-brand-gold text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                        {t('home.events.learnMore')} <ArrowRight className="h-4 w-4" />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link to="/events" className="inline-block bg-brand-purple hover:bg-brand-purple/80 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105">
                            {t('home.events.viewAll')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══════════ SECTION 4 — STUDIOS NEAR YOU ═══════════ */}
            <section ref={studiosRef} className="bg-brand-dark py-16 sm:py-20 px-4 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className={`text-center mb-12 sm:mb-14 ${studiosVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-4">{t('home.studios.heading')}</h2>
                        <p className="text-brand-textMuted text-base sm:text-lg max-w-2xl mx-auto">{t('home.studios.subheading')}</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {Array.isArray(studioCards) && studioCards.map((studio, idx) => (
                            <div key={idx} className={`bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-brand-gold/30 transition-all duration-300 card-hover ${studiosVisible ? `animate-fade-in-up delay-${(idx + 1) * 200}` : 'opacity-0'}`}>
                                <div className="h-40 overflow-hidden">
                                    <img src={studio.image_url || studioImages[idx % studioImages.length]} alt={studio.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                                </div>
                                <div className="p-5 sm:p-6">
                                    <h3 className="text-lg font-bold text-white mb-2">{studio.name}</h3>
                                    <div className="flex items-start gap-2 text-brand-textMuted text-sm mb-3">
                                        <MapPin className="h-4 w-4 text-brand-purple flex-shrink-0 mt-0.5" /><span>{studio.address}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-brand-gold font-semibold uppercase tracking-wider">{t('home.studios.styles')}</span>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {studio.styles.map((style, sIdx) => (
                                                <span key={sIdx} className="bg-brand-purple/20 text-brand-purple text-xs font-medium px-2.5 py-1 rounded-full border border-brand-purple/20">{style}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <Link to="/events#studios" className="text-brand-gold hover:text-white font-semibold text-lg flex items-center justify-center gap-2 transition-colors">
                            {t('home.studios.viewAll')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══════════ SECTION 5 — WHY US ═══════════ */}
            <section ref={whyRef} className="bg-gradient-to-b from-brand-darker to-brand-dark py-16 sm:py-24 px-4 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className={`text-center mb-14 ${whyVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-4">{t('home.whyUs.heading')}</h2>
                        <p className="text-brand-textMuted text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">{t('home.whyUs.subheading')}</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {whyUsPoints.map((point, idx) => (
                            <div key={idx} className={`text-center p-6 sm:p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 hover:border-brand-purple/30 transition-all duration-300 card-hover ${whyVisible ? `animate-fade-in-up delay-${(idx + 1) * 100}` : 'opacity-0'}`}>
                                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-brand-purple/20 flex items-center justify-center text-brand-gold">
                                    {point.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3">{point.title}</h3>
                                <p className="text-brand-textMuted text-sm leading-relaxed">{point.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ SECTION 6 — PLANS PREVIEW ═══════════ */}
            <section ref={plansRef} className="bg-brand-darker py-16 sm:py-20 px-4 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className={`text-center mb-16 ${plansVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-4">{t('home.plans.heading')}</h2>
                        <p className="text-lg sm:text-xl text-brand-textMuted">{t('home.plans.subheading')}</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto mb-12">
                        {Array.isArray(planItems) && planItems.map((plan, index) => (
                            <div key={index} className={`${planStyles[index]?.bgColor || ''} ${planStyles[index]?.border || ''} border rounded-3xl p-6 sm:p-8 relative flex flex-col h-full card-hover ${plansVisible ? `animate-scale-in delay-${(index + 1) * 200}` : 'opacity-0'}`}>
                                {planStyles[index]?.badge && (
                                    <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-4">
                                        <span className="bg-brand-gold text-brand-darker text-xs font-bold uppercase py-1 px-3 rounded-full shadow-lg">{planStyles[index].badge}</span>
                                    </div>
                                )}
                                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{plan.name}</h3>
                                <div className="text-3xl sm:text-4xl font-extrabold text-white mb-8">{plan.price}<span className="text-lg font-normal text-brand-textMuted">{t('home.plans.perMonth')}</span></div>
                                <div className="flex-grow space-y-6">
                                    <div>
                                        <h4 className="text-sm font-semibold text-brand-gold uppercase tracking-wider mb-2">{t('plans.perfectFor')}</h4>
                                        <p className="text-brand-textMuted leading-relaxed text-sm sm:text-base">{plan.perfectFor}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-brand-gold uppercase tracking-wider mb-2">{t('plans.availableOn')}</h4>
                                        <p className="text-white flex items-center gap-2 text-sm sm:text-base"><Check className="h-5 w-5 text-brand-purple" /> {plan.availableOn}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-brand-gold uppercase tracking-wider mb-2">{t('plans.favoriteFeatures')}</h4>
                                        <p className="text-brand-textMuted text-sm sm:text-base">{plan.features}</p>
                                    </div>
                                </div>
                                <button className="mt-8 w-full py-3 sm:py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-bold transition-all duration-300 hover:scale-105">{t('home.plans.selectPlan')} {plan.name}</button>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <Link to="/plans" className="text-brand-gold hover:text-white font-semibold text-lg flex items-center justify-center gap-2 transition-colors">{t('home.plans.viewAll')}</Link>
                    </div>
                </div>
            </section>

            {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
        </div>
    );
};

export default Home;
