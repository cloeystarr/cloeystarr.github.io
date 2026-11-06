// Video entries must identify a verified upload on Chloe’s YouTube channel.
// Missing IDs never fall back to local video files or another channel.
fetch('media.json').then(r=>r.json()).then(entries=>{
 for(const entry of entries){
  const figure=document.querySelector('[data-video-entry="'+entry.id+'"]');
  if(!figure || !/^[A-Za-z0-9_-]{11}$/.test(entry.youtube_id||''))continue;
  const image=figure.querySelector('img');
  const button=document.createElement('button');button.type='button';button.className='youtube-facade';
  button.setAttribute('aria-label','Play '+entry.title);image.replaceWith(button);button.append(image);
  const label=document.createElement('span');label.textContent='▶';label.setAttribute('aria-hidden','true');button.append(label);
  figure.querySelector('.upload-pending')?.remove();
  button.addEventListener('click',()=>{
   const iframe=document.createElement('iframe');iframe.src='https://www.youtube-nocookie.com/embed/'+entry.youtube_id+'?autoplay=1&playsinline=1';
   iframe.title=entry.title;iframe.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';iframe.allowFullscreen=true;
   iframe.referrerPolicy='strict-origin-when-cross-origin';iframe.className='youtube-player';button.replaceWith(iframe);iframe.focus();
  },{once:true});
 }
});
const incoming = new URLSearchParams(location.search);
const originFilm = incoming.get('film') || '';
if (incoming.get('from') === 'events' && /^[A-Za-z0-9_-]{1,30}$/.test(originFilm)) {
  for (const link of document.querySelectorAll('a[href="/#events"]')) {
    link.href = '/?film=' + encodeURIComponent(originFilm) + '#events';
    link.textContent = 'Back to this event film';
  }
}
