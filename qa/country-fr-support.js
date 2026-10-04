/* Contextual FAQ support animation. Text stays visible; only emphasis moves.
   No network/support request is made by playback or step selection. */
import { glyphSVG } from './icons-lib.js';
const card = document.querySelector('.frs-card');
if (card) {
  const icons = {
    pause:'<path d="M9 5v14M15 5v14"/>',
    play:'<path d="m8 5 11 7-11 7z"/>',
    arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
    users:'<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5v1"/>',
  };
  const svg = name => icons[name] ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>` : glyphSVG(name,{size:24,sw:1.8});
  card.querySelectorAll('[data-frs-icon]').forEach(e=>e.innerHTML=svg(e.dataset.frsIcon));
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  const steps=[...card.querySelectorAll('[data-frs-step]')], toggle=card.querySelector('.frs-motion');
  let index=0,timer=0,visible=false,paused=reduced.matches;
  function paint() { steps.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index))); }
  function schedule() {
    clearTimeout(timer);
    if(!visible||paused||document.hidden||reduced.matches)return;
    timer=setTimeout(()=>{index=(index+1)%steps.length;paint();schedule();},4200);
  }
  function controls() {
    const stopped=paused||reduced.matches;
    toggle.innerHTML=svg(stopped?'play':'pause');
    toggle.setAttribute('aria-label',stopped?'Play support animation':'Pause support animation');
    toggle.title=stopped?'Play animation':'Pause animation';
    toggle.hidden=reduced.matches;
  }
  steps.forEach(b=>b.addEventListener('click',()=>{index=Number(b.dataset.frsStep);paint();schedule();}));
  toggle.addEventListener('click',()=>{paused=!paused;controls();schedule();});
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();},{threshold:.15});
  observer.observe(card);
  document.addEventListener('visibilitychange',schedule);
  reduced.addEventListener('change',()=>{paused=reduced.matches;controls();schedule();});
  controls();paint();
}
