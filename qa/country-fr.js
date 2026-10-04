import {UNLIMITED,FIXED,POPULAR,unlimitedPrice} from './country-fr-data.js';

const $=s=>document.querySelector(s);
const root=$('.fr-plans');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const state={type:'unlimited',mode:'days',days:7,valid:true,error:'',view:'popular',gb:'all',validity:'all',fixed:'fr-10-30',dates:null,cart:[]};
const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
const check='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>';
const smallDay=s=>new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',timeZone:'UTC'}).format(new Date(s+'T12:00:00Z'));
const localISO=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const dateValue=s=>{const [y,m,d]=s.split('-').map(Number);return Date.UTC(y,m-1,d);};
const addDays=(s,n)=>new Date(dateValue(s)+n*86400000).toISOString().slice(0,10);
let toastTimer, lastTotal='', oldOverflow='';

function selection(){
  if(state.type==='fixed'){
    const p=FIXED.find(x=>x.id===state.fixed);
    return p?{...p,type:'fixed',amount:`${p.gb} GB`,label:'Fixed Plan',dates:null}:null;
  }
  if(!state.valid)return null;
  return {id:`unlimited-${state.days}`,type:'unlimited',days:state.days,price:unlimitedPrice(state.days),amount:'Unlimited data',label:'Unlimited Plan',dates:state.dates};
}
function durationLabel(p){
  return p.dates?`${smallDay(p.dates[0])} – ${smallDay(p.dates[1])} · ${p.days} ${p.days===1?'day':'days'}`:`${p.days} ${p.days===1?'day':'days'} validity`;
}
function updateSummary(){
  const p=selection(), fixed=state.type==='fixed';
  $('#fr-summary-kind').textContent=fixed?'Fixed Plan':'Unlimited Plan';
  $('#fr-summary-amount').textContent=p?p.amount:fixed?'Choose a package':'Set your duration';
  $('#fr-summary-duration').textContent=p?durationLabel(p):fixed?'Select a package to see your total.':'Enter a valid duration to see your total.';
  $('#fr-summary-benefit').textContent=fixed?'All purchased GB at full speed':'No Openline data cap';
  $('#fr-fair-row').hidden=fixed;$('#fr-fixed-row').hidden=!fixed;
  const total=p?money(p.price):'—';
  $('#fr-total').textContent=total;
  $('#fr-unit-price').textContent=p?fixed?`${money(p.price/p.gb)} / GB`:`${money(p.price/p.days)} / day`:'No plan selected';
  $('#fr-purchase').disabled=!p;$('#fr-add-cart').disabled=!p;
  if(lastTotal&&lastTotal!==total&&!reduced.matches)$('#fr-total').animate([{transform:'translateY(3px)'},{transform:'translateY(0)'}],{duration:180,easing:'ease-out'});
  lastTotal=total;
}
function selectType(type,{focus=false}={}){
  state.type=type;
  root.querySelectorAll('[data-type]').forEach(b=>{const on=b.dataset.type===type;b.classList.toggle('is-selected',on);b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1;});
  for(const name of ['unlimited','fixed']){
    const pane=$(`#fr-${name}`);pane.hidden=name!==type;pane.classList.remove('fr-enter');
    if(name===type&&!reduced.matches){void pane.offsetWidth;pane.classList.add('fr-enter');}
  }
  updateSummary();if(focus)$(`[data-type="${type}"]`).focus({preventScroll:true});
}
function scrollPlans(){
  root.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});
  $('#fr-plan-title').focus({preventScroll:true});
}
function renderDays(){
  root.querySelectorAll('[data-days]').forEach(b=>b.setAttribute('aria-pressed',state.valid&&Number(b.dataset.days)===state.days));
  $('#fr-duration-error').textContent=state.error;$('#fr-duration-error').hidden=!state.error;
  $('#fr-day-input').setAttribute('aria-invalid',!state.valid);
  root.querySelector('[data-delta="-1"]').disabled=state.valid&&state.days<=1;
  root.querySelector('[data-delta="1"]').disabled=state.valid&&state.days>=365;
  updateSummary();
}
function setDays(value,{write=true}={}){
  state.days=Number(value);state.valid=Number.isInteger(state.days)&&state.days>=1&&state.days<=365;
  state.error=state.valid?'':'Choose a whole number from 1 to 365 days for this preview.';
  state.dates=null;
  if(write)$('#fr-day-input').value=state.valid?state.days:value;
  renderDays();
}
function calculateDates(){
  const a=$('#fr-start-date').value,b=$('#fr-end-date').value;
  const days=a&&b?Math.round((dateValue(b)-dateValue(a))/86400000)+1:NaN;
  state.valid=Number.isInteger(days)&&days>=1&&days<=365;
  state.error=!a||!b?'Choose a first and last day.':days<1?'Your last day must be on or after your first day.':days>365?'This preview supports trips up to 365 days.':'';
  state.days=days;state.dates=state.valid?[a,b]:null;
  $('#fr-start-date').setAttribute('aria-invalid',!state.valid);$('#fr-end-date').setAttribute('aria-invalid',!state.valid);
  renderDays();
}
function setMode(mode){
  state.mode=mode;root.querySelectorAll('[data-mode]').forEach(b=>{const on=b.dataset.mode===mode;b.classList.toggle('is-selected',on);b.setAttribute('aria-pressed',on);});
  $('#fr-days-controls').hidden=mode!=='days';$('#fr-date-controls').hidden=mode!=='dates';
  if(mode==='dates'){
    if(!$('#fr-start-date').value||!$('#fr-end-date').value){const a=localISO(new Date());$('#fr-start-date').value=a;$('#fr-end-date').value=addDays(a,state.valid?state.days-1:6);}
    calculateDates();
  }else setDays(state.valid?state.days:7);
}
function filteredPackages(){
  return FIXED.filter(p=>(state.view==='all'||POPULAR.includes(p.id))&&(state.gb==='all'||(state.gb==='50+'?p.gb>=50:p.gb===Number(state.gb)))&&(state.validity==='all'||p.days===Number(state.validity)));
}
function renderFixed({focusId=null}={}){
  root.querySelectorAll('[data-view]').forEach(b=>{const on=b.dataset.view===state.view;b.classList.toggle('is-selected',on);b.setAttribute('aria-pressed',on);});
  root.querySelectorAll('[data-gb]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.gb===state.gb));
  root.querySelectorAll('[data-validity]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.validity===state.validity));
  const packages=filteredPackages();
  if(!packages.some(p=>p.id===state.fixed))state.fixed=null;
  $('#fr-results').textContent=`${packages.length} ${packages.length===1?'package':'packages'} shown${state.view==='popular'?' · curated from the source review':''}`;
  $('#fr-empty').hidden=packages.length>0;
  $('#fr-fixed-grid').innerHTML=packages.map((p,i)=>`<button type="button" class="fr-package" role="radio" aria-checked="${p.id===state.fixed}" aria-label="${p.gb} GB, ${p.days} days, ${money(p.price)}" tabindex="${p.id===state.fixed||(!state.fixed&&i===0)?0:-1}" data-package="${p.id}"><span class="fr-pkg-data">${p.gb}<small>GB</small></span><span class="fr-pkg-days">${p.days} days validity</span><span class="fr-pkg-price">${money(p.price)}</span><span class="fr-pkg-rate">${money(p.price/p.gb)} / GB · full speed</span><span class="fr-pkg-select">${p.id===state.fixed?'Selected':'Select package'}${p.id===state.fixed?check:arrow}</span></button>`).join('')+
    (state.view==='popular'&&state.gb==='all'&&state.validity==='all'?`<button type="button" class="fr-more-packages" data-all>${arrow}<b>Need more options?</b><span>Explore all 25 packages,<br>up to 150 GB.</span></button>`:'');
  updateSummary();
  if(focusId)root.querySelector(`[data-package="${focusId}"]`)?.focus({preventScroll:true});
}
function resetFilters(){
  state.view='all';state.gb='all';state.validity='all';renderFixed();
}
function choosePackage(id,{keyboard=false}={}){
  state.fixed=id;renderFixed({focusId:id});
  if(!keyboard&&innerWidth<=760)$('#fr-summary').scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});
}
function openDialog(dialog){
  if(dialog.open)return;
  oldOverflow=document.documentElement.style.overflow;document.documentElement.style.overflow='hidden';
  dialog.showModal();dialog.scrollTop=0;
}
function reviewItem(p,remove=false,index=0){
  return `<article class="fr-review-item"><h3>France · ${esc(p.label)}</h3><p>${esc(p.amount)} · ${esc(durationLabel(p))}${p.quantity>1?` · ${p.quantity} eSIMs`:''}</p><strong>${money(p.price*(p.quantity||1))}</strong><p>${p.type==='fixed'?'Your full purchased allowance, without usage-based throttling.':'No Openline data cap. Local operator fair use may apply.'}</p>${remove?`<button type="button" data-remove="${index}">Remove from demo cart</button>`:''}</article>`;
}
function showReview(){
  const p=selection();if(!p)return;
  $('#fr-review-title').textContent='Your selection.';
  $('#fr-review-content').innerHTML=reviewItem(p);
  openDialog($('#fr-review-dialog'));
}
function updateCart(){
  const count=state.cart.reduce((n,p)=>n+p.quantity,0);
  $('#fr-cart-count').textContent=count;$('#fr-cart-open').hidden=count===0;
  document.querySelectorAll('[data-fr-cart]').forEach(b=>b.setAttribute('aria-label',`View demo cart, ${count} ${count===1?'item':'items'}`));
}
function showCart(){
  $('#fr-review-title').textContent='Your demo cart.';
  $('#fr-review-content').innerHTML=state.cart.length?state.cart.map((p,i)=>reviewItem(p,true,i)).join('')+`<p class="fr-review-disclaimer">Demo total: <b>${money(state.cart.reduce((n,p)=>n+p.price*p.quantity,0))}</b></p>`:'<p class="fr-review-disclaimer">Your demo cart is empty. Choose a package to try the selection flow.</p>';
  openDialog($('#fr-review-dialog'));
}
function addCart(){
  const p=selection();if(!p)return;
  const key=`${p.id}-${p.dates?.join(':')||''}`,existing=state.cart.find(x=>x.key===key);
  if(existing)existing.quantity++;else state.cart.push({...p,key,quantity:1});
  updateCart();
  clearTimeout(toastTimer);$('#fr-toast').textContent=`${p.amount} for France added to your demo cart. No order created.`;$('#fr-toast').hidden=false;
  toastTimer=setTimeout(()=>{$('#fr-toast').hidden=true;},3500);
}

document.querySelectorAll('[data-fr-scroll]').forEach(b=>b.addEventListener('click',scrollPlans));
document.querySelectorAll('[data-fr-cart]').forEach(b=>b.addEventListener('click',showCart));
root.querySelector('.fr-type-tabs').addEventListener('keydown',e=>{
  if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
  e.preventDefault();const type=e.key==='Home'?'unlimited':e.key==='End'?'fixed':state.type==='unlimited'?'fixed':'unlimited';selectType(type,{focus:true});
});
root.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b.dataset.type)selectType(b.dataset.type);
  if(b.dataset.mode)setMode(b.dataset.mode);
  if(b.dataset.days)setDays(Number(b.dataset.days));
  if(b.dataset.delta)setDays((state.valid?state.days:7)+Number(b.dataset.delta));
  if(b.dataset.view){state.view=b.dataset.view;renderFixed();}
  if(b.dataset.gb){state.gb=b.dataset.gb;state.view='all';renderFixed();}
  if(b.dataset.validity){state.validity=b.dataset.validity;state.view='all';renderFixed();}
  if(b.dataset.package)choosePackage(b.dataset.package);
  if(b.hasAttribute('data-all')||b.hasAttribute('data-reset')||b.id==='fr-reset-filters')resetFilters();
  if(b.id==='fr-purchase')showReview();
  if(b.id==='fr-add-cart')addCart();
  if(b.id==='fr-cart-open')showCart();
});
$('#fr-fixed-grid').addEventListener('keydown',e=>{
  if(!['ArrowRight','ArrowLeft','ArrowDown','ArrowUp','Home','End'].includes(e.key)||!e.target.matches('[data-package]'))return;
  e.preventDefault();const list=filteredPackages(),at=list.findIndex(p=>p.id===e.target.dataset.package);
  const next=e.key==='Home'?0:e.key==='End'?list.length-1:(at+(['ArrowLeft','ArrowUp'].includes(e.key)?-1:1)+list.length)%list.length;
  if(list[next])choosePackage(list[next].id,{keyboard:true});
});
$('#fr-day-input').addEventListener('input',e=>setDays(e.target.value,{write:false}));
$('#fr-start-date').addEventListener('change',calculateDates);$('#fr-end-date').addEventListener('change',calculateDates);
document.querySelectorAll('[data-fair]').forEach(b=>b.addEventListener('click',()=>openDialog($('#fr-fair-dialog'))));
document.querySelectorAll('.fr-dialog').forEach(dialog=>{
  dialog.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>dialog.close()));
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{document.documentElement.style.overflow=oldOverflow;});
});
$('#fr-choose-fixed').addEventListener('click',()=>{$('#fr-fair-dialog').close();selectType('fixed',{focus:true});root.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});});
$('#fr-review-content').addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(!b)return;state.cart.splice(Number(b.dataset.remove),1);updateCart();showCart();});
$('#fr-data-filter').innerHTML=['all','1','3','5','10','20','30','50+'].map(v=>`<button type="button" class="fr-filter" data-gb="${v}" aria-pressed="${v==='all'}">${v==='all'?'Any':`${v} GB`}</button>`).join('');
$('#fr-validity-filter').innerHTML=['all','5','10','15','30'].map(v=>`<button type="button" class="fr-filter" data-validity="${v}" aria-pressed="${v==='all'}">${v==='all'?'Any':`${v} days`}</button>`).join('');
renderFixed();renderDays();updateCart();
