/* Optional prototype conveniences. There is no authentication or data persistence. */
const params=new URLSearchParams(location.search);
const squash=text=>text.toLowerCase().replace(/[\s·-]/g,'');

// Type-to-filter: admin tables and the guard's plate search (matches show while typing)
document.querySelectorAll('[data-search]').forEach(input=>{
  const count=document.querySelector('[data-match-count]');
  const run=()=>{
    const query=squash(input.value);
    let shown=0,best=null;
    document.querySelectorAll('main tbody tr, [data-search-item]').forEach(item=>{
      const hit=squash(item.textContent).includes(query);
      item.hidden=!hit;
      item.classList.remove('is-best');
      if(hit){shown++;best=best||item;}
    });
    if(best&&best.matches('[data-search-item]'))best.classList.add('is-best');
    if(count)count.textContent=query?(shown===1?'1 match':`${shown} matches`):'Registered vehicles';
  };
  if(params.get('q'))input.value=params.get('q');
  input.addEventListener('input',run);
  run();
});

// Screens that name a record from the link (e.g. removevehicle.html?plate=…&owner=…)
document.querySelectorAll('[data-param]').forEach(el=>{
  const value=params.get(el.dataset.param);
  if(value)el.textContent=value;
});

// Skip links move focus without changing the #state some screens use
document.querySelectorAll('.skip-link').forEach(link=>link.addEventListener('click',event=>{
  const target=document.querySelector(link.getAttribute('href'));
  if(!target)return;
  event.preventDefault();
  if(!target.hasAttribute('tabindex'))target.setAttribute('tabindex','-1');
  target.focus();
}));

// Keep the vehicle a screen was opened for when moving to the next screen
const CARRY=['plate','owner','type','area'];
document.querySelectorAll('a[data-carry]').forEach(link=>{
  const url=new URL(link.getAttribute('href'),location.href);
  CARRY.forEach(key=>{if(params.has(key)&&!url.searchParams.has(key))url.searchParams.set(key,params.get(key));});
  link.href=url.href;
});
document.querySelectorAll('a[data-q-from-plate]').forEach(link=>{
  if(!params.get('plate'))return;
  const url=new URL(link.getAttribute('href'),location.href);
  url.searchParams.set('q',params.get('plate'));
  link.href=url.href;
});

// Search by plate: the guard's Entry/Exit choice arrives as ?flow= and only that flow's button shows
const flow=params.get('flow');
if(flow==='entry'||flow==='exit'){
  document.querySelectorAll('[data-start]').forEach(button=>{button.hidden=button.dataset.start!==flow;});
  const label=document.querySelector('[data-flow-label]');
  if(label){label.textContent=flow==='entry'?'Vehicle entry':'Vehicle exit';label.classList.add(flow);label.hidden=false;}
  document.querySelectorAll('[data-flow-back]').forEach(link=>{link.href=`guard.html#${flow}-mode`;});
}
// Entry is refused when every area is full
const results=document.querySelector('[data-areas-full]');
if(results&&(results.dataset.areasFull==='true'||params.get('full')==='1')){
  document.querySelectorAll('[data-start="entry"]').forEach(button=>{button.href='exceptions.html#no-parking';});
}
// Reader screen: the "No ID? Search plate" tile follows the open Entry or Exit panel
const searchTile=document.querySelector('[data-search-tile]');
if(searchTile){
  const syncTile=()=>{
    const mode=location.hash.match(/^#(entry|exit)-mode$/);
    searchTile.href=mode?`search.html?flow=${mode[1]}`:'search.html';
  };
  syncTile();
  addEventListener('hashchange',syncTile);
}

// Exit recorded: the area the vehicle left gets one slot back (sample counts)
const EXIT_FREE={'Area A':30,'Area B':41};
const exitFree=document.querySelector('[data-exit-free]');
if(exitFree&&params.get('area') in EXIT_FREE)exitFree.textContent=EXIT_FREE[params.get('area')];

// Entry recorded: show the area the guard pressed (sample counts)
const SAMPLE_AREAS={'Area A':30,'Area B':40};
const chosenArea=params.get('area');
if(chosenArea in SAMPLE_AREAS){
  document.querySelectorAll('[data-area-name]').forEach(el=>{el.textContent=chosenArea;});
  document.querySelectorAll('[data-area-free]').forEach(el=>{el.textContent=SAMPLE_AREAS[chosenArea]-1;});
}

// Done screens: count down to the automatic return (the page's meta refresh does the return)
const countdown=document.querySelector('[data-countdown]');
if(countdown){
  let left=Number(countdown.textContent);
  const tick=setInterval(()=>{
    left-=1;
    countdown.textContent=Math.max(left,0);
    if(left<=0)clearInterval(tick);
  },1000);
}

// Reader screen: confirm a correction that was just saved
const message=params.has('corrected')?'Record corrected. Free slots are updated.':'';
if(message&&document.querySelector('.guard-shell')){
  const toast=document.createElement('p');
  toast.className='toast';
  toast.setAttribute('role','status');
  toast.textContent=message;
  document.body.append(toast);
  setTimeout(()=>toast.remove(),6000);
}

// Help panel opens with #help; Escape closes it
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&location.hash==='#help')location.hash='';
});

// History quick filters
const chips=document.querySelectorAll('[data-chip]');
const applyChip=chip=>{
  chips.forEach(c=>c.setAttribute('aria-pressed',String(c===chip)));
  const filter=chip.dataset.chip;
  document.querySelectorAll('main tbody tr').forEach(row=>{
    const match=filter==='all'||(row.dataset.status||'').split(' ').includes(filter);
    row.toggleAttribute('data-chip-hidden',!match);
  });
};
chips.forEach(chip=>chip.addEventListener('click',()=>applyChip(chip)));
const preset=[...chips].find(chip=>chip.dataset.chip===params.get('show'));
if(preset)applyChip(preset);

// Prototype links
const footer=document.querySelector('.footer');
if(footer){
  const links=document.createElement('div');links.className='prototype-tools';
  links.innerHTML='<a href="screens.html">All screens</a><a href="guard.html">Guard screen</a><a href="mobile.html">Public availability</a>';
  footer.append(links);
}
if(document.querySelector('.public-main')){
  const links=document.createElement('p');links.className='prototype-tools';
  links.innerHTML='<a href="screens.html">All screens</a><a href="mobilefull.html">All-full example</a>';
  document.querySelector('.public-main').append(links);
}
