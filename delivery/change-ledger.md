# Openline full change ledger

Release 2026-10-06-r2. Historical records retain rejected/superseded labels; do not implement them. Additional Irina tasks are requests, not completed QA changes.

## Delivery: interactive implementation checklist and introduction

- **ID:** `delivery-checklist`
- **Disposition:** Current · Handoff tooling / not a customer-site component
- **Scope:** delivery
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/delivery#checklist)

Added a short introduction from Paul and a detailed applied/verified checklist for selected animations, current block and interaction changes, deduplicated wording, page/flow sign-offs, additional requests and final acceptance.

Track progress item by item; blocked work remains incomplete. Progress is encoded in the URL fragment, with a copyable progress link, JSON backup/import and Markdown report. It is not a shared server tracker or automatic approval. Rejected/superseded versions are excluded and conditional alternatives are decision checks. Paul explicitly expects the whole retained handoff implemented, with extra design initiative for panel, cart/checkout and mobile app because he took over the animation exploration/refinement. Private compensation details remain outside the public site.

Files: `delivery/index.html`, `delivery/checklist.js`, `delivery/checklist.css`, `delivery/checklist-data.json`, `delivery/checklist-guide.md`

## Delivery: frozen implementation handoff for Irina

- **ID:** `delivery-release`
- **Disposition:** Current · Delivery authorized / production integration pending
- **Scope:** *
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/delivery)

The delivery pack freezes the 30 submitted choices, 22 contextual page entries and four extra tools, with the gift-recipient entry, portable animation previews, source files, exact wording changes and implementation instructions.

The saved Comet decisions were checked on 6 October: no newer QA overrides, global theme original, page identities enabled by default. Blog Topic Picker is the current contextual default; The Long Read remains a retained alternative for the same slot. Openline+ KYC stays current. Reject the removed 16-page batch and full France redesign. This authorizes documentation and handoff, not production backend claims. Public technical pack excludes the private commercial cover note.

## Irina task: Mobile app label and top-right Revisions

- **ID:** `delivery-general-badges`
- **Disposition:** Irina task · Requested / Irina to implement
- **Scope:** *
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/delivery#requests)

Rename the floating Openline Mobile entry to Mobile app. Move the Revisions badge to the top right, with safe spacing from header controls and mobile safe areas.

Reference https://snap.paulfleury.com/gF4BQJty. Preserve existing actions and keyboard access. Check desktop/mobile overlap, sticky header, menu and chat. This is an additional production/staging task, not an already implemented change across QA captures.

## Irina task: one compact certification trigger

- **ID:** `delivery-certification-badge`
- **Disposition:** Irina task · Requested / content evidence required
- **Scope:** *
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/delivery#requests)

Replace the row of separate certification labels with one shield-icon badge reading GDPR · SOC2 ···, opening the existing certification modal.

Reference https://snap.paulfleury.com/hgg5y4Gk. One accessible button, sensible hit area, Escape/close/focus return. Keep evidence and explanations in the modal; do not interpret this design request as verification of certifications.

## Irina task: restore the three original How it works illustrations

- **ID:** `delivery-home-original-three`
- **Disposition:** Irina task · Requested / original source version to confirm
- **Scope:** home
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/delivery#requests)

Restore the last approved original illustrations under How does Openline work? for Choose your destination, Buy an eSIM in seconds and Scan & connect. Keep the selected Why Openline and Referral replacements.

Marked section: https://snap.paulfleury.com/WFyHY3dq. Retain good Multiple Tier-1 and related illustrations: https://snap.paulfleury.com/sYy1sv34. Screenshot identifies scope, not the historical source commit; Irina should recover the approved source or confirm it with Paul. Do not replace these three with newly invented artwork.

Files: `js/home-why.js`, `js/referral.js`

## Irina task: web panel, cart/checkout and mobile app flow coverage

- **ID:** `delivery-app-panel-polish`
- **Disposition:** Irina task · Additional design work / not built in this pack
- **Scope:** *
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/delivery#requests)

Paul expects all retained work integrated and additional design initiative in the web panel, cart/checkout and mobile app in return for taking over animation exploration/refinement. Supply Kerem with ready-to-build cart, payment, purchase-code, activation, gifting, eSIM details, setup and account-management states.

Include loading, empty, failure, retry, pending validation and success; annotate backend dependencies instead of presenting them as completed. First progress update Thursday 8 October; full report by Friday 9 October 2026 around 13:00 Europe/Lisbon. Report completion, blockers and estimates; this is not an assertion that all integrations can finish in 72 hours.

## Openline typography everywhere

- **ID:** `native-typography`
- **Disposition:** Current · Implemented in QA
- **Scope:** *
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa)

One native Openline UI font stack across captured pages, retained redesigns, animations, navigation, chat, help and modal tools.

Play is reserved for the wordmark; monospace remains only for genuine code and technical fields. Original review-board typography is unchanged.

## Animation fit and background coherence

- **ID:** `context-fit`
- **Disposition:** Current · Implemented in QA
- **Scope:** *
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa)

Animations are evaluated inside measured page slots, with responsive sizing, background clearing and panel warnings for remaining aspect-ratio mismatches.

Retain the chosen animation concepts. A panel fit warning is an unresolved review item, not an automatic production approval.

## Quick page dropdown

- **ID:** `page-browser`
- **Disposition:** Current · Implemented in QA
- **Scope:** *
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa)

The bottom page label opens a searchable, keyboard-accessible menu for 22 page entries plus four extra tools.

18 original pages, the retained About / Contact alternatives, Product Hunt and the original-template France refinement. The rejected 16-page alternative batch and the rejected France selector redesign must not be delivered.

## Product Hunt redesign added to QA

- **ID:** `producthunt-qa`
- **Disposition:** Retained / review · Campaign draft / interactive prototype
- **Scope:** producthunt
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/producthunt)

The existing /producthunt redesign is available as the 21st QA page, preserving Kitty, the two reward lanes, four-rung ladder, steps, eligibility table, claim area and fine print. It has the shared page menu, review panel, page notes, theme controls, export and support tools.

Original /producthunt files remain unchanged. The QA adapter uses the official Openline mark, shared native typography and subtle arrow motion. Launch date remains to be confirmed. Technical boundary: only local format validation runs, PH lane requires a producthunt.com host, no proof URL is fetched, no data is submitted or stored, and PH-QA codes cannot be redeemed. Customer-facing simulation banners and notices were removed at Paul’s request; the boundary is documented here instead. Working rows now describe link format, email format and code preparation, not verified external/account checks, and the result does not claim an email was sent. Closing cancels timers; native-dialog focus and clipboard failure are handled. Rewards, prices, launch timing and campaign rules still need approval before production.

Files: `qa/producthunt.js`, `qa/producthunt.css`, `qa/producthunt-page.css`, `qa/support/boot.js`

## Why Openline: context-sized artwork

- **ID:** `home-why-fit`
- **Disposition:** Current · Implemented in QA
- **Scope:** home
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/home)

Option 3 is fitted to the 407 × 302 home slot, with readable content and without the board wrapper competing with the page.

Use the actual slot geometry rather than stretching the nominal board canvas.

Files: `js/home-why.js`, `js/referral.js`

## Referral: one orange, a softer edge

- **ID:** `referral-fit`
- **Disposition:** Current · Implemented
- **Scope:** home
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/home)

Referral option 3 matches the original orange, fits its 576 × 520 slot and keeps the selected animation. Background plus signs fade smoothly from 0% on the left to full treatment on the right.

The shared option also fixes the original review board. Preserve its motion and transparent integration with the surrounding block.

Files: `js/home-why.js`, `js/referral.js`

## Page-specific colour treatments

- **ID:** `page-identities`
- **Disposition:** Retained / review · Review options
- **Scope:** network, security, adblocking, unlimited, blog
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa)

Network blue, Security teal, AdBlocking ultraviolet, Unlimited magenta and Blog newsprint are switchable within each page.

The export includes each identity’s current on/off state and the global theme. Do not treat these proposals as approved production defaults.

Files: `qa/core.js`, `qa/recolor.js`, `qa/paint.js`, `qa/connectivity-copy.json`, `qa/unlimited-plan-copy.json`, `qa/connectivity-changes.js`, `qa/redesign/profile-switching.html`, `qa/profile-switching.css`, `qa/blog.html`

## Global eSIM: consistent Openline orange

- **ID:** `global-esim-orange`
- **Disposition:** Current · Selected default
- **Scope:** global-esim
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/global-esim)

All section accents, tinted blocks, icon tiles and contextual animations now use the Openline orange family instead of the mixed blue, purple and green treatments.

Selected page identity, on by default and recorded in the export. Green accent/status treatments are recoloured on this page as requested; labels still carry their meaning. Neutral surfaces and raster images/partner logos are not repainted. Other page identities, including IoT Chrome, are unchanged.

Files: `qa/core.js`, `qa/recolor.js`, `qa/paint.js`

## New entry: network switch versus new eSIM profile

- **ID:** `profile-switching-explainer`
- **Disposition:** Current · Added in QA
- **Scope:** multiple-tier1, unlimited
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/multiple-tier1#profile-switching)

A new, prominent two-route explainer replaces the marked eSIM-switching warning and probability cards on Multi Tier-1, with a matching entry on Unlimited replacing the old competitor-throttling comparison. It distinguishes network selection within one profile from occasionally issuing an entirely new profile/provider setup.

The user-supplied operating principle is explicit on both pages: profile replacement should be uncommon, but can be part of maintaining service. Possible installation/activation and variable reconnection time are disclosed. The 90% / 10% split, fixed 30-second promise and instruction to remove the old profile first are gone. Diagrams are illustrative with reduced-motion support. No silent-install, zero-interruption, balance/validity carry-over or free-replacement guarantee is invented; these live-process details need product confirmation.

Files: `qa/connectivity-copy.json`, `qa/connectivity-changes.js`, `qa/redesign/profile-switching.html`, `qa/profile-switching.css`, `qa/redesign/operator-showcase.html`, `qa/operator-showcase.js`, `qa/operator-showcase.css`, `qa/operators.json`, `qa/assets/operators/README.md`, `qa/unlimited-plan-copy.json`

[Detailed scoped changelog](https://openline-anims-review.vercel.app/qa/connectivity-changelog.md)

### Multi Tier-1 entry

A better connection. More than one way. When a network switch is not enough, we can replace your eSIM and change the provider behind it.

### Unlimited entry (latest clarification)

Throttled too often? We’ll try another route. For recurring unlimited-plan throttling, Openline will try an alternative profile/infrastructure with a fair-use policy better suited to the customer’s location and usage. Improvement is not guaranteed.

### Profile setup disclosure

A replacement may require installing or enabling a new profile, with guidance if needed. On Unlimited, the latest disclosure also recommends fixed data for guaranteed no usage-based throttling.

## Multi Tier-1 and Unlimited: shorter copy, larger cards

- **ID:** `compact-profile-explainer`
- **Disposition:** Current · Current presentation / Irina handoff
- **Scope:** multiple-tier1, unlimited
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/unlimited#profile-switching)

The marked section now uses two equal cards with larger diagrams, 28px headings and 18px body text, replacing the dense multi-paragraph layout and tiny technical labels. One card explains a network change within the same eSIM; the other explains an entirely new profile/provider. Longer policy details are collapsed beneath.

Keep each page’s chosen colour identity and selected animations outside this block. Profile changes remain occasional and may require guided installation. The Unlimited page keeps its visible local-rules / no-guaranteed-improvement caveat and fixed-data recommendation. The unchanged fuller policy remains available in the disclosure and France fair-use modal. New Talk to support buttons open the shared chat. These are explanatory diagrams, not actual profile switching. No provisioning backend or commercial guarantee was added.

Files: `qa/connectivity-copy.json`, `qa/connectivity-changes.js`, `qa/redesign/profile-switching.html`, `qa/profile-switching.css`, `qa/redesign/operator-showcase.html`, `qa/operator-showcase.js`, `qa/operator-showcase.css`, `qa/operators.json`, `qa/assets/operators/README.md`, `qa/unlimited-plan-copy.json`

[Detailed scoped changelog](https://openline-anims-review.vercel.app/qa/connectivity-changelog.md)

### Multi Tier-1 introduction

When a network switch is not enough, we can replace your eSIM and change the provider behind it.

### Multi Tier-1 cards

Same eSIM. Another network. We use another network available to your current plan. Your eSIM stays the same. / New eSIM. Different provider. Sometimes we replace the whole profile to move your connection to a better-fitting provider.

### Multi Tier-1 short note

Profile changes are rare. If a new installation is needed, we’ll guide you.

### Unlimited introduction

If local fair-use rules keep slowing you down, we’ll try another eSIM from a different provider.

### Unlimited cards

Same eSIM. Another network. A network switch keeps your current eSIM. It does not necessarily change its fair-use rules. / New eSIM. Different provider. We’ll try a replacement profile with fair-use rules better suited to your location and usage.

### Unlimited short note

Local rules still apply. A better result is not guaranteed; choose fixed data to avoid usage-based throttling.

## Multi Tier-1: profile-aware wording throughout

- **ID:** `multi-tier1-profile-copy`
- **Disposition:** Current · Reworded in QA
- **Scope:** multiple-tier1
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/multiple-tier1)

Hero, infrastructure explanation, partner introductions, selection cards, market narrative, three-step process, access checklist and closing copy now explain the network/profile distinction without promising the strongest signal, cheapest price, millisecond handoffs or no setup in every situation.

Existing page structure and four selected animation choices remain. The selected Operator Roster phone labels now read Network options / Profile may change / Setup if needed; its geometry and motion are preserved. Original review-board files remain untouched. Other historical alternative illustrations are reference material, not newly approved product claims.

Files: `qa/connectivity-copy.json`, `qa/connectivity-changes.js`, `qa/redesign/profile-switching.html`, `qa/profile-switching.css`, `qa/redesign/operator-showcase.html`, `qa/operator-showcase.js`, `qa/operator-showcase.css`, `qa/operators.json`, `qa/assets/operators/README.md`

[Detailed scoped changelog](https://openline-anims-review.vercel.app/qa/connectivity-changelog.md)

### Hero badge

Before: AI-Powered Multi-Network

After: Adaptive Multi-Network

### Hero introduction

Before: Unlike competitors who lock you to a single provider, Openline uses AI to automatically switch between multiple premium Tier-1 networks - delivering both the best signal and lowest prices, always.

After: Openline is not tied to one underlying provider. We can adapt the networks available on your current eSIM or, when needed, issue another profile to move you to a different provider and connectivity setup. Profile replacement should be uncommon, but it is part of how we work to keep your service performing well.

### Infrastructure heading

Before: What is a Tier-1 Network?

After: The networks behind your connection

### Infrastructure explanation

Before: A Tier-1 network operator is a historic or national carrier that owns and operates the physical antenna infrastructure at ground level. Unlike resellers who just rent capacity, Tier-1 operators built and maintain the actual towers and antennas that provide mobile coverage.

After: Your connection relies on a mobile network, an underlying connectivity provider and the eSIM profile on your phone. Access to established operators gives us more options, while the ability to replace a profile lets us change the service setup behind it when that is the better route.

### Infrastructure card

Before: Historic Operators

After: Established Operators

### Infrastructure card

Before: National carriers who built the actual antennas and towers

After: Established mobile networks in the destinations we serve

### Infrastructure card

Before: Antenna Ownership

After: Network Infrastructure

### Infrastructure card

Before: Own and maintain physical network, not just resell

After: The radio network is one part of your connectivity setup

### Quality card

Before: Best signal, fastest speeds, most reliable

After: Service options chosen for local coverage and performance

### Coverage card

Before: Complete infrastructure in remote and urban areas

After: Coverage depends on your destination, device and available partners

### Why the network matters

Before: Tier-1 operators like Vodafone, T-Mobile, and Orange own the physical infrastructure, giving them direct control over signal quality, network capacity, and coverage. This means better speeds, stronger signals, and more reliable connections compared to virtual operators who only resell capacity.

After: A strong local network matters, but it is not the whole picture. If the provider or configuration behind a profile is no longer a good fit, changing the network alone may not be enough. We can issue a replacement eSIM to move the service to a different setup.

### Partner introduction

Before: Featured partners from our network of 200+ Tier-1 operators worldwide

After: Examples from our wider operator ecosystem. Available networks depend on your profile, plan and destination.

### Partner caption

Before: Featured operators from 200+ Tier-1 network partners with their own infrastructure

After: Carrier and connectivity-partner examples; availability varies by location and profile

### Regional introduction

Before: In addition to global Tier-1 operators, we partner with leading regional carriers to ensure exceptional coverage in every market

After: Global and regional partners give us different ways to deliver service. A replacement profile can open a different provider setup where your current profile is not the right fit.

### Regional selection heading

Before: AI Selects the Best Network Automatically

After: Network selection is only one part of the service

### Regional selection explanation

Before: Whether you're connecting through Vodafone in London, MTN in Johannesburg, du in Dubai, China Mobile in Shanghai, or giffgaff for value roaming - our AI continuously evaluates all available partners to ensure you always get the optimal combination of signal quality and pricing. You never need to manually choose or configure anything.

After: We look for a suitable service path among the options available to your plan and location. Usually that means using your current eSIM profile. Occasionally, a better option means issuing a new profile and changing the underlying provider. If installation or activation is needed on your phone, we will guide you through that step.

### Selection introduction

Before: Our advanced machine learning algorithms continuously analyze signal strength, network congestion, and real-time pricing data to automatically connect you to the optimal Tier-1 network every second.

After: Our selection approach considers connection quality, congestion and provider options. We can change networks within the current profile where supported, or replace the profile when a different underlying service setup is needed.

### Selection card

Before: Machine learning analyzes signal strength, congestion, and pricing in real-time.

After: Connection quality, congestion and pricing inform the service options we consider.

### Selection card

Before: Continuously monitor all networks and switch when better options appear.

After: Adapt to the network options available to your current profile, plan and location.

### Selection card

Before: Track wholesale prices to route you through the most cost-effective option.

After: Consider provider pricing alongside the quality and availability of the connection.

### Switching card heading

Before: Instant Switching

After: Profile Flexibility

### Switching card explanation

Before: Seamless transitions in milliseconds - you won't even notice when it happens.

After: When a network switch is not enough, we can issue another eSIM profile. A setup step or reconnection may be needed.

### Market introduction

Before: Mobile data operates like a stock market - prices fluctuate constantly based on demand, network capacity, and market conditions. Our proprietary OMDM™ (Openline Mobile Data Market) platform trades this market 24/7 with AI to secure the lowest wholesale prices and pass the savings directly to you.

After: Provider pricing and service conditions can change. OMDM™ (Openline Mobile Data Market) helps us compare the options behind your connection. If a more suitable option uses a different provider or profile configuration, we may issue a new eSIM rather than keep you on the same service setup.

### Market benefit

Before: Our AI continuously monitors these price fluctuations to purchase data at the lowest possible rates, 24/7.

After: Compare available provider offers alongside service quality, rather than choose on price alone.

### Market benefit

Before: We pass these wholesale savings directly to customers, ensuring you always get the cheapest prices.

After: Provider flexibility helps us balance value and usable service. It is not a guarantee of the cheapest price at every moment.

### Market benefit

Before: Our algorithms execute thousands of data purchases daily across different networks and regions to optimize pricing.

After: A service change can happen within your current profile or, occasionally, through a replacement profile on a different provider setup.

### How it works introduction

Before: Real-time optimization in three simple steps to ensure you always have the best connection.

After: Review the available options, choose a suitable service path, then adapt the network or the whole profile when needed.

### Monitor step

Before: Scan all available Tier-1 networks every second for signal strength and performance metrics.

After: Review connection conditions and the service options available to your plan and location.

### Analyze step

Before: AI evaluates signal quality, congestion levels, and wholesale pricing data in real-time.

After: Consider connection quality, congestion, provider options and pricing together.

### Adapt step heading

Before: Switch

After: Adapt

### Adapt step

Before: Automatically connect to the optimal network for best performance and lowest cost.

After: Use a suitable network on the existing profile, or issue a replacement eSIM to change the underlying provider and setup.

### Access introduction

Before: We partner with the world's leading mobile network operators to provide you with unmatched coverage, speed, and reliability across 190+ countries - all powered by AI.

After: Our partner ecosystem gives us several ways to deliver connectivity. Access depends on your plan, destination and eSIM profile; not every network is available on every profile. Where necessary, we can issue a new profile to move you to a different service setup.

### Access checklist

Before: Always connected to the strongest available signal

After: Choose among suitable, available network options

### Access checklist

Before: AI automatically selects best network every second

After: Consider service quality, availability and value

### Access checklist

Before: Access to 50+ premium Tier-1 network partners

After: Access varies across our 50+ Tier-1 partner ecosystem

### Access checklist

Before: Seamless handoffs between networks

After: Network changes within a supported profile

### Access checklist

Before: Lower prices through intelligent market analysis

After: Provider choices informed by market conditions

### Access checklist

Before: Better performance in congested areas

After: Alternative service paths when performance suffers

### Access checklist

Before: Reduced dead zones and coverage gaps

After: Profile replacement when a different setup is needed

### Access checklist

Before: No manual configuration ever needed

After: Guided installation if a new profile is required

### Closing headline

Before: Experience AI-Powered Connectivity

After: Connectivity that can adapt

### Closing introduction

Before: Join thousands of travelers who never worry about connectivity. Get access to multiple Tier-1 networks with AI-powered switching for the best signal and lowest prices.

After: Choose a plan backed by more than one service option. We can adapt the network where supported and occasionally replace the eSIM profile to move you to a better underlying setup.

### Closing badge

Before: Best signal always

After: Adapt to local conditions

### Closing badge

Before: Lowest prices

After: Quality and value

### Closing badge

Before: No manual switching

After: Profile changes may apply

## Multi Tier-1: rolling operator showcase

- **ID:** `multi-tier1-operator-ribbons`
- **Disposition:** Current · Implemented / Irina handoff
- **Scope:** multiple-tier1
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/multiple-tier1#operator-showcase)

Replaced the large static 36-logo wall with two seamless rows moving slowly in opposite directions, consistent logo sizing, readable names and soft edge fades. Pause motion and a searchable Browse operators dialog provide direct control and access to the full roster without waiting.

Retain the existing partner headline, availability wording, purchase CTA, 36 operator names and all chosen animation picks elsewhere. Brand colours are preserved. Motion pauses offscreen, in hidden tabs, on ribbon hover/focus, while the directory is open and when manually paused. Reduced motion uses static horizontally scrollable rows; original groups remain accessible and decorative loop copies are hidden/inert. Search handles accents, punctuation and Three/3; Escape/backdrop/close return focus to Browse operators. Logos are lightweight derived WebP assets. Corrected source mismatches only within this showcase: Three had repeated Vodafone, Telefónica had repeated Movistar, and SK Telecom displayed KT. Sources/derivatives are documented; the existing partnership claims and use permissions are not newly verified.

Files: `qa/connectivity-copy.json`, `qa/connectivity-changes.js`, `qa/redesign/profile-switching.html`, `qa/profile-switching.css`, `qa/redesign/operator-showcase.html`, `qa/operator-showcase.js`, `qa/operator-showcase.css`, `qa/operators.json`, `qa/assets/operators/README.md`

[Detailed scoped changelog](https://openline-anims-review.vercel.app/qa/operator-showcase-changelog.md)

## Unlimited: consolidated original-to-current copy

- **ID:** `unlimited-profile-copy`
- **Disposition:** Current · Current copy / latest clarification applied
- **Scope:** unlimited
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/unlimited)

The consolidated copy now distinguishes the fixed-package full-speed allowance guarantee from unlimited plans with no Openline-imposed cap or throttling, while local MNO fair-use rules can still apply. Hero, feature cards, use cases, checklist, illustration labels and closing copy are aligned.

Use these current After values rather than the earlier generic adaptive-service wording. Fixed means all purchased GB at full available network speed, without usage-based throttling; it does not promise a universal Mbps rate or congestion-free radio service. Unsupported competitor limits remain removed and customer-use rows stay neutral grey. Existing animation geometry and timing, page colour treatment and added elements are preserved. The separate latest-clarification record includes previous-to-current copy and the replacement section for Irina.

Files: `qa/connectivity-copy.json`, `qa/unlimited-plan-copy.json`, `qa/connectivity-changes.js`, `qa/redesign/profile-switching.html`, `qa/profile-switching.css`

[Detailed scoped changelog](https://openline-anims-review.vercel.app/qa/connectivity-changelog.md)

### Hero badge

Before: Truly Unlimited

After: No Throttling from Openline

### Hero heading

Before: Unlimited Speed,No Limits

After: Your data. Full speed. Our promise, explained.

### Hero introduction

Before: No throttling. No fair usage policy. No hidden limits. When we say unlimited, we mean it. Use your full data allocation at full speed, always.

After: Buy 10 GB and get all 10 GB at full speed, guaranteed, with no usage-based throttling. Openline adds no data cap or throttling to unlimited plans either, but the local mobile operator’s fair-use rules can still reduce their speed after heavy use.

### Meaning heading

Before: What Unlimited Really Means

After: One promise. Two types of plan.

### Meaning introduction

Before: While other providers use "unlimited" as a marketing term, Openline delivers genuinely unlimited data at full speed with zero throttling or hidden restrictions.

After: On a fixed-data package, your entire purchased allowance is guaranteed at full available network speed, without usage-based throttling. On an unlimited plan, Openline imposes no data cap or throttling, but local operator fair-use rules still apply. Full speed means the speed the network can deliver: signal, congestion and your device can affect it.

### Feature heading

Before: No Speed Throttling

After: 10 GB means all 10 GB

### Feature copy

Before: Full speed from the first byte to the last. Your connection never slows down, no matter how much you use.

After: Buy a 10 GB package and every GB is available at full speed. We guarantee no usage-based throttling anywhere within your purchased allowance.

### Feature heading

Before: No Fair Usage Policy

After: Unlimited on our side

### Feature copy

Before: Truly unlimited means unlimited. Use your full data allocation without any hidden restrictions.

After: For unlimited plans, we guarantee that Openline adds no data cap or usage-based speed restriction. The local mobile network operator’s rules are a separate matter.

### Feature heading

Before: 4K Streaming Ready

After: Local network fair use

### Feature copy

Before: Stream in the highest quality without buffering. Perfect for Netflix, YouTube, and video calls.

After: On unlimited plans, using a lot of data quickly within 24 hours may trigger a local MNO fair-use policy and temporarily reduce your speed. Thresholds and recovery times vary by network and plan.

### Feature heading

Before: Consistent Performance

After: Want no throttling? Go fixed.

### Feature copy

Before: Same high speed whether you're the first user or the millionth. No congestion, no slowdowns.

After: Choose a fixed-data package if avoiding usage-based slowdowns is your priority. This is where we can guarantee your full purchased allowance at full available network speed.

### Usage introduction

Before: See how Openline handles common use cases versus competitors

After: Streaming, downloads and backups can use a lot of data quickly. For guaranteed no-throttling access to your purchased allowance, choose a fixed package. Unlimited plans offer no Openline data cap, with local operator fair use still applying.

### Usage-card label

Before: Others

After: Your use

### Video example

Before: Throttled to 480p after 5GB

After: Watch video at the quality your connection supports

### Video example

Before: Full 4K quality always

After: Fixed package: no usage-based slowdown

### Download example

Before: Speed reduced by 80%

After: Move the files you need for work or travel

### Download example

Before: Full speed guaranteed

After: All purchased GB at full speed

### Calling example

Before: Limited to 1 hour/day

After: Stay in touch through voice and video apps

### Calling example

Before: Unlimited HD calls

After: No Openline speed restriction

### Backup example

Before: Not allowed on mobile

After: Sync photos and backups on the go

### Backup example

Before: Upload without limits

After: Choose fixed for heavy uploads

### Illustration badge

Before: Full speed, always

After: No Openline throttling

### Illustration label

Before: buffering: none

After: quality varies

### Service section kicker

Before: Zero Restrictions

After: Choose with Confidence

### Service section heading

Before: Use Your Data Without Limits

After: Know your plan. Know our promise.

### Service section introduction

Before: While other providers quietly throttle your speeds or impose usage restrictions, Openline delivers exactly what you paid for. Your full data allocation at full speed, every single time.

After: Fixed packages give you the clearest guarantee: all the data you buy, at full available network speed, without usage-based throttling. Unlimited plans have no cap or throttling added by Openline, but the local MNO may apply fair use. If that slows you down too often, we’ll try a replacement eSIM on another infrastructure with rules that better suit your location and usage.

### Service checklist

Before: No speed throttling after certain usage

After: Fixed package: every purchased GB at full speed

### Service checklist

Before: No daily usage limits or caps

After: No usage-based throttling on fixed packages

### Service checklist

Before: No video quality restrictions

After: Unlimited: no data cap added by Openline

### Service checklist

Before: No 'fair usage policy' slowdowns

After: Unlimited: local MNO fair-use rules still apply

### Service checklist

Before: No time-of-day speed reductions

After: Heavy use within 24h may trigger a slowdown

### Service checklist

Before: No application-specific throttling

After: We’ll try another infrastructure if it happens often

### Service checklist

Before: No tethering/hotspot restrictions

After: Better fair use is our aim, not a guarantee

### Service checklist

Before: No peak-hour congestion

After: Guided setup if a replacement profile is needed

### Usage illustration

Before: NO CAP

After: LOCAL FUP MAY APPLY

### Usage illustration

Before: No throttling

After: No Openline cap

### Usage illustration

Before: No fair-use

After: Local fair use

### Usage illustration

Before: Full speed

After: Support if needed

### Usage illustration

Before: Unlimited speed

After: Unlimited from Openline

### Closing headline

Before: Experience True Unlimited

After: Your full allowance. Our full commitment.

### Closing introduction

Before: Stop settling for throttled "unlimited" plans. Get genuinely unlimited speeds with Openline - use every MB at full speed.

After: Choose fixed data for guaranteed no-throttling access to every GB you buy. Choose unlimited for no Openline data cap, with local MNO fair-use rules still applying. If those rules limit you too often, we’ll try to find a better-fitting infrastructure for you.

### Closing badge

Before: No limits

After: Fixed: full-speed data

### Closing badge

Before: Always reliable

After: Help with repeat slowdowns

### Hero illustration

Before: 150 Mbps Download

After: Full-speed fixed data

### Hero illustration

Before: 75 Mbps Upload

After: No Openline throttling

### Hero illustration

Before: 12ms Latency

After: Local rules apply

### Hero illustration

Before: 8.7 GB Used, No Throttling

After: Unlimited plans: local fair use may apply

### Hero usage statistic

Before: 5X

After: ∞

### Hero usage statistic

Before: Faster

After: Unlimited data

### Hero flexibility statistic

Before: 0 · Throttling

After: 0 · Fixed-plan throttling

### Hero replacement frequency

Before: 24/7 · Always Fast

After: 10 GB · All at full speed

## Unlimited: fixed-data guarantee and local MNO fair use

- **ID:** `unlimited-fixed-vs-mno-fair-use`
- **Disposition:** Current · Latest product clarification / Irina handoff
- **Scope:** unlimited
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/unlimited)

Fixed packages guarantee the entire purchased allowance at full available network speed without usage-based throttling: 10 GB means all 10 GB. Openline imposes no cap or throttling on unlimited plans, but a local mobile network operator may temporarily reduce speed after heavy use within 24 hours. Fixed data is the recommendation for avoiding that throttling. For recurring unlimited-plan slowdowns, Openline will try another profile/infrastructure whose fair-use policy may better suit the customer’s location and usage.

Irina: apply the latest page copy and illustration labels together with the existing QA colours, native font, animation geometry/timing, neutral use-case cards and added profile-replacement block. Do not restore the previous generic copy or treat the older original-to-current log as a separate version. Keep the no-throttling guarantee explicit for fixed purchased data, the unlimited local-MNO caveat prominent, and replacement best-effort, not a guaranteed cure. Do not invent a universal data threshold, guaranteed speed-recovery time or automatic midnight reset. Full available network speed still depends on signal, congestion and device. Profile installation may be needed; balance/validity carry-over and charges remain unspecified. This is a recorded QA handoff, not a message sent to Irina or a production update.

Files: `qa/connectivity-copy.json`, `qa/unlimited-plan-copy.json`, `qa/connectivity-changes.js`, `qa/redesign/profile-switching.html`, `qa/profile-switching.css`

[Detailed scoped changelog](https://openline-anims-review.vercel.app/qa/connectivity-changelog.md)

### Hero badge

Before: Unlimited Use, Adaptive Service

After: No Throttling from Openline

### Hero heading

Before: Unlimited usage. Service that adapts.

After: Your data. Full speed. Our promise, explained.

### Hero introduction

Before: Our unlimited-use approach is built on flexibility, not one fixed connection. We can use another network where your profile supports it or, occasionally, issue a new eSIM profile to change the underlying provider and connectivity setup. Speeds still depend on local conditions.

After: Buy 10 GB and get all 10 GB at full speed, guaranteed, with no usage-based throttling. Openline adds no data cap or throttling to unlimited plans either, but the local mobile operator’s fair-use rules can still reduce their speed after heavy use.

### Meaning heading

Before: Unlimited use needs a service that can adapt

After: One promise. Two types of plan.

### Meaning introduction

Before: Our ability to move you to another eSIM profile is part of what supports unlimited use. If the current provider or service setup is no longer suitable, we can replace it rather than leave you stuck with it. Unlimited usage is not a promise of one constant speed everywhere.

After: On a fixed-data package, your entire purchased allowance is guaranteed at full available network speed, without usage-based throttling. On an unlimited plan, Openline imposes no data cap or throttling, but local operator fair-use rules still apply. Full speed means the speed the network can deliver: signal, congestion and your device can affect it.

### Fixed-package feature heading

Before: Built for continued use

After: 10 GB means all 10 GB

### Fixed-package guarantee

Before: Our aim is to keep your service usable as you use your plan. Network conditions and provider constraints can still affect performance.

After: Buy a 10 GB package and every GB is available at full speed. We guarantee no usage-based throttling anywhere within your purchased allowance.

### Openline-side feature heading

Before: More than one service setup

After: Unlimited on our side

### Openline-side promise

Before: If your current service path stops being a good fit, we can issue another profile and move to a different underlying provider.

After: For unlimited plans, we guarantee that Openline adds no data cap or usage-based speed restriction. The local mobile network operator’s rules are a separate matter.

### Local-MNO feature heading

Before: Streaming, calls and more

After: Local network fair use

### 24-hour heavy-use disclosure

Before: Use your plan for the things you need on the move. Video quality and call performance depend on the connection available.

After: On unlimited plans, using a lot of data quickly within 24 hours may trigger a local MNO fair-use policy and temporarily reduce your speed. Thresholds and recovery times vary by network and plan.

### Plan recommendation heading

Before: A rare change, explained

After: Want no throttling? Go fixed.

### Fixed-package recommendation

Before: Profile changes should be uncommon. If a replacement is needed, we will explain the change and any installation or activation step.

After: Choose a fixed-data package if avoiding usage-based slowdowns is your priority. This is where we can guarantee your full purchased allowance at full available network speed.

### Usage introduction

Before: Everyday uses need a suitable connection. We can adapt the network or, occasionally, the whole eSIM profile to help maintain service.

After: Streaming, downloads and backups can use a lot of data quickly. For guaranteed no-throttling access to your purchased allowance, choose a fixed package. Unlimited plans offer no Openline data cap, with local operator fair use still applying.

### Video recommendation

Before: Adapt the service when needed

After: Fixed package: no usage-based slowdown

### Download recommendation

Before: More than one service path

After: All purchased GB at full speed

### Calling recommendation

Before: Connection quality matters

After: No Openline speed restriction

### Backup recommendation

Before: A new profile if the setup needs to change

After: Choose fixed for heavy uploads

### Streaming illustration badge

Before: Service that adapts

After: No Openline throttling

### Service section kicker

Before: Flexible Delivery

After: Choose with Confidence

### Service section heading

Before: Use your plan. Let the service adapt.

After: Know your plan. Know our promise.

### Service section introduction

Before: Unlimited use does not mean one eSIM profile must stay in place forever. To maintain a good service, Openline may occasionally replace the profile and move you to a different underlying provider and connectivity setup. Some changes may need a setup step on your phone.

After: Fixed packages give you the clearest guarantee: all the data you buy, at full available network speed, without usage-based throttling. Unlimited plans have no cap or throttling added by Openline, but the local MNO may apply fair use. If that slows you down too often, we’ll try a replacement eSIM on another infrastructure with rules that better suit your location and usage.

### Promise checklist

Before: Unlimited use on eligible unlimited plans

After: Fixed package: every purchased GB at full speed

### Promise checklist

Before: Network options depend on your plan and location

After: No usage-based throttling on fixed packages

### Promise checklist

Before: Video quality follows the available connection

After: Unlimited: no data cap added by Openline

### Promise checklist

Before: Alternative providers when the service needs to change

After: Unlimited: local MNO fair-use rules still apply

### Promise checklist

Before: Local congestion can still affect performance

After: Heavy use within 24h may trigger a slowdown

### Promise checklist

Before: Data for your everyday work and travel apps

After: We’ll try another infrastructure if it happens often

### Promise checklist

Before: Check your plan and device for hotspot support

After: Better fair use is our aim, not a guarantee

### Unlimited illustration marker

Before: UNLIMITED PLAN

After: LOCAL FUP MAY APPLY

### Unlimited illustration badge

Before: Adaptive service

After: No Openline cap

### Unlimited illustration badge

Before: Profile flexibility

After: Local fair use

### Unlimited illustration badge

Before: Network-aware

After: Support if needed

### Unlimited illustration heading

Before: Unlimited usage

After: Unlimited from Openline

### Closing headline

Before: Unlimited use, with flexibility behind it

After: Your full allowance. Our full commitment.

### Closing introduction

Before: Choose an unlimited plan backed by the flexibility to adapt its delivery. Usually your existing profile does the job; occasionally, a replacement eSIM helps us move you to a better service setup.

After: Choose fixed data for guaranteed no-throttling access to every GB you buy. Choose unlimited for no Openline data cap, with local MNO fair-use rules still applying. If those rules limit you too often, we’ll try to find a better-fitting infrastructure for you.

### Closing badge

Before: Profile changes may apply

After: Fixed: full-speed data

### Closing badge

Before: Built to adapt

After: Help with repeat slowdowns

### Hero illustration

Before: Download varies

After: Full-speed fixed data

### Hero illustration

Before: Upload varies

After: No Openline throttling

### Hero illustration

Before: Latency varies

After: Local rules apply

### Hero illustration

Before: Usage supported by profile flexibility

After: Unlimited plans: local fair use may apply

### Hero usage statistic

Before: Usage

After: Unlimited data

### Hero guarantee statistic

Before: 2 · Ways to adapt

After: 0 · Fixed-plan throttling

### Hero allowance statistic

Before: Rare · Profile changes

After: 10 GB · All at full speed

### Replacement section kicker

Before: The flexibility behind unlimited

After: When unlimited slows you down

### Replacement section heading

Before: Unlimited use does not mean one profile forever.

After: Throttled too often? We’ll try another route.

### Replacement section introduction

Before: Network selection and profile replacement are two parts of the same approach. If your current service setup is no longer a good fit, we can issue a new eSIM and move you to a different underlying provider. This should be uncommon, but it is part of the service.

After: If your unlimited plan repeatedly hits local fair-use restrictions, contact us. We’ll try to issue another eSIM profile using a different provider or infrastructure, aiming for a fair-use policy that works better in your location and for the way you use data.

### Network-selection distinction

Before: When your current eSIM has a suitable network option, we can adapt the connection within that profile. The choices depend on your plan and location.

After: Selecting another available network keeps the current eSIM profile. It is different from moving your service to another infrastructure with a different fair-use policy.

### Network-selection boundary

Before: Your existing eSIM profile remains in use.

After: A network change alone does not guarantee different fair-use rules.

### Replacement-card heading

Before: A new profile.

After: Another infrastructure.

### Replacement-card heading

Before: A different service setup.

After: A better fit, if available.

### Best-effort replacement promise

Before: If a network change is not enough, we can issue another eSIM profile on the fly. That lets us change the underlying provider and connectivity setup, not just the network name on your screen.

After: For recurring unlimited-plan throttling, we’ll try to provide a replacement profile from another infrastructure. We hope its fair-use rules will better suit your location, environment and experience. A better result is not guaranteed.

### Replacement-card boundary

Before: This flexibility supports both multi-network access and our unlimited-use approach.

After: A new profile changes the underlying service setup, not just the network name.

### Replacement disclosure heading

Before: Occasionally, we may replace your eSIM profile entirely.

After: We’ll try to improve the experience. Local rules still apply.

### Replacement disclosure

Before: It should be uncommon, but changing the whole profile is part of how we work to maintain a good service. You may need to install or enable the replacement on your phone. If a setup step is needed, we’ll guide you through it.

After: Replacement should be uncommon and depends on available alternatives. We cannot guarantee a more generous fair-use policy, faster service or no future throttling. You may need to install or enable a new profile; we’ll guide you if needed. If you want guaranteed no usage-based throttling, choose a fixed-data package instead.

### Fixed-data guarantee

Buy 10 GB and get all 10 GB at full speed, guaranteed, with no usage-based throttling.

### Unlimited distinction

Openline adds no data cap or throttling to unlimited plans. Local MNO fair-use rules can still reduce speed after heavy use within 24 hours; thresholds and recovery times vary.

### Plan recommendation and support

Choose a fixed package for guaranteed no usage-based throttling. If unlimited throttling recurs, we’ll try another profile/infrastructure for a better-fitting fair-use policy, without guaranteeing an improvement.

## France: original template, lighter Unlimited block

- **ID:** `country-fr-unlimited-refinement`
- **Disposition:** Current · Current direction / Irina handoff
- **Scope:** country-fr-redesign
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/country-fr-redesign#fr-plans)

Paul rejected the full selector redesign. The original France template is restored: centered Unlimited block followed by the original Data Bundles section. Unlimited keeps aligned travel-date/day controls and consistent feature/action spacing. The latest presets use numbers and days only, stronger original-style shadows and a restrained selected lift.

Irina: implement this restrained original-template version, not the rejected type-choice cards, dark sticky summary or redesigned fixed cards. Keep the original hero, section ordering, orange identity, native font, fixed-card markup and surrounding content. Retain Paul’s restored original Unlimited introduction (see country-fr-unlimited-intro), the corrected plan-wide promise, plain fair-use label with question-mark button, and compact policy modal explaining local MNO rules and best-effort profile replacement. The existing France QA URL now serves this replacement. Source-review prices, presets/custom days, local date and cart/purchase demonstrations remain non-production; the input guard is 1–365 days, not a product rule. Original Data Calculator remains available through the source reference, not reimplemented in this scoped pass. No production page, checkout, provisioning or animation picks are changed.

Files: `qa/country-fr-refinement.js`, `qa/country-fr-refinement.css`, `qa/calendar-range.js`, `qa/country-fr-data.js`, `qa/redesign/country-fr-dialogs.html`, `qa/redesign/country-fr-support.html`, `qa/country-fr-support.js`, `qa/country-fr-support.css`

[Detailed scoped changelog](https://openline-anims-review.vercel.app/qa/country-fr-changelog.md)

## France: rejected full selector redesign

- **ID:** `country-fr-plan-selector`
- **Disposition:** History · Rejected by Paul / do not implement
- **Scope:** country-fr-redesign
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/country-fr-redesign#fr-plans)

The alternative with Unlimited / Fixed choice cards, a separate dark summary and rebuilt fixed-package cards was rejected. It has been removed from the served page and its old CSS, JS and markup fragment have been deleted.

Historical decision only. Superseded by country-fr-unlimited-refinement. Do not include this rejected layout in Irina’s implementation or any future delivery; preserve the original template and make only slight Unlimited-block improvements.

Files: `qa/country-fr-refinement.js`, `qa/country-fr-refinement.css`, `qa/calendar-range.js`, `qa/country-fr-data.js`, `qa/redesign/country-fr-dialogs.html`, `qa/redesign/country-fr-support.html`, `qa/country-fr-support.js`, `qa/country-fr-support.css`

[Detailed scoped changelog](https://openline-anims-review.vercel.app/qa/country-fr-changelog.md)

## France: question-mark fair-use modal

- **ID:** `country-fr-fair-use`
- **Disposition:** Current · Implemented in QA / shared product policy
- **Scope:** country-fr-redesign
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/country-fr-redesign#fr-plans)

Fair usage applies and its question-mark icon are one clickable/tappable button with no underline and a close 4px text-to-icon gap. Clicking either the words or the icon opens the existing compact policy modal, without changing its explanation.

The whole label plus icon is one native keyboard-accessible button; mobile has a 44px-high hit area. The icon is decorative for assistive technology and the button identifies the dialog it opens. Policy content remains generated from the current Unlimited data: fixed-package guarantee, local MNO fair use and best-effort profile replacement. Three policy sections, links to Unlimited/Multi Tier-1, View fixed packages, Escape/backdrop/close and focus return remain. Keep this combined trigger, not the earlier icon-only click target, when applying Irina’s handoff.

Files: `qa/country-fr-refinement.js`, `qa/country-fr-refinement.css`, `qa/calendar-range.js`, `qa/country-fr-data.js`, `qa/redesign/country-fr-dialogs.html`, `qa/redesign/country-fr-support.html`, `qa/country-fr-support.js`, `qa/country-fr-support.css`

[Detailed scoped changelog](https://openline-anims-review.vercel.app/qa/country-fr-changelog.md)

### Fixed versus unlimited

Every purchased GB at full available network speed, without usage-based throttling, on fixed packages. Unlimited plans have no Openline-imposed cap or throttling, while local MNO fair-use rules can still apply.

### Repeated throttling

We’ll try another eSIM profile/infrastructure whose fair-use rules may better suit your location and usage. A better result is not guaranteed, and setup may be needed.

## France: normal calendar range modal restored

- **ID:** `country-fr-calendar-range`
- **Disposition:** Current · Implemented in QA / Irina handoff
- **Scope:** country-fr-redesign
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/country-fr-redesign#fr-plans)

Select travel dates opens an actual start/end calendar range picker again, not two date input fields. The original two-month desktop pattern is retained with readable day targets, clear month navigation, orange endpoints, a soft range band/hover preview, start/end summaries and Reset. Mobile shows one navigable month rather than squeezing two calendars.

Irina: keep the original page and lightly refined Unlimited block. This change is scoped to the calendar modal and selected-date label. First click sets start; second sets end, including same-day and reversed clicks. Past dates are disabled. Arrow/Home/End/Page Up/Down and Shift+Page keys support keyboard travel. Both dates count; calendar-day arithmetic avoids DST errors. Apply updates the existing day counter, label and price; Cancel/Escape/backdrop leave the committed selection intact. Reopening restores applied dates, not abandoned drafts. The preview total uses the same Unlimited pricing function and USD currency as the block, replacing the source modal’s hard-coded daily estimate/mixed currency label. Dates do not schedule activation. The existing 1–365-day preview guard remains, not a new product rule. No fixed-plan restyling, rejected selector, payment or provisioning is reintroduced.

Files: `qa/country-fr-refinement.js`, `qa/country-fr-refinement.css`, `qa/calendar-range.js`, `qa/country-fr-data.js`, `qa/redesign/country-fr-dialogs.html`, `qa/redesign/country-fr-support.html`, `qa/country-fr-support.js`, `qa/country-fr-support.css`

[Detailed scoped changelog](https://openline-anims-review.vercel.app/qa/country-fr-changelog.md)

## France: calendar pricing and consistent duration controls

- **ID:** `country-fr-calendar-polish`
- **Disposition:** Current · UI polish / Irina handoff
- **Scope:** country-fr-redesign
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/country-fr-redesign#fr-plans)

The calendar’s visible keyboard-instruction line is hidden while the accessible description and shortcuts remain. A clearer quote card separates the X-day plan, Unlimited-data label, total USD price and daily rate. Reset is Openline orange with a reset icon; Apply has a stronger primary treatment and animated trailing arrow.

Date, stepper, purchase/cart and calendar navigation icons retain small user-triggered motions, not moving labels or looping flashes. The later number-only duration-card revision supersedes the six preset calendar icons and selected tick animation. Reduced motion is static. Keep original France layout, pricing, range selection, cancellation and fair-use behaviour; keyboard help remains available to assistive technology. No rejected sidebar/type-selector design is restored.

Files: `qa/country-fr-refinement.js`, `qa/country-fr-refinement.css`, `qa/calendar-range.js`, `qa/country-fr-data.js`, `qa/redesign/country-fr-dialogs.html`, `qa/redesign/country-fr-support.html`, `qa/country-fr-support.js`, `qa/country-fr-support.css`

[Detailed scoped changelog](https://openline-anims-review.vercel.app/qa/country-fr-changelog.md)

## France: original-style durations and a support journey

- **ID:** `france-duration-cards-and-support`
- **Disposition:** Current · Implemented / Irina handoff
- **Scope:** country-fr-redesign
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/country-fr-redesign)

Removed the icons from 3 / 5 / 7 / 10 / 15 / 30-day tiles. Added subtle neutral shadows and a stronger orange selected shadow with the original-style gentle lift. The unrelated coverage graphic beside the FAQs is replaced with a KB → Openline AI → human team support animation and a prominent live-chat CTA.

Only the marked FAQ illustration is replaced; the source FAQ questions, surrounding page structure and plan selection remain. All three support labels stay visible while emphasis cycles slowly. Clicking a step selects it and restarts the timing; pause/resume is available, playback stops offscreen/hidden, and reduced motion stays static. Start a live chat opens the existing shared chat; Browse the knowledge base opens the KB. This visual explanation does not connect an AI or human-support backend. Number-only cards keep existing pricing, keyboard interaction and calendar handoff.

Files: `qa/country-fr-refinement.js`, `qa/country-fr-refinement.css`, `qa/calendar-range.js`, `qa/country-fr-data.js`, `qa/redesign/country-fr-dialogs.html`, `qa/redesign/country-fr-support.html`, `qa/country-fr-support.js`, `qa/country-fr-support.css`

[Detailed scoped changelog](https://openline-anims-review.vercel.app/qa/country-fr-changelog.md)

## France: original Unlimited introduction restored

- **ID:** `country-fr-unlimited-intro`
- **Disposition:** Current · Exact wording requested by Paul
- **Scope:** country-fr-redesign
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/country-fr-redesign#fr-plans)

The description below Unlimited Data returns to the original marketing sentence, exactly as requested. No other page copy or layout is changed.

Irina: use the exact After text below. Keep the separate fair-use label/question mark, current policy modal, plan-wide explanation and restored calendar range picker unchanged.

Files: `qa/country-fr-refinement.js`, `qa/country-fr-refinement.css`, `qa/calendar-range.js`, `qa/country-fr-data.js`, `qa/redesign/country-fr-dialogs.html`, `qa/redesign/country-fr-support.html`, `qa/country-fr-support.js`, `qa/country-fr-support.css`

[Detailed scoped changelog](https://openline-anims-review.vercel.app/qa/country-fr-changelog.md)

### Unlimited Data introduction

Before: No data cap from Openline. Local network fair use applies.

After: Perfect for heavy users. Stream, video call, and browse without limits.

## IoT: selected Chrome default

- **ID:** `iot-chrome`
- **Disposition:** Current · Selected default
- **Scope:** iot
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/iot)

Purple and indigo accents become neutral steel, graphite and gunmetal with a restrained chrome sheen.

Chrome starts selected. Keep orange branding and green online status meaningful; honour the reviewer’s explicit identity toggle.

Files: `js/iot-cells.js`, `qa/core.js`, `qa/paint.js`, `qa/recolor.js`

## Openline+: steady destination labels

- **ID:** `nomad-stability`
- **Disposition:** Current · Implemented in QA
- **Scope:** openline-plus
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/openline-plus)

Built for Digital Nomads no longer repeatedly fades its city labels. Connection motion continues and the number is the fictional US example +1 202 555 0148.

Context-only refinement of Six Cities, One Number. The original board remains a comparison reference.

Files: `js/plus.js`, `qa/animation-fixes.js`

## Retained About redesign

- **ID:** `about-layout`
- **Disposition:** Retained / review · QA alternative
- **Scope:** about, about-redesign
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/about-redesign)

The earlier About redesign remains available beside the original, including its principles, team presentation, local clocks and partner strip.

Preserve current/original comparison. Illustrative business claims require content approval before shipping.

Files: `qa/about.html`, `qa/redesign/about.main.html`, `qa/redesign/rd.css`, `qa/redesign.js`

## Network comparison: corrected card spacing

- **ID:** `about-network-spacing`
- **Disposition:** Current · Implemented in QA
- **Scope:** about-redesign
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/about-redesign#rd-network-technology)

The two Most Reliable Connection cards have consistent inset padding, clear title-to-list spacing and aligned icon/bullet rows. Comparison titles use scoped heading styles instead of inheriting generic paragraph margins and sizing.

Desktop and mobile spacing are explicit. The two network illustrations and their animation timings are unchanged; original About remains a comparison reference.

Files: `qa/redesign/about.main.html`, `qa/redesign/rd.css`, `qa/redesign.js`

## Open Startup: locked coming-soon results

- **ID:** `about-startup-locked`
- **Disposition:** Current · Coming very soon
- **Scope:** about-redesign
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/about-redesign#rd-open-startup)

Open Startup now explains that public results are coming very, very soon. A lock notice and keyboard-operable Show / Hide results preview control replace the previous live-looking sample metrics.

Expanded by default, as selected by Paul. All three dashboard cards retain locked placeholders only, not financial figures; the Hide / Show control remains available. Prior sample revenue, margin, growth, active-user and retention numbers and Live badges were removed from this section, not merely blurred. No metrics API or publication date is implied.

Files: `qa/redesign/about.main.html`, `qa/redesign/rd.css`, `qa/redesign.js`

## Team roster: nine supplied locations

- **ID:** `about-team-cities`
- **Disposition:** Current · Implemented in QA
- **Scope:** about-redesign
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/about-redesign)

The local-time roster now lists New York, Lisbon, Warsaw, Ankara, Bristol, Berlin, Paris, Singapore and Bali in the supplied order, with city badges instead of fictional staff initials.

Nine locations, one team replaces the old six-timezone claim. Clocks use IANA zones with daylight-saving rules where applicable; Ankara uses Europe/Istanbul, Bristol Europe/London and Bali Asia/Makassar. The currently selected team animation remains unchanged.

Files: `qa/redesign/about.main.html`, `qa/redesign/rd.css`, `qa/redesign.js`

## Redesign buttons: native type and arrow motion

- **ID:** `redesign-button-parity`
- **Disposition:** Current · Implemented in QA
- **Scope:** about-redesign, contact-redesign
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/about-redesign)

About and Contact action buttons use the current Openline type scale and icon sizing: 16px / 24px, weight 500 for main actions; 14px compact contact actions and mobile purchase CTAs; 16px button icons. Trailing arrows match the source shape and slide 4px over 150ms without shifting the text or lifting the button.

Verified against live Openline and the original capture. Arrow motion responds to hover, keyboard focus and press, with a static reduced-motion fallback. Keep 8px corners, 8px base gaps, source-like desktop heights and at least 44px mobile tap targets. Purchase CTAs use the source-style Buy eSIM Now label on small screens, keeping the existing 190+ country count. No arrow motion is applied to chat symbols or disclosure/FAQ chevrons. Page layouts and selected illustration animations are preserved.

Files: `qa/redesign/about.main.html`, `qa/redesign/rd.css`, `qa/redesign.js`, `qa/redesign/contact.main.html`, `qa/support/boot.js`

## Retained Contact redesign

- **ID:** `contact-layout`
- **Disposition:** Retained / review · QA alternative
- **Scope:** contact, contact-redesign
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/contact-redesign)

The earlier Contact redesign remains alongside the original, with contact methods, support process, chat preview and global support block.

Only this retained Contact alternative receives the latest channel/widget redesign; the original capture is a comparison reference.

Files: `qa/contact.html`, `qa/redesign/contact.main.html`, `qa/redesign/rd.css`, `qa/redesign.js`, `qa/support/boot.js`

## Contact channels and future hotline

- **ID:** `contact-channels`
- **Disposition:** Current · Implemented / hotline coming soon
- **Scope:** contact-redesign, chat
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/contact-redesign)

WhatsApp +1 (555) 484-2461; Instagram and Messenger/Facebook @askopenline; email ask@openline.com. The Contact page adds a Live hotline widget below 24/7 Global Support: +1 (8) 123 - ONLINE.

WhatsApp https://wa.me/15554842461; Instagram https://www.instagram.com/askopenline/; Messenger https://m.me/askopenline; Facebook https://www.facebook.com/askopenline; mailto:ask@openline.com. Hotline is visibly Coming soon, has no dial action, and is not an operational number.

Files: `qa/redesign/contact.main.html`, `qa/redesign/rd.css`, `qa/redesign.js`, `qa/support/boot.js`, `qa/support/chat.js`, `qa/support/support.js`, `qa/support/support.css`, `qa/assets/ai/README.md`, `qa/assets/support-portraits/README.md`

## Clickable support-process animation

- **ID:** `contact-chat-seeking`
- **Disposition:** Current · Implemented in QA
- **Scope:** contact-redesign
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/contact-redesign)

Each of the three How Our Chat Support Works steps seeks its matching animation scene. Automatic playback continues and highlights follow the SVG clock.

Keyboard-operable buttons with pressed state. Reduced-motion pauses autoplay but preserves manual scene selection.

Files: `qa/redesign/contact.main.html`, `qa/redesign/rd.css`, `qa/redesign.js`, `qa/support/boot.js`

## Installation preflight: earlier two-block version

- **ID:** `installation-preflight`
- **Disposition:** History · Superseded by install-first choices
- **Scope:** installation-guide
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/installation-guide#ig-preflight)

The earlier text-heavy explainer plus separate four-step roadmap is superseded. Do not restore the duplicated structure or make every visitor redeem a purchase code before installing.

Historical scope only. Follow installation-preflight-install-first and its current handoff document; the selected hero animation and surrounding captured blocks remain preserved.

Files: `qa/redesign/installation-preflight.html`, `qa/installation-preflight.js`, `qa/installation-preflight.css`, `qa/support/boot.js`

## Installation guide: earlier code-to-profile comparison

- **ID:** `installation-preflight-simplified`
- **Disposition:** History · Superseded by install-first choices
- **Scope:** installation-guide
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/installation-guide#ig-preflight)

The Purchase code → Openline eSIM comparison, three steps below and primary redemption CTA were an intermediate version. Paul requested a clearer choice prioritising people who already have their eSIM, so this intermediate layout is no longer served.

Do not restore the primary Redeem purchase code button or the small I already have my eSIM skip link. Use the new first/primary Install my eSIM card and a separate secondary redemption path. Dedicated code-definition and connection-checklist modals are retained.

Files: `qa/redesign/installation-preflight.html`, `qa/installation-preflight.js`, `qa/installation-preflight.css`, `qa/support/boot.js`

[Detailed scoped changelog](https://openline-anims-review.vercel.app/qa/installation-preflight-changelog.md)

## Installation guide: install-first, redeem-if-needed

- **ID:** `installation-preflight-install-first`
- **Disposition:** Current · Current targeted redesign / Irina handoff
- **Scope:** installation-guide
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/installation-guide#ig-preflight)

The marked block is now a two-path decision: I already have my eSIM is first and primary, with a large orange Install my eSIM button leading directly to the existing setup guide. I have a purchase code is a separate neutral secondary card whose Redeem purchase code button goes to /start. The forced three-step redemption roadmap and directional bridge are removed.

Use larger headings/body copy, aligned card visuals/actions, clear QR/manual-details versus purchase-code examples, native Openline font and orange-only primary emphasis. On mobile the install-ready route remains first. The install CTA scrolls and focuses Learn step by step; /start remains the alias to /qa/start. Compatibility and dedicated detail dialogs stay. The connection checklist now mirrors primary Openline data, other-line data OFF, switching OFF, roaming ON and an airplane-mode refresh. Code help explains unlock-for-transfer and owner email validation. No surrounding captured HTML or chosen animation was changed; no activation, email or transfer backend is added.

Files: `qa/redesign/installation-preflight.html`, `qa/installation-preflight.js`, `qa/installation-preflight.css`, `qa/support/boot.js`

[Detailed scoped changelog](https://openline-anims-review.vercel.app/qa/installation-preflight-changelog.md)

### Heading

Ready to install your eSIM? Choose what you have. We’ll take you to the right next step.

### Primary route

I already have my eSIM. Got your QR code or manual installation details? You’re ready to continue. → Install my eSIM

### Secondary route

I have a purchase code. Redeem your code to create the eSIM profile you’ll install on your phone. → Redeem purchase code

## Installation guide: code and connection detail modals

- **ID:** `installation-preflight-detail-modals`
- **Disposition:** Current · Added / user-supplied setup guidance
- **Scope:** installation-guide
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/installation-guide#ig-preflight)

Which code is which and Connection checklist are now larger, icon-led buttons opening dedicated native dialogs. The first distinguishes an Openline purchase code from the eSIM activation code and SM-DP+ address used for manual phone setup. The second explains activation timing, private Wi-Fi and the three essential mobile-data settings.

Codes: order email/dashboard code goes to /start, not phone settings; the resulting profile supplies QR/manual details. Retain the old naming explanation and gift-before-activation boundary, now including unlock-for-transfer and owner purchase-validation email. Connection: activate near the trip, use private Wi-Fi rather than airport/public Wi-Fi or cellular setup, select Openline as primary data, disable other SIM/eSIM mobile data and automatic switching, enable Openline roaming and suggest a brief airplane-mode refresh. These are user-supplied recommendations, not detected or changed phone settings. Native focus trapping/return, Escape, backdrop/close and setup-guide jumps are supported. No payment, provisioning, email or device configuration is performed.

Files: `qa/redesign/installation-preflight.html`, `qa/installation-preflight.js`, `qa/installation-preflight.css`, `qa/support/boot.js`

[Detailed scoped changelog](https://openline-anims-review.vercel.app/qa/installation-preflight-changelog.md)

## Purchase code to eSIM extra

- **ID:** `start-flow`
- **Disposition:** Current · Interactive prototype
- **Scope:** start, installation-guide
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/start)

Animated key, large GAZE19-MULCH29-NYMPH13-format input, code validation, and a concise plan review with three clear Activate / Gift / Account cards. The centred activation confirmation uses an off-by-default readiness switch; the chosen code-to-eSIM animation is preserved.

Current larger-type redesign replaces the earlier text-heavy presentation. Checking does not activate. Confirmation explains immediate validity and the end of gifting, with a large centred readiness switch required before activation. Detailed code help and preview/error controls now live in native dialogs. Invalid/used/network/provisioning-error states, reduced motion and safe cancellation remain. All plan/code/profile values are fixtures: no provisioning API, real account action, persistent code storage or installable QR.

Files: `qa/start.js`, `qa/start.css`, `qa/start-profile.js`, `qa/start-profile.css`, `qa/start-changelog.md`, `qa/assets/start-brand-mark.png`, `qa/assets/start-demo-qr.png`, `qa/redesign/installation-preflight.html`, `qa/installation-preflight.js`, `qa/installation-preflight.css`, `qa/support/boot.js`

## Gift a purchase code: owner email and explicit transfer unlock

- **ID:** `start-gift-unlock-transfer`
- **Disposition:** Current · Interactive concept / product rule from Paul
- **Scope:** start, installation-guide
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/start)

Gift now explains that the purchase owner will still receive an email to validate the purchase. An unused code starts locked for transfer. Unlock for transfer opens an explicit confirmation; confirming exposes Copy gift message and a Ready to transfer / not activated status. Unlocking is separate from activating the plan.

The confirmation explains that anyone with the unlocked code can redeem it and that unlocking does not start validity or remove owner email validation. Cancel/Escape do not unlock. Unlock state is scoped to each code in memory; another code never inherits it, and Restart flow clears the test run. Used/activated codes remain blocked from gifting. Open recipient view hands the current unlocked code to the new recipient entry without placing it in a URL or storage. This is local presentation state only: production requires ownership checks, transfer/unlock and email integration. No email is sent and no purchase is actually unlocked. Keep technical limitations in the QA panel rather than customer-facing notices.

Files: `qa/start.js`, `qa/start.css`, `qa/start-profile.js`, `qa/start-profile.css`, `qa/start-changelog.md`, `qa/assets/start-brand-mark.png`, `qa/assets/start-demo-qr.png`, `qa/redesign/installation-preflight.html`, `qa/installation-preflight.js`, `qa/installation-preflight.css`, `qa/support/boot.js`

[Detailed scoped changelog](https://openline-anims-review.vercel.app/qa/start-changelog.md)

### Owner email

The purchase owner will still receive an email to validate the purchase.

### Unlock confirmation

Anyone with the unlocked code can redeem it. Unlocking does not start the plan or remove the owner’s email-validation step.

### Transfer state

Locked for transfer → Unlock for transfer → Ready to transfer · not activated → Copy gift message

## Gift recipient: receive, redeem and connect

- **ID:** `start-gift-recipient`
- **Disposition:** Current · Interactive recipient journey / Irina handoff
- **Scope:** start
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/start?recipient=1)

Added the recipient side of gifting: a gift-code entry, plan review with unlocked status, Keep it for later, guarded Redeem & activate, chosen code-to-profile animation, immediate QR, setup, recipient-specific label/folder and final account handoff. The sender can open the recipient view after unlocking, or a recipient can enter through Received a gift or the dedicated query-mode link.

Entry is /qa/start?recipient=1; only the view mode goes in the URL, never the purchase code. Sender handoff prefills the code in memory and does not auto-redeem it. Checking and keeping for later leave it unused; the readiness switch and confirmation are mandatory. Added locked-transfer and pending-owner-email-validation states with Check again and a privately copyable sender-help message. These states block activation. The default ready fixture represents an eligible unlocked gift; a live implementation must verify purchase validation, ownership and one-time redemption atomically on the server. An in-memory ledger blocks reuse after successful activation within the current run; restart/reload is not production protection. Sender/recipient label and folder storage are isolated; no sender name, email or organisational data is exposed. No email, account binding, transfer, real QR provisioning or phone connection is newly integrated. Existing clean customer presentation and quick final modals remain.

Files: `qa/start.js`, `qa/start.css`, `qa/start-profile.js`, `qa/start-profile.css`, `qa/start-changelog.md`, `qa/assets/start-brand-mark.png`, `qa/assets/start-demo-qr.png`

[Detailed scoped changelog](https://openline-anims-review.vercel.app/qa/start-changelog.md)

### Recipient entry

Someone’s sent you a connection. Enter the purchase code from your gift message. Your next trip starts with you.

### Gift review

A connection, just for you. Unlocked and ready for you. The sender has made this code transferable. Your plan hasn’t started.

### Pending validation

One confirmation to go. The purchase owner needs to validate the purchase by email. Ask them to check their inbox, then check again.

### Activation and handoff

Ready to use your gift? Redeeming starts your 30 days immediately. Once activated, this gift can’t be transferred again. → Your gift is now your eSIM. → A gift that goes with you.

## Complete activation: details, setup, organisation

- **ID:** `start-profile-handoff`
- **Disposition:** Current · Interactive prototype
- **Scope:** start
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/start)

After activation, the page immediately shows the eSIM QR and plan card. Manual details and IDs are collapsed underneath. The inline sequence then continues through Setup & connect → Make it yours → a clearly labelled simulated connection and account handoff. There is no Set up my eSIM gate or all-in-one profile modal.

Keep QR visible by default and SM-DP+, activation code, LPA, ICCID, profile ID and unlinked EID behind the manual-details disclosure. Setup uses Openline / OFF / ON cards, with private-Wi-Fi installation and device guidance in dialogs. Label/folder/custom folders remain optional and session-stored; storage failure is still reported. Paul requested removal of customer-facing demo/simulated-connection/local-storage notices, so those boundaries are documented here rather than on the completion screen. Production must use authoritative provisioning and connection status, not timers. Account goes to /qa/login; QR is still a harmless fixture, server uses .invalid and no device EID is fabricated.

Files: `qa/start.js`, `qa/start.css`, `qa/start-profile.js`, `qa/start-profile.css`, `qa/start-changelog.md`, `qa/assets/start-brand-mark.png`, `qa/assets/start-demo-qr.png`

## Activate a plan: clearer choices and an inline finish

- **ID:** `start-focused-redesign`
- **Disposition:** Current · Current redesign / Irina handoff
- **Scope:** start
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/start)

Full /qa/start flow simplification: less visible copy, larger native-font headings and controls, three distinct plan actions, a centred 24px readiness label with a real switch, immediately visible QR, collapsed manual details, three essential phone settings, optional organisation and a clear Go to my account finale.

Irina: implement the structure, copy, typography, spacing, icons, modal details and interactions together, not just the animation. The selected key and code-to-profile motion and directional CTA arrows are preserved. First code check is read-only; only explicit switched-on confirmation consumes the fixture code. Private Wi-Fi guidance, avoid-airport/cellular setup, Openline primary data, switching OFF and Openline roaming ON match the installation-guide changes. No production backend has been added. The delivery handoff was authorized on 6 October 2026.

Files: `qa/start.js`, `qa/start.css`, `qa/start-profile.js`, `qa/start-profile.css`, `qa/start-changelog.md`, `qa/assets/start-brand-mark.png`, `qa/assets/start-demo-qr.png`

[Detailed scoped changelog](https://openline-anims-review.vercel.app/qa/start-changelog.md)

### Plan choices

Activate my plan · Start using it now. / Gift this code · Let them choose when. / My account · Manage my eSIMs.

### Confirmation

Your 30 days begin immediately. This code can no longer be gifted. I’m ready to start this plan now.

### Inline finish

Here’s your eSIM. → Let’s get you connected. → Make it yours. → You’re connected. (QA-only implementation boundary is recorded in the panel, not in the customer-facing copy.)

## Start: normal Openline header and proper secondary actions

- **ID:** `start-normal-header-actions`
- **Disposition:** Current · Implemented / Irina handoff
- **Scope:** start
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/start)

Restored the source-style 64px normal header with logo, Destinations / Features / Pro / Resources, Openline+ Beta, cart, Sign In and EN / $ controls. Mobile has support, cart and a working menu. Gift this code and Go to my account are larger icon-and-arrow buttons; completion View my eSIM and Edit label or folder are full secondary buttons. The bottom Check my device / Need a hand row is removed.

Header menus use the existing QA routes. Cart is a separate empty presentation, not a shared checkout backend; locale shows current English/USD only, not a multilingual implementation. The normal wordmark/native font/spacing follow the supplied reference. The later quick-actions revision makes completion buttons open small QR/edit dialogs while retaining the completion screen underneath. The initial QR handoff still appears inline, without a modal gate. Chosen activation motion and mandatory readiness switch remain.

Files: `qa/start.js`, `qa/start.css`, `qa/start-profile.js`, `qa/start-profile.css`, `qa/start-changelog.md`, `qa/assets/start-brand-mark.png`, `qa/assets/start-demo-qr.png`

[Detailed scoped changelog](https://openline-anims-review.vercel.app/qa/start-changelog.md)

## Start: QR reminder, explicit settings and quick profile modals

- **ID:** `start-quick-profile-modals`
- **Disposition:** Current · Implemented / Irina handoff
- **Scope:** start
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/start)

Install your eSIM repeats the QR above device instructions. Setup explicitly selects Openline as primary mobile data, disables mobile data on other SIMs/eSIMs and automatic data switching, enables roaming on Openline, and adds a brief airplane-mode ON/OFF refresh. Completion icons are centred with their labels; View my eSIM and Edit label or folder open compact dialogs rather than revisiting previous steps.

QR view includes the current profile label, a QR download and collapsed copyable manual details. Edit opens saved values, supports existing/custom folders and validates a new folder name. Save updates the completion card, main form and QR modal together without changing the current step; Cancel/Escape/backdrop discard unsaved edits. Native focus trapping and return are preserved. Only mobile data on other lines is disabled in the instructions, not necessarily their calls/texts. Airplane mode is a reconnect suggestion, not a guaranteed connection or detected status. Existing safe fixtures and local storage boundary remain; no new backend or device configuration is connected. Customer-facing demo notices remain removed.

Files: `qa/start.js`, `qa/start.css`, `qa/start-profile.js`, `qa/start-profile.css`, `qa/start-changelog.md`, `qa/assets/start-brand-mark.png`, `qa/assets/start-demo-qr.png`

[Detailed scoped changelog](https://openline-anims-review.vercel.app/qa/start-changelog.md)

### Primary data

Choose your Openline eSIM as the primary mobile data line.

### Other SIMs and switching

Turn OFF mobile data on other SIMs/eSIMs and automatic data switching.

### Roaming

Enable data roaming on your Openline eSIM.

### Quick refresh

Turn airplane mode ON, then OFF. Let the network reconnect, then try opening a webpage.

## Customer-facing QA screens: remove demo notices

- **ID:** `clean-customer-presentation`
- **Disposition:** Current · Requested presentation cleanup / technical limits retained here
- **Scope:** *
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa#qa-changes)

Removed the intrusive Demo only / simulated connection / no real activation / saved in this browser tab notices from the start flow, and the corresponding preview banners, captions and copy in France, Product Hunt, chat, Contact and installation guidance. Startup labels now say Show / Hide results; the explicitly requested locked-coming-soon state remains.

This is UI copy cleanup, not a backend launch. Activation, network connection, reward issuance, human/AI chat and account saving are not newly integrated. Preserve safe .invalid/QA fixtures, local storage boundaries and error handling. No purchase, email, reward or support ticket is sent by these prototypes. Do not infer successful production operations from the clean presentation. Chat microphone denial now gives an actual error rather than simulating a recording; clipboard and storage failures remain truthful. Do not strip documentation, code comments, the QA panel or review controls of necessary technical context. Delivery documentation was authorized on 6 October 2026.

## Activation flow: matching directional arrow motion

- **ID:** `start-action-arrows`
- **Disposition:** Current · Implemented in QA
- **Scope:** start
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/start)

The same source-style 150ms arrow nudge now covers purchase-code entry, review, profile setup, back links, QR download, full-guide and account handoffs. Forward/back arrows move 4px in their direction; diagonal and download arrows follow their own direction.

Hover, keyboard focus and press are supported; disabled/loading controls do not animate, and reduced motion leaves arrows static. Check my code rebuilds the correct SVG arrow after loading or errors. The arrow motion is retained through the later focused redesign, whose larger typography and inline flow supersede the original layout.

Files: `qa/start.js`, `qa/start.css`, `qa/start-profile.js`, `qa/start-profile.css`, `qa/start-changelog.md`, `qa/assets/start-brand-mark.png`, `qa/assets/start-demo-qr.png`

## Expanded modal builder

- **ID:** `modal-builder`
- **Disposition:** Current · Interactive tool
- **Scope:** modals
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/modals)

Eight types, 60 Openline templates, 358 animated icons, 16 content-block types, custom images, one/two actions and real-page backdrop preview.

The builder keeps its own detailed HTML / Copy for Computer export for the active draft. Global export inventories the capability; export the modal draft separately when handing it off.

Files: `qa/modals.js`, `qa/modals.css`, `qa/modal-templates.js`, `qa/modal-illus.js`, `qa/icons-lib.js`

## Chat sidebar and AI handoffs

- **ID:** `chat-sidebar-ai`
- **Disposition:** Current · Interactive prototype
- **Scope:** chat
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/chat)

Full-height collapsed rail opens on any tap/click; rail arrow, expanded-panel arrow and header icon toggle it. Nine editable prompts and seven AI providers use real locally hosted logos/favicons.

Each AI opens a copy-and-handoff dialog, reports clipboard success/failure accurately and uses its official web interface via a new-tab HTTPS link. No prompt URL parameters or automatic transcript sharing; installed-app handling is device-dependent, not guaranteed.

Files: `qa/support/chat.js`, `qa/support/support.js`, `qa/support/support.css`, `qa/support/boot.js`, `qa/assets/ai/README.md`, `qa/assets/support-portraits/README.md`

## Fresh guest welcome and Clear chat

- **ID:** `chat-fresh-clear`
- **Disposition:** Current · Interactive prototype
- **Scope:** chat
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/chat)

Animated welcome icon and Gary’s How can I help you? greeting appear for a new guest or after confirmed Clear chat. Text, files, voice, local history and simulated replies remain.

Confirmation describes the intended live server deletion / issue-solved behaviour, with explicit QA-only disclosure. This demo clears only local history and attachments. Outstanding replies and recordings are cancelled so old content cannot return; backend deletion and ticket closure are not implemented.

Files: `qa/support/chat.js`, `qa/support/support.js`, `qa/support/support.css`, `qa/support/boot.js`, `qa/assets/ai/README.md`, `qa/assets/support-portraits/README.md`

## Chat: official mark and centred profile portraits

- **ID:** `chat-brand-portraits`
- **Disposition:** Current · Implemented in QA
- **Scope:** chat
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/chat)

The chat header, animated welcome and Gary avatar use the actual Openline mark already sourced for /start. Seven circular photo portraits form one centred row directly above Here to help you stay connected, in both the fresh welcome and conversation intro.

CC0 demo portraits are hosted locally and labelled illustrative, not actual staff identities or online availability. Their order is shuffled once when opening chat and remains stable through messages, replies and clearing. The row is centred within the conversation area, including when the side panel changes width. Gary’s brand avatar remains visible on mobile.

Files: `qa/support/chat.js`, `qa/support/support.js`, `qa/support/support.css`, `qa/support/boot.js`, `qa/assets/ai/README.md`, `qa/assets/support-portraits/README.md`

## Knowledge base and device checker

- **ID:** `help-modals`
- **Disposition:** Current · Interactive QA tools
- **Scope:** kb, chat, installation-guide, start
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa/kb)

Searchable help and compatibility modals use the included 2,737-article and 9,496-device datasets, shared launchers, keyboard controls and deep-link states.

Keep dataset provenance and refresh needs in the final handoff. Search results do not turn the separate chat or redemption prototypes into connected production services.

Files: `qa/support/support.js`, `qa/support/search.mjs`, `qa/support/minisearch.mjs`, `qa/support/md.js`, `qa/data/kb-articles.json`, `qa/data/devices.js`, `qa/kb.css`, `qa/support/chat.js`, `qa/support/support.css`, `qa/support/boot.js`, `qa/assets/ai/README.md`, `qa/assets/support-portraits/README.md`, `qa/redesign/installation-preflight.html`, `qa/installation-preflight.js`, `qa/installation-preflight.css`, `qa/start.js`, `qa/start.css`, `qa/start-profile.js`, `qa/start-profile.css`, `qa/start-changelog.md`, `qa/assets/start-brand-mark.png`, `qa/assets/start-demo-qr.png`

## Non-animation change reporting

- **ID:** `qa-reporting`
- **Disposition:** Current · Implemented in QA
- **Scope:** *
- **Review:** [Open affected view](https://openline-anims-review.vercel.app/qa#qa-changes)

Page panels show relevant changes and shared refinements, with persistent page-level notes. The hub lists every implemented item; Copy for Computer includes the full inventory and machine-readable v3 data.

Animation-pick deltas are counted separately from implemented refinements. Resets preserve page-level notes and this inventory. The authorized /delivery freezes these records and documents their source files; no chat transcripts or entered purchase codes are exported.
