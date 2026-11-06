"""Events presentation from original film records; no upload or publication actions."""
from pathlib import Path
import json,re,html,subprocess
from brand_system import HEADER,BRAND_CSS
ROOT=Path(__file__).resolve().parents[1]
E=lambda x:html.escape(str(x),quote=True)
data=json.loads(subprocess.check_output(['node','scripts/export-editorial.cjs'],cwd=ROOT)); films=data['films']; posts={p['id']:p for p in data['posts']}
override_path=ROOT/'content/event-publications.json'
overrides=json.loads(override_path.read_text())if override_path.exists()else{}
for f in films:
 f['legacy_id']=f.get('youtube')or f.get('x')or f.get('id')
 f.update(overrides.get(f.get('article'),{}))
 f['aliases']=' '.join(str(v)for v in [f.get('youtube'),f.get('x'),f.get('id')]if v)
# Newest event first; for events on the same day, newest film release leads.
films.sort(key=lambda f:(f['date'],f.get('published_on',f['date'])),reverse=True)
def display_title(f):return html.unescape(f['title']).replace(' | ',' · ')
def player(f):
 if f.get('youtube'):
  assert re.fullmatch(r'[\w-]{11}',f['youtube'])
  return '<div class="event-player"><button class="youtube-facade" data-youtube-id="'+f['youtube']+'" aria-label="Play '+E(display_title(f))+'"><img src="'+E(f['poster'])+'" alt="'+E(display_title(f))+'" loading="lazy"><span aria-hidden="true">▶</span></button></div>'
 return '<a class="original-release" href="https://x.com/cloeystarr/status/'+f['x']+'">Watch the original film on X ↗</a>'
def credits(f):return '<details class="event-credits"><summary>Credits &amp; original releases</summary>'+f.get('notes','')+('<p><a href="https://www.youtube.com/watch?v='+f['youtube']+'">YouTube edition</a></p>'if f.get('youtube')else'')+('<p><a href="https://x.com/cloeystarr/status/'+f['x']+'">Original X release</a></p>'if f.get('x')else'')+'</details>'
def story(f):return '<a class="production-link" href="/journal/'+f['article']+'/?from=events&amp;film='+E(str(f['legacy_id']))+'">Read the Portals story →</a>'if f.get('article')else''
def date(f):return '<p class="eyebrow"><time datetime="'+f['date']+'">'+E(f['display'])+'</time></p>'
# Keep original poster records intact; this wide released-film frame is a presentation choice.
featured=dict(films[0])
if featured.get('article')=='content-can-be-liquid-too':featured['poster']='/assets/editorial/halloween-2026/4a11c9d7-halloween-spin-start.webp'
feature='<section class="event-feature" id="film-'+str(featured['legacy_id'])+'" data-film-ids="'+E(featured['aliases'])+'" aria-label="Featured event film"><div class="event-heading">'+date(featured)+'<h2>'+E(display_title(featured))+'<span class="punctuation">.</span></h2></div>'+player(featured)+'<div class="event-after"><p>'+E(featured.get('byline','Film by Chloe Starr, with Chris Starr AI.'))+'</p>'+story(featured)+'</div>'+credits(featured)+'</section>'
selections=[]
for f in films[1:4]:
 selections.append('<article class="event-selection" id="film-'+str(f['legacy_id'])+'" data-film-ids="'+E(f['aliases'])+'">'+player(f)+date(f)+'<h3>'+E(display_title(f))+'</h3>'+story(f)+credits(f)+'</article>')
archive=[]
for f in films[4:]:
 archive.append('<details class="event-archive-entry" id="film-'+str(f['legacy_id'])+'" data-film-ids="'+E(f['aliases'])+'"><summary><time datetime="'+f['date']+'">'+E(f['display'])+'</time><span>'+E(display_title(f))+'</span></summary><div class="event-archive-content">'+player(f)+story(f)+credits(f)+'</div></details>')
page='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#101923"><title>Events — Field Films by Chloe Starr</title><meta name="description" content="Event films and field notes by Chloe Starr, from San Francisco gatherings, concerts and creative encounters."><link rel="canonical" href="https://chloestarr.me/events/"><link rel="stylesheet" href="'+BRAND_CSS+'"><link rel="stylesheet" href="/assets/editorial/events.css"></head><body><a class="skip" href="#main">Skip to films</a>'+HEADER+'<main id="main" class="events"><div class="events-mast"><p>Field films by Chloe Starr</p><h1>Events<span class="punctuation">.</span></h1></div>'+feature+'<section class="event-selections" aria-label="More event films">'+''.join(selections)+'</section><section class="event-archive" aria-labelledby="archive-title"><h2 id="archive-title">Earlier films<span class="punctuation">.</span></h2>'+''.join(archive)+'</section></main><footer class="site-footer"><a href="https://www.linkedin.com/in/chloestarrai/">Collaborations &amp; contact ↗</a><a href="https://www.youtube.com/@TheCloeystarr">YouTube</a><a href="https://ompom.ai">ompom.ai ↗</a></footer><script src="/assets/editorial/portals-system.js"></script><script src="/assets/editorial/events.js"></script></body></html>'
p=ROOT/'events/index.html';p.parent.mkdir(exist_ok=True);p.write_text(page)
print('Preserved',len(films),'event films;',sum(bool(f.get('youtube'))for f in films),'YouTube editions.')
