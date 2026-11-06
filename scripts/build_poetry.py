"""Build public poetry from preserved text, with independent presentation and media state."""
from pathlib import Path
from brand_system import HEADER as NAV
import json,re,html,hashlib
ROOT=Path(__file__).resolve().parents[1]
E=lambda x:html.escape(str(x),quote=True)
s=(ROOT/'script.js').read_text()
original=json.loads(s.split('originalPoetry.poems = ',1)[1].split(';',1)[0])
registry=ROOT/'content/poetry/works.json'
if not registry.exists():
 records=[]
 for i,p in enumerate(original):
  slug='coffee'if i==12 else 'where-do-memories-live'if i==3 else f'poem-{i+1:02}'
  records.append({'id':f'poetry-{i+1:02}','slug':slug,'historical_number':p['number'],'text':p['text'],'text_sha256':hashlib.sha256(p['text'].encode()).hexdigest(),'author':'Chloe Starr','source':'script.js: originalPoetry.poems','creation_date':None,'original_publication_date':None,'visibility':'featured'if i in [3,12]else'public','writing_state':'published','film':{'state':'finished','youtube_id':'q_ddqO_WuOE','production_url':'/journal/coffee-photographs-become-a-film/','credits':'Original photography: Katy Shayne. Poem, performance, voice and direction: Chloe Starr.'}if i==12 else {'state':'in_development','production_url':'/journal/i-asked-ai-to-finish-my-film/'}if i==3 else {'state':'not_registered'},'presentation':{'tone':'turquoise'if i==12 else 'midnight'if i in [0,10,11,17,26,31]else'paper','scale':'intimate'if len(p['text'])>500 else 'display'if len(p['text'])<190 else 'reading'}})
 registry.write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
records=json.loads(registry.read_text())
assert len({r['id'] for r in records})==len(records) and len({r['slug'] for r in records})==len(records)
for r in records:
 assert r['text_sha256']==hashlib.sha256(r['text'].encode()).hexdigest()
 if 'source_entry_index' in r:assert r['source_text_sha256']==hashlib.sha256(original[r['source_entry_index']]['text'].encode()).hexdigest()
def shell(title,url,body,cls=''):
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+E(title)+' | Chloe Starr</title><link rel="canonical" href="https://chloestarr.me'+url+'"><link rel="stylesheet" href="/assets/editorial/portals-system.css"><link rel="stylesheet" href="/assets/poetry/compositions.css"></head><body class="'+cls+'"><a class="skip" href="#main">Skip to poem</a>'+NAV+body+'<footer class="site-footer"><a href="/poetry/">All poems</a><a href="/portals/">Portals</a><a href="https://ompom.ai">ompom.ai ↗</a></footer><script src="/assets/editorial/portals-system.js"></script></body></html>'
def label(r):
 if r['slug']=='coffee':return 'Coffee'
 if r['slug']=='where-do-memories-live':return 'Where do memories live?'
 line=r['text'].split('\n')[0]; words=list(re.finditer(r'\S+',line)); return line[:words[7].end()]+'…'if len(words)>8 else line
links=[]
for i,r in enumerate(records):
 if r['visibility']=='draft':continue
 path='/poetry/'+r['slug']+'/'
 main='<main id="main" class="poetry-work"><h1 class="eyebrow poem-identifier">Poem '+E(r.get('display_number',r['historical_number']))+' · Chloe Starr</h1><article aria-label="Poem by Chloe Starr" class="poem-composition '+r['presentation']['scale']+'"><div class="poem-original">'+E(r['text'])+'</div></article>'
 if r['film']['state']=='finished' and re.fullmatch(r'[\w-]{11}',r['film'].get('youtube_id','')):
  main=main.replace('</article>','<figure id="film" class="poem-photograph film-stage"><button class="youtube-facade" data-youtube-id="'+r['film']['youtube_id']+'" aria-label="Play '+E(label(r))+'"><img src="'+E(r['film'].get('preview_image','/assets/poetry-films/coffee-poster.jpg'))+'" alt="'+E(r['film'].get('preview_alt',label(r)))+'"><span aria-hidden="true">▶</span></button><figcaption>'+E(r['film']['credits'])+'</figcaption></figure></article>')
  main+='<section class="poem-context"><a href="'+r['film']['production_url']+'">Photography, performance &amp; production writing</a></section>'

 main+='<details class="poem-provenance"><summary>Context &amp; provenance</summary><p>Poem by Chloe Starr. From the existing poetry collection, entry '+str(i+1)+', original number '+E(r['historical_number'])+'.</p>'+('<p>Written in 2012. Film edition: 2026.</p>'if r['slug']=='coffee'else'')+'</details>'
 browse=[p for p in records if p['visibility'] in {'featured','public'}]; at=next((j for j,p in enumerate(browse) if p['id']==r['id']),None); near=[browse[j]for j in [at-1,at+1]if 0<=j<len(browse)]if at is not None else []
 main+='<nav class="story-neighbours" aria-label="Other poems">'+''.join('<a href="/poetry/'+p['slug']+'/">'+E(label(p))+'</a>'for p in near)+'</nav></main>'
 out=ROOT/path.strip('/')/'index.html';out.parent.mkdir(parents=True,exist_ok=True);out.write_text(shell(label(r),path,main,r['presentation']['tone']))
 if r['visibility'] in {'featured','public'}:links.append('<a id="poem-'+str(i)+'" href="'+path+'"><span class="eyebrow">'+E(r.get('display_number',r['historical_number']))+'</span><span>'+E(label(r))+'</span></a>')
featured=sorted([r for r in records if r['visibility']=='featured' and r['writing_state']=='published' and r['film']['state']=='finished' and re.fullmatch(r'[\w-]{11}',r['film'].get('youtube_id',''))],key=lambda r:r['presentation'].get('feature_priority',100))
feature=''
if featured:
 r=featured[0]; lines=r['presentation'].get('featured_lines',[r['text']]); assert ' '.join(lines)==r['text'].replace('\n',' ')
 feature='<a class="poetry-lead" href="/poetry/'+r['slug']+'/#film"><div class="poetry-lead-copy"><span class="eyebrow">Poem '+E(r.get('display_number',r['historical_number']))+' · Poetry film</span><h2>'+E(label(r))+'<span class="punctuation">.</span></h2><p>'+('<br>'.join(E(line)for line in lines))+'</p><span class="film-invitation">▶ Play complete film</span></div>'+('<img class="poetry-film-preview" src="'+E(r['film']['preview_image'])+'" alt="'+E(r['film'].get('preview_alt',label(r)))+'">'if r['film'].get('preview_image')else'')+'</a>'
body='<main id="main"><div class="portals-title"><p>Poems by Chloe Starr</p><h1>Poetry<span class="punctuation">.</span></h1></div>'+feature+'<nav class="poem-index" aria-label="Poetry collection">'+''.join(links)+'</nav></main>'
p=ROOT/'poetry/index.html';p.parent.mkdir(exist_ok=True);p.write_text(shell('Poetry','/poetry/',body))
print('Built',len(records),'poems; exact source text checks passed.')
