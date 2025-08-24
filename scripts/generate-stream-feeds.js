#!/usr/bin/env node

/**
 * Simple script to generate stream-specific RSS feeds from the main changelog feed
 * This runs after the main build to create filtered feeds for LTS, stable, and GTS
 */

const fs = require('fs');
const path = require('path');
const { XMLParser, XMLBuilder } = require('fast-xml-parser');

const buildDir = path.join(__dirname, '../build');
const changelogFeedPath = path.join(buildDir, 'changelogs', 'rss.xml');
const atomFeedPath = path.join(buildDir, 'changelogs', 'atom.xml');

console.log('Generating stream-specific RSS/Atom feeds...');

// Check if main feeds exist
if (!fs.existsSync(changelogFeedPath)) {
  console.error('Main RSS feed not found at:', changelogFeedPath);
  process.exit(1);
}

if (!fs.existsSync(atomFeedPath)) {
  console.error('Main Atom feed not found at:', atomFeedPath);
  process.exit(1);
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  allowBooleanAttributes: true,
});

const builder = new XMLBuilder({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  format: true,
});

function filterFeedItems(feedContent, streamName) {
  const feedObj = parser.parse(feedContent);
  
  if (feedObj.rss && feedObj.rss.channel && feedObj.rss.channel.item) {
    // RSS feed
    const items = Array.isArray(feedObj.rss.channel.item) 
      ? feedObj.rss.channel.item 
      : [feedObj.rss.channel.item];
    
    const filteredItems = items.filter(item => {
      const link = typeof item.link === 'string' ? item.link : (item.link ? String(item.link) : '');
      return link.toLowerCase().includes(`-${streamName}-`) || link.toLowerCase().includes(`-${streamName}.`);
    });
    
    feedObj.rss.channel.item = filteredItems;
    feedObj.rss.channel.title = `Bluefin ${streamName.toUpperCase()} Changelogs`;
    feedObj.rss.channel.description = `Changelogs for Bluefin ${streamName.toUpperCase()} releases`;
    
  } else if (feedObj.feed && feedObj.feed.entry) {
    // Atom feed
    const entries = Array.isArray(feedObj.feed.entry) 
      ? feedObj.feed.entry 
      : [feedObj.feed.entry];
    
    const filteredEntries = entries.filter(entry => {
      const link = entry.link && entry.link['@_href'] ? entry.link['@_href'] : '';
      return link.toLowerCase().includes(`-${streamName}-`) || link.toLowerCase().includes(`-${streamName}.`);
    });
    
    feedObj.feed.entry = filteredEntries;
    feedObj.feed.title = `Bluefin ${streamName.toUpperCase()} Changelogs`;
    if (feedObj.feed.subtitle) {
      feedObj.feed.subtitle = `Changelogs for Bluefin ${streamName.toUpperCase()} releases`;
    }
  }
  
  return builder.build(feedObj);
}

// Process RSS feeds
const rssContent = fs.readFileSync(changelogFeedPath, 'utf8');
['lts', 'stable', 'gts'].forEach(stream => {
  const filteredRss = filterFeedItems(rssContent, stream);
  const outputPath = path.join(buildDir, 'changelogs', `rss-${stream}.xml`);
  fs.writeFileSync(outputPath, filteredRss);
  console.log(`Generated: ${outputPath}`);
});

// Process Atom feeds
const atomContent = fs.readFileSync(atomFeedPath, 'utf8');
['lts', 'stable', 'gts'].forEach(stream => {
  const filteredAtom = filterFeedItems(atomContent, stream);
  const outputPath = path.join(buildDir, 'changelogs', `atom-${stream}.xml`);
  fs.writeFileSync(outputPath, filteredAtom);
  console.log(`Generated: ${outputPath}`);
});

console.log('Stream-specific feeds generated successfully!');