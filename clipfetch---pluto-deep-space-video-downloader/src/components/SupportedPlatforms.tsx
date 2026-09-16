import React from 'react';
import {
  Video,
  Film,
  Music,
  Zap,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Gauge,
  Radio,
  Share2,
} from 'lucide-react';

interface PlatformItem {
  name: string;
  category: string;
  resolutions: string;
  audioSupported: boolean;
  color: string;
}

const PLATFORMS: PlatformItem[] = [
  {
    name: 'YouTube',
    category: 'Video & Shorts',
    resolutions: '1080p / 720p / 480p / 360p',
    audioSupported: true,
    color: 'from-red-500/20 to-rose-500/10 border-red-500/30 text-red-400',
  },
  {
    name: 'TikTok',
    category: 'Short Video & Sound',
    resolutions: 'Full HD Original Quality',
    audioSupported: true,
    color: 'from-cyan-500/20 to-sky-500/10 border-cyan-500/30 text-cyan-400',
  },
  {
    name: 'Instagram',
    category: 'Reels, Posts & Clips',
    resolutions: 'Direct MP4 Stream',
    audioSupported: false,
    color: 'from-pink-500/20 to-purple-500/10 border-pink-500/30 text-pink-400',
  },
  {
    name: 'Facebook',
    category: 'Watch & Public Clips',
    resolutions: 'HD & SD Bitrates',
    audioSupported: false,
    color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400',
  },
  {
    name: 'X (Twitter)',
    category: 'Video Posts & Media',
    resolutions: 'Multiple MP4 Bitrates',
    audioSupported: false,
    color: 'from-slate-400/20 to-slate-600/10 border-slate-500/30 text-slate-300',
  },
  {
    name: 'Reddit',
    category: 'v.redd.it Public Streams',
    resolutions: 'Extracted Resolution Options',
    audioSupported: true,
    color: 'from-orange-500/20 to-amber-500/10 border-orange-500/30 text-orange-400',
  },
];

const HIGHLIGHTS = [
  {
    icon: Gauge,
    title: 'High-Velocity Analysis',
    description: 'Direct server transmission retrieves available resolutions and audio channels in under 2 seconds.',
  },
  {
    icon: Film,
    title: 'Original Source Quality',
    description: 'Zero re-compression. Downloads are served directly from the platform origin servers.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy & Discretion',
    description: 'No telemetry logging or video archiving. Your requests are processed instantaneously.',
  },
  {
    icon: Smartphone,
    title: 'Universal Hardware Access',
    description: 'Designed natively for smartphones, tablets, handheld consoles, and desktop workstations.',
  },
];

export const SupportedPlatforms: React.FC = () => {
  return (
    <section id="platforms" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-500/30 text-sky-300 text-xs font-mono mb-3">
          <Radio className="w-3.5 h-3.5" />
          <span>Orbital Compatibility Spectrum</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
          Supported Media Platforms
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base">
          ClipFetch probes public media streams across the most prevalent social video ecosystems.
        </p>
      </div>

      {/* Platform Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
        {PLATFORMS.map((platform) => (
          <div
            key={platform.name}
            className={`cosmic-card rounded-2xl p-5 border transition-all duration-300 hover:border-sky-400/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.12)] bg-gradient-to-br ${platform.color}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <Video className="w-5 h-5" />
                <h3 className="font-bold text-white text-base font-['Space_Grotesk']">
                  {platform.name}
                </h3>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/40 border border-white/10 text-slate-300">
                {platform.category}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300 font-mono mt-4 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Streams:</span>
                <span className="text-white font-medium">{platform.resolutions}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Audio Track:</span>
                <span className={platform.audioSupported ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>
                  {platform.audioSupported ? 'Available (MP3)' : 'Source dependent'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Platform Architecture Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-sky-500/15">
        {HIGHLIGHTS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-sky-500/30 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-sky-950/60 border border-sky-500/30 text-sky-400 flex items-center justify-center mb-3">
                <Icon className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5 font-['Space_Grotesk']">
                {item.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
