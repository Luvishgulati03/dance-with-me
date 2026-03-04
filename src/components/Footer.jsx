import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="bg-brand-darker border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand & Newsletter */}
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-extrabold text-white mb-4">
                            {t('footer.subscribe')}
                        </h2>
                        <form className="mt-6 sm:flex max-w-md">
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                type="email"
                                name="email-address"
                                id="email-address"
                                autoComplete="email"
                                required
                                className="w-full min-w-0 px-4 py-3 text-base text-brand-dark bg-white border border-transparent rounded-l-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-purple"
                                placeholder={t('footer.emailPlaceholder')}
                            />
                            <div className="mt-3 sm:mt-0 sm:ml-0 sm:flex-shrink-0">
                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-r-full text-white bg-brand-purple hover:bg-brand-purple/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-purple transition-colors duration-200"
                                >
                                    {t('footer.subscribeCta')}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-brand-gold tracking-wider uppercase mb-4">
                            {t('footer.explore')}
                        </h3>
                        <ul className="space-y-4">
                            <li><Link to="/plans" className="text-brand-textMuted hover:text-white transition-colors">{t('nav.plans')}</Link></li>
                            <li><Link to="/product" className="text-brand-textMuted hover:text-white transition-colors">{t('nav.product')}</Link></li>
                            <li><Link to="/personas" className="text-brand-textMuted hover:text-white transition-colors">{t('nav.personas')}</Link></li>
                            <li><Link to="/events" className="text-brand-textMuted hover:text-white transition-colors">{t('nav.events')}</Link></li>
                            <li><Link to="/faq" className="text-brand-textMuted hover:text-white transition-colors">{t('nav.faq')}</Link></li>
                        </ul>
                    </div>

                    {/* Social & Legal */}
                    <div>
                        <h3 className="text-sm font-semibold text-brand-gold tracking-wider uppercase mb-4">
                            {t('footer.connect')}
                        </h3>
                        <div className="flex space-x-4 mb-6">
                            <a href="#" className="text-brand-textMuted hover:text-white transition-colors">
                                <span className="sr-only">Instagram</span>
                                <Instagram className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-brand-textMuted hover:text-white transition-colors">
                                <span className="sr-only">Facebook</span>
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-brand-textMuted hover:text-white transition-colors">
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin className="h-6 w-6" />
                            </a>
                        </div>

                        <ul className="space-y-4">
                            <li><Link to="#" className="text-xs text-brand-textMuted hover:text-white transition-colors">{t('footer.terms')}</Link></li>
                            <li><Link to="#" className="text-xs text-brand-textMuted hover:text-white transition-colors">{t('footer.privacy')}</Link></li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-xs text-brand-textMuted">
                        {t('footer.copyright')}
                    </p>
                    <Link to="/admin" className="text-xs text-white/20 hover:text-white/50 transition-colors mt-2 md:mt-0">
                        Admin
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
