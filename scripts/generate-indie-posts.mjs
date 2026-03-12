import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT_DIR = process.cwd();
const PERSONAL_DIR = path.join(ROOT_DIR, "personal");
const POSTS_CONTENT_DIR = path.join(PERSONAL_DIR, "content", "posts");
const POSTS_OUTPUT_DIR = path.join(PERSONAL_DIR, "posts");
const MANIFEST_PATH = path.join(PERSONAL_DIR, "content", "posts-manifest.json");

function toTitleFromSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function parseFrontmatter(markdown) {
  const frontmatterMatch = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!frontmatterMatch) {
    return { metadata: {}, body: markdown };
  }

  const frontmatterRaw = frontmatterMatch[1];
  const body = markdown.slice(frontmatterMatch[0].length);

  const metadata = {};
  for (const line of frontmatterRaw.split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) {
      continue;
    }

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    if (key) {
      metadata[key] = value;
    }
  }

  return { metadata, body };
}

function extractTitle(body, fallbackTitle) {
  const titleMatch = body.match(/^#\s+(.+)$/m);
  return titleMatch ? titleMatch[1].trim() : fallbackTitle;
}

function extractSummary(body) {
  const lines = body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !line.startsWith("#") && !line.startsWith("*"));

  const summaryLine = lines.find((line) => !line.startsWith("-") && !line.startsWith("+"));
  return summaryLine || "New post update.";
}

function normalizeDate(inputDate, fallbackDate) {
  if (!inputDate) {
    return fallbackDate;
  }

  const parsed = new Date(inputDate);
  if (Number.isNaN(parsed.getTime())) {
    return fallbackDate;
  }

  return parsed.toISOString().slice(0, 10);
}

function generatePostHtml({ title, markdownPath }) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="../styles.css" />
  </head>
  <body class="tiled-bg">
    <header class="title-banner">
      <h1 class="fantasy-title pixelated">Archypelago's Corner</h1>
    </header>

    <main class="site-shell">
      <article class="panel blog-post-panel">
        <div class="markdown-body" data-markdown-file="${markdownPath}"></div>
        <p><a href="../index.html">← Back to Home</a></p>
      </article>
    </main>

    <script src="../scripts.js" type="module"></script>
  </body>
</html>
`;
}

async function run() {
  await fs.mkdir(POSTS_CONTENT_DIR, { recursive: true });
  await fs.mkdir(POSTS_OUTPUT_DIR, { recursive: true });

  const entries = await fs.readdir(POSTS_CONTENT_DIR, { withFileTypes: true });
  const markdownFiles = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".md"));

  const manifest = [];

  for (const fileEntry of markdownFiles) {
    const markdownFilename = fileEntry.name;
    const markdownFullPath = path.join(POSTS_CONTENT_DIR, markdownFilename);
    const rawMarkdown = await fs.readFile(markdownFullPath, "utf8");
    const stat = await fs.stat(markdownFullPath);

    const slug = markdownFilename.replace(/\.md$/i, "");
    const fallbackTitle = toTitleFromSlug(slug);
    const fallbackDate = stat.mtime.toISOString().slice(0, 10);

    const { metadata, body } = parseFrontmatter(rawMarkdown);
    const title = metadata.title || extractTitle(body, fallbackTitle);
    const summary = metadata.summary || extractSummary(body);
    const tag = metadata.tag || metadata.category || "post";
    const date = normalizeDate(metadata.date, fallbackDate);

    const postOutputPath = path.join(POSTS_OUTPUT_DIR, `${slug}.html`);
    const postHtml = generatePostHtml({
      title,
      markdownPath: `../content/posts/${markdownFilename}`
    });

    await fs.writeFile(postOutputPath, postHtml, "utf8");

    manifest.push({
      slug,
      title,
      date,
      tag,
      summary,
      href: `./posts/${slug}.html`
    });
  }

  manifest.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  console.log(`Generated ${manifest.length} indie post(s) and manifest at personal/content/posts-manifest.json`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
