/* Orchestrator: board registry, overview landing, two-level nav, lazy build. */

import { buildBoard } from './board.js';
import { initTier1 } from './app.js';
import { TONES } from './kit.js';
import { WHAT_VARIANTS } from './esim-what.js';
import { TRAVEL_VARIANTS } from './esim-travel.js';
import { REFERRAL_VARIANTS } from './referral.js';
import { NET_HERO_VARIANTS, WHY_VARIANTS } from './network.js';
import { AI_VARIANTS } from './t1-sections.js';
import { MARKET_VARIANTS } from './t1-market.js';
import { ACCESS_VARIANTS } from './t1-access.js';
import { BIZ_HERO_VARIANTS } from './business.js';
import { BIZ_NEEDS_VARIANTS } from './business-needs.js';
import { HOSP_VARIANTS } from './hosp.js';
import { BLOG_VARIANTS } from './iot-blog.js';
import { C1_VARIANTS, C2_VARIANTS, C3_VARIANTS, WIDE, SMALL } from './iot-cells.js';
import { LOUNGE_VARIANTS, NOMAD_VARIANTS, KYC_VARIANTS, LOUNGE_BOX, NOMAD_BOX, KYC_BOX } from './plus.js';
import { ICONS } from './icons.js';
import { buildIconBoard } from './iconboard.js';

const KEPT_ORANGE = [
  'Same warm Openline orange: #FF5314 / #E23D00',
  'Same panel: rounded card, dotted field, floating pills',
  'Same section copy, bullets and layout — only the artwork changes',
  'Pure inline SVG + SMIL — no new dependency, honours reduced-motion',
];
const kept = (hex1, hex2, extra = []) => [
  `Same accent system: ${hex1} / ${hex2}`,
  'Same panel size, position and framing on the page',
  'Same section copy and bullets — only the artwork changes',
  ...extra,
  'Pure inline SVG + SMIL — no new dependency, honours reduced-motion',
];

/* ══════════════════════════ THE REGISTRY ══════════════════════════ */
export const BOARDS = [
  /* ── /multiple-tier1 ─────────────────────────────────────────── */
  {
    key: 'tier1', page: 'Multiple Tier-1', path: '/multiple-tier1', section: 'Hero',
    count: 10, accent: TONES.cyan, special: 'tier1',
    problem: 'The chip sits still and one comet crosses every five seconds — most visitors see a static picture.',
  },
  {
    key: 't1ai', page: 'Multiple Tier-1', path: '/multiple-tier1', section: 'AI-Powered Network Selection',
    count: 5, accent: TONES.cyan, variants: AI_VARIANTS,
    problem: '"Evaluating every second" is asserted while nothing on screen ever updates.',
    cfg: {
      kicker: 'Intelligent Technology', heading: 'AI-Powered', headingAccent: 'Network Selection',
      lead: 'Our advanced machine learning algorithms continuously analyze signal strength, network congestion, and real-time pricing data to automatically connect you to the optimal Tier-1 network every second.',
      bullets: ['<b>AI-powered selection</b> — signal, congestion and pricing in real time',
        '<b>Dynamic optimization</b> — switches when a better option appears',
        '<b>Every second</b> — continuous evaluation, not a one-off choice',
        '<b>Zero input</b> — nothing for the traveller to configure'],
      keptIdentical: kept('#06B6D4', '#0891B2', ['Same operator scoreboard card and score bars']),
      thinking: {
        title: 'This panel has one job the current version skips',
        lead: 'The copy names three inputs and a cadence. The artwork shows neither — only the result of a decision already taken.',
        jobs: [
          { t: 'Show the inputs', d: 'Signal, congestion and price are named in the sentence beside this panel and are completely absent from it. Naming them on screen is what turns a claim into a mechanism.' },
          { t: 'Honour the cadence', d: '"Every second" is the most checkable claim in the section. If nothing moves on a one-second beat, the sentence quietly undermines itself.' },
          { t: 'Keep the scoreboard', d: 'Operator names with numbers beside them is the honest part of what is live today. Whatever replaces it should keep that and add motion, not swap it for a metaphor.' },
        ],
      },
      pick: [
        { k: 'My pick', h: '2 · Live Reorder', d: 'It is the smallest possible change — the same card, but the scores move and the rows re-sort — and it converts the weakest claim on the page into something a visitor can watch happen. If you want the mechanism explained as well, 1 · Decision Trace is the one to ship.' },
        { k: 'If the goal is credibility', d: '5 · Evaluation Log. A log with a rate counter is the most direct evidence of "every second" available, and the cheapest to make truthful once it is wired to the real engine.' },
        { k: 'If the goal is a premium feel', d: '4 · Trade-off Radar. It shows a trade-off rather than a single score, which is the honest reason an AI is needed here, and it is the best-looking option on the board.' },
      ],
    },
  },
  {
    key: 't1market', page: 'Multiple Tier-1', path: '/multiple-tier1', section: 'The Data Stock Market',
    count: 5, accent: TONES.cyan, variants: MARKET_VARIANTS,
    problem: 'A chart labelled "live" that never moves, under a claim of trading the market 24/7.',
    cfg: {
      kicker: 'Market Intelligence', heading: 'The', headingAccent: 'Data Stock Market',
      lead: 'Mobile data operates like a stock market — prices fluctuate constantly based on demand, network capacity, and market conditions. Our proprietary OMDM™ platform trades this market 24/7 with AI to secure the lowest wholesale prices and pass the savings directly to you.',
      bullets: ['<b>Real-time pricing</b> — capacity prices move like stock prices',
        '<b>Smart buying</b> — the AI buys at the dip, around the clock',
        '<b>Savings passed on</b> — the fill price sets your price',
        '<b>Automated</b> — no manual procurement anywhere in the loop'],
      keptIdentical: kept('#06B6D4', '#0891B2', ['Same bordered price card and green change badge']),
      thinking: {
        title: 'You cannot label a still image "live"',
        lead: 'The market metaphor is good and already on brand. The execution states a price, a discount and a BUY tag, and then stops — which is the one thing a market never does.',
        jobs: [
          { t: 'Move, because markets move', d: 'Volatility is the entire premise. A chart that does not move argues against the sentence next to it more effectively than anything a competitor could write.' },
          { t: 'Show the buy as an event', d: 'A BUY tag pinned to one bar is a label. A fill landing on a trough, with a price beside it, is a decision — and decisions are what the AI is being credited with.' },
          { t: 'End on the reader\'s benefit', d: 'Trading is our problem. The reader only cares that their own price is lower and steadier than the market. At least one frame should say that plainly.' },
        ],
      },
      pick: [
        { k: 'My pick', h: '2 · Dip Hunter', d: 'Clearest cause and effect on the board: the price falls, the AI buys, the saving accumulates. It is also the lightest to build and the only one that reads perfectly at phone width without changes.' },
        { k: 'If the goal is credibility', d: '1 · Live Candles or 3 · Order Book. Both look like instruments rather than illustrations, which is exactly the register a trading claim needs. Candles are the more legible of the two.' },
        { k: 'If the goal is conversion', d: '4 · Market vs Your Price. The shaded gap between a thrashing market line and your flat one is the single clearest way to draw a saving, and the reader is the subject rather than us.' },
      ],
    },
  },
  {
    key: 't1access', page: 'Multiple Tier-1', path: '/multiple-tier1', section: 'Access to 50+ Tier-1 Networks',
    count: 5, accent: TONES.cyan, variants: ACCESS_VARIANTS,
    problem: 'Three masts drawn under a headline that claims fifty-plus partners.',
    cfg: {
      kicker: 'Premium Access', heading: 'Access to', headingAccent: '50+ Tier-1 Networks',
      lead: 'We partner with the world\'s leading mobile network operators to provide you with unmatched coverage, speed, and reliability across 190+ countries — all powered by AI.',
      bullets: ['Always connected to the strongest available signal',
        'AI automatically selects the best network every second',
        'Access to 50+ premium Tier-1 network partners',
        'Seamless handoffs between networks'],
      keptIdentical: kept('#06B6D4', '#0891B2', ['Same white phone, mast motif and three ticks']),
      thinking: {
        title: 'The headline is a number, and the number is missing',
        lead: 'Everything in this panel is well drawn. It just answers a different question from the one the heading asks.',
        jobs: [
          { t: 'Show the roster, not one link', d: 'The claim is breadth. Three towers and one carrier name is the narrowest possible illustration of it, and the partner names are the credibility.' },
          { t: 'Make the handoff visible', d: '"Seamless handoffs between networks" is the second bullet. Nothing in the panel ever hands off, so the bullet is carried entirely by the copy.' },
          { t: 'Explain why Tier-1 matters', d: 'Most visitors do not know what Tier-1 means. One option should answer that instead of assuming it, since the whole page is built on the distinction.' },
        ],
      },
      pick: [
        { k: 'My pick', h: '1 · Operator Roster', d: 'Real partner names are the credibility in this section, and a fanned deck is the only option that shows many of them while the front card changing doubles as the handoff story. Keeps the phone and the palette intact.' },
        { k: 'If the goal is the smallest diff', d: '5 · Signal Ladder. Same masts, same phone, same composition — the masts simply re-rank and the phone follows, which adds both missing behaviours without a new metaphor.' },
        { k: 'If the goal is positioning', d: '3 · Tier Ladder. It is the only option that explains what Tier-1 buys you, and it pairs directly with the "Why Tier-1 Matters" block higher up the page. Worth a legal read first.' },
      ],
    },
  },

  /* ── /global-esim ────────────────────────────────────────────── */
  {
    key: 'what', page: 'Global eSIM', path: '/global-esim', section: 'What is an eSIM?',
    count: 3, accent: TONES.orange, variants: WHAT_VARIANTS,
    problem: 'A grey rectangle, a dashed arrow, and an idea fully stated in the first 200 ms.',
    cfg: {
      kicker: 'Technology Explained', heading: 'What is an', headingAccent: 'eSIM?',
      lead: 'An eSIM (embedded SIM) is a digital SIM card that\'s built directly into your smartphone. Instead of inserting a physical SIM card, you simply scan a QR code to activate mobile service. It\'s the modern way to connect — faster, easier, and more flexible.',
      bullets: ['<b>No physical SIM card</b> — everything is digital',
        '<b>Instant activation</b> — scan a QR code, connected in 30 seconds',
        '<b>Multiple plans on one device</b> — store and switch freely',
        '<b>Perfect for travel</b> — buy before you go, activate on arrival'],
      keptIdentical: KEPT_ORANGE,
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
        { k: 'My pick', h: '1 · Etch & Activate', d: 'It is the only option that shows the 30-second install the copy promises, and the QR code makes the mechanism self-explanatory in any language. It also ends on a resolved "eSIM ACTIVE" state, so a paused frame still reads correctly.' },
        { k: 'If the goal is conversion', d: '3 · Profile Drawer. "Store several plans and switch between them" is the bullet frequent travellers actually buy, and the drawer makes it an object rather than a claim. Also the calmest and safest on a phone.' },
        { k: 'If the goal is switching from a competitor', d: '2 · Two Ways In. The only one that puts a number on the pain — 28 seconds against three days — and cost comparisons travel further than product illustration. Check the tone against brand voice.' },
      ],
    },
  },
  {
    key: 'travel', page: 'Global eSIM', path: '/global-esim', section: 'Everything You Need for Seamless Travel',
    count: 3, accent: TONES.orange, variants: TRAVEL_VARIANTS,
    problem: 'Three rows of identical geometry and a bar labelled COST with no unit.',
    cfg: {
      kicker: 'Everything Included', heading: 'Everything You Need for', headingAccent: 'Seamless Travel',
      lead: 'Our global eSIM includes all the features you need for seamless international connectivity, without the hassle of traditional SIM cards or expensive roaming fees.',
      bullets: ['Use one eSIM across all your destinations', 'No need to purchase separate country plans',
        'Automatic network selection in each country', 'Keep your original phone number active',
        'Manage everything from one app', 'Top up data anywhere, anytime',
        'No registration or ID verification required', 'Install before you travel, activate on arrival'],
      keptIdentical: KEPT_ORANGE,
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
        { k: 'My pick', h: '1 · Border Run', d: 'It keeps today\'s argument exactly — plastic stalls, Openline does not — but runs it on one continuous line with real city names, so the whole panel has a single subject and the loop has built-in rhythm.' },
        { k: 'If the goal is a premium feel', d: '2 · One Card, Every Flag. Nothing moves except the network name, the data trace never breaks, and the three zero-counters do the arguing.' },
        { k: 'If the goal is credibility', d: '3 · Trip Tape. It looks like the Openline app doing its job rather than an illustration about it, and it scales to any itinerary length.' },
      ],
    },
  },

  /* ── /home ──────────────────────────────────────────────────── */
  {
    key: 'referral', page: 'Home', path: '/home', section: 'Refer a friend box',
    count: 5, accent: TONES.orange, variants: REFERRAL_VARIANTS,
    problem: 'Two circles, one line, no motion — and half the orange box left empty.',
    cfg: {
      sectionTone: 'accentBox', stageTone: 'orange',
      kicker: 'Referral programme', heading: 'Refer a friend, and you\'ll both', headingAccent: 'get US$5!',
      lead: 'Share your unique referral link with friends and family. When they make their first purchase, you\'ll both receive $5 credit.',
      bullets: ['Unique link per account, no code to remember',
        'Credit lands as soon as their first purchase clears',
        'Both sides get the same US$5 — no small print',
        'Join 1M+ travellers already earning rewards'],
      keptIdentical: ['Same orange box, same copy, same email form',
        'Artwork stays white-on-orange with the mint credit badges',
        'Same panel size — only the right half changes',
        'Pure inline SVG + SMIL — no new dependency'],
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
        { k: 'My pick', h: '4 · Two Wallets', d: 'Perfect symmetry answers the only question anyone has — do I really get the same as them — and rising numbers are the most persuasive motion available next to a form. It is also the calmest, which matters when the real call to action is the email field beside it.' },
        { k: 'If the goal is virality', d: '1 · Chain Reaction. The only option that shows the upside growing past one friend. Check it against the programme\'s actual cap before shipping.' },
        { k: 'If the goal is credibility', d: '5 · Referral Ledger. A money claim is more believable as an account statement than as an illustration, and it quietly signals that other people are already doing this.' },
      ],
    },
  },

  /* ── /network ───────────────────────────────────────────────── */
  {
    key: 'nethero', page: 'Network', path: '/network', section: 'Hero',
    count: 6, accent: TONES.orange, variants: NET_HERO_VARIANTS,
    problem: 'Two claims in the headline — reliability and switching — and a still diagram proving neither.',
    cfg: {
      kicker: 'Network Infrastructure', heading: 'The World\'s Most', headingAccent: 'Reliable Network',
      lead: 'Built on partnerships with 50+ Tier-1 carriers globally. Automatic network switching ensures you always have the strongest signal and fastest speeds.',
      bullets: ['<b>50+</b> Tier-1 carriers', '<b>190+</b> countries', '<b>99.9%</b> uptime SLA', '<b>5G</b> ready'],
      keptIdentical: KEPT_ORANGE,
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
        { k: 'My pick', h: '1 · Mast Handoff', d: 'It keeps the exact composition that is live — same masts, same phone, same bloom — and adds the one thing missing: the handoff happening, with full bars held through every switch. Smallest diff on the board.' },
        { k: 'If the goal is credibility', d: '6 · Network HUD, or 2 · Uptime Trace. Both read as monitoring rather than marketing, and both can be wired to real values so they stay honest.' },
        { k: 'If the goal is conversion', d: '3 · Coverage Arcs. Reliability is what you say to engineers; "you are going to Tokyo and it will just work" is what you say to travellers.' },
      ],
    },
  },
  {
    key: 'why', page: 'Network', path: '/network', section: 'Why Our Network is Different',
    count: 3, accent: TONES.orange, variants: WHY_VARIANTS,
    problem: 'A grid twinkling at random beside four capability cards it never illustrates.',
    cfg: {
      kicker: 'Advanced Features', heading: 'Why Our Network is', headingAccent: 'Different',
      lead: 'Advanced technology that keeps you connected. Four capabilities sit beside this panel — automatic switching, LTE/5G, built-in redundancy and global roaming — and the panel should be supporting at least one of them.',
      bullets: ['<b>Automatic switching</b> — zero manual intervention', '<b>LTE/5G ready</b> — up to 1 Gbps speeds',
        '<b>Redundancy built-in</b> — 99.9% uptime', '<b>Global roaming</b> — true global coverage'],
      keptIdentical: ['Same white card and grid of rounded squares where kept',
        'Same warm orange tints and the same badge at the foot',
        'Same panel size and position beside the four feature cards',
        'Pure inline SVG + SMIL — no new dependency'],
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
        { k: 'My pick', h: '1 · Coverage Sweep', d: 'It is nearly free — the existing grid plus a sweep and a counter — and it converts decoration into a measurable claim that resolves at 190+. Lowest risk, clearest gain, keeps the texture you already like.' },
        { k: 'If the goal is trust', d: '2 · Failover Grid. Redundancy is the card that actually sells reliability, and a visible outage with no visible consequence is the strongest proof of it available in one panel.' },
        { k: 'If the goal is clarity', d: '3 · Feature Stack. It makes the panel a legend for the four cards, so the section finally coheres — at the cost of the map-ish atmosphere the grid gives you.' },
      ],
    },
  },

  /* ── /business ──────────────────────────────────────────────── */
  {
    key: 'bizhero', page: 'Business', path: '/business', section: 'Hero',
    count: 5, accent: TONES.blue, variants: BIZ_HERO_VARIANTS,
    problem: 'A dashboard marked LIVE that never updates, beside three promises none of which is shown.',
    cfg: {
      kicker: 'Business Solutions', heading: 'Keep Your Team Connected', headingAccent: 'Globally',
      lead: 'Enterprise eSIM solutions that reduce costs by 75%, eliminate admin headaches, and keep your distributed teams connected across 190+ countries.',
      bullets: ['<b>75%</b> cost savings versus roaming', '<b>190+</b> countries covered',
        '<b>24/7</b> business support', '<b>One</b> dashboard for every team member'],
      keptIdentical: kept('#2563EB', '#1D4ED8', ['Same dashboard card, avatars and green savings banner']),
      thinking: {
        title: 'Three promises, one picture, no motion',
        lead: 'The copy claims a 75% saving, an end to admin, and 190+ countries. The panel shows a dashboard screenshot — which is the right surface, but it proves none of the three.',
        jobs: [
          { t: 'Prove the number', d: '75% is the first thing a buyer reads and the first thing they doubt. A banner asserting it is weaker than an invoice shrinking on screen.' },
          { t: 'Show the admin disappearing', d: '"Eliminate admin headaches" has no visual at all. Provisioning a person in thirty seconds is a picture; a headache is not.' },
          { t: 'Stop labelling stills "live"', d: 'A dashboard marked LIVE that never changes actively damages trust with exactly the audience this page is written for.' },
        ],
      },
      pick: [
        { k: 'My pick', h: '2 · Invoice Showdown', d: 'It turns the headline number into arithmetic the buyer can follow, on the artefact they are actually trying to shrink. The climbing roaming total gives the loop real tension before the payoff lands.' },
        { k: 'If the goal is operations', d: '3 · Zero-Admin Onboarding. It is the only option that illustrates the middle promise, and it keeps the dashboard framing an IT buyer already recognises.' },
        { k: 'If the goal is credibility', d: '4 · Ops Feed. Usage, policy and billing events in one console covers several bullets at once and reads like the system their team would watch.' },
      ],
    },
  },
  {
    key: 'bizneeds', page: 'Business', path: '/business', section: 'Everything Your Business Needs',
    count: 5, accent: TONES.blue, variants: BIZ_NEEDS_VARIANTS,
    problem: 'Eight capabilities listed, one of them illustrated, and a console that does nothing.',
    cfg: {
      kicker: 'Complete Solution', heading: 'Everything Your Business', headingAccent: 'Needs',
      lead: 'Openline Business Solutions includes all the features you need to manage connectivity for distributed teams, from real-time monitoring to enterprise security.',
      bullets: ['Single dashboard for all team members', 'One consolidated invoice per billing period',
        'Real-time usage monitoring and alerts', 'Priority 24/7 business support',
        'Enterprise security and compliance', 'Flexible billing terms and contracts',
        'Custom SLAs and uptime guarantees', 'API access for integration'],
      keptIdentical: kept('#2563EB', '#1D4ED8', ['Same fleet-console card, group rows and footer line']),
      thinking: {
        title: 'Eight capabilities, one picture',
        lead: 'The console is the right surface and the group-level framing is exactly how an IT buyer thinks. It just sits completely still while eight specific claims go unillustrated beside it.',
        jobs: [
          { t: 'Cover more of the list', d: 'Monitoring, alerts, security, SLA and API are all named in the copy and none of them appears in the panel. A console that cycles its own tabs can carry most of them.' },
          { t: 'Make the console behave like one', d: 'The word console implies something happening. Static bars beside a claim about real-time monitoring is the exact contradiction to avoid.' },
          { t: 'Dramatise one thing', d: 'Breadth is useful, but an IT manager remembers the demo where something broke and fixed itself. At least one option should do that rather than list.' },
        ],
      },
      pick: [
        { k: 'My pick', h: '2 · Alert & Resolve', d: 'A visible problem with an invisible fix is the strongest enterprise proof available in one panel, and "resolved without a ticket" is the line that actually sells this product. It also keeps the existing console and just brings the bars alive.' },
        { k: 'If the goal is coverage', d: '1 · Console Tabs. It is the only option that carries most of the eight capabilities, and each tab doubles as a preview of the real product.' },
        { k: 'If the goal is pricing', d: '3 · Scale Dial. One gesture, three responding numbers, and it sets up the pricing section that follows immediately below.' },
      ],
    },
  },

  /* ── /hospitality ───────────────────────────────────────────── */
  {
    key: 'hosp', page: 'Hospitality', path: '/hospitality', section: 'Hero',
    count: 5, accent: TONES.teal, variants: HOSP_VARIANTS,
    problem: 'A charming drawing of a hotel, four unrelated numbers, and nothing moving.',
    cfg: {
      kicker: 'Hospitality Partners', heading: 'Delight Guests with', headingAccent: 'Instant Connectivity',
      lead: 'Transform guest experience and create new revenue streams by offering seamless global connectivity. Perfect for hotels, resorts, vacation rentals, and travel operators.',
      bullets: ['<b>85%</b> would recommend the property', '<b>2x</b> more ancillary revenue',
        '<b>190+</b> countries covered', '<b>$0</b> upfront cost to the property'],
      keptIdentical: kept('#0D9488', '#0F766E', ['Same flat illustration style and floating stat pills']),
      thinking: {
        title: 'A picture of a category, not of a benefit',
        lead: 'The illustration is warm and unmistakably hospitality. It is also inert, and the four pills around it are four unrelated labels rather than one argument.',
        jobs: [
          { t: 'Connect the property to a guest', d: 'Nothing in the panel links the building to a traveller, a phone, or the product. The partnership only makes sense as a transaction between those three.' },
          { t: 'Make one number the hero', d: 'Four floating figures compete. A general manager is deciding on either revenue or rating — pick one, show it moving, and let the others support it.' },
          { t: 'Answer "is this for me?"', d: 'The page sells to hotels, resorts, rentals and operators. The hero draws one city hotel, which is the reader most likely to already be convinced.' },
        ],
      },
      pick: [
        { k: 'My pick', h: '1 · Check-in to Connected', d: 'The only option that shows the actual transaction — guest arrives, scans, connects, property earns — from both sides in the same beat. It makes "instant" literal rather than adjectival.' },
        { k: 'If the goal is commercial', d: '2 · Revenue Meter. It shows the maths behind the $2,500 figure instead of asserting it, and sets up the revenue calculator further down the page.' },
        { k: 'If the goal is breadth', d: '3 · Every Property Type. It keeps the illustration everyone likes and makes it answer the reader\'s first objection, that this is built for big chains.' },
      ],
    },
  },

  /* ── /iot ───────────────────────────────────────────────────── */
  /* ── /iot · the bento grid ──────────────────────────────────────
     Three animated cells, three different boxes, measured on the live
     page at 1440px. Each board below is drawn to its real embed size. */
  {
    key: 'iotwide', page: 'IoT', path: '/iot', section: 'Cell 1 · wide, beside "Global Out of the Box"',
    short: 'Cell 1 · wide', count: 6, accent: TONES.purple, variants: C1_VARIANTS, embed: WIDE,
    problem: 'A 740×234 cell carrying grey bars that are not a chart, beside a card about shipping one SKU worldwide.',
    cfg: {
      embed: WIDE,
      kicker: 'Why eSIM · cell 1 of 3', heading: 'Global out of the box.', headingAccent: 'One SKU, everywhere.',
      lead: 'The widest animated cell in the bento grid, 740×234, sitting immediately beside the "Global Out of the Box" card: ship one SKU worldwide, no country-specific SIM cards, no regional inventory. Every option below is drawn to that exact box.',
      bullets: ['<b>Real box</b> — 740 × 234, col-span-2', '<b>Neighbour card</b> — Global Out of the Box',
        '<b>Subject</b> — one SKU, no regional stock', '<b>Shape</b> — 3.16:1, so compositions run horizontally'],
      keptIdentical: kept('#8B5CF6', '#7C3AED', ['Same purple dotted field and soft bloom', 'Same 740×234 cell, same corner radius']),
      thinking: {
        title: 'A very wide cell doing a very small job',
        lead: 'This is the largest piece of canvas in the section and it is spending it on eleven grey bars with no axis. The card beside it makes a specific, checkable claim about inventory. That claim is what the cell should be carrying.',
        jobs: [
          { t: 'Serve the neighbour', d: 'In a bento grid every animated cell sits beside a text card and is read as its illustration. This one illustrates nothing, so the pairing reads as decoration.' },
          { t: 'Use the width', d: 'At 3.16:1 a centred subject wastes most of the cell. Conveyors, tickers, timelines and drain-to-zero sequences all want exactly this shape.' },
          { t: 'Give procurement a number', d: 'The buyer here manages part numbers and stock. SKUs 42 → 1 and units held 8,400 → 0 are the two figures that close the argument.' },
        ],
      },
      pick: [
        { k: 'My pick', h: '1 · Inventory to Zero', d: 'It is the literal content of the card beside it, the drain-right motion is exactly what a 3.16:1 cell wants, and it lands the two numbers a hardware buyer actually cares about.' },
        { k: 'If the goal is endless motion', d: '3 · One Line, Every Country. The strip never resets, so the cell always looks live rather than caught mid-loop.' },
        { k: 'If the goal is restraint', d: '4 · One Ninety. Almost nothing to draw, nothing to break, and the count carries the whole argument.' },
      ],
    },
  },

  {
    key: 'iotchip', page: 'IoT', path: '/iot', section: 'Cell 2 · small, beside "Smaller Form Factor"',
    short: 'Cell 2 · small', count: 6, accent: TONES.purple, variants: C2_VARIANTS, embed: SMALL,
    problem: 'A 360×234 cell with a chip and four unlabelled pads, in the row about form factor and cost.',
    cfg: {
      embed: SMALL,
      kicker: 'Why eSIM · cell 2 of 3', heading: 'Soldered in.', headingAccent: 'Six square millimetres.',
      lead: 'The single-column cell in row three, 360×234, sitting between "Smaller Form Factor" and "Lower Total Cost" — and one row below "Tamper-Proof Security". It is the smallest animated box in the section, so every option here is built to read at that size.',
      bullets: ['<b>Real box</b> — 360 × 234, single column', '<b>Neighbour cards</b> — Smaller Form Factor, Lower Total Cost',
        '<b>Subject</b> — no slot, no tray, soldered down', '<b>Shape</b> — 1.54:1, the tightest cell in the grid'],
      keptIdentical: kept('#8B5CF6', '#7C3AED', ['Same purple chip idiom on a dotted field', 'Same 360×234 cell']),
      thinking: {
        title: 'The right subject, with nothing measured',
        lead: 'This is the only live cell already drawing the right object. What it never does is give a dimension — and the two cards it sits between are both, in the end, about a number.',
        jobs: [
          { t: 'State the footprint', d: '30 mm² down to 6 mm² is the figure both neighbouring cards imply. Right now the cell shows a chip and leaves the reader to take "smaller" on faith.' },
          { t: 'Show it is fixed', d: 'Soldered is the security claim and the reliability claim at once. Four floating outlines do not communicate a part that cannot be removed.' },
          { t: 'Survive 360px', d: 'This is the smallest animated cell in the grid. Anything with more than one idea in it will not read here.' },
        ],
      },
      pick: [
        { k: 'My pick', h: '1 · The Tray Ejects', d: 'One beat, one unmistakable object, and it lands the footprint figure both neighbouring cards are really about. It is also the only option that reads perfectly at 360px with no text at all.' },
        { k: 'If the goal is the benefit', d: '2 · Space Reclaimed. Showing the freed space being spent on a bigger battery is the harder and better half of the argument.' },
        { k: 'If the goal is security', d: '3 · Solder Down. Nothing else in the whole grid supports the Tamper-Proof Security card.' },
      ],
    },
  },

  {
    key: 'iotdark', page: 'IoT', path: '/iot', section: 'Cell 3 · wide dark, beside "Instant Activation"',
    short: 'Cell 3 · wide dark', count: 6, accent: TONES.purple, variants: C3_VARIANTS, embed: WIDE,
    stageTone: 'dark',
    problem: 'A 740×234 dark cell with a sphere centred in it, leaving two thirds empty and nothing activating.',
    cfg: {
      embed: WIDE, stageTone: 'dark',
      kicker: 'Why eSIM · cell 3 of 3', heading: 'Instant activation.', headingAccent: 'At fleet scale.',
      lead: 'The dark cell at the bottom of the grid, 740×234, spanning two columns beside "Instant Activation": devices connect the moment they are powered on, zero-touch provisioning for mass deployments. It is the only dark surface on the page and the best-looking cell in the section.',
      bullets: ['<b>Real box</b> — 740 × 234, col-span-2, dark', '<b>Neighbour card</b> — Instant Activation',
        '<b>Subject</b> — zero-touch, at fleet scale', '<b>Shape</b> — 3.16:1, so a centred sphere wastes it'],
      keptIdentical: kept('#8B5CF6', '#7C3AED', ['Same near-black gradient panel and purple dot texture', 'Same 740×234 dark cell']),
      thinking: {
        title: 'The best cell on the page, mostly empty',
        lead: 'The dark treatment is the strongest visual decision anywhere in this section. It is being spent on a sphere centred in a cell three times wider than it is tall, with two thirds of the surface left as gradient.',
        jobs: [
          { t: 'Fill the width', d: 'Either stretch the subject across all 740px, or keep the sphere and put something live in the space beside it. Both are proposed below.' },
          { t: 'Make something activate', d: 'The card beside it is about the moment a device comes online. Nothing in the current cell comes online.' },
          { t: 'Carry the number', d: 'A dark panel is the best possible place on this page for one large live figure, and it currently has none.' },
        ],
      },
      pick: [
        { k: 'My pick', h: '1 · Night Side', d: 'It keeps the dark treatment that makes this cell work, uses the entire 740px, and every light in it is an activation — so the motion and the message are the same thing.' },
        { k: 'If the goal is least risk', h: '3 · Globe and Ledger', d: 'The sphere is untouched and the wasted two thirds becomes a live activation log. It is the smallest change that fixes the real problem.' },
        { k: 'If the goal is a hard number', d: '4 · Time to First Byte. "The moment they are powered on" is a claim about time, and this is the only option that puts a clock on it.' },
      ],
    },
  },


  /* ── /openline-plus · the only dark page in the hub ───────────────── */
  {
    key: 'pluslounge', page: 'Openline+', path: '/openline-plus', section: 'Airport Lounge & Fast Track Access',
    short: 'Lounge & fast track', count: 6, accent: TONES.orange, variants: LOUNGE_VARIANTS,
    embed: LOUNGE_BOX, stageTone: 'plus',
    problem: 'A boarding pass and two queue bars using a third of a 642px-tall dark panel, with no lounge in it.',
    cfg: {
      embed: LOUNGE_BOX, stageTone: 'plus',
      kicker: 'Openline+ · perks', heading: 'Airport Lounge &', headingAccent: 'Fast Track Access',
      lead: 'The left cell of the perks block on the dark Openline+ page, measured at 574×642. The right cell carries the benefit cards, so this panel never has to hold copy. Access to VIP lounges and security fast track, included in the $99 plan.',
      bullets: ['<b>Real box</b> — 574 × 642, tall', '<b>Surface</b> — dark navy panel, orange accent',
        '<b>Subject</b> — lounge access and fast track', '<b>Job</b> — make the perk pay for the plan'],
      keptIdentical: kept('#FF5314', '#E23D00', ['Same dark navy panel, warm gradient and dot field', 'Same 574×642 cell']),
      thinking: {
        title: 'A good object, in a panel twice its size',
        lead: 'The boarding pass is the best single object on this page. It is sitting in the top third of a very tall panel above two bars that never finish, and the word "Lounge" — first word of the section title — is never illustrated.',
        jobs: [
          { t: 'Finish the comparison', d: 'Two lanes is the right idea, but neither bar resolves. A fast-track claim is worth nothing until the reader sees one lane finish while the other is still going.' },
          { t: 'Show the lounge', d: 'Half the section title is about a room with a shower, a meal and a desk in it. Nothing on the panel suggests any of that exists.' },
          { t: 'Connect it to the price', d: 'A day pass and a fast-track ticket have list prices. Four trips a year covers most of the $99, and that arithmetic is not on screen anywhere.' },
        ],
      },
      pick: [
        { k: 'My pick', h: '1 · Two Lanes, One Clock', d: 'A queue is a vertical object and this is a tall panel, so it fills the box as its subject rather than padding it. One clock across both lanes makes the saving impossible to argue with, and the regular lane still running after you are through is the beat people remember.' },
        { k: 'If the goal is value', d: '4 · What It Would Have Cost. It is the only option that makes the perk visibly pay for the subscription.' },
        { k: 'If the goal is least risk', d: '6 · Pass, Upgraded. Same objects, same layout, but the composition is centred and finally resolves.' },
      ],
    },
  },

  {
    key: 'plusnomad', page: 'Openline+', path: '/openline-plus', section: 'Built for Digital Nomads',
    short: 'Digital nomads', count: 6, accent: TONES.orange, variants: NOMAD_VARIANTS,
    embed: NOMAD_BOX, stageTone: 'plus',
    problem: 'A skeleton-screen monitor in a 656px-tall panel, with nothing nomadic about it.',
    cfg: {
      embed: NOMAD_BOX, stageTone: 'plus',
      kicker: 'Openline+ · audience', heading: 'Built for', headingAccent: 'Digital Nomads',
      lead: 'The tallest animated panel in the hub at 574×656, on the dark Openline+ page. The right cell carries the benefit cards. This is the panel that has to say why a location-independent professional needs a permanent phone number.',
      bullets: ['<b>Real box</b> — 574 × 656, tallest in the hub', '<b>Surface</b> — dark navy panel, orange accent',
        '<b>Subject</b> — one number across every move', '<b>Job</b> — replace a loading placeholder with an argument'],
      keptIdentical: kept('#FF5314', '#E23D00', ['Same dark navy panel, warm gradient and dot field', 'Same 574×656 cell']),
      thinking: {
        title: 'The weakest panel on the page',
        lead: 'A grey monitor with four skeleton text lines is a loading state, not a picture. It fills about a fifth of the tallest panel in the hub and contains nothing a digital nomad would recognise as their own life.',
        jobs: [
          { t: 'Say the actual promise', d: 'The product is a permanent phone number that survives every move. Nothing on this panel mentions a number, a country or a move.' },
          { t: 'Use 656 pixels', d: 'This is the tallest box available anywhere in the hub. A year of moves, a stack of failures or twelve months of spend all fit down it without compression.' },
          { t: 'Name the real fear', d: 'This audience has been locked out of a bank by a two-factor code sent to a dead SIM. That is the sale, and it is not on the page.' },
        ],
      },
      pick: [
        { k: 'My pick', h: '1 · Six Cities, One Number', d: 'It states the product in one picture: the left column changes six times, the right column never changes once. It is the promise the whole page is built on and currently nothing illustrates it.' },
        { k: 'If the goal is urgency', d: '2 · What Breaks Without It. Naming the two-factor lockout is the sharpest thing this page could do.' },
        { k: 'If the goal is warmth', d: '4 · Desk, Anywhere. The only option that sells the life rather than the mechanics.' },
      ],
    },
  },

  {
    key: 'pluskyc', page: 'Openline+', path: '/openline-plus', section: 'Verified & Secure',
    short: 'Verified & secure', count: 6, accent: { main: '#22C55E', deep: '#16A34A', wash: '#F0FDF4' },
    variants: KYC_VARIANTS, embed: KYC_BOX, stageTone: 'plusgreen', count2: 6,
    problem: 'A VERIFIED stamp printed over the Selfie label, and four ticks that are already ticked.',
    cfg: {
      embed: KYC_BOX, stageTone: 'plusgreen',
      accent: { main: '#22C55E', deep: '#16A34A', wash: '#F0FDF4' },
      kicker: 'Openline+ · security', heading: 'Verified &', headingAccent: 'Secure',
      lead: 'The one green block on the Openline+ page, 574×432 and landscape rather than tall. Full KYC is required here, unlike the standard anonymous crypto-friendly eSIM — so this panel has to make a requirement feel like a feature.',
      bullets: ['<b>Real box</b> — 574 × 432, landscape', '<b>Surface</b> — dark navy panel, green accent',
        '<b>Subject</b> — full KYC, card payment, real number', '<b>Job</b> — explain why, not just that'],
      keptIdentical: kept('#22C55E', '#16A34A', ['Same dark panel with the green gradient and dot field', 'Same 574×432 cell']),
      thinking: {
        title: 'The most finished panel, with a live layout bug',
        lead: 'This is the best of the three panels on the page and it still has a VERIFIED stamp printed straight across the word "Selfie". Behind that, every field is already ticked on the first frame, so the reader never sees anything get verified.',
        jobs: [
          { t: 'Fix the overlap, then animate it', d: 'Move the stamp off the form and let the four checks clear one at a time. A verification panel where nothing verifies is a wasted panel.' },
          { t: 'Answer "why"', d: 'The copy beside it spends its first paragraph explaining that this is different from the anonymous product. The panel should be carrying that, because a real number is a regulated object.' },
          { t: 'Address retention', d: 'A brand that sells an anonymous crypto eSIM elsewhere has to say what happens to a passport after it has been checked. Nobody in this category does.' },
        ],
      },
      pick: [
        { k: 'My pick', h: '2 · Two Doors', d: 'The section copy exists to explain that Openline+ and the standard eSIM are two different products with two different rules. A landscape panel is the right shape for that split, and it protects the anonymous product instead of appearing to contradict it.' },
        { k: 'If the goal is trust', d: '4 · Verified, Then Sealed. It answers the question readers actually have, which is about retention rather than verification.' },
        { k: 'If the goal is least risk', d: '1 · Four Checks, Cleared. It fixes the live overlap bug and makes the existing panel resolve, and nothing else.' },
      ],
    },
  },


  /* ── /login · the Aloha icon ──────────────────────────────────────── */
  {
    key: 'aloha', page: 'Login', path: '/login', section: 'The "Aloha!" icon',
    short: 'Aloha icon', count: 20, accent: TONES.orange, special: 'icons',
    problem: 'One small swaying figure in a 56px badge — and twenty alternatives to weigh it against.',
    cfg: {
      thinking: {
        title: 'The first thing anybody sees after clicking Sign in',
        lead: 'It is 56 pixels across and it sits directly above the only word on the page with any personality in it. That makes it the cheapest piece of brand on the whole site to change, and the one with the least room to hide a bad decision.',
        jobs: [
          { t: 'Read at 34 pixels', d: 'The art box is 34px square. Anything with more than one silhouette, or a stroke thinner than about two device pixels, turns to mush. Half the ideas that sound good die on this constraint alone.' },
          { t: 'Loop without nagging', d: 'People sit on this page waiting for an OAuth redirect. The motion has to stay pleasant on the twentieth pass, which means gentle and continuous, or one clean beat with a rest after it.' },
          { t: 'Mean "Aloha" or mean Openline', d: 'There are two honest directions: lean into the greeting — a hand, a flower, a lei — or lean into the product, with a chip, a globe or the logo arc. Both are represented below; a third group reads the page literally and animates a door or a lock.' },
        ],
      },
      pick: [
        { k: 'My pick', h: '02 · Waving Hand', d: 'It is the only icon that means "hello" to everybody, with no cultural reading required and no object to decode. One solid silhouette fills the badge, the three motion arcs make the wave legible even at 34px, and it sits beside the word "Aloha!" without competing with it.' },
        { k: 'If the goal is brand', h: '18 · Logo Mark', d: 'The arc drawing itself is the most restrained option here and the only one that leaves the reader with the Openline mark rather than a decoration. Pairs best if the greeting copy ever changes.' },
        { k: 'If the goal is the island', h: '01 · Shaka', d: 'The truest translation of the word into a gesture, it fills the badge better than the current figure, and it is warm in a way the product icons are not.' },
        { k: 'If the goal is the page', h: '16 · Unlock', d: 'The only icon describing what the button underneath actually does, and it ties to the 2FA note at the foot of the card.' },
      ],
    },
  },

  /* ── /blog ──────────────────────────────────────────────────── */
  {
    key: 'blog', page: 'Blog', path: '/blog', section: 'Hero',
    count: 5, accent: TONES.orange, variants: BLOG_VARIANTS,
    problem: 'Three fixed cards under a claim of 350+ articles and something new every week.',
    cfg: {
      kicker: 'Openline Blog', heading: 'Travel Smarter,', headingAccent: 'Stay Connected',
      lead: 'Expert guides, travel tips, connectivity insights, and the latest news on staying connected while exploring the world. Discover resources to help you travel better.',
      bullets: ['<b>350+</b> articles published', '<b>25K+</b> newsletter subscribers',
        '<b>190+</b> countries covered', '<b>Weekly</b> — a new issue every Thursday'],
      keptIdentical: KEPT_ORANGE,
      thinking: {
        title: 'Three cards under a claim of three hundred and fifty',
        lead: 'Showing real headlines is the right instinct — far better than abstract art for a blog. The problem is that the same three appear on every visit, beside a promise of something new every week.',
        jobs: [
          { t: 'Demonstrate freshness', d: '"New every week" is the only claim in this hero that can be shown rather than stated. Nothing currently arrives, updates, or is dated.' },
          { t: 'Show breadth', d: '350+ articles and 190+ countries are both in the stat row. Three fixed headlines suggest a blog with three posts in it.' },
          { t: 'Point somewhere', d: 'A blog hero should send the reader on — into a topic, an article, the newsletter, or a country plan. Right now it just sits there being decorative.' },
        ],
      },
      pick: [
        { k: 'My pick', h: '1 · Live Feed', d: 'It makes freshness observable instead of claiming it, gets far more headlines on screen so there are more chances to hook someone, and has no loop seam at all. Easiest of the five to wire to the real feed.' },
        { k: 'If the goal is navigation', d: '2 · Topic Picker. It answers what is actually in here and whether any of it is for me, and doubles as a preview of the blog\'s own taxonomy.' },
        { k: 'If the goal is revenue', d: '4 · Destination Shuffle. The only option that connects reading to buying, with a plan chip and a route to the country page behind every article.' },
      ],
    },
  },
];

/* ══════════════════════════ NAV + ROUTING ══════════════════════════ */
const PAGES = [...new Set(BOARDS.map(b => b.page))];
const boardsHost = document.getElementById('boards');
const overview = document.getElementById('overview');
const navPages = document.getElementById('nav-pages');
const navSections = document.getElementById('nav-sections');
const built = new Set();
let current = null;

function hostFor(b) {
  let el = document.querySelector(`[data-board="${b.key}"]`);
  if (!el) {
    el = document.createElement('div');
    el.dataset.board = b.key;
    el.hidden = true;
    boardsHost.appendChild(el);
  }
  return el;
}

function ensure(b) {
  const el = hostFor(b);
  if (built.has(b.key)) return el;
  built.add(b.key);
  if (b.special === 'tier1') initTier1();
  else if (b.special === 'icons') buildIconBoard(el, { icons: ICONS, chosen: b.chosen, ...b.cfg });
  else buildBoard(el, { id: b.key, variants: b.variants, accent: b.accent, chosen: b.chosen, ...b.cfg });
  return el;
}

function show(key) {
  current = key;
  overview.hidden = key !== 'overview';
  BOARDS.forEach(b => { const el = document.querySelector(`[data-board="${b.key}"]`); if (el) el.hidden = true; });
  if (key !== 'overview') {
    const b = BOARDS.find(x => x.key === key);
    ensure(b).hidden = false;
    document.documentElement.style.setProperty('--acc', b.accent.main);
  } else {
    document.documentElement.style.setProperty('--acc', '#0B0B0F');
  }
  renderNav();
  window.scrollTo({ top: 0, behavior: 'auto' });
}
window.olShow = show;

function renderNav() {
  const b = BOARDS.find(x => x.key === current);
  const activePage = b ? b.page : null;

  navPages.innerHTML = `
    <button class="ptab${current === 'overview' ? ' active' : ''}" data-go="overview">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
      Overview
    </button>
    ${PAGES.map(p => {
      const items = BOARDS.filter(x => x.page === p);
      const on = p === activePage;
      const tone = items[0].accent.main;
      return `<button class="ptab${on ? ' active' : ''}" data-page="${p}" style="--pt:${tone}">
        <span class="swatch" style="background:${tone}"></span>${p}
        <span class="n">${items.reduce((s, x) => s + x.count, 0)}</span>
      </button>`;
    }).join('')}`;

  [...navPages.querySelectorAll('[data-go]')].forEach(el => el.onclick = () => show(el.dataset.go));
  [...navPages.querySelectorAll('[data-page]')].forEach(el => el.onclick = () => {
    const first = BOARDS.find(x => x.page === el.dataset.page);
    show(first.key);
  });

  if (!activePage) { navSections.hidden = true; navSections.innerHTML = ''; return; }
  const items = BOARDS.filter(x => x.page === activePage);
  navSections.hidden = false;
  navSections.innerHTML = `
    <span class="seclabel">${items[0].path}</span>
    ${items.map(x => `<button class="stab${x.key === current ? ' active' : ''}" data-key="${x.key}">
      ${x.short || x.section}<span class="n">${x.count}</span>${x.chosen != null ? '<span class="ok">✓</span>' : ''}
    </button>`).join('')}`;
  [...navSections.querySelectorAll('[data-key]')].forEach(el => el.onclick = () => show(el.dataset.key));
}

/* ══════════════════════════ OVERVIEW LANDING ══════════════════════════ */
function renderOverview() {
  const totalOpts = BOARDS.reduce((s, b) => s + b.count, 0);
  overview.innerHTML = `
  <section class="ov-hero">
    <div class="bd-wrap">
      <div class="ov-eyebrow">Openline · design review</div>
      <h1 class="ov-h1">Animation review</h1>
      <p class="ov-lead">
        Every animated block on the revisions hub, rebuilt one-to-one, with alternative proposals
        beside it. ${BOARDS.length} sections across ${PAGES.length} pages, ${totalOpts} proposals in total —
        all running live so they can be judged as motion rather than described.
      </p>
      <div class="ov-how">
        ${[
          ['Pick a section', 'The top row selects a page, the second row its sections. Each one opens a board of its own.'],
          ['Compare in place', 'Option 0 is always exactly what ships today. Every other option drops into the same panel, in the same layout, with the same copy.'],
          ['Judge and decide', 'Every board ends with all options running side by side and a score matrix across six criteria. Tell me the winner and I will mark it.'],
        ].map((h, i) => `
          <div class="ov-howcard">
            <div class="ov-num">0${i + 1}</div>
            <div class="ov-howt">${h[0]}</div>
            <p class="ov-howd">${h[1]}</p>
          </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="bd-wrap ov-body">
    ${PAGES.map(p => {
      const items = BOARDS.filter(x => x.page === p);
      const tone = items[0].accent;
      return `
      <div class="ov-group">
        <div class="ov-grouphead">
          <span class="ov-dot" style="background:${tone.main}"></span>
          <h2 class="ov-groupt">${p}</h2>
          <code class="ov-path">${items[0].path}</code>
          <span class="ov-count">${items.length} section${items.length > 1 ? 's' : ''} · ${items.reduce((s, x) => s + x.count, 0)} options</span>
        </div>
        <div class="ov-grid">
          ${items.map(x => `
            <button class="ov-card" data-key="${x.key}" style="--c:${x.accent.main};--cd:${x.accent.deep};--cw:${x.accent.wash}">
              <div class="ov-cardtop">
                <span class="ov-badge">${x.count} option${x.count > 1 ? 's' : ''}</span>
                ${x.chosen != null ? '<span class="badge-picked">CHOSEN</span>' : '<span class="ov-open">Open →</span>'}
              </div>
              <div class="ov-cardt">${x.section}</div>
              <p class="ov-cardp"><span class="ov-prob">Today:</span> ${x.problem}</p>
            </button>`).join('')}
        </div>
      </div>`;
    }).join('')}
    <p class="ov-foot">
      Every proposal is inline SVG plus SMIL and CSS — no new dependency, nothing to install, and each one
      drops straight into the existing React component. Section copy, palettes and panel dimensions are
      mirrored from <span>openline-revisions-hub.vercel.app</span>.
    </p>
  </section>`;
  [...overview.querySelectorAll('[data-key]')].forEach(el => el.onclick = () => show(el.dataset.key));
}

renderOverview();
show('overview');
