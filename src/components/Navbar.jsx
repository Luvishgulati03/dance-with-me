import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinks = [
        { name: 'Plans', path: '/plans' },
        { name: 'Product', path: '/product' },
        { name: 'Personas', path: '/personas' },
        { name: 'FAQ', path: '/faq' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/95 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center gap-2">
                            <span className="text-brand-gold text-xl font-bold uppercase tracking-wider">
                                1 Million Dancers
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden md:block">
                        <ul className="flex bg-white/10 rounded-full px-6 py-2 items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-white hover:text-brand-gold transition-colors duration-200 text-sm font-medium"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            {isOpen && (
                <div className="md:hidden bg-brand-dark border-b border-white/10 shadow-xl">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className="text-gray-300 block hover:bg-brand-purple hover:text-white px-3 py-3 rounded-md text-base font-medium transition-colors"
                                aria-current={link.current ? 'page' : undefined}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
