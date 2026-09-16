/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { SpaceBackground } from "./components/SpaceBackground";
import { Navbar } from "./components/Navbar";
import { HeroDownloader } from "./components/HeroDownloader";
import { ResultCard } from "./components/ResultCard";
import { HowItWorks } from "./components/HowItWorks";
import { SupportedPlatforms } from "./components/SupportedPlatforms";
import { FAQSection } from "./components/FAQSection";
import { Footer } from "./components/Footer";
import { VideoPreviewModal } from "./components/VideoPreviewModal";
import { DownloadHistoryModal } from "./components/DownloadHistoryModal";
import { fetchVideo } from "./services/downloaderApi";
import { MediaInfo, HistoryItem } from "./types";

const STORAGE_KEY = "clipfetch_pluto_transmissions_v1";

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mediaInfo, setMediaInfo] = useState<MediaInfo | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [previewModal, setPreviewModal] = useState<{
    isOpen: boolean;
    videoUrl: string;
    title: string;
  }>({
    isOpen: false,
    videoUrl: "",
    title: "",
  });

  // Persist history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("Failed to persist history to localStorage:", e);
      }
    }
  }, [history]);

  const handleAnalyze = async (url: string) => {
    if (isLoading) return;
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await fetchVideo(url);
      setMediaInfo(result);

      // Add to local history list
      const newItem: HistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        title: result.title || "Extracted Social Video Stream",
        platform: result.platform || "Social Video",
        thumbnail: result.thumbnail,
        videoUrl: result.videoUrl,
        audioUrl: result.audioUrl,
        date: Date.now(),
      };

      setHistory((prev) =>
        [
          newItem,
          ...prev.filter((item) => item.videoUrl !== result.videoUrl),
        ].slice(0, 20),
      );

      // Smooth scroll down to result card
      setTimeout(() => {
        const resultElem = document.getElementById("result-section");
        if (resultElem) {
          resultElem.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }, 150);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("We couldn't process this URL. Please try again.");
      }
      setMediaInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMediaInfo(null);
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignored
    }
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    // Reconstruct mediaInfo from history
    setMediaInfo({
      title: item.title,
      platform: item.platform,
      videoUrl: item.videoUrl,
      audioUrl: item.audioUrl,
      thumbnail: item.thumbnail,
      qualities: [{ quality: "Original Stream", url: item.videoUrl }],
    });
    setTimeout(() => {
      const resultElem = document.getElementById("result-section");
      if (resultElem) {
        resultElem.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handlePreviewVideo = (videoUrl: string, title: string) => {
    setPreviewModal({
      isOpen: true,
      videoUrl,
      title,
    });
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-[#070913] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Deep Space Background with Stars, Nebulae, and Pluto */}
      <SpaceBackground />

      {/* Futuristic Navbar */}
      <Navbar
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        {/* Hero Section & URL Input */}
        <HeroDownloader
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
          errorMessage={errorMessage}
          onClearError={() => setErrorMessage(null)}
        />

        {/* Result Card (Renders smoothly when media is decoded) */}
        {mediaInfo && (
          <div className="px-4 sm:px-6 lg:px-8 mb-16">
            <ResultCard
              mediaInfo={mediaInfo}
              onReset={handleReset}
              onPreviewVideo={handlePreviewVideo}
            />
          </div>
        )}

        {/* How It Works (3 Steps) */}
        <HowItWorks />

        {/* Supported Platforms & High-Speed Highlights */}
        <SupportedPlatforms />

        {/* Knowledge Base & FAQs */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <VideoPreviewModal
        isOpen={previewModal.isOpen}
        videoUrl={previewModal.videoUrl}
        title={previewModal.title}
        onClose={() =>
          setPreviewModal({ isOpen: false, videoUrl: "", title: "" })
        }
      />

      <DownloadHistoryModal
        isOpen={isHistoryOpen}
        history={history}
        onClose={() => setIsHistoryOpen(false)}
        onClearHistory={handleClearHistory}
        onSelectHistoryItem={handleSelectHistoryItem}
      />
    </div>
  );
}
