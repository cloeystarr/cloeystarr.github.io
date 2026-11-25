"""Fail on unreviewed/changed journal imagery, raw photos or broken media paths.

Run before publishing and after any article build. A hash check protects the reviewed
asset, not artistic quality: new photos still require executed prompts and visual QA.
"""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
from collections import defaultdict, Counter
import hashlib,json,re,subprocess,sys

ROOT=Path(__file__).resolve().parents[1]
MANIFEST=json.loads((ROOT/'content/editorial-media.json').read_text())
ASSETS=MANIFEST['assets']
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__();self.tags=[];self.feed(text)
 def handle_starttag(self,t,a):self.tags.append((t,dict(a)))
def normal(url):
 p=urlsplit(url)
 if p.netloc and p.netloc!='chloestarr.me':return None
 return '/'+unquote(p.path).lstrip('/')
errors=[];counts=Counter();use=defaultdict(set)
def check(url,where,tag=None):
 src=normal(url)
 if src is None:errors.append(f'{where}: remote inline image needs a local reviewed record: {url}');return
 asset=ASSETS.get(src)
 if not asset:errors.append(f'{where}: unclassified image {src}');return
 path=ROOT/src.lstrip('/')
 if not path.is_file():errors.append(f'{where}: missing {src}');return
 if hashlib.sha256(path.read_bytes()).hexdigest()!=asset['sha256']:errors.append(f'{where}: reviewed asset changed: {src}')
 if asset['kind'] not in {'ai_photo','ai_art','quoted_source','interface','diagram'}:errors.append(f'{where}: invalid classification: {src}')
 if asset['kind']=='ai_photo':
  if not asset.get('treatment') or not asset.get('reviewed'):errors.append(f'{where}: missing executed-treatment review: {src}')
  if tag is not None and tag.get('data-editorial-treatment')!=asset['treatment']:errors.append(f'{where}: image lacks its treatment identity: {src}')
  if asset.get('source')==src:errors.append(f'{where}: photo still points to original: {src}')
 counts[asset['kind']]+=1;use[src].add(where)

cover=Page((ROOT/'portals/index.html').read_text())
routes=list(dict.fromkeys(m[1] for t,a in cover.tags if t=='a' and (m:=re.fullmatch(r'/journal/([^/]+)/',a.get('href','')))))
if not routes:errors.append('Portals has no article routes')
if set(routes)!=set(MANIFEST['routes']):errors.append('Article routes changed: review media for new/removed articles and update the manifest')
for route in routes:
 path=ROOT/'journal'/route/'index.html'
 if not path.is_file():errors.append(f'{route}: missing article');continue
 text=path.read_text();page=Page(text)
 if 'noindex' in text or '/work/editorial-audit/' in text:errors.append(f'{route}: private review markup leaked')
 if not any(t=='link' and a.get('rel')=='canonical' and a.get('href')==f'https://chloestarr.me/journal/{route}/' for t,a in page.tags):errors.append(f'{route}: wrong canonical')
 for t,a in page.tags:
  if t=='img':
   check(a.get('src',''),route,a)
   if not a.get('alt'):errors.append(f'{route}: image has no alt text')
   if not a.get('width') or not a.get('height'):errors.append(f'{route}: image has no intrinsic dimensions')
  if a.get('srcset'):
   for candidate in a['srcset'].split(','):
    check(candidate.strip().split()[0],route+' responsive')
  elif t=='meta' and a.get('property')=='og:image':check(a.get('content',''),route)
  elif t=='video' and a.get('poster'):check(a['poster'],route)
 # November 25: processing disclosures are not part of reader-facing captions.
 # Executed treatments, asset hashes and source identities remain enforced above.
for t,a in cover.tags:
 if t=='img':check(a.get('src',''),'Portals',a)
# Check original records too, so a rebuild cannot silently restore untreated photos.
data=json.loads(subprocess.check_output(['node','scripts/export-editorial.cjs'],cwd=ROOT))
for p in data['posts']:
 if p['id'] not in routes:continue
 if p.get('image'):check(p['image'],p['id']+' source')
 for t,a in Page(p.get('body','')).tags:
  if t=='img':check(a.get('src',''),p['id']+' source',a)
for src,places in use.items():
 if ASSETS[src]['kind']!='ai_photo':continue
 stories={p.removesuffix(' source')for p in places if p!='Portals'}
 if len(stories)>1:errors.append(f'Photo recycled across stories: {src}: {sorted(stories)}')
if errors:
 print('\n'.join(errors));sys.exit(1)
print(json.dumps({'result':'PASS','articles':len(routes),'unique_reviewed_assets':len(use),'image_uses':counts,'policy':'executed photo treatments; reviewed hashes; source integrity; no unknown images'},indent=2))
