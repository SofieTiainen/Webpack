(()=>{"use strict";const e="cfd8ad8f2d19b724a21ca2510b450da9",t="https://api.themoviedb.org/3/",n=async(n,a=1,o=void 0)=>{const c=e,r=t;let i;return i=o?await fetch(`${r}${n}?query=${o}&api_key=${c}&language=sv-SE&page=${a}`):await fetch(`${r}${n}?api_key=${c}&language=sv-SE&page=${a}`),await i.json()},a=document.querySelector("#pageNo"),o=document.querySelector("#pages");let c,r="";document.querySelector("#gotoFirst").addEventListener("click",(function(){i(1)})),document.querySelector("#gotoPrevious").addEventListener("click",(function(){let e=+a.innerHTML;e>1&&e--,i(e)})),document.querySelector("#gotoNext").addEventListener("click",(function(){const e=+o.innerHTML;let t=+a.innerHTML;t<e&&t++,i(t)})),document.querySelector("#gotoLast").addEventListener("click",(function(){i(+o.innerHTML)})),document.querySelector("#searchForm").addEventListener("submit",(async function(e){if(e.preventDefault(),r=document.querySelector("#searchInput").value,""===r)return void i();const t=await n("search/movie",1,r);s(t),l(t.results)}));const i=async(e=1)=>{c=r&&r.length>0?await n("search/movie",e,r):await n("movie/popular",e),l(c.results),s(c)},s=e=>{const t=e.total_pages>500?500:e.total_pages,n=document.querySelector("#pageNo"),a=document.querySelector("#pages");n.innerHTML=e.page,a.innerHTML=t};function l(e){document.querySelector("#top-movies").innerHTML="",e.forEach((e=>{const t=document.createElement("div");t.classList.add("card"),t.innerHTML=`\n      <a href="movie-details.html?id=${e.id}">\n        ${e.poster_path?`<img src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="${e.title}"/>`:`<img src="./assets/images/No-Image.jpg" alt="${e.title}" />`}\n      </a>\n      <div class="card-body">\n        <h5 class="card-title">${e.title}</h5>\n        <p class="card-text">\n          <small class="text-muted">Premiär datum: ${e.release_date}</small>\n        </p>\n      </div>\n    `,document.querySelector("#top-movies").appendChild(t)}))}i()})();