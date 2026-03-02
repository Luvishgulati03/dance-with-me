import { Play, Video, Users, Mic2 } from 'lucide-react';

const Product = () => {
    const stats = [
        { icon: <Mic2 className="h-8 w-8" />, label: "One-on-one classes", value: "4" },
        { icon: <Video className="h-8 w-8" />, label: "Video Program", value: "1" },
        { icon: <Users className="h-8 w-8" />, label: "Group Classes", value: "6" },
        { icon: <Play className="h-8 w-8" />, label: "Plays in your playlist", value: "236" },
    ];

    return (
        <div className="bg-brand-dark min-h-screen">

            {/* Header Section */}
            <section className="pt-24 pb-16 px-4 text-center bg-brand-gradient">
                <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">Explore the app</h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                    Take on challenges and become a DJ, Artist & Organizer!
                </p>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="flex justify-center mb-4 text-brand-gold">
                                    {stat.icon}
                                </div>
                                <div className="text-5xl font-extrabold text-white mb-2">{stat.value}</div>
                                <div className="text-brand-textMuted font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* App Preview Mockup */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto bg-gradient-to-tr from-[#1B0033] to-[#4A2BB8] rounded-3xl p-8 md:p-12 text-center shadow-2xl border border-white/10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Ready to move?</h2>
                    <button className="bg-brand-gold text-brand-darker font-bold text-lg py-4 px-10 rounded-full hover:bg-yellow-400 transition-colors">
                        Download the App Now
                    </button>
                </div>
            </section>

        </div>
    );
};

export default Product;
