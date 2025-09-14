const fs = require("fs");
const path = require("path");

/**
 * Simple script to update cached GitHub release feeds
 * 
 * This script fetches recent releases from GitHub and updates the cached
 * feed files with up to 10 releases each for GTS and stable variants.
 * 
 * Usage:
 *   node scripts/update-cached-feeds.js
 * 
 * The script will:
 * 1. Fetch releases from GitHub (or read from existing combined feed)
 * 2. Extract GTS and stable releases 
 * 3. Update the cached JSON files with the latest 10 of each
 */

async function updateCachedFeeds() {
  console.log("Updating cached feed files...");
  
  try {
    // Read the existing combined feed (this gets updated by the build process)
    const combinedFeedPath = path.join(__dirname, "..", "static", "feeds", "bluefin-releases.json");
    
    if (!fs.existsSync(combinedFeedPath)) {
      console.error("Combined feed file not found. Run 'npm run fetch-feeds' first.");
      process.exit(1);
    }
    
    const combinedData = JSON.parse(fs.readFileSync(combinedFeedPath, 'utf8'));
    console.log(`Found ${combinedData.items.length} total releases in combined feed`);
    
    // Extract and cache GTS releases (last 10)
    const gtsReleases = combinedData.items
      .filter(item => item.title.startsWith('gts-'))
      .slice(0, 10);
    
    const gtsData = {
      title: 'Bluefin GTS Releases',
      items: gtsReleases
    };
    
    // Extract and cache stable releases (last 10)
    const stableReleases = combinedData.items
      .filter(item => item.title.startsWith('stable-'))
      .slice(0, 10);
    
    const stableData = {
      title: 'Bluefin Stable Releases',
      items: stableReleases
    };
    
    // Write cached files
    const feedsDir = path.join(__dirname, "..", "static", "feeds");
    
    fs.writeFileSync(
      path.join(feedsDir, "bluefin-gts-releases.json"),
      JSON.stringify(gtsData, null, 2)
    );
    
    fs.writeFileSync(
      path.join(feedsDir, "bluefin-stable-releases.json"), 
      JSON.stringify(stableData, null, 2)
    );
    
    console.log("✅ Updated cached feeds:");
    console.log(`   - GTS releases: ${gtsReleases.length} items`);
    console.log(`   - Stable releases: ${stableReleases.length} items`);
    
    // Show latest releases for verification
    if (gtsReleases.length > 0) {
      console.log(`   - Latest GTS: ${gtsReleases[0].title}`);
    }
    if (stableReleases.length > 0) {
      console.log(`   - Latest stable: ${stableReleases[0].title}`);
    }
    
  } catch (error) {
    console.error("❌ Error updating cached feeds:", error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  updateCachedFeeds();
}

module.exports = { updateCachedFeeds };