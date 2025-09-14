import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Bluefin",
  tagline: "Bluefin Documentation",
  favicon: "img/logo.svg",

  url: "https://docs.projectbluefin.io/",
  baseUrl: "/",

  future: {
    experimental_faster: true,
    v4: {
      removeLegacyPostBuildHeadAttribute: true,
    },
  },

  // GitHub pages deployment config.
  organizationName: "ublue-os",
  projectName: "bluefin",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Disables the landing page
          routeBasePath: "/",
          editUrl: "https://github.com/ublue-os/bluefin-docs/tree/main",
        },
        blog: {
          blogTitle: "Bluefin's Blog",
          blogDescription: "Official Blog and Announcements",
          blogSidebarCount: "ALL",
          blogSidebarTitle: "Raptor News",
          editUrl: "https://github.com/ublue-os/bluefin-docs/edit/main/",
          authorsMapPath: "authors.yaml",
          truncateMarker: /(?!.*)/,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
            title: "Bluefin Blog",
            description: "Official Blog and Announcements",
          },
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      "@1password/docusaurus-plugin-stored-data",
      {
        data: {
          bluefinReleases: "https://github.com/ublue-os/bluefin/releases.atom",
          bluefinGtsReleases: "https://github.com/ublue-os/bluefin/releases.atom",
          bluefinStableReleases: "https://github.com/ublue-os/bluefin/releases.atom",
          bluefinLtsReleases:
            "https://github.com/ublue-os/bluefin-lts/releases.atom",
          bluefinDiscussions:
            "https://github.com/ublue-os/bluefin/discussions.atom",
          bluefinAnnouncements:
            "https://github.com/ublue-os/bluefin/discussions.atom?discussions_q=is%3Aopen+label%3Aannouncements",
        },
      },
    ],
  ],

  themeConfig: {
    algolia: {
      // The application ID provided by Algolia
      appId: "H1LI1VATRI",
      // Public API key: it is safe to commit it
      apiKey: "201fbeeb537ae90f533bedcb5a73230b",
      indexName: "projectbluefin",
      contextualSearch: true,
      searchPagePath: "search",
    },
    announcementBar: {
      id: "announcement",
      content:
        'Got a question? Try <a href="https://ask.projectbluefin.io">ask.projectbluefin.io</a>!',
      backgroundColor: "#fafbfc",
      textColor: "#091E42",
      isCloseable: true,
    },
    metadata: [
      {
        name: "keywords",
        content:
          "documentation, bluefin, universalblue, linux, gnome, podman, docker, cloudnative",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],

    // Social card that shows up on discord when you share it
    image: "img/meta.png",
    navbar: {
      title: "Bluefin",
      logo: {
        alt: "Bluefin",
        src: "img/logo.svg",
        href: "https://projectbluefin.io/",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "baseSidebar",
          position: "left",
          label: "Documentation",
        },
        {
          href: "https://ask.projectbluefin.io",
          label: "Ask Bluefin",
          position: "left",
        },
        {
          to: "blog",
          label: "Blog",
          position: "right",
        },
        {
          to: "changelogs",
          label: "Changelogs",
          position: "right",
        },
        {
          href: "https://github.com/ublue-os/bluefin/discussions",
          label: "Community",
          position: "right",
        },
        {
          href: "https://feedback.projectbluefin.io/",
          label: "Feedback",
          position: "right",
        },
        {
          href: "https://store.projectbluefin.io",
          label: "Store (US Only)",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Universal Blue",
          items: [
            {
              label: "Aurora",
              href: "https://getaurora.dev",
            },
            {
              label: "Bazzite",
              href: "https://bazzite.gg/",
            },
            {
              label: "Cayo",
              href: "https://projectcayo.org/",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Discord",
              href: "https://discord.gg/XUC8cANVHy",
            },
            {
              label: "Discussions",
              href: "https://github.com/ublue-os/bluefin/discussions",
            },
          ],
        },
        {
          title: "GitHub",
          items: [
            {
              label: "Bluefin",
              href: "https://github.com/ublue-os/bluefin",
            },
            {
              label: "Bluefin LTS",
              href: "https://github.com/ublue-os/bluefin-lts",
            },
            {
              label: "Bluefin Documentation",
              href: "https://github.com/ublue-os/bluefin-docs",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Project Bluefin and Universal Blue`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
