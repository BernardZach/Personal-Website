# Indie Site Workflow (`personal/`)

This folder contains your standalone indie/personal mini-site. It is intentionally separate from the professional portfolio content.

## Folder layout

- `personal/index.html` — indie homepage
- `personal/styles.css` — shared indie styles
- `personal/scripts.js` — shared indie scripts (backgrounds, markdown rendering, post feeds)
- `personal/content/posts/*.md` — markdown source posts (author here)
- `personal/content/posts-manifest.json` — generated manifest used by homepage/archive
- `personal/posts/*.html` — generated post page wrappers + archive page

## Commands

Run these from the repository root.

### Create a new markdown post

```bash
npm run indie:new -- "My New Post Title"
```

What it does:
- Creates a new markdown file in `personal/content/posts/`
- Auto-generates a slug filename (for example, `my-new-post-title.md`)
- Pre-fills frontmatter + starter body

### Publish markdown to the site

```bash
npm run indie:publish
```

What it does:
- Scans `personal/content/posts/*.md`
- Generates/updates `personal/posts/*.html` wrappers for each markdown file
- Regenerates `personal/content/posts-manifest.json`
- Homepage and archive pull from this manifest automatically

### Auto-publish while editing (watch mode)

```bash
npm run indie:publish:watch
```

## Writing posts in Markdown

Each post should include frontmatter at the top:

```md
---
title: Your Post Title
date: 2026-03-12
tag: now
summary: One-line summary used on homepage cards and archive listing.
---

# Your Post Title

Your content here.
```

### Frontmatter fields

- `title` (required): Display title in cards/pages
- `date` (recommended): `YYYY-MM-DD`, used for ordering
- `tag` (recommended): Short label (e.g., `intro`, `now`, `updates`, `devlog`)
- `summary` (recommended): Appears in recent posts + archive cards

## Typical authoring flow

1. Create post skeleton:
   - `npm run indie:new -- "Post Title"`
2. Write content in the generated markdown file under `personal/content/posts/`
3. Publish:
   - `npm run indie:publish`
4. Preview your site and commit changes

## Notes

- `personal/posts/index.html` is your archive page and reads from the generated manifest.
- If you manually edit generated files in `personal/posts/*.html`, those changes may be overwritten by `indie:publish`.
- Treat markdown files in `personal/content/posts/` as the source of truth.
