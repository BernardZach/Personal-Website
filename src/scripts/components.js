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
            <a href="index.html" class="item">Home</a>
            <a href="index.html#about" class="item">About Me</a>
            <a href="index.html#experience" class="item">Experience</a>
            <a href="index.html#resume" class="item">Resume</a>
            <a href="blog.html" class="item">Blog Posts</a>
            <div class="right menu">
                <div class="item">
                    <a href="../../public/assets/ZachBernardResume.pdf" download class="ui primary button">Download Resume</a>
                </div>
            </div>
        </div>
    </div>`;
}

// Function to load the Secondary Menu
function loadSecondaryMenu() {
    return `
    <div class="ui large secondary inverted pointing menu">
        <a href="index.html" class="item">Home</a>
        <a href="index.html#about" class="item">About Me</a>
        <a href="index.html#experience" class="item">Experience</a>
        <a href="index.html#resume" class="item">Resume</a>
        <a href="blog.html" class="item">Blog Posts</a>
        <div class="right item">
            <a href="../../public/assets/ZachBernardResume.pdf" download class="ui inverted button">Download Resume</a>
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
                    <p>Zach Bernard | bernardzach00@gmail.com | (270) 585-7616</p>
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

// Listen for hash changes to dynamically update active menu items
window.addEventListener('hashchange', () => {
    setActiveMenuItems();
});

// Load components on page load
document.addEventListener('DOMContentLoaded', loadComponents);
