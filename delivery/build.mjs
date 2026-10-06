// Rebuild generated delivery metadata/docs and freeze the animation dependencies.
// Usage from repository root: node delivery/build.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import {SOURCE_MAP,PAGE_FILES} from './source-map.mjs';
import {QA_CHANGES} from '../qa/change-log.js';
import {buildChecklist} from './checklist-build.mjs';
const root=path.resolve(import.meta.dirname,'..'), out=path.join(root,'delivery');
const raw=JSON.parse(await fs.readFile(path.join(out,'baseline.json'),'utf8'));
const absolute=p=>'https://openline-anims-review.vercel.app'+p;
const safe=s=>String(s).replaceAll('|','\\|').replaceAll('\n',' ');
const historical=c=>/Rejected|Superseded/.test(c.status);
const animations=raw.animations.map(a=>{
  const [module,exp]=SOURCE_MAP[a.key];
  const vb=a.viewBox.split(/\s+/).map(Number);
  const diff=Math.abs((vb[2]/vb[3])/(a.slot.w/a.slot.h)-1);
  const decision=a.opt===0?'Keep current':a.key==='blogv'?'Retained alternative, shared Blog slot':a.key==='blog'?'Current Blog default; shared-slot decision remains':'Selected direction';
  const {initPreview,pills,...rest}=a;
  return {...rest,module,export:exp,decision,fitReview:diff>=.03,
    fitNote:diff>=.03?'Native artwork and destination slot differ. QA context-fit is included; validate in the final responsive component, never stretch.':'Native geometry closely matches the measured slot. Check responsive label size and companion pills.',
    source:`js/${module}`,runtime:`delivery/runtime/js/${module}`,preview:`/delivery/preview.html?key=${a.key}`,
    guide:`delivery/items/${a.key}.md`,
    identity:raw.styles[a.page]?.name||'As shipped'};
});
const pages=raw.pages.map(p=>({...p,route:`/qa/${p.slug}`,file:`qa/${p.slug}.html`,files:[`qa/${p.slug}.html`,...(PAGE_FILES[p.slug]||[])],
  changeIds:QA_CHANGES.filter(c=>c.pages.includes(p.slug)||c.pages.includes('*')).map(c=>c.id),
  kind:p.redesignOf?'Retained alternative':p.standaloneRedesign?'Campaign concept':p.standaloneRefinement?'Original-template refinement':'Contextual page'}));
const extras=[
  {slug:'start',title:'Activate a plan',route:'/qa/start',kind:'Activation + gift sender',file:'qa/start.html'},
  {slug:'recipient',title:'Receive a gifted eSIM',route:'/qa/start?recipient=1',kind:'Recipient journey',file:'qa/start.html'},
  {slug:'chat',title:'Support chat',route:'/qa/chat',kind:'Interactive support concept',file:'qa/chat.html'},
  {slug:'kb',title:'Knowledge base + device checker',route:'/qa/kb',kind:'Help tools',file:'qa/kb.html'},
  {slug:'modals',title:'Modal builder',route:'/qa/modals',kind:'Design tool',file:'qa/modals.html'},
].map(p=>({...p,files:[p.file,...(PAGE_FILES[p.slug==='recipient'?'start':p.slug]||[])],changeIds:QA_CHANGES.filter(c=>c.pages.includes(p.slug==='recipient'?'start':p.slug)||c.pages.includes('*')).map(c=>c.id)}));
const changes=QA_CHANGES.map(c=>({...c,disposition:historical(c)?'History':c.id.startsWith('delivery-')&&!['delivery-release','delivery-checklist'].includes(c.id)?'Irina task':/Review options|QA alternative|Campaign draft/.test(c.status)?'Retained / review':'Current',
  files:[...new Set(c.pages.filter(p=>p!=='*').flatMap(p=>PAGE_FILES[p]||[`qa/${p}.html`]))]}));
const manifest={release:'2026-10-06-r2',qaSourceCommit:'b32598f579f45ac0514c81ed64c87e07970de587',verifiedAt:'2026-10-06',verification:'Saved Comet choice and QA decision keys checked; no QA overrides; no customer codes or chat contents collected.',
  counts:{choices:animations.length,pages:pages.length,tools:4,extraEntries:extras.length,changes:changes.length},
  decisions:{theme:'original',qaOverrides:{},pageStyleOverrides:{},sharedSlotOverrides:{},blogDefault:'blog',blogAlternative:'blogv',retainCurrent:'pluskyc'},
  styles:raw.styles,animations,pages,extras,changes};
const checklist=buildChecklist(manifest,await fs.readFile(path.join(out,'acceptance.md'),'utf8'));
manifest.counts.checklist=checklist.tasks.length;
await fs.writeFile(path.join(out,'checklist-data.json'),JSON.stringify(checklist,null,2)+'\n');
await fs.mkdir(path.join(out,'items'),{recursive:true});
await fs.mkdir(path.join(out,'runtime/helpers'),{recursive:true});
await fs.cp(path.join(root,'js'),path.join(out,'runtime/js'),{recursive:true});
for(const f of ['animation-fixes.js','paint.js','recolor.js','typography.css','anim.css'])
  await fs.copyFile(path.join(root,'qa',f),path.join(out,'runtime/helpers',f));
const qaJs=await fs.readFile(path.join(root,'qa/qa.js'),'utf8');
const fit=qaJs.slice(qaJs.indexOf('function fitArt('),qaJs.indexOf('/* Height follows width'));
await fs.writeFile(path.join(out,'runtime/helpers/fit.js'),'// Frozen verbatim from qa/qa.js at delivery build.\nexport '+fit);
await fs.writeFile(path.join(out,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
const ledger=['# Openline full change ledger','','Release 2026-10-06-r2. Historical records retain rejected/superseded labels; do not implement them. Additional Irina tasks are requests, not completed QA changes.',''];
const copy=['# Openline wording and small-change inventory','','Apply current consolidated copy with the related layout, colour and interaction changes. Superseded records are historical; the complete implementation context is in the full ledger.',''];
for(const c of changes){
  ledger.push(`## ${c.title}`,'',`- **ID:** \`${c.id}\``,`- **Disposition:** ${c.disposition} · ${c.status}`,`- **Scope:** ${c.pages.join(', ')}`,`- **Review:** [Open affected view](${absolute(c.route)})`,'',c.summary,'',c.delivery,'');
  if(c.files.length) ledger.push('Files: '+c.files.map(f=>`\`${f}\``).join(', '),'');
  if(c.changelogUrl) ledger.push(`[Detailed scoped changelog](${absolute(c.changelogUrl)})`,'');
  const lines=[];
  for(const x of c.copyChanges||[]) lines.push(`### ${x.area}`,'',`Before: ${x.before}`,'',`After: ${x.after}`,'');
  for(const x of c.newCopy||[]) lines.push(`### ${x.area}`,'',x.text,'');
  ledger.push(...lines);
  if(lines.length)copy.push(`## ${c.title}`,'',`Disposition: ${c.disposition}. [Context](${absolute(c.route)})`,'',...lines);
}
await fs.writeFile(path.join(out,'change-ledger.md'),ledger.join('\n'));
copy.push('## Smaller changes without before/after strings','','Native typography, larger text, spacing, locked results, code/QR distinction, button/icon alignment, channel destinations, renamed Clear chat, no customer demo notices and all new Irina requests are recorded in the full ledger. Do not limit implementation to this string diff.','');
await fs.writeFile(path.join(out,'copy-changes.md'),copy.join('\n'));
const matrix=['# Openline page-by-page implementation matrix','','Use these files and the linked records together. The complete source pack preserves their dependencies; do not treat a captured HTML file as a production application.',''];
for(const p of [...pages,...extras]){
  const own=changes.filter(c=>c.pages.includes(p.slug==='recipient'?'start':p.slug)&&c.disposition!=='History');
  matrix.push(`## ${p.title}`,'',`[Working QA view](${absolute(p.route)}) · ${p.kind}`,'','### Import files','',...p.files.map(f=>`- \`${f}\``),'','### Apply and verify','',
    ...own.map(c=>`- **${c.id}:** ${c.summary}`));
  const picks=animations.filter(a=>a.page===(p.redesignOf||p.slug));
  if(picks.length)matrix.push('',`Animation keys: ${picks.map(a=>`\`${a.key}\` (${a.opt}: ${a.name})`).join(', ')}.`);
  if(!own.length)matrix.push('- Preserve surrounding source content; apply selected slot replacements where listed and shared typography/fit rules. No unlisted full-page redesign is approved.');
  matrix.push('','Shared typography, context fit and production acceptance checks apply. Review the full ledger for detailed copy and backend boundaries.','');
}
await fs.writeFile(path.join(out,'page-matrix.md'),matrix.join('\n'));
const select=['# Selected Openline animations','','30 submitted picks, including one keep-current entry and a retained Blog alternative sharing its slot. IDs below are the frozen selection contract.','','| Key | Option | Choice | Context | Decision |','| --- | --- | --- | --- | --- |'];
for(const a of animations){
  select.push(`| ${a.key} | ${a.opt} | ${safe(a.name)} | ${a.page} / ${safe(a.section)} | ${a.decision} |`);
  const s=['# '+a.name,'',`${a.key} · option ${a.opt} · ID \`${a.id}\` · ${a.decision}`,'',
    `[Isolated preview](${absolute(a.preview)}) · [In-context QA](${absolute('/qa/'+a.page)})`,'',
    '## Files','',`- Original: \`${a.source}\`, export \`${a.export}\`.`,`- Frozen: \`${a.runtime}\`.`,`- Entry point: \`delivery/runtime/mount.js\`, key \`${a.key}\`.`,
    '- Copy the whole runtime directory plus manifest; shared relative imports and init closures are required.','',
    '## Fit and identity','',`Native viewBox: \`${a.viewBox}\`. Measured slot: ${a.slot.w} × ${a.slot.h}. Identity: ${a.identity}.`,a.fitNote,'',
    '## Mount','', '```js',`const control = await mountAnimation(element, '${a.key}');`,'// control.setPaused(true); control.dispose();','```','',
    '## Integration checks','','Keep native Openline typography, unique SVG IDs and lifecycle cleanup. Check desktop/mobile, reduced motion, pause, pills and surrounding padding. Illustration labels/counts/prices are presentation fixtures unless wired to real data; reconcile claims with the current connectivity copy. Do not copy reviewer controls or treat this artwork as a working network/provisioning integration.',''];
  await fs.writeFile(path.join(out,'items',a.key+'.md'),s.join('\n'));
}
await fs.writeFile(path.join(out,'selections.md'),select.join('\n')+'\n');
console.log(JSON.stringify(manifest.counts));
