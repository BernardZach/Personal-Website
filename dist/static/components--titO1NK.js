(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=i(t);fetch(t.href,o)}})();function u(){const n=window.location.pathname,e=window.location.hash;return n.includes("index.html")||n==="/"?e==="#about"?"About Me":e==="#experience"?"Experience":e==="#resume"?"Resume":"Home":n.includes("blog.html")?"Blog Posts":""}function c(){const n=u();document.querySelectorAll(".fixed-menu .item").forEach(e=>{e.classList.toggle("active",e.textContent.trim()===n)}),document.querySelectorAll(".secondary-menu .item").forEach(e=>{e.classList.toggle("active",e.textContent.trim()===n)})}function m(){return`
    <div class="ui large top fixed hidden menu">
        <div class="ui container">
            <a href="/" class="item">Home</a>
            <a href="/#about" class="item">About Me</a>
            <a href="/#experience" class="item">Experience</a>
            <a href="/#skills" class="item">Skills</a>
            <a href="/blog" class="item">Blog Posts</a>
            <div class="right menu">
                <div class="item">
                    <a href="./ZachBernardResume.pdf" download class="ui primary button">Download Resume</a>
                </div>
            </div>
        </div>
    </div>`}function f(){return`
    <div class="ui large secondary inverted pointing menu">
        <a href="/" class="item">Home</a>
        <a href="/#about" class="item">About Me</a>
        <a href="/#experience" class="item">Experience</a>
        <a href="/#skills" class="item">Skills</a>
        <a href="/blog" class="item">Blog Posts</a>
        <div class="right menu">
            <div class="item">
                <a href="./ZachBernardResume.pdf" download class="ui primary button">Download Resume</a>
            </div>
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
    </div>`}function v(){document.querySelector(".fixed-menu").innerHTML=m(),document.querySelector(".secondary-menu").innerHTML=f(),document.querySelector(".footer").innerHTML=h(),p(),c()}function p(){const n=document.querySelector(".masthead")||document.querySelector(".masthead-short");n&&$(n).visibility({once:!1,onBottomPassed:function(){$(".fixed.menu").transition("fade in")},onBottomPassedReverse:function(){$(".fixed.menu").transition("fade out")}}),$(".ui.sidebar").sidebar("attach events",".toc.item")}async function g(){const n=document.querySelector("#blog-content"),e=Object.assign({});let i='<div class="ui styled fluid accordion">';for(const s in e){const o=(await e[s]()).html,a=/<h1>(.*?)<\/h1>\s*<p>(.*?)<\/p>/,r=o.match(a),d=r?r[1]:"Untitled",l=r?r[2]:"No description provided.";i+=`
            <div class="title">
                <i class="dropdown icon"></i>
                ${d}
                <p style="margin: 0; font-size: 0.9em; color: gray;">${l}</p>
            </div>
            <div class="content">
                ${o} <!-- Parsed markdown content -->
            </div>
        `}i+="</div>",n.innerHTML=i,$(".ui.accordion").accordion()}document.addEventListener("DOMContentLoaded",g);window.addEventListener("hashchange",()=>{c()});document.addEventListener("DOMContentLoaded",v);document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector(".hamburger"),e=document.querySelector(".mobile-menu");function i(){e.innerHTML=`
            <a href="/" class="item">Home</a>
            <a href="/#about" class="item">About Me</a>
            <a href="/#experience" class="item">Experience</a>
            <a href="/#resume" class="item">Resume</a>
            <a href="/blog" class="item">Blog Posts</a>
            <a href="./ZachBernardResume.pdf" download>Download Resume</a>
        `}function s(){e.classList.toggle("open")}function t(){window.innerWidth<=768?(n.style.display="block",e.style.display="flex"):(n.style.display="none",e.style.display="none",e.classList.remove("open"))}n.addEventListener("click",s),window.addEventListener("resize",t),i(),t()});
