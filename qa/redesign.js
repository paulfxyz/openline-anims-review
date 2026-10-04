/* Small runtime for the /qa redesigns: icons, the team's local clocks and
   the partner marquee's second copy. Everything else is static markup. */
import { glyphSVG } from './icons-lib.js';

document.querySelectorAll('.rd [data-ic]').forEach((el) => {
  el.innerHTML = el.dataset.ic === 'arrow'
    ? '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>'
    : el.dataset.ic === 'camera'
    ? '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor"/></svg>'
    : glyphSVG(el.dataset.ic, { size: 24 });
});

/* duplicate the logo track once so translateX(-50%) loops seamlessly */
document.querySelectorAll('[data-marq]').forEach((t) => { t.innerHTML += t.innerHTML; });

/* "The team, right now": real local time in each city */
const clocks = [...document.querySelectorAll('[data-tz]')];
function tick() {
  const now = new Date();
  clocks.forEach((el) => {
    const f = new Intl.DateTimeFormat('en-GB', { timeZone: el.dataset.tz, hour: '2-digit', minute: '2-digit', weekday: 'short' });
    el.textContent = f.format(now);
  });
}
if (clocks.length) { tick(); setInterval(tick, 20000); }

/* Unpublished Open Startup figures are never revealed. This disclosure
   only shows/hides a locked layout preview, not a client-side privacy gate. */
const startupToggle = document.getElementById('rd-startup-toggle');
const startupResults = document.getElementById('rd-startup-results');
if (startupToggle && startupResults) {
  startupToggle.addEventListener('click', () => {
    const open = startupResults.hidden;
    startupResults.hidden = !open;
    startupToggle.setAttribute('aria-expanded', String(open));
    startupToggle.querySelector('[data-startup-toggle-label]').textContent = open ? 'Hide results' : 'Show results';
  });
}

/* Three selectable beats share the SVG's own clock. Seeking changes the
   current beat without pausing the loop. CSS highlights follow that clock
   instead of running an unrelated second animation. */
const chatSvg = document.getElementById('rd-chat-animation');
const chatSteps = [...document.querySelectorAll('[data-chat-step]')];
if (chatSvg && chatSteps.length) {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const starts = [0.08, 4.35, 6.4];
  chatSteps[0].parentElement.dataset.chatController = 'true';
  const sync = () => {
    const t = chatSvg.getCurrentTime() % 9;
    const step = t < 3.24 ? 0 : t < 6.3 ? 1 : 2;
    chatSteps.forEach((button, i) => {
      button.classList.toggle('is-current', i === step);
      button.setAttribute('aria-pressed', String(i === step));
    });
  };
  const playback = () => {
    if (motion.matches || document.hidden) chatSvg.pauseAnimations();
    else chatSvg.unpauseAnimations();
    sync();
  };
  chatSteps.forEach((button, i) => button.addEventListener('click', () => {
    chatSvg.setCurrentTime(starts[i]);
    playback();
  }));
  motion.addEventListener('change', playback);
  document.addEventListener('visibilitychange', playback);
  setInterval(() => { if (!document.hidden) sync(); }, 100);
  playback();
}
