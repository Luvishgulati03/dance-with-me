import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Smartphone } from 'lucide-react';

const PhoneCarousel = ({ items, className = '' }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const intervalRef = useRef(null);

    const goTo = (index) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setActiveIndex(index);
        setTimeout(() => setIsTransitioning(false), 500);
    };

    const next = () => goTo((activeIndex + 1) % items.length);
    const prev = () => goTo((activeIndex - 1 + items.length) % items.length);

    // No auto-rotation — only clicks

    const getTransform = (index) => {
        const diff = index - activeIndex;
        const absDiff = Math.abs(diff);

        if (absDiff === 0) {
            return { transform: 'translateX(0) scale(1)', opacity: 1, zIndex: 10 };
        }
        if (absDiff === 1 || absDiff === items.length - 1) {
            const dir = diff > 0 || diff < -(items.length / 2) ? 1 : -1;
            return {
                transform: `translateX(${dir * 140}px) scale(0.8)`,
                opacity: 0.5,
                zIndex: 5,
            };
        }
        if (absDiff === 2 || absDiff === items.length - 2) {
            const dir = diff > 0 || diff < -(items.length / 2) ? 1 : -1;
            return {
                transform: `translateX(${dir * 250}px) scale(0.65)`,
                opacity: 0.25,
                zIndex: 2,
            };
        }
        return { transform: 'translateX(0) scale(0.5)', opacity: 0, zIndex: 0 };
    };

    return (
        <div className={`relative ${className}`}>
            {/* Phone stack */}
            <div className="relative h-[450px] sm:h-[520px] flex items-center justify-center">
                {items.map((item, idx) => {
                    const style = getTransform(idx);
                    return (
                        <div
                            key={idx}
                            className="absolute transition-all duration-500 ease-out cursor-pointer"
                            style={{
                                ...style,
                                pointerEvents: idx === activeIndex ? 'auto' : 'none',
                            }}
                            onClick={() => {
                                if (idx === activeIndex) next();
                            }}
                        >
                            <div className="w-48 sm:w-56">
                                <div className="bg-gray-900 rounded-[2.5rem] p-2.5 shadow-2xl border border-white/10">
                                    <div className="bg-gray-900 w-24 h-5 rounded-full mx-auto -mt-0.5 mb-1.5 relative z-10" />
                                    <div className="bg-gradient-to-b from-brand-gradientStart to-brand-dark rounded-[2rem] overflow-hidden aspect-[9/19] flex flex-col items-center justify-center border border-white/5 relative">
                                        {/* Placeholder screen */}
                                        <Smartphone className="h-6 w-6 text-white/20 mb-2" />
                                        <p className="text-white/30 text-[10px] font-medium text-center px-3 leading-tight">
                                            {item.label}
                                        </p>
                                        <p className="text-white/15 text-[8px] mt-1">Upload screenshot</p>
                                    </div>
                                    <div className="w-20 h-0.5 bg-white/30 rounded-full mx-auto mt-2" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Navigation arrows */}
            <div className="flex justify-center gap-4 mt-4">
                <button
                    onClick={prev}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 text-white transition-all duration-300 hover:scale-110"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Dots */}
                <div className="flex items-center gap-2">
                    {items.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goTo(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'bg-brand-gold w-6' : 'bg-white/20 w-2 hover:bg-white/40'
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={next}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 text-white transition-all duration-300 hover:scale-110"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>

            {/* Feature label */}
            <div className="text-center mt-6">
                <p className="text-brand-gold text-sm font-bold uppercase tracking-wider animate-fade-in" key={activeIndex}>
                    {items[activeIndex]?.label}
                </p>
            </div>
        </div>
    );
};

export default PhoneCarousel;
