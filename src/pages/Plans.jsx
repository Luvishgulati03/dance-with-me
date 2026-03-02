import { Check } from 'lucide-react';

const Plans = () => {
    const plans = [
        {
            name: 'Stage',
            price: '0,99€',
            perfectFor: 'Beginners, curious movers, and anyone who wants to start dancing for fun',
            availableOn: 'iPhone · Android',
            features: 'Introductory · Accessible · Essential',
            bgColor: 'bg-brand-dark base-gradient',
            border: 'border-white/10'
        },
        {
            name: 'Spotlight',
            price: '14,99€',
            perfectFor: 'Dancers who want to go beyond the basics, experiment with different styles in more depth, and elevate their practice',
            availableOn: 'iPhone · Android',
            features: 'Enhanced · Challenging · Progress',
            bgColor: 'bg-gradient-to-br from-[#2A005E] to-[#4A2BB8]',
            border: 'border-brand-purple/50 scale-105 shadow-2xl z-10'
        },
        {
            name: 'Star',
            price: '24,99€',
            perfectFor: 'Those who want the complete dance experience and the freedom to practice and perform without limits',
            availableOn: 'iPhone · Android',
            features: 'Unlimited · Exclusive · Advanced · Personalized',
            bgColor: 'bg-brand-dark base-gradient',
            border: 'border-brand-gold/30',
            badge: 'Most Popular'
        }
    ];

    return (
        <div className="bg-brand-darker min-h-screen py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-white mb-4">Check our plans</h1>
                    <p className="text-xl text-brand-textMuted">Choose the perfect plan for your dance journey.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`${plan.bgColor} ${plan.border} border rounded-3xl p-8 relative flex flex-col h-full`}
                        >
                            {plan.badge && (
                                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-4">
                                    <span className="bg-brand-gold text-brand-darker text-xs font-bold uppercase py-1 px-3 rounded-full shadow-lg">
                                        {plan.badge}
                                    </span>
                                </div>
                            )}

                            <h2 className="text-3xl font-bold text-white mb-2">{plan.name}</h2>
                            <div className="text-4xl font-extrabold text-white mb-8">{plan.price}<span className="text-lg font-normal text-brand-textMuted">/mo</span></div>

                            <div className="flex-grow space-y-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-brand-gold uppercase tracking-wider mb-2">Perfect For</h3>
                                    <p className="text-brand-textMuted leading-relaxed">{plan.perfectFor}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-brand-gold uppercase tracking-wider mb-2">Available On</h3>
                                    <p className="text-white flex items-center gap-2">
                                        <Check className="h-5 w-5 text-brand-purple" /> {plan.availableOn}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-brand-gold uppercase tracking-wider mb-2">Favorite Features</h3>
                                    <p className="text-brand-textMuted">{plan.features}</p>
                                </div>
                            </div>

                            <button className="mt-8 w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-bold transition-colors">
                                Select {plan.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Plans;
