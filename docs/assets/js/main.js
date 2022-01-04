"use strict";const inputText=document.querySelector(".js-input-text"),animeList=document.querySelector(".js-list"),listFavourites=document.querySelector(".js-favourites"),DEFAULT_IMAGE="https://via.placeholder.com/210x295/ffffff/666666/?text=TV";let seriesList=[],favouritesAnime=[];function getDataFromApi(e){e.preventDefault(),animeList.innerHTML="",fetch("https://api.jikan.moe/v3/search/anime?q="+inputText.value).then(e=>e.json()).then(e=>{seriesList=e.results,renderAnimeList(seriesList)})}function renderAnimeList(e){for(const t of e){let e=document.createElement("li");e.classList.add("anime"),animeList.appendChild(e),e.innerHTML+=`<img data-id="${t.mal_id}"  class="img" src="${t.image_url?t.image_url:DEFAULT_IMAGE}"  />`,e.innerHTML+=`<p>${t.title}</p>`,e.addEventListener("click",addToFav),favouritesAnime.find(e=>parseInt(e.mal_id)===t.mal_id)&&e.classList.add("select-border")}}function addToFav(e){const t=e.target.dataset.id;if(void 0===favouritesAnime.find(e=>e.mal_id===t))for(const i of seriesList)i.mal_id===parseInt(t)&&(favouritesAnime.push({mal_id:""+i.mal_id,image_url:""+i.image_url,title:""+i.title}),localStorage.setItem("favourite_animes",JSON.stringify(favouritesAnime)),e.currentTarget.classList.add("select-border"),renderFavouriteAnime(i));else deleteFav(t)}function renderFavouriteAnime(e){let t=document.createElement("li");t.setAttribute("data-id",""+e.mal_id),t.classList.add("favs-anime"),listFavourites.appendChild(t),t.innerHTML+=`<img class="img__fav" src="${e.image_url?e.image_url:DEFAULT_IMAGE}" />`,t.innerHTML+=`<p>${e.title}</p>`,t.appendChild(createInput(e.mal_id))}function createInput(e){let t=document.createElement("input");return t.setAttribute("type","submit"),t.setAttribute("value","x"),t.setAttribute("data-id",""+e),t.classList.add("btnx"),t.addEventListener("click",deleteFavAnime),t}function loadFavAnimes(){localStorage.getItem("favourite_animes")&&(favouritesAnime=JSON.parse(localStorage.getItem("favourite_animes")));for(const e of favouritesAnime)renderFavouriteAnime(e)}function handleResetBtn(e){e.preventDefault(),animeList.innerHTML="",inputText.value=""}function handleResetBtnFav(e){e.preventDefault(),listFavourites.innerHTML="",favouritesAnime=[],localStorage.clear()}function deleteFavAnime(e){e.preventDefault();deleteFav(e.target.dataset.id)}function deleteFav(e){let t=favouritesAnime.findIndex(t=>t.mal_id===e);favouritesAnime.splice(t,1),localStorage.setItem("favourite_animes",JSON.stringify(favouritesAnime));let i=document.querySelector(`li[data-id="${e}"]`);if(listFavourites.removeChild(i),void 0!==seriesList.find(t=>t.mal_id===parseInt(e))){document.querySelector(`img[data-id="${e}"]`).parentElement.classList.remove("select-border")}}function listenEvents(){const e=document.querySelector(".js-btn-search"),t=document.querySelector(".js-btn-reset"),i=document.querySelector(".js-reset-fav");e.addEventListener("click",getDataFromApi),t.addEventListener("click",handleResetBtn),i.addEventListener("click",handleResetBtnFav)}inputText.value="",loadFavAnimes(),listenEvents();