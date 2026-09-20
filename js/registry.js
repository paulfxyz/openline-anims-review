import { VARIANTS_1 } from './variants.js';
import { VARIANTS2 } from './variants2.js';

// index 0 = what is live today, 1..10 = proposals
export const VARIANTS = [
  VARIANTS_1[0],   // current
  VARIANTS_1[1],   // 1 Live Handoff
  VARIANTS_1[2],   // 2 Orbit Lock
  VARIANTS_1[3],   // 3 Price Auction
  VARIANTS_1[4],   // 4 Coverage Sweep
  VARIANTS_1[5],   // 5 Data Ribbons
  VARIANTS2[0],    // 6 Failover
  VARIANTS2[1],    // 7 Auction Board
  VARIANTS2[2],    // 8 Route Arcs
  VARIANTS2[3],    // 9 eSIM Wallet
  VARIANTS2[4],    // 10 Kinetic HUD
];

export const CRITERIA = [
  { key: 'story', label: 'Story clarity', note: 'Does a first-time visitor understand multi-network switching without reading?' },
  { key: 'motion', label: 'Motion continuity', note: 'Is the frame alive at every moment, with no dead pauses or visible restarts?' },
  { key: 'perf', label: 'Weight & perf', note: 'Payload, paint cost, and impact on hero LCP.' },
  { key: 'mobile', label: 'Mobile survival', note: 'Does it still read at 390 px, where most eSIM traffic lands?' },
  { key: 'brand', label: 'Brand fit', note: 'Continuity with the chip motif and the cyan system already shipped.' },
  { key: 'ease', label: 'Build ease', note: 'How small the diff is against the component that is live now.' },
];
