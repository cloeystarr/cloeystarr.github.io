// Published editions only. No local-video fallback, social posting or release action.
for(const button of document.querySelectorAll('[data-youtube-id]')){
 button.addEventListener('click',()=>{
  const id=button.dataset.youtubeId;if(!/^[\w-]{11}$/.test(id))return;
  const frame=document.createElement('iframe');frame.src='https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&playsinline=1';frame.title=button.getAttribute('aria-label').replace(/^Play /,'');frame.className='youtube-player';frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';button.replaceWith(frame);frame.focus();
 },{once:true});
}
const incoming=new URLSearchParams(location.search),film=incoming.get('film');
if(incoming.get('from')==='events'&&/^[\w-]{1,30}$/.test(film||'')){
 for(const link of document.querySelectorAll('a[href="/#events"]')){link.href='/?film='+encodeURIComponent(film)+'#events';link.textContent='Back to this event film';}
}
const note=incoming.get('note');
if(note&&location.pathname==='/portals/'){
 const known=new Set(Array.from(document.querySelectorAll('a[href^="/journal/"]')).map(a=>a.getAttribute('href').split('/')[2]));const id=note==='memories-release'?'memories-preproduction':note;
 if(known.has(id))location.replace('/journal/'+encodeURIComponent(id)+'/');
}
