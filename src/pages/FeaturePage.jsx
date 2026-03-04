import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { Smartphone, ArrowLeft, MessageCircle, Users } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const FEATURE_KEYS = {
    'one-on-one': 'oneOnOne',
    'one-to-many': 'oneToMany',
    'video-program': 'videoProgram',
    'music-playlist': 'musicPlaylist',
    'find-connection': 'findConnection',
    'badges': 'badges',
    'referral': 'referral',
    'challenges': 'challenges',
    'feed': 'feed',
    'chat': 'chat',
};

const FEATURE_IMAGES = {
    'oneOnOne': '/images/app-home.jpeg',
    'oneToMany': '/images/app-home.jpeg',
    'videoProgram': '/images/app-video-program.jpeg',
    'musicPlaylist': '/images/app-playlist.jpeg',
    'findConnection': '/images/app-connection.png',
    'feed': '/images/app-feed.jpeg',
    'chat': '/images/app-chat.jpeg',
};

const FeaturePage = () => {
    const { featureSlug } = useParams();
    const { t } = useLanguage();
    const featureKey = FEATURE_KEYS[featureSlug] || 'oneOnOne';
    const feature = t(`featurePages.${featureKey}`);
    const featureImage = FEATURE_IMAGES[featureKey];

    const [heroRef, heroVisible] = useScrollAnimation();
    const [contentRef, contentVisible] = useScrollAnimation();
    const [phoneRef, phoneVisible] = useScrollAnimation();

    const isChat = featureKey === 'chat';

    return (
        <div className="bg-brand-dark min-h-screen">
            {/* HERO */}
            <section ref={heroRef} className="relative pt-8 sm:pt-12 pb-16 px-4 overflow-hidden">
                <div className="absolute top-10 right-10 w-72 h-72 bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[150px] pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10">
                    <Link to="/product" className={`text-brand-textMuted hover:text-brand-gold text-sm font-medium flex items-center gap-1 mb-8 transition-colors ${heroVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                        <ArrowLeft className="h-4 w-4" /> {t('featurePages.backToProduct')}
                    </Link>

                    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                        {/* Text */}
                        <div className="lg:w-1/2">
                            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight ${heroVisible ? 'animate-slide-left' : 'opacity-0'}`}>
                                {feature?.title || featureKey}
                            </h1>
                            <p className={`text-lg sm:text-xl text-brand-textMuted leading-relaxed mb-6 ${heroVisible ? 'animate-slide-left delay-200' : 'opacity-0'}`}>
                                {feature?.subtitle || ''}
                            </p>
                            <p className={`text-brand-textMuted leading-relaxed ${heroVisible ? 'animate-slide-left delay-300' : 'opacity-0'}`}>
                                {feature?.desc || ''}
                            </p>
                        </div>

                        {/* Phone Mockup */}
                        <div ref={phoneRef} className={`lg:w-1/2 flex justify-center ${phoneVisible ? 'animate-slide-right delay-300' : 'opacity-0'}`}>
                            <div className="w-56 sm:w-64 animate-float">
                                <div className="bg-gray-900 rounded-[3rem] p-3 shadow-2xl border border-white/10 animate-pulse-glow">
                                    <div className="bg-gray-900 w-28 h-6 rounded-full mx-auto -mt-1 mb-2 relative z-10" />
                                    <div className="bg-gradient-to-b from-brand-gradientStart to-brand-dark rounded-[2.3rem] overflow-hidden aspect-[9/19] flex flex-col items-center justify-center border border-white/5 relative">
                                        {featureImage ? (
                                            <img src={featureImage} alt={feature?.title || featureKey} className="absolute inset-0 w-full h-full object-cover object-top" loading="lazy" />
                                        ) : (
                                            <>
                                                <Smartphone className="h-8 w-8 text-white/30 mb-3" />
                                                <p className="text-white/30 text-xs font-medium text-center px-4">{t('featurePages.appPreview')}</p>
                                                <p className="text-white/20 text-[10px] mt-1 text-center px-4">{feature?.title}</p>
                                            </>
                                        )}
                                    </div>
                                    <div className="w-28 h-1 bg-white/30 rounded-full mx-auto mt-3" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT SECTION */}
            <section ref={contentRef} className="bg-brand-darker py-16 px-4 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    {isChat ? (
                        /* CHAT: Two-column layout */
                        <div className={`grid md:grid-cols-2 gap-8 ${contentVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                            <div className="bg-white/5 rounded-3xl border border-white/10 p-8 card-hover">
                                <div className="w-14 h-14 rounded-2xl bg-brand-purple/20 flex items-center justify-center text-brand-gold mb-6">
                                    <MessageCircle className="h-7 w-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">{feature?.personal?.title}</h3>
                                <p className="text-brand-textMuted leading-relaxed">{feature?.personal?.desc}</p>
                            </div>
                            <div className="bg-white/5 rounded-3xl border border-white/10 p-8 card-hover">
                                <div className="w-14 h-14 rounded-2xl bg-brand-gold/20 flex items-center justify-center text-brand-gold mb-6">
                                    <Users className="h-7 w-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">{feature?.group?.title}</h3>
                                <p className="text-brand-textMuted leading-relaxed">{feature?.group?.desc}</p>
                            </div>
                        </div>
                    ) : (
                        /* DEFAULT: Coming soon placeholder */
                        <div className={`text-center py-12 ${contentVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                            <div className="bg-white/5 rounded-3xl border border-white/10 p-12 max-w-2xl mx-auto">
                                <div className="w-16 h-16 rounded-2xl bg-brand-purple/20 flex items-center justify-center text-brand-gold mx-auto mb-6">
                                    <Smartphone className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">Feature Details</h3>
                                <p className="text-brand-textMuted leading-relaxed">
                                    {t('featurePages.comingSoon')}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default FeaturePage;
