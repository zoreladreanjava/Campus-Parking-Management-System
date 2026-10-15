/* Optional prototype conveniences. There is no authentication or data persistence. */
document.querySelectorAll('[data-search]').forEach(input=>{
  input.addEventListener('input',()=>{
    const query=input.value.trim().toLowerCase();
    document.querySelectorAll('main tbody tr').forEach(row=>{row.hidden=!row.textContent.toLowerCase().includes(query);});
  });
});
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
