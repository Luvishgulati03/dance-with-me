import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/10 py-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left focus:outline-none"
            >
                <span className="text-lg font-semibold text-white">{question}</span>
                {isOpen ? (
                    <ChevronUp className="h-6 w-6 text-brand-gold" />
                ) : (
                    <ChevronDown className="h-6 w-6 text-brand-gold" />
                )}
            </button>
            <div
                className={`mt-4 text-brand-textMuted leading-relaxed overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                {answer}
            </div>
        </div>
    );
}

const FAQ = () => {
    const { t } = useLanguage();
    const faqs = t('faq.items');

    return (
        <div className="bg-brand-darker min-h-screen py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-white mb-4">{t('faq.title')}</h1>
                    <p className="text-xl text-brand-textMuted">{t('faq.subtitle')}</p>
                </div>

                <div className="bg-brand-dark rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl">
                    {Array.isArray(faqs) && faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
