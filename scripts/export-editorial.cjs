const fs=require('fs'),vm=require('vm');
const s=fs.readFileSync('script.js','utf8'),h=fs.readFileSync('history-posts.js','utf8');
const a=s.indexOf('const editorialPosts = [')+'const editorialPosts = '.length,b=s.indexOf('\n];',a)+2;
const posts=JSON.parse(s.slice(a,b));posts.push(...JSON.parse(h.slice(h.indexOf('['),h.lastIndexOf(']')+1)));
const marker='editorialPosts.push({id:\'before-the-software\'';const x=s.indexOf(marker),y=s.indexOf('});',x);posts.push(vm.runInNewContext('('+s.slice(x+'editorialPosts.push('.length,y+1)+')',{}, {timeout:1000}));
const line=s.split('\n').find(x=>x.includes('const films = ['));const films=JSON.parse(line.split('const films = ')[1].trim().replace(/;$/, ''));
if(fs.existsSync('content/editorial-additions.json'))posts.push(...JSON.parse(fs.readFileSync('content/editorial-additions.json','utf8')));
console.log(JSON.stringify({posts,films}));
