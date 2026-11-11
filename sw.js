const C='holt-ec750401',CORE=['/','/offline.html','/saved.html','/words.html','/phrases.html','/sentences.html','/favicon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
if(u.pathname==='/v.json'||u.pathname==='/sw.js'||u.pathname.startsWith('/a/'))return;   // 듣기 mp3는 브라우저가 구간 요청을 해서 서비스워커가 가로채지 않음
if(r.mode==='navigate'){e.respondWith(fetch(r.url,{cache:'no-cache',credentials:'same-origin'}).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res})
.catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('/offline.html'))));return}
e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res})))});
