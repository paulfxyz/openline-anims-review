import { buildBoard } from './board.js';
import { WHAT_VARIANTS } from './esim-what.js';
import { TRAVEL_VARIANTS } from './esim-travel.js';

const keptGlobal = [
  'Same warm Openline orange: #FF5314 / #E23D00',
  'Same panel: rounded card, dotted field, floating pills',
  'Same section copy, bullets and layout — only the artwork changes',
  'Pure inline SVG + SMIL — no new dependency, honours reduced-motion',
];

buildBoard(document.getElementById('board-what'), {
  id: 'what',
  kicker: 'Technology Explained',
  heading: 'What is an',
  headingAccent: 'eSIM?',
  lead: 'An eSIM (embedded SIM) is a digital SIM card that\'s built directly into your smartphone. Instead of inserting a physical SIM card, you simply scan a QR code to activate mobile service. It\'s the modern way to connect — faster, easier, and more flexible.',
  bullets: [
    '<b>No physical SIM card</b> — everything is digital',
    '<b>Instant activation</b> — scan a QR code, connected in 30 seconds',
    '<b>Multiple plans on one device</b> — store and switch freely',
    '<b>Perfect for travel</b> — buy before you go, activate on arrival',
  ],
  variants: WHAT_VARIANTS,
  keptIdentical: keptGlobal,
  thinking: {
    title: 'This panel has one job the current version skips',
    lead: 'The copy beside it makes four promises. The artwork only illustrates the weakest one — "not plastic". Each option below picks a stronger promise and shows it happening.',
    jobs: [
      { t: 'Show, don\'t restate', d: 'The sentence already says "digital, not plastic". Redrawing that sentence adds nothing. The install, the speed, and the multiple plans are all unillustrated.' },
      { t: 'Earn the second glance', d: 'A pulsing chip and a marching arrow are exhausted in half a second. A panel this size needs a loop with beats, so a visitor who looks twice sees something new.' },
      { t: 'Fill the frame', d: 'Today the left third is a grey rectangle and the bottom fifth is empty. Composition is credibility: an unfinished panel makes the product look unfinished.' },
    ],
  },
  pick: [
    { k: 'My pick', h: '1 · Etch & Activate', d: 'It is the only option that shows the 30-second install the copy promises, and the QR code makes the mechanism self-explanatory in any language. It also ends on a resolved "eSIM ACTIVE" state, so a screenshot or a paused frame still reads correctly.' },
    { k: 'If the goal is conversion', d: '3 · Profile Drawer. "Store several plans and switch between them" is the bullet frequent travellers actually buy, and the drawer makes it an object rather than a claim. It is also the calmest and the safest on a phone.' },
    { k: 'If the goal is switching from a competitor', d: '2 · Two Ways In. It is the only one that puts a number on the pain — 28 seconds against three days — and cost comparisons travel further than product illustration. Check the tone against brand voice first.' },
  ],
});

buildBoard(document.getElementById('board-travel'), {
  id: 'travel',
  kicker: 'Everything Included',
  heading: 'Everything You Need for',
  headingAccent: 'Seamless Travel',
  lead: 'Our global eSIM includes all the features you need for seamless international connectivity, without the hassle of traditional SIM cards or expensive roaming fees.',
  bullets: [
    'Use one eSIM across all your destinations',
    'No need to purchase separate country plans',
    'Automatic network selection in each country',
    'Keep your original phone number active',
    'Manage everything from one app',
    'Top up data anywhere, anytime',
    'No registration or ID verification required',
    'Install before you travel, activate on arrival',
  ],
  variants: TRAVEL_VARIANTS,
  keptIdentical: keptGlobal,
  thinking: {
    title: 'The comparison is right — the shape is wrong',
    lead: 'Three stacked rows of the same geometry give the eye nothing to follow, and a bar labelled COST with no unit persuades nobody. Each option keeps the argument and changes the shape.',
    jobs: [
      { t: 'One thing to follow', d: 'Three parallel rows split attention three ways. A single line, a single card, or a single feed gives the visitor one place to look and one thing to understand.' },
      { t: 'Make "seamless" visible', d: 'Seamlessness is a negative claim — the absence of interruption. It only lands if something else visibly gets interrupted, or if a counter sits convincingly at zero.' },
      { t: 'Put a place in it', d: 'Eight bullets about travel, and not one destination on screen. Named cities and flags do more for intent than any abstract track ever will.' },
    ],
  },
  pick: [
    { k: 'My pick', h: '1 · Border Run', d: 'It keeps today\'s argument exactly — plastic stalls, Openline does not — but runs it on one continuous line with real city names, so the whole panel has a single subject and the loop has built-in rhythm. Biggest gain for the smallest conceptual change.' },
    { k: 'If the goal is a premium feel', d: '2 · One Card, Every Flag. Nothing moves except the network name, the data trace never breaks, and the three zero-counters do the arguing. It is also the only one I would ship on the storefront hero without changes.' },
    { k: 'If the goal is credibility', d: '3 · Trip Tape. It looks like the Openline app doing its job rather than an illustration about it, and it scales to any itinerary length. Cut it to three rows on a phone.' },
  ],
});

/* ── board switcher ─────────────────────────────────────────────── */
const boards = [...document.querySelectorAll('[data-board]')];
const nav = document.getElementById('boardnav');

const gfoot = document.getElementById('gfoot');

function show(key) {
  boards.forEach(b => { b.hidden = b.dataset.board !== key; });
  gfoot.hidden = key === 'tier1';
  [...nav.children].forEach(b => b.classList.toggle('active', b.dataset.go === key));
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}
[...nav.children].forEach(b => b.addEventListener('click', () => show(b.dataset.go)));
show('tier1');
