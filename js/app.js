/* Optional prototype conveniences. There is no authentication or data persistence. */
const params=new URLSearchParams(location.search);
const squash=text=>text.toLowerCase().replace(/[\s·-]/g,'');

// Type-to-filter: admin tables and the gate's plate search (matches show while typing)
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

// Reader screen: confirm an undo or correction that just happened
const message=params.get('undone')
  ?`${params.get('undone')==='exit'?'Exit':'Entry'} undone${params.get('plate')?` · ${params.get('plate')}`:''}. Free slots are back as they were.`
  :params.has('corrected')?'Correction saved. Administrators can see it in parking history.':'';
if(message&&document.querySelector('.gate-shell')){
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
  links.innerHTML='<a href="screens.html">All screens</a><a href="guard.html">Gate screen</a><a href="mobile.html">Public availability</a>';
  footer.append(links);
}
if(document.querySelector('.public-main')){
  const links=document.createElement('p');links.className='prototype-tools';
  links.innerHTML='<a href="screens.html">All screens</a><a href="mobilefull.html">All-full example</a><a href="mobilestale.html">Out-of-date example</a>';
  document.querySelector('.public-main').append(links);
}
