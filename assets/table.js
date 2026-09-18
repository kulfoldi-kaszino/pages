
fetch('https://777cdnfiles.site/data/b8108f0b96ff4a75.php')
.then(r=>r.json()).then(data=>{
const box=document.querySelector('#casino-table');
data.forEach((c,i)=>{
box.innerHTML+=`
<div class="top-card">
<div class="rank">${i+1}</div>
<div class="logo" style="background:${c.background_color||'#f2f4f7'}"><img src="${c.logo_url}"></div>
<div><b>${c.brand}</b><br>★★★★★<br>${c.rating}/10</div>
<div><small>Üdvözlő bónusz</small><br><b>${c.welcome_bonus}</b></div>
<a class="cta" href="${c.cta_url}" target="_blank" rel="nofollow sponsored noopener">Játssz most</a>
</div>`
})
})
