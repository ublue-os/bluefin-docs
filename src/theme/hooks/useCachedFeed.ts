import { useState, useEffect } from 'react';

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  content: string;
}

interface FeedData {
  title: string;
  items: FeedItem[];
}

/**
 * Custom hook to fetch cached feed data from static JSON files.
 * This bypasses the @1password/docusaurus-plugin-stored-data limitation
 * that only supports HTTPS URLs.
 */
export default function useCachedFeed(feedKey: string): FeedData | null {
  const [feedData, setFeedData] = useState<FeedData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCachedFeed = async () => {
      try {
        let feedPath: string;
        
        // Map feed keys to cached JSON files
        switch (feedKey) {
          case 'bluefinGtsReleases':
            feedPath = '/feeds/bluefin-gts-releases.json';
            break;
          case 'bluefinStableReleases':
            feedPath = '/feeds/bluefin-stable-releases.json';
            break;
          default:
            // For other feeds, return null to use the regular stored-data plugin
            setLoading(false);
            return;
        }

        const response = await fetch(feedPath);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${feedPath}: ${response.status}`);
        }
        
        const data = await response.json();
        setFeedData(data);
      } catch (error) {
        console.error(`Error loading cached feed ${feedKey}:`, error);
        setFeedData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCachedFeed();
  }, [feedKey]);

  return feedData;
}