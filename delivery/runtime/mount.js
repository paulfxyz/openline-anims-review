import { refineAnimation } from './helpers/animation-fixes.js';
import { makeMapper } from './helpers/recolor.js';
import { paintTree, watchMutations, chromeSheen } from './helpers/paint.js';
import { fitArt } from './helpers/fit.js';

let serial = 0;
let manifestPromise;
const mounts = new WeakMap();
const tones = {
  dark:'linear-gradient(135deg,#1A1526,#0D0B14 50%,#241A38)',
  plus:'linear-gradient(160deg,#2A1A18,#131826 45%,#241A16)',
  orange:'linear-gradient(135deg,#FF5314,#F0651F 55%,#FF8A4C)',
  plusgreen:'linear-gradient(160deg,#122A1F,#131826 45%,#102A20)'
};
const pillColors = {orange:['#FF5314','#fff'],ink:['#0B0B0F','#fff'],white:['#fff','#0B0B0F'],cyan:['#06B6D4','#fff'],blue:['#2563EB','#fff'],teal:['#0D9488','#fff']};

export function loadManifest() {
  return manifestPromise ||= fetch(new URL('../manifest.json', import.meta.url)).then(r=>{
    if(!r.ok) throw new Error('Delivery manifest could not be loaded.');
    return r.json();
  });
}

/** Mount a trusted, frozen selected illustration. Returns dispose and setPaused.
 * Not an HTML sanitizer: never pass user-generated SVG into this adapter.
 * The caller owns its accessible caption and slot layout.
 */
export async function mountAnimation(host,key,{paused=false,identity=true}={}) {
  mounts.get(host)?.dispose?.();
  const token = {};
  mounts.set(host,token);
  const data = await loadManifest();
  const item = data.animations.find(a=>a.key===key);
  if(!item) throw new Error('Unknown delivery animation: '+key);
  const mod = await import(new URL('js/'+item.module,import.meta.url));
  if(mounts.get(host)!==token) return {dispose(){},setPaused(){}};
  const option = mod[item.export].find(v=>v.id===item.id);
  if(!option) throw new Error('Frozen option is missing: '+item.id);
  const uid = `delivery-${++serial}-${Math.random().toString(36).slice(2,8)}`;
  const built = key==='aloha' ? {svg:option.svg(uid)} : refineAnimation(key,item.id,option.build(uid));
  const theme = identity ? data.styles[item.page] : null;
  const map = makeMapper(theme);
  let cleanup = null, disposed = false, visible = true, manualPause = paused;
  const mq = matchMedia('(prefers-reduced-motion: reduce)');
  const slot = item.slot;
  host.classList.add('ol-animation');
  host.style.aspectRatio = `${slot.w}/${slot.h}`;
  // Referral deliberately borrows the orange of its containing page block.
  host.style.background = key==='referral' ? '#FF5314' : '';
  const art = document.createElement('div');
  art.className = 'qa-mount';
  art.style.cssText = '--cyan:#06B6D4;--cyan-deep:#0891B2;--ink:#0B0B0F;--orange:#FF5314;';
  if(item.tone && !slot.clear) art.style.background = tones[item.tone] || '';
  art.innerHTML = built.svg;
  host.replaceChildren(art);
  if(key==='aloha') host.classList.add('ol-animation-icon');
  else host.classList.remove('ol-animation-icon');
  for(const p of built.pills||[]) {
    const pill = document.createElement('div');
    pill.className = 'ol-art-pill';
    Object.assign(pill.style,p.pos||{});
    // Keep intentionally overhanging board pills readable in a contained preview.
    for(const side of ['left','right']) if(pill.style[side] && parseFloat(pill.style[side])<12) pill.style[side]='12px';
    const colors = pillColors[p.tone] || pillColors.white;
    pill.style.background = colors[0]; pill.style.color = colors[1];
    pill.innerHTML = p.html;
    art.appendChild(pill);
  }
  // Match QA's same-row treatment where two upper-right pills fit.
  const topRight=[...art.querySelectorAll(':scope > .ol-art-pill')].filter(p=>p.style.right&&p.style.top).sort((a,b)=>parseFloat(a.style.top)-parseFloat(b.style.top));
  if(topRight.length===2){
    const [a,b]=topRight,wa=a.getBoundingClientRect().width,wb=b.getBoundingClientRect().width;
    if(wa && wa+wb+8<=host.getBoundingClientRect().width*.72){
      b.style.top=a.style.top;b.style.right=(parseFloat(a.style.right)+wa+8)+'px';
    }
  }
  fitArt({w:slot.w,h:slot.h,def:slot},art);
  if(theme?.sheen) chromeSheen(art);
  paintTree(art,map);
  const observer = watchMutations(art,()=>map);
  // Added SVG nodes (e.g. auction packets) need the same selected palette.
  const additions = new MutationObserver(records=>{
    for(const r of records) for(const n of r.addedNodes) if(n.nodeType===1) paintTree(n,map);
  });
  additions.observe(art,{childList:true,subtree:true});
  function stopInit() { if(cleanup){cleanup();cleanup=null;} }
  function updateMotion() {
    if(disposed) return;
    const stop = manualPause || mq.matches || document.hidden || !visible;
    art.classList.toggle('ol-static',stop);
    if(stop) stopInit();
    else if(built.init && !cleanup) cleanup = built.init(art) || (()=>{});
    for(const svg of art.querySelectorAll('svg')) {
      if(stop) svg.pauseAnimations?.(); else svg.unpauseAnimations?.();
    }
    for(const a of art.getAnimations({subtree:true})) stop ? a.pause() : a.play();
  }
  // Initialize one meaningful frame even with reduced motion enabled.
  if(built.init) cleanup = built.init(art) || (()=>{});
  if(mq.matches) {
    for(const svg of art.querySelectorAll('svg')) svg.setCurrentTime?.(4);
    for(const animation of art.getAnimations({subtree:true})) animation.currentTime=4000;
  }
  const io = new IntersectionObserver(es=>{visible=es[0].isIntersecting;updateMotion();});
  io.observe(host);
  mq.addEventListener('change',updateMotion);
  document.addEventListener('visibilitychange',updateMotion);
  updateMotion();
  const result = {
    item,
    setPaused(value){manualPause=!!value;updateMotion();},
    dispose(){
      if(disposed) return;
      disposed=true;stopInit();observer.disconnect();additions.disconnect();io.disconnect();
      mq.removeEventListener('change',updateMotion);
      document.removeEventListener('visibilitychange',updateMotion);
      if(mounts.get(host)===result){host.replaceChildren();mounts.delete(host);}
    }
  };
  mounts.set(host,result);
  return result;
}
