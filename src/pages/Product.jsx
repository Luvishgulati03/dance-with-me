import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { ArrowRight, Smartphone, Users, Video, Music, Heart, Trophy, Share2, Flame, Tv, MessageCircle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const DANCE_VIDEOS = [
    'https://videos.pexels.com/video-files/5973174/5973174-sd_506_960_25fps.mp4',
    'https://videos.pexels.com/video-files/4563407/4563407-sd_506_960_25fps.mp4',
    'https://videos.pexels.com/video-files/6394054/6394054-sd_506_960_25fps.mp4',
];

const FEATURES = [
    { key: 'oneOnOne', slug: 'one-on-one', icon: <Smartphone className="h-6 w-6" />, image: '/images/app-classes.png' },
    { key: 'oneToMany', slug: 'one-to-many', icon: <Users className="h-6 w-6" />, image: '/images/app-classes.png' },
    { key: 'videoProgram', slug: 'video-program', icon: <Video className="h-6 w-6" />, video: 2 },
    { key: 'musicPlaylist', slug: 'music-playlist', icon: <Music className="h-6 w-6" />, image: '/images/app-playlist.png' },
    { key: 'findConnection', slug: 'find-connection', icon: <Heart className="h-6 w-6" />, image: '/images/app-connection.png' },
    { key: 'badges', slug: 'badges', icon: <Trophy className="h-6 w-6" />, video: 1 },
    { key: 'referral', slug: 'referral', icon: <Share2 className="h-6 w-6" />, video: 0 },
    { key: 'challenges', slug: 'challenges', icon: <Flame className="h-6 w-6" />, video: 2 },
    { key: 'feed', slug: 'feed', icon: <Tv className="h-6 w-6" />, image: '/images/app-feed.png' },
    { key: 'chat', slug: 'chat', icon: <MessageCircle className="h-6 w-6" />, image: '/images/app-chat.png' },
];

const Product = () => {
    const { t } = useLanguage();
    const [heroRef, heroVisible] = useScrollAnimation();
    const [cardsRef, cardsVisible] = useScrollAnimation(0.05);
    const [ctaRef, ctaVisible] = useScrollAnimation();

    return (
        <div className="bg-brand-dark min-h-screen">
            {/* ═══ HERO ═══ */}
            <section ref={heroRef} className="relative pt-8 sm:pt-12 pb-16 sm:pb-20 px-4 overflow-hidden">
                <div className="absolute top-10 right-10 w-72 h-72 bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[150px] pointer-events-none" />

                <div className={`max-w-4xl mx-auto text-center relative z-10 ${heroVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                        {t('product.title')}
                    </h1>
                    <p className="text-lg sm:text-xl text-brand-textMuted max-w-2xl mx-auto leading-relaxed">
                        {t('product.subtitle')}
                    </p>
                </div>
            </section>

            {/* ═══ FEATURE CARDS ═══ */}
            <section ref={cardsRef} className="bg-brand-darker py-16 sm:py-20 px-4 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className={`text-center mb-14 ${cardsVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-4">
                            {t('product.exploreFeatures')}
                        </h2>
                        <p className="text-brand-textMuted text-base sm:text-lg max-w-2xl mx-auto">
                            {t('product.exploreSubtitle')}
                        </p>
                    </div>

                    {/* Cards Grid — 2 columns on md, staggered left/right animation */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
                        {FEATURES.map((feature, idx) => {
                            const featureData = t(`featurePages.${feature.key}`);
                            const isEven = idx % 2 === 0;
                            const animClass = cardsVisible
                                ? `${isEven ? 'animate-slide-left' : 'animate-slide-right'}`
                                : 'opacity-0';
                            const delay = Math.floor(idx / 2) * 150;

                            return (
                                <Link
                                    key={feature.key}
                                    to={`/features/${feature.slug}`}
                                    className={`group block ${animClass}`}
                                    style={{ animationDelay: `${delay}ms` }}
                                >
                                    <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden hover:border-brand-purple/40 transition-all duration-300 card-hover flex flex-col h-full">
                                        {/* Media Header — tall */}
                                        <div className="h-64 sm:h-72 relative overflow-hidden">
                                            {feature.image ? (
                                                <img src={feature.image} alt={featureData?.title || feature.key} className="w-full h-full object-cover object-top" loading="lazy" />
                                            ) : (
                                                <video autoPlay loop muted playsInline className="event-video">
                                                    <source src={DANCE_VIDEOS[feature.video]} type="video/mp4" />
                                                </video>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />

                                            {/* Feature number badge */}
                                            <div className="absolute top-4 left-4 z-10">
                                                <span className="bg-brand-purple/80 text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg">
                                                    {idx + 1}
                                                </span>
                                            </div>

                                            {/* Icon */}
                                            <div className="absolute bottom-4 left-4 z-10">
                                                <div className="w-12 h-12 rounded-xl bg-brand-dark/80 backdrop-blur-sm flex items-center justify-center text-brand-gold border border-white/10 group-hover:bg-brand-purple/40 transition-colors">
                                                    {feature.icon}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-grow">
                                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors">
                                                {featureData?.title || feature.key}
                                            </h3>
                                            <p className="text-brand-textMuted text-sm leading-relaxed mb-5 flex-grow line-clamp-3">
                                                {featureData?.desc || featureData?.subtitle || ''}
                                            </p>
                                            <span className="text-brand-gold text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                                Explore More <ArrowRight className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══ CTA ═══ */}
            <section ref={ctaRef} className="py-16 sm:py-20 px-4 border-t border-white/5">
                <div className={`max-w-4xl mx-auto bg-gradient-to-br from-[#1B0033] via-[#2A005E] to-[#4A2BB8] rounded-3xl p-8 sm:p-12 text-center shadow-2xl border border-white/10 ${ctaVisible ? 'animate-scale-in' : 'opacity-0'}`}>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                        {t('product.readyTitle')}
                    </h2>
                    <p className="text-brand-textMuted text-lg mb-8 max-w-xl mx-auto">
                        {t('product.subtitle')}
                    </p>
                    <button className="bg-brand-gold text-brand-darker font-bold text-lg py-4 px-10 rounded-full hover:bg-yellow-400 transition-all duration-300 hover:scale-105 shadow-xl">
                        {t('product.downloadCta')}
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Product;
