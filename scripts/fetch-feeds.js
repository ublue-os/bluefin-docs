const fs = require("fs");
const path = require("path");
const { parseString } = require("xml2js");

/*
 * Bluefin Documentation Feed Fetcher
 * 
 * This script fetches GitHub releases to populate the changelog feeds on the documentation site.
 * 
 * ISSUE: GitHub Atom feeds only return ~10 most recent releases total
 * IMPACT: With both stable- and gts- releases in the same feed, we only get ~5 of each type
 * SOLUTION: This script tries GitHub REST API first (30 releases), falls back to Atom feeds
 * 
 * In production environments with proper API access, this will fetch enough releases 
 * to show the configured maxItems={10} for each release type (GTS, Stable).
 * 
 * To test locally with more data, you can:
 * 1. Set up GitHub API token in environment
 * 2. Or manually edit the feed JSON files in static/feeds/ 
 */
async function fetchGitHubReleases(repo, filename) {
  try {
    const fetch = (await import("node-fetch")).default;
    const url = `https://api.github.com/repos/${repo}/releases?per_page=30`;
    console.log(`Fetching ${url}...`);

    const response = await fetch(url);
    const releases = await response.json();

    if (!Array.isArray(releases)) {
      console.error(`Invalid response from ${url}:`, releases);
      return null;
    }

    const formattedReleases = releases.map((release) => ({
      title: release.tag_name + (release.name ? `: ${release.name}` : ''),
      link: release.html_url,
      pubDate: release.published_at,
      contentSnippet: release.body ? release.body.substring(0, 200) + "..." : "",
      content: release.body || "",
    }));

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
          title: `Release notes from ${repo.split('/')[1]}`,
          items: formattedReleases,
        },
        null,
        2,
      ),
    );

    console.log(`Converted and saved to ${jsonPath}`);
    console.log(`Fetched ${formattedReleases.length} releases from GitHub API`);
    return formattedReleases;
  } catch (error) {
    console.error(`Error fetching GitHub releases for ${repo}:`, error.message);
    // Fallback to Atom feed if GitHub API fails
    console.log("Falling back to Atom feed...");
    return await fetchAndParseFeed(
      `https://github.com/${repo}/releases.atom`,
      filename,
    );
  }
}

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
        
        // Log feed analysis for debugging
        if (url.includes('ublue-os/bluefin/releases.atom')) {
          const gtsCount = releases.filter(r => r.title.startsWith('gts-')).length;
          const stableCount = releases.filter(r => r.title.startsWith('stable-')).length;
          console.log(`  → GTS releases: ${gtsCount}, Stable releases: ${stableCount}`);
        }
        
        resolve(releases);
      });
    });
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null;
  }
}

async function fetchGitHubReleases(repo, filename) {
  try {
    const fetch = (await import("node-fetch")).default;
    const url = `https://api.github.com/repos/${repo}/releases?per_page=30`;
    console.log(`Fetching ${url}...`);

    const response = await fetch(url);
    const releases = await response.json();

    if (!Array.isArray(releases)) {
      console.error(`Invalid response from ${url}:`, releases);
      return null;
    }

    const formattedReleases = releases.map((release) => ({
      title: release.tag_name + (release.name ? `: ${release.name}` : ''),
      link: release.html_url,
      pubDate: release.published_at,
      contentSnippet: release.body ? release.body.substring(0, 200) + "..." : "",
      content: release.body || "",
    }));

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
          title: `Release notes from ${repo.split('/')[1]}`,
          items: formattedReleases,
        },
        null,
        2,
      ),
    );

    console.log(`Converted and saved to ${jsonPath}`);
    return formattedReleases;
  } catch (error) {
    console.error(`Error fetching GitHub releases for ${repo}:`, error);
    // Fallback to Atom feed if GitHub API fails
    console.log("Falling back to Atom feed...");
    return await fetchAndParseFeed(
      `https://github.com/${repo}/releases.atom`,
      filename,
    );
  }
}

async function main() {
  console.log("Starting feed fetch process...");
  console.log("Note: Trying GitHub API first (30 releases), falling back to Atom feeds (10 releases)");
  
  // Try GitHub API first for more releases, fallback to Atom feeds
  await fetchGitHubReleases(
    "ublue-os/bluefin", 
    "bluefin-releases.xml",
  );
  await fetchGitHubReleases(
    "ublue-os/bluefin-lts", 
    "bluefin-lts-releases.xml",
  );
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { fetchAndParseFeed, fetchGitHubReleases };
