(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function o(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(t){if(t.ep)return;t.ep=!0;const n=o(t);fetch(t.href,n)}})();function u(){const i=window.location.pathname,e=window.location.hash;return i.includes("index.html")||i==="/"?e==="#about"?"About Me":e==="#experience"?"Experience":e==="#resume"?"Resume":"Home":i.includes("blog.html")?"Blog Posts":""}function c(){const i=u();document.querySelectorAll(".fixed-menu .item").forEach(e=>{e.classList.toggle("active",e.textContent.trim()===i)}),document.querySelectorAll(".secondary-menu .item").forEach(e=>{e.classList.toggle("active",e.textContent.trim()===i)})}function m(){return`
    <div class="ui large top fixed hidden menu">
        <div class="ui container">
            <a href="/index.html" class="item">Home</a>
            <a href="/index.html#about" class="item">About Me</a>
            <a href="/index.html#experience" class="item">Experience</a>
            <a href="/index.html#resume" class="item">Resume</a>
            <a href="/src/pages/blog.html" class="item">Blog Posts</a>
            <div class="right menu">
                <div class="item">
                    <a href="../../public/assets/ZachBernardResume.pdf" download class="ui primary button">Download Resume</a>
                </div>
            </div>
        </div>
    </div>`}function f(){return`
    <div class="ui large secondary inverted pointing menu">
        <a href="/index.html" class="item">Home</a>
        <a href="/index.html#about" class="item">About Me</a>
        <a href="/index.html#experience" class="item">Experience</a>
        <a href="/index.html#resume" class="item">Resume</a>
        <a href="/src/pages/blog.html" class="item">Blog Posts</a>
        <div class="right item">
            <a href="../../public/assets/ZachBernardResume.pdf" download class="ui inverted button">Download Resume</a>
        </div>
    </div>`}function h(){return`
    <div class="ui inverted vertical footer segment">
        <div class="ui container">
            <div class="ui stackable inverted divided equal height stackable grid">
                <div class="seven wide column">
                    <h4 class="ui inverted header">Contact</h4>
                    <p>Zach Bernard | bernardzach00@gmail.com | (270) 585-7616</p>
                </div>
            </div>
        </div>
    </div>`}function v(){document.querySelector(".fixed-menu").innerHTML=m(),document.querySelector(".secondary-menu").innerHTML=f(),document.querySelector(".footer").innerHTML=h(),p(),c()}function p(){const i=document.querySelector(".masthead")||document.querySelector(".masthead-short");i&&$(i).visibility({once:!1,onBottomPassed:function(){$(".fixed.menu").transition("fade in")},onBottomPassedReverse:function(){$(".fixed.menu").transition("fade out")}}),$(".ui.sidebar").sidebar("attach events",".toc.item")}async function g(){const i=document.querySelector("#blog-content"),e=Object.assign({});let o='<div class="ui styled fluid accordion">';for(const r in e){const n=(await e[r]()).html,s=/<h1>(.*?)<\/h1>\s*<p>(.*?)<\/p>/,a=n.match(s),d=a?a[1]:"Untitled",l=a?a[2]:"No description provided.";o+=`
            <div class="title">
                <i class="dropdown icon"></i>
                ${d}
                <p style="margin: 0; font-size: 0.9em; color: gray;">${l}</p>
            </div>
            <div class="content">
                ${n} <!-- Parsed markdown content -->
            </div>
        `}o+="</div>",i.innerHTML=o,$(".ui.accordion").accordion()}document.addEventListener("DOMContentLoaded",g);window.addEventListener("hashchange",()=>{c()});document.addEventListener("DOMContentLoaded",v);
