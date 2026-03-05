import { useLanguage } from '../i18n/LanguageContext';
import { Globe, ChevronDown } from 'lucide-react';

const LanguageSelector = () => {
    const { language, setLanguage } = useLanguage();

    const label = language === 'fr' ? 'Français' : 'English';

    return (
        <div className="relative flex items-center gap-1.5">
            <Globe className="h-4 w-4 text-brand-gold" />
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white/10 text-white text-xs sm:text-sm font-medium rounded-full px-3 py-1.5 border border-white/20 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-brand-purple cursor-pointer appearance-none pr-7 transition-colors"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 8px center',
                }}
                aria-label="Select language"
            >
                <option value="en" className="bg-brand-dark text-white">English</option>
                <option value="fr" className="bg-brand-dark text-white">Français</option>
                <option value="es" className="bg-brand-dark text-white">Español</option>
            </select>
        </div>
    );
};

export default LanguageSelector;
