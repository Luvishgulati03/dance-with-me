import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSelector from './LanguageSelector';

const FEATURE_ROUTES = [
    { key: 'oneOnOne', path: '/features/one-on-one' },
    { key: 'oneToMany', path: '/features/one-to-many' },
    { key: 'videoProgram', path: '/features/video-program' },
    { key: 'musicPlaylist', path: '/features/music-playlist' },
    { key: 'findConnection', path: '/features/find-connection' },
    { key: 'badges', path: '/features/badges' },
    { key: 'referral', path: '/features/referral' },
    { key: 'challenges', path: '/features/challenges' },
    { key: 'feed', path: '/features/feed' },
    { key: 'chat', path: '/features/chat' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showProductMenu, setShowProductMenu] = useState(false);
    const [showMobileProductMenu, setShowMobileProductMenu] = useState(false);
    const productMenuRef = useRef(null);
    const productButtonRef = useRef(null);
    const { t } = useLanguage();
    const location = useLocation();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                productMenuRef.current &&
                !productMenuRef.current.contains(e.target) &&
                productButtonRef.current &&
                !productButtonRef.current.contains(e.target)
            ) {
                setShowProductMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close dropdown on route change
    useEffect(() => {
        setShowProductMenu(false);
        setIsOpen(false);
        setShowMobileProductMenu(false);
    }, [location]);

    const navLinks = [
        { name: t('nav.home'), path: '/' },
        { name: t('nav.plans'), path: '/plans' },
        { name: t('nav.product'), path: '/product', hasDropdown: true },
        { name: t('nav.personas'), path: '/personas' },
        { name: t('nav.events'), path: '/events' },
        { name: t('nav.faq'), path: '/faq' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/95 backdrop-blur-md border-b border-white/10">
            <div className="w-full mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">

                    {/* Logo */}
                    <div className="flex-shrink-0 min-w-0">
                        <Link to="/" className="flex items-center gap-2">
                            <span className="text-brand-gold text-base lg:text-xl font-bold uppercase tracking-wider whitespace-nowrap">
                                One Trillion Dancers
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden xl:flex items-center justify-center flex-1 mx-4 2xl:mx-8 min-w-0">
                        <ul className="flex bg-white/10 rounded-full px-3 xl:px-5 2xl:px-6 py-2 items-center space-x-3 xl:space-x-5 2xl:space-x-6">
                            {navLinks.map((link) => (
                                <li key={link.path} className="relative">
                                    {link.hasDropdown ? (
                                        <div className="relative">
                                            <button
                                                ref={productButtonRef}
                                                onClick={() => setShowProductMenu(!showProductMenu)}
                                                className="text-white hover:text-brand-gold transition-colors duration-200 text-xs xl:text-sm font-medium whitespace-nowrap flex items-center gap-1"
                                            >
                                                {link.name}
                                                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${showProductMenu ? 'rotate-180' : ''}`} />
                                            </button>
                                        </div>
                                    ) : (
                                        <Link
                                            to={link.path}
                                            className="text-white hover:text-brand-gold transition-colors duration-200 text-xs xl:text-sm font-medium whitespace-nowrap"
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Language Selector */}
                    <div className="hidden xl:flex items-center flex-shrink-0">
                        <LanguageSelector />
                    </div>

                    {/* Mobile button */}
                    <div className="xl:hidden flex items-center gap-2 sm:gap-3">
                        <LanguageSelector />
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* ════ DESKTOP PRODUCT DROPDOWN ════ */}
            {showProductMenu && (
                <div
                    ref={productMenuRef}
                    className="hidden xl:block absolute top-full left-1/2 -translate-x-1/2 w-[700px] bg-brand-dark/98 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl mt-2 p-6 animate-scale-in z-50"
                >
                    <h3 className="text-brand-gold text-sm font-bold uppercase tracking-widest mb-4">{t('nav.productFeatures')}</h3>
                    {/* Top row — first 5 */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                        {FEATURE_ROUTES.slice(0, 5).map(({ key, path }, idx) => (
                            <Link key={key} to={path} className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 transition-colors group">
                                <div className="w-7 h-7 rounded-lg bg-brand-purple/20 flex items-center justify-center text-brand-gold group-hover:bg-brand-purple/40 transition-colors flex-shrink-0">
                                    <span className="text-xs font-bold">{idx + 1}</span>
                                </div>
                                <span className="text-white text-sm font-medium group-hover:text-brand-gold transition-colors">{t(`nav.features.${key}`)}</span>
                            </Link>
                        ))}
                    </div>
                    {/* Center CTA */}
                    <div className="py-3 border-t border-b border-white/10 my-3 flex justify-center">
                        <Link to="/product" className="inline-flex items-center gap-2 bg-brand-purple/20 hover:bg-brand-purple/40 text-brand-gold hover:text-white font-bold text-sm py-2.5 px-6 rounded-full border border-brand-purple/30 transition-all duration-300">
                            {t('nav.product')} Overview →
                        </Link>
                    </div>
                    {/* Bottom row — last 5 */}
                    <div className="grid grid-cols-2 gap-2 mt-3">
                        {FEATURE_ROUTES.slice(5).map(({ key, path }, idx) => (
                            <Link key={key} to={path} className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 transition-colors group">
                                <div className="w-7 h-7 rounded-lg bg-brand-purple/20 flex items-center justify-center text-brand-gold group-hover:bg-brand-purple/40 transition-colors flex-shrink-0">
                                    <span className="text-xs font-bold">{idx + 6}</span>
                                </div>
                                <span className="text-white text-sm font-medium group-hover:text-brand-gold transition-colors">{t(`nav.features.${key}`)}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* ════ MOBILE MENU ════ */}
            {isOpen && (
                <div className="xl:hidden bg-brand-dark border-b border-white/10 shadow-xl max-h-[80vh] overflow-y-auto">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        {navLinks.map((link) => (
                            <div key={link.path}>
                                {link.hasDropdown ? (
                                    <>
                                        <div className="flex items-center">
                                            <Link to={link.path} onClick={() => setIsOpen(false)} className="text-gray-300 flex-grow hover:bg-brand-purple hover:text-white px-3 py-3 rounded-md text-base font-medium transition-colors">
                                                {link.name}
                                            </Link>
                                            <button
                                                onClick={() => setShowMobileProductMenu(!showMobileProductMenu)}
                                                className="text-gray-400 hover:text-white p-3"
                                            >
                                                <ChevronDown className={`h-4 w-4 transition-transform ${showMobileProductMenu ? 'rotate-180' : ''}`} />
                                            </button>
                                        </div>
                                        {showMobileProductMenu && (
                                            <div className="ml-4 mt-1 space-y-1 border-l-2 border-brand-purple/30 pl-3 animate-fade-in">
                                                <p className="text-brand-gold text-xs font-bold uppercase tracking-wider px-3 py-2">{t('nav.productFeatures')}</p>
                                                {FEATURE_ROUTES.map(({ key, path }) => (
                                                    <Link
                                                        key={key}
                                                        to={path}
                                                        onClick={() => setIsOpen(false)}
                                                        className="text-gray-400 block hover:bg-white/5 hover:text-white px-3 py-2 rounded-md text-sm transition-colors"
                                                    >
                                                        {t(`nav.features.${key}`)}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link to={link.path} onClick={() => setIsOpen(false)} className="text-gray-300 block hover:bg-brand-purple hover:text-white px-3 py-3 rounded-md text-base font-medium transition-colors">
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
