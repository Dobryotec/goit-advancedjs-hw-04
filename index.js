import{a as d,S as L,i as c}from"./assets/vendor-Dp7Ig4E2.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();d.defaults.baseURL="https://pixabay.com/api/";const p=async({page:l,perPage:r,query:a})=>{const o={page:l,per_page:r,q:a,key:"33694347-6ae8de5621b95f7febdf77706",image_type:"photo",orientation:"horizontal",safesearch:!0};return(await d.get("",{params:o})).data},m=({largeImageURL:l,webformatURL:r,tags:a,likes:o,views:e,comments:t,downloads:n})=>`<li class="gallery-item">
  <a href="${l}" class="gallery-link">
  <img class="gallery-image" src="${r}" alt="${a}"/>
  </a>
  <ul class="gallery-interactions-block">
  <li class="gallery-interactions-item"><span class="gallery-interactions-activity">Likes</span><span class="gallery-activity-quantity">${o}</span></li>
  <li class="gallery-interactions-item"><span class="gallery-interactions-activity">Views</span><span class="gallery-activity-quantity">${e}</span></li>
  <li class="gallery-interactions-item"><span class="gallery-interactions-activity">Comments</span><span class="gallery-activity-quantity">${t}</span></li>
  <li class="gallery-interactions-item"><span class="gallery-interactions-activity">Downloads</span><span class="gallery-activity-quantity">${n}</span></li>
  </ul>
  </li>`,u=document.querySelector("#js-form"),b=document.querySelector("#js-input"),y=document.querySelector("#js-gallery"),g=document.querySelector(".loader"),s=document.querySelector("#js-btn-load-more"),f=new L(".gallery a",{captionDelay:250,captionsData:"alt"}),i={page:1,perPage:15,query:"",totalPages:1};u.addEventListener("submit",v);async function v(l){l.preventDefault();const r=b.value.trim();if(i.query=r,y.innerHTML="",r===""){u.reset();return}g.classList.add("block"),s.classList.remove("block"),i.page=1;try{const a=await p(i),o=a.totalHits;if(i.totalPages=Math.ceil(o/i.perPage),a.hits.length===0)return c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});y.innerHTML=a.hits.map(m).join(""),f.refresh(),i.totalPages>i.page&&(s.classList.add("block"),s.addEventListener("click",h))}catch{c.error({title:"Error",message:"An error occurred while fetching the images. Please try again later!",position:"topRight"})}finally{g.classList.remove("block"),u.reset()}}async function h(){i.page+=1,s.textContent="Loading...",s.disabled=!0,s.classList.add("cursor");try{const{hits:l}=await p(i),r=l.map(m).join("");y.insertAdjacentHTML("beforeend",r),f.refresh();const a=document.querySelector(".gallery-item"),{height:o}=a.getBoundingClientRect();window.scrollBy({top:o*3,behavior:"smooth"}),s.textContent="Load more",s.disabled=!1,s.classList.remove("cursor"),i.totalPages===i.page&&(s.classList.remove("block"),s.removeEventListener("click",h),c.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{c.error({title:"Error",message:"An error occurred while fetching the images. Please try again later!",position:"topRight"})}}
//# sourceMappingURL=index.js.map
