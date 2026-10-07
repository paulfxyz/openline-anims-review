// Public handoff progress. No browser storage, credentials or shared write API.
// Only compact status flags enter the URL fragment. JSON uses stable item IDs.
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const canonical='https://openline-anims-review.vercel.app/delivery';
const allowed=new Set([0,1,3,4,5]); // applied=1, verified=2 (implies applied), blocked=4
const confirmDialog=$('#ck-confirm');
let inventory,items=[],flags=new Map(),openGroups=new Set(),lastAction='',toastTimer;
const titleMap={'*':'Shared & final checks','panel-cart-app':'Panel, cart & mobile app','start':'Activation & gifting','country-fr-redesign':'France','multiple-tier1':'Multiple Tier-1','global-esim':'Global eSIM','openline-plus':'Openline+','omdm-market':'OMDM Market','kb':'Help & compatibility','modals':'Modal builder','chat':'Support chat','home':'Home','iot':'IoT'};
const label=p=>titleMap[p]||p.split('-').map(s=>s[0]?.toUpperCase()+s.slice(1)).join(' ');
const state=id=>flags.get(id)||0;
const status=f=>f&4?'Blocked':f&2?'Verified':f&1?'Applied':'Not applied';
function notify(text){$('#toast').textContent=text;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').textContent='',4500);}
function decodeHash(){
  const h=location.hash.slice(1),pos=h.indexOf('~ol1:');
  if(pos<0)return false;
  const parts=h.slice(pos+5).split(':');
  const old=(inventory.previousInventories||[]).find(p=>p.fingerprint===parts[0]);
  if(parts.length!==2||(parts[0]!==inventory.fingerprint&&!old))throw Error('This progress link belongs to an unknown checklist version. Import its JSON backup to match items by ID.');
  const ids=old?old.ids:items.map(t=>t.id),known=new Set(items.map(t=>t.id));
  const encoded=parts[1];
  if(!/^[A-Za-z0-9_-]*$/.test(encoded)||encoded.length>3000)throw Error('This progress link is invalid. No item statuses were loaded.');
  const raw=atob(encoded.replaceAll('-','+').replaceAll('_','/'));
  if(raw.length!==Math.ceil(ids.length/2))throw Error('This progress link is incomplete. No item statuses were loaded.');
  const next=new Map();
  ids.forEach((id,i)=>{const f=(raw.charCodeAt(Math.floor(i/2))>>(i%2*4))&15;if(!allowed.has(f))throw Error('Invalid checklist status in this progress link.');if(f&&known.has(id))next.set(id,f);});
  flags=next;return true;
}
function encodedState(){
  const bytes=new Uint8Array(Math.ceil(items.length/2));
  items.forEach((t,i)=>bytes[Math.floor(i/2)]|=state(t.id)<<(i%2*4));
  return btoa(String.fromCharCode(...bytes)).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'');
}
const anchor=()=>location.hash.slice(1).split('~ol1:')[0]||'checklist';
function fragment(section=anchor()){return `${section}~ol1:${inventory.fingerprint}:${encodedState()}`;}
function saveURL(section){
  try{history.replaceState(null,'','#'+fragment(section));$('#ck-save-note').textContent='Progress updated in this URL. Copy your progress link, bookmark it or export a backup to resume later. Nothing syncs to a shared server.';}
  catch{$('#ck-save-note').textContent='This preview cannot update the URL. Use Copy my progress link or Export progress to keep your changes.';}
}
function exportObject(){return {format:'openline-irina-checklist',schema:1,release:inventory.release,fingerprint:inventory.fingerprint,exportedAt:new Date().toISOString(),items:items.map(t=>({id:t.id,state:state(t.id)}))};}
function download(text,name,type){
  const url=URL.createObjectURL(new Blob([text],{type}));
  const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);
}
function confirmAction(title,text,action,{link=''}={}){
  const active=document.activeElement;
  $('#ck-confirm-title').textContent=title;$('#ck-confirm-text').textContent=text;$('#ck-confirm-action').textContent=action;
  $('#ck-link-fallback').hidden=!link;$('#ck-link-text').value=link;confirmDialog.returnValue='cancel';
  confirmDialog.showModal();if(link){$('#ck-link-text').focus();$('#ck-link-text').select();}
  return new Promise(resolve=>confirmDialog.addEventListener('close',()=>{active?.focus();resolve(confirmDialog.returnValue==='confirm');},{once:true}));
}
function counts(list=items){
  return {total:list.length,applied:list.filter(t=>state(t.id)&1).length,verified:list.filter(t=>state(t.id)&2).length,blocked:list.filter(t=>state(t.id)&4).length};
}
function updateProgress(){
  const n=counts(),pct=n.total?Math.floor(n.verified/n.total*1000)/10:0;
  $('#ck-percent').textContent=pct+'%';$('#ck-completed').textContent=`${n.verified} of ${n.total} items verified`;
  $('#ck-progress').max=n.total;$('#ck-progress').value=n.verified;
  $('#ck-progress-caption').textContent='Applied includes verified items. Blocked work is never counted as verified.';
  $('#ck-applied').textContent=n.applied;$('#ck-blocked').textContent=n.blocked;$('#ck-remaining').textContent=n.total-n.verified;
}
function matches(t){
  const q=$('#ck-search').value.trim().toLowerCase(),page=$('#ck-page').value,type=$('#ck-type').value,st=$('#ck-status').value,f=state(t.id);
  return (!q||`${t.id} ${t.title} ${t.description} ${t.pages.map(label).join(' ')} ${(t.records||[]).join(' ')}`.toLowerCase().includes(q))
    &&(page==='all'||t.pages.includes(page))&&(type==='all'||t.type===type)
    &&(st==='all'||st==='todo'&&!(f&1)&&!(f&4)||st==='applied'&&(f&1)&&!(f&2)&&!(f&4)||st==='verified'&&(f&2)||st==='blocked'&&(f&4));
}
function routeURL(route){
  const url=new URL(route,location.origin);
  if(url.pathname==='/delivery')url.pathname='/delivery/index.html';
  if(url.pathname==='/qa')url.pathname='/qa/index.html';
  else if(url.pathname.startsWith('/qa/')&&!/\.[a-z]+$/.test(url.pathname))url.pathname+='.html';
  return url.href;
}
function row(t){
  const f=state(t.id),caption=t.review?'Handled':'Applied';
  return `<article class="ck-item ${f&2?'is-verified':''} ${f&4?'is-blocked':''}" data-task="${esc(t.id)}">
    <div class="ck-item-content"><span class="ck-kind">${esc(t.type)} · ${esc(t.pages.map(label).join(' / '))}</span><h4>${esc(t.title)}</h4>
    <details class="ck-item-detail"><summary>Instructions & reference</summary><p>${esc(t.description)}</p>${t.before?`<p class="ck-before"><strong>Before:</strong> ${esc(t.before)}</p>`:''}<div class="actions">${t.route?`<a class="text-button" href="${routeURL(t.route)}" target="_blank" rel="noopener">Open reference ↗︎</a>`:''}${t.doc?`<button class="text-button" data-doc="${esc(t.doc)}">Import notes ↗︎</button>`:''}</div>${t.files?.length?`<ul class="file-list">${t.files.map(f=>`<li><a href="${new URL('../'+f,import.meta.url).href}" target="_blank" rel="noopener">${esc(f)}</a></li>`).join('')}</ul>`:''}<small>${esc(t.id)}</small></details></div>
    <fieldset class="ck-item-controls"><legend class="ck-sr">Progress for ${esc(t.title)}</legend><label><input type="checkbox" data-field="applied" ${f&1?'checked':''}><span>${caption}</span></label><label><input type="checkbox" data-field="verified" ${f&2?'checked':''}><span>Verified</span></label><label class="ck-block"><input type="checkbox" data-field="blocked" ${f&4?'checked':''}><span>Blocked</span></label></fieldset></article>`;
}
function render(focus){
  updateProgress();
  const filtered=items.filter(matches),groups=new Map();
  for(const t of filtered){const p=t.pages[0]||'*';if(!groups.has(p))groups.set(p,[]);groups.get(p).push(t);}
  $('#ck-results').textContent=`${filtered.length} shown · ${items.length} total`;
  $('#ck-list').innerHTML=filtered.length?[...groups.entries()].sort(([a],[b])=>a==='*'?-1:b==='*'?1:label(a).localeCompare(label(b))).map(([p,ts])=>{
    const n=counts(ts);
    const filteredOpen=$('#ck-search').value.trim()||$('#ck-type').value!=='all'||$('#ck-status').value!=='all';
    return `<details class="ck-group" data-group="${esc(p)}" ${openGroups.has(p)||filteredOpen?'open':''}><summary><span>${esc(label(p))}</span><span class="ck-group-count">${n.verified} / ${n.total} verified${n.blocked?' · '+n.blocked+' blocked':''}</span></summary><div>${ts.map(row).join('')}</div></details>`;
  }).join(''):'<div class="empty"><h3>No matching items.</h3><p>Try another page, type or progress filter. Your progress has not changed.</p></div>';
  for(const group of $('#ck-list').querySelectorAll('.ck-group'))group.addEventListener('toggle',()=>{group.open?openGroups.add(group.dataset.group):openGroups.delete(group.dataset.group);});
  if(focus){const target=[...$('#ck-list').querySelectorAll('[data-task]')].find(e=>e.dataset.task===focus.id);(target?.querySelector(`[data-field="${focus.field}"]`)||$('#ck-status')).focus({preventScroll:true});}
}
function updateFlag(id,field,checked){
  let f=state(id);
  if(field==='applied')f=checked?(f|1):(f&4);
  if(field==='verified')f=checked?3:(f&~2);
  if(field==='blocked')f=checked?((f|4)&~2):(f&~4);
  flags.set(id,f);lastAction=new Date().toISOString();saveURL();render({id,field});
}
async function importFile(file){
  if(!file)return;
  try{
    if(file.size>500000)throw Error('Choose a checklist JSON backup smaller than 500 KB.');
    const doc=JSON.parse(await file.text());
    if(doc.format!=='openline-irina-checklist'||doc.schema!==1||!Array.isArray(doc.items)||doc.items.length>5000)throw Error('This is not a supported Openline checklist backup.');
    const known=new Set(items.map(t=>t.id)),seen=new Set(),incoming=[];
    for(const entry of doc.items){
      if(!entry||typeof entry.id!=='string'||!Number.isInteger(entry.state)||!allowed.has(entry.state)||seen.has(entry.id))throw Error('The backup contains invalid or duplicate entries. Nothing was changed.');
      seen.add(entry.id);if(known.has(entry.id))incoming.push(entry);
    }
    if(!incoming.length)throw Error('No checklist items match this backup.');
    const unknown=doc.items.length-incoming.length;
    if(!await confirmAction('Import saved progress?',`Replace the statuses of ${incoming.length} matching items with this backup? ${unknown?unknown+' unknown items will be ignored. ':''}Other current items stay unchanged. Export your current progress first if you want to keep both versions.`,'Import progress'))return;
    for(const x of incoming)flags.set(x.id,x.state);
    lastAction=new Date().toISOString();saveURL('checklist');render();notify('Progress imported. No source files or production states were changed.');
  }catch(e){notify(e instanceof SyntaxError?'This file is not valid JSON. Nothing was changed.':e.message||'Could not read this backup. Nothing changed.');}
  finally{$('#ck-file').value='';}
}
function exportReport(){
  const n=counts();
  const lines=["# Irina's Openline implementation progress",'',`Release: ${inventory.release}`,`Exported: ${new Date().toISOString()}`,'',
    `Verified: ${n.verified}/${n.total}. Applied (including verified): ${n.applied}. Blocked: ${n.blocked}.`,'',
    'Self-reported checklist progress, not independent validation or production approval. Add staging links, design links, screenshots, blockers, owners and ETAs before sending.','',
    '[Resume this progress]('+canonical+'#'+fragment('checklist')+')',''];
  for(const type of [...new Set(items.map(t=>t.type))]){
    lines.push('## '+type,'');
    for(const t of items.filter(t=>t.type===type)){lines.push(`- [${state(t.id)&2?'x':' '}] **${status(state(t.id))}: ${t.title}** (${t.pages.map(label).join(', ')})`, '  - ID: `'+t.id+'`');}
    lines.push('');
  }
  lines.push('## Evidence and blockers','','- Staging / design links:','- Desktop/mobile evidence:','- Blocker / decision / owner:','- Next ETA:','');
  download(lines.join('\n'),'openline-irina-progress-report.md','text/markdown;charset=utf-8');
}
async function init(){
  const response=await fetch(new URL('./checklist-data.json',import.meta.url));if(!response.ok)throw Error('Checklist inventory unavailable.');
  inventory=await response.json();items=inventory.tasks;
  const pages=[...new Set(items.flatMap(t=>t.pages))].sort((a,b)=>a==='*'?-1:b==='*'?1:label(a).localeCompare(label(b)));
  $('#ck-page').innerHTML='<option value="all">All pages & areas</option>'+pages.map(p=>`<option value="${esc(p)}">${esc(label(p))}</option>`).join('');
  $('#ck-type').innerHTML='<option value="all">All types</option>'+[...new Set(items.map(t=>t.type))].map(t=>`<option>${esc(t)}</option>`).join('');
  try{if(decodeHash())$('#ck-save-note').textContent='Saved progress restored from this URL. Changes stay in your progress link; they do not sync to other people or browsers.';}catch(e){$('#ck-save-note').textContent=e.message;notify(e.message);}
  render();
  if(location.hash.includes('~ol1:'))document.getElementById(anchor())?.scrollIntoView();
  $('#ck-list').addEventListener('change',e=>{if(e.target.matches('input[data-field]'))updateFlag(e.target.closest('[data-task]').dataset.task,e.target.dataset.field,e.target.checked);});
  for(const id of ['ck-search','ck-page','ck-type','ck-status'])$('#'+id).addEventListener(id==='ck-search'?'input':'change',()=>{if($('#ck-page').value!=='all')openGroups.add($('#ck-page').value);render();});
  $('#ck-expand').addEventListener('click',()=>$('#ck-list').querySelectorAll('.ck-group').forEach(g=>{openGroups.add(g.dataset.group);g.open=true;}));
  $('#ck-collapse').addEventListener('click',()=>{openGroups.clear();$('#ck-list').querySelectorAll('.ck-group').forEach(g=>g.open=false);});
  $('#ck-copy-link').addEventListener('click',async()=>{
    const link=canonical+'#'+fragment('checklist');
    try{await navigator.clipboard.writeText(link);notify('Progress link copied. It includes checklist statuses, not a shared live connection.');}
    catch{await confirmAction('Copy your progress link','Clipboard access is unavailable. Select and copy this link to keep or share your checklist.','Close',{link});}
  });
  $('#ck-export').addEventListener('click',()=>download(JSON.stringify(exportObject(),null,2)+'\n','openline-irina-checklist-progress.json','application/json;charset=utf-8'));
  $('#ck-report').addEventListener('click',exportReport);
  $('#ck-import').addEventListener('click',()=>$('#ck-file').click());
  $('#ck-file').addEventListener('change',e=>importFile(e.target.files[0]));
  $('#ck-reset').addEventListener('click',async()=>{if(await confirmAction('Reset this checklist?','This clears your current checklist statuses in this URL. Source files, exported backups and other people’s progress links are not changed.','Reset checklist')){flags.clear();lastAction=new Date().toISOString();saveURL('checklist');render();notify('Checklist reset. Previously exported backups are unchanged.');}});
  document.addEventListener('click',e=>{
    const link=e.target.closest('a[href^="#"]');
    if(link&&!e.metaKey&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&e.button===0){
      const section=link.getAttribute('href').slice(1);const target=document.getElementById(section);
      if(target){e.preventDefault();saveURL(section);target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});}
    }
  });
  addEventListener('hashchange',()=>{try{if(decodeHash())render();else saveURL();}catch(e){notify(e.message);}});
}
init().catch(e=>{$('#ck-list').innerHTML='<p class="empty">'+esc(e.message)+' Reload the page or use the downloadable acceptance checklist.</p>';$('#ck-completed').textContent='Checklist could not load';});
