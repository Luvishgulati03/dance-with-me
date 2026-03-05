import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ContentContext = createContext();

const API_BASE = '/api';

export const ContentProvider = ({ children }) => {
    const [siteContent, setSiteContent] = useState([]);
    const [events, setEvents] = useState([]);
    const [studios, setStudios] = useState([]);
    const [plans, setPlans] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [features, setFeatures] = useState([]);
    const [personas, setPersonas] = useState([]);
    const [media, setMedia] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const fetchAll = useCallback(async () => {
        try {
            const [contentRes, eventsRes, studiosRes, plansRes, faqsRes, featuresRes, personasRes, mediaRes] = await Promise.all([
                fetch(`${API_BASE}/content`),
                fetch(`${API_BASE}/events`),
                fetch(`${API_BASE}/studios`),
                fetch(`${API_BASE}/plans`),
                fetch(`${API_BASE}/faqs`),
                fetch(`${API_BASE}/features`),
                fetch(`${API_BASE}/personas`),
                fetch(`${API_BASE}/upload/media`),
            ]);
            setSiteContent(await contentRes.json());
            setEvents(await eventsRes.json());
            setStudios(await studiosRes.json());
            setPlans(await plansRes.json());
            setFaqs(await faqsRes.json());
            setFeatures(await featuresRes.json());
            setPersonas(await personasRes.json());
            setMedia(await mediaRes.json());
            setLoaded(true);
        } catch (err) {
            console.error('Failed to fetch content:', err);
            setLoaded(true); // Still mark as loaded so fallback translations work
        }
    }, []);

    useEffect(() => { fetchAll(); }, [fetchAll]);

    // Helper: get content value by page/section/key for a language
    const getContent = useCallback((page, section, key, lang = 'en') => {
        const item = siteContent.find(
            c => c.page === page && c.section === section && c.content_key === key
        );
        if (!item) return null;
        return lang === 'fr' ? item.value_fr : lang === 'es' ? (item.value_es || item.value_en) : item.value_en;
    }, [siteContent]);

    // Get media URL by context
    const getMedia = useCallback((context) => {
        const item = media.find(m => m.context === context);
        return item ? item.url : null;
    }, [media]);

    return (
        <ContentContext.Provider value={{
            siteContent, events, studios, plans, faqs, features, personas, media,
            getContent, getMedia, loaded, refetch: fetchAll,
        }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};
