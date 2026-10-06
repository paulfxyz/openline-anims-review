import crypto from 'node:crypto';
const hash=s=>crypto.createHash('sha256').update(s).digest('hex').slice(0,12);
export function buildChecklist(manifest,acceptance) {
  const tasks=[];
  const add=t=>tasks.push({...t,id:t.id||`${t.type}:${hash(t.title)}`});
  for(const a of manifest.animations){
    const review=a.opt===0||a.key==='blogv';
    add({id:'animation:'+a.key,type:'Animations',pages:[a.page],title:a.key==='blogv'?'Confirm the retained Blog alternative: The Long Read':a.opt===0?'Retain current Openline+ KYC illustration':`Import ${a.name} · option ${a.opt}`,description:review?a.decision+'. Record the decision without introducing a second illustration into the same slot.':`Apply the selected ${a.name} animation in ${a.section}, with ${a.identity} identity. ${a.fitNote}`,route:'/qa/'+a.page,doc:'items/'+a.key+'.md',files:[a.runtime],review});
  }
  for(const c of manifest.changes.filter(c=>c.disposition!=='History'&&c.id!=='delivery-release'&&c.id!=='delivery-checklist')){
    const review=['page-browser','qa-reporting','modal-builder'].includes(c.id);
    add({id:'change:'+c.id,type:c.disposition==='Irina task'?'Additional requests':'Blocks & interactions',pages:c.pages,title:c.title,description:c.summary+' '+c.delivery,route:c.route,files:c.files,review});
  }
  // Track the current after-values, not every historical revision of a sentence.
  // The earlier long profile-explainer wording is superseded by compact-profile-explainer.
  const wording=new Map();
  for(const c of manifest.changes.filter(c=>c.disposition!=='History'&&c.id!=='profile-switching-explainer')){
    for(const x of [...(c.copyChanges||[]).map(x=>({...x,text:x.after})),...(c.newCopy||[])]){
      const signature=c.pages.slice().sort().join('|')+'|'+x.text.trim();
      if(wording.has(signature)){wording.get(signature).records.push(c.id);continue;}
      wording.set(signature,{id:'copy:'+hash(signature),type:'Wording',pages:c.pages,title:x.area,description:x.text,before:x.before||'',route:c.route,records:[c.id],review:false});
    }
  }
  wording.forEach(add);
  for(const p of [...manifest.pages,...manifest.extras]){
    add({id:'page:'+p.slug,type:'Page & flow sign-off',pages:[p.slug==='recipient'?'start':p.slug],title:'Final review: '+p.title,description:`Review the entire ${p.title} view on desktop and mobile after applying its scoped items. Verify layout, wording, responsive spacing, button states, keyboard/focus and reduced motion. ${p.redesignOf?'This is a retained alternative; agree the final destination with Paul rather than shipping duplicate designs.':''} ${p.slug==='recipient'?'Verify locked, validation-pending and already-used gift states as well as the successful recipient path.':''} This sign-off does not mark any individual item automatically.`,route:p.route,files:p.files,review:true});
  }
  let heading='Final acceptance';
  for(const line of acceptance.split('\n')){
    if(line.startsWith('## '))heading=line.slice(3);
    if(line.startsWith('- [ ] ')){
      const text=line.slice(6).trim();
      add({id:'accept:'+hash(text),type:'Acceptance & handoff',pages:[heading.includes('Mobile')?'panel-cart-app':'*'],title:text,description:`${heading}. Confirm this in the actual destination build and include evidence in the progress report. Do not claim backend success based only on the presentation prototype.`,doc:'acceptance.md',review:true});
    }
  }
  const extra=[
    ['Panel polish','Improve the account overview, purchase history, profile cards, labels/folders, empty/loading/error states and shared UI consistency. Add useful character and motion without reducing clarity.'],
    ['Cart & checkout polish','Improve the cart, line items, order summary, totals, discounts where supported, payment selection, validation, loading and mobile layout. Cover empty cart, failed/pending payment, 3DS, retries, confirmation and receipt without promising unsupported payment methods.'],
    ['Mobile app polish','Carry the same Openline identity and interaction care into complete app journeys, not only isolated screens. Include purchase-code details, gifting, activation readiness, QR/manual information, setup and account return.'],
    ['Ready-to-build handoff for Kerem','Supply reusable components, assets, responsive rules, transition specifications, API-state annotations and complete happy/error/pending paths. Link the design source and state what still needs engineering.'],
  ];
  for(const [title,description] of extra)add({id:'extra:'+hash(title),type:'Additional requests',pages:['panel-cart-app'],title,description,doc:'brief.md',review:false});
  const ids=tasks.map(t=>t.id);
  if(new Set(ids).size!==ids.length)throw Error('Duplicate checklist IDs');
  return {schema:1,release:manifest.release,fingerprint:hash(ids.join('\n')),tasks,excludedHistory:manifest.changes.filter(c=>c.disposition==='History').map(c=>c.id),note:'Applied and verified are self-reported. No backend state or production approval is changed.'};
}
