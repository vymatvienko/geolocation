!function(){"use strict";class t{constructor(){this.postArray=[]}}let e="[]";const s=document.querySelector("#add-coords-modal"),o=document.querySelector("#add-post"),i=new class{constructor(){}bindToDOM(t){if(!(t instanceof HTMLElement))throw new Error("container is not HTMLElement");this.container=t}drawUi(){this.checkBinding()}checkBinding(){if(null===this.container)throw new Error("PostList not bind to DOM")}};i.bindToDOM(document.querySelector(".container"));const n=new class{constructor(t){this.storage=t}save(t){this.storage.setItem("posts",JSON.stringify(t))}load(){try{return JSON.parse(this.storage.getItem("posts"))}catch(t){throw new Error("Invalid state")}}}(localStorage),r=new class{constructor(e,s){this.postList=e,this.stateService=s,this.postContainer=document.querySelector(".post-list"),this.postState=new t}init(){this.postList.drawUi(),o.addEventListener("submit",(t=>{t.preventDefault(),this.onAddPostClick()})),o.addEventListener("reset",(t=>{t.preventDefault(),this.onAddPostCancel()})),s.addEventListener("submit",(t=>{t.preventDefault(),this.onAddCoordsClick()})),s.addEventListener("reset",(t=>{t.preventDefault(),this.onAddCoordsCancel()})),this.redrawPostList()}redrawPostList(){const t=Array.from(document.querySelectorAll(".post"));for(let e=0;e<t.length;e++)t[e].remove();const e=this.stateService.load();if(e){this.postState.postArray=e.postArray;for(let t=0;t<this.postState.postArray.length;t++){const e=document.createElement("div");e.classList.add("post");const s=document.createElement("div");s.classList.add("post-time"),s.textContent=this.postState.postArray[t].time;const o=document.createElement("div");o.classList.add("post-text"),o.textContent=this.postState.postArray[t].text;const i=document.createElement("div");i.classList.add("post-coords"),i.textContent=this.postState.postArray[t].coords;const n=document.createElement("button");n.classList.add("del-post-btn","visually-hidden"),this.postContainer.appendChild(e),e.appendChild(s),e.appendChild(o),e.appendChild(i),e.appendChild(n),e.addEventListener("mouseenter",(t=>{t.preventDefault(),t.target.children[3].classList.remove("visually-hidden")})),e.addEventListener("mouseleave",(t=>{t.preventDefault(),t.target.children[3].classList.add("visually-hidden")})),n.addEventListener("click",(t=>{t.preventDefault(),this.postState.postArray=this.postState.postArray.filter((t=>t.text!==o.textContent)),this.stateService.save(this.postState),this.redrawPostList()}))}}}onAddPostClick(){"[]"===e&&navigator.geolocation&&navigator.geolocation.getCurrentPosition((t=>{const{latitude:s,longitude:o}=t.coords;e=`[${s}, ${o}]`}),(t=>{o.classList.add("visually-hidden"),s.classList.remove("visually-hidden")}),{enableHighAccuracy:!0}),setTimeout((()=>{if("[]"!==e){const t=o.querySelector(".add-post-input"),s=(new Date).toLocaleDateString("ru",{year:"2-digit",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"});this.postState.postArray.unshift({time:s,text:t.value,coords:e}),t.value="",this.stateService.save(this.postState),e="[]",this.redrawPostList()}}),150)}onAddPostCancel(){o.querySelector(".add-post-input").value=""}onAddCoordsClick(){const t=document.querySelector(".add-coords-input");if(!0===(i=t.value,/^(\[?-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?),\s?(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)\]?$/.test(i))){e=t.value,"["!==e.substring(0,1)&&(e=`[${e}`),"]"!==e.substring(e.length-1)&&(e+="]");const i=e.indexOf(",");" "!==e.substring(i+1,i+2)&&(e=`${e.substring(0,i+1)} ${e.substring(i+1)}`),this.onAddPostClick(),s.classList.add("visually-hidden"),o.classList.remove("visually-hidden")}else alert("Неверный формат координат");var i}onAddCoordsCancel(){s.classList.add("visually-hidden"),o.classList.remove("visually-hidden")}}(i,n);r.init()}();