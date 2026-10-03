/* ══════════════════════════════════════════════════════════════════════
   Icon library for /qa — 109 glyphs × 3 motions = 327 animated icons (26 of them Openline-specific: eSIM, activation, top-up, transfer, lounge…).

   Glyphs are stroke drawings on a 24 grid (round caps and joins, 2px),
   so every one of them can be "drawn on" with pathLength. Motions are
   pure SMIL, so an icon is a self-contained SVG string: no stylesheet,
   nothing to register, safe to paste into any page or email-free modal.
   ══════════════════════════════════════════════════════════════════════ */

/* name -> [category, svg inner elements] */
export const GLYPHS = {
  check: ['Status', '<path d="M5 12.5l4.2 4.2L19 7"/>'],
  'check-circle': ['Status', '<circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.8 2.8L16.2 9.6"/>'],
  'check-double': ['Status', '<path d="M2.5 12.5l4 4L15 8"/><path d="M10.5 15.5l1 1L21 8"/>'],
  x: ['Status', '<path d="M6 6l12 12M18 6L6 18"/>'],
  'x-circle': ['Status', '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>'],
  alert: ['Status', '<path d="M12 3.5L2.8 19.5h18.4z"/><path d="M12 10v4.2M12 17.2v.1"/>'],
  'alert-circle': ['Status', '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.4v.1"/>'],
  'alert-octagon': ['Status', '<path d="M8.3 3h7.4L21 8.3v7.4L15.7 21H8.3L3 15.7V8.3z"/><path d="M12 7.5v5.5M12 16.4v.1"/>'],
  info: ['Status', '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.6v.1"/>'],
  help: ['Status', '<circle cx="12" cy="12" r="9"/><path d="M9.3 9.2a2.8 2.8 0 0 1 5.4 1c0 1.9-2.7 2.4-2.7 4"/><path d="M12 17.3v.1"/>'],
  bell: ['Status', '<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.6 2H4.4z"/><path d="M10 21h4"/>'],
  ban: ['Status', '<circle cx="12" cy="12" r="9"/><path d="M5.7 5.7l12.6 12.6"/>'],
  loader: ['Status', '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>'],
  clock: ['Time', '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.4 2"/>'],
  hourglass: ['Time', '<path d="M7 3h10M7 21h10M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9s8 4 8 9"/>'],
  calendar: ['Time', '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>'],
  refresh: ['Time', '<path d="M20 11.5A8 8 0 0 0 5.6 6.6L4 8.5"/><path d="M4 4v4.5h4.5"/><path d="M4 12.5a8 8 0 0 0 14.4 4.9L20 15.5"/><path d="M20 20v-4.5h-4.5"/>'],
  shield: ['Security', '<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6z"/>'],
  'shield-check': ['Security', '<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6z"/><path d="M8.7 12l2.3 2.3 4.4-4.5"/>'],
  lock: ['Security', '<rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3M12 14.5v2"/>'],
  unlock: ['Security', '<rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 7.6-1.7M12 14.5v2"/>'],
  key: ['Security', '<circle cx="8" cy="15" r="4.5"/><path d="M11.2 11.8L20 3M16.5 6.5l2.5 2.5M14 9l2 2"/>'],
  fingerprint: ['Security', '<path d="M6.5 18.5c1-2 1.5-4 1.5-6.5a4 4 0 0 1 8 0c0 2.6-.4 5-1.3 7"/><path d="M12 12c0 3-.6 5.6-1.8 8"/><path d="M4.4 15c.4-1 .6-2 .6-3a7 7 0 0 1 12.2-4.7M19 12c0 2-.3 3.8-.8 5.5"/>'],
  eye: ['Security', '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>'],
  'eye-off': ['Security', '<path d="M3 3l18 18"/><path d="M10.6 5.6A9.8 9.8 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-2.8 3.5M6.4 6.4C3.9 8 2.5 12 2.5 12S6 18.5 12 18.5c1.7 0 3.2-.5 4.5-1.2"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>'],
  user: ['People', '<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>'],
  'user-check': ['People', '<circle cx="10" cy="8" r="4"/><path d="M3 20.5a7 7 0 0 1 11.6-5.3"/><path d="M15.5 18l2 2 4-4"/>'],
  users: ['People', '<circle cx="9" cy="8.5" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 5.2a3.5 3.5 0 0 1 0 6.6M18.5 20a6.5 6.5 0 0 0-3-5.5"/>'],
  smile: ['People', '<circle cx="12" cy="12" r="9"/><path d="M8.3 14.2a4.4 4.4 0 0 0 7.4 0M9 9.5v.1M15 9.5v.1"/>'],
  'thumbs-up': ['People', '<path d="M7.5 10.5v10H4.5v-10z"/><path d="M7.5 10.5l3.8-7a2 2 0 0 1 2.7 2.3l-.9 3.7h5.6a2 2 0 0 1 2 2.4l-1.4 6.8a2 2 0 0 1-2 1.6H7.5"/>'],
  heart: ['People', '<path d="M12 20s-8-4.6-8-10.3A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 2.7C20 15.4 12 20 12 20z"/>'],
  hand: ['People', '<path d="M8 12V5.5a1.6 1.6 0 0 1 3.2 0V11M11.2 10.5V4a1.6 1.6 0 0 1 3.2 0v6.5M14.4 10.5V5.5a1.6 1.6 0 0 1 3.2 0V14a7 7 0 0 1-7 7H10a6 6 0 0 1-5-2.7L2.8 15a1.6 1.6 0 0 1 2.6-1.8L8 15.5"/>'],
  tag: ['Money', '<path d="M3 12.2V4.5A1.5 1.5 0 0 1 4.5 3h7.7l8.8 8.8a1.5 1.5 0 0 1 0 2.1l-7.1 7.1a1.5 1.5 0 0 1-2.1 0z"/><circle cx="8" cy="8" r="1.5"/>'],
  percent: ['Money', '<path d="M19 5L5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>'],
  gift: ['Money', '<rect x="3.5" y="8" width="17" height="4.5" rx="1"/><path d="M5 12.5v8h14v-8M12 8v12.5"/><path d="M12 8C10.5 4 6.5 4 6.5 6.2S10 8 12 8zM12 8c1.5-4 5.5-4 5.5-1.8S14 8 12 8z"/>'],
  coins: ['Money', '<ellipse cx="9" cy="7" rx="6" ry="3"/><path d="M3 7v4c0 1.7 2.7 3 6 3s6-1.3 6-3V7"/><path d="M9 14v3c0 1.7 2.7 3 6 3s6-1.3 6-3v-4c0-1.7-2.7-3-6-3"/>'],
  wallet: ['Money', '<path d="M19 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"/><path d="M21 9h-5a3 3 0 0 0 0 6h5z"/><path d="M16.5 12v.1"/>'],
  card: ['Money', '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6.5 15h4"/>'],
  'piggy-bank': ['Money', '<path d="M19 9.5c1 .5 1.8 1.5 2 2.5h-1.5c-.4 1.8-1.4 3.2-2.9 4.2V20h-3v-2.6a9 9 0 0 1-3.2 0V20h-3v-3.4A6.5 6.5 0 0 1 4 11.3c0-3.6 3.3-6.3 7.3-6.3 2 0 3.8.6 5.2 1.6L19.5 5z"/><path d="M15.5 10v.1"/>'],
  receipt: ['Money', '<path d="M5 3h14v18l-2.3-1.5L14.3 21 12 19.5 9.7 21l-2.4-1.5L5 21z"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4"/>'],
  'trending-down': ['Money', '<path d="M3 7l6.5 6.5 4-4L21 17"/><path d="M21 11.5V17h-5.5"/>'],
  'trending-up': ['Money', '<path d="M3 17l6.5-6.5 4 4L21 7"/><path d="M21 12.5V7h-5.5"/>'],
  sim: ['Connectivity', '<path d="M6 3h8.5L19 7.5V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><rect x="7.5" y="11" width="9" height="6.5" rx="1"/><path d="M12 11v6.5M7.5 14.2h9"/>'],
  wifi: ['Connectivity', '<path d="M2.5 9a14 14 0 0 1 19 0"/><path d="M5.5 12.3a9.5 9.5 0 0 1 13 0"/><path d="M8.7 15.5a5 5 0 0 1 6.6 0"/><path d="M12 19v.1"/>'],
  signal: ['Connectivity', '<path d="M4 20v-3M9 20v-6.5M14 20V10M19 20V5"/>'],
  antenna: ['Connectivity', '<path d="M12 10v11M9 21h6"/><circle cx="12" cy="8" r="2"/><path d="M7.8 3.8a6 6 0 0 0 0 8.4M16.2 3.8a6 6 0 0 1 0 8.4M5 1.5a9.6 9.6 0 0 0 0 13M19 1.5a9.6 9.6 0 0 1 0 13"/>'],
  globe: ['Connectivity', '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'],
  phone: ['Connectivity', '<rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M10.5 18.5h3"/>'],
  bolt: ['Connectivity', '<path d="M13 2.5L4.5 13.5H12l-1 8 8.5-11H12z"/>'],
  battery: ['Connectivity', '<rect x="2.5" y="7" width="16" height="10" rx="2.5"/><path d="M21.5 10.5v3M6 10.5v3M9.5 10.5v3"/>'],
  qr: ['Connectivity', '<rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1"/><rect x="14" y="3.5" width="6.5" height="6.5" rx="1"/><rect x="3.5" y="14" width="6.5" height="6.5" rx="1"/><path d="M14 14h2.5v2.5M20.5 14v.1M14 20.5h6.5v-3.5M17.5 17.5v.1"/>'],
  plane: ['Travel', '<path d="M10.2 13.8L3 11.5l1.3-1.3 7.3.5 4.6-4.6a1.8 1.8 0 0 1 2.6 2.6l-4.6 4.6.5 7.3-1.3 1.3-2.3-7.2-3.2 3.2.3 2.6-1 1-1.4-3.2L2 17l1-1 2.6.3z"/>'],
  'map-pin': ['Travel', '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'],
  compass: ['Travel', '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>'],
  luggage: ['Travel', '<rect x="5" y="7" width="14" height="13" rx="2.5"/><path d="M9 7V4.5h6V7M9 11v5M15 11v5M8 20v1.5M16 20v1.5"/>'],
  ticket: ['Travel', '<path d="M3 8.5V6a1.5 1.5 0 0 1 1.5-1.5h15A1.5 1.5 0 0 1 21 6v2.5a3.5 3.5 0 0 0 0 7V18a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18v-2.5a3.5 3.5 0 0 0 0-7z"/><path d="M14 4.5v15" stroke-dasharray="2 2.5"/>'],
  mail: ['Messages', '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M3 6.5l9 6.5 9-6.5"/>'],
  send: ['Messages', '<path d="M21 3L10.5 13.5"/><path d="M21 3l-6.5 18-4-7.5L3 9.5z"/>'],
  chat: ['Messages', '<path d="M20.5 12a8.5 8.5 0 0 1-12.4 7.5L3.5 20.5l1-4.6A8.5 8.5 0 1 1 20.5 12z"/><path d="M8.5 12v.1M12 12v.1M15.5 12v.1"/>'],
  inbox: ['Messages', '<path d="M3 13l2.8-7.3A2 2 0 0 1 7.7 4.5h8.6a2 2 0 0 1 1.9 1.2L21 13v5.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M3 13h5l1.5 2.5h5L16 13h5"/>'],
  trash: ['Actions', '<path d="M4 6.5h16M9 6.5V4h6v2.5M6 6.5l1 14h10l1-14M10 11v5.5M14 11v5.5"/>'],
  download: ['Actions', '<path d="M12 3.5v12M7 11l5 5 5-5M4 20.5h16"/>'],
  upload: ['Actions', '<path d="M12 16V4M7 8.5l5-5 5 5M4 20.5h16"/>'],
  logout: ['Actions', '<path d="M9.5 20.5H5a1.5 1.5 0 0 1-1.5-1.5V5A1.5 1.5 0 0 1 5 3.5h4.5"/><path d="M15.5 16.5L20 12l-4.5-4.5M20 12H9"/>'],
  link: ['Actions', '<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/>'],
  settings: ['Actions', '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>'],
  star: ['Delight', '<path d="M12 3l2.8 5.8 6.2.9-4.5 4.4 1.1 6.2L12 17.4l-5.6 2.9 1.1-6.2L3 9.7l6.2-.9z"/>'],
  sparkles: ['Delight', '<path d="M10 3.5l1.6 4.4L16 9.5l-4.4 1.6L10 15.5l-1.6-4.4L4 9.5l4.4-1.6z"/><path d="M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z"/>'],
  trophy: ['Delight', '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 5.5H4.5a3.5 3.5 0 0 0 4 4M16 5.5h3.5a3.5 3.5 0 0 1-4 4M12 13v4M8.5 20.5h7M9.5 17h5v3.5h-5z"/>'],
  crown: ['Delight', '<path d="M3.5 8l4.3 3.5L12 5l4.2 6.5L20.5 8l-1.8 10H5.3z"/><path d="M5.3 21h13.4"/>'],
  rocket: ['Delight', '<path d="M12 15.5L8.5 12C10 6.5 14 3.5 20.5 3.5 20.5 10 17.5 14 12 15.5z"/><path d="M8.5 12l-4 .5L3 15l4.5.5M12 15.5l-.5 4L9 21l-.5-4.5"/><circle cx="15.3" cy="8.7" r="1.6"/><path d="M6.5 17.5c-1 .5-2 2.5-2 2.5s2-1 2.5-2"/>'],
  party: ['Delight', '<path d="M4 20.5l4.5-12 7 7z"/><path d="M14 3.5v2M19 5l-1.5 1.5M20.5 10h-2M10.5 6.5c1-1 1-2.5 0-3.5M17.5 13.5c1-1 2.5-1 3.5 0"/>'],
  flag: ['Delight', '<path d="M5 21V4M5 4.5c4-2 7 2 11 0 1.5-.7 3-.5 3-.5v9s-1.5-.2-3 .5c-4 2-7-2-11 0"/>'],
  fire: ['Delight', '<path d="M12 21a6.5 6.5 0 0 0 6.5-6.5c0-4-3-5.5-3.5-9.5-2.5 1.5-3.8 4-3.5 6.5-1.3-.5-2-1.8-2-3.5C7 10 5.5 12.2 5.5 14.5A6.5 6.5 0 0 0 12 21z"/>'],
  leaf: ['Delight', '<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19c3.5-5 7-7.5 10.5-9"/>'],
  cloud: ['Delight', '<path d="M7 18.5a4.5 4.5 0 0 1-.5-9 6 6 0 0 1 11.5 1.5 4 4 0 0 1-.5 7.5z"/>'],
  arrow: ['Actions', '<path d="M4 12h16M14 6l6 6-6 6"/>'],
  plus: ['Actions', '<path d="M12 5v14M5 12h14"/>'],
  external: ['Actions', '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10"/>'],
  book: ['Messages', '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v15H5.5A1.5 1.5 0 0 0 4 19.5z"/><path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H19v-3"/><path d="M8 7.5h7"/>'],
  headset: ['Messages', '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="13.5" width="4.5" height="6.5" rx="1.5"/><rect x="16.5" y="13.5" width="4.5" height="6.5" rx="1.5"/><path d="M20 19.5a3 3 0 0 1-3 2.5h-3"/>'],
  languages: ['Messages', '<path d="M3 5h10M8 3v2M5 5c.8 3.5 3.5 6.5 7 8M11 5c-.8 3.5-3.5 6.5-7 8"/><path d="M13 21l4-9 4 9M14.5 18h5"/>'],
  /* ── Openline: eSIM lifecycle, plans, account ── */
  esim: ['Openline', '<path d="M7 3h7.5L19 7.5V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M14.5 13.2h-4.2a2.1 2.1 0 1 0 0 2.6"/><path d="M9.3 14.5h5.2"/>'],
  'esim-check': ['Openline', '<path d="M7 3h7.5L19 7.5V12M12 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2"/><path d="M14.5 18l2 2 4-4"/><rect x="8" y="9.5" width="6" height="4.5" rx="1"/>'],
  'esim-plus': ['Openline', '<path d="M7 3h7.5L19 7.5V12M12 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2"/><path d="M17.5 14.5v6M14.5 17.5h6"/><rect x="8" y="9.5" width="6" height="4.5" rx="1"/>'],
  'esim-x': ['Openline', '<path d="M7 3h7.5L19 7.5V12M12 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2"/><path d="M15 15l5 5M20 15l-5 5"/><rect x="8" y="9.5" width="6" height="4.5" rx="1"/>'],
  power: ['Openline', '<path d="M12 3v8"/><path d="M6.6 6.6a8 8 0 1 0 10.8 0"/>'],
  scan: ['Openline', '<path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16"/><path d="M4 12h16"/>'],
  'phone-check': ['Openline', '<rect x="5" y="2.5" width="11" height="19" rx="3"/><path d="M9 18.5h3"/><path d="M14.5 11.5l2 2 4.5-4.5"/>'],
  'phone-x': ['Openline', '<rect x="5" y="2.5" width="11" height="19" rx="3"/><path d="M9 18.5h3"/><path d="M15.5 8.5l5 5M20.5 8.5l-5 5"/>'],
  'phone-swap': ['Openline', '<rect x="2.5" y="5" width="7" height="13" rx="2"/><rect x="14.5" y="5" width="7" height="13" rx="2"/><path d="M10.5 9.5h3l-1.2-1.2M13.5 13.5h-3l1.2 1.2"/>'],
  gauge: ['Openline', '<path d="M3.5 17a8.5 8.5 0 1 1 17 0"/><path d="M12 17l4.5-5.5"/><circle cx="12" cy="17" r="1.5"/>'],
  topup: ['Openline', '<circle cx="12" cy="12" r="9"/><path d="M12.8 6.5L9 12.6h3.4l-1 4.9 3.8-6.1h-3.4z"/>'],
  'plane-land': ['Openline', '<path d="M2.5 20.5h19"/><path d="M4 10.5l2.2-1 3 3 2.3-1-3-6.5 2-.8 5.5 5.8 4.6-1.8a1.7 1.7 0 0 1 1.2 3.2l-15 5.8-3-2.9z"/>'],
  'plane-off': ['Openline', '<path d="M3 3l18 18"/><path d="M10.2 13.8L3 11.5l1.3-1.3 4.2.3M12.8 9.7l3.4-3.4a1.8 1.8 0 0 1 2.6 2.6l-3.4 3.4M15.3 15.3l.3 4.4-1.3 1.3-2.3-7.2"/>'],
  lounge: ['Openline', '<path d="M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3"/><path d="M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v4.5H3z"/><path d="M5 17.5V20M19 17.5V20"/>'],
  refund: ['Openline', '<path d="M5 3h14v18l-2.3-1.5L14.3 21 12 19.5 9.7 21l-2.4-1.5L5 21z"/><path d="M14.5 9.5H10a1.8 1.8 0 0 0 0 3.6h2a1.8 1.8 0 0 1 0 3.6H9"/><path d="M12 7.5v1.8M12 16.7v1.3"/>'],
  'receipt-check': ['Openline', '<path d="M5 3h14v18l-2.3-1.5L14.3 21 12 19.5 9.7 21l-2.4-1.5L5 21z"/><path d="M8.8 11.5l2.2 2.2 4.2-4.4"/>'],
  'card-check': ['Openline', '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19"/><path d="M13.5 15l1.8 1.8L19 13"/>'],
  'calendar-check': ['Openline', '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M9 15l2 2 4-4"/>'],
  map: ['Openline', '<path d="M9 4L3.5 6v14L9 18l6 2 5.5-2V4L15 6z"/><path d="M9 4v14M15 6v14"/>'],
  route: ['Openline', '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.5"/>'],
  speed: ['Openline', '<path d="M3 13.5a9 9 0 0 1 18 0"/><path d="M12 13.5L8 8.5"/><path d="M5.5 18.5h13"/>'],
  pause: ['Openline', '<circle cx="12" cy="12" r="9"/><path d="M10 9v6M14 9v6"/>'],
  repeat: ['Openline', '<path d="M17 2.5l3 3-3 3"/><path d="M4 11.5v-1a5 5 0 0 1 5-5h11M7 21.5l-3-3 3-3"/><path d="M20 12.5v1a5 5 0 0 1-5 5H4"/>'],
  'user-plus': ['Openline', '<circle cx="10" cy="8" r="4"/><path d="M3 20.5a7 7 0 0 1 12.5-4.4"/><path d="M18.5 14v6M15.5 17h6"/>'],
  shop: ['Openline', '<path d="M3.5 9.5L5 4h14l1.5 5.5"/><path d="M3.5 9.5a2.8 2.8 0 0 0 5.6 0 2.8 2.8 0 0 0 5.8 0 2.8 2.8 0 0 0 5.6 0"/><path d="M5 12v8.5h14V12M10 20.5v-5h4v5"/>'],
  cart: ['Openline', '<circle cx="9" cy="20" r="1.5"/><circle cx="17.5" cy="20" r="1.5"/><path d="M2.5 3.5h2.8l2.4 11.5h10.8l2-8H6.3"/>'],
  sun: ['Delight', '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>'],
};

export const MOTIONS = {
  draw: 'Draw on',
  pop: 'Pop in',
  pulse: 'Pulse ring',
};

/* Which motion reads right for which glyph by default — used to sort the
   picker so the first option for each glyph is the natural one. */
export const ICONS = [];
Object.entries(GLYPHS).forEach(([g, [cat]]) => {
  Object.keys(MOTIONS).forEach((m) => ICONS.push({ id: `${g}:${m}`, glyph: g, motion: m, cat, name: `${g.replace(/-/g, ' ')} · ${MOTIONS[m].toLowerCase()}` }));
});

/* Render one animated icon.
   color: stroke colour; tint: badge fill; size in px (badge diameter).
   replay: a key that changes the begin of one-shot motions so a preview can
   restart them. All one-shot motions also loop gently after landing so the
   icon never sits fully still. */
export function iconSVG(id, o = {}) {
  const [g, m] = id.split(':');
  const glyph = GLYPHS[g] ? GLYPHS[g][1] : GLYPHS.check[1];
  const c = o.color || '#0B0B0F';
  const tint = o.tint || 'rgba(11,11,15,0.06)';
  const ring = o.ring || c;
  const badge = o.badge !== false;
  const k = (o.uid || 'ic') + '-' + g + '-' + m;
  /* pathLength on every drawable element so dash-based draw-on is uniform */
  const drawable = glyph.replace(/<(path|circle|rect|ellipse)\b/g, '<$1 pathLength="1"');
  let inner = '';
  if (m === 'draw') {
    inner = `<g fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      stroke-dasharray="1 1" stroke-dashoffset="1">
      ${drawable}
      <animate attributeName="stroke-dashoffset" values="1;0;0" keyTimes="0;0.35;1" dur="3.2s"
        begin="0.15s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0 0 1 1"/>
    </g>`;
  } else if (m === 'pop') {
    inner = `<g transform="translate(12 12)"><g>
      <animateTransform attributeName="transform" type="scale" values="0.4;1.14;0.96;1;1;1.06;1"
        keyTimes="0;0.12;0.2;0.26;0.7;0.82;1" dur="3.2s" repeatCount="indefinite"/>
      <g transform="translate(-12 -12)" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${glyph}</g>
    </g></g>`;
  } else {
    inner = `<circle cx="12" cy="12" r="9" fill="none" stroke="${ring}" stroke-width="1.2" opacity="0">
        <animate attributeName="r" values="8;15" dur="2.4s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.55;0" dur="2.4s" repeatCount="indefinite"/>
      </circle>
      <g fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${glyph}</g>`;
  }
  const pad = badge ? 9 : 2;
  const vb = `${-pad} ${-pad} ${24 + pad * 2} ${24 + pad * 2}`;
  return `<svg viewBox="${vb}" width="${o.size || 64}" height="${o.size || 64}" aria-hidden="true" style="overflow:visible" data-k="${k}">
    ${badge ? `<circle cx="12" cy="12" r="${12 + pad - 1}" fill="${tint}"/>` : ''}
    ${inner}
  </svg>`;
}

/* static glyph, for UI chrome */
export function glyphSVG(g, o = {}) {
  const glyph = GLYPHS[g] ? GLYPHS[g][1] : '';
  return `<svg viewBox="0 0 24 24" width="${o.size || 20}" height="${o.size || 20}" fill="none" stroke="${o.color || 'currentColor'}"
    stroke-width="${o.sw || 2}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${glyph}</svg>`;
}
