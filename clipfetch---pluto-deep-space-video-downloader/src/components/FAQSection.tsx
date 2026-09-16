import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'Is ClipFetch completely free to use?',
    answer:
      'Yes. ClipFetch is an open orbital media utility. There are no subscriptions, paywalls, or accounts needed. You can analyze and download public media links at any time.',
  },
  {
    question: 'Are there any daily download limits or caps?',
    answer:
      'No artificial limits are imposed by our relay system. You may analyze as many videos as you need. However, standard network rate-limiting protects the servers from automated abuse.',
  },
  {
    question: 'Where do downloaded videos save on my device?',
    answer:
      'Downloaded files are saved directly to your default browser directory (typically the "Downloads" folder on Windows, Mac, Android, and iOS Files app).',
  },
  {
    question: 'Can I extract audio or MP3 tracks separately?',
    answer:
      'Whenever the origin platform exposes a detached audio stream, ClipFetch highlights a dedicated "Download Audio (MP3)" button alongside the video resolutions.',
  },
  {
    question: 'Why does an analysis request return "No media found"?',
    answer:
      'This occurs if the video is set to private, restricted by geographical licensing, age-gated, or was removed by its creator. Ensure the URL is publicly accessible in a standard browser tab.',
  },
  {
    question: 'Does ClipFetch store or host any videos?',
    answer:
      'No. ClipFetch operates purely as a transient deep-space relay. No video files or media assets are stored on our servers; downloads stream directly from origin content delivery networks.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-10">
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Knowledge Relay</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base">
          Everything you need to know about navigating the ClipFetch Pluto downloader.
        </p>
      </div>

      <div className="space-y-3.5">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.question}
              className="cosmic-card rounded-2xl border border-sky-500/15 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-white text-sm sm:text-base font-['Space_Grotesk']">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-sky-400 flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-cyan-300' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 animate-in fade-in duration-200">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
