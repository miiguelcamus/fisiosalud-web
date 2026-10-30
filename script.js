(function(){
 var root=document.documentElement,body=document.body;
 var top=document.querySelector('.top');
 function onScroll(){top.classList.toggle('sc',window.scrollY>8)}
 window.addEventListener('scroll',onScroll,{passive:true});onScroll();

 var burger=document.querySelector('.burger'),mm=document.querySelector('.mmenu');
 if(burger){burger.addEventListener('click',function(){
  var o=!body.classList.contains('menu-open');body.classList.toggle('menu-open',o);root.classList.toggle('menu-open',o);
  burger.setAttribute('aria-expanded',o);mm.setAttribute('aria-hidden',!o);
 });}

 document.querySelectorAll('a[href*=".html"]').forEach(function(a){
  a.addEventListener('click',function(e){
   if(e.metaKey||e.ctrlKey||a.target==='_blank')return;
   var href=a.getAttribute('href');
   if(href.split('?')[0].split('#')[0]===location.pathname.split('/').pop()&&href.indexOf('#')>-1)return;
   e.preventDefault();body.classList.add('leaving');setTimeout(function(){location.href=href},220);
  });
 });
 window.addEventListener('pageshow',function(){body.classList.remove('leaving')});

 var els=document.querySelectorAll('.rv,.plate');
 if('IntersectionObserver' in window){
  var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{rootMargin:'0px 0px -50px 0px'});
  els.forEach(function(e){io.observe(e)});
 } else els.forEach(function(e){e.classList.add('in')});

 function updateOpen(){
  var H=window.FZ_HOURS||[];var now=new Date();var d=now.getDay();var h=H[(d+6)%7];
  var mins=now.getHours()*60+now.getMinutes();
  function m(t){var p=t.split(':');return +p[0]*60+ +p[1]}
  var open=h&&h[0]&&mins>=m(h[0])&&mins<m(h[1]);
  document.querySelectorAll('[data-open]').forEach(function(e){e.textContent=open?'Abierto ahora · hasta las '+h[1]:'Cerrado ahora · cita previa';e.classList.toggle('is-open',!!open)});
  var li=document.querySelector('.hours li[data-d="'+d+'"]');if(li)li.classList.add('today');
 }
 updateOpen();setInterval(updateOpen,60000);

 function waFor(s){return window.FZ_WA+'?text='+encodeURIComponent('¡Hola Sara! Quería pedir cita para: '+s)}
 document.querySelectorAll('.tr-cta').forEach(function(a){a.addEventListener('click',function(){a.href=waFor(a.dataset.svc)})});

 // body map
 var hs=document.querySelectorAll('.hs'),zb=document.querySelectorAll('.zb'),out=document.querySelector('.mout');
 function pick(z){
  var src=document.querySelector('.hs[data-z="'+z+'"]');if(!src)return;
  hs.forEach(function(x){x.classList.toggle('on',x.dataset.z===z)});
  zb.forEach(function(x){x.classList.toggle('on',x.dataset.z===z)});
  var ids=src.dataset.t.split(',');
  document.querySelectorAll('.tr').forEach(function(t){t.classList.toggle('hit',ids.indexOf(t.id)>-1)});
  out.innerHTML=ids.map(function(id){var c=document.getElementById(id);if(!c)return'';var n=c.querySelector('h2').textContent,p=c.querySelector('p').textContent;
   return '<div class="mcard"><b>'+n+'</b><p>'+p+'</p><a href="#'+id+'">Ver tratamiento →</a></div>'}).join('');
 }
 hs.forEach(function(h){h.addEventListener('click',function(){pick(h.dataset.z)})});
 zb.forEach(function(b){b.addEventListener('click',function(){pick(b.dataset.z)})});
 if(location.hash){var t=document.querySelector(location.hash);if(t&&t.classList.contains('tr')){t.classList.add('hit');setTimeout(function(){t.classList.remove('hit')},2600)}}

 var lb=document.querySelector('.lb');
 if(lb){var li2=lb.querySelector('img');
  document.querySelectorAll('.gi').forEach(function(g){g.addEventListener('click',function(){li2.src=g.dataset.full;lb.classList.add('on');lb.setAttribute('aria-hidden','false')})});
  function close(){lb.classList.remove('on');lb.setAttribute('aria-hidden','true')}
  lb.addEventListener('click',function(e){if(e.target!==li2)close()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
 }

 var f=document.querySelector('.wform');
 if(f){f.addEventListener('submit',function(e){
  e.preventDefault();var n=f.n.value.trim(),s=f.s.value,t=f.querySelector('input[name=t]:checked').value;
  var msg='¡Hola Sara! '+(n?'Soy '+n+'. ':'')+'Quería pedir cita'+(s?' ('+s+')':'')+', '+t+'.';
  if(f.m.value.trim())msg+='\n'+f.m.value.trim();
  window.open(window.FZ_WA+'?text='+encodeURIComponent(msg),'_blank','noopener');
 });}
})();
