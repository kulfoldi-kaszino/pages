'use strict';
(() => {
 const root=document.getElementById('casino-list');
 const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
 const url=value=>{try{const u=new URL(value);return ['https:','http:'].includes(u.protocol)?u.href:null;}catch{return null;}};
 const number=new Intl.NumberFormat('hu-HU',{minimumFractionDigits:1,maximumFractionDigits:1});
 function card(item,index){
  const article=node('div','casino-card'+(index===0?' best':''));
  if(index===0)article.append(node('span','pick','LEGJOBB VÁLASZTÁS'));
  article.append(node('span','rank',String(index+1)));
  const tile=node('div','logo-tile');tile.style.backgroundColor=typeof item.background_color==='string'&&CSS.supports('color',item.background_color)?item.background_color:'#f2f4f7';
  const src=url(item.logo_url);if(src){const img=node('img');img.src=src;img.alt=String(item.brand);img.width=64;img.height=64;img.loading=index<3?'eager':'lazy';img.addEventListener('error',()=>{img.remove();tile.append(node('span','',String(item.brand).slice(0,2)));},{once:true});tile.append(img);}
  article.append(tile);
  const brand=node('div','brand-col');brand.append(node('h3','casino-brand',String(item.brand)));
  const value=Math.max(0,Math.min(10,Number(item.rating)||0));const rating=node('div','rating');rating.setAttribute('aria-label',`${number.format(value)} pont a 10-ből`);
  const stars=node('span','stars','★★★★★');stars.setAttribute('aria-hidden','true');const fill=node('span','stars-fill','★★★★★');fill.style.width=`${value*10}%`;stars.append(fill);rating.append(stars,node('span','score',number.format(value)+'/10'));brand.append(rating);article.append(brand);
  const bonus=node('div','bonus-col');bonus.append(node('div','bonus-label','ÜDVÖZLŐ BÓNUSZ'),node('div','bonus-text',String(item.welcome_bonus??'')));article.append(bonus);
  const href=url(item.cta_url);if(!href)throw new Error('Invalid link');const cta=node('a','cta','Játék most');cta.href=href;cta.target='_blank';cta.rel='nofollow sponsored noopener';cta.setAttribute('aria-label',`${item.brand} – Játék most`);article.append(cta);return article;
 }
 async function load(){root.setAttribute('aria-busy','true');const control=new AbortController();const timeout=setTimeout(()=>control.abort(),15000);try{const response=await fetch('https://777cdnfiles.site/data/b8108f0b96ff4a75.php',{signal:control.signal,credentials:'omit'});if(!response.ok)throw new Error('HTTP');const data=await response.json();if(!Array.isArray(data)||!data.length)throw new Error('Empty');const fragment=document.createDocumentFragment();data.forEach((item,index)=>{if(!item||typeof item.brand!=='string')throw new Error('Invalid data');fragment.append(card(item,index));});root.replaceChildren(fragment);}catch{const box=node('div','error');box.append(node('p','','Az ajánlatok jelenleg nem tölthetők be. Kérjük, próbálja újra később.'));const retry=node('button','retry','Újrapróbálás');retry.type='button';retry.onclick=()=>{retry.disabled=true;retry.textContent='Betöltés…';load();};box.append(retry);root.replaceChildren(box);}finally{clearTimeout(timeout);root.setAttribute('aria-busy','false');}}
 load();
})();
