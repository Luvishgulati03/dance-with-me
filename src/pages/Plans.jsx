import { Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Plans = () => {
    const { t } = useLanguage();
    const planItems = t('plans.items');

    const planStyles = [
        {
            bgColor: 'bg-brand-dark base-gradient',
            border: 'border-white/10',
        },
        {
            bgColor: 'bg-gradient-to-br from-[#2A005E] to-[#4A2BB8]',
            border: 'border-brand-purple/50 scale-105 shadow-2xl z-10',
        },
        {
            bgColor: 'bg-brand-dark base-gradient',
            border: 'border-brand-gold/30',
            badge: t('plans.mostPopular'),
        },
    ];

    return (
        <div className="bg-brand-darker py-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-white mb-4">{t('plans.title')}</h1>
                    <p className="text-xl text-brand-textMuted">{t('plans.subtitle')}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
                    {Array.isArray(planItems) && planItems.map((plan, index) => (
                        <div
                            key={index}
                            className={`${planStyles[index]?.bgColor || ''} ${planStyles[index]?.border || ''} border rounded-3xl p-8 relative flex flex-col h-full`}
                        >
                            {planStyles[index]?.badge && (
                                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-4">
                                    <span className="bg-brand-gold text-brand-darker text-xs font-bold uppercase py-1 px-3 rounded-full shadow-lg">
                                        {planStyles[index].badge}
                                    </span>
                                </div>
                            )}

                            <h2 className="text-3xl font-bold text-white mb-2">{plan.name}</h2>
                            <div className="text-4xl font-extrabold text-white mb-8">
                                {plan.price}
                                {!['free', 'gratuit', 'gratis'].includes(plan.price?.toLowerCase()) && (
                                    <span className="text-lg font-normal text-brand-textMuted">{t('plans.perMonth')}</span>
                                )}
                            </div>

                            <div className="flex-grow space-y-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-brand-gold uppercase tracking-wider mb-2">{t('plans.perfectFor')}</h3>
                                    <p className="text-brand-textMuted leading-relaxed">{plan.perfectFor}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-brand-gold uppercase tracking-wider mb-2">{t('plans.availableOn')}</h3>
                                    <p className="text-white flex items-center gap-2">
                                        <Check className="h-5 w-5 text-brand-purple" /> {plan.availableOn}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-brand-gold uppercase tracking-wider mb-2">{t('plans.favoriteFeatures')}</h3>
                                    <p className="text-brand-textMuted">{plan.features}</p>
                                </div>
                            </div>

                            <button className="mt-8 w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-bold transition-colors">
                                {t('plans.selectPrefix')} {plan.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Plans;
