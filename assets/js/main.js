(function(){
  if (window.lucide) lucide.createIcons();
  var nav = document.getElementById('mainNav');
  function onScroll(){ nav && nav.classList.toggle('scrolled', window.scrollY > 40); }
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});
  // close mobile menu on link click
  document.querySelectorAll('#navMenu a').forEach(function(a){ a.addEventListener('click', function(){
    var c = document.getElementById('navMenu'); if (c.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(c).hide(); }); });
  // reveal on scroll
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} }); }, {threshold:.12}) : null;
  document.querySelectorAll('.reveal').forEach(function(el){ io ? io.observe(el) : el.classList.add('in'); });
  // prefill subject from Enquire buttons
  document.querySelectorAll('[data-subject]').forEach(function(b){ b.addEventListener('click', function(){ var s=document.getElementById('f-subject'); if(s) s.value=b.dataset.subject; }); });
  // lightbox
  var lb = document.getElementById('lightbox'), items = [].slice.call(document.querySelectorAll('.sp-gitem')), cur = 0;
  function show(i){ cur=(i+items.length)%items.length; var it=items[cur]; lb.querySelector('img').src=it.dataset.src; lb.querySelector('img').alt=it.dataset.caption||''; lb.querySelector('figcaption').textContent=it.dataset.caption||''; lb.hidden=false; document.body.style.overflow='hidden'; }
  function hide(){ lb.hidden=true; document.body.style.overflow=''; }
  items.forEach(function(it,i){ it.addEventListener('click', function(){ show(i); }); });
  if (lb){ lb.querySelector('.sp-lb-close').onclick=hide; lb.querySelector('.sp-lb-prev').onclick=function(){show(cur-1)}; lb.querySelector('.sp-lb-next').onclick=function(){show(cur+1)};
    lb.addEventListener('click', function(e){ if(e.target===lb) hide(); });
    document.addEventListener('keydown', function(e){ if(lb.hidden) return; if(e.key==='Escape')hide(); if(e.key==='ArrowLeft')show(cur-1); if(e.key==='ArrowRight')show(cur+1); }); }
  // floor plan zoom
  var v = document.getElementById('floorViewer'), stage = v && v.querySelector('.sp-viewer-stage');
  if (stage){ var img=stage.querySelector('img'), z=1, x=0, y=0, drag=null;
    function apply(){ img.style.transform='translate('+x+'px,'+y+'px) scale('+z+')'; }
    v.querySelectorAll('[data-zoom]').forEach(function(b){ b.onclick=function(){ var a=b.dataset.zoom;
      if(a==='in') z=Math.min(z+.4,5); if(a==='out') z=Math.max(z-.4,1); if(a==='reset'){z=1;x=0;y=0;}
      if(a==='full'){ document.fullscreenElement ? document.exitFullscreen() : v.requestFullscreen && v.requestFullscreen(); }
      if(z===1){x=0;y=0;} apply(); }; });
    stage.addEventListener('wheel', function(e){ e.preventDefault(); z=Math.min(5,Math.max(1,z+(e.deltaY<0?.25:-.25))); if(z===1){x=0;y=0;} apply(); }, {passive:false});
    stage.addEventListener('pointerdown', function(e){ if(z>1){ drag={sx:e.clientX-x, sy:e.clientY-y}; stage.setPointerCapture(e.pointerId);} });
    stage.addEventListener('pointermove', function(e){ if(drag){ x=e.clientX-drag.sx; y=e.clientY-drag.sy; apply(); } });
    stage.addEventListener('pointerup', function(){ drag=null; });
  }
})();
