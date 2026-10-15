/* Optional prototype conveniences. There is no authentication or data persistence. */
document.querySelectorAll('[data-search]').forEach(input=>{
  input.addEventListener('input',()=>{
    const query=input.value.trim().toLowerCase();
    document.querySelectorAll('main tbody tr').forEach(row=>{row.hidden=!row.textContent.toLowerCase().includes(query);});
  });
});
const params=new URLSearchParams(location.search);
// Gate dashboard quick search arrives as ?q=
const searchInput=document.querySelector('[data-search]');
if(searchInput&&params.get('q')){
  searchInput.value=params.get('q');
  searchInput.dispatchEvent(new Event('input'));
}
// Entry: keep the slot preview and confirm label in step with the chosen area.
document.querySelectorAll('[data-entry-form]').forEach(form=>{
  const impact=form.querySelector('[data-entry-impact]'),submit=form.querySelector('[data-entry-submit]');
  form.addEventListener('change',()=>{
    const choice=form.querySelector('input[name="area"]:checked');
    if(!choice)return;
    const free=Number(choice.dataset.free);
    impact.innerHTML=`${choice.value} will go from <b>${free}</b> to <b>${free-1}</b> free.`;
    submit.textContent=`Record entry · ${choice.value}`;
  });
});
// Entry recorded: show the area the guard chose (sample counts).
const SAMPLE_AREAS={'Area A':{free:30,total:100},'Area B':{free:40,total:80}};
const chosenArea=SAMPLE_AREAS[params.get('area')];
if(chosenArea&&document.querySelector('[data-area-free]')){
  const free=chosenArea.free-1;
  document.querySelectorAll('[data-area-name]').forEach(el=>{el.textContent=params.get('area');});
  document.querySelector('[data-area-free]').textContent=free;
  document.querySelector('[data-area-was]').textContent=chosenArea.free;
  document.querySelector('[data-area-total]').textContent=chosenArea.total;
  document.querySelector('[data-area-meter]').style.setProperty('--value',Math.round((chosenArea.total-free)/chosenArea.total*100)+'%');
}
const footer=document.querySelector('.footer');
if(footer){
  const links=document.createElement('div');links.className='prototype-tools';
  links.innerHTML='<a href="screens.html">All 22 screens</a><a href="mobile.html">Public availability</a><a href="exceptions.html">Gate exceptions</a>';
  footer.append(links);
}
if(document.querySelector('.public-main')){
  const links=document.createElement('p');links.className='prototype-tools';
  links.innerHTML='<a href="screens.html">All screens</a><a href="mobilefull.html">Full-capacity example</a>';
  document.querySelector('.public-main').append(links);
}
