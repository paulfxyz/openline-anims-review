import {FIXED,unlimitedPrice} from './country-fr-data.js';
const $=s=>document.querySelector(s), root=$('#fu-unlimited'), motion=matchMedia('(prefers-reduced-motion: reduce)');
const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n);
const state={days:7,valid:true,dates:null,view:'popular',data:null,validity:null,cart:[]};
const fixedGrid=$('#fu-fixed-grid'), popular=[...fixedGrid.children].map(e=>e.outerHTML);
const all=[...$('#fu-fixed-all').content.children].map(e=>e.outerHTML);
let overflow='',timer;
function open(d){overflow=document.documentElement.style.overflow;document.documentElement.style.overflow='hidden';d.showModal();d.scrollTop=0;}
function scrollToNode(el){el.scrollIntoView({behavior:motion.matches?'instant':'smooth',block:'start'});}
function update(){
  state.days=Number($('#fu-days').value);state.valid=Number.isInteger(state.days)&&state.days>=1&&state.days<=365;
  $('#fu-price').textContent=state.valid?money(unlimitedPrice(state.days)):'—';
  $('#fu-rate').textContent=state.valid?`${money(unlimitedPrice(state.days)/state.days)}/day • ${state.days} days validity`:'Select a valid duration';
  $('#fu-error').hidden=state.valid;$('#fu-error').textContent=state.valid?'':'Choose a whole number from 1 to 365 days in this preview.';
  $('#fu-days').setAttribute('aria-invalid',!state.valid);
  root.querySelectorAll('[data-fu-days]').forEach(b=>b.setAttribute('aria-pressed',state.valid&&Number(b.dataset.fuDays)===state.days));
  root.querySelectorAll('[data-fu-buy],[data-fu-add]').forEach(b=>b.disabled=!state.valid);
  root.querySelector('[data-fu-delta="-1"]').disabled=state.valid&&state.days===1;
  root.querySelector('[data-fu-delta="1"]').disabled=state.valid&&state.days===365;
}
function setDays(n){$('#fu-days').value=n;state.dates=null;$('#fu-date-label').textContent='Select travel dates';update();}
function plan(id){
  if(id==='unlimited')return state.valid?{id,amount:'Unlimited',days:state.days,price:unlimitedPrice(state.days),dates:state.dates}:null;
  const p=FIXED.find(p=>p.id===id);return p?{...p,amount:`${p.gb} GB`}:null;
}
function item(p,i=null){return `<div class="fu-review-item"><strong>France · ${p.amount}</strong><p>${p.days} days${p.qty?` · ${p.qty} eSIM${p.qty>1?'s':''}`:''}</p><strong>${money(p.price*(p.qty||1))}</strong>${i!==null?`<button type="button" data-fu-remove="${i}">Remove from demo cart</button>`:''}</div>`;}
function review(p){if(!p)return;$('#fu-review-title').textContent='Purchase preview';$('#fu-review-content').innerHTML=item(p)+'<p class="fu-dialog-note">Review-page pricing only. No payment, order or activation takes place.</p>';open($('#fu-review'));}
function cart(){ $('#fu-review-title').textContent='Demo cart';$('#fu-review-content').innerHTML=state.cart.length?state.cart.map((p,i)=>item(p,i)).join('')+`<p class="fu-dialog-note">Demo total: ${money(state.cart.reduce((n,p)=>n+p.price*p.qty,0))}</p>`:'<p class="fu-dialog-note">Your demo cart is empty.</p>';if(!$('#fu-review').open)open($('#fu-review'));}
function add(p){if(!p)return;const key=`${p.id}-${p.days}`,entry=state.cart.find(x=>x.key===key);if(entry)entry.qty++;else state.cart.push({...p,key,qty:1});
  $('#fu-toast').textContent=`France ${p.amount} added to demo cart. No order created.`;$('#fu-toast').hidden=false;clearTimeout(timer);timer=setTimeout(()=>$('#fu-toast').hidden=true,3500);
  document.querySelectorAll('[data-fr-cart]').forEach(b=>b.setAttribute('aria-label',`View demo cart, ${state.cart.reduce((n,p)=>n+p.qty,0)} items`));
}
function renderFixed(){
  const filter=state.data||state.validity, entries=(state.view==='all'||filter?all:popular).filter(h=>{
    const id=h.match(/data-fu-package="([^"]+)"/)?.[1],p=FIXED.find(x=>x.id===id);
    return p&&(!state.data||(state.data==='50+'?p.gb>=50:p.gb===Number(state.data)))&&(!state.validity||p.days===Number(state.validity));
  });
  fixedGrid.innerHTML=entries.length?entries.join(''):'<p class="text-sm text-muted-foreground col-span-full py-8 text-center">No package matches these filters. <button type="button" data-fu-reset class="text-primary">Reset filters</button></p>';
  $('#fu-fixed').querySelectorAll('[data-fu-view]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.fuView===state.view));
  $('#fu-fixed').querySelectorAll('[data-fu-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.fuFilter==='data'?state.data:state.validity)===b.dataset.value));
  const more=$('[data-fu-more]');if(more)more.parentElement.hidden=state.view==='all'||!!filter;
}
document.addEventListener('click',e=>{
  const b=e.target.closest('button,a');if(!b)return;
  if(b.hasAttribute('data-fr-scroll'))scrollToNode($('#fr-plans'));
  if(b.hasAttribute('data-fr-cart'))cart();
  if(b.hasAttribute('data-fu-days'))setDays(Number(b.dataset.fuDays));
  if(b.hasAttribute('data-fu-delta'))setDays((state.valid?state.days:7)+Number(b.dataset.fuDelta));
  if(b.hasAttribute('data-fu-fair'))open($('#fu-fair'));
  if(b.dataset.fuBuy)review(plan(b.dataset.fuBuy));
  if(b.dataset.fuAdd)add(plan(b.dataset.fuAdd));
  if(b.dataset.fuView){state.view=b.dataset.fuView;state.data=null;state.validity=null;renderFixed();}
  if(b.hasAttribute('data-fu-more')){state.view='all';renderFixed();}
  if(b.dataset.fuFilter){const k=b.dataset.fuFilter==='data'?'data':'validity';state[k]=String(state[k])===b.dataset.value?null:b.dataset.value;renderFixed();}
  if(b.hasAttribute('data-fu-reset')){state.data=null;state.validity=null;state.view='all';renderFixed();}
  if(b.hasAttribute('data-fu-remove')){state.cart.splice(Number(b.dataset.fuRemove),1);cart();}
  if(/Data Calculator/.test(b.textContent)&&!b.closest('#qa-ui')){
    $('#fu-review-title').textContent='Data calculator';
    $('#fu-review-content').innerHTML='<p class="fu-dialog-note">The original calculator is outside this focused Unlimited-block refinement. You can use it in the original reference page.</p><p class="fu-dialog-links"><a href="https://openline-revisions-hub.vercel.app/country-fr" target="_blank" rel="noopener">Open the original page ↗</a></p>';open($('#fu-review'));
  }
});
$('#fu-days').addEventListener('input',()=>{state.dates=null;$('#fu-date-label').textContent='Select travel dates';update();});
$('#fu-date-open').addEventListener('click',()=>{
  if(!$('#fu-first').value){const d=new Date();const today=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;$('#fu-first').value=today;$('#fu-last').value=new Date(Date.parse(today+'T00:00:00Z')+((state.valid?state.days:7)-1)*86400000).toISOString().slice(0,10);}
  $('#fu-date-error').hidden=true;open($('#fu-dates'));
});
$('#fu-date-apply').addEventListener('click',()=>{
  const a=$('#fu-first').value,b=$('#fu-last').value,n=Math.round((Date.parse(b+'T00:00:00Z')-Date.parse(a+'T00:00:00Z'))/86400000)+1;
  if(!Number.isInteger(n)||n<1||n>365){$('#fu-date-error').hidden=false;$('#fu-date-error').textContent='Choose dates in order, for 1–365 days in this preview.';return;}
  $('#fu-days').value=n;state.dates=[a,b];$('#fu-date-label').textContent=`${a} – ${b}`;update();$('#fu-dates').close();
});
$('#fu-view-fixed').addEventListener('click',()=>{$('#fu-fair').close();scrollToNode($('#fu-fixed'));});
document.querySelectorAll('.fu-dialog').forEach(d=>{
  d.querySelectorAll('[data-fu-close]').forEach(b=>b.addEventListener('click',()=>d.close()));
  d.addEventListener('close',()=>document.documentElement.style.overflow=overflow);
  d.addEventListener('click',e=>{if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();});
});
update();
