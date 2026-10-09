import {PALETTE_REVIEW} from './followup-data.mjs';
import {mountAnimation} from './runtime/mount.js';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rows=document.querySelector('#followup-palettes');
rows.innerHTML=PALETTE_REVIEW.map(p=>`<article class="palette-row" data-state="${p.status}"><div class="palette-name"><div class="palette-swatches" aria-hidden="true">${p.swatches.map(c=>`<i style="background:${c}"></i>`).join('')}</div><h4>${esc(p.title)}</h4><span>${esc(p.name)} <code>${p.hex}</code></span></div><div><span class="review-state ${p.status}">${p.status==='gap'?'Confirmed gap':'Seen · retain and verify'}</span><p>${esc(p.finding)}</p><details><summary>What to apply</summary><p>${esc(p.action)}</p></details></div><div class="palette-links"><a href="${p.current}" target="_blank" rel="noopener">Current delivery ↗︎</a><a href="${p.target}" target="_blank" rel="noopener">QA target ↗︎</a></div></article>`).join('');
document.querySelector('#followup-filter').addEventListener('change',e=>{
  const v=e.target.value;
  rows.querySelectorAll('.palette-row').forEach(r=>r.hidden=v!=='all'&&r.dataset.state!==v);
});
document.querySelector('#followup-track').addEventListener('click',()=>{
  const type=document.querySelector('#ck-type'),page=document.querySelector('#ck-page'),search=document.querySelector('#ck-search');
  if([...type.options].some(o=>o.value==='9 October follow-up')){
    page.value='all';search.value='';document.querySelector('#ck-status').value='all';
    type.value='9 October follow-up';type.dispatchEvent(new Event('change',{bubbles:true}));
  }
  document.querySelector('#checklist').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});
});
let preview;
try{preview=await mountAnimation(document.querySelector('#followup-login-icon'),'aloha');}
catch{document.querySelector('#followup-login-icon').textContent='Open the QA login reference to preview.';}
addEventListener('pagehide',()=>preview?.dispose());
