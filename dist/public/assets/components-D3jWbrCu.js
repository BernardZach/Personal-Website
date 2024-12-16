(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function a(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(e){if(e.ep)return;e.ep=!0;const i=a(e);fetch(e.href,i)}})();function c(){const n=window.location.pathname,t=window.location.hash;return n.includes("index.html")||n==="/"?t==="#about"?"About Me":t==="#experience"?"Experience":t==="#resume"?"Resume":"Home":n.includes("blog.html")?"Blog Posts":""}function s(){const n=c();document.querySelectorAll(".fixed-menu .item").forEach(t=>{t.classList.toggle("active",t.textContent.trim()===n)}),document.querySelectorAll(".secondary-menu .item").forEach(t=>{t.classList.toggle("active",t.textContent.trim()===n)})}function d(){return`
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
    </div>`}function u(){return`
    <div class="ui large secondary inverted pointing menu">
        <a href="index.html" class="item">Home</a>
        <a href="index.html#about" class="item">About Me</a>
        <a href="index.html#experience" class="item">Experience</a>
        <a href="index.html#resume" class="item">Resume</a>
        <a href="blog.html" class="item">Blog Posts</a>
        <div class="right item">
            <a href="../../public/assets/ZachBernardResume.pdf" download class="ui inverted button">Download Resume</a>
        </div>
    </div>`}function l(){return`
    <div class="ui inverted vertical footer segment">
        <div class="ui container">
            <div class="ui stackable inverted divided equal height stackable grid">
                <div class="seven wide column">
                    <h4 class="ui inverted header">Contact</h4>
                    <p>Zach Bernard | bernardzach00@gmail.com | (270) 585-7616</p>
                </div>
            </div>
        </div>
    </div>`}function m(){document.querySelector(".fixed-menu").innerHTML=d(),document.querySelector(".secondary-menu").innerHTML=u(),document.querySelector(".footer").innerHTML=l(),f(),s()}function f(){const n=document.querySelector(".masthead")||document.querySelector(".masthead-short");n&&$(n).visibility({once:!1,onBottomPassed:function(){$(".fixed.menu").transition("fade in")},onBottomPassedReverse:function(){$(".fixed.menu").transition("fade out")}}),$(".ui.sidebar").sidebar("attach events",".toc.item")}window.addEventListener("hashchange",()=>{s()});document.addEventListener("DOMContentLoaded",m);
