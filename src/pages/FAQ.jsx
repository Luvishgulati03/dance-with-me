import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
    const faqs = [
        {
            question: "What is 1 Million Dancers?",
            answer: "We are a global community connecting dancers, artists, DJs, and organizers in one unified platform. Our app lets you learn, perform, host events, and participate in challenges."
        },
        {
            question: "Are there different plans available?",
            answer: "Yes, we offer three plans: Stage (for beginners), Spotlight (for intermediate dancers), and Star (for the ultimate experience). You can find more details on our Plans page."
        },
        {
            question: "How do I become an Artist or DJ on the platform?",
            answer: "You can sign up as a specific Persona. Artists can conduct live or recorded classes, while DJs can create and sell playlists. Select your persona during sign up or upgrade your account settings later."
        },
        {
            question: "How do I contact support?",
            answer: "If you have any issues or questions, you can reach out to us through our social media channels linked in the footer, or via the support section inside the app."
        }
    ];

    return (
        <div className="bg-brand-darker min-h-screen py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-white mb-4">FAQ</h1>
                    <p className="text-xl text-brand-textMuted">Frequently asked questions</p>
                </div>

                <div className="bg-brand-dark rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
