import React from 'react';
import { X, History, Trash2, ExternalLink, Download, Film, Sparkles } from 'lucide-react';
import { HistoryItem } from '../types';

interface DownloadHistoryModalProps {
  isOpen: boolean;
  history: HistoryItem[];
  onClose: () => void;
  onClearHistory: () => void;
  onSelectHistoryItem: (item: HistoryItem) => void;
}

export const DownloadHistoryModal: React.FC<DownloadHistoryModalProps> = ({
  isOpen,
  history,
  onClose,
  onClearHistory,
  onSelectHistoryItem,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl cosmic-card rounded-2xl overflow-hidden border border-sky-500/30 shadow-[0_0_50px_rgba(56,189,248,0.2)] flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-sky-500/20 bg-slate-950/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-sky-400" />
            <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
              Transmission History ({history.length})
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={onClearHistory}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-lg border border-rose-500/20 transition-colors"
                title="Clear local history"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close history dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
          {history.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2 font-mono text-xs">
              <Film className="w-10 h-10 text-slate-600 mx-auto" />
              <p>No recent video transmissions logged yet.</p>
              <p className="text-slate-500 text-[11px]">
                Analyzed videos will appear here during your session.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-sky-500/40 flex items-center justify-between gap-3 transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-14 h-10 object-cover rounded-lg flex-shrink-0 bg-slate-950"
                    />
                  ) : (
                    <div className="w-14 h-10 rounded-lg bg-sky-950/60 border border-sky-500/20 flex items-center justify-center flex-shrink-0 text-sky-400">
                      <Film className="w-5 h-5" />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-slate-400">
                      <span className="text-cyan-400">{item.platform}</span>
                      <span>•</span>
                      <span>{new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => {
                      onSelectHistoryItem(item);
                      onClose();
                    }}
                    className="p-2 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 hover:text-white border border-sky-500/30 text-xs font-mono transition-colors"
                    title="Load back into analyzer"
                  >
                    View
                  </button>
                  <a
                    href={item.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                    title="Download stream directly"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-sky-500/20 bg-slate-950/80 text-[11px] font-mono text-slate-500 flex items-center justify-between">
          <span>Encrypted Local Storage</span>
          <span>Station Pluto V2</span>
        </div>
      </div>
    </div>
  );
};
