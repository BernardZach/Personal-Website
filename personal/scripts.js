// scripts.js

const IS_POST_PAGE = window.location.pathname.includes("/personal/posts/");
const POSTS_MANIFEST_PATH = IS_POST_PAGE ? "../content/posts-manifest.json" : "./content/posts-manifest.json";

// directory for backgrounds
const TILE_DIR = IS_POST_PAGE ? "../assets/background/" : "./assets/background/";

// default/random poolq                                     
const RANDOM_POOL = [
    "nightSkyAnimatedBG.gif",
    "nightSkyCloudsAnimatedBG.gif",
    "pinkCloudsAnimatedBG.gif"];

// set background by filename
function setTile(filename) {
    const url = `url("${TILE_DIR}${filename}")`;
    document.documentElement.style.setProperty("--tile-url", url);
    try { localStorage.setItem("tile-filename", filename); } catch { }
}

// pick a random background from the pool
function getRandomTile() {
    const idx = Math.floor(Math.random() * RANDOM_POOL.length);
    return RANDOM_POOL[idx];
}

function initTileFromState() {
    // 1) URL query override
    const params = new URLSearchParams(location.search);
    const fromQuery = params.get("bg");

    // 2) Local storage preference
    let fromStorage = null;
    try { fromStorage = localStorage.getItem("tile-filename"); } catch { }

    // 3) Otherwise, random from pool
    const chosen = fromQuery || fromStorage || getRandomTile();
    setTile(chosen);

    // sync picker if present
    const select = document.getElementById("bgSelect");
    if (select) {
        select.value = chosen;
        select.addEventListener("change", () => setTile(select.value));
    }

    const randomButton = document.getElementById("randomBgBtn");
    if (randomButton) {
        randomButton.addEventListener("click", () => {
            const randomTile = getRandomTile();
            setTile(randomTile);
            if (select) {
                select.value = randomTile;
            }
        });
    }
}

initTileFromState();

function initSiteStats() {
    const visitCountEl = document.getElementById("visitCount");
    const lastVisitEl = document.getElementById("lastVisit");

    const visitsKey = "archypelago-indie-visits";
    const lastVisitKey = "archypelago-indie-last-visit";

    let visitCount = 0;
    let previousVisit = null;

    try {
        visitCount = parseInt(localStorage.getItem(visitsKey) || "0", 10) + 1;
        previousVisit = localStorage.getItem(lastVisitKey);
        localStorage.setItem(visitsKey, String(visitCount));
        localStorage.setItem(lastVisitKey, new Date().toISOString());
    } catch {
        visitCount = 1;
    }

    if (visitCountEl) {
        visitCountEl.textContent = String(visitCount);
    }

    if (lastVisitEl) {
        if (!previousVisit) {
            lastVisitEl.textContent = "First time here.";
        } else {
            const formatted = new Date(previousVisit).toLocaleString();
            lastVisitEl.textContent = formatted;
        }
    }
}

initSiteStats();

async function initMarkdownPostRender() {
    const markdownContainer = document.querySelector(".markdown-body[data-markdown-file]");
    if (!markdownContainer) {
        return;
    }

    const markdownFile = markdownContainer.getAttribute("data-markdown-file");
    if (!markdownFile) {
        return;
    }

    try {
        const [{ marked }, response] = await Promise.all([
            import("https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js"),
            fetch(markdownFile)
        ]);

        if (!response.ok) {
            throw new Error(`Unable to load markdown: ${markdownFile}`);
        }

        const markdownText = await response.text();
        markdownContainer.innerHTML = marked.parse(markdownText);
    } catch (error) {
        markdownContainer.innerHTML = "<p>Post content failed to load.</p>";
        console.error(error);
    }
}

initMarkdownPostRender();

function formatPostDate(dateString) {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
        return "Unknown date";
    }

    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

function renderRecentPosts(posts) {
    const recentPostsList = document.getElementById("recentPostsList");
    if (!recentPostsList) {
        return;
    }

    const showAllPosts = recentPostsList.getAttribute("data-show-all") === "true";

    if (!posts.length) {
        recentPostsList.innerHTML = `
            <article class="post-item">
              <h3>No posts yet</h3>
              <p>Create a markdown file in personal/content/posts and run indie publish.</p>
            </article>
        `;
        return;
    }

        const postsToRender = showAllPosts ? posts : posts.slice(0, 3);

        const recentMarkup = postsToRender.map((post) => `
      <article class="post-item">
        <h3><a href="${post.href}">${post.title}</a></h3>
        <p class="post-meta">${formatPostDate(post.date)} • ${post.tag}</p>
        <p>${post.summary}</p>
      </article>
    `).join("");

    recentPostsList.innerHTML = recentMarkup;
}

function renderSiteMapPosts(posts) {
    const siteMapPosts = document.getElementById("siteMapPosts");
    if (!siteMapPosts) {
        return;
    }

    if (!posts.length) {
        siteMapPosts.innerHTML = "<li>No post links yet.</li>";
        return;
    }

    siteMapPosts.innerHTML = posts.slice(0, 6)
        .map((post) => `<li><a href="${post.href}">${post.title}</a></li>`)
        .join("");
}

async function initPostManifestContent() {
    const hasHomePostTargets = document.getElementById("recentPostsList") || document.getElementById("siteMapPosts");
    if (!hasHomePostTargets) {
        return;
    }

    try {
        const response = await fetch(POSTS_MANIFEST_PATH);
        if (!response.ok) {
            throw new Error(`Unable to load post manifest: ${POSTS_MANIFEST_PATH}`);
        }

        const posts = await response.json();
        if (!Array.isArray(posts)) {
            throw new Error("Invalid post manifest format.");
        }

        renderRecentPosts(posts);
        renderSiteMapPosts(posts);
    } catch (error) {
        console.error(error);
    }
}

initPostManifestContent();

// Optional parallax effect on scroll
let ticking = false;
window.addEventListener("scroll", () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const y = window.scrollY * 0.1;
            document.body.style.backgroundPosition = `0 ${y}px`;
            ticking = false;
        });
        ticking = true;
    }
});
