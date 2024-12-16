// scripts/components.js

// Function to load the Fixed Menu
function loadFixedMenu() {
    return `
    <div class="ui large top fixed hidden menu">
        <div class="ui container">
            <a href="index.html" class="item">Home</a>
            <a href="#about" class="item">About Me</a>
            <a href="#experience" class="item">Experience</a>
            <a href="#resume" class="item">Resume</a>
            <a href="blog.html" class="item">Blog Posts</a>
            <div class="right menu">
                <div class="item">
                    <a href="assets/ZachBernardResume.pdf" download class="ui primary button">Download Resume</a>
                </div>
            </div>
        </div>
    </div>`;
}

// Function to load the Secondary Menu
function loadSecondaryMenu() {
    return `
    <div class="ui large secondary inverted pointing menu">
        <a href="index.html" class="active item">Home</a>
        <a href="#about" class="item">About Me</a>
        <a href="#experience" class="item">Experience</a>
        <a href="#resume" class="item">Resume</a>
        <a href="blog.html" class="item">Blog Posts</a>
        <div class="right item">
            <a href="assets/ZachBernardResume.pdf" download class="ui inverted button">Download Resume</a>
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
}

// Function to initialize scrolling behavior for the menu
function initializeScrollingBehavior() {
    $('.masthead').visibility({
        once: false,
        onBottomPassed: function () {
            $('.fixed.menu').transition('fade in');
        },
        onBottomPassedReverse: function () {
            $('.fixed.menu').transition('fade out');
        }
    });

}

// Load components on page load
document.addEventListener('DOMContentLoaded', loadComponents);
