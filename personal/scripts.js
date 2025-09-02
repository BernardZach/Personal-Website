// scripts.js

// directory for backgrounds
const TILE_DIR = "./assets/background/";

// default/random poolq                                     
const RANDOM_POOL = [
    "nightSkyAnimatedBG.gif",
    "nightSkyCloudsAnimatedBG.gif"];

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
}

initTileFromState();

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
