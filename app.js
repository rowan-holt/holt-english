(function(){
var K='holt_saved_v1',CATS=[['word','단어'],['phrase','표현'],['sentence','문장']];
var ICON='<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 3h14v18l-7-6.2L5 21z"/></svg>';
function load(){try{var a=JSON.parse(localStorage.getItem(K));return Array.isArray(a)?a:[]}catch(e){return []}}
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
function render(){var box=document.getElementById('mine');if(!box)return;
var c='';try{c=new URLSearchParams(location.search).get('c')||''}catch(e){}
var subs=document.querySelectorAll('.chips .sub a');for(var i=0;i<subs.length;i++)subs[i].classList.toggle('on',subs[i].getAttribute('data-c')===c);
var a=load(),h='';
if(c&&name(c)){var l=a.filter(function(x){return x.c===c});
h='<div class="cat-head"><h2>'+name(c)+'<small>'+l.length+'</small></h2></div>'+(l.length?'<ul class="rows">'+l.map(row).join('')+'</ul>':'<p class="empty">저장한 '+name(c)+ga(name(c))+' 없습니다.</p>')}
else{CATS.forEach(function(k){var l=a.filter(function(x){return x.c===k[0]});
h+='<section>'+head(k[1],l.length,'saved.html?c='+k[0])+(l.length?'<div class="grid">'+l.map(card).join('')+'</div>':'<p class="empty">저장한 '+k[1]+ga(k[1])+' 없습니다.</p>')+'</section>'})}
box.innerHTML=h;memoApply();sync()}
document.addEventListener('click',function(ev){
var mb=ev.target.closest&&ev.target.closest('.memo button');
if(mb){var m=mb.getAttribute('data-m');memoSet(memoGet()===m?'':m);memoApply();return}
var qb=ev.target.closest&&ev.target.closest('.quiz .reveal');
if(qb){var bx=qb.closest('.quiz'),shown=bx.classList.toggle('solved');qb.textContent=shown?'다시 풀기':'정답 보기';return}
var hx=memoGet()&&document.querySelector('.memo')&&ev.target.closest&&ev.target.closest('.term .hx,.doc p.en:not(.qz),.doc p.ko,.doc .me,.doc .mk');
if(hx&&!hx.classList.contains('open')){hx.classList.add('open');return}
var hid=memoGet()&&ev.target.closest&&ev.target.closest('.row>a,.card>a');
if(hid&&!ev.target.closest('.sv')){var it=hid.parentNode;if(!it.classList.contains('open')&&document.querySelector('.memo')){ev.preventDefault();it.classList.add('open');return}}
var t=ev.target.closest&&ev.target.closest('.chips .sub a, #mine a[href^="saved.html?c="]');
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
document.title=q+' 검색 | HOLT 영어';
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
memoApply();render();search();sync();
})();
