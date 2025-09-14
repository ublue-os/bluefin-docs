const fs = require("fs");
const path = require("path");
const { parseString } = require("xml2js");

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
  await fetchAndParseFeed(
    "https://github.com/ublue-os/bluefin/releases.atom",
    "bluefin-releases.xml",
  );
  await fetchAndParseFeed(
    "https://github.com/ublue-os/bluefin-lts/releases.atom",
    "bluefin-lts-releases.xml",
  );
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { fetchAndParseFeed, fetchGitHubReleases };
