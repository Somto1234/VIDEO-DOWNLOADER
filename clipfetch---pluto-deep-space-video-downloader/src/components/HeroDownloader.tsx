import React, { useState, useEffect } from 'react';
import {
  Link2,
  ClipboardPaste,
  Search,
  Loader2,
  X,
  AlertCircle,
  Sparkles,
  Orbit,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { isValidUrl, detectPlatformFromUrl } from '../services/downloaderApi';

interface HeroDownloaderProps {
  onAnalyze: (url: string) => Promise<void>;
  isLoading: boolean;
  errorMessage: string | null;
  onClearError: () => void;
}

const SUPPORTED_PILLS = [
  { name: 'YouTube', id: 'youtube' },
  { name: 'TikTok', id: 'tiktok' },
  { name: 'Instagram', id: 'instagram' },
  { name: 'Facebook', id: 'facebook' },
  { name: 'X / Twitter', id: 'x' },
  { name: 'Reddit', id: 'reddit' },
];

export const HeroDownloader: React.FC<HeroDownloaderProps> = ({
  onAnalyze,
  isLoading,
  errorMessage,
  onClearError,
}) => {
  const [url, setUrl] = useState('');
  const [clientValidationError, setClientValidationError] = useState<string | null>(null);

  const detectedPlatform = url ? detectPlatformFromUrl(url) : null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (clientValidationError) setClientValidationError(null);
    if (errorMessage) onClearError();
  };

  const handlePaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrl(text.trim());
          if (clientValidationError) setClientValidationError(null);
          if (errorMessage) onClearError();
        }
      } else {
        const inputElem = document.getElementById('video-url-input') as HTMLInputElement;
        if (inputElem) inputElem.focus();
      }
    } catch {
      const inputElem = document.getElementById('video-url-input') as HTMLInputElement;
      if (inputElem) inputElem.focus();
    }
  };

  const handleClear = () => {
    setUrl('');
    setClientValidationError(null);
    onClearError();
    const inputElem = document.getElementById('video-url-input') as HTMLInputElement;
    if (inputElem) inputElem.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    const trimmed = url.trim();
    if (!trimmed || !isValidUrl(trimmed)) {
      setClientValidationError('Please enter a valid video URL.');
      return;
    }

    setClientValidationError(null);
    await onAnalyze(trimmed);
  };

  const activeError = clientValidationError || errorMessage;

  return (
    <section className="relative pt-12 pb-14 sm:pt-20 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      {/* Planetary Orbit Telemetry Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950/60 border border-sky-500/25 backdrop-blur-md mb-6 animate-in fade-in duration-700">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
        </span>
        <span className="text-xs font-mono text-cyan-300 font-medium tracking-wide">
          Kuiper Belt Relay Station • Sector 09
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15] font-['Space_Grotesk']">
        Download Videos From Across The{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 drop-shadow-[0_0_35px_rgba(56,189,248,0.4)]">
          Digital Universe
        </span>
      </h1>

      {/* Supporting Subtext */}
      <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
        Paste a public video URL and retrieve available media options in seconds.
      </p>

      {/* Main Downloader Form Card */}
      <div className="mt-8 sm:mt-12 max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="cosmic-card rounded-2xl p-3 sm:p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(56,189,248,0.12)] border border-sky-500/25 transition-all duration-300 relative group"
        >
          {/* Subtle Ambient Glowing Border on hover */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition-opacity duration-500 -z-10" />

          <div className="flex flex-col gap-3">
            {/* Input Row */}
            <div className="relative flex items-center bg-slate-950/85 rounded-xl border border-sky-500/20 px-3.5 py-2.5 sm:py-3 transition-all cosmic-input-glow focus-within:border-cyan-400/80">
              <Link2 className="w-5 h-5 text-sky-400 flex-shrink-0 mr-2.5" />

              <input
                id="video-url-input"
                type="url"
                value={url}
                onChange={handleInputChange}
                placeholder="Paste video URL here (YouTube, TikTok, Instagram, X, etc.)..."
                disabled={isLoading}
                autoComplete="off"
                spellCheck="false"
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none font-normal"
              />

              {/* Clear Button if text present */}
              {url && !isLoading && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors mr-1 cursor-pointer"
                  title="Clear input"
                  aria-label="Clear URL input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Paste Button */}
              <button
                type="button"
                id="btn-paste-url"
                onClick={handlePaste}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-950/70 hover:bg-sky-900/80 text-sky-300 hover:text-white border border-sky-500/30 text-xs font-mono font-medium transition-all flex-shrink-0 cursor-pointer disabled:opacity-50"
                title="Paste from clipboard"
              >
                <ClipboardPaste className="w-3.5 h-3.5" />
                <span>Paste</span>
              </button>
            </div>

            {/* Detected Platform Hint */}
            {detectedPlatform && detectedPlatform !== 'Media Stream' && (
              <div className="flex items-center justify-between px-2 text-xs font-mono text-cyan-300 animate-in fade-in duration-200">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Target Platform Identified: <strong className="text-white">{detectedPlatform}</strong>
                </span>
                <span className="text-slate-400 text-[11px]">Ready for transmission</span>
              </div>
            )}

            {/* Analyze Button */}
            <button
              id="btn-analyze-video"
              type="submit"
              disabled={isLoading || !url.trim()}
              className="w-full relative overflow-hidden flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-600 hover:from-sky-400 hover:via-cyan-300 hover:to-indigo-500 text-slate-950 font-bold text-base tracking-wide shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  {/* Planetary Orbital Loader */}
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-950 shadow-[0_0_6px_#000]" />
                    <span className="absolute inset-0 rounded-full border border-slate-950/80 border-t-transparent animate-spin" />
                    <span className="absolute -inset-1 rounded-full border border-slate-950/40 border-b-transparent animate-spin duration-1000" />
                  </div>
                  <span className="font-semibold tracking-wider font-mono">Analyzing transmission...</span>
                </div>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Analyze</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Error Notification Alert */}
        {activeError && (
          <div
            id="downloader-error-banner"
            className="mt-4 p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-sm flex items-start gap-3 text-left animate-in fade-in duration-300 shadow-[0_0_25px_rgba(244,63,94,0.15)]"
          >
            <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-white">Transmission Interrupted</p>
              <p className="text-rose-200 text-xs sm:text-sm mt-0.5">{activeError}</p>
            </div>
            <button
              onClick={() => {
                setClientValidationError(null);
                onClearError();
              }}
              className="p-1 rounded text-rose-400 hover:text-white transition-colors"
              aria-label="Dismiss error message"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Supported Platforms Filter Chips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-slate-400">
          <span className="text-slate-400 mr-1 flex items-center gap-1">
            <Orbit className="w-3.5 h-3.5 text-sky-400" /> Supported:
          </span>
          {SUPPORTED_PILLS.map((platform) => {
            const isMatch = detectedPlatform?.toLowerCase().includes(platform.id);
            return (
              <span
                key={platform.id}
                className={`px-2.5 py-1 rounded-lg border transition-all ${
                  isMatch
                    ? 'bg-sky-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_10px_rgba(56,189,248,0.3)]'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300'
                }`}
              >
                {platform.name}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
};
