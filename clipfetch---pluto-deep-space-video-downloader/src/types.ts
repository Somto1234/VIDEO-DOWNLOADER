export interface MediaQuality {
  quality: string;
  url: string;
}

export interface MediaInfo {
  title: string;
  platform: string;
  videoUrl: string;
  audioUrl?: string;
  thumbnail?: string;
  qualities?: MediaQuality[];
}

export interface ApiResponse {
  success: boolean;
  mediaInfo?: MediaInfo;
  message?: string;
  error?: string;
  platform?: string;
}

export interface HistoryItem {
  id: string;
  title: string;
  platform: string;
  thumbnail?: string;
  videoUrl: string;
  audioUrl?: string;
  date: number;
}
