import React from 'react';
import { Link2, Cpu, DownloadCloud, Sparkles, Orbit } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Paste',
    description: 'Paste your public video URL from any supported media network or streaming service.',
    icon: Link2,
    accent: 'from-sky-500/20 to-cyan-500/10',
    border: 'border-sky-500/30',
    iconColor: 'text-sky-400',
  },
  {
    step: '02',
    title: 'Analyze',
    description: 'The system analyzes the URL through the downloader API, extracting video streams and audio tracks.',
    icon: Cpu,
    accent: 'from-indigo-500/20 to-purple-500/10',
    border: 'border-indigo-500/30',
    iconColor: 'text-indigo-400',
  },
  {
    step: '03',
    title: 'Download',
    description: 'Choose the available quality and download the media directly to your device with zero latency.',
    icon: DownloadCloud,
    accent: 'from-cyan-500/20 to-emerald-500/10',
    border: 'border-cyan-500/30',
    iconColor: 'text-cyan-400',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-3">
          <Orbit className="w-3.5 h-3.5" />
          <span>Operational Protocol</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
          How The Transmission Works
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base">
          Three streamlined orbital steps to decode and download any public media stream.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {STEPS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className={`cosmic-card rounded-2xl p-6 sm:p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(56,189,248,0.15)] border ${item.border} group`}
            >
              {/* Subtle background gradient glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${item.accent} rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500`} />

              {/* Step indicator */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono font-bold tracking-widest text-slate-400 group-hover:text-cyan-300 transition-colors">
                  PHASE {item.step}
                </span>
                <div className={`w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center ${item.iconColor} group-hover:border-cyan-400/50 transition-colors shadow-inner`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-white mb-2 font-['Space_Grotesk']">
                {item.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>

              {/* Card Footer Telemetry */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Protocol Ready
                </span>
                <span className="text-slate-400">Node 0{idx + 1}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
