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
function render(){var box=document.getElementById('mine');if(!box)return;
var c='';try{c=new URLSearchParams(location.search).get('c')||''}catch(e){}
var subs=document.querySelectorAll('.chips .sub a');for(var i=0;i<subs.length;i++)subs[i].classList.toggle('on',subs[i].getAttribute('data-c')===c);
var a=load(),h='';
if(c&&name(c)){var l=a.filter(function(x){return x.c===c});
h='<div class="cat-head"><h2>'+name(c)+'<small>'+l.length+'</small></h2></div>'+(l.length?'<ul class="rows">'+l.map(row).join('')+'</ul>':'<p class="empty">저장한 '+name(c)+ga(name(c))+' 없습니다.</p>')}
else{CATS.forEach(function(k){var l=a.filter(function(x){return x.c===k[0]});
h+='<section>'+head(k[1],l.length,'saved.html?c='+k[0])+(l.length?'<div class="grid">'+l.map(card).join('')+'</div>':'<p class="empty">저장한 '+k[1]+ga(k[1])+' 없습니다.</p>')+'</section>'})}
box.innerHTML=h;sync()}
document.addEventListener('click',function(ev){var b=ev.target.closest&&ev.target.closest('.sv');if(!b)return;ev.preventDefault();ev.stopPropagation();
var a=load(),s=b.getAttribute('data-s');
if(has(a,s))a=a.filter(function(x){return x.s!==s});else a.unshift({s:s,p:b.getAttribute('data-p'),k:b.getAttribute('data-k'),c:b.getAttribute('data-c'),t:b.getAttribute('data-t')||''});
store(a);sync()});
render();sync();
})();
