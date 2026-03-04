import { useState, useEffect } from 'react';
import { Image, X, Upload } from 'lucide-react';

const MediaPicker = ({ value, onChange, accept = 'image', label = 'Image' }) => {
    const [showPicker, setShowPicker] = useState(false);
    const [mediaItems, setMediaItems] = useState([]);
    const token = localStorage.getItem('admin_token');

    const fetchMedia = () => {
        fetch('/api/upload/media').then(r => r.json()).then(items => {
            // Filter by type if accept is specific
            if (accept === 'image') setMediaItems(items.filter(m => m.type === 'image'));
            else if (accept === 'video') setMediaItems(items.filter(m => m.type === 'video'));
            else setMediaItems(items);
        }).catch(console.error);
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
        const data = await res.json();
        onChange(data.url);
    };

    const openPicker = () => {
        fetchMedia();
        setShowPicker(true);
    };

    return (
        <div>
            <label className="block text-xs text-brand-textMuted mb-1">{label}</label>
            <div className="flex flex-wrap gap-2 items-center">
                {/* Upload button */}
                <label className="cursor-pointer flex items-center gap-1 bg-brand-purple/80 hover:bg-brand-purple text-white text-xs font-medium py-1.5 px-3 rounded-lg transition-colors">
                    <Upload className="h-3 w-3" /> Upload
                    <input type="file" accept={accept === 'video' ? 'video/*' : 'image/*'} onChange={handleUpload} className="hidden" />
                </label>
                {/* Media library button */}
                <button type="button" onClick={openPicker} className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white text-xs font-medium py-1.5 px-3 rounded-lg transition-colors">
                    <Image className="h-3 w-3" /> Media Library
                </button>
                {/* URL input */}
                <input
                    value={value || ''}
                    onChange={e => onChange(e.target.value)}
                    placeholder="or paste URL..."
                    className="flex-1 min-w-[120px] bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-brand-purple"
                />
                {/* Preview */}
                {value && (
                    <div className="relative">
                        {accept === 'video' ? (
                            <video src={value} className="h-10 w-10 rounded-lg object-cover" muted />
                        ) : (
                            <img src={value} className="h-10 w-10 rounded-lg object-cover" onError={e => e.target.style.display = 'none'} />
                        )}
                        <button type="button" onClick={() => onChange('')} className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5">
                            <X className="h-2.5 w-2.5 text-white" />
                        </button>
                    </div>
                )}
            </div>

            {/* Media Library Modal */}
            {showPicker && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center px-4" onClick={() => setShowPicker(false)}>
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                    <div className="relative bg-brand-dark border border-white/10 rounded-2xl max-w-2xl w-full max-h-[70vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-white">Choose from Media Library</h3>
                            <button onClick={() => setShowPicker(false)} className="text-brand-textMuted hover:text-white"><X className="h-5 w-5" /></button>
                        </div>
                        {mediaItems.length === 0 ? (
                            <p className="text-brand-textMuted text-sm text-center py-8">No {accept} items in the media library yet.</p>
                        ) : (
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                {mediaItems.map(m => (
                                    <button
                                        key={m.id}
                                        onClick={() => { onChange(m.url); setShowPicker(false); }}
                                        className="group relative h-24 rounded-xl overflow-hidden border-2 border-transparent hover:border-brand-gold transition-colors"
                                    >
                                        {m.type === 'image' ? (
                                            <img src={m.url} className="w-full h-full object-cover" onError={e => e.target.style.display = 'none'} />
                                        ) : (
                                            <video src={m.url} className="w-full h-full object-cover" muted />
                                        )}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                            <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">{m.context || 'Select'}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediaPicker;
