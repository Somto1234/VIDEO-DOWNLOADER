import React from 'react';
import { X, Download, ExternalLink, Film, ShieldCheck } from 'lucide-react';

interface VideoPreviewModalProps {
  isOpen: boolean;
  videoUrl: string;
  title: string;
  onClose: () => void;
}

export const VideoPreviewModal: React.FC<VideoPreviewModalProps> = ({
  isOpen,
  videoUrl,
  title,
  onClose,
}) => {
  if (!isOpen || !videoUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl cosmic-card rounded-2xl overflow-hidden border border-sky-500/30 shadow-[0_0_50px_rgba(56,189,248,0.25)] flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-sky-500/20 bg-slate-950/70 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0 pr-4">
            <Film className="w-4 h-4 text-sky-400 flex-shrink-0" />
            <h3 className="text-sm font-semibold text-white truncate font-['Space_Grotesk']">
              {title || 'Cosmic Media Stream'}
            </h3>
          </div>
          <button
            id="close-preview-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Body */}
        <div className="relative bg-black flex items-center justify-center aspect-video max-h-[65vh]">
          <video
            src={videoUrl}
            controls
            autoPlay
            playsInline
            className="w-full h-full max-h-[65vh] object-contain"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-sky-500/20 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted Stream Relay</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in New Tab</span>
            </a>
            <button
              onClick={() => window.open(videoUrl, '_blank', 'noopener,noreferrer')}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Media</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
