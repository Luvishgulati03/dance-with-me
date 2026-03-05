import { createContext, useContext, useState, useCallback } from 'react';
import translations from './translations';
import { useContent } from '../contexts/ContentContext';

const LanguageContext = createContext();

// Maps page/section/key from DB to nested translation paths
const CONTENT_MAP = {
    // home page
    'home.hero.title': ['home', 'hero', 'title'],
    'home.hero.cta': ['home', 'hero', 'cta'],
    'home.app.heading': ['home', 'app', 'heading'],
    'home.app.description': ['home', 'app', 'description'],
    'home.app.cta': ['home', 'app', 'cta'],
    'home.app.appLink': ['home', 'app', 'appLink'],
    'home.app.phonePlaceholder': ['home', 'app', 'phonePlaceholder'],
    'home.events.heading': ['home', 'events', 'heading'],
    'home.events.subheading': ['home', 'events', 'subheading'],
    'home.events.viewAll': ['home', 'events', 'viewAll'],
    'home.events.learnMore': ['home', 'events', 'learnMore'],
    'home.studios.heading': ['home', 'studios', 'heading'],
    'home.studios.subheading': ['home', 'studios', 'subheading'],
    'home.studios.viewAll': ['home', 'studios', 'viewAll'],
    'home.studios.styles': ['home', 'studios', 'styles'],
    'home.whyUs.heading': ['home', 'whyUs', 'heading'],
    'home.whyUs.subheading': ['home', 'whyUs', 'subheading'],
    'home.whyUs.safe': ['home', 'whyUs', 'safe'],
    'home.whyUs.safeDesc': ['home', 'whyUs', 'safeDesc'],
    'home.whyUs.community': ['home', 'whyUs', 'community'],
    'home.whyUs.communityDesc': ['home', 'whyUs', 'communityDesc'],
    'home.whyUs.allInOne': ['home', 'whyUs', 'allInOne'],
    'home.whyUs.allInOneDesc': ['home', 'whyUs', 'allInOneDesc'],
    'home.whyUs.passion': ['home', 'whyUs', 'passion'],
    'home.whyUs.passionDesc': ['home', 'whyUs', 'passionDesc'],
    'home.plans.heading': ['home', 'plans', 'heading'],
    'home.plans.subheading': ['home', 'plans', 'subheading'],
    'home.plans.viewAll': ['home', 'plans', 'viewAll'],
    'home.plans.selectPlan': ['home', 'plans', 'selectPlan'],
    'home.plans.perMonth': ['home', 'plans', 'perMonth'],
    // nav
    'nav.home': ['nav', 'main', 'home'],
    'nav.plans': ['nav', 'main', 'plans'],
    'nav.product': ['nav', 'main', 'product'],
    'nav.personas': ['nav', 'main', 'personas'],
    'nav.faq': ['nav', 'main', 'faq'],
    'nav.events': ['nav', 'main', 'events'],
    'nav.productFeatures': ['nav', 'main', 'productFeatures'],
    // product page
    'product.title': ['product', 'hero', 'title'],
    'product.subtitle': ['product', 'hero', 'subtitle'],
    'product.readyTitle': ['product', 'hero', 'readyTitle'],
    'product.downloadCta': ['product', 'hero', 'downloadCta'],
    'product.exploreFeatures': ['product', 'hero', 'exploreFeatures'],
    'product.exploreSubtitle': ['product', 'hero', 'exploreSubtitle'],
    // plans page
    'plans.title': ['plans', 'page', 'title'],
    'plans.subtitle': ['plans', 'page', 'subtitle'],
    'plans.perMonth': ['plans', 'page', 'perMonth'],
    'plans.selectPrefix': ['plans', 'page', 'selectPrefix'],
    'plans.perfectFor': ['plans', 'page', 'perfectFor'],
    'plans.availableOn': ['plans', 'page', 'availableOn'],
    'plans.favoriteFeatures': ['plans', 'page', 'favoriteFeatures'],
    'plans.mostPopular': ['plans', 'page', 'mostPopular'],
    // personas page
    'personas.title': ['personas', 'page', 'title'],
    'personas.subtitle': ['personas', 'page', 'subtitle'],
    'personas.joinCta': ['personas', 'page', 'joinCta'],
    // faq page
    'faq.title': ['faq', 'page', 'title'],
    'faq.subtitle': ['faq', 'page', 'subtitle'],
    // footer
    'footer.subscribe': ['footer', 'main', 'subscribe'],
    'footer.emailPlaceholder': ['footer', 'main', 'emailPlaceholder'],
    'footer.subscribeCta': ['footer', 'main', 'subscribeCta'],
    'footer.explore': ['footer', 'main', 'explore'],
    'footer.connect': ['footer', 'main', 'connect'],
    'footer.terms': ['footer', 'main', 'terms'],
    'footer.privacy': ['footer', 'main', 'privacy'],
    'footer.copyright': ['footer', 'main', 'copyright'],
    // events page
    'eventsPage.hero.tag': ['eventsPage', 'hero', 'tag'],
    'eventsPage.hero.title': ['eventsPage', 'hero', 'title'],
    'eventsPage.hero.subtitle': ['eventsPage', 'hero', 'subtitle'],
    'eventsPage.hero.browseCta': ['eventsPage', 'hero', 'browseCta'],
    'eventsPage.hero.studiosCta': ['eventsPage', 'hero', 'studiosCta'],
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguageState] = useState(() => {
        try {
            return localStorage.getItem('dance-app-lang') || 'en';
        } catch {
            return 'en';
        }
    });

    const { siteContent, loaded } = useContent();

    const setLanguage = useCallback((lang) => {
        setLanguageState(lang);
        try {
            localStorage.setItem('dance-app-lang', lang);
        } catch {
            // localStorage not available
        }
    }, []);

    const t = useCallback((key) => {
        // Check if we have a dynamic override from the DB
        const mapping = CONTENT_MAP[key];
        if (mapping && siteContent.length > 0) {
            const [page, section, contentKey] = mapping;
            const item = siteContent.find(
                c => c.page === page && c.section === section && c.content_key === contentKey
            );
            if (item) {
                let val;
                if (language === 'fr') val = item.value_fr;
                else if (language === 'es') val = item.value_es;
                else val = item.value_en;
                if (val && val.trim()) return val;
            }
        }

        // Fall back to static translations
        const keys = key.split('.');
        let value = translations[language];
        for (const k of keys) {
            if (value === undefined || value === null) return key;
            value = value[k];
        }
        return value !== undefined && value !== null ? value : key;
    }, [language, siteContent]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
