import { useLanguage } from '../i18n/LanguageContext';
import { X, Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const DANCE_VIDEOS = [
    'https://videos.pexels.com/video-files/5973174/5973174-sd_506_960_25fps.mp4',
    'https://videos.pexels.com/video-files/4563407/4563407-sd_506_960_25fps.mp4',
    'https://videos.pexels.com/video-files/6394054/6394054-sd_506_960_25fps.mp4',
];

const EventModal = ({ event, onClose }) => {
    const { t } = useLanguage();

    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    const videoIdx = event.title?.length % DANCE_VIDEOS.length || 0;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" onClick={onClose}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Modal */}
            <div className="relative bg-brand-dark border border-white/10 rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
                {/* Close */}
                <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-brand-dark/80 hover:bg-white/20 rounded-full p-2 transition-colors">
                    <X className="h-5 w-5 text-white" />
                </button>

                {/* Video */}
                <div className="h-52 relative overflow-hidden rounded-t-3xl">
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                        <source src={DANCE_VIDEOS[videoIdx]} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 z-10">
                        <span className="bg-brand-purple/80 text-white text-xs font-bold uppercase px-3 py-1 rounded-full backdrop-blur-sm">
                            {event.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">{event.title}</h2>

                    <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-brand-textMuted text-sm">
                            <Calendar className="h-4 w-4 text-brand-gold flex-shrink-0" />
                            <span>{event.date} · {event.time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-brand-textMuted text-sm">
                            <MapPin className="h-4 w-4 text-brand-gold flex-shrink-0" />
                            <span>{event.location}</span>
                        </div>
                    </div>

                    <p className="text-brand-textMuted leading-relaxed mb-6">
                        {event.fullDescription || event.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                            to="/events"
                            onClick={onClose}
                            className="flex-1 bg-brand-purple hover:bg-brand-purple/80 text-white font-bold py-3 px-6 rounded-full text-center transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-sm"
                        >
                            {t('home.events.viewOnEvents')} <ArrowRight className="h-4 w-4" />
                        </Link>
                        <button
                            onClick={onClose}
                            className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 px-6 rounded-full text-center transition-colors text-sm"
                        >
                            {t('home.events.close')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventModal;
