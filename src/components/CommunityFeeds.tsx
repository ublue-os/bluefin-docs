import React from "react";
import Layout from "@theme/Layout";
import FeedItems from "../components/FeedItems";
import PackageSummary from "../components/PackageSummary";
import styles from "./CommunityFeeds.module.css";

const CommunityFeeds: React.FC = () => {
  return (
    <Layout
      title="Changelogs and Feeds"
      description="Stay up to date with Bluefin releases, discussions, and announcements. Stay frosty."
    >
      <div className="container margin-vert--lg">
        <div className={styles.header}>
          <h1>Changelogs and Feeds</h1>
          <p>
            Stay up to date with the latest Bluefin releases, community
            discussions, and announcements. Stay frosty.
          </p>
        </div>

        {/* Package Summary Boxes */}
        <div className={styles.packageSummaryGrid}>
          <PackageSummary feedKey="bluefinLtsReleases" title="Bluefin LTS" />
          <PackageSummary
            feedKey="bluefinGtsReleases"
            title="Bluefin GTS"
            filter={(item) => item.title.startsWith("gts-")}
          />
          <PackageSummary
            feedKey="bluefinStableReleases"
            title="Bluefin"
            filter={(item) => item.title.startsWith("stable-")}
          />
        </div>

        <div className={styles.feedGrid}>
          <div className={styles.feedColumn}>
            <FeedItems
              feedId="bluefinLtsReleases"
              title="Bluefin LTS"
              maxItems={10}
              showDescription={false}
            />
            <p className={styles.sectionByline}>
              <em>Achillobator giganticus</em>
            </p>
          </div>
        {/* 
          Feed Grid - Shows recent releases for each Bluefin variant
          
          Enhanced solution: The fetch-feeds script creates cached JSON files 
          containing more releases, which provides better data for filtering.
          
          - Bluefin LTS: Direct feed (working fine)
          - Bluefin GTS: Filtered from enhanced bluefinGtsReleases feed  
          - Bluefin Stable: Filtered from enhanced bluefinStableReleases feed
          
          This simple caching approach gives us 10+ items of each type
          while maintaining backward compatibility.
        */}
        <div className={styles.feedGrid}>
          <div className={styles.feedColumn}>
            <FeedItems
              feedId="bluefinLtsReleases"
              title="Bluefin LTS"
              maxItems={10}
              showDescription={false}
            />
            <p className={styles.sectionByline}>
              <em>Achillobator giganticus</em>
            </p>
          </div>
          <div className={styles.feedColumn}>
            <FeedItems
              feedId="bluefinGtsReleases"
              title="Bluefin GTS"
              maxItems={10}
              showDescription={false}
              filter={(item) => item.title.startsWith("gts-")}
            />
            <p className={styles.sectionByline}>
              <em>Deinonychus antirrhopus</em>
            </p>
          </div>
          <div className={styles.feedColumn}>
            <FeedItems
              feedId="bluefinStableReleases"
              title="Bluefin"
              maxItems={10}
              showDescription={false}
              filter={(item) => item.title.startsWith("stable-")}
            />
            <p className={styles.sectionByline}>
              <em>Utahraptor ostrommaysi</em>
            </p>
          </div>
        </div>
        </div>

        <div className={styles.additionalFeedsGrid}>
          <div className={styles.feedColumn}>
            <FeedItems
              feedId="bluefinDiscussions"
              title="Community Discussions"
              maxItems={5}
              showDescription={false}
            />
          </div>
          <div className={styles.feedColumn}>
            <FeedItems
              feedId="bluefinAnnouncements"
              title="Announcements"
              maxItems={3}
              showDescription={false}
            />
          </div>
        </div>

        <div className={styles.additionalLinks}>
          <h2>Additional Feeds</h2>
          <div className={styles.linkGrid}>
            <a
              href="https://docs.projectbluefin.io/blog/rss.xml"
              className={styles.resourceLink}
            >
              <strong>Blog RSS Feed</strong>
              <span>Subscribe to official blog posts and announcements</span>
            </a>
            <a
              href="https://github.com/ublue-os/bluefin/releases.atom"
              className={styles.resourceLink}
            >
              <strong>Releases Feed</strong>
              <span>Direct feed for Bluefin releases</span>
            </a>
            <a
              href="https://github.com/ublue-os/bluefin-lts/releases.atom"
              className={styles.resourceLink}
            >
              <strong>LTS Releases Feed</strong>
              <span>Direct feed for Bluefin LTS releases</span>
            </a>
            <a
              href="https://github.com/ublue-os/bluefin/discussions.atom"
              className={styles.resourceLink}
            >
              <strong>Discussions Feed</strong>
              <span>Community discussions and support topics</span>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CommunityFeeds;
