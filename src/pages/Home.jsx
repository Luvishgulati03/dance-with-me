import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-screen w-full flex bg-brand-dark/50 items-center justify-center -mt-20 overflow-hidden">
                {/* Dummy Video Background */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute z-[-1] w-auto min-w-full min-h-full max-w-none object-cover opacity-60"
                >
                    <source src="https://videos.pexels.com/video-files/2795738/2795738-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight drop-shadow-lg">
                        Connect with people who dance like you.
                    </h1>
                    <Link
                        to="/plans"
                        className="inline-block bg-brand-purple hover:bg-brand-purple/90 text-white font-bold text-lg py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(144,53,255,0.5)]"
                    >
                        Come join us!
                    </Link>
                </div>
            </section>

            {/* Brief Intro/Transition */}
            <section className="bg-brand-dark py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        The App
                    </h2>
                    <p className="text-brand-textMuted text-lg mb-8 max-w-2xl mx-auto">
                        Discover a community of dancers, explore new routines, and elevate your passion for movement.
                    </p>
                    <Link to="/product" className="text-brand-gold hover:text-white font-semibold flex items-center justify-center gap-2 transition-colors">
                        Explore the app
                        <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
