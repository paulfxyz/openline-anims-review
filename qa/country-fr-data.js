// Review-page fixtures, not a production catalogue or live quote.
// Verified against https://openline-revisions-hub.vercel.app/country-fr on 2026-10-04.
export const SOURCE = {
  url: 'https://openline-revisions-hub.vercel.app/country-fr',
  checked: '2026-10-04', currency: 'USD', kind: 'review-page-fixtures',
};
export const UNLIMITED = [
  {days:3,price:12.99},{days:5,price:19.99},{days:7,price:26.99},
  {days:10,price:36.99},{days:15,price:49.99},{days:30,price:89.99},
];
export const FIXED = [
  [1,5,2.99],[1,10,3.99],[1,15,3.99],[1,30,5.99],
  [3,5,5.99],[3,10,6.99],[3,15,6.99],[3,30,7.99],
  [5,5,4.99],[5,10,4.99],[5,15,5.99],[5,30,6.99],
  [10,5,8.99],[10,10,8.99],[10,15,9.99],[10,30,10.99],
  [20,5,14.99],[20,10,14.99],[20,15,15.99],[20,30,16.99],
  [30,10,16.99],[50,10,20.99],[60,30,39.99],[90,30,40.99],[150,30,46.99],
].map(([gb,days,price])=>({id:`fr-${gb}-${days}`,gb,days,price}));
export const POPULAR = ['fr-1-5','fr-3-5','fr-5-15','fr-10-30','fr-20-30'];
export function unlimitedPrice(days) {
  if (!Number.isInteger(days) || days < 1 || days > 365) return null;
  const exact = UNLIMITED.find(p=>p.days===days);
  if (exact) return exact.price;
  const first=UNLIMITED[0], last=UNLIMITED.at(-1);
  if (days < first.days) return Number((days*first.price/first.days).toFixed(2));
  if (days > last.days) return Number((days*last.price/last.days).toFixed(2));
  const hi=UNLIMITED.findIndex(p=>p.days>days), a=UNLIMITED[hi-1], b=UNLIMITED[hi];
  return Number((a.price+(b.price-a.price)*(days-a.days)/(b.days-a.days)).toFixed(2));
}
