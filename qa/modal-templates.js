/* ══════════════════════════════════════════════════════════════════════
   56 ready-made Openline modals, grouped by the moment they appear in.
   Sample copy: plans, prices, dates, ICCIDs and codes are illustrative and
   must come from the real order / account data when wired up.
   ══════════════════════════════════════════════════════════════════════ */

export const TEMPLATE_CATS = [
  'Purchase & checkout', 'Activation & install', 'Manage eSIM', 'Data & top-up',
  'Account & security', 'Openline+ & rewards', 'Travel & support',
];

const T = (k, cat, t, cfg) => ({ k, cat, t, cfg: { ctas: 2, secondary: '', link: '', cover: '', ...cfg } });
const ESIM = (o = {}) => ({ type: 'esim', country: 'Japan', plan: '10 GB · 30 days', meta: 'Tier-1 · 5G', status: 'Ready', ...o });

export const TEMPLATES = [
  /* ── Purchase & checkout ───────────────────────────────────────── */
  T('paid-activate', 'Purchase & checkout', 'Payment successful — activate now?', {
    type: 'success', icon: 'receipt-check:draw', title: 'Payment successful',
    blocks: [{ type: 'p', text: 'Your Japan eSIM is ready. Activate it now, or keep it for later — the 30 days only start when it first connects abroad.' },
      ESIM({ status: 'Not activated' }),
      { type: 'kv', text: 'Paid | $17.00\nOrder | #OL-482915' }],
    primary: 'Activate now', secondary: 'Later', link: 'Receipt sent to p•••@openline.com' }),
  T('code-redeemed', 'Purchase & checkout', 'Purchase code redeemed', {
    type: 'success', icon: 'gift:pop', title: 'Code accepted',
    blocks: [{ type: 'p', text: 'Your code unlocked **Europe · 20 GB · 30 days**. Would you like to activate it now or later?' },
      ESIM({ country: 'Europe', plan: '20 GB · 30 days', meta: '35+ countries', status: 'Not activated' }),
      { type: 'note', text: 'Activating later? Find it any time under My eSIMs.' }],
    primary: 'Activate now', secondary: 'Activate later' }),
  T('confirm-purchase', 'Purchase & checkout', 'Confirm purchase', {
    type: 'confirm', icon: 'cart:pop', title: 'Confirm your order',
    blocks: [ESIM({ status: 'In your cart' }),
      { type: 'kv', text: 'Plan | $17.00\nTaxes | $0.00\n**Total** | **$17.00**' },
      { type: 'note', text: 'Charged to Visa •••• 4242' }],
    primary: 'Pay $17.00', secondary: 'Back' }),
  T('pay-failed', 'Purchase & checkout', 'Payment failed', {
    type: 'error', icon: 'card:pulse', title: 'Payment didn’t go through',
    blocks: [{ type: 'p', text: 'Your bank declined the charge. No money was taken.' },
      { type: 'list', text: 'Check the card number and expiry date\nTry another card, Apple Pay or Google Pay\nContact your bank if it keeps happening' }],
    primary: 'Try again', secondary: 'Use another method' }),
  T('pay-processing', 'Purchase & checkout', 'Payment processing', {
    type: 'info', icon: 'loader:pop', title: 'Confirming your payment…',
    blocks: [{ type: 'progress', label: 'Talking to your bank', value: 65, text: 'A few seconds' },
      { type: 'p', text: 'Keep this window open. Your eSIM appears the moment the payment is confirmed.' }],
    ctas: 0 }),
  T('3ds', 'Purchase & checkout', 'Bank verification (3-D Secure)', {
    type: 'security', icon: 'shield-check:draw', title: 'Your bank needs to confirm it’s you',
    blocks: [{ type: 'p', text: 'You’ll see a prompt from your bank app or a code by SMS. This keeps your card safe — Openline never sees it.' }],
    primary: 'Continue to my bank', secondary: 'Cancel' }),
  T('promo-applied', 'Purchase & checkout', 'Promo code applied', {
    type: 'discount', icon: 'percent:pop', title: 'Code applied — you save $3.40',
    blocks: [{ type: 'kv', text: 'Japan · 10 GB | ~~$17.00~~ $13.60\nCode | TRIP20 · 20% off' }],
    ctas: 1, primary: 'Continue to payment' }),
  T('promo-invalid', 'Purchase & checkout', 'Promo code not valid', {
    type: 'warning', icon: 'tag:pulse', title: 'That code didn’t work',
    blocks: [{ type: 'p', text: '**SUMMER10** has expired or isn’t valid for this plan.' },
      { type: 'input', label: 'Try another code', text: 'CODE' }],
    primary: 'Apply', secondary: 'Continue without' }),
  T('compat-check', 'Purchase & checkout', 'Is my phone eSIM-ready?', {
    type: 'info', icon: 'phone-check:draw', title: 'Check your phone first',
    blocks: [{ type: 'p', text: 'eSIM works on most phones from 2019 onwards, as long as they’re carrier-unlocked.' },
      { type: 'steps', text: 'Dial *#06#\nLook for a line called EID\nSeen it? Your phone supports eSIM' }],
    primary: 'My phone is ready', secondary: 'Check my model', link: 'Full list of 9,000+ compatible devices' }),
  T('not-compatible', 'Purchase & checkout', 'Device not compatible', {
    type: 'error', icon: 'phone-x:pop', title: 'This phone doesn’t support eSIM',
    blocks: [{ type: 'p', text: 'We couldn’t find an eSIM chip on this device, so we’ve stopped you before paying.' },
      { type: 'highlight', title: 'Buying for another phone?', text: 'You can still buy here and install it on a compatible phone with the QR code.' }],
    primary: 'Buy for another phone', secondary: 'Close' }),
  T('coverage-gap', 'Purchase & checkout', 'Plan misses a country', {
    type: 'warning', icon: 'map:pulse', title: 'Turkey isn’t in this plan',
    blocks: [{ type: 'p', text: 'Your trip includes Turkey, but **Europe · 20 GB** doesn’t cover it.' },
      { type: 'choice', text: 'Europe + Turkey · 20 GB | Covers every stop | $24.00\nKeep Europe · 20 GB | Add Turkey later | $19.00', value: 0 }],
    primary: 'Switch plan', secondary: 'Keep my plan' }),

  /* ── Activation & install ──────────────────────────────────────── */
  T('activate', 'Activation & install', 'Activate your eSIM', {
    type: 'confirm', icon: 'power:pop', title: 'Activate your Japan eSIM?', cover: 'illus:activation',
    blocks: [{ type: 'p', text: 'Your 30 days start when the eSIM first connects in Japan — activating now just gets it ready.' },
      { type: 'toggle', label: 'Set as my data line abroad', text: 'Recommended', on: true }],
    primary: 'Activate', secondary: 'Not yet' }),
  T('activating', 'Activation & install', 'Activating…', {
    type: 'info', icon: 'esim:draw', title: 'Activating your eSIM',
    blocks: [{ type: 'progress', label: 'Adding the profile', value: 72, text: 'About 20 seconds' },
      { type: 'steps', text: 'Profile downloaded\nInstalling on this phone\nConnecting to the strongest Tier-1 network' }],
    ctas: 0, link: 'Keep the app open' }),
  T('activated', 'Activation & install', 'eSIM activated', {
    type: 'success', icon: 'esim-check:draw', title: 'Your eSIM is active', cover: 'illus:arrival',
    blocks: [ESIM({ status: 'Active' }),
      { type: 'p', text: 'You’re on the strongest network nearby. Openline will keep switching for you — nothing to do.' }],
    primary: 'View eSIM details', secondary: 'Done' }),
  T('scan-qr', 'Activation & install', 'Scan to install', {
    type: 'info', icon: 'scan:pulse', title: 'Scan with the phone you’re travelling with',
    blocks: [{ type: 'qr', label: 'Japan · 10 GB', text: 'Settings › Mobile Data › Add eSIM › Use QR code' },
      { type: 'note', text: 'Each QR code installs once. Don’t delete the eSIM after installing.' }],
    primary: 'Done, it’s installed', secondary: 'Install manually' }),
  T('one-tap', 'Activation & install', 'One-tap install (iPhone)', {
    type: 'info', icon: 'phone-check:pop', title: 'Install on this iPhone',
    blocks: [{ type: 'p', text: 'Tap below and iOS will add the eSIM for you — no QR code needed.' },
      { type: 'steps', text: 'Tap Install eSIM\nConfirm in the iOS sheet\nLabel it “Openline” when asked' }],
    ctas: 1, primary: 'Install eSIM', link: 'Installing on another phone? Show the QR code' }),
  T('manual', 'Activation & install', 'Install manually', {
    type: 'info', icon: 'settings:draw', title: 'Enter the details manually',
    blocks: [{ type: 'p', text: 'Use these if you can’t scan the QR code.' },
      { type: 'code', label: 'SM-DP+ address', text: 'smdp.openline.io' },
      { type: 'code', label: 'Activation code', text: 'K2-4F9A-7QX1' }],
    ctas: 1, primary: 'Done', link: 'Step-by-step guide' }),
  T('install-failed', 'Activation & install', 'Installation failed', {
    type: 'error', icon: 'esim-x:pop', title: 'The eSIM couldn’t be installed',
    blocks: [{ type: 'p', text: 'This usually fixes itself with one of these:' },
      { type: 'list', text: 'Connect to Wi-Fi and try again\nRestart the phone, then retry\nMake sure the phone is carrier-unlocked' }],
    primary: 'Try again', secondary: 'Chat with support' }),
  T('used-elsewhere', 'Activation & install', 'Already installed elsewhere', {
    type: 'warning', icon: 'phone-swap:pulse', title: 'This eSIM is on another phone',
    blocks: [{ type: 'p', text: 'It was installed on **iPhone 15 Pro** on 2 Oct. An eSIM can live on one phone at a time.' }],
    primary: 'Move it to this phone', secondary: 'Cancel' }),
  T('roaming', 'Activation & install', 'Turn on data roaming', {
    type: 'info', icon: 'antenna:pulse', title: 'Leave Data Roaming on',
    blocks: [{ type: 'p', text: 'Openline switches networks for you abroad, so Data Roaming must be on — for this eSIM only. It never touches your main line.' },
      { type: 'note', text: 'Settings › Mobile Data › Openline › Data Roaming' }],
    ctas: 1, primary: 'Got it' }),
  T('data-line', 'Activation & install', 'Set as data line', {
    type: 'info', icon: 'signal:pop', title: 'Use Openline for mobile data',
    blocks: [{ type: 'steps', text: 'Open Settings › Mobile Data\nChoose Openline under Mobile Data\nKeep your main line for calls and SMS' },
      { type: 'toggle', label: 'Allow switching between lines', text: 'Turn off to avoid roaming charges', on: false }],
    ctas: 1, primary: 'Open Settings' }),
  T('scheduled', 'Activation & install', 'Activation on arrival', {
    type: 'success', icon: 'calendar-check:draw', title: 'Set to start when you land',
    blocks: [{ type: 'p', text: 'Your eSIM is installed and waiting. It switches on the first time it connects in **Japan**.' },
      { type: 'kv', text: 'Flight | LIS → HND\nLands | 4 Oct · 07:40' }],
    ctas: 1, primary: 'Great', link: 'Change destination' }),
  T('waiting-network', 'Activation & install', 'Waiting for a network', {
    type: 'info', icon: 'antenna:pulse', title: 'Looking for a network…',
    blocks: [{ type: 'p', text: 'Your eSIM is ready but hasn’t found a signal yet. This can take a minute after landing.' },
      { type: 'list', text: 'Turn Airplane Mode off\nCheck Data Roaming is on\nToggle the line off and on again' }],
    primary: 'Retry', secondary: 'Chat with support' }),

  /* ── Manage eSIM ───────────────────────────────────────────────── */
  T('details', 'Manage eSIM', 'View eSIM details', {
    type: 'info', icon: 'esim:pop', title: 'Japan eSIM',
    blocks: [ESIM({ status: 'Active' }),
      { type: 'progress', label: 'Data left', value: 58, text: '5.8 GB of 10 GB' },
      { type: 'kv', text: 'Expires | 2 Nov · 23:59\nNetwork | Best available Tier-1\nICCID | 8988 2471 0000 1234 567' }],
    primary: 'Top up', secondary: 'Close', link: 'Installation details' }),
  T('rename', 'Manage eSIM', 'Rename eSIM', {
    type: 'confirm', icon: 'esim:draw', title: 'Rename this eSIM',
    blocks: [{ type: 'input', label: 'Name', text: 'Tokyo trip' }, { type: 'note', text: 'Only you see this name.' }],
    primary: 'Save', secondary: 'Cancel' }),
  T('delete', 'Manage eSIM', 'Delete eSIM?', {
    type: 'error', icon: 'trash:pop', title: 'Delete this eSIM?',
    blocks: [{ type: 'p', text: 'Japan 10 GB will be removed from this phone. Unused data can’t be moved to another device.' },
      { type: 'highlight', title: 'This can’t be undone', text: 'You’ll need a new QR code to install it again.' }],
    primary: 'Delete eSIM', secondary: 'Cancel' }),
  T('deleted', 'Manage eSIM', 'eSIM deleted', {
    type: 'success', icon: 'check-circle:draw', title: 'eSIM removed',
    blocks: [{ type: 'p', text: 'It’s gone from this phone and from your account.' }],
    ctas: 1, primary: 'Done' }),
  T('transfer', 'Manage eSIM', 'Move to a new phone', {
    type: 'confirm', icon: 'phone-swap:draw', title: 'Move your eSIM to a new phone', cover: 'illus:transfer',
    blocks: [{ type: 'steps', text: 'Keep both phones nearby and online\nWe’ll send a fresh QR code to install\nThe old phone stops working when the new one connects' },
      { type: 'note', text: 'Your remaining 5.8 GB moves with it.' }],
    primary: 'Get new QR code', secondary: 'Cancel' }),
  T('expiring', 'Manage eSIM', 'Plan expiring soon', {
    type: 'warning', icon: 'hourglass:pulse', title: 'Your plan ends in 2 days',
    blocks: [{ type: 'p', text: 'Japan · 10 GB expires on **4 Oct at 23:59**. Extend it and keep the same eSIM.' },
      { type: 'choice', text: '+7 days · 3 GB | Short extension | $6.00\n+30 days · 10 GB | Same as now | $17.00', value: 1 }],
    primary: 'Extend plan', secondary: 'Let it expire' }),
  T('expired', 'Manage eSIM', 'Plan expired', {
    type: 'error', icon: 'clock:pulse', title: 'Your Japan plan has ended',
    blocks: [{ type: 'p', text: 'The eSIM is still on your phone — add a new plan to it and you’re back online in seconds.' }],
    primary: 'Add a plan', secondary: 'Remove eSIM' }),
  T('manual-network', 'Manage eSIM', 'Pick a network manually?', {
    type: 'confirm', icon: 'antenna:pop', title: 'Choose a network yourself?',
    blocks: [{ type: 'p', text: 'Openline normally picks the strongest network for you. Choosing one manually turns that off until you switch it back.' },
      { type: 'choice', text: 'Automatic | Recommended — always the strongest |\nNTT Docomo | Tier-1 · 5G |\nSoftBank | Tier-1 · 5G |', value: 0 }],
    primary: 'Save', secondary: 'Cancel' }),
  T('auto-renew', 'Manage eSIM', 'Turn on auto-renew?', {
    type: 'confirm', icon: 'repeat:pop', title: 'Never run out mid-trip',
    blocks: [{ type: 'p', text: 'We’ll renew Japan · 10 GB when it ends or runs out. You can turn it off any time.' },
      { type: 'toggle', label: 'Auto-renew', text: '$17.00 each time · Visa •••• 4242', on: true }],
    primary: 'Turn on', secondary: 'Not now' }),

  /* ── Data & top-up ─────────────────────────────────────────────── */
  T('low', 'Data & top-up', 'Data running low', {
    type: 'warning', icon: 'battery:pulse', title: 'You’ve used 92% of your data',
    blocks: [{ type: 'progress', label: 'Data used', value: 92, text: '9.2 GB of 10 GB' },
      { type: 'p', text: 'At this rate you’ll run out tomorrow afternoon. Top up now and keep the same eSIM — nothing to reinstall.' }],
    primary: 'Top up 5 GB', secondary: 'Remind me later' }),
  T('out', 'Data & top-up', 'Out of data', {
    type: 'error', icon: 'gauge:pulse', title: 'You’re out of data',
    blocks: [{ type: 'p', text: 'Top up and you’re back online straight away — same eSIM, nothing to install.' },
      { type: 'choice', text: '1 GB | For the next day | $3.00\n5 GB | Most popular | $9.00\n10 GB | Rest of the trip | $15.00', value: 1 }],
    primary: 'Top up', secondary: 'Later' }),
  T('topup', 'Data & top-up', 'Choose a top-up', {
    type: 'confirm', icon: 'topup:pop', title: 'Add data to Japan eSIM',
    blocks: [{ type: 'choice', text: '1 GB | 7 days | $3.00\n5 GB | 30 days | $9.00\n10 GB | 30 days | $15.00\nUnlimited | 7 days | $19.00', value: 1 }],
    primary: 'Add 5 GB · $9.00', secondary: 'Cancel' }),
  T('topup-ok', 'Data & top-up', 'Top-up successful', {
    type: 'success', icon: 'topup:draw', title: '5 GB added',
    blocks: [{ type: 'progress', label: 'Data left', value: 72, text: '10.8 GB' }, { type: 'p', text: 'It’s live already — no restart needed.' }],
    ctas: 1, primary: 'Back online' }),
  T('usage', 'Data & top-up', 'Data usage summary', {
    type: 'info', icon: 'gauge:draw', title: 'This week on Openline', cover: 'illus:usage',
    blocks: [{ type: 'kv', text: 'Used | 8.4 GB\nBusiest day | Tue · 2.1 GB\nNetworks used | 3 · 0 drops' }],
    ctas: 1, primary: 'Close', link: 'See app-by-app usage' }),
  T('refund-unused', 'Data & top-up', 'Unused data refund', {
    type: 'info', icon: 'refund:pop', title: 'You can get a refund',
    blocks: [{ type: 'p', text: 'This eSIM hasn’t been activated yet, so you’re entitled to a full refund.' },
      { type: 'kv', text: 'Refund | $17.00\nTo | Visa •••• 4242\nArrives | 3–5 business days' }],
    primary: 'Request refund', secondary: 'Keep my eSIM' }),
  T('speed', 'Data & top-up', 'Full speed, always', {
    type: 'success', icon: 'speed:pop', title: 'No slowdowns on this plan',
    blocks: [{ type: 'p', text: 'You’ve used 9 GB and you’re still at full speed. Openline never throttles after a fair-use cap.' }],
    ctas: 1, primary: 'Nice' }),

  /* ── Account & security ────────────────────────────────────────── */
  T('welcome', 'Account & security', 'Welcome to Openline', {
    type: 'success', icon: 'globe:draw', title: 'Welcome to Openline', cover: 'illus:globe',
    blocks: [{ type: 'p', text: 'One eSIM, 190+ countries, the strongest Tier-1 network wherever you land.' },
      { type: 'steps', text: 'Check your phone supports eSIM\nPick your destination\nInstall in under 2 minutes' }],
    ctas: 1, primary: 'Find a plan' }),
  T('verify-email', 'Account & security', 'Verify your email', {
    type: 'security', icon: 'mail:draw', title: 'Check your inbox',
    blocks: [{ type: 'p', text: 'We sent a 6-digit code to p•••@openline.com. It expires in 10 minutes.' },
      { type: 'input', label: 'Verification code', text: '000 000' }],
    primary: 'Verify', secondary: 'Resend code' }),
  T('verify', 'Account & security', 'Verify it’s you', {
    type: 'security', icon: 'fingerprint:draw', title: 'Verify it’s you',
    blocks: [{ type: 'p', text: 'For your security, confirm it’s you before changing payment details.' },
      { type: 'input', label: 'Code from your authenticator', text: '000 000' }],
    primary: 'Confirm', secondary: 'Use another method' }),
  T('new-device', 'Account & security', 'New sign-in', {
    type: 'security', icon: 'user-check:pulse', title: 'New sign-in to your account',
    blocks: [{ type: 'kv', text: 'Device | Chrome on Mac\nPlace | Lisbon, Portugal\nWhen | Just now' }, { type: 'p', text: 'Was this you?' }],
    primary: 'Yes, it was me', secondary: 'No, secure my account' }),
  T('password', 'Account & security', 'Password changed', {
    type: 'success', icon: 'key:draw', title: 'Password updated',
    blocks: [{ type: 'p', text: 'You’ve been signed out everywhere else. Your eSIMs keep working.' }], ctas: 1, primary: 'Done' }),
  T('logout-all', 'Account & security', 'Sign out everywhere?', {
    type: 'confirm', icon: 'logout:pop', title: 'Sign out of all devices?',
    blocks: [{ type: 'p', text: 'You’ll need to sign in again on every device. Installed eSIMs keep working.' }],
    primary: 'Sign out everywhere', secondary: 'Cancel' }),
  T('delete-account', 'Account & security', 'Delete account?', {
    type: 'error', icon: 'user:pulse', title: 'Delete your Openline account?',
    blocks: [{ type: 'p', text: 'This removes your order history, saved cards and any unused data.' },
      { type: 'highlight', title: '2 eSIMs still have data', text: 'Japan 5.8 GB and Europe 20 GB will stop working.' },
      { type: 'input', label: 'Type DELETE to confirm', text: 'DELETE' }],
    primary: 'Delete account', secondary: 'Keep my account' }),
  T('card-expiring', 'Account & security', 'Card expiring', {
    type: 'warning', icon: 'card-check:pulse', title: 'Your card expires this month',
    blocks: [{ type: 'p', text: 'Visa •••• 4242 is used for auto-renew. Update it so your plan doesn’t lapse mid-trip.' }],
    primary: 'Update card', secondary: 'Remind me later' }),
  T('anon', 'Account & security', 'Buy without ID', {
    type: 'security', icon: 'eye-off:draw', title: 'No ID needed',
    blocks: [{ type: 'p', text: 'Openline doesn’t ask for a passport or selfie for data plans. We only keep what’s needed to deliver your eSIM.' },
      { type: 'list', text: 'Email for your QR code\nPayment handled by Stripe — we never see your card\nDelete your data any time' }],
    ctas: 1, primary: 'Continue' }),

  /* ── Openline+ & rewards ───────────────────────────────────────── */
  T('plus', 'Openline+ & rewards', 'Welcome to Openline+', {
    type: 'premium', icon: 'crown:pop', title: 'Welcome to Openline+',
    blocks: [{ type: 'p', text: 'Your membership is active. Here’s what just switched on:' },
      { type: 'list', text: 'Airport lounge and fast-track access\nA permanent number that travels with you\nPriority support, day and night' }],
    ctas: 1, primary: 'Explore my perks' }),
  T('lounge', 'Openline+ & rewards', 'Lounge pass ready', {
    type: 'premium', icon: 'lounge:pop', title: 'Your lounge pass is ready', cover: 'illus:boarding',
    blocks: [{ type: 'kv', text: 'Airport | Lisbon (LIS)\nLounge | ANA Lounge · Terminal 1\nValid | Today · 1 guest' }],
    primary: 'Show pass', secondary: 'Add to Wallet' }),
  T('upgrade-plus', 'Openline+ & rewards', 'Upgrade to Openline+', {
    type: 'premium', icon: 'sparkles:pop', title: 'Travel like it’s included',
    blocks: [{ type: 'choice', text: 'Monthly | Cancel any time | $14.99\nYearly | 2 months free | $149.00', value: 1 },
      { type: 'list', text: 'Global data in every plan\nLounge access\nPermanent number' }],
    primary: 'Start Openline+', secondary: 'Not now' }),
  T('referral', 'Openline+ & rewards', 'Referral reward', {
    type: 'discount', icon: 'gift:pop', title: 'You earned $5', cover: 'illus:gift',
    blocks: [{ type: 'p', text: '**Ana** just bought her first eSIM with your link. Your $5 credit is on your account.' }],
    primary: 'Use my credit', secondary: 'Invite more friends' }),
  T('invite', 'Openline+ & rewards', 'Invite a friend', {
    type: 'discount', icon: 'user-plus:pop', title: 'Give $5, get $5',
    blocks: [{ type: 'p', text: 'Share your code. Your friend saves $5 on their first eSIM, and you get $5 when they buy.' },
      { type: 'code', label: 'Your code', text: 'PAUL5' }],
    primary: 'Share link', secondary: 'Close' }),
  T('promo', 'Openline+ & rewards', '20% off next trip', {
    type: 'discount', icon: 'percent:pop', title: '20% off your next trip',
    blocks: [{ type: 'p', text: 'Thanks for travelling with us. Use this code on any plan in the next 7 days.' },
      { type: 'code', label: 'Your code', text: 'TRIP20' },
      { type: 'kv', text: 'Plans from | $3.19\nValid until | 9 October' }],
    primary: 'Browse plans', secondary: 'Not now' }),

  /* ── Travel & support ──────────────────────────────────────────── */
  T('arrived', 'Travel & support', 'Welcome to Japan', {
    type: 'success', icon: 'plane-land:pop', title: 'Welcome to Japan', cover: 'illus:arrival',
    blocks: [{ type: 'p', text: 'You’re connected to **NTT Docomo · 5G**. Your 30 days started just now.' },
      { type: 'kv', text: 'Data | 10 GB\nEnds | 2 Nov · 23:59' }],
    ctas: 1, primary: 'Enjoy the trip' }),
  T('trip-next', 'Travel & support', 'Crossing a border', {
    type: 'info', icon: 'route:draw', title: 'Heading to Korea next?',
    blocks: [{ type: 'p', text: 'Your Japan plan doesn’t cover South Korea. Add it now and it switches on when you land.' },
      { type: 'choice', text: 'South Korea · 5 GB | 15 days | $11.00\nAsia · 10 GB | 13 countries | $24.00', value: 0 }],
    primary: 'Add plan', secondary: 'Not now' }),
  T('chat', 'Travel & support', 'Chat with support', {
    type: 'info', icon: 'chat:pulse', title: 'We’re here — right now',
    blocks: [{ type: 'kv', text: 'Agents online | 3\nTypical reply | Under 2 minutes' },
      { type: 'note', text: 'We’ll attach your eSIM details so you don’t have to explain twice.' }],
    primary: 'Start chat', secondary: 'Browse help articles' }),
  T('refunded', 'Travel & support', 'Refund issued', {
    type: 'success', icon: 'refund:draw', title: 'Refund on its way',
    blocks: [{ type: 'kv', text: 'Amount | $17.00\nTo | Visa •••• 4242\nArrives | 3–5 business days' }], ctas: 1, primary: 'Done' }),
  T('rate', 'Travel & support', 'Rate your connection', {
    type: 'confirm', icon: 'star:pop', title: 'How was your connection in Japan?',
    blocks: [{ type: 'rating', value: 5 }, { type: 'input', label: 'Anything we should know? (optional)', text: 'Tell us more' }],
    primary: 'Send', secondary: 'Skip' }),
  T('maintenance', 'Travel & support', 'Service notice', {
    type: 'warning', icon: 'alert:pulse', title: 'Brief network maintenance',
    blocks: [{ type: 'p', text: 'One partner network in Thailand is down for maintenance tonight. Openline will keep you on another Tier-1 network automatically.' },
      { type: 'kv', text: 'When | Tonight · 01:00–03:00 ICT\nAction needed | None' }],
    ctas: 1, primary: 'Got it' }),
];
