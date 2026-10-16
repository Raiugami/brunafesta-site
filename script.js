(() => {
  'use strict';
  const works = window.BRUNA_WORKS || [];
  const labels = { texto:'Texto', video:'Vídeo', audio:'Áudio' };
  const selectedIds = [3,1,28,5,4,27,7,25];
  const curated = selectedIds.map(id => works.find(work => work.id === id)).filter(Boolean);
  const ordered = [...curated,...works.filter(work => !selectedIds.includes(work.id))];
  let format = 'todos';
  let limit = 8;
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
    document.querySelector('#selection-note').textContent = `${visible.length} DE ${filtered.length} TRABALHO${filtered.length===1?'':'S'}${format === 'todos' ? ' · UMA SELEÇÃO DO ACERVO' : ' · '+labels[format].toUpperCase()}`;
    document.querySelector('#work-status').textContent = `${visible.length} trabalho${visible.length===1?' exibido':'s exibidos'}. Filtro: ${format === 'todos' ? 'todos os formatos' : labels[format]}.`;
  }
  filters.forEach(button => {
    const filter = button.dataset.filter;
    const count = filter === 'todos' ? works.length : works.filter(work => work.format === filter).length;
    button.querySelector('span').textContent = String(count).padStart(2,'0');
    button.addEventListener('click',() => {
      format = filter;
      limit = 8;
      filters.forEach(item => item.setAttribute('aria-pressed',String(item === button)));
      render();
    });
  });
  more.addEventListener('click',() => {
    const previousCount = grid.children.length;
    limit += 9;
    render();
    const firstNew = grid.children[previousCount]?.querySelector('a');
    if (firstNew) firstNew.focus({preventScroll:true});
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
    const results = works.filter(work => `${work.title} ${work.publisher} ${work.subject} ${work.date} ${labels[work.format]}`.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').includes(query));
    document.querySelector('#archive-list').innerHTML = results.map(work=>`<a class="archive-row" href="${escape(work.url)}" target="_blank" rel="noopener noreferrer"><span class="mono">${String(work.id).padStart(2,'0')}</span><span class="archive-title">${escape(work.title)}</span><span class="archive-publisher mono">${escape(work.publisher)}</span><time class="archive-date mono" datetime="${work.date.split('/').reverse().join('-')}">${work.date}</time><span aria-hidden="true">↗</span><span class="sr-only">Abre em nova aba</span></a>`).join('');
    document.querySelector('#archive-count').textContent = results.length ? `${results.length} TRABALHO${results.length===1?'':'S'} NO ACERVO` : 'NENHUM TRABALHO ENCONTRADO. TENTE OUTRO TERMO.';
  }
  archiveButton.addEventListener('click',()=>{const open=archive.hidden;archive.hidden=!open;archiveButton.setAttribute('aria-expanded',String(open));if(open){renderArchive();search.focus();}});
  search.addEventListener('input',renderArchive);
  document.querySelector('#copy-email').addEventListener('click',async event=>{
    const button=event.currentTarget;
    const status=document.querySelector('#copy-status');
    try {await navigator.clipboard.writeText('bruna_festa@outlook.com');button.textContent='E-MAIL COPIADO ✓';status.textContent='E-mail copiado: bruna_festa@outlook.com';}
    catch {button.textContent='BRUNA_FESTA@OUTLOOK.COM';status.textContent='Não foi possível copiar automaticamente. Use o endereço exibido ou o link de e-mail.';}
  });
})();
