"""Build the private Portals retrofit from existing editorial records. No network or publishing.
Content stays in script.js/history-posts.js; this file owns editorial selections/presentation.
Halloween is already directed independently and is deliberately never regenerated here.
"""
from pathlib import Path
from html.parser import HTMLParser
from brand_system import HEADER
import html,json,re,subprocess,hashlib,sys
WEB=Path(__file__).resolve().parents[1]
E=lambda x:html.escape(str(x),quote=True)
def display_title(t):
 return E(t[:-1])+'<span class="punctuation">'+E(t[-1])+'</span>' if t.endswith(('.', '?', '!')) else E(t)+'<span class="punctuation">.</span>'
DATA=json.loads(subprocess.check_output(['node','scripts/export-editorial.cjs'],cwd=WEB))
POSTS=DATA['posts']; FILMS=DATA['films']; ORDER=sorted(POSTS,key=lambda p:p['iso'],reverse=True)
# Section selections are editorial decisions, not a universal length/template rule.
KEEP={
'first-a-heartbeat-animal-talk':['A poem can already be a room','Then the room becomes physical again'],
'who-gets-to-build-the-next-internet':['When the doorway belongs to someone else','Who are we building for?','Advice that travels between rooms','The room has its own timeline'],
'coffee-photographs-become-a-film':['Another artist’s world, with me inside it','A hand has to do something','The poem sets the length'],
'i-asked-ai-to-finish-my-film':['The film has to remain mine'],
'a-house-on-the-internet':['The house was already part of the story','Keep the person. Draw the world around her.'],
'memories-preproduction':['The poem is short. The decisions aren’t.'],
'out-to-play':['A conversation becomes a tool'],
'security-a-backpack-and-the-chainsmokers':['Security, again','Taste is an invitation','There are bell peppers in here','A song becomes our memory'],
'the-author-first-cut':['A voice needs somewhere to land','A first version, and a film to return to'],
'a-site-from-an-archive':['Choosing a public version'],
'the-missing-layer':['The layer around the model'],
'a-life-becomes-context':['The books are part of the scene','The room continues beyond the event'],
'three-infrastructure-nightmares':['What stays with me'],
'a-pipeline-is-not-a-folder':['What changed on screen?','The sound needed its own attention'],
'more-worlds-an-old-poem':['What can I make from what I already have?'],
'pixels-and-authorship':['Keep my perspective in the room'],
'the-films-leave-the-feed':['A film has more than a file','Make the collection visible'],
'builder-odyssey-world-worth-entering':['The film I was making was already in the room','Who am I making this for?'],
'open-together-making-a-field-film':['Open source has people around it'],
'codex-meetup-wrong-pin':['From the gathering to the cut'],
'a-business-card-in-a-manicure':['A very small place to make a world','The details keep changing','Then one nail became a link','A place for the gesture to go'],
'personal-agents-still-buffering':['From the gathering to the cut'],
'gray-area-beyond-the-interface':['An artwork and a product demo are different encounters'],
'waffles-before-the-week':['A little film does not need to become a keynote'],
'purple-curtains-and-a-poetry-recut':['The useful part can happen beside the program','A small film, with the room still in it'],
'four-rooms-one-agent-question':['Context needs permission as well as memory','A failure needs somewhere to go','A comparison is a beginning','Then the workflow meets the inference layer'],
'humans-under-a-disco-ball':['Another person’s camera can widen the night'],
'the-dresden-dolls-and-still-being-a-fan':['A song across two lives','A permission email from college','What it means to stay a fan'],
'before-the-software':['A quarter on the street','A room, and all the reasons you arrived']}
# Text-only edits below are status/edition corrections, not invented experience.
STATUS={
'memories-preproduction':'Where Do Memories Live is in progress. This dated account describes an earlier cut, not a newly finished film.',
'i-asked-ai-to-finish-my-film':'Film in progress. The earlier generated faces shown in the source notes are rejected attempts, not approved likenesses.',
'a-house-on-the-internet':'From October 2026. The white-site and linework choices described here are historical decisions, preserved as part of the work’s history.',
'purple-curtains-and-a-poetry-recut':'The film’s YouTube edition has not yet been verified. The original release remains linked in the source notes.',
 'the-author-first-cut':'An earlier released work, awaiting a verified YouTube edition. A new cut is not presented as finished.'}
VOID={'img','br','hr','input','meta','link','source','wbr','area','embed'}
class N:
 def __init__(self,t='',a=None,text=''):self.t=t;self.a=dict(a or []);self.text=text;self.c=[];self.parent=None
 def add(self,n):n.parent=self;self.c.append(n)
 def txt(self):return self.text if not self.t else ''.join(n.txt() for n in self.c)
 def find(self,test):return ([self] if test(self) else [])+sum((n.find(test)for n in self.c),[])
 def out(self):
  if not self.t:return html.escape(self.text,quote=False)
  attrs=''.join(' '+k+(('="'+E(v)+'"')if v is not None else '')for k,v in self.a.items());return '<'+self.t+attrs+'>'+(''if self.t in VOID else ''.join(n.out()for n in self.c)+'</'+self.t+'>')
class P(HTMLParser):
 def __init__(self,s):super().__init__(convert_charrefs=True);self.root=N('root');self.stack=[self.root];self.feed(s)
 def handle_starttag(self,t,a):
  n=N(t,a);self.stack[-1].add(n)
  if t not in VOID:self.stack.append(n)
 def handle_startendtag(self,t,a):self.handle_starttag(t,a);self.handle_endtag(t)
 def handle_endtag(self,t):
  for i in range(len(self.stack)-1,0,-1):
   if self.stack[i].t==t:self.stack=self.stack[:i];break
 def handle_data(self,d):self.stack[-1].add(N(text=d))
def src(x):return x if x.startswith(('https://','http://','/'))else '/'+x
FOOTER='''<footer class="site-footer"><a href="/portals/">All Portals stories</a><nav aria-label="Chloe elsewhere"><a href="https://x.com/cloeystarr">X</a><a href="https://www.instagram.com/cloeystarr/">Instagram</a><a href="https://www.instagram.com/cloeystarrai/">Agent Instagram</a><a href="https://www.linkedin.com/in/chloestarrai/">LinkedIn</a><a href="https://cloeystarr.substack.com">Substack</a><a href="https://cloeystarr.medium.com">Medium</a><a href="https://www.youtube.com/@TheCloeystarr">YouTube</a><a href="https://github.com/cloeystarr">GitHub</a></nav><a class="company-link" href="https://ompom.ai">ompom.ai ↗</a></footer>'''
def head(title,deck,url,image=''):
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#101923"><title>'+E(title)+' | Chloe Starr</title><meta name="description" content="'+E(deck)+'"><link rel="canonical" href="https://chloestarr.me'+url+'"><meta property="og:title" content="'+E(title)+'"><meta property="og:description" content="'+E(deck)+'"><meta property="og:url" content="https://chloestarr.me'+url+'"><meta property="og:type" content="'+('website'if url=='/portals/'else'article')+'"><meta name="twitter:card" content="summary_large_image">'+('<meta property="og:image" content="https://chloestarr.me'+E(src(image))+'">'if image and not image.startswith('https://')else'')+'<link rel="stylesheet" href="/assets/editorial/portals-system.css?v=retrofit1"></head><body><a class="skip" href="#main">Skip to content</a>'+HEADER

def facade(vid,title,poster,caption=''):
 return '<figure class="film-stage"><button class="youtube-facade" data-youtube-id="'+E(vid)+'" aria-label="Play '+E(title)+'"><img src="'+E(src(poster))+'" alt="'+E(title)+'"><span aria-hidden="true">▶</span></button><figcaption>'+E(title)+(' · '+caption if caption else '')+'</figcaption></figure>'
def clean(n,pid,media,unverified):
 # Drop embedded old player wrappers; all verified main films are staged once separately.
 if n.t=='video':
  unverified.append(n.a.get('src')or'local video');return ''
 if n.t=='iframe':
  m=re.search(r'(?:embed/)([\w-]{11})',n.a.get('src',''))
  if m and m[1] not in {'2eTSRR24aec'}:return facade(m[1],n.a.get('title','Film'),next(p['image']for p in POSTS if p['id']==pid))
  return ''
 if n.t in {'button','script'}:return ''
 classes=n.a.get('class','')
 if 'pom-player' in classes or 'editorial-film' in classes:
  for v in n.find(lambda z:z.t=='video'):unverified.append(v.a.get('src','local video'))
  return ''
 if n.t=='a' and re.search(r'\.(?:mp4|mov)(?:\?|$)',n.a.get('href','')):
  unverified.append(n.a['href']);return ''
 if n.t=='img':
  n.a.pop('style',None);n.a['loading']='lazy';n.a['src']=src(n.a.get('src',''));return n.out()
 if n.t in {'p','figcaption'} and not n.txt().strip():return ''
 if n.t:
  n.a.pop('style',None)
  if n.t not in {'a','img','time'}:n.a.pop('class',None)
  content=''.join(clean(c,pid,media,unverified)for c in n.c)
  if n.t in VOID:return '<'+n.t+''.join(' '+k+'="'+E(v or'')+'"'for k,v in n.a.items())+'>'
  if not re.sub('<[^>]*>','',content).strip() and '<img'not in content:return ''
  return '<'+n.t+''.join(' '+k+'="'+E(v or'')+'"'for k,v in n.a.items())+'>'+content+'</'+n.t+'>'
 return html.escape(n.text,quote=False)

AUDIT=[]
for post in ([] if "--index-only" in sys.argv else ORDER):
 pid=post['id']
 if pid=='content-can-be-liquid-too' or post.get('presentation')=='authored':continue
 body=P(post['body']).root
 source_links=[{'url':n.a['href'],'label':n.txt().strip(),'verification':'existing article source; not freshly verified'}for n in body.find(lambda n:n.t=='a' and n.a.get('href'))]
 films=[f for f in FILMS if f.get('article')==pid]
 media=[]
 for f in films:
  if f.get('youtube'):media.append({'youtube_id':f['youtube'],'title':html.unescape(f['title']),'poster':f.get('poster')or post['image'],'credits':f.get('notes','')})
 # Other original creative works and referenced trailer have existing channel records.
 if pid=='coffee-photographs-become-a-film':media=[{'youtube_id':'q_ddqO_WuOE','title':'Coffee','poster':post['image'],'credits':'Original photography: Katy Shayne. Poem, performance, voice and direction: Chloe Starr.'}]
 if pid=='the-dresden-dolls-and-still-being-a-fan':media.append({'youtube_id':'kzfz2G92PRw','title':'Deconstructing Paisley trailer','poster':'assets/editorial/paisley-chloe-trailer.jpg','credits':'Directed by Mike Mazzella; Chloe Starr as Paisley. Music permission described in the essay.'})
 sections=[('',[])]
 for n in body.c:
  if n.t in {'h2','h3'}:sections.append((n.txt().strip(),[]))
  else:sections[-1][1].append(n)
 main=[];notes=[];unverified=[];seen=set()
 for title,nodes in sections:
  selected=not title or title in KEEP.get(pid,[])
  chunks=[]
  for n in nodes:
   out=clean(n,pid,media,unverified)
   # Entire link-only distribution paragraphs belong with sources, never another CTA row.
   if n.t=='p' and n.find(lambda z:z.t=='a') and len(re.sub(r'<a\b.*?</a>','',out,flags=re.S).replace('<p>','').replace('</p>','').strip(' ·→↗'))<16:
    if out:notes.append(out)
    continue
   if out:chunks.append(out)
  rendered=(''if not title else '<h2>'+E(title)+'</h2>')+''.join(chunks)
  if chunks:(main if selected else notes).append(rendered)
 # Text-first for generic diagrams; historical brand artworks remain inside their dated story.
 diagram=post.get('image','').endswith('.svg')
 hero=''if media or diagram else '<figure class="work-image"><img src="'+E(src(post['image']))+'" alt="'+E(post.get('alt',''))+'"><figcaption>'+post.get('caption',post.get('alt',''))+'</figcaption></figure>'
 # Avoid presenting a second copy of the lead image in the main composition.
 maintext=''.join(main)
 if post.get('image'):
  pattern=r'<figure\b[^>]*>[^<]*(?:<(?!/figure)[\s\S])*?</figure>'
  # figures are retained except exact duplicate image lead; caption remains in supporting notes.
  for match in list(re.finditer(r'<figure\b[^>]*>.*?</figure>',maintext,re.S)):
   if src(post['image']) in match[0] and hero:
    notes.append(match[0]);maintext=maintext.replace(match[0],'',1)
 # Historical status is explicit without rewriting a past author’s experience.
 title=post['title'];deck=post['deck']
 if pid=='memories-preproduction':title='Where Do Memories Live: returning to the cut';deck='An earlier cut, the original poem, and the next decisions. Film in progress.'
 if pid=='a-house-on-the-internet':deck='The house, the portrait, and an earlier version of my corner of the internet.'
 if pid=='a-site-from-an-archive':deck='Poems, fiction and photographs. Choosing a public version without replacing the originals.'
 layout='film'if media else('image'if hero else'text')
 top=head(title,deck,'/journal/'+pid+'/',post.get('image',''))+'<main id="main" class="story story-'+layout+'"><div class="story-opening"><p class="eyebrow">'+E(post['category'])+' / <time datetime="'+E(post['iso'])+'">'+E(post['date'])+'</time></p><h1>'+display_title(title)+'</h1><p class="deck">'+E(deck)+'</p><p class="byline">Words &amp; work by Chloe Starr'+(' · Retrospective written October 21, 2026'if post.get('retrospective')else'')+'</p></div>'
 stages=''
 if media:stages=facade(media[0]['youtube_id'],media[0]['title'],media[0]['poster'])
 more=''.join(facade(m['youtube_id'],m['title'],m['poster'])for m in media[1:])
 # All omitted prose and attribution remains in supporting notes, not thrown away.
 support='<aside class="support"><h2>Sources &amp; connections</h2>'+('<p class="status">'+E(STATUS[pid])+'</p>'if pid in STATUS and not(pid=='purple-curtains-and-a-poetry-recut' and media) else'')+'<details><summary>Further notes, people &amp; sources</summary><div class="source-notes">'+''.join(notes)+'</div></details>'
 if media:support+='<details><summary>Film credits &amp; original releases</summary>'+''.join('<section><h3>'+E(m['title'])+'</h3>'+m.get('credits','')+'<a href="https://www.youtube.com/watch?v='+m['youtube_id']+'">YouTube edition</a></section>'for m in media)+'</details>'
 support+='</aside>'
 i=ORDER.index(post);near=[ORDER[j]for j in [i-1,i+1]if 0<=j<len(ORDER)]
 nav='<nav class="story-neighbours" aria-label="Continue reading">'+''.join('<a href="/journal/'+p['id']+'/">'+E(p['title'])+'</a>'for p in near)+'</nav>'
 out=top+stages+hero+'<article class="personal-story">'+maintext+'</article>'+('<section class="film-sequence" aria-label="Related films in this story">'+more+'</section>'if more else'')+support+nav+'</main>'+FOOTER+'<script src="/assets/editorial/portals-system.js?v=retrofit1"></script></body></html>'
 # Preserve every original link destination, including cross-work links that the original player removal contained.
 retained=set(re.findall(r'href="([^"]+)"',out));missing=[l for l in source_links if E(l['url'])not in retained and not re.search(r'\.(mp4|mov)(\?|$)',l['url'])]
 if missing:
  extra='<details class="original-connections"><summary>Original source connections</summary>'+''.join('<p><a href="'+E(l['url'])+'">'+E(l['label']or'Original source')+'</a></p>'for l in missing)+'</details>'
  out=out.replace('</aside>'+nav,extra+'</aside>'+nav)
 path=WEB/'journal'/pid/'index.html';path.write_text(re.sub(r'(?m)^ +$', '', out))
 # Per-work derivation exposes source relationships without claiming freshly verified rights/dates.
 record={'work_id':pid,'source_records':source_links,'videos':media,'publication_state':'private retrofit preview','source_verification':'existing records reused; new platform/research verification remains pending','local_video_exceptions':list(set(unverified))}
 (path.parent/'sources.json').write_text(json.dumps(record,indent=2,ensure_ascii=False)+'\n')
 AUDIT.append({'id':pid,'title':title,'layout':layout,'main_sections':KEEP.get(pid,[]),'supporting_sections':[t for t,_ in sections if t and t not in KEEP.get(pid,[])],'original_word_count':len(body.txt().split()),'main_word_count':len(re.sub('<[^>]*>',' ',maintext).split()),'youtube_ids':[m['youtube_id']for m in media],'local_media_removed':list(set(unverified)),'source_links':len(source_links),'image':post.get('image'),'flags':(['fresh source/profile/follow verification pending']if source_links else[])+(['YouTube upload pending']if pid in {'the-author-first-cut','purple-curtains-and-a-poetry-recut'}else[])+(['film in progress; old edition not promoted']if pid=='memories-preproduction'else[])})
# Newest first, without pinned features; all original routes remain discoverable.
NAV_TITLES={'coffee-photographs-become-a-film':'The photographs were already a world','i-asked-ai-to-finish-my-film':'I asked AI to finish my film','memories-preproduction':'Where Do Memories Live: returning to the cut'}
INDEX_DECKS={
'content-can-be-liquid-too':'There was more I wanted to do with the night.',
'first-a-heartbeat-animal-talk':'Sound becomes a way to find one another.',
'who-gets-to-build-the-next-internet':'Reaching people has become somebody else’s decision.',
'coffee-photographs-become-a-film':'I wanted coffee to have a physical presence.',
'i-asked-ai-to-finish-my-film':'The teeth weren’t mine.'}
INDEX_KINDS={'content-can-be-liquid-too':'Film / Personal essay','first-a-heartbeat-animal-talk':'Event film / SOFI TUKKER','who-gets-to-build-the-next-internet':'Event film / Open Source AI Awards','coffee-photographs-become-a-film':'Poetry film / Coffee','i-asked-ai-to-finish-my-film':'Essay / Film in progress','memories-preproduction':'Poem / Film in progress'}
def index_kind(p):
 if p['id'] in INDEX_KINDS:return INDEX_KINDS[p['id']]
 category=p['category'].lower()
 if 'field' in category:return 'Event story'
 if 'poetry' in category:return 'Poetry film'
 if category.startswith('film'):return 'Film / Production writing'
 if category=='building in public':return 'Building in public'
 return 'Essay'
def card(p,cl='',archive=False):
 image=p.get('image','');image=''if archive or image.endswith('.svg')else image
 deck=p['deck']
 if p['id']=='memories-preproduction':deck='The original poem, an earlier cut, and the next decisions. Film in progress.'
 if p['id']=='content-can-be-liquid-too':deck='I went out for Halloween and came home wishing I’d filmed more. So I used AI to reconstruct and extend the night.'
 deck=INDEX_DECKS.get(p['id'],deck)
 return '<article class="story-card '+cl+' work-'+E(p['id'])+'"><a href="/journal/'+p['id']+'/">'+('<img src="'+E(src(image))+'" alt="'+E(p.get('alt',''))+'" loading="lazy">'if image else'')+'<p class="eyebrow">'+E(index_kind(p))+' · <time datetime="'+E(p['iso'])+'">'+E(p['date'])+'</time></p><h2>'+display_title(NAV_TITLES.get(p['id'],p['title']))+'</h2>'+(''if archive else '<p>'+E(deck)+'</p>')+'</a></article>'
latest=ORDER[:1];chosen=ORDER[1:5];rest=ORDER[5:]
cover=head('Portals','A studio journal by Chloe Starr. Art films, field notes and experiments in making.','/portals/')+'<main id="main" class="portals"><div class="portals-title"><p>A studio journal by Chloe Starr</p><h1>Portals<span class="punctuation">.</span></h1></div><section class="current-stories" aria-label="Newest stories">'+''.join(card(p)for p in latest)+'</section><section class="selected-stories chronological" aria-label="More recent stories">'+''.join(card(p)for p in chosen)+'</section><section class="earlier-stories" aria-label="Chronological archive"><h2>Earlier stories<span class="punctuation">.</span></h2><div class="archive-stories">'+''.join(card(p,archive=True)for p in rest)+'</div></section><nav class="secondary-nav"><a href="/poetry/">Poetry &amp; poetry films</a><a href="/#events">Events &amp; field films</a></nav></main>'+FOOTER+'<script src="/assets/editorial/portals-system.js?v=retrofit1"></script></body></html>'
(WEB/'portals/index.html').write_text(cover)
print(json.dumps({'articles':AUDIT,'count':len(AUDIT),'preserved_halloween_sha256':hashlib.sha256((WEB/'journal/content-can-be-liquid-too/index.html').read_bytes()).hexdigest()},indent=2))
