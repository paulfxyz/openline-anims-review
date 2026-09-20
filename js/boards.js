import { buildBoard } from './board.js';
import { WHAT_VARIANTS } from './esim-what.js';
import { TRAVEL_VARIANTS } from './esim-travel.js';
import { REFERRAL_VARIANTS } from './referral.js';
import { NET_HERO_VARIANTS, WHY_VARIANTS } from './network.js';

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



/* ── /home · referral box ─────────────────────────────────────── */
buildBoard(document.getElementById('board-referral'), {
  id: 'referral',
  sectionTone: 'orangeBox',
  stageTone: 'orange',
  kicker: 'Referral programme',
  heading: 'Refer a friend, and you\'ll both',
  headingAccent: 'get US$5!',
  lead: 'Share your unique referral link with friends and family. When they make their first purchase, you\'ll both receive $5 credit.',
  bullets: [
    'Unique link per account, no code to remember',
    'Credit lands as soon as their first purchase clears',
    'Both sides get the same US$5 — no small print',
    'Join 1M+ travellers already earning rewards',
  ],
  variants: REFERRAL_VARIANTS,
  compareTitle: 'All six, side by side',
  keptIdentical: [
    'Same orange box, same copy, same email form',
    'Artwork stays white-on-orange with the mint credit badges',
    'Same panel size — only the right half changes',
    'Pure inline SVG + SMIL — no new dependency',
  ],
  thinking: {
    title: 'A referral panel has to make the money feel real',
    lead: 'The box already explains the offer perfectly in two sentences. The panel beside it is doing nothing to make anyone believe it or want it, which is the only job left.',
    jobs: [
      { t: 'Show value arriving', d: 'A static +US$5 badge is a label. Money landing — a coin dropping, a balance ticking, a row appearing — is what converts a reader of the offer into someone who fills the form.' },
      { t: 'Hint at repeating', d: 'The offer has no obvious cap, and nothing on screen suggests referring twice is worth it. Compounding is the strongest argument available and it is currently unused.' },
      { t: 'Earn its half of the box', d: 'The right half is currently one line, two circles and empty orange. In a box this large that reads as unfinished and makes the whole offer feel provisional.' },
    ],
  },
  pick: [
    { k: 'My pick', h: '4 · Two Wallets', d: 'Perfect symmetry answers the only question anyone has — do I really get the same as them — and the numbers rising is the most persuasive motion available next to a form. It is also the calmest, which matters when the real call to action is the email field beside it.' },
    { k: 'If the goal is virality', d: '1 · Chain Reaction. It is the only option that shows the upside growing past one friend. Worth checking against the programme\'s actual cap before shipping, since it implies unlimited earning.' },
    { k: 'If the goal is credibility', d: '5 · Referral Ledger. A money claim is more believable as an account statement than as an illustration, and it quietly signals that other people are already doing this.' },
  ],
});

/* ── /network · hero ──────────────────────────────────────────── */
buildBoard(document.getElementById('board-nethero'), {
  id: 'nethero',
  kicker: 'Network Infrastructure',
  heading: 'The World\'s Most',
  headingAccent: 'Reliable Network',
  lead: 'Built on partnerships with 50+ Tier-1 carriers globally. Automatic network switching ensures you always have the strongest signal and fastest speeds.',
  bullets: [
    '<b>50+</b> Tier-1 carriers',
    '<b>190+</b> countries',
    '<b>99.9%</b> uptime SLA',
    '<b>5G</b> ready',
  ],
  variants: NET_HERO_VARIANTS,
  compareTitle: 'All seven, side by side',
  keptIdentical: keptGlobal,
  thinking: {
    title: 'The headline makes two claims and the artwork proves neither',
    lead: '"Most reliable" is a claim about time. "Automatic switching" is a claim about change. A still diagram of three masts can express neither, however well drawn it is.',
    jobs: [
      { t: 'Prove reliability over time', d: 'Reliability only exists across a duration. Something has to survive a visible interruption, or a number has to hold steady while conditions move underneath it.' },
      { t: 'Show the switch', d: 'Automatic switching is the differentiator on this whole page. Right now nothing switches, so the most valuable sentence in the hero is carried entirely by the copy.' },
      { t: 'Make 50+ look like fifty', d: 'Three masts illustrate three carriers. The stat directly beneath says fifty. Either show quantity or stop drawing individual towers.' },
    ],
  },
  pick: [
    { k: 'My pick', h: '1 · Mast Handoff', d: 'It keeps the exact composition that is live — same masts, same phone, same bloom — and adds the one thing missing: the handoff actually happening, with full bars held through every switch. Smallest diff on the board and it converts the diagram into proof of both claims.' },
    { k: 'If the goal is credibility', d: '6 · Network HUD, or 2 · Uptime Trace. Both read as monitoring rather than marketing, which is the right register for an enterprise-grade claim, and both can be wired to real values so they stay honest.' },
    { k: 'If the goal is conversion', d: '3 · Coverage Arcs. Reliability is what you say to engineers; "you are going to Tokyo and it will just work" is what you say to travellers. Also the warmest option and reusable on the country pages.' },
  ],
});

/* ── /network · Why Our Network is Different ──────────────────── */
buildBoard(document.getElementById('board-why'), {
  id: 'why',
  kicker: 'Advanced Features',
  heading: 'Why Our Network is',
  headingAccent: 'Different',
  lead: 'Advanced technology that keeps you connected. Four capabilities sit beside this panel — automatic switching, LTE/5G, built-in redundancy and global roaming — and the panel should be supporting at least one of them.',
  bullets: [
    '<b>Automatic switching</b> — zero manual intervention',
    '<b>LTE/5G ready</b> — up to 1 Gbps speeds',
    '<b>Redundancy built-in</b> — 99.9% uptime',
    '<b>Global roaming</b> — true global coverage',
  ],
  variants: WHY_VARIANTS,
  compareTitle: 'All four, side by side',
  keptIdentical: [
    'Same white card, same grid of rounded squares where kept',
    'Same warm orange tints and the same badge at the foot',
    'Same panel size and position beside the four feature cards',
    'Pure inline SVG + SMIL — no new dependency',
  ],
  thinking: {
    title: 'Pretty texture, doing no work',
    lead: 'The grid twinkles on random timers. It is genuinely nice to look at, and it supports none of the four claims printed immediately to its right.',
    jobs: [
      { t: 'Count something', d: 'Random opacity changes read as decoration. The same cells, lit in a deliberate order with a counter, read as a system checking every network it has.' },
      { t: 'Support a card', d: 'Four capabilities are listed beside this panel. Illustrating even one of them — redundancy is the one customers worry about — earns the space better than abstract texture.' },
      { t: 'Resolve', d: 'There is no start and no end, so nothing ever completes. A loop that reaches a conclusion gives a visitor a reason to watch it once through.' },
    ],
  },
  pick: [
    { k: 'My pick', h: '1 · Coverage Sweep', d: 'It is nearly free — the existing grid plus a sweep and a counter — and it converts decoration into a measurable claim that resolves at 190+. Lowest risk, clearest gain, and it keeps the texture you already like.' },
    { k: 'If the goal is trust', d: '2 · Failover Grid. Redundancy is the card that actually sells reliability, and a visible outage with no visible consequence is the strongest proof of it available in one panel.' },
    { k: 'If the goal is clarity', d: '3 · Feature Stack. It makes the panel a legend for the four cards, so the section finally coheres — at the cost of the map-ish atmosphere the grid currently gives you.' },
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
