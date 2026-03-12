import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT_DIR = process.cwd();
const POSTS_CONTENT_DIR = path.join(ROOT_DIR, "personal", "content", "posts");

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function toTitleCase(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function parseCliTitle(argv) {
  const joined = argv.join(" ").trim();
  if (!joined) {
    return "";
  }

  return joined.replace(/^['"]|['"]$/g, "").trim();
}

async function run() {
  const rawTitle = parseCliTitle(process.argv.slice(2));
  if (!rawTitle) {
    console.error("Usage: npm run indie:new -- \"My New Post Title\"");
    process.exit(1);
  }

  const slug = slugify(rawTitle);
  if (!slug) {
    console.error("Could not derive a valid slug from the title.");
    process.exit(1);
  }

  const title = toTitleCase(slug);
  const date = new Date().toISOString().slice(0, 10);
  const filename = `${slug}.md`;
  const targetPath = path.join(POSTS_CONTENT_DIR, filename);

  await fs.mkdir(POSTS_CONTENT_DIR, { recursive: true });

  try {
    await fs.access(targetPath);
    console.error(`A post already exists: personal/content/posts/${filename}`);
    process.exit(1);
  } catch {
    // File does not exist, continue.
  }

  const template = `---
title: ${title}
date: ${date}
tag: post
summary: Add a one-line summary for homepage cards and archive listings.
---

# ${title}

Start writing your post here.
`;

  await fs.writeFile(targetPath, template, "utf8");

  console.log(`Created markdown post: personal/content/posts/${filename}`);
  console.log("Next step: run npm run indie:publish");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
