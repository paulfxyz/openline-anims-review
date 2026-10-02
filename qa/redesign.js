/* Small runtime for the /qa redesigns: icons, the team's local clocks and
   the partner marquee's second copy. Everything else is static markup. */
import { glyphSVG } from './icons-lib.js';

document.querySelectorAll('.rd [data-ic]').forEach((el) => { el.innerHTML = glyphSVG(el.dataset.ic, { size: 24 }); });

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
