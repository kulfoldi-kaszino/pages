
const url="https://777cdnfiles.site/data/b8108f0b96ff4a75.php";
const box=document.querySelector("#top-table");
fetch(url).then(r=>r.json()).then(items=>{
box.innerHTML="";
items.forEach((x,i)=>{
const card=document.createElement("div");
card.className="casino-card"+(i===0?" top":"");
card.innerHTML=`
<div class="rank">${i+1}</div>
<div class="logo-tile" style="background:${x.background_color||'#f2f4f7'}">
<img src="${x.logo_url}" loading="${i<3?'eager':'lazy'}">
</div>
<div><b>${x.brand}</b><div class="stars">★★★★★</div><span>${x.rating}/10</span></div>
<div><div class="bonus-label">Üdvözlő bónusz</div><b>${x.welcome_bonus}</b></div>
<a class="cta" target="_blank" rel="nofollow sponsored noopener" href="${x.cta_url}">Játssz most</a>`;
box.appendChild(card);
});
}).catch(()=>box.textContent="Az adatok betöltése sikertelen.");
