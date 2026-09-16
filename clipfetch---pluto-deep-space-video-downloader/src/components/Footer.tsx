import React, { useState } from 'react';
import { Orbit, ShieldCheck, Heart, Radio, Sparkles, X } from 'lucide-react';

interface FooterProps {
  onOpenPrivacyModal?: () => void;
  onOpenTermsModal?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const [activeDialog, setActiveDialog] = useState<'privacy' | 'terms' | 'contact' | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-sky-500/15 bg-[#050711]/90 backdrop-blur-xl relative z-10 text-slate-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                <Orbit className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white font-['Space_Grotesk'] tracking-wide">
                Clip<span className="text-cyan-400">Fetch</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm font-sans max-w-sm leading-relaxed">
              Fast media downloads across the digital universe.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
              <span>Transmitting from Kuiper Belt Orbital Grid • Pluto Prime</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h5 className="text-white font-bold tracking-wider uppercase text-xs mb-3 font-['Space_Grotesk']">
              Navigation
            </h5>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Home Downloader
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('platforms')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Supported Platforms
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Knowledge Base (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & Governance */}
          <div>
            <h5 className="text-white font-bold tracking-wider uppercase text-xs mb-3 font-['Space_Grotesk']">
              Legal & Support
            </h5>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveDialog('privacy')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveDialog('terms')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveDialog('contact')}
                  className="hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Contact Station Control
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Responsible-Use Notice & Disclaimer */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-[11px] text-slate-400 max-w-2xl">
            <strong>Responsible Use Notice:</strong> Only download content you have permission to use and follow the terms of the source platform. ClipFetch does not host or replicate proprietary media files.
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <span>Station OS 2.4</span>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              All Systems Nominal
            </span>
          </div>
        </div>
      </div>

      {/* Simple Information Dialog Modals (Privacy / Terms / Contact) */}
      {activeDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md cosmic-card rounded-2xl p-6 border border-sky-500/30 text-left font-sans shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-sky-500/20 mb-4">
              <h4 className="text-base font-bold text-white font-['Space_Grotesk']">
                {activeDialog === 'privacy' && 'Privacy Policy'}
                {activeDialog === 'terms' && 'Terms of Service'}
                {activeDialog === 'contact' && 'Contact Station Relay'}
              </h4>
              <button
                onClick={() => setActiveDialog(null)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-300 space-y-2.5 leading-relaxed font-normal">
              {activeDialog === 'privacy' && (
                <>
                  <p>ClipFetch is committed to user privacy. We do not maintain logs of user IPs, video URLs, or download histories on remote servers.</p>
                  <p>All temporary media requests are processed transiently through encrypted connections directly to content delivery points.</p>
                </>
              )}
              {activeDialog === 'terms' && (
                <>
                  <p>By using ClipFetch, you agree to access only media that you are authorized to download, stream, or retain for personal archival use.</p>
                  <p>You agree to adhere to the Terms of Service of origin platforms and applicable copyright laws.</p>
                </>
              )}
              {activeDialog === 'contact' && (
                <>
                  <p>Need support or experiencing telemetry anomalies? Reach our operations team via:</p>
                  <p className="font-mono text-cyan-300 bg-slate-900/80 p-2.5 rounded-lg border border-sky-500/20">
                    relay@clipfetch.space
                  </p>
                  <p className="text-[11px] text-slate-400">Response time: standard sub-light speed within 24 hours.</p>
                </>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 text-right">
              <button
                onClick={() => setActiveDialog(null)}
                className="px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
