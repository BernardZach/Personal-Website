(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(t){if(t.ep)return;t.ep=!0;const i=s(t);fetch(t.href,i)}})();function u(){const n=window.location.pathname,e=window.location.hash;return n.includes("index.html")||n==="/"?e==="#about"?"About Me":e==="#experience"?"Experience":e==="#resume"?"Resume":"Home":n.includes("blog.html")?"Blog Posts":""}function c(){const n=u();document.querySelectorAll(".fixed-menu .item").forEach(e=>{e.classList.toggle("active",e.textContent.trim()===n)}),document.querySelectorAll(".secondary-menu .item").forEach(e=>{e.classList.toggle("active",e.textContent.trim()===n)})}function m(){return`
    <div class="ui large top fixed hidden menu">
        <div class="ui container">
            <a href="/src/pages/main" class="item">Home</a>
            <a href="/src/pages/main/index.html#about" class="item">About Me</a>
            <a href="/src/pages/main/index.html#experience" class="item">Experience</a>
            <a href="/src/pages/main/index.html#resume" class="item">Resume</a>
            <a href="/src/pages/blog" class="item">Blog Posts</a>
            <div class="right menu">
                <div class="item">
                    <a href="/public/assets/ZachBernardResume.pdf" download class="ui primary button">Download Resume</a>
                </div>
            </div>
        </div>
    </div>`}function f(){return`
    <div class="ui large secondary inverted pointing menu">
        <a href="/src/pages/main" class="item">Home</a>
        <a href="/src/pages/main/index.html#about" class="item">About Me</a>
        <a href="/src/pages/main/index.html#experience" class="item">Experience</a>
        <a href="/src/pages/main/index.html#resume" class="item">Resume</a>
        <a href="/src/pages/blog" class="item">Blog Posts</a>
        <div class="right item">
            <a href="/public/assets/ZachBernardResume.pdf" download class="ui inverted button">Download Resume</a>
        </div>
    </div>`}function h(){return`
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
    </div>`}function p(){document.querySelector(".fixed-menu").innerHTML=m(),document.querySelector(".secondary-menu").innerHTML=f(),document.querySelector(".footer").innerHTML=h(),g(),c()}function g(){const n=document.querySelector(".masthead")||document.querySelector(".masthead-short");n&&$(n).visibility({once:!1,onBottomPassed:function(){$(".fixed.menu").transition("fade in")},onBottomPassedReverse:function(){$(".fixed.menu").transition("fade out")}}),$(".ui.sidebar").sidebar("attach events",".toc.item")}async function v(){const n=document.querySelector("#blog-content"),e=Object.assign({});let s='<div class="ui styled fluid accordion">';for(const o in e){const i=(await e[o]()).html,a=/<h1>(.*?)<\/h1>\s*<p>(.*?)<\/p>/,r=i.match(a),d=r?r[1]:"Untitled",l=r?r[2]:"No description provided.";s+=`
            <div class="title">
                <i class="dropdown icon"></i>
                ${d}
                <p style="margin: 0; font-size: 0.9em; color: gray;">${l}</p>
            </div>
            <div class="content">
                ${i} <!-- Parsed markdown content -->
            </div>
        `}s+="</div>",n.innerHTML=s,$(".ui.accordion").accordion()}document.addEventListener("DOMContentLoaded",v);window.addEventListener("hashchange",()=>{c()});document.addEventListener("DOMContentLoaded",p);document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector(".hamburger"),e=document.querySelector(".mobile-menu");function s(){e.innerHTML=`
            <a href="/src/pages/main">Home</a>
            <a href="/src/pages/main/index.html#about">About Me</a>
            <a href="/src/pages/main/index.html#experience">Experience</a>
            <a href="/src/pages/main/index.html#resume">Resume</a>
            <a href="/src/pages/blog">Blog Posts</a>
            <a href="/public/assets/ZachBernardResume.pdf" download>Download Resume</a>
        `}function o(){e.classList.toggle("open")}function t(){window.innerWidth<=768?(n.style.display="block",e.style.display="flex"):(n.style.display="none",e.style.display="none",e.classList.remove("open"))}n.addEventListener("click",o),window.addEventListener("resize",t),s(),t()});
