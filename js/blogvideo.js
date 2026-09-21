/* ─────────────────────────────────────────────────────────────────────────
   /blog — the right-hand article panel, treated as a video cover (576 × 540).

   The live panel is a static stack of three article cards. Paul's brief: treat
   it as a video cover — the surface should feel like something playing, not a
   list sitting still. Option 0 replicates what ships; 1–10 are proposals.
   ───────────────────────────────────────────────────────────────────────── */
import { boxWrap, TONES, INK, WHITE, GRAY, LINE } from './kit.js';

const MO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
const W = 576, H = 540;
const w = boxWrap(W, H);
const noPills = [];
const OR = TONES.orange.main, ORD = TONES.orange.deep, ORW = TONES.orange.wash, ORS = TONES.orange.soft;
const MUT = '#6B7280';
const DARK = '#0D1117';
const DARK2 = '#161C26';

/* the three real articles from the live panel */
const ARTS = [
  ['Tokyo on 5GB', 'Asia', '6 min'],
  ['Europe by rail, always online', 'Europe', '8 min'],
  ['Working from Lisbon', 'Guides', '5 min'],
];

const t = (x, y, s, o = {}) =>
  `<text x="${x}" y="${y}"${o.m ? ` font-family="${MO}"` : ''} font-size="${o.size || 12}"` +
  ` font-weight="${o.w || 400}" fill="${o.fill || INK}"${o.op == null ? '' : ` opacity="${o.op}"`}` +
  ` text-anchor="${o.a || 'start'}"${o.ls ? ` letter-spacing="${o.ls}"` : ''}>${s}</text>`;

const lab = (x, y, s, fill, o = {}) =>
  t(x, y, s, { m: true, size: o.size || 9, ls: o.ls || 1.3, fill, a: o.a, op: o.op });

const rect = (x, y, ww, hh, o = {}) =>
  `<rect x="${x}" y="${y}" width="${ww}" height="${hh}" rx="${o.r == null ? 10 : o.r}"` +
  ` fill="${o.fill || 'none'}"${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 1}"` : ''}` +
  `${o.op == null ? '' : ` opacity="${o.op}"`}/>`;

/* a play triangle inside a ring */
const playMark = (cx, cy, r, col = WHITE, bg = 'rgba(0,0,0,0.42)') => `
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${bg}"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${col}" stroke-width="1.6" opacity="0.85"/>
  <path d="M ${cx - r * 0.24} ${cy - r * 0.34} L ${cx + r * 0.38} ${cy} L ${cx - r * 0.24} ${cy + r * 0.34} Z"
    fill="${col}"/>`;

/* a progress rail that fills over the loop */
const rail = (x, y, ww, dur, col = WHITE) => `
  ${rect(x, y, ww, 4, { fill: col, op: 0.25, r: 2 })}
  <rect x="${x}" y="${y}" width="0" height="4" rx="2" fill="${col}">
    <animate attributeName="width" values="0;${ww}" keyTimes="0;1" dur="${dur}s" repeatCount="indefinite"/>
  </rect>`;

/* mono timecode that advances */
const timecode = (x, y, dur, o = {}) => {
  const frames = Array.from({ length: 8 }, (_, i) => {
    const s = Math.round((i / 8) * 96);
    return `0:${String(s).padStart(2, '0')}`;
  });
  const kt = frames.map((_, i) => (i / frames.length).toFixed(4)).concat('1').join(';');
  return `<text x="${x}" y="${y}" font-family="${MO}" font-size="${o.size || 10}" font-weight="600"
    fill="${o.fill || WHITE}" opacity="${o.op == null ? 0.85 : o.op}" text-anchor="${o.a || 'start'}">` +
    frames.map((f, i) =>
      `<tspan x="${x}" opacity="0">${f}<animate attributeName="opacity"
        values="${frames.map((_, j) => (j === i ? '1' : '0')).join(';')};${i === 0 ? '1' : '0'}"
        keyTimes="${kt}" dur="${dur}s" repeatCount="indefinite" calcMode="discrete"/></tspan>`).join('') +
    '</text>';
};

/* film-grain-free subtle vignette */
const vign = (id) => `
  <defs><radialGradient id="${id}" cx="50%" cy="46%" r="72%">
    <stop offset="0.45" stop-color="#000" stop-opacity="0"/>
    <stop offset="1" stop-color="#000" stop-opacity="0.45"/></radialGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#${id})"/>`;

/* ══ 0 · current ══════════════════════════════════════════════════════════ */
export const blogvCurrent = {
  id: 'bv-current',
  name: 'Current',
  family: 'Live today',
  tagline: 'Three cards, stacked and still',
  desc:
    'What ships now: the three most recent posts as a vertical stack of cards, each with a title, ' +
    'a category and a reading time, plus three trust chips underneath. It is a perfectly ' +
    'reasonable list — but it sits beside a headline promising expert guides and travel stories, ' +
    'and a list of titles is the least evocative way to present writing about places.',
  pros: ['Scannable and honest', 'Shows real recency', 'Cheap and accessible'],
  cons: ['Nothing suggests the content is worth reading', 'No sense of place for a travel blog', 'Static beside an animated hero'],
  scores: { story: 2, motion: 1, perf: 5, mobile: 5, brand: 3, ease: 5 },
  build: () => ({
    pills: noPills,
    svg: w(`
      <rect width="${W}" height="${H}" fill="#FFFDFB"/>
      ${ARTS.map(([title, cat, min], i) => {
        const y = 36 + i * 118;
        return `${rect(32, y, W - 64, 100, { fill: WHITE, stroke: LINE, r: 14 })}
          ${rect(52, y + 24, 52, 52, { fill: ORW, r: 12 })}
          ${t(78, y + 57, String(i + 1), { size: 19, w: 700, a: 'middle', fill: OR })}
          ${t(124, y + 50, title, { size: 16, w: 700 })}
          ${lab(124, y + 72, `${cat.toUpperCase()} · ${min.toUpperCase()}`, MUT, { size: 8.5 })}`;
      }).join('')}
      ${[['New every week', 0], ['Updated Daily', 1], ['Free Access', 2]].map(([s, i]) => {
        const bw = (W - 64 - 24) / 3;
        const x = 32 + i * (bw + 12);
        return `${rect(x, 404, bw, 40, { fill: '#F9FAFB', r: 10 })}
          ${t(x + bw / 2, 429, s, { size: 11.5, w: 600, a: 'middle', fill: MUT })}`;
      }).join('')}
      ${lab(W / 2, 500, 'A LIST OF TITLES, BESIDE A PROMISE OF STORIES', GRAY, { a: 'middle', size: 8.5 })}`),
  }),
};

/* ══ 1 · Now Playing ══════════════════════════════════════════════════════ */
export const nowPlaying = {
  id: 'bv-playing',
  name: 'Now Playing',
  family: 'Video cover',
  tagline: 'The panel becomes a player',
  desc:
    'The most literal reading of the brief: the whole panel is a video surface. A dark cover with ' +
    'a play mark, a title card, a running timecode and a progress rail that fills, then cuts to ' +
    'the next story and starts again. It reframes the blog from a list of posts into a channel, ' +
    'which is a far better fit for travel writing.',
  pros: ['Reads unmistakably as playable content', 'Strongest single change to the page', 'Cycles all three stories in one frame'],
  cons: ['Implies video exists, which it may not', 'A cover with no real video is a promise to keep'],
  scores: { story: 5, motion: 5, perf: 5, mobile: 5, brand: 4, ease: 3 },
  build: (uid = 'a') => {
    const dur = 15, each = dur / 3;
    return {
      pills: noPills,
      svg: w(`
        <rect width="${W}" height="${H}" fill="${DARK}"/>
        ${ARTS.map(([title, cat, min], i) => {
          const on = ((i * each) / dur).toFixed(4);
          const off = (((i + 1) * each) / dur).toFixed(4);
          const hue = [`#1B3A5C`, `#2A2340`, `#123A32`][i];
          const words = title.split(' ');
          const mid = Math.ceil(words.length / 2);
          const l1 = words.length > 3 ? words.slice(0, mid).join(' ') : title;
          const l2 = words.length > 3 ? words.slice(mid).join(' ') : '';
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0;0"
              keyTimes="0;${on};${(+on + 0.02).toFixed(4)};${(+off - 0.02).toFixed(4)};${off};1"
              dur="${dur}s" repeatCount="indefinite"/>
            <rect width="${W}" height="${H}" fill="${hue}"/>
            <circle cx="${140 + i * 130}" cy="${180 + i * 40}" r="200" fill="${OR}" opacity="0.13"/>
            <circle cx="${420 - i * 90}" cy="${360 - i * 30}" r="150" fill="#5AA9E6" opacity="0.10"/>
            ${vign(`bvv${uid}${i}`)}
            ${rect(32, 32, 108, 26, { fill: 'rgba(255,255,255,0.14)', r: 13 })}
            ${lab(46, 49, cat.toUpperCase(), WHITE, { size: 8.5 })}
            ${playMark(W / 2, 214, 38)}
            ${t(32, l2 ? 392 : 410, l1, { size: 30, w: 800, fill: WHITE })}
            ${l2 ? t(32, 426, l2, { size: 30, w: 800, fill: WHITE }) : ''}
            ${lab(32, 452, `${min.toUpperCase()} READ`, WHITE, { size: 9, op: 0.7 })}
          </g>`;
        }).join('')}
        ${rail(32, 492, W - 64, each)}
        ${timecode(32, 520, each)}
        ${lab(W - 32, 520, 'OPENLINE BLOG', WHITE, { a: 'end', size: 9, op: 0.6 })}`),
    };
  },
};

/* ══ 2 · Three Covers ═════════════════════════════════════════════════════ */
export const threeCovers = {
  id: 'bv-three',
  name: 'Three Covers',
  family: 'Video cover',
  tagline: 'The stack kept, each card given a cover',
  desc:
    'The conservative version of the brief. The three-card stack stays exactly where it is — same ' +
    'titles, same order, same reading times — but each card gains a cover image area with a play ' +
    'mark, and the covers breathe in turn. It gets most of the feeling of a video panel without ' +
    'committing the page to being a player.',
  pros: ['Keeps the existing structure and all three titles', 'Lowest risk of the ten', 'Still clearly a list of articles'],
  cons: ['Less striking than a full-panel cover', 'Three play marks is three promises'],
  scores: { story: 3, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 5 },
  build: () => {
    const dur = 12, each = dur / 3;
    return {
      pills: noPills,
      svg: w(`
        <rect width="${W}" height="${H}" fill="#FFFDFB"/>
        ${ARTS.map(([title, cat, min], i) => {
          const y = 28 + i * 160;
          const hue = ['#1B3A5C', '#2A2340', '#123A32'][i];
          const on = ((i * each) / dur).toFixed(4);
          return `<g>
            ${rect(28, y, W - 56, 142, { fill: WHITE, stroke: LINE, r: 14 })}
            <clipPath id="bvc${i}"><rect x="40" y="${y + 12}" width="118" height="118" rx="10"/></clipPath>
            <g clip-path="url(#bvc${i})">
              <rect x="40" y="${y + 12}" width="118" height="118" fill="${hue}"/>
              <circle cx="${70 + i * 20}" cy="${y + 50}" r="70" fill="${OR}" opacity="0.2"/>
              <circle cx="${140 - i * 18}" cy="${y + 112}" r="48" fill="#5AA9E6" opacity="0.16"/>
            </g>
            <g>
              <animate attributeName="opacity" values="0.7;1;0.7;0.7" keyTimes="0;${(+on + 0.08).toFixed(3)};${(+on + 0.26).toFixed(3)};1"
                dur="${dur}s" repeatCount="indefinite"/>
              ${playMark(99, y + 71, 21)}
            </g>
            ${rect(40, y + 108, 52, 18, { fill: 'rgba(0,0,0,0.55)', r: 5 })}
            ${lab(48, y + 121, min.toUpperCase(), WHITE, { size: 8 })}
            ${t(178, y + 52, title.length > 22 ? title.slice(0, title.lastIndexOf(' ', 22)) : title,
              { size: 17, w: 700 })}
            ${title.length > 22 ? t(178, y + 74, title.slice(title.lastIndexOf(' ', 22) + 1), { size: 17, w: 700 }) : ''}
            ${lab(178, y + (title.length > 22 ? 100 : 78), cat.toUpperCase(), OR, { size: 8.5 })}
            <g opacity="0">
              <animate attributeName="opacity" values="0;0;1;1;0;0"
                keyTimes="0;${on};${(+on + 0.03).toFixed(3)};${(+on + 0.28).toFixed(3)};${(+on + 0.31).toFixed(3)};1"
                dur="${dur}s" repeatCount="indefinite"/>
              ${rect(28, y, W - 56, 142, { fill: 'none', stroke: OR, sw: 2, r: 14 })}
            </g>
          </g>`;
        }).join('')}
        ${lab(28, 520, 'SAME THREE POSTS — EACH ONE GIVEN A COVER', GRAY, { size: 8.5 })}`),
    };
  },
};

/* ══ 3 · The Reel ═════════════════════════════════════════════════════════ */
export const theReel = {
  id: 'bv-reel',
  name: 'The Reel',
  family: 'Video cover',
  tagline: 'Covers sliding past, one at a time',
  desc:
    'A horizontal reel of covers drifting continuously through the panel, with the one in the ' +
    'centre brought forward and titled. It suggests a back catalogue rather than three recent ' +
    'posts, which matters when the page is claiming 350 published articles — a stack of three ' +
    'quietly contradicts that number.',
  pros: ['Implies depth, supporting the 350-article claim', 'Continuous motion with no cut', 'Distinctive on a travel site'],
  cons: ['Only the centre item is readable', 'Continuous drift can distract beside body copy'],
  scores: { story: 4, motion: 5, perf: 4, mobile: 3, brand: 4, ease: 3 },
  build: (uid = 'a') => {
    const dur = 18;
    const cards = [...ARTS, ...ARTS, ...ARTS, ...ARTS];
    const cw = 168, gapx = 20, step = cw + gapx;
    return {
      pills: noPills,
      svg: w(`
        <rect width="${W}" height="${H}" fill="${DARK}"/>
        <circle cx="120" cy="120" r="200" fill="${OR}" opacity="0.10"/>
        <circle cx="470" cy="430" r="180" fill="#5AA9E6" opacity="0.08"/>
        ${lab(32, 48, 'FROM THE BLOG · 350 ARTICLES AND COUNTING', WHITE, { size: 9, op: 0.6 })}

        <clipPath id="bvr${uid}"><rect x="0" y="86" width="${W}" height="280"/></clipPath>
        <g clip-path="url(#bvr${uid})">
          <g>
            <!-- stepped, not continuous: a cover has to land centred and hold,
                 otherwise the centre frame straddles two of them all the time -->
            <animateTransform attributeName="transform" type="translate"
              values="${[0, 0, 1, 1, 2, 2, 3].map((n, j) => `${(164 - (n + 1) * step).toFixed(0)} 0`).join(';')}"
              keyTimes="0;0.28;0.3333;0.6133;0.6667;0.9467;1"
              dur="${dur}s" repeatCount="indefinite" calcMode="spline"
              keySplines="0 0 1 1;0.65 0 0.35 1;0 0 1 1;0.65 0 0.35 1;0 0 1 1;0.65 0 0.35 1"/>
            ${cards.map(([title, cat], i) => {
              const x = 40 + i * step;
              const hue = ['#1B3A5C', '#2A2340', '#123A32'][i % 3];
              return `<g>
                ${rect(x, 110, cw, 232, { fill: hue, r: 14 })}
                <circle cx="${x + 50 + (i % 3) * 22}" cy="170" r="86" fill="${OR}" opacity="0.18"/>
                <circle cx="${x + cw - 30}" cy="300" r="60" fill="#5AA9E6" opacity="0.14"/>
                ${rect(x, 110, cw, 232, { fill: 'none', stroke: 'rgba(255,255,255,0.14)', r: 14 })}
                ${playMark(x + cw / 2, 226, 24)}
                ${rect(x + 14, 302, 84, 20, { fill: 'rgba(0,0,0,0.5)', r: 5 })}
                ${lab(x + 24, 316, cat.toUpperCase(), WHITE, { size: 8 })}
              </g>`;
            }).join('')}
          </g>
        </g>

        <!-- the centre slot is what the reader reads -->
        ${rect(W / 2 - cw / 2 - 6, 104, cw + 12, 244, { fill: 'none', stroke: OR, sw: 2, r: 16 })}
        ${ARTS.map((_, i) => {
          /* the first hold centres card 1, not card 0 — keep the caption in step */
          const [title, cat, min] = ARTS[(i + 1) % ARTS.length];
          const on = (i / 3 + 0.005).toFixed(4), off = ((i + 1) / 3).toFixed(4);
          const words = title.split(' ');
          const mid = Math.ceil(words.length / 2);
          const l1 = words.length > 3 ? words.slice(0, mid).join(' ') : title;
          const l2 = words.length > 3 ? words.slice(mid).join(' ') : '';
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0;0"
              keyTimes="0;${on};${(+on + 0.03).toFixed(4)};${(+off - 0.03).toFixed(4)};${off};1"
              dur="${dur}s" repeatCount="indefinite"/>
            ${t(32, l2 ? 414 : 428, l1, { size: 26, w: 800, fill: WHITE })}
            ${l2 ? t(32, 444, l2, { size: 26, w: 800, fill: WHITE }) : ''}
            ${lab(32, 472, `${cat.toUpperCase()} · ${min.toUpperCase()} READ`, WHITE, { size: 9, op: 0.65 })}
          </g>`;
        }).join('')}
        ${rail(32, 504, W - 64, dur / 3)}
        ${lab(W - 32, 526, 'OPENLINE BLOG', WHITE, { a: 'end', size: 9, op: 0.55 })}`),
    };
  },
};

/* ══ 4 · Postcard ═════════════════════════════════════════════════════════ */
export const postcard = {
  id: 'bv-postcard',
  name: 'Postcard',
  family: 'Place',
  tagline: 'A cover that is actually about the place',
  desc:
    'Travel writing sells on place, not on titles. Each cover is built from the destination — a ' +
    'skyline, a rail line, a coastline — drawn as flat shapes in the brand palette, with the ' +
    'city name set large and the article title underneath. No stock photography needed, and it ' +
    'looks like nothing else in the eSIM category.',
  pros: ['Evokes the destination rather than naming a file', 'All artwork is drawn, so no photo licensing', 'Very strong brand character'],
  cons: ['Each new destination needs new artwork', 'Least like a video of the cover options'],
  scores: { story: 5, motion: 4, perf: 5, mobile: 5, brand: 5, ease: 3 },
  build: (uid = 'a') => {
    const dur = 15, each = dur / 3;
    const scenes = [
      { city: 'TOKYO', sky: '#1B2E50', accent: '#FF5314',
        art: `<circle cx="470" cy="128" r="46" fill="#FF5314" opacity="0.35"/>
        ${Array.from({ length: 9 }, (_, i) => {
          const bw = 26 + (i % 3) * 14, bh = 60 + ((i * 37) % 120);
          return `<rect x="${34 + i * 60}" y="${300 - bh}" width="${bw}" height="${bh}" rx="3" fill="#0E1C33"/>
            <rect x="${40 + i * 60}" y="${312 - bh}" width="6" height="6" fill="#FF8A5C" opacity="0.8">
              <animate attributeName="opacity" values="0.2;0.9;0.2" keyTimes="0;0.5;1"
                dur="${(2.4 + i * 0.3).toFixed(1)}s" repeatCount="indefinite"/></rect>`;
        }).join('')}` },
      { city: 'EUROPE', sky: '#241E3A', accent: '#8B7BD8',
        art: `<path d="M -20 286 L 596 236" stroke="#3A3158" stroke-width="10"/>
          <path d="M -20 300 L 596 250" stroke="#2B2545" stroke-width="6"/>
          ${Array.from({ length: 14 }, (_, i) =>
            `<rect x="${i * 44}" y="${292 - i * 3.6}" width="5" height="26" fill="#1D1930"/>`).join('')}
          <g><animateTransform attributeName="transform" type="translate" values="-190 0;640 0"
            keyTimes="0;1" dur="${(each * 0.8).toFixed(1)}s" repeatCount="indefinite"/>
            <g transform="translate(0,-14)">
              ${Array.from({ length: 4 }, (_, i) =>
                `<rect x="${i * 44}" y="${272 - i * 3.6}" width="40" height="22" rx="4" fill="#C9C2F0"/>
                 <rect x="${i * 44 + 6}" y="${277 - i * 3.6}" width="10" height="8" rx="2" fill="#241E3A"/>
                 <rect x="${i * 44 + 22}" y="${277 - i * 3.6}" width="10" height="8" rx="2" fill="#241E3A"/>`).join('')}
            </g>
          </g>` },
      { city: 'LISBON', sky: '#123A32', accent: '#4ECCA3',
        art: `<path d="M -10 300 Q 140 256, 300 288 T 600 262 L 600 360 L -10 360 Z" fill="#0C2B25"/>
          ${Array.from({ length: 11 }, (_, i) =>
            `<rect x="${26 + i * 50}" y="${228 - ((i * 29) % 46)}" width="34" height="${74 + ((i * 29) % 46)}"
              rx="3" fill="#0F332B"/>
             <rect x="${26 + i * 50}" y="${222 - ((i * 29) % 46)}" width="34" height="8" rx="2" fill="#C9724E"/>`).join('')}
          <circle cx="110" cy="132" r="40" fill="#4ECCA3" opacity="0.28"/>` },
    ];
    return {
      pills: noPills,
      svg: w(`
        <rect width="${W}" height="${H}" fill="${DARK}"/>
        ${scenes.map((sc, i) => {
          const [title, cat, min] = ARTS[i];
          const on = ((i * each) / dur).toFixed(4), off = (((i + 1) * each) / dur).toFixed(4);
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0;0"
              keyTimes="0;${on};${(+on + 0.022).toFixed(4)};${(+off - 0.022).toFixed(4)};${off};1"
              dur="${dur}s" repeatCount="indefinite"/>
            <rect width="${W}" height="${H}" fill="${sc.sky}"/>
            <clipPath id="bvp${uid}${i}"><rect x="0" y="0" width="${W}" height="360"/></clipPath>
            <g clip-path="url(#bvp${uid}${i})">${sc.art}</g>
            <rect x="0" y="300" width="${W}" height="240" fill="${sc.sky}"/>
            ${rect(32, 40, 104, 26, { fill: 'rgba(255,255,255,0.14)', r: 13 })}
            ${lab(46, 57, cat.toUpperCase(), WHITE, { size: 8.5 })}
            ${t(32, 372, sc.city, { m: true, size: 13, w: 700, fill: sc.accent, ls: 4 })}
            ${t(32, 416, title.length > 24 ? title.slice(0, title.lastIndexOf(' ', 24)) : title,
              { size: 27, w: 800, fill: WHITE })}
            ${title.length > 24
              ? t(32, 448, title.slice(title.lastIndexOf(' ', 24) + 1), { size: 27, w: 800, fill: WHITE })
              : ''}
            ${lab(32, title.length > 24 ? 476 : 444, `${min.toUpperCase()} READ`, WHITE, { size: 9, op: 0.65 })}
          </g>`;
        }).join('')}
        ${rail(32, 504, W - 64, each)}
        ${lab(W - 32, 526, 'OPENLINE BLOG', WHITE, { a: 'end', size: 9, op: 0.55 })}`),
    };
  },
};

/* ══ 5 · Chapter Cards ════════════════════════════════════════════════════ */
export const chapterCards = {
  id: 'bv-chapters',
  name: 'Chapter Cards',
  family: 'Video cover',
  tagline: 'One cover, chaptered like a video',
  desc:
    'A single cover that plays through the article as chapters — the sections of the piece listed ' +
    'down the side, each highlighting in turn with its own timestamp, exactly the way a long ' +
    'video shows its contents. It communicates depth: this is not a listicle, it has four ' +
    'distinct parts worth reading.',
  pros: ['Signals substantial, structured writing', 'Very close to a real video player affordance', 'Reusable for any long guide'],
  cons: ['Needs real section headings per article', 'Only features one article at a time'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 4 },
  build: (uid = 'a') => {
    const chapters = [
      ['Before you land', '0:00'],
      ['Picking a plan', '0:26'],
      ['Getting online at Haneda', '0:51'],
      ['What 5GB actually covers', '1:18'],
    ];
    const dur = 16, each = dur / chapters.length;
    return {
      pills: noPills,
      svg: w(`
        <rect width="${W}" height="${H}" fill="${DARK}"/>
        <rect width="${W}" height="248" fill="#1B2E50"/>
        <circle cx="140" cy="96" r="150" fill="${OR}" opacity="0.16"/>
        <circle cx="450" cy="212" r="120" fill="#5AA9E6" opacity="0.12"/>
        ${vign(`bvch${uid}`)}
        <rect x="0" y="248" width="${W}" height="${H - 248}" fill="${DARK}"/>
        ${rect(32, 34, 90, 26, { fill: 'rgba(255,255,255,0.16)', r: 13 })}
        ${lab(46, 51, 'ASIA', WHITE, { size: 8.5 })}
        ${playMark(W / 2, 132, 32)}
        ${t(32, 212, 'Tokyo on 5GB', { size: 30, w: 800, fill: WHITE })}
        ${lab(32, 234, '6 MIN READ · 4 SECTIONS', WHITE, { size: 9, op: 0.7 })}

        ${chapters.map(([name, tc], i) => {
          const y = 276 + i * 50;
          const on = ((i * each) / dur).toFixed(4), off = (((i + 1) * each) / dur).toFixed(4);
          return `<g>
            ${rect(32, y, W - 64, 40, { fill: 'rgba(255,255,255,0.05)', r: 9 })}
            <rect x="32" y="${y}" width="${W - 64}" height="40" rx="9" fill="${OR}" opacity="0">
              <animate attributeName="opacity" values="0;0;0.18;0.18;0;0"
                keyTimes="0;${on};${(+on + 0.02).toFixed(4)};${(+off - 0.02).toFixed(4)};${off};1"
                dur="${dur}s" repeatCount="indefinite"/></rect>
            <rect x="32" y="${y}" width="3" height="40" fill="${OR}" opacity="0">
              <animate attributeName="opacity" values="0;0;1;1;0;0"
                keyTimes="0;${on};${(+on + 0.02).toFixed(4)};${(+off - 0.02).toFixed(4)};${off};1"
                dur="${dur}s" repeatCount="indefinite"/></rect>
            ${t(52, y + 25, name, { size: 13.5, w: 600, fill: WHITE, op: 0.9 })}
            ${lab(W - 52, y + 25, tc, WHITE, { size: 9.5, a: 'end', op: 0.55 })}
          </g>`;
        }).join('')}
        ${rail(32, 498, W - 64, dur)}
        ${lab(32, 524, 'CHAPTERS', WHITE, { size: 9, op: 0.5 })}
        ${lab(W - 32, 524, 'OPENLINE BLOG', WHITE, { a: 'end', size: 9, op: 0.5 })}`),
    };
  },
};

/* ══ 6 · The Long Read ════════════════════════════════════════════════════ */
export const longRead = {
  id: 'bv-long',
  name: 'The Long Read',
  family: 'Editorial',
  tagline: 'A pull quote does the selling',
  desc:
    'Instead of a title, the cover leads with a line from the piece itself — the sentence that ' +
    'would make someone want to read it — set large, with the article credited beneath. It is how ' +
    'serious publications sell an article, and it is the only option here that demonstrates the ' +
    'quality of the writing rather than asserting that guides exist.',
  pros: ['Proves the writing is good instead of claiming it', 'Reads as editorial, not marketing', 'No imagery required at all'],
  cons: ['Only as good as the chosen sentences', 'Needs an editor to pick a quote per post'],
  scores: { story: 5, motion: 3, perf: 5, mobile: 5, brand: 5, ease: 4 },
  build: () => {
    const quotes = [
      ['"Five gigabytes is plenty in Tokyo — until you try to navigate Shinjuku station."', 'Tokyo on 5GB', 'Asia · 6 min'],
      ['"The train crosses four borders and your phone never notices a single one."', 'Europe by rail, always online', 'Europe · 8 min'],
      ['"Lisbon runs on café wifi, right up to the moment you need to take the call."', 'Working from Lisbon', 'Guides · 5 min'],
    ];
    const dur = 18, each = dur / 3;
    return {
      pills: noPills,
      svg: w(`
        <rect width="${W}" height="${H}" fill="#FFFDFB"/>
        <circle cx="${W - 40}" cy="60" r="150" fill="${OR}" opacity="0.06"/>
        <circle cx="40" cy="${H - 40}" r="130" fill="${OR}" opacity="0.05"/>
        ${lab(36, 52, 'FROM THE BLOG', OR, { size: 9 })}
        <path d="M 36 88 L 36 112" stroke="${OR}" stroke-width="3"/>
        ${quotes.map(([q, title, meta], i) => {
          const on = ((i * each) / dur).toFixed(4), off = (((i + 1) * each) / dur).toFixed(4);
          const words = q.split(' ');
          const lines = [];
          let cur = '';
          for (const wd of words) {
            if ((cur + ' ' + wd).trim().length > 26) { lines.push(cur.trim()); cur = wd; }
            else cur = (cur + ' ' + wd).trim();
          }
          if (cur) lines.push(cur);
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0;0"
              keyTimes="0;${on};${(+on + 0.025).toFixed(4)};${(+off - 0.025).toFixed(4)};${off};1"
              dur="${dur}s" repeatCount="indefinite"/>
            ${lines.map((ln, j) => t(36, 168 + j * 40, ln, { size: 27, w: 700, fill: INK })).join('')}
            ${t(36, 168 + lines.length * 40 + 34, title, { size: 15, w: 700, fill: OR })}
            ${lab(36, 168 + lines.length * 40 + 56, meta.toUpperCase(), MUT, { size: 8.5 })}
          </g>`;
        }).join('')}
        ${rect(36, 462, 178, 42, { fill: ORW, r: 10 })}
        ${t(125, 489, 'Read the blog →', { size: 13.5, w: 700, a: 'middle', fill: OR })}
        ${lab(W - 36, 489, '350 ARTICLES', MUT, { a: 'end', size: 9 })}`),
    };
  },
};

/* ══ 7 · Where People Read ════════════════════════════════════════════════ */
export const whereRead = {
  id: 'bv-where',
  name: 'Where People Read',
  family: 'Place',
  tagline: 'The blog, mapped to the world it covers',
  desc:
    'The panel becomes a live map: article pins appearing across regions, each one briefly ' +
    'naming its piece, with the 190-countries figure doing real work for once. It ties the blog ' +
    'to the product — the same global footprint sells both — and gives the page a reason to show ' +
    'coverage rather than just claim it.',
  pros: ['Connects editorial coverage to network coverage', 'Makes 190+ countries meaningful here', 'Rewards a second look'],
  cons: ['Abstract world shapes are hard to draw well', 'Weakest on narrow mobile'],
  scores: { story: 4, motion: 5, perf: 4, mobile: 3, brand: 4, ease: 3 },
  build: (uid = 'a') => {
    const pins = [
      [148, 188, 'Tokyo on 5GB', 'ASIA'],
      [300, 150, 'Europe by rail', 'EUROPE'],
      [196, 246, 'Working from Lisbon', 'GUIDES'],
      [412, 206, 'Seoul, offline', 'ASIA'],
      [96, 280, 'Mexico City notes', 'AMERICAS'],
      [372, 292, 'Cape Town wifi', 'AFRICA'],
    ];
    const dur = 18;
    return {
      pills: noPills,
      svg: w(`
        <rect width="${W}" height="${H}" fill="${DARK2}"/>
        ${lab(32, 46, 'THE BLOG, BY PLACE', WHITE, { size: 9, op: 0.6 })}
        ${rect(24, 66, W - 48, 330, { fill: '#0E141D', r: 14 })}
        ${Array.from({ length: 22 }, (_, r) =>
          Array.from({ length: 34 }, (_, c) => {
            const x = 40 + c * 15.5, y = 82 + r * 14;
            const inLand =
              (c > 2 && c < 11 && r > 4 && r < 13) ||
              (c > 12 && c < 20 && r > 2 && r < 9) ||
              (c > 14 && c < 22 && r > 9 && r < 17) ||
              (c > 21 && c < 31 && r > 3 && r < 12) ||
              (c > 25 && c < 32 && r > 13 && r < 19) ||
              (c > 4 && c < 10 && r > 13 && r < 20);
            return inLand
              ? `<circle cx="${x.toFixed(1)}" cy="${y}" r="1.7" fill="#3E5273" opacity="0.8"/>`
              : '';
          }).join('')).join('')}
        ${pins.map(([x, y, title, reg], i) => {
          const beg = ((i * dur) / pins.length).toFixed(2);
          return `<g>
            <circle cx="${x}" cy="${y}" r="4" fill="${OR}" opacity="0.5"/>
            <circle cx="${x}" cy="${y}" r="4" fill="${OR}">
              <animate attributeName="r" values="4;22;22" keyTimes="0;0.16;1" dur="${dur}s"
                begin="${beg}s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.8;0;0" keyTimes="0;0.16;1" dur="${dur}s"
                begin="${beg}s" repeatCount="indefinite"/></circle>
            <g opacity="0">
              <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.03;0.14;0.17;1"
                dur="${dur}s" begin="${beg}s" repeatCount="indefinite"/>
              ${rect(x + 12, y - 22, 172, 42, { fill: WHITE, r: 9 })}
              ${t(x + 26, y - 4, title, { size: 12.5, w: 700, fill: INK })}
              ${lab(x + 26, y + 12, reg, OR, { size: 8 })}
            </g>
          </g>`;
        }).join('')}
        ${[['350+', 'ARTICLES'], ['190+', 'COUNTRIES'], ['25K', 'SUBSCRIBERS']].map(([v, k], i) => {
          const bw = (W - 48 - 24) / 3;
          const x = 24 + i * (bw + 12);
          return `${rect(x, 414, bw, 62, { fill: '#0E141D', r: 12 })}
            ${t(x + 18, 446, v, { m: true, size: 20, w: 700, fill: OR })}
            ${lab(x + 18, 464, k, WHITE, { size: 8, op: 0.55 })}`;
        }).join('')}
        ${lab(24, 512, 'THE SAME FOOTPRINT SELLS THE NETWORK AND THE WRITING', WHITE, { size: 8.5, op: 0.45 })}`),
    };
  },
};

/* ══ 8 · Subscribe ════════════════════════════════════════════════════════ */
export const subscribeCover = {
  id: 'bv-sub',
  name: 'Subscribe',
  family: 'Conversion',
  tagline: 'The panel asks for the email',
  desc:
    'The page has two calls to action — visit the blog and subscribe — and the panel supports ' +
    'neither. This turns it into the subscribe surface: what lands in the inbox, how often, and ' +
    'the 25,000 subscribers as social proof, with a sample issue assembling itself. If the real ' +
    'goal of this section is list growth, this is the only option that pursues it.',
  pros: ['Directly serves the newsletter CTA', 'Shows what subscribing gets you', 'Easiest to measure'],
  cons: ['Commercial rather than editorial in tone', 'Does not showcase any writing'],
  scores: { story: 3, motion: 4, perf: 5, mobile: 5, brand: 3, ease: 5 },
  build: () => {
    const dur = 11;
    return {
      pills: noPills,
      svg: w(`
        <rect width="${W}" height="${H}" fill="#FFFDFB"/>
        <circle cx="${W - 50}" cy="${H - 50}" r="170" fill="${OR}" opacity="0.06"/>
        ${rect(28, 32, W - 56, 300, { fill: WHITE, stroke: LINE, r: 16 })}
        ${rect(28, 32, W - 56, 52, { fill: ORW, r: 16 })}
        ${rect(28, 68, W - 56, 16, { fill: ORW, r: 0 })}
        ${lab(50, 64, 'OPENLINE WEEKLY · ISSUE 142', OR, { size: 9 })}
        ${[['Tokyo on 5GB', 'The plan that actually lasts a week'],
           ['Europe by rail, always online', 'Four borders, one profile'],
           ['Working from Lisbon', 'Where the wifi holds up']].map(([h, sub], i) => {
          const y = 104 + i * 74;
          const on = (0.1 + i * 0.13).toFixed(3);
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on};${(+on + 0.06).toFixed(3)};1"
              dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
            ${rect(50, y, W - 100, 60, { fill: '#F9FAFB', r: 10 })}
            ${rect(50, y, 3, 60, { fill: OR, r: 0 })}
            ${t(70, y + 26, h, { size: 14, w: 700 })}
            ${lab(70, y + 45, sub.toUpperCase(), MUT, { size: 8 })}
          </g>`;
        }).join('')}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.5;0.58;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${rect(28, 356, W - 56, 56, { fill: WHITE, stroke: LINE, r: 12 })}
          ${t(52, 390, 'you@example.com', { size: 14, fill: '#9CA3AF' })}
          ${rect(W - 178, 366, 130, 36, { fill: OR, r: 9 })}
          ${t(W - 113, 390, 'Subscribe', { size: 13.5, w: 700, a: 'middle', fill: WHITE })}
        </g>
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.68;0.78;1" dur="${dur}s"
            repeatCount="indefinite" fill="freeze"/>
          ${[['25,412', 'SUBSCRIBERS'], ['Weekly', 'ONE EMAIL'], ['Zero', 'SPAM']].map(([v, k], i) => {
            const bw = (W - 56 - 24) / 3;
            const x = 28 + i * (bw + 12);
            return `${rect(x, 430, bw, 58, { fill: '#F9FAFB', r: 10 })}
              ${t(x + 16, 460, v, { m: true, size: 16, w: 700, fill: INK })}
              ${lab(x + 16, 477, k, MUT, { size: 8 })}`;
          }).join('')}
        </g>`),
    };
  },
};

/* ══ 9 · Read While You Wait ══════════════════════════════════════════════ */
export const readWhileWait = {
  id: 'bv-wait',
  name: 'Read While You Wait',
  family: 'Editorial',
  tagline: 'The article, actually scrolling',
  desc:
    'Rather than a cover, the panel shows the piece itself — real body text scrolling slowly ' +
    'behind a soft gradient, with the title pinned over it and a reading-progress bar. It is the ' +
    'cheapest honest option: no cover art to commission, no video to shoot, and it proves there ' +
    'is real writing behind the link.',
  pros: ['Requires no new assets whatsoever', 'Proves substance immediately', 'Reads as a publication'],
  cons: ['Body text at this size is decorative, not readable', 'Least distinctive of the ten'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 4, brand: 4, ease: 5 },
  build: (uid = 'a') => {
    const dur = 26;
    const lines = [
      'Five gigabytes sounds like a lot until you land at Haneda', 'at nine in the evening and realise the station signage',
      'assumes you already know where you are going. Maps eat', 'data. Translation eats data. The group chat asking whether',
      'you have arrived yet eats a surprising amount of data.', '',
      'So here is the arithmetic that actually matters, based on', 'two weeks of moving around Tokyo with a 5GB profile and',
      'no physical SIM at all. Navigation came to just under a', 'gigabyte, which was less than expected — offline maps do',
      'most of the work once they are downloaded, and the only', 'time it mattered was the one afternoon I forgot to cache',
      'the Shinjuku area before going underground.', '',
      'Translation was the surprise. Live camera translation on', 'menus and signage is extraordinarily useful and',
      'extraordinarily hungry, and it accounted for nearly a', 'third of everything I used across the fortnight.',
      '', 'Messaging barely registered. Photographs, if you upload', 'them, will end your month early — so do that on the hotel',
      'connection and not on the train.',
    ];
    return {
      pills: noPills,
      svg: w(`
        <rect width="${W}" height="${H}" fill="#FFFDFB"/>
        <clipPath id="bvw${uid}"><rect x="0" y="0" width="${W}" height="${H}"/></clipPath>
        <g clip-path="url(#bvw${uid})">
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 160;0 -520"
              keyTimes="0;1" dur="${dur}s" repeatCount="indefinite"/>
            ${lines.map((ln, i) => ln
              ? t(36, i * 26, ln, { size: 13.5, fill: '#4B5563' })
              : '').join('')}
          </g>
          <defs><linearGradient id="bvg${uid}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#FFFDFB" stop-opacity="1"/>
            <stop offset="0.34" stop-color="#FFFDFB" stop-opacity="0.72"/>
            <stop offset="0.6" stop-color="#FFFDFB" stop-opacity="0.9"/>
            <stop offset="1" stop-color="#FFFDFB" stop-opacity="1"/></linearGradient></defs>
          <rect width="${W}" height="${H}" fill="url(#bvg${uid})"/>
        </g>
        ${rect(32, 190, 96, 26, { fill: ORW, r: 13 })}
        ${lab(46, 207, 'ASIA', OR, { size: 8.5 })}
        ${t(32, 262, 'Tokyo on 5GB', { size: 34, w: 800 })}
        ${t(32, 296, 'What a fortnight actually costs', { size: 16, fill: MUT })}
        ${rect(32, 330, 168, 42, { fill: OR, r: 10 })}
        ${t(116, 357, 'Read the piece →', { size: 13.5, w: 700, a: 'middle', fill: WHITE })}
        ${lab(216, 357, '6 MIN', MUT, { size: 9 })}
        ${rect(32, H - 52, W - 64, 4, { fill: LINE, r: 2 })}
        <rect x="32" y="${H - 52}" width="0" height="4" rx="2" fill="${OR}">
          <animate attributeName="width" values="0;${W - 64}" keyTimes="0;1" dur="${dur}s" repeatCount="indefinite"/>
        </rect>
        ${lab(32, H - 22, 'REAL COPY FROM THE PIECE — NO COVER ART REQUIRED', GRAY, { size: 8.5 })}`),
    };
  },
};

/* ══ 10 · The Split ══════════════════════════════════════════════════════ */
export const theSplit = {
  id: 'bv-split',
  name: 'The Split',
  family: 'Video cover',
  tagline: 'One hero cover, two more below it',
  desc:
    'A compromise built for the real constraint: one article gets a full cover treatment at the ' +
    'top, the other two sit beneath as small tiles. It keeps all three posts visible, which the ' +
    'current panel does and most of the cover options sacrifice, while still giving the lead ' +
    'story enough room to be atmospheric.',
  pros: ['Keeps all three posts visible at once', 'Gives the lead story real presence', 'Familiar and quick to scan'],
  cons: ['Two of three still get no cover art', 'Less bold than a full-panel cover'],
  scores: { story: 4, motion: 4, perf: 5, mobile: 5, brand: 4, ease: 4 },
  build: (uid = 'a') => {
    const dur = 12;
    return {
      pills: noPills,
      svg: w(`
        <rect width="${W}" height="${H}" fill="#FFFDFB"/>
        <clipPath id="bvs${uid}"><rect x="28" y="28" width="${W - 56}" height="298" rx="16"/></clipPath>
        <g clip-path="url(#bvs${uid})">
          <rect x="28" y="28" width="${W - 56}" height="298" fill="#1B2E50"/>
          <circle cx="150" cy="110" r="150" fill="${OR}" opacity="0.2">
            <animate attributeName="r" values="150;176;150" keyTimes="0;0.5;1" dur="${dur}s" repeatCount="indefinite"/>
          </circle>
          <circle cx="440" cy="280" r="120" fill="#5AA9E6" opacity="0.15">
            <animate attributeName="r" values="120;146;120" keyTimes="0;0.5;1" dur="${dur}s"
              begin="${(dur / 2).toFixed(1)}s" repeatCount="indefinite"/>
          </circle>
          ${Array.from({ length: 8 }, (_, i) => {
            const bh = 46 + ((i * 41) % 104);
            return `<rect x="${44 + i * 66}" y="${326 - bh}" width="${30 + (i % 3) * 10}" height="${bh}"
              rx="3" fill="#0E1C33" opacity="0.9"/>`;
          }).join('')}
          <rect x="28" y="196" width="${W - 56}" height="130" fill="#0A1420" opacity="0.62"/>
        </g>
        ${rect(48, 48, 96, 26, { fill: 'rgba(255,255,255,0.16)', r: 13 })}
        ${lab(62, 65, 'ASIA', WHITE, { size: 8.5 })}
        ${playMark(W / 2, 150, 32)}
        ${t(48, 262, 'Tokyo on 5GB', { size: 29, w: 800, fill: WHITE })}
        ${lab(48, 286, '6 MIN READ · MOST READ THIS WEEK', WHITE, { size: 9, op: 0.72 })}
        ${rect(48, 296, 110, 4, { fill: WHITE, op: 0.25, r: 2 })}
        <rect x="48" y="296" width="0" height="4" rx="2" fill="${OR}">
          <animate attributeName="width" values="0;110;110" keyTimes="0;0.8;1" dur="${dur}s" repeatCount="indefinite"/>
        </rect>

        ${[ARTS[1], ARTS[2]].map(([title, cat, min], i) => {
          const bw = (W - 56 - 16) / 2;
          const x = 28 + i * (bw + 16);
          const hue = ['#2A2340', '#123A32'][i];
          const on = (0.1 + i * 0.14).toFixed(3);
          const words = title.split(' ');
          const mid = Math.ceil(words.length / 2);
          const l1 = words.length > 2 ? words.slice(0, mid).join(' ') : title;
          const l2 = words.length > 2 ? words.slice(mid).join(' ') : '';
          return `<g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${on};${(+on + 0.06).toFixed(3)};1"
              dur="${dur}s" repeatCount="indefinite" fill="freeze"/>
            ${rect(x, 346, bw, 162, { fill: WHITE, stroke: LINE, r: 14 })}
            <clipPath id="bvs2${uid}${i}"><rect x="${x + 10}" y="356" width="${bw - 20}" height="72" rx="9"/></clipPath>
            <g clip-path="url(#bvs2${uid}${i})">
              <rect x="${x + 10}" y="356" width="${bw - 20}" height="72" fill="${hue}"/>
              <circle cx="${x + 60}" cy="380" r="52" fill="${OR}" opacity="0.2"/>
              <circle cx="${x + bw - 40}" cy="418" r="40" fill="#5AA9E6" opacity="0.16"/>
            </g>
            ${playMark(x + bw / 2, 392, 16)}
            ${t(x + 16, 452, l1, { size: 13.5, w: 700 })}
            ${l2 ? t(x + 16, 470, l2, { size: 13.5, w: 700 }) : ''}
            ${lab(x + 16, l2 ? 492 : 474, `${cat.toUpperCase()} · ${min.toUpperCase()}`, MUT, { size: 8 })}
          </g>`;
        }).join('')}
        ${lab(28, 530, 'ALL THREE POSTS STILL VISIBLE', GRAY, { size: 8.5 })}`),
    };
  },
};

export const BLOGV_VARIANTS = [
  blogvCurrent, nowPlaying, threeCovers, theReel, postcard, chapterCards,
  longRead, whereRead, subscribeCover, readWhileWait, theSplit,
];

export const BLOGV_BOX = { w: W, h: H };
