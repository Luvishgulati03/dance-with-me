const Personas = () => {
    const personas = [
        {
            num: "1",
            title: "Dancer",
            desc: "Learn, perform and participate in challenges."
        },
        {
            num: "2",
            title: "Artist",
            desc: "Conduct live or recorded classes."
        },
        {
            num: "3",
            title: "DJ",
            desc: "Create and sell playlists to enhance performances."
        },
        {
            num: "4",
            title: "Organizer",
            desc: "Host and promote dance events."
        }
    ];

    return (
        <div className="bg-brand-dark min-h-screen py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-20">
                    <h1 className="text-5xl font-extrabold text-white mb-4">Personas</h1>
                    <p className="text-xl text-brand-textMuted">Who are you in the dance community?</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {personas.map((persona, idx) => (
                        <div key={idx} className="flex gap-6 items-start bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
                            <div className="flex-shrink-0 w-16 h-16 bg-brand-purple rounded-full flex items-center justify-center text-3xl font-extrabold text-white shadow-[0_0_15px_rgba(144,53,255,0.4)] group-hover:scale-110 transition-transform">
                                {persona.num}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">{persona.title}</h2>
                                <p className="text-brand-textMuted text-lg leading-relaxed">{persona.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <button className="bg-brand-gold text-brand-darker font-bold text-lg py-4 px-10 rounded-full hover:bg-yellow-400 transition-colors shadow-xl">
                        Join as an artist
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Personas;
