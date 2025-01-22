import.meta.glob; // Needed to fetch files dynamically

// Function to determine the active menu item
function getActiveMenuItem() {
    const currentPath = window.location.pathname; // e.g., "/index.html"
    const currentHash = window.location.hash; // e.g., "#about"

    if (currentPath.includes('index.html') || currentPath === '/') {
        if (currentHash === '#about') return 'About Me';
        if (currentHash === '#experience') return 'Experience';
        if (currentHash === '#resume') return 'Resume';
        return 'Home'; // Default to Home if no hash
    }
    if (currentPath.includes('blog.html')) return 'Blog Posts';
    return ''; // Default fallback
}

// Function to dynamically set the active menu item for both menus
function setActiveMenuItems() {
    const activeItem = getActiveMenuItem();

    // Update fixed menu
    document.querySelectorAll('.fixed-menu .item').forEach((item) => {
        item.classList.toggle('active', item.textContent.trim() === activeItem);
    });

    // Update secondary menu
    document.querySelectorAll('.secondary-menu .item').forEach((item) => {
        item.classList.toggle('active', item.textContent.trim() === activeItem);
    });
}

// Function to load the Fixed Menu
function loadFixedMenu() {
    return `
    <div class="ui large top fixed hidden menu">
        <div class="ui container">
            <a href="/index.html" class="item">Home</a>
            <a href="/index.html#about" class="item">About Me</a>
            <a href="/index.html#experience" class="item">Experience</a>
            <a href="/index.html#resume" class="item">Resume</a>
            <a href="/src/pages/blog" class="item">Blog Posts</a>
            <div class="right menu">
                <div class="item">
                    <a href="/public/assets/ZachBernardResume.pdf" download class="ui primary button">Download Resume</a>
                </div>
            </div>
        </div>
    </div>`;
}

// Function to load the Secondary Menu
function loadSecondaryMenu() {
    return `
    <div class="ui large secondary inverted pointing menu">
        <a href="/index.html" class="item">Home</a>
        <a href="/index.html#about" class="item">About Me</a>
        <a href="/index.html#experience" class="item">Experience</a>
        <a href="/index.html#resume" class="item">Resume</a>
        <a href="/src/pages/blog" class="item">Blog Posts</a>
        <div class="right item">
            <a href="/public/assets/ZachBernardResume.pdf" download class="ui inverted button">Download Resume</a>
        </div>
    </div>`;
}

// Function to load the Footer
function loadFooter() {
    return `
    <div class="ui inverted vertical footer segment">
        <div class="ui container">
            <div class="ui stackable inverted divided equal height stackable grid">
                <div class="seven wide column">
                    <h4 class="ui inverted header">Contact</h4>
                    <p>Zach Bernard </p>
                    <p>bernardzach00@gmail.com </p>
                    <p>(270) 585-7616 </p>
                </div>
            </div>
        </div>
    </div>`;
}

// Function to dynamically inject components into the page
function loadComponents() {
    document.querySelector('.fixed-menu').innerHTML = loadFixedMenu();
    document.querySelector('.secondary-menu').innerHTML = loadSecondaryMenu();
    document.querySelector('.footer').innerHTML = loadFooter();

    // Initialize scrolling behavior after content is loaded
    initializeScrollingBehavior();

    // Set active menu items on initial load
    setActiveMenuItems();
}

// Function to initialize scrolling behavior for the menu
function initializeScrollingBehavior() {
    const masthead = document.querySelector('.masthead') || document.querySelector('.masthead-short');

    if (masthead) {
        $(masthead).visibility({
            once: false,
            onBottomPassed: function () {
                $('.fixed.menu').transition('fade in');
            },
            onBottomPassedReverse: function () {
                $('.fixed.menu').transition('fade out');
            }
        });
    }

    // Attach sidebar behavior
    $('.ui.sidebar').sidebar('attach events', '.toc.item');
}

// Function to dynamically load and render blog posts
async function loadBlogPosts() {
    const blogContainer = document.querySelector('#blog-content'); // Target container
    const blogFiles = import.meta.glob('../blogs/*.md'); // Fetch all markdown files

    let blogHTML = `<div class="ui styled fluid accordion">`;

    // Loop through each markdown file
    for (const path in blogFiles) {
        const module = await blogFiles[path](); // Load markdown module
        const htmlContent = module.html; // Use parsed HTML from markdown plugin

        // Extract metadata using regex
        const metadataRegex = /<h1>(.*?)<\/h1>\s*<p>(.*?)<\/p>/; // Example regex to find title & description
        const metadataMatch = htmlContent.match(metadataRegex);

        const title = metadataMatch ? metadataMatch[1] : "Untitled";
        const description = metadataMatch ? metadataMatch[2] : "No description provided.";

        // Append a Semantic UI Accordion entry
        blogHTML += `
            <div class="title">
                <i class="dropdown icon"></i>
                ${title}
                <p style="margin: 0; font-size: 0.9em; color: gray;">${description}</p>
            </div>
            <div class="content">
                ${htmlContent} <!-- Parsed markdown content -->
            </div>
        `;
    }

    blogHTML += `</div>`;
    blogContainer.innerHTML = blogHTML;

    // Initialize Semantic UI Accordion
    $('.ui.accordion').accordion();
}


// Function to parse markdown content and extract frontmatter
function parseMarkdown(markdown) {
    const frontmatterRegex = /---\n([\s\S]+?)\n---/;
    const match = markdown.match(frontmatterRegex);

    let frontmatter = {};
    let content = markdown;

    if (match) {
        const yaml = match[1];
        content = markdown.replace(frontmatterRegex, '');

        // Convert YAML to object
        yaml.split('\n').forEach(line => {
            const [key, ...value] = line.split(':');
            frontmatter[key.trim()] = value.join(':').trim().replace(/"/g, '');
        });
    }

    return { frontmatter, html: marked(content) }; // `marked` parses markdown to HTML
}

// Load blog posts on DOMContentLoaded
document.addEventListener('DOMContentLoaded', loadBlogPosts);

// Listen for hash changes to dynamically update active menu items
window.addEventListener('hashchange', () => {
    setActiveMenuItems();
});

// Load components on page load
document.addEventListener('DOMContentLoaded', loadComponents);

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    // Load mobile menu content
    function loadMobileMenuContent() {
        mobileMenu.innerHTML = `
            <a href="/index.html" class="item">Home</a>
            <a href="/index.html#about" class="item">About Me</a>
            <a href="/index.html#experience" class="item">Experience</a>
            <a href="/index.html#resume" class="item">Resume</a>
            <a href="/src/pages/blog" class="item">Blog Posts</a>
            <a href="/public/assets/ZachBernardResume.pdf" download>Download Resume</a>
        `;
    }

    // Toggle mobile menu visibility
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('open');
    }

    // Show/hide menus based on screen width
    function manageMenusOnResize() {
        if (window.innerWidth <= 768) {
            hamburgerButton.style.display = 'block'; // Show hamburger button
            mobileMenu.style.display = 'flex'; // Prepare mobile menu
        } else {
            hamburgerButton.style.display = 'none'; // Hide hamburger button
            mobileMenu.style.display = 'none'; // Hide mobile menu
            mobileMenu.classList.remove('open'); // Ensure menu is closed
        }
    }

    // Event listeners
    hamburgerButton.addEventListener('click', toggleMobileMenu);
    window.addEventListener('resize', manageMenusOnResize);

    // Initialize
    loadMobileMenuContent();
    manageMenusOnResize(); // Ensure correct menu visibility on load
});
