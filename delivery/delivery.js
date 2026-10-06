import {loadManifest,mountAnimation} from './runtime/mount.js';
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const base=new URL('./',import.meta.url);
const fileURL=f=>new URL('../'+f,base).href;
const routeURL=route=>{
  // Same-origin file routes also work in the downloadable static snapshot.
  const u=new URL(route,location.origin);
  if(u.pathname==='/qa')u.pathname='/qa/index.html';
  else if(u.pathname.startsWith('/qa/')&&!/\.[a-z]+$/.test(u.pathname))u.pathname+='.html';
  else if(u.pathname==='/delivery')u.pathname='/delivery/index.html';
  return u.href;
};
let data,control,selected,selectionToken=0,paused=matchMedia('(prefers-reduced-motion:reduce)').matches,toastTimer,dialogToken=0,returnFocus;
const dialog=$('#delivery-dialog');
function toast(message){$('#toast').textContent=message;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').textContent='',4000);}
function beginDialog(title,url){
  returnFocus=document.activeElement;
  $('#dialog-title').textContent=title;$('#dialog-external').href=url;$('#dialog-body').replaceChildren();
  if(!dialog.open)dialog.showModal();
  $('#dialog-close').focus();
}
function closeDialog(){dialog.close();}
dialog.addEventListener('close',()=>{dialogToken++;$('#dialog-body').replaceChildren();returnFocus?.focus();});
$('#dialog-close').addEventListener('click',closeDialog);
dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))closeDialog();});
function inline(s){
  return esc(s).replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^ )]+|mailto:[^ )]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>');
}
function markdown(text){
  const lines=text.split('\n');let html='',paragraph=[],list=false,code=false,buffer=[];
  const flush=()=>{if(paragraph.length){html+='<p>'+inline(paragraph.join(' '))+'</p>';paragraph=[];}if(list){html+='</ul>';list=false;}};
  for(let i=0;i<lines.length;i++){
    const line=lines[i];
    if(line.startsWith('```')){flush();if(code){html+='<pre><code>'+esc(buffer.join('\n'))+'</code></pre>';buffer=[];}code=!code;continue;}
    if(code){buffer.push(line);continue;}
    if(line.startsWith('|')&&lines[i+1]?.match(/^\|[\s:|-]+\|$/)){
      flush();const cells=l=>l.slice(1,-1).split(/(?<!\\)\|/).map(c=>inline(c.trim().replaceAll('\\|','|')));
      html+='<div class="table-wrap"><table><thead><tr>'+cells(line).map(c=>'<th>'+c+'</th>').join('')+'</tr></thead><tbody>';i+=2;
      while(lines[i]?.startsWith('|')){html+='<tr>'+cells(lines[i]).map(c=>'<td>'+c+'</td>').join('')+'</tr>';i++;}
      i--;html+='</tbody></table></div>';continue;
    }
    const h=line.match(/^(#{1,4}) (.*)$/);
    if(h){flush();html+=`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`;continue;}
    const li=line.match(/^(?:- |\d+\. )(.*)$/);
    if(li){if(paragraph.length){html+='<p>'+inline(paragraph.join(' '))+'</p>';paragraph=[];}if(!list){html+='<ul>';list=true;}html+='<li>'+inline(li[1])+'</li>';continue;}
    if(!line.trim()){flush();continue;}
    paragraph.push(line);
  }
  flush();return html;
}
async function openDoc(name){
  if(!/^[a-z0-9/-]+\.md$/.test(name))return;
  const token=++dialogToken,url=new URL(name,base).href;
  beginDialog(name.replaceAll('-',' ').replace('.md',''),url);
  $('#dialog-body').innerHTML='<div class="document"><p>Loading document…</p></div>';
  try{const r=await fetch(url);if(!r.ok)throw Error('Document unavailable. Please use the source pack.');const txt=await r.text();if(token!==dialogToken||!dialog.open)return;$('#dialog-body').innerHTML='<article class="document">'+markdown(txt)+'</article>';}
  catch(e){if(token===dialogToken)$('#dialog-body').innerHTML='<div class="document"><p>'+esc(e.message)+'</p></div>';}
}
function openDemo(p){
  ++dialogToken;const url=routeURL(p.route);
  beginDialog(p.title,url);
  const frame=document.createElement('iframe');frame.title=p.title+' working QA reference';frame.src=url;frame.allow='clipboard-write';$('#dialog-body').appendChild(frame);
}
document.addEventListener('click',e=>{
  const doc=e.target.closest('[data-doc]');if(doc){openDoc(doc.dataset.doc);return;}
  const pick=e.target.closest('[data-select]');if(pick){selectAnimation(pick.dataset.select);$('#animations').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});return;}
  const preview=e.target.closest('[data-demo]');if(preview){const p=[...data.pages,...data.extras].find(p=>p.slug===preview.dataset.demo);if(p)openDemo(p);}
});
function renderAnimations(){
  const q=$('#animation-search').value.toLowerCase();
  const arr=data.animations.filter(a=>`${a.name} ${a.key} ${a.page}`.toLowerCase().includes(q));
  $('#animation-list').innerHTML=arr.length?arr.map(a=>`<button class="animation-item" data-key="${a.key}" aria-current="${a.key===selected?.key}"><b>${esc(a.name)}</b><small>${esc(a.page)} · ${a.opt===0?'Keep current':'Option '+a.opt}${a.key==='blogv'?' · Alternative':''}</small></button>`).join(''):'<p class="empty">No matching animation.</p>';
}
async function selectAnimation(key){
  const token=++selectionToken;selected=data.animations.find(a=>a.key===key);if(!selected)return;
  control?.dispose();control=null;$('#animation-art').replaceChildren();
  renderAnimations();$('#animation-context').textContent=selected.page+' / '+selected.section;
  $('#animation-title').textContent=selected.name;
  $('#animation-meta').innerHTML=[selected.decision,selected.identity,`${selected.slot.w} × ${selected.slot.h} slot`].map(x=>'<span>'+esc(x)+'</span>').join('');
  $('#animation-fit').textContent=selected.fitNote;
  $('#animation-page').href=routeURL('/qa/'+selected.page);$('#animation-source').href=fileURL(selected.runtime);
  $('#animation-code').textContent=`import { mountAnimation } from './delivery/runtime/mount.js';\nconst control = await mountAnimation(element, '${selected.key}');\n// Pause: control.setPaused(true)\n// Unmount: control.dispose()`;
  $('#animation-guide').dataset.doc='items/'+selected.key+'.md';
  updatePause();
  try{const result=await mountAnimation($('#animation-art'),key,{paused});if(token!==selectionToken){result.dispose();return;}control=result;}
  catch(e){if(token===selectionToken){$('#animation-art').textContent='Preview could not load. The source files are included in the pack.';toast(e.message);}}
}
function updatePause(){$('#motion-toggle').textContent=paused?'Resume motion':'Pause motion';$('#motion-toggle').setAttribute('aria-pressed',String(paused));}
$('#animation-list').addEventListener('click',e=>{const b=e.target.closest('[data-key]');if(b)selectAnimation(b.dataset.key);});
$('#motion-toggle').addEventListener('click',()=>{paused=!paused;control?.setPaused(paused);updatePause();});
$('#animation-search').addEventListener('input',renderAnimations);
$('#copy-code').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('#animation-code').textContent);toast('Mount snippet copied.');}catch{toast('Clipboard unavailable. Select and copy the visible snippet.');}});
function renderPages(){
  const q=$('#page-search').value.toLowerCase(),filter=$('#page-filter').value;
  const arr=[...data.extras,...data.pages].filter(p=>`${p.title} ${p.slug} ${p.kind}`.toLowerCase().includes(q)&&(filter==='all'||filter==='flows'&&data.extras.includes(p)||filter==='retained'&&(p.redesignOf||p.standaloneRedesign||p.standaloneRefinement)));
  $('#page-count').textContent=arr.length+' entries';
  $('#page-grid').innerHTML=arr.length?arr.map((p,i)=>{
    const own=data.changes.filter(c=>c.pages.includes(p.slug==='recipient'?'start':p.slug)&&c.disposition!=='History');
    const picks=data.animations.filter(a=>a.page===(p.redesignOf||p.slug));
    const summary=p.slug==='recipient'?'Unlocked gift → eligible plan → guarded activation → recipient profile.':picks.length?`${picks.length} animation ${picks.length===1?'choice':'choices'} · ${own.length} scoped change records.`:own.length?`${own.length} scoped change records. Copy, layout and interactions are part of the handoff.`:'Shared typography and page identity review. Preserve surrounding content.';
    return `<article class="page-card"><div class="page-top"><span>${esc(p.kind)}</span><span class="page-index">${String(i+1).padStart(2,'0')}</span></div><h3>${esc(p.title.replace(' — ',' · '))}</h3><p>${esc(summary)}</p><div class="actions"><button class="small-button" data-demo="${p.slug}">Open working view ↗︎</button><a class="small-button" href="${routeURL(p.route)}" target="_blank" rel="noopener">New tab</a></div><details><summary>Source files & change IDs</summary><ul class="file-list">${p.files.map(f=>`<li><a href="${fileURL(f)}" target="_blank" rel="noopener">${esc(f)}</a></li>`).join('')}</ul><p>${own.map(c=>esc(c.id)).join(' · ')||'Shared typography and fit rules.'}</p><button class="text-button" data-doc="page-matrix.md">Read implementation matrix →</button></details></article>`;
  }).join(''):'<p class="empty">No matching pages. Try another search.</p>';
}
function renderChanges(){
  const q=$('#change-search').value.toLowerCase(),filter=$('#change-filter').value;
  const arr=data.changes.filter(c=>(filter==='all'||filter==='active'&&c.disposition!=='History'||filter===c.disposition)&&JSON.stringify(c).toLowerCase().includes(q));
  $('#change-count').textContent=arr.length+' of '+data.changes.length+' records';
  $('#change-list').innerHTML=arr.length?arr.map(c=>`<details class="change" id="record-${c.id}"><summary><span class="change-type ${c.disposition==='History'?'history':''}">${esc(c.disposition)}</span><span class="change-title">${esc(c.title)}</span></summary><div class="change-body"><p class="change-status">${esc(c.id)} · ${esc(c.status)} · ${esc(c.pages.join(', '))}</p><p>${esc(c.summary)}</p><h4>Implementation note</h4><p>${esc(c.delivery)}</p>${(c.copyChanges||[]).map(x=>`<div class="copy-row"><strong>${esc(x.area)}</strong><p>Before: ${esc(x.before)}</p><p><strong>After:</strong> ${esc(x.after)}</p></div>`).join('')}${(c.newCopy||[]).map(x=>`<div class="copy-row"><strong>${esc(x.area)}</strong><p>${esc(x.text)}</p></div>`).join('')}<div class="actions"><a class="text-button" href="${routeURL(c.route)}" target="_blank" rel="noopener">Open affected view ↗︎</a>${c.changelogUrl?`<a class="text-button" href="${routeURL(c.changelogUrl)}" target="_blank" rel="noopener">Scoped changelog ↗︎</a>`:''}</div></div></details>`).join(''):'<p class="empty">No matching changes.</p>';
}
for(const id of ['page-search','page-filter'])$('#'+id).addEventListener(id.endsWith('search')?'input':'change',renderPages);
for(const id of ['change-search','change-filter'])$('#'+id).addEventListener(id.endsWith('search')?'input':'change',renderChanges);
try{data=await loadManifest();$('#change-stat').textContent=data.counts.changes;renderPages();renderChanges();await selectAnimation('referral');}
catch(e){toast('Delivery data could not load. Please reload or download the source pack.');console.error(e);}
addEventListener('pagehide',()=>control?.dispose());
