import React, { useState } from 'react';
import {
  Download,
  Play,
  Music,
  Video,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Share2,
  RefreshCw,
  Eye,
  Film,
} from 'lucide-react';
import { MediaInfo, MediaQuality } from '../types';

interface ResultCardProps {
  mediaInfo: MediaInfo;
  onReset: () => void;
  onPreviewVideo: (url: string, title: string) => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  mediaInfo,
  onReset,
  onPreviewVideo,
}) => {
  const [selectedQuality, setSelectedQuality] = useState<MediaQuality | null>(
    mediaInfo.qualities && mediaInfo.qualities.length > 0
      ? mediaInfo.qualities[mediaInfo.qualities.length - 1]
      : null
  );
  const [copiedLink, setCopiedLink] = useState(false);
  const [imageError, setImageError] = useState(false);

  const activeDownloadUrl = selectedQuality ? selectedQuality.url : mediaInfo.videoUrl;

  const handleDownloadVideo = () => {
    if (!activeDownloadUrl) return;
    window.open(activeDownloadUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadAudio = () => {
    if (!mediaInfo.audioUrl) return;
    window.open(mediaInfo.audioUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = async () => {
    const targetUrl = activeDownloadUrl || mediaInfo.videoUrl;
    if (!targetUrl) return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(targetUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = targetUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    } catch {
      // Fallback
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const handleThumbnailPlay = () => {
    const streamUrl = activeDownloadUrl || mediaInfo.videoUrl;
    if (streamUrl) {
      onPreviewVideo(streamUrl, mediaInfo.title);
    }
  };

  return (
    <div
      id="result-section"
      className="w-full max-w-3xl mx-auto mt-8 cosmic-card rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_rgba(56,189,248,0.12)] border border-sky-500/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-6"
    >
      {/* Card Header Telemetry */}
      <div className="px-5 py-3 border-b border-sky-500/15 bg-gradient-to-r from-sky-950/40 via-indigo-950/20 to-purple-950/30 flex items-center justify-between text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300 font-semibold uppercase tracking-wider">
            Signal Decoded
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400 font-medium">{mediaInfo.platform || 'Cosmic Media'}</span>
        </div>
        <button
          id="btn-analyze-another"
          onClick={onReset}
          className="flex items-center gap-1 text-slate-400 hover:text-sky-300 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>New Analysis</span>
        </button>
      </div>

      <div className="p-5 sm:p-7 space-y-6">
        {/* Media Preview Container */}
        <div className="relative group rounded-xl overflow-hidden bg-slate-950/80 border border-sky-500/20 aspect-video max-h-[360px] flex items-center justify-center">
          {mediaInfo.thumbnail && !imageError ? (
            <img
              src={mediaInfo.thumbnail}
              alt={mediaInfo.title || 'Video preview thumbnail'}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-sky-950/30 to-indigo-950 text-slate-500 gap-3 p-6 text-center">
              <Film className="w-14 h-14 text-sky-400/40" />
              <p className="text-xs font-mono text-slate-400">Cosmic Video Stream Ready</p>
            </div>
          )}

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Platform Watermark Badge on Thumbnail */}
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>{mediaInfo.platform || 'Online Video'}</span>
          </div>

          {/* Interactive Play Preview Button */}
          <button
            id="btn-preview-video"
            onClick={handleThumbnailPlay}
            className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer focus:outline-none"
            aria-label="Play video preview"
          >
            <div className="w-16 h-16 rounded-full bg-cyan-500/90 hover:bg-cyan-400 text-black flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.8)] group-hover:scale-110 transition-all duration-300">
              <Play className="w-7 h-7 fill-current translate-x-0.5" />
            </div>
          </button>

          {/* Direct Stream Preview Pill */}
          <div className="absolute bottom-3 right-3 z-10">
            <button
              onClick={handleThumbnailPlay}
              className="px-2.5 py-1 rounded-md bg-black/70 hover:bg-black/90 backdrop-blur-md border border-cyan-400/30 text-[11px] font-mono text-cyan-300 hover:text-cyan-200 flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Stream</span>
            </button>
          </div>
        </div>

        {/* Video Metadata */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <h3
              id="result-video-title"
              className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug line-clamp-2"
              title={mediaInfo.title}
            >
              {mediaInfo.title || 'Extracted Social Video Stream'}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Platform:</span>
              <span className="px-2 py-0.5 rounded bg-sky-950/60 border border-sky-500/30 text-sky-300 font-medium">
                {mediaInfo.platform || 'Direct'}
              </span>
            </div>
            {selectedQuality && (
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">Selected Resolution:</span>
                <span className="text-cyan-300 font-semibold">{selectedQuality.quality}</span>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Quality Selector */}
        {mediaInfo.qualities && mediaInfo.qualities.length > 0 && (
          <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 tracking-wider uppercase flex items-center gap-1.5 font-mono">
                <Video className="w-3.5 h-3.5 text-sky-400" />
                Available Quality Streams
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                {mediaInfo.qualities.length} option{mediaInfo.qualities.length > 1 ? 's' : ''} detected
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {mediaInfo.qualities.map((item, idx) => {
                const isSelected = selectedQuality?.url === item.url;
                return (
                  <button
                    key={`${item.quality}-${idx}`}
                    onClick={() => setSelectedQuality(item)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-sky-500/20 border-sky-400 text-white shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                        : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:bg-slate-800/80 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Video className={`w-3.5 h-3.5 ${isSelected ? 'text-sky-400' : 'text-slate-500'}`} />
                      <span className="font-mono font-semibold">{item.quality}</span>
                    </div>
                    {isSelected ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
                    ) : (
                      <Download className="w-3 h-3 text-slate-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Primary Download Actions */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row gap-3">
          {/* Main Video Download Button */}
          <button
            id="btn-download-video"
            onClick={handleDownloadVideo}
            className="flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-indigo-600 hover:from-sky-400 hover:via-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] active:scale-[0.99] transition-all duration-200 cursor-pointer"
          >
            <Download className="w-5 h-5" />
            <span>
              Download Video {selectedQuality ? `(${selectedQuality.quality})` : ''}
            </span>
          </button>

          {/* Audio Download Button (Conditional if audioUrl exists) */}
          {mediaInfo.audioUrl && (
            <button
              id="btn-download-audio"
              onClick={handleDownloadAudio}
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 border border-purple-500/40 hover:border-purple-400 font-semibold text-sm shadow-[0_0_15px_rgba(168,85,247,0.2)] active:scale-[0.99] transition-all duration-200 cursor-pointer"
            >
              <Music className="w-4 h-4 text-purple-400" />
              <span>Download Audio (MP3)</span>
            </button>
          )}

          {/* Copy Direct Link Button */}
          <button
            id="btn-copy-direct-link"
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 hover:border-slate-600 text-sm font-medium transition-colors cursor-pointer"
            title="Copy download link"
            aria-label="Copy direct download link"
          >
            {copiedLink ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-mono text-xs">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-400" />
                <span className="hidden sm:inline text-xs font-mono">Copy Link</span>
              </>
            )}
          </button>
        </div>

        {/* Transmission Notes & Direct Link Notice */}
        <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-900 font-mono">
          <span className="flex items-center gap-1.5">
            <ExternalLink className="w-3 h-3 text-sky-400" />
            Direct stream extracted from source server
          </span>
          <span className="text-slate-500 hidden sm:inline">Pluto Node 09 Verified</span>
        </div>
      </div>
    </div>
  );
};
