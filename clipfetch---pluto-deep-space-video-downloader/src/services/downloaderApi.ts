import { MediaInfo, ApiResponse } from '../types';

export const PRIMARY_API_ENDPOINT = 'https://ahm7xmakki.com/api/alldl';
export const PROXY_API_ENDPOINT = '/api/alldl';

/**
 * Validates whether the given string is a valid HTTP or HTTPS URL.
 */
export function isValidUrl(urlString: string): boolean {
  if (!urlString || typeof urlString !== 'string') return false;
  const trimmed = urlString.trim();
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Detects the likely social media platform from a URL for preview / guidance.
 */
export function detectPlatformFromUrl(url: string): string {
  const lower = url.toLowerCase();
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'YouTube';
  if (lower.includes('tiktok.com')) return 'TikTok';
  if (lower.includes('instagram.com')) return 'Instagram';
  if (lower.includes('facebook.com') || lower.includes('fb.watch') || lower.includes('fb.com')) return 'Facebook';
  if (lower.includes('twitter.com') || lower.includes('x.com')) return 'X (Twitter)';
  if (lower.includes('reddit.com') || lower.includes('v.redd.it')) return 'Reddit';
  if (lower.includes('pinterest.com') || lower.includes('pin.it')) return 'Pinterest';
  if (lower.includes('vimeo.com')) return 'Vimeo';
  if (lower.includes('threads.net')) return 'Threads';
  return 'Media Stream';
}

/**
 * Map API errors to exact user-friendly error messages as required by specification.
 */
function normalizeErrorMessage(errorText: string, status?: number): string {
  const lower = errorText.toLowerCase();

  if (status === 429 || lower.includes('429') || lower.includes('too many requests') || lower.includes('rate limit')) {
    return 'Too many requests. Please wait a moment and try again.';
  }

  if (
    lower.includes('unsupported') ||
    lower.includes('not supported') ||
    lower.includes('unknown platform')
  ) {
    return "This platform isn't currently supported.";
  }

  if (
    lower.includes('no media') ||
    lower.includes('no download links') ||
    lower.includes('no downloadable') ||
    lower.includes('not found') ||
    lower.includes('private') ||
    lower.includes('does not contain a video')
  ) {
    return 'No downloadable media was found for this URL.';
  }

  if (
    lower.includes('failed to fetch') ||
    lower.includes('network') ||
    lower.includes('connection') ||
    lower.includes('abort') ||
    lower.includes('timeout')
  ) {
    return 'Connection failed. Please check your internet connection and try again.';
  }

  return "We couldn't process this URL. Please try again.";
}

/**
 * Executes a single fetch attempt with timeout.
 */
async function fetchWithTimeout(url: string, timeoutMs = 25000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

/**
 * Fetches video information from the external downloader API.
 * Follows the exact specification:
 * GET https://ahm7xmakki.com/api/alldl?url=VIDEO_URL
 * With automatic proxy fallback if browser CORS limits direct access.
 */
export async function fetchVideo(videoUrl: string): Promise<MediaInfo> {
  const trimmedUrl = videoUrl ? videoUrl.trim() : '';

  if (!trimmedUrl || !isValidUrl(trimmedUrl)) {
    throw new Error('Please enter a valid video URL.');
  }

  const encodedUrl = encodeURIComponent(trimmedUrl);
  const directEndpoint = `${PRIMARY_API_ENDPOINT}?url=${encodedUrl}`;
  const proxyEndpoint = `${PROXY_API_ENDPOINT}?url=${encodedUrl}`;

  let response: Response | null = null;
  let lastError: unknown = null;

  // 1. First attempt: Direct fetch to the specified API
  try {
    response = await fetchWithTimeout(directEndpoint, 15000);
  } catch (err: unknown) {
    lastError = err;
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Direct API fetch failed (likely CORS or network), attempting proxy fallback...', err);
    }
  }

  // 2. Fallback attempt: Local proxy route if direct fetch had a network/CORS error
  if (!response || !response.ok) {
    try {
      response = await fetchWithTimeout(proxyEndpoint, 25000);
    } catch (proxyErr: unknown) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Proxy API fetch also failed:', proxyErr);
      }
      // If both failed with network errors
      if (lastError && !response) {
        throw new Error('Connection failed. Please check your internet connection and try again.');
      }
    }
  }

  if (!response) {
    throw new Error('Connection failed. Please check your internet connection and try again.');
  }

  if (response.status === 429) {
    throw new Error('Too many requests. Please wait a moment and try again.');
  }

  if (!response.ok) {
    throw new Error("We couldn't process this URL. Please try again.");
  }

  let data: ApiResponse;
  try {
    data = await response.json();
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to parse API response JSON:', err);
    }
    throw new Error("We couldn't process this URL. Please try again.");
  }

  if (!data.success || !data.mediaInfo) {
    const errorMsg = data.message || data.error || 'No downloadable media was found for this URL.';
    throw new Error(normalizeErrorMessage(errorMsg, response.status));
  }

  return data.mediaInfo;
}
