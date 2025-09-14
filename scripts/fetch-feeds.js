const fs = require("fs");
const path = require("path");
const { parseString } = require("xml2js");

/**
 * Enhanced Bluefin Documentation Feed Fetcher
 * 
 * This script fetches GitHub releases and creates both:
 * 1. Standard combined feeds (for backward compatibility)  
 * 2. Separate cached feeds for GTS and stable releases
 * 
 * The cached feeds solve the issue where GitHub Atom feeds only provide 
 * ~10 total releases, resulting in only ~5 of each type (GTS/stable).
 */

async function fetchAndParseFeed(url, filename) {
  try {
    const fetch = (await import("node-fetch")).default;
    console.log(`Fetching ${url}...`);

    const response = await fetch(url);
    const xmlText = await response.text();

    // Parse XML to JSON
    return new Promise((resolve, reject) => {
      parseString(xmlText, (err, result) => {
        if (err) {
          console.error(`Error parsing XML from ${url}:`, err);
          reject(err);
          return;
        }

        // Extract feed entries and convert to simple format
        const feed = result.feed;
        const entries = feed.entry || [];

        const releases = entries.map((entry) => {
          // Find the HTML link
          let link = "#";
          if (entry.link && Array.isArray(entry.link)) {
            const htmlLink = entry.link.find(
              (l) => l.$ && l.$.type === "text/html",
            );
            link = htmlLink ? htmlLink.$.href : entry.link[0].$.href;
          }

          // Handle content safely
          let content = "";
          let contentSnippet = "";
          if (
            entry.content &&
            Array.isArray(entry.content) &&
            entry.content[0]
          ) {
            if (typeof entry.content[0] === "string") {
              content = entry.content[0];
              contentSnippet = content.substring(0, 200) + "...";
            } else if (
              entry.content[0]._ &&
              typeof entry.content[0]._ === "string"
            ) {
              content = entry.content[0]._;
              contentSnippet = content.substring(0, 200) + "...";
            }
          }

          return {
            title: entry.title ? entry.title[0] : "Unknown Release",
            link,
            pubDate: entry.updated ? entry.updated[0] : "",
            contentSnippet,
            content,
          };
        });

        const feedsDir = path.join(__dirname, "..", "static", "feeds");
        if (!fs.existsSync(feedsDir)) {
          fs.mkdirSync(feedsDir, { recursive: true });
        }

        // Save as JSON
        const jsonPath = path.join(feedsDir, filename.replace(".xml", ".json"));
        fs.writeFileSync(
          jsonPath,
          JSON.stringify(
            {
              title: feed.title ? feed.title[0] : "Releases",
              items: releases,
            },
            null,
            2,
          ),
        );

        console.log(`Converted and saved to ${jsonPath}`);
        console.log(`Fetched ${releases.length} releases from Atom feed`);
        resolve(releases);
      });
    });
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null;
  }
}

async function createCachedFeeds() {
  console.log("Creating separate cached feeds for GTS and stable releases...");
  
  const combinedFeedPath = path.join(__dirname, "..", "static", "feeds", "bluefin-releases.json");
  
  if (!fs.existsSync(combinedFeedPath)) {
    console.error("Combined feed not found, cannot create cached feeds");
    return;
  }
  
  const combinedData = JSON.parse(fs.readFileSync(combinedFeedPath, 'utf8'));
  console.log(`Processing ${combinedData.items.length} releases from combined feed`);
  
  // Extract GTS releases (last 10)
  const gtsReleases = combinedData.items
    .filter(item => item.title.startsWith('gts-'))
    .slice(0, 10);
  
  // Extract stable releases (last 10)
  const stableReleases = combinedData.items
    .filter(item => item.title.startsWith('stable-'))
    .slice(0, 10);
  
  // Create cached feed data
  const gtsData = {
    title: 'Bluefin GTS Releases',
    items: gtsReleases
  };
  
  const stableData = {
    title: 'Bluefin Stable Releases',
    items: stableReleases
  };
  
  // Save cached feeds
  const feedsDir = path.join(__dirname, "..", "static", "feeds");
  
  fs.writeFileSync(
    path.join(feedsDir, "bluefin-gts-releases.json"),
    JSON.stringify(gtsData, null, 2)
  );
  
  fs.writeFileSync(
    path.join(feedsDir, "bluefin-stable-releases.json"), 
    JSON.stringify(stableData, null, 2)
  );
  
  console.log("✅ Created cached feeds:");
  console.log(`   - GTS releases: ${gtsReleases.length} items`);
  console.log(`   - Stable releases: ${stableReleases.length} items`);
  
  if (gtsReleases.length > 0) {
    console.log(`   - Latest GTS: ${gtsReleases[0].title}`);
  }
  if (stableReleases.length > 0) {
    console.log(`   - Latest stable: ${stableReleases[0].title}`);
  }
}

async function main() {
  // Fetch the standard feeds
  await fetchAndParseFeed(
    "https://github.com/ublue-os/bluefin/releases.atom",
    "bluefin-releases.xml",
  );
  await fetchAndParseFeed(
    "https://github.com/ublue-os/bluefin-lts/releases.atom",
    "bluefin-lts-releases.xml",
  );
  
  // Create the cached feeds for separate display
  await createCachedFeeds();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { fetchAndParseFeed, createCachedFeeds };
