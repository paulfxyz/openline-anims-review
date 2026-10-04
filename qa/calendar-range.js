/* Inclusive calendar-day arithmetic, independent of DST and elapsed hours. */
const DAY=86400000;
export const dayNumber=iso=>Date.parse(iso+'T00:00:00Z')/DAY;
export const dayISO=n=>new Date(n*DAY).toISOString().slice(0,10);
export const inclusiveDays=(a,b)=>b-a+1;
const date=n=>new Date(n*DAY);
const monthStart=n=>Date.UTC(date(n).getUTCFullYear(),date(n).getUTCMonth(),1)/DAY;
const monthMove=(n,offset)=>Date.UTC(date(n).getUTCFullYear(),date(n).getUTCMonth()+offset,1)/DAY;
const todayNumber=()=>{const d=new Date();return Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/DAY;};
const fmt=(n,options)=>new Intl.DateTimeFormat('en-GB',{...options,timeZone:'UTC'}).format(date(n));
const shortDate=n=>fmt(n,{day:'numeric',month:'short',year:'numeric'});
const fullDate=n=>fmt(n,{weekday:'long',day:'numeric',month:'long',year:'numeric'});
const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n);
const weekdays=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export function createRangeCalendar({element,getSelection,onApply,priceForDays,openDialog}){
  const $=s=>element.querySelector(s), narrow=matchMedia('(max-width:767px)');
  let today=todayNumber(), base=monthStart(today), start=null, end=null, focus=today, hover=null, mode='start';
  const count=()=>narrow.matches?1:2;
  const complete=()=>start!==null&&end!==null;
  const valid=()=>complete()&&start>=today&&inclusiveDays(start,end)>=1&&inclusiveDays(start,end)<=365;
  function ensureVisible(n){
    if(n<base)base=monthStart(n);
    else if(n>=monthMove(base,count()))base=monthStart(n);
    if(base<monthStart(today))base=monthStart(today);
  }
  function monthHTML(first,index){
    const d=date(first),y=d.getUTCFullYear(),m=d.getUTCMonth();
    const days=new Date(Date.UTC(y,m+1,0)).getUTCDate(),offset=d.getUTCDay();
    const weeks=Math.ceil((offset+days)/7),title=fmt(first,{month:'long',year:'numeric'});
    const rows=[];
    for(let row=0;row<weeks;row++){
      const cells=[];
      for(let col=0;col<7;col++){
        const num=row*7+col-offset+1;
        if(num<1||num>days){cells.push('<td role="gridcell" class="fuc-blank"></td>');continue;}
        const n=first+num-1,past=n<today;
        cells.push(`<td role="gridcell" aria-selected="false"><button type="button" class="fuc-day${n===today?' is-today':''}" data-fuc-day="${n}" data-date="${dayISO(n)}" aria-label="${fullDate(n)}${n===today?', today':''}" ${n===today?'aria-current="date"':''} tabindex="${n===focus&&!past?0:-1}" ${past?'disabled':''}><span>${num}</span></button></td>`);
      }
      rows.push(`<tr role="row">${cells.join('')}</tr>`);
    }
    return `<section class="fuc-month" aria-labelledby="fuc-month-${index}"><h3 id="fuc-month-${index}">${title}</h3><table role="grid" aria-label="${title}" aria-describedby="fuc-keyboard-help"><thead><tr role="row">${weekdays.map(w=>`<th role="columnheader" scope="col"><abbr title="${{Sun:'Sunday',Mon:'Monday',Tue:'Tuesday',Wed:'Wednesday',Thu:'Thursday',Fri:'Friday',Sat:'Saturday'}[w]}">${w}</abbr></th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></section>`;
  }
  function paintRange(){
    const candidate=end!==null?end:start!==null&&hover!==null?hover:start;
    const low=start!==null?Math.min(start,candidate):null,high=start!==null?Math.max(start,candidate):null;
    $('#fuc-months').querySelectorAll('[data-fuc-day]').forEach(b=>{
      const n=Number(b.dataset.fucDay),cell=b.parentElement,range=low!==null&&high>low&&n>=low&&n<=high;
      cell.classList.toggle('is-in-range',range);cell.classList.toggle('is-range-first',range&&n===low);cell.classList.toggle('is-range-last',range&&n===high);
      cell.classList.toggle('is-preview',range&&!complete());
      b.classList.toggle('is-start',n===start);b.classList.toggle('is-end',n===end);
      b.classList.toggle('is-preview-end',!complete()&&hover!==null&&n===hover&&hover!==start);
      cell.setAttribute('aria-selected',n===start||(complete()&&n>=start&&n<=end));
      b.setAttribute('aria-label',`${fullDate(n)}${n===today?', today':''}${n===start?', start date':''}${n===end?', end date':''}`);
    });
  }
  function summary(){
    $('#fuc-start-label').textContent=start===null?'Choose a date':shortDate(start);
    $('#fuc-end-label').textContent=end===null?'Choose a date':shortDate(end);
    $('#fuc-edit-start').setAttribute('aria-pressed',mode==='start'||mode==='edit-start');
    $('#fuc-edit-end').setAttribute('aria-pressed',mode==='end');$('#fuc-edit-end').disabled=start===null;
    $('#fuc-prev').disabled=base<=monthStart(today);$('#fu-date-apply').disabled=!valid();
    $('#fuc-instruction').textContent=complete()&&!valid()?'Choose up to 365 days in this preview.':mode==='end'?'Now choose your last day':mode==='edit-start'?'Choose a new start date':complete()?'Your dates are selected':'Choose your start date';
    const n=complete()?inclusiveDays(start,end):0;
    $('#fuc-duration').textContent=complete()?`${n}-day plan`:start===null?'Select your dates':'Select your last day';
    $('#fuc-quote-text').textContent=valid()?`${money(priceForDays(n))} USD total · ${money(priceForDays(n)/n)}/day · preview price`:complete()?'This preview supports a maximum of 365 days.':'Both the first and last day count.';
  }
  function render({focusDay=false}={}){
    $('#fuc-months').innerHTML=Array.from({length:count()},(_,i)=>monthHTML(monthMove(base,i),i)).join('');
    // One roving day tab stop across both grids, including after button navigation.
    if(!$('#fuc-months').querySelector('[data-fuc-day][tabindex="0"]')){
      focus=Math.max(base,today);$(`[data-fuc-day="${focus}"]`)?.setAttribute('tabindex','0');
    }
    paintRange();summary();
    if(focusDay)$(`[data-fuc-day="${focus}"]`)?.focus({preventScroll:true});
  }
  function choose(n){
    if(n<today)return;
    if(mode==='edit-start'&&end!==null){start=n;if(n>end){end=null;mode='end';}else mode='complete';}
    else if(start===null||mode==='start'||mode==='complete'){start=n;end=null;mode='end';}
    else {end=Math.max(start,n);start=Math.min(start,n);mode='complete';}
    hover=null;focus=n;render({focusDay:true});
  }
  $('#fuc-months').addEventListener('click',e=>{const b=e.target.closest('[data-fuc-day]');if(b&&!b.disabled)choose(Number(b.dataset.fucDay));});
  $('#fuc-months').addEventListener('pointerover',e=>{
    if(e.pointerType!=='mouse'||mode!=='end'||start===null||end!==null)return;
    const b=e.target.closest('[data-fuc-day]');if(b&&!b.disabled){hover=Number(b.dataset.fucDay);paintRange();}
  });
  $('#fuc-months').addEventListener('pointerleave',()=>{hover=null;paintRange();});
  $('#fuc-months').addEventListener('focusin',e=>{
    const b=e.target.closest('[data-fuc-day]');if(!b)return;
    focus=Number(b.dataset.fucDay);
    $('#fuc-months').querySelectorAll('[data-fuc-day]').forEach(x=>x.tabIndex=x===b?0:-1);
  });
  $('#fuc-months').addEventListener('keydown',e=>{
    const b=e.target.closest('[data-fuc-day]');if(!b)return;
    const n=Number(b.dataset.fucDay);let target=n;
    if(e.key==='ArrowLeft')target--;
    else if(e.key==='ArrowRight')target++;
    else if(e.key==='ArrowUp')target-=7;
    else if(e.key==='ArrowDown')target+=7;
    else if(e.key==='Home')target-=date(n).getUTCDay();
    else if(e.key==='End')target+=6-date(n).getUTCDay();
    else if(e.key==='PageUp'||e.key==='PageDown'){
      const offset=(e.key==='PageUp'?-1:1)*(e.shiftKey?12:1),m=monthMove(monthStart(n),offset);
      target=m+Math.min(date(n).getUTCDate(),monthMove(m,1)-m)-1;
    }else return;
    e.preventDefault();focus=Math.max(today,target);ensureVisible(focus);hover=mode==='end'&&end===null?focus:null;render({focusDay:true});
  });
  $('#fuc-prev').addEventListener('click',()=>{base=Math.max(monthStart(today),monthMove(base,-1));hover=null;render();});
  $('#fuc-next').addEventListener('click',()=>{base=monthMove(base,1);hover=null;render();});
  $('#fuc-clear').addEventListener('click',()=>{start=end=hover=null;mode='start';focus=Math.max(base,today);render();});
  $('#fuc-edit-start').addEventListener('click',()=>{mode=complete()?'edit-start':'start';hover=null;if(start!==null){focus=start;ensureVisible(focus);}render({focusDay:true});});
  $('#fuc-edit-end').addEventListener('click',()=>{mode='end';hover=null;focus=end??start??today;ensureVisible(focus);render({focusDay:true});});
  $('#fu-date-apply').addEventListener('click',()=>{
    if(!valid())return;
    onApply(dayISO(start),dayISO(end),inclusiveDays(start,end));
    element.close();
  });
  narrow.addEventListener('change',()=>{if(element.open){ensureVisible(focus);render();}});
  return {
    open(){
      today=todayNumber();const selected=getSelection();
      start=selected?dayNumber(selected[0]):null;end=selected?dayNumber(selected[1]):null;
      if(start!==null&&(!Number.isInteger(start)||start<today||!Number.isInteger(end)||end<start)){start=end=null;}
      hover=null;mode=complete()?'complete':'start';focus=start??today;base=monthStart(focus);
      render();openDialog(element);
      $(`[data-fuc-day="${focus}"]`)?.focus({preventScroll:true});
    },
  };
}
