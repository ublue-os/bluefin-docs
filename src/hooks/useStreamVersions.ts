/**
 * Shared hook for extracting stream version information from release feeds.
 * This provides a single source of truth for version data used across the site.
 *
 * Used by:
 * - PackageSummary component (changelogs page)
 * - Chooser page (ISO selection)
 */

import { useMemo } from "react";
import useStoredFeed from "@theme/useStoredFeed";
import {
  PACKAGE_PATTERNS,
  extractPackageVersion,
} from "../config/packageConfig";

export interface VersionInfo {
  base: string;
  gnome: string;
  kernel: string;
  mesa: string;
  nvidia: string;
  hwe?: string;
}

export interface PackageInfo {
  name: string;
  version: string;
}

interface UseStreamVersionsResult {
  lts: VersionInfo | null;
  gts: VersionInfo | null;
  stable: VersionInfo | null;
  ltsPackages: PackageInfo[];
  gtsPackages: PackageInfo[];
  stablePackages: PackageInfo[];
}

/**
 * Extract version information from feed data for a specific stream.
 *
 * @param feedData - Feed data from useStoredFeed hook
 * @param filter - Optional filter to select specific items from the feed
 * @returns VersionInfo object or null if data cannot be extracted
 */
function extractVersionsFromFeed(
  feedData: any,
  filter?: (item: any) => boolean,
): { versions: VersionInfo | null; packages: PackageInfo[] } {
  let items = [];

  // Handle different feed formats
  if (feedData?.rss?.channel?.item) {
    items = Array.isArray(feedData.rss.channel.item)
      ? feedData.rss.channel.item
      : [feedData.rss.channel.item];
  } else if (feedData?.channel?.item) {
    items = Array.isArray(feedData.channel.item)
      ? feedData.channel.item
      : [feedData.channel.item];
  } else if (feedData?.feed?.entry) {
    items = Array.isArray(feedData.feed.entry)
      ? feedData.feed.entry
      : [feedData.feed.entry];
  }

  if (items.length === 0) {
    return { versions: null, packages: [] };
  }

  // Apply filter if provided
  if (filter) {
    items = items.filter(filter);
  }

  if (items.length === 0) {
    return { versions: null, packages: [] };
  }

  // Get the most recent release (first item) for full version info
  const latestItem = items[0];
  let content = "";
  if (typeof latestItem.content === "object" && latestItem.content?.value) {
    content = latestItem.content.value;
  } else if (typeof latestItem.content === "string") {
    content = latestItem.content;
  } else if (latestItem.description) {
    content = latestItem.description;
  }

  if (!content) {
    return { versions: null, packages: [] };
  }

  // Extract package versions
  const packages: PackageInfo[] = [];
  const versionMap: Partial<VersionInfo> = {};

  // Map package names to VersionInfo keys
  const packageMap: { [key: string]: keyof VersionInfo } = {
    Kernel: "kernel",
    "HWE Kernel": "hwe",
    GNOME: "gnome",
    Mesa: "mesa",
    NVIDIA: "nvidia",
  };

  // Search through recent releases to find all package versions
  const maxItemsToSearch = Math.min(10, items.length);

  for (const pkg of PACKAGE_PATTERNS) {
    let foundVersion = false;

    for (let i = 0; i < maxItemsToSearch && !foundVersion; i++) {
      const item = items[i];
      let itemContent = "";

      if (typeof item.content === "object" && item.content?.value) {
        itemContent = item.content.value;
      } else if (typeof item.content === "string") {
        itemContent = item.content;
      } else if (item.description) {
        itemContent = item.description;
      }

      if (!itemContent) continue;

      const version = extractPackageVersion(itemContent, pkg.pattern);
      if (version) {
        packages.push({ name: pkg.name, version });

        // Also populate versionMap for VersionInfo structure
        const key = packageMap[pkg.name];
        if (key) {
          versionMap[key] = version;
        }

        foundVersion = true;
      }
    }
  }

  // Extract base OS version from title (e.g., "gts-42-20250128" -> "Fedora 42")
  let baseVersion = "Unknown";
  if (latestItem.title) {
    const title = latestItem.title.toLowerCase();
    if (title.includes("lts")) {
      baseVersion = "CentOS Stream 10";
    } else {
      // Try to extract Fedora version from title
      const versionMatch = title.match(/(?:gts|stable)-(\d+)-/);
      if (versionMatch) {
        baseVersion = `Fedora ${versionMatch[1]}`;
      }
    }
  }

  const versions: VersionInfo = {
    base: baseVersion,
    gnome: versionMap.gnome || "N/A",
    kernel: versionMap.kernel || "N/A",
    mesa: versionMap.mesa || "N/A",
    nvidia: versionMap.nvidia || "N/A",
    hwe: versionMap.hwe,
  };

  return { versions, packages };
}

/**
 * Hook to get version information for all Bluefin streams.
 * This is the single source of truth for version data across the site.
 *
 * @returns Object containing version info and package lists for LTS, GTS, and Stable streams
 */
export function useStreamVersions(): UseStreamVersionsResult {
  const ltsFeedData = useStoredFeed("bluefinLtsReleases");
  const releaseFeedData = useStoredFeed("bluefinReleases");

  return useMemo(() => {
    const ltsData = extractVersionsFromFeed(ltsFeedData);
    const gtsData = extractVersionsFromFeed(releaseFeedData, (item) =>
      item.title?.startsWith("gts-"),
    );
    const stableData = extractVersionsFromFeed(releaseFeedData, (item) =>
      item.title?.startsWith("stable-"),
    );

    return {
      lts: ltsData.versions,
      gts: gtsData.versions,
      stable: stableData.versions,
      ltsPackages: ltsData.packages,
      gtsPackages: gtsData.packages,
      stablePackages: stableData.packages,
    };
  }, [ltsFeedData, releaseFeedData]);
}
