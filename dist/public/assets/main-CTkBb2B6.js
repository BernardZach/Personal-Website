(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();function o(){return`
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
    </div>`}function a(){return`
    <div class="ui large secondary inverted pointing menu">
        <a href="index.html" class="active item">Home</a>
        <a href="#about" class="item">About Me</a>
        <a href="#experience" class="item">Experience</a>
        <a href="#resume" class="item">Resume</a>
        <a href="blog.html" class="item">Blog Posts</a>
        <div class="right item">
            <a href="assets/ZachBernardResume.pdf" download class="ui inverted button">Download Resume</a>
        </div>
    </div>`}function d(){return`
    <div class="ui inverted vertical footer segment">
        <div class="ui container">
            <div class="ui stackable inverted divided equal height stackable grid">
                <div class="seven wide column">
                    <h4 class="ui inverted header">Contact</h4>
                    <p>Zach Bernard | bernardzach00@gmail.com | (270) 585-7616</p>
                </div>
            </div>
        </div>
    </div>`}function c(){document.querySelector(".fixed-menu").innerHTML=o(),document.querySelector(".secondary-menu").innerHTML=a(),document.querySelector(".footer").innerHTML=d(),l()}function l(){$(".masthead").visibility({once:!1,onBottomPassed:function(){$(".fixed.menu").transition("fade in")},onBottomPassedReverse:function(){$(".fixed.menu").transition("fade out")}})}document.addEventListener("DOMContentLoaded",c);
