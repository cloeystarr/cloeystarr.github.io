"""Offline regression checks for migrated Events and protected approved compositions."""
from pathlib import Path
from html.parser import HTMLParser
import hashlib,json,re,subprocess
from brand_system import HEADER,BRAND_CSS,FONT_FILE,TOKENS
ROOT=Path(__file__).resolve().parents[1]
class Page(HTMLParser):
 def __init__(self,text):super().__init__();self.tags=[];self.feed(text)
 def handle_starttag(self,tag,attrs):self.tags.append((tag,dict(attrs)))
p=ROOT/'events/index.html';text=p.read_text();page=Page(text)
assert HEADER in text
assert [a.get('href').split('?')[0]for t,a in page.tags if t=='link' and a.get('rel')=='stylesheet']==[BRAND_CSS,'/assets/editorial/events.css']
assert not re.search(r'(styles\.css|shared-design\.css|pom-drawing|pom-film-grid|pom-interior|<video|\.mp4["?])',text)
assert sum(t=='h1'for t,_ in page.tags)==1
source=json.loads(subprocess.check_output(['node','scripts/export-editorial.cjs'],cwd=ROOT));assert len(source['films'])>0
assert text.count('data-youtube-id=')==len(source['films']), 'Every released event requires its verified YouTube edition'
for f in source['films']:
 for url in re.findall(r'href="([^"]+)"',f.get('notes','')):assert url in text
 if f.get('article'):assert '/journal/'+f['article']+'/' in text
 assert f.get('poster','') in text or f.get('article')=='content-can-be-liquid-too'
 if f.get('youtube'):assert 'data-youtube-id="'+f['youtube']+'"' in text
 assert f.get('legacy_id') is None # Export must remain original data, not rendered mutations.
css=(ROOT/'assets/editorial/portals-system.css').read_text()
assert FONT_FILE in css
for v in TOKENS.values():assert v in css
script=(ROOT/'script.js').read_text();assert 'location.hash === "#events") { location.replace("/events/" + location.search)'in script
# Homepage composition, approved collection pages and brand CSS are immutable in this task.
baseline=json.loads((ROOT/'content/brand-regression-baseline.json').read_text())
for path,sha in baseline['protected_files'].items():assert hashlib.sha256((ROOT/path).read_bytes()).hexdigest()==sha,path+' changed; review approval required before updating baseline'
def cover(s):return s[s.index('  cover() {'):s.index('  question() {')]
assert hashlib.sha256(cover(script).encode()).hexdigest()==baseline['homepage_composition_sha256']
print('PASS: shared identity; all event films/credits/routes preserved; no legacy Events components or local video; approved compositions unchanged.')
