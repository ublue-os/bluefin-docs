# Internationalization (i18n) Guide

This guide explains how to contribute translations and manage internationalization for the Bluefin documentation.

## Overview

Bluefin documentation uses [Docusaurus i18n](https://docusaurus.io/docs/i18n/introduction) features to support multiple languages. The system is set up to make it easy for contributors to add new languages and maintain translations.

## Current Setup

- **Default language:** English (`en`)
- **Available languages:** English (`en`), Spanish (`es`)
- **Translation files location:** `i18n/` directory
- **Language switcher:** Available in the top-right navbar

## How i18n Works

The internationalization system consists of:

1. **Translation files** - JSON files containing UI text translations
2. **Locale-specific content** - Markdown files for each language
3. **Configuration** - Language settings in `docusaurus.config.ts`

## File Structure

```
i18n/
├── en/                                   # English (default)
│   ├── code.json                        # UI translations
│   ├── docusaurus-theme-classic/
│   │   ├── navbar.json                  # Navbar translations
│   │   └── footer.json                  # Footer translations
│   ├── docusaurus-plugin-content-docs/
│   │   └── current.json                 # Docs metadata translations
│   └── docusaurus-plugin-content-blog/
│       └── options.json                 # Blog translations
└── es/                                   # Spanish
    ├── code.json                        # Spanish UI translations
    ├── docusaurus-theme-classic/
    ├── docusaurus-plugin-content-docs/
    └── docusaurus-plugin-content-blog/
```

## Adding a New Language

To add support for a new language (e.g., French - `fr`):

### 1. Update Configuration

Edit `docusaurus.config.ts` and add the new locale:

```typescript
i18n: {
  defaultLocale: "en",
  locales: ["en", "es", "fr"], // Add 'fr' here
},
```

### 2. Generate Translation Files

Run the write-translations command for the new locale:

```bash
npm run write-translations -- --locale fr
```

This creates the translation file structure in `i18n/fr/`.

### 3. Create Content Directories

Create directories for translated content:

```bash
mkdir -p i18n/fr/docusaurus-plugin-content-docs/current
mkdir -p i18n/fr/docusaurus-plugin-content-blog
```

### 4. Test the Build

Verify everything works:

```bash
npm run build
npm start
```

## Translating Content

### UI Elements

Edit the JSON files in `i18n/{locale}/` to translate UI elements:

- `code.json` - General UI text
- `docusaurus-theme-classic/navbar.json` - Navigation bar
- `docusaurus-theme-classic/footer.json` - Footer links
- `docusaurus-plugin-content-docs/current.json` - Documentation metadata
- `docusaurus-plugin-content-blog/options.json` - Blog settings

### Documentation Pages

To translate documentation pages:

1. Copy the English markdown file from `docs/` to `i18n/{locale}/docusaurus-plugin-content-docs/current/`
2. Translate the content while keeping the same filename
3. Maintain the same frontmatter structure

Example:
```bash
# Copy English file
cp docs/introduction.md i18n/es/docusaurus-plugin-content-docs/current/

# Edit the Spanish version
nano i18n/es/docusaurus-plugin-content-docs/current/introduction.md
```

### Blog Posts

To translate blog posts:

1. Copy blog posts from `blog/` to `i18n/{locale}/docusaurus-plugin-content-blog/`
2. Translate the content
3. Keep the same date and filename structure

## Available Commands

- `npm run write-translations` - Generate translation files for default locale
- `npm run write-translations -- --locale es` - Generate for specific locale
- `npm run build` - Build all locales
- `npm start` - Start development server with all locales

## Best Practices

1. **Keep structure consistent** - Don't change markdown structure when translating
2. **Translate progressively** - Start with high-priority pages
3. **Update translations regularly** - Keep pace with English content updates
4. **Test thoroughly** - Verify builds and navigation work correctly
5. **Use native speakers** - Ensure quality translations

## Supported Locales

Common locale codes for reference:
- `en` - English
- `es` - Spanish
- `fr` - French
- `de` - German
- `it` - Italian
- `pt` - Portuguese
- `ja` - Japanese
- `zh` - Chinese (Simplified)
- `ko` - Korean

## Contributing Translations

To contribute translations:

1. Fork the repository
2. Add your language following the steps above
3. Translate key pages and UI elements
4. Test the build locally
5. Submit a pull request

## Getting Help

If you need help with translations:
- Check the [Docusaurus i18n documentation](https://docusaurus.io/docs/i18n/introduction)
- Ask in our [Community Forum](https://github.com/ublue-os/bluefin/discussions)
- Join our [Discord](https://discord.gg/XUC8cANVHy) for real-time help

## Technical Details

The i18n system:
- Uses React Intl for message formatting
- Supports RTL languages
- Automatically generates locale-specific URLs (`/es/`, `/fr/`, etc.)
- Maintains separate search indexes per language
- Supports locale-specific themes and styling