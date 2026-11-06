const requested=new URLSearchParams(location.search).get('film')||location.hash.replace(/^#film-/,'');
if(requested&&/^[\w-]+$/.test(requested)){const entry=document.getElementById('film-'+requested)||document.querySelector('[data-film-ids~="'+requested+'"]');if(entry){if(entry.tagName==='DETAILS')entry.open=true;entry.scrollIntoView({block:'start'});}}
