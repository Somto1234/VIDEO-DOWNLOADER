import React, { useState } from 'react';
import { Orbit, Menu, X, History, Sparkles, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenHistory: () => void;
  historyCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenHistory, historyCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sky-500/10 bg-[#070913]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600/30 via-indigo-600/20 to-purple-600/30 border border-sky-400/30 shadow-[0_0_15px_rgba(56,189,248,0.2)] group-hover:border-sky-400/60 transition-all duration-300">
            <Orbit className="w-5 h-5 text-sky-400 group-hover:rotate-45 transition-transform duration-500" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white font-['Space_Grotesk']">
                Clip<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-300">Fetch</span>
              </span>
              <span className="hidden sm:inline-flex text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-sky-950/70 border border-sky-500/30 text-sky-300">
                Pluto V2
              </span>
            </div>
            <span className="text-[10px] text-slate-400 tracking-wider font-mono uppercase hidden xs:block">
              Deep Space Media Terminal
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('platforms')}
            className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            Supported Platforms
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            FAQ
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Recent Transmissions History Button */}
          <button
            id="nav-history-btn"
            onClick={onOpenHistory}
            className="relative flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/60 hover:border-sky-500/40 rounded-xl transition-all"
            title="Recent Media Transmissions"
            aria-label="Download history"
          >
            <History className="w-4 h-4 text-sky-400" />
            <span className="hidden sm:inline">Transmissions</span>
            {historyCount > 0 && (
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
                {historyCount}
              </span>
            )}
          </button>

          {/* Secure Relay Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Encrypted Relay</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 border border-slate-800 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-sky-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-sky-500/20 bg-[#0a0f24]/95 backdrop-blur-2xl px-4 pt-3 pb-5 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-sky-500/10 hover:text-sky-300 transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-sky-500/10 hover:text-sky-300 transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('platforms')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-sky-500/10 hover:text-sky-300 transition-colors"
          >
            Supported Platforms
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-sky-500/10 hover:text-sky-300 transition-colors"
          >
            FAQ
          </button>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              Pluto Sub-Station 09
            </span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              Online
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
