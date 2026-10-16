(() => {
  'use strict';
  const works = window.BRUNA_WORKS || [];
  const labels = { texto:'Texto', video:'Vídeo', audio:'Áudio' };
  const ordered = works
    .map((work,index) => {
      const [day,month,year] = work.date.split('/').map(Number);
      return { work,index,publishedAt:Date.UTC(year,month-1,day) };
    })
    .sort((a,b) => b.publishedAt-a.publishedAt || a.index-b.index)
    .map(entry => entry.work);
  const workGridMedia = window.matchMedia('(max-width:700px)');
  const gridColumns = () => workGridMedia.matches ? 2 : 3;
  const initialLimit = () => gridColumns() === 2 ? 8 : 9;
  const pageSize = () => gridColumns() * 3;
  let format = 'todos';
  let limit = initialLimit();
  const grid = document.querySelector('#work-grid');
  const more = document.querySelector('#show-more');
  const filters = Array.from(document.querySelectorAll('[data-filter]'));
  const escape = text => String(text).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
  function card(work) {
    const image = work.image ? `<img src="${escape(work.image)}" alt="Imagem do trabalho: ${escape(work.title)}" width="450" height="450" loading="lazy">` : `<div class="work-placeholder" aria-hidden="true">${escape(work.publisher)}</div>`;
    return `<article class="work-card"><a href="${escape(work.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(work.title)} — ${escape(work.publisher)} (abre em nova aba)"><div class="work-image">${image}<span class="format-flag">${labels[work.format].toUpperCase()}</span><span class="card-arrow" aria-hidden="true">↗</span></div><div class="work-meta"><span>${escape(work.publisher.toUpperCase())}</span><time datetime="${work.date.split('/').reverse().join('-')}">${work.date}</time></div><h3>${escape(work.title)}</h3><p class="work-topic">${escape(work.subject)}</p></a></article>`;
  }
  function render() {
    const filtered = ordered.filter(work => format === 'todos' || work.format === format);
    const visible = filtered.slice(0,limit);
    grid.innerHTML = visible.map(card).join('');
    grid.classList.toggle('filtered',format !== 'todos');
    grid.dataset.format = format;
    more.hidden = limit >= filtered.length;
    document.querySelector('#selection-note').textContent = `${visible.length} DE ${filtered.length} TRABALHO${filtered.length===1?'':'S'}${format === 'todos' ? ' · MAIS RECENTES PRIMEIRO' : ' · '+labels[format].toUpperCase()}`;
    document.querySelector('#work-status').textContent = `${visible.length} trabalho${visible.length===1?' exibido':'s exibidos'}. Filtro: ${format === 'todos' ? 'todos os formatos' : labels[format]}.`;
  }
  filters.forEach(button => {
    const filter = button.dataset.filter;
    const count = filter === 'todos' ? works.length : works.filter(work => work.format === filter).length;
    button.querySelector('span').textContent = String(count).padStart(2,'0');
    button.addEventListener('click',() => {
      format = filter;
      limit = initialLimit();
      filters.forEach(item => item.setAttribute('aria-pressed',String(item === button)));
      render();
    });
  });
  more.addEventListener('click',() => {
    const previousCount = grid.children.length;
    limit += pageSize();
    render();
    const firstNew = grid.children[previousCount]?.querySelector('a');
    if (firstNew) firstNew.focus({preventScroll:true});
  });
  workGridMedia.addEventListener?.('change',() => {
    limit = Math.ceil(limit / gridColumns()) * gridColumns();
    render();
  });
  render();

  const menuButton = document.querySelector('.menu-button');
  const navigation = document.querySelector('#navigation');
  function closeMenu() {menuButton.setAttribute('aria-expanded','false');navigation.classList.remove('is-open');menuButton.querySelector('span').textContent='+';}
  menuButton.addEventListener('click',() => {const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));navigation.classList.toggle('is-open',open);menuButton.querySelector('span').textContent=open?'−':'+';});
  navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus();}});
  document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu();});

  const archiveButton = document.querySelector('#archive-toggle');
  const archive = document.querySelector('#archive-panel');
  const search = document.querySelector('#archive-search');
  function renderArchive() {
    const query = search.value.trim().toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const results = ordered.filter(work => `${work.title} ${work.publisher} ${work.subject} ${work.date} ${labels[work.format]}`.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').includes(query));
    document.querySelector('#archive-list').innerHTML = results.map(work=>`<a class="archive-row" href="${escape(work.url)}" target="_blank" rel="noopener noreferrer"><span class="mono">${String(work.id).padStart(2,'0')}</span><span class="archive-title">${escape(work.title)}</span><span class="archive-publisher mono">${escape(work.publisher)}</span><time class="archive-date mono" datetime="${work.date.split('/').reverse().join('-')}">${work.date}</time><span aria-hidden="true">↗</span><span class="sr-only">Abre em nova aba</span></a>`).join('');
    document.querySelector('#archive-count').textContent = results.length ? `${results.length} TRABALHO${results.length===1?'':'S'} NO ACERVO` : 'NENHUM TRABALHO ENCONTRADO. TENTE OUTRO TERMO.';
  }
  archiveButton.addEventListener('click',()=>{const open=archive.hidden;archive.hidden=!open;archiveButton.setAttribute('aria-expanded',String(open));if(open){renderArchive();search.focus();}});
  search.addEventListener('input',renderArchive);
  const aboutSection = document.querySelector('.about-section');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (aboutSection && !motionPreference.matches && 'IntersectionObserver' in window) {
    let printTimer;
    function printProfile() {
      if (motionPreference.matches) return;
      aboutSection.classList.add('motion-ready');
      aboutSection.classList.remove('is-printed');
      void aboutSection.offsetWidth;
      requestAnimationFrame(() => requestAnimationFrame(() => aboutSection.classList.add('is-printed')));
    }
    function queuePrint() {
      window.clearTimeout(printTimer);
      printTimer = window.setTimeout(printProfile,70);
    }
    const printObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) queuePrint();
    }, { threshold:0.2,rootMargin:'0px 0px -8% 0px' });
    printObserver.observe(aboutSection);
    window.addEventListener('hashchange',() => {
      if (window.location.hash === '#sobre') queuePrint();
    });
    if (window.location.hash === '#sobre') queuePrint();
    motionPreference.addEventListener?.('change',event => {
      if (event.matches) {
        window.clearTimeout(printTimer);
        aboutSection.classList.remove('motion-ready','is-printed');
      }
    });
  }
  const contactSection = document.querySelector('.contact-section');
  if (contactSection && !motionPreference.matches && 'IntersectionObserver' in window) {
    const contactObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        contactSection.classList.add('motion-ready');
        requestAnimationFrame(() => requestAnimationFrame(() => contactSection.classList.add('is-printed')));
        contactObserver.unobserve(contactSection);
      }
    }, { threshold:0.12 });
    contactObserver.observe(contactSection);
    motionPreference.addEventListener?.('change',event => {
      if (event.matches) contactSection.classList.remove('motion-ready','is-printed');
    });
  }
})();
