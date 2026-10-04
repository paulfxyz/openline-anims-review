/* Continuous logo ribbons. Only original logos are accessible; clones are decorative.
   Motion is paused offscreen, in hidden tabs, on hover/focus, or by explicit choice. */
const root = document.getElementById('operator-showcase');
if (root) {
  const icons = {
    pause:'<path d="M9 5v14M15 5v14"/>',
    play:'<path d="m8 5 11 7-11 7z"/>',
    search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    close:'<path d="m6 6 12 12M18 6 6 18"/>',
  };
  const svg=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
  const dialog=document.getElementById('ops-directory');
  for(const host of [root,dialog])host.querySelectorAll('[data-ops-icon]').forEach(e=>e.innerHTML=svg(e.dataset.opsIcon));
  root.querySelectorAll('.ops-group').forEach(group=>{
    group.querySelectorAll('img').forEach(img=>{img.loading='eager';});
    const clone=group.cloneNode(true);
    clone.dataset.opsClone='';
    clone.setAttribute('aria-hidden','true');
    clone.inert=true;
    clone.querySelectorAll('img').forEach(img=>{img.alt='';img.loading='eager';});
    group.after(clone);
  });
  root.classList.add('ops-enhanced');
  const motion=matchMedia('(prefers-reduced-motion:reduce)');
  const finePointer=matchMedia('(hover:hover)');
  const button=document.getElementById('ops-motion');
  const browse=document.getElementById('ops-browse');
  const search=document.getElementById('ops-search');
  const count=document.getElementById('ops-count');
  const cards=[...dialog.querySelectorAll('.ops-card')];
  const hovered=new Set();
  let paused=false,visible=false,focused=false,overflow='';
  function update() {
    const running=visible&&!document.hidden&&!paused&&!hovered.size&&!focused&&!motion.matches&&!dialog.open;
    root.dataset.opsRunning=String(running);
    root.classList.toggle('ops-reduced',motion.matches);
    button.hidden=motion.matches;
    button.setAttribute('aria-label',paused?'Play operator animation':'Pause operator animation');
    button.querySelector('[data-ops-icon]').innerHTML=svg(paused?'play':'pause');
    button.querySelector('[data-ops-motion-label]').textContent=paused?'Play motion':'Pause motion';
  }
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;update();},{threshold:.15});
  observer.observe(root);
  root.querySelectorAll('.ops-viewport').forEach((view,index)=>{
    view.setAttribute('aria-label',`Operator row ${index+1}. Focus pauses motion; use Browse operators for the complete list.`);
    view.addEventListener('pointerenter',event=>{if(finePointer.matches&&event.pointerType!=='touch'){hovered.add(view);update();}});
    view.addEventListener('pointerleave',()=>{hovered.delete(view);update();});
    view.addEventListener('focusin',()=>{focused=true;update();});
    view.addEventListener('focusout',()=>{queueMicrotask(()=>{focused=!!document.activeElement?.closest('.ops-viewport');update();});});
  });
  button.addEventListener('click',()=>{paused=!paused;update();});
  document.addEventListener('visibilitychange',update);
  motion.addEventListener('change',update);
  const normalise=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
  function filter() {
    const term=normalise(search.value),query=term==='3'?'three':term;
    let shown=0;
    cards.forEach(card=>{card.hidden=!normalise(card.dataset.opsName).includes(query);if(!card.hidden)shown++;});
    count.textContent=`${shown} operator${shown===1?'':'s'}`;
    document.getElementById('ops-empty').hidden=shown>0;
  }
  browse.hidden=false;
  browse.addEventListener('click',()=>{
    search.value='';filter();
    overflow=document.documentElement.style.overflow;
    document.documentElement.style.overflow='hidden';
    dialog.showModal();dialog.scrollTop=0;search.focus({preventScroll:true});update();
  });
  dialog.querySelector('[data-ops-close]').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{document.documentElement.style.overflow=overflow;browse.focus({preventScroll:true});update();});
  dialog.addEventListener('keydown',event=>{
    if(event.key==='Escape'){event.preventDefault();event.stopPropagation();dialog.close();}
    if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k')event.stopPropagation();
  });
  dialog.addEventListener('click',event=>{
    if(event.target!==dialog)return;
    const r=dialog.getBoundingClientRect();
    if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();
  });
  search.addEventListener('input',filter);
  update();
  root.dataset.opsReady='true';
}
