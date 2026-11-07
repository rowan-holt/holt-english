(function(){
var K='holt_saved_v1',CATS=[['word','단어'],['phrase','표현'],['sentence','문장']];
var ICON='<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 3h14v18l-7-6.2L5 21z"/></svg>';
function load(){try{var a=JSON.parse(localStorage.getItem(K));if(!Array.isArray(a))return [];
return a.map(function(x){if(x.c==='sentence'){x.p=String(x.p||'').replace(/\.\s*$/,'');x.k=String(x.k||'').replace(/\.\s*$/,'')}return x})}catch(e){return []}}
function store(a){try{localStorage.setItem(K,JSON.stringify(a))}catch(e){}}
function has(a,s){for(var i=0;i<a.length;i++)if(a[i].s===s)return true;return false}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function sync(){var a=load();var bs=document.querySelectorAll('.sv');for(var i=0;i<bs.length;i++){var b=bs[i],on=has(a,b.getAttribute('data-s'));
b.classList.toggle('on',on);b.setAttribute('aria-pressed',on?'true':'false');b.setAttribute('aria-label',on?'내 학습장에서 빼기':'내 학습장에 저장')}}
function btn(x){return '<button class="sv" type="button" data-s="'+esc(x.s)+'" data-p="'+esc(x.p)+'" data-k="'+esc(x.k)+'" data-c="'+esc(x.c)+'" data-t="'+esc(x.t||'')+'">'+ICON+'</button>'}
function ga(w){var c=w.charCodeAt(w.length-1)-0xAC00;return (c>=0&&c%28)?'이':'가'}
function name(c){for(var i=0;i<CATS.length;i++)if(CATS[i][0]===c)return CATS[i][1];return ''}
function card(x){var n=x.p.length,sz=n>30?'l':(n>14?'m':'');
return '<div class="card"><a href="e/'+esc(x.s)+'.html"><b class="'+sz+'">'+esc(x.p)+'</b><span><span class="k">'+esc(x.k)+'</span>'+(x.t?'<span class="tag">'+esc(x.t)+'</span>':'')+'</span></a>'+btn(x)+'</div>'}
function row(x){return '<li class="row"><a href="e/'+esc(x.s)+'.html"><b>'+esc(x.p)+'</b><span>'+esc(x.k)+'</span></a>'+btn(x)+'</li>'}
function head(nm,n,href){return '<div class="cat-head"><h2><a href="'+href+'">'+nm+'<small>'+n+'</small></a></h2><a class="more" href="'+href+'">전체 보기 →</a></div>'}
var MEMO='<div class="memo" role="group" aria-label="암기 모드"><button type="button" data-m="ko" aria-pressed="false">영어 가리기</button><button type="button" data-m="en" aria-pressed="false">뜻 가리기</button></div>';
function memoGet(){try{return localStorage.getItem('holt_memo')||''}catch(e){return ''}}
function memoSet(m){try{m?localStorage.setItem('holt_memo',m):localStorage.removeItem('holt_memo')}catch(e){}}
function memoApply(){var m=document.querySelector('.memo')?memoGet():'',b=document.body;b.classList.toggle('memo-en',m==='en');b.classList.toggle('memo-ko',m==='ko');
var bs=document.querySelectorAll('.memo button');for(var i=0;i<bs.length;i++){var on=bs[i].getAttribute('data-m')===m;bs[i].classList.toggle('on',on);bs[i].setAttribute('aria-pressed',on?'true':'false')}
var o=document.querySelectorAll('.open');for(var j=0;j<o.length;j++)o[j].classList.remove('open')}
function render(){var box=document.getElementById('mine');if(!box)return;CANEDIT=false;
var c='';try{c=new URLSearchParams(location.search).get('c')||''}catch(e){}
var subs=document.querySelectorAll('.chips .sub a');for(var i=0;i<subs.length;i++)subs[i].classList.toggle('on',subs[i].getAttribute('data-c')===c);
var a=load(),h='',kn=knownGet();
function list(l,title,empty){CANEDIT=l.length>0;var nk=l.filter(function(x){return kn[x.s]}).length;
var shown=l.filter(function(x){return !kn[x.s]}).concat(l.filter(function(x){return kn[x.s]}));   // 외운 것은 맨 아래로
return '<div class="cat-head"><h2>'+title+'<small>'+l.length+(nk?' · 외움 '+nk:'')+'</small></h2><div class="ctl">'
+(l.length?'<button type="button" class="fc-open">카드로 외우기</button>':'')+'</div>'+'</div>'
+(shown.length?'<ul class="rows mine-rows">'+shown.map(function(x){return mrow(x,kn[x.s])}).join('')+'</ul>':'<p class="empty">'+empty+'</p>')}
if(c==='all'){h=list(a,'전체','저장한 것이 없습니다.')}
else if(c&&name(c)){h=list(a.filter(function(x){return x.c===c}),name(c),'저장한 '+name(c)+ga(name(c))+' 없습니다.')}
else{CATS.forEach(function(k){var l=a.filter(function(x){return x.c===k[0]});
h+='<section>'+head(k[1],l.length,'saved.html?c='+k[0])+(l.length?'<div class="grid">'+l.map(card).join('')+'</div>':'<p class="empty">저장한 '+k[1]+ga(k[1])+' 없습니다.</p>')+'</section>'})}
h+='<div class="listfoot"><nav class="pager" aria-label="페이지"></nav><div class="mine-tools"><button type="button" data-mt="reset">초기화</button>'+(CANEDIT?'<span>·</span><button type="button" class="edit-mine'+(EDIT?' on':'')+'">'+(EDIT?'완료':'편집')+'</button>':'')+'</div></div>';
box.innerHTML=h;memoApply();sync();if(typeof paginate==='function')paginate()}
var KK='holt_known_v1';
function knownGet(){try{var o=JSON.parse(localStorage.getItem(KK));return o&&typeof o==='object'?o:{}}catch(e){return {}}}
function knownSet(o){try{localStorage.setItem(KK,JSON.stringify(o))}catch(e){}}
var EDIT=false,CANEDIT=false;
function mrow(x,k){return '<li class="row'+(k?' known':'')+'"><a href="e/'+esc(x.s)+'.html"><b>'+esc(x.p)+'</b><span>'+esc(x.k)+'</span></a>'
+(EDIT?'<button type="button" class="rm" data-s="'+esc(x.s)+'">빼기</button>'
:'<button type="button" class="kn'+(k?' on':'')+'" data-s="'+esc(x.s)+'" aria-pressed="'+(k?'true':'false')+'" aria-label="외움 표시" title="외움 표시">✓</button>')
+'<i class="sv" data-s="'+esc(x.s)+'" hidden></i></li>'}
function b64e(t){return btoa(unescape(encodeURIComponent(t)))}function b64d(t){return decodeURIComponent(escape(atob(t)))}
function mineTool(t){var a=load(),kn=knownGet();
if(t==='copy'){var code='HOLT1.'+b64e(JSON.stringify({s:a,k:kn}));
var done=function(){alert('내 학습장 목록을 복사했어요. 메모장 등에 붙여 넣어 보관하고, 다른 기기에서 [붙여넣기]로 불러오세요.')};
if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(code).then(done,function(){prompt('아래 코드를 복사해 두세요',code)});else prompt('아래 코드를 복사해 두세요',code);track('mine_copy',{n:a.length});return}
if(t==='paste'){var v=prompt('[목록 복사]로 받은 코드를 붙여 넣어 주세요');if(!v)return;
try{var d=JSON.parse(b64d(v.trim().replace(/^HOLT1\./,'')));var have={},n=0;a.forEach(function(x){have[x.s]=1});
(d.s||[]).forEach(function(x){if(x&&x.s&&!have[x.s]){a.push(x);have[x.s]=1;n++}});
for(var k in (d.k||{}))kn[k]=1;store(a);knownSet(kn);render();alert(n+'개를 불러왔어요.');track('mine_paste',{n:n})}catch(e){alert('코드를 읽지 못했어요. 처음부터 끝까지 그대로 붙여 넣었는지 확인해 주세요.')}return}
if(t==='reset'){if(!a.length&&!Object.keys(kn).length)return;
if(confirm('내 학습장을 모두 비울까요? 저장한 '+a.length+'개와 외움 표시가 지워지고 되돌릴 수 없어요.')){store([]);knownSet({});render();track('mine_reset',{n:a.length})}}}
var FC=null;
function fcOpen(){var lis=document.querySelectorAll('#mine .mine-rows li'),kn=knownGet(),all=load(),by={};all.forEach(function(x){by[x.s]=x});
var items=[];for(var i=0;i<lis.length;i++){var s=lis[i].querySelector('.sv').getAttribute('data-s');if(by[s])items.push(by[s])}
var todo=items.filter(function(x){return !kn[x.s]});if(!todo.length)todo=items.slice();
for(var j=todo.length-1;j>0;j--){var r=Math.floor(Math.random()*(j+1)),t=todo[j];todo[j]=todo[r];todo[r]=t}
var dir='';try{dir=localStorage.getItem('holt_fc_dir')||''}catch(e){}
FC={q:todo,total:todo.length,done:0,ko:dir?dir==='ko':memoGet()==='ko'};
document.body.insertAdjacentHTML('beforeend','<div class="fc" role="dialog" aria-label="카드로 외우기"><div class="fc-top"><span class="fc-n"></span><span class="fc-dir" role="group" aria-label="앞면"><button type="button" data-d="en">영어 보고 뜻 맞히기</button><button type="button" data-d="ko">뜻 보고 영어 맞히기</button></span><button type="button" class="fc-x" aria-label="닫기">✕</button></div><div class="fc-card" tabindex="0"></div><div class="fc-btns"><button type="button" class="fc-again">아직 몰라요<small>조금 뒤 다시 나와요</small></button><button type="button" class="fc-ok">알아요<small>외움 ✓ 표시하고 넘어가요</small></button></div><p class="fc-hint"></p></div>');
document.body.style.overflow='hidden';fcShow();track('flashcard_open',{n:todo.length})}
function fcShow(){var el=document.querySelector('.fc');if(!el)return;var card=el.querySelector('.fc-card');card.classList.remove('flipped');
el.querySelector('.fc-n').textContent='남은 카드 '+FC.q.length+' · 외움 '+FC.done;
if(!FC.q.length){card.innerHTML='<div class="fc-front">끝!</div><div class="fc-back" style="visibility:visible">'+FC.total+'개 모두 외움 ✓ 표시했어요</div>';el.querySelector('.fc-btns').style.display='none';el.querySelector('.fc-hint').style.display='none';return}
var ds=el.querySelectorAll('.fc-dir button');for(var i=0;i<ds.length;i++)ds[i].classList.toggle('on',(ds[i].getAttribute('data-d')==='ko')===FC.ko);
el.querySelector('.fc-hint').textContent=FC.ko?'카드를 누르면 영어가 보여요':'카드를 누르면 뜻이 보여요';
var x=FC.q[0],f=FC.ko?x.k:x.p,b=FC.ko?x.p:x.k;card.innerHTML='<div class="fc-front'+(FC.ko?' ko':'')+'">'+esc(f)+'</div><div class="fc-back'+(FC.ko?'':' ko')+'">'+esc(b)+'</div>'}
function fcClose(){var el=document.querySelector('.fc');if(el)el.remove();document.body.style.overflow='';FC=null;render()}
document.addEventListener('click',function(ev){var t=ev.target.closest&&ev.target.closest('.kn,.rm,.edit-mine,.hide-kn,.mine-tools button,.fc-open,.fc-x,.fc-card,.fc-again,.fc-ok,.fc-dir button');if(!t)return;
if(t.hasAttribute('data-d')){if(!FC)return;FC.ko=t.getAttribute('data-d')==='ko';try{localStorage.setItem('holt_fc_dir',FC.ko?'ko':'en')}catch(e){}fcShow();return}
if(t.classList.contains('kn')){var kn=knownGet(),s=t.getAttribute('data-s');if(kn[s])delete kn[s];else kn[s]=1;knownSet(kn);render();track('known_toggle',{item:s});return}
if(t.classList.contains('edit-mine')){EDIT=!EDIT;render();return}
if(t.classList.contains('rm')){var s2=t.getAttribute('data-s');store(load().filter(function(x){return x.s!==s2}));track('unsave_item',{item:s2});render();return}
if(t.classList.contains('hide-kn')){try{localStorage.setItem('holt_hide_known',t.classList.contains('on')?'0':'1')}catch(e){}render();return}
if(t.hasAttribute('data-mt'))return mineTool(t.getAttribute('data-mt'));
if(t.classList.contains('fc-open'))return fcOpen();
if(t.classList.contains('fc-x'))return fcClose();
if(t.classList.contains('fc-card'))return t.classList.toggle('flipped');
if(!FC||!FC.q.length)return;var x=FC.q.shift();
if(t.classList.contains('fc-ok')){var k2=knownGet();k2[x.s]=1;knownSet(k2);FC.done++}else{FC.q.push(x)}fcShow()});
document.addEventListener('keydown',function(ev){if(!FC)return;if(ev.key==='Escape')fcClose();else if(ev.key===' '){ev.preventDefault();var c=document.querySelector('.fc-card');if(c)c.classList.toggle('flipped')}});
document.addEventListener('click',function(ev){
var mb=ev.target.closest&&ev.target.closest('.memo button');
if(mb){var m=mb.getAttribute('data-m');memoSet(memoGet()===m?'':m);memoApply();return}
var qb=ev.target.closest&&ev.target.closest('.quiz .reveal');
if(qb){var bx=qb.closest('.quiz'),shown=bx.classList.toggle('solved');qb.textContent=shown?'다시 풀기':'정답 보기';return}
var hx=memoGet()&&document.querySelector('.memo')&&ev.target.closest&&ev.target.closest('.term .hx,.doc p.en,.doc p.ko,.doc .me,.doc .mk');
if(hx&&!hx.classList.contains('open')){ev.preventDefault();hx.classList.add('open');return}
var hid=memoGet()&&ev.target.closest&&ev.target.closest('.row>a,.card>a');
if(hid&&!ev.target.closest('.sv')){var it=hid.parentNode;if(!it.classList.contains('open')&&document.querySelector('.memo')){ev.preventDefault();it.classList.add('open');return}}
var t=ev.target.closest&&ev.target.closest('.chips .sub a, #mine a[href^="saved.html"]');
if(t&&document.getElementById('mine')){ev.preventDefault();try{history.replaceState(null,'',t.getAttribute('href'))}catch(e){}render();window.scrollTo(0,0);return}
var b=ev.target.closest&&ev.target.closest('.sv');if(!b)return;ev.preventDefault();ev.stopPropagation();
var a=load(),s=b.getAttribute('data-s');
if(has(a,s))a=a.filter(function(x){return x.s!==s});else a.unshift({s:s,p:b.getAttribute('data-p'),k:b.getAttribute('data-k'),c:b.getAttribute('data-c'),t:b.getAttribute('data-t')||''});
store(a);sync()});
function rx(q){return new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi')}
function mark(t,q){var r=rx(q),o='',i=0,m;t=String(t);while((m=r.exec(t))){o+=esc(t.slice(i,m.index))+'<mark class="hit">'+esc(m[0])+'</mark>';i=m.index+m[0].length;if(!m[0].length)break}return o+esc(t.slice(i))}
function snip(t,q){var i=t.toLowerCase().indexOf(q.toLowerCase());if(i<0)return '';var a=Math.max(0,i-40),b=Math.min(t.length,i+q.length+60);
return (a>0?'… ':'')+mark(t.slice(a,b),q)+(b<t.length?' …':'')}
function srow(x,q,body){return '<li class="row"><a href="e/'+esc(x.s)+'.html"><b>'+mark(x.p,q)+'</b><span>'+mark(x.k,q)+'</span>'+(body?'<span class="snip">'+body+'</span>':'')+'</a>'+btn({s:x.s,p:x.p,k:x.k,c:x.c,t:x.t})+'</li>'}
function search(){var box=document.getElementById('found');if(!box)return;
var q='';try{q=(new URLSearchParams(location.search).get('q')||'').trim()}catch(e){}
var ins=document.querySelectorAll('.tools .q input');for(var i=0;i<ins.length;i++)ins[i].value=q;
var h1=document.getElementById('qtitle');
if(!q){h1.innerHTML='검색';box.innerHTML='';return}
document.title=q+' 검색 | HOLT ENGLISH';
fetch(box.getAttribute('data-src')).then(function(r){return r.json()}).then(function(d){
var ql=q.toLowerCase().replace(/’/g,"'"),hit=function(t){return String(t||'').toLowerCase().replace(/’/g,"'").indexOf(ql)>=0};
var main=d.filter(function(x){return hit(x.p)||hit(x.k)});
var rank=function(x){var p=x.p.toLowerCase(),k=x.k;return p===ql||k===q?0:(p.indexOf(ql)===0?1:2)};
main.sort(function(a,b){return rank(a)-rank(b)});
var ids={};main.forEach(function(x){ids[x.s]=1});
var inBody=d.filter(function(x){return !ids[x.s]&&x.b.some(hit)});
var html='',n=main.length+inBody.length;
CATS.forEach(function(k){var l=main.filter(function(x){return x.c===k[0]});if(!l.length)return;
html+='<div class="cat-head"><h2>'+k[1]+'<small>'+l.length+'</small></h2></div><ul class="rows">'+l.map(function(x){return srow(x,q)}).join('')+'</ul>'});
if(inBody.length)html+='<div class="cat-head"><h2>예문·설명에서<small>'+inBody.length+'</small></h2></div><ul class="rows">'+inBody.map(function(x){
var t='';for(var i=0;i<x.b.length;i++)if(hit(x.b[i])){t=snip(x.b[i],q);break}return srow(x,q,t)}).join('')+'</ul>';
h1.innerHTML='‘'+esc(q)+'’ 검색 결과<small>'+n+'</small>';
box.innerHTML=html||'<p class="empty">검색 결과가 없습니다.</p>';sync()}).catch(function(){box.innerHTML='<p class="empty">검색을 불러오지 못했습니다.</p>'})}
document.addEventListener('submit',function(ev){var f=ev.target;if(!f.classList||!f.classList.contains('q')||!document.getElementById('found'))return;
ev.preventDefault();var v=f.querySelector('input').value.trim();try{history.replaceState(null,'','search.html'+(v?'?q='+encodeURIComponent(v):''))}catch(e){}search()});
document.addEventListener('keydown',function(ev){if(ev.altKey||ev.ctrlKey||ev.metaKey||/INPUT|TEXTAREA/.test((ev.target||{}).tagName||''))return;
var a=ev.key==='ArrowLeft'?document.querySelector('a.nav.prev'):ev.key==='ArrowRight'?document.querySelector('a.nav.next'):null;if(a)location.href=a.href});
function psGet(){try{return +localStorage.getItem('holt_ps')||30}catch(e){return 30}}
function setupList(ul){var it=ul.children,n=it.length,ps=psGet(),head=ul.previousElementSibling;
var nx=ul.nextElementSibling,foot=(nx&&nx.classList.contains('listfoot'))?nx:(ul.parentNode.querySelector(':scope > .listfoot'));if(nx&&nx.classList.contains('pager'))nx.remove();
if(head&&head.classList.contains('cat-head')){var o=head.querySelector('.psize');if(o)o.remove();
if(n>10)head.insertAdjacentHTML('beforeend','<div class="psize">'+[10,30,50,100].map(function(k){return '<button type="button" data-ps="'+k+'"'+(k===ps?' class="on"':'')+'>'+k+'</button>'}).join('')+'<span>개씩 보기</span></div>')}
var pages=Math.max(1,Math.ceil(n/ps)),cur=ul._p||+(new URLSearchParams(location.search).get('p'))||1;cur=Math.min(Math.max(1,cur),pages);ul._p=cur;
for(var i=0;i<n;i++)it[i].style.display=(i>=(cur-1)*ps&&i<cur*ps)?'':'none';
if(foot)foot.querySelector('.pager').innerHTML='';if(pages<2)return;var b=[],add=function(p,l,on){b.push('<button type="button" data-p="'+p+'"'+(on?' class="on" aria-current="page"':'')+'>'+l+'</button>')};
if(cur>1)add(cur-1,'‹');var last=0;for(var p=1;p<=pages;p++){if(p===1||p===pages||Math.abs(p-cur)<=(innerWidth<700?1:2)){if(last&&p-last>1)b.push('<span>…</span>');add(p,p,p===cur);last=p}}
if(cur<pages)add(cur+1,'›');if(foot){foot.querySelector('.pager').innerHTML=b.join('');return}ul.insertAdjacentHTML('afterend','<nav class="pager" aria-label="페이지">'+b.join('')+'</nav>')}
function paginate(){var uls=document.querySelectorAll('main ul.rows');for(var i=0;i<uls.length;i++)if(!uls[i].closest('#found'))setupList(uls[i])}
document.addEventListener('click',function(ev){var t=ev.target.closest&&ev.target.closest('.pager button,.psize button');if(!t)return;
if(t.hasAttribute('data-ps')){try{localStorage.setItem('holt_ps',t.getAttribute('data-ps'))}catch(e){}var uls=document.querySelectorAll('main ul.rows');for(var i=0;i<uls.length;i++)uls[i]._p=1;setP(1);paginate();return}
var pg=t.closest('.pager'),ul=pg.parentNode.classList.contains('listfoot')?pg.parentNode.parentNode.querySelector('ul.rows'):pg.previousElementSibling,p=+t.getAttribute('data-p');ul._p=p;setP(p);setupList(ul);
var h=ul.previousElementSibling||ul;window.scrollTo(0,h.getBoundingClientRect().top+scrollY-70)});
function setP(p){try{var u=new URL(location.href);if(p>1)u.searchParams.set('p',p);else u.searchParams.delete('p');history.replaceState(null,'',u)}catch(e){}}
function track(n,p){try{if(window.gtag)gtag('event',n,p||{})}catch(e){}}
document.addEventListener('click',function(ev){var t=ev.target.closest&&ev.target.closest('a,button');if(!t)return;
if(t.hasAttribute('data-ad'))return track('ad_click',{ad_id:t.getAttribute('data-ad'),slot:t.getAttribute('data-slot')});
if(t.classList.contains('sv'))return track(t.classList.contains('on')?'save_item':'unsave_item',{item:t.getAttribute('data-s')});
if(t.closest('.memo'))return track('memo_mode',{mode:t.getAttribute('data-m')});
if(t.classList.contains('reveal'))return track('quiz_reveal',{page:location.pathname});
if(t.classList.contains('nav'))return track('prev_next',{dir:t.classList.contains('prev')?'prev':'next',to:t.getAttribute('href')});
if(t.tagName==='A'&&t.host&&t.host!==location.host)track('outbound_click',{url:t.href})},true);
document.addEventListener('submit',function(ev){var i=ev.target.querySelector&&ev.target.querySelector('input[name=q]');if(i&&i.value.trim())track('search',{search_term:i.value.trim()})},true);
if('IntersectionObserver' in window){var seen={},io=new IntersectionObserver(function(es){es.forEach(function(x){var id=x.target.getAttribute('data-ad');
if(x.isIntersecting&&!seen[id]){seen[id]=1;track('ad_view',{ad_id:id,slot:x.target.getAttribute('data-slot')})}})},{threshold:.5});
var ads=document.querySelectorAll('[data-ad]');for(var k=0;k<ads.length;k++)io.observe(ads[k])}
if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost')){var SWR=null,HADC=!!navigator.serviceWorker.controller;
addEventListener('load',function(){navigator.serviceWorker.register('/sw.js',{updateViaCache:'none'}).then(function(r){SWR=r}).catch(function(){})});
navigator.serviceWorker.addEventListener('controllerchange',function(){if(HADC&&!sessionStorage.getItem('holt-swr')){try{sessionStorage.setItem('holt-swr','1')}catch(e){}location.reload()}})}
function verCheck(){var m=document.querySelector('meta[name="holt-v"]');if(!m||!window.fetch)return;if(SWR_())SWR_().update().catch(function(){});
fetch('/v.json?t='+Date.now(),{cache:'no-store'}).then(function(r){return r.json()}).then(function(j){var k='holt-rv-'+j.v;
if(j.v&&j.v!==m.content&&!sessionStorage.getItem(k)){try{sessionStorage.setItem(k,'1')}catch(e){}location.reload()}}).catch(function(){})}
function SWR_(){return typeof SWR!=='undefined'?SWR:null}
addEventListener('pageshow',function(e){if(e.persisted)verCheck()});
document.addEventListener('visibilitychange',function(){if(document.visibilityState==='visible')verCheck()});
setTimeout(verCheck,1500);
var DEFER=null;addEventListener('beforeinstallprompt',function(e){e.preventDefault();DEFER=e;var b=document.querySelectorAll('.install');for(var i=0;i<b.length;i++)b[i].hidden=false});
document.addEventListener('click',function(ev){var t=ev.target.closest&&ev.target.closest('.install');if(!t||!DEFER)return;ev.preventDefault();DEFER.prompt();DEFER.userChoice.then(function(r){track('app_install',{outcome:r.outcome});DEFER=null;t.hidden=true})});
memoApply();render();search();sync();paginate();
})();
