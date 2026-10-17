(async () => {
  'use strict';

  async function loadJson(path, fallback) {
    try {
      const response = await fetch(path, { cache: 'no-cache' });
      if (!response.ok) throw new Error(`Não foi possível carregar ${path}: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(error);
      return fallback;
    }
  }

  const [siteContent, loadedWorks] = await Promise.all([
    loadJson('data/site-content.json', {}),
    loadJson('data/works.json', { items: [] })
  ]);
  const works = Array.isArray(loadedWorks?.items) ? loadedWorks.items : [];
  const labels = { texto:'Texto', video:'Vídeo', audio:'Áudio' };
  const escape = text => String(text ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element && typeof value === 'string') element.textContent = value;
  }

  function setLinkLabel(selector, value) {
    const link = document.querySelector(selector);
    if (!link || typeof value !== 'string') return;
    const icon = link.querySelector('[aria-hidden="true"]');
    link.replaceChildren(document.createTextNode(`${value} `));
    if (icon) link.append(icon);
  }

  function setLines(element, lines) {
    if (!element || !Array.isArray(lines)) return;
    const nodes = [];
    lines.forEach((line, index) => {
      if (index) nodes.push(document.createElement('br'));
      nodes.push(document.createTextNode(String(line ?? '')));
    });
    element.replaceChildren(...nodes);
  }

  function setEmphasis(selector, before, emphasis, after = '') {
    const element = document.querySelector(selector);
    if (!element) return;
    const em = document.createElement('em');
    em.textContent = String(emphasis ?? '');
    element.replaceChildren(
      document.createTextNode(String(before ?? '')),
      em,
      document.createTextNode(String(after ?? ''))
    );
  }

  function safeImagePath(value, fallback) {
    const path = String(value ?? '').trim();
    if (/^(\.\/)?assets\/[\w./ -]+\.(?:avif|gif|jpe?g|png|svg|webp)$/i.test(path) && !path.split('/').includes('..')) {
      return path.replace(/^\.\//, '');
    }
    try {
      const url = new URL(path, window.location.href);
      return url.protocol === 'https:' ? url.href : fallback;
    } catch {
      return fallback;
    }
  }

  function safeExternalLink(value) {
    try {
      const url = new URL(String(value ?? ''));
      return url.protocol === 'https:' ? url.href : '#';
    } catch {
      return '#';
    }
  }

  function validEmail(value) {
    const email = String(value ?? '').trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : '';
  }

  function applySiteContent(content) {
    if (!content || typeof content !== 'object') return;
    const { brand = {}, hero = {}, archive: archiveContent = {}, profile = {}, experience = {}, references = {}, contact = {} } = content;
    setText('.brand-caption', brand.tagline);
    setText('.portrait-edition span:first-child', hero.editionLeft);
    setText('.portrait-edition span:last-child', hero.editionRight);

    const heroSideTitle = document.querySelector('.portrait-side-left .serif');
    if (heroSideTitle && hero.sideTitleLine1 !== undefined) {
      const emphasized = document.createElement('em');
      emphasized.textContent = String(hero.sideTitleEmphasis ?? '');
      heroSideTitle.replaceChildren(
        document.createTextNode(String(hero.sideTitleLine1 ?? '')),
        document.createElement('br'),
        document.createTextNode(`${String(hero.sideTitleLine2 ?? '')} `),
        emphasized
      );
    }
    setText('.portrait-side-left .mono', hero.sideCaption);
    setText('.portrait-side-right .mono', hero.profileNumber);
    setLines(document.querySelector('.portrait-side-right p'), [hero.roleFirstLine, hero.roleSecondLine]);
    setLines(document.querySelector('.portrait-baseline > p:first-child'), [hero.baselineFirstLine, hero.baselineSecondLine]);
    const formatLine = document.querySelector('.portrait-formats');
    if (formatLine && typeof hero.formats === 'string') {
      const formats = hero.formats.split(/\s*[·✳]\s*/).filter(Boolean);
      const nodes = [];
      formats.forEach((format, index) => {
        if (index) {
          nodes.push(document.createTextNode(' '));
          const separator = document.createElement('i');
          separator.setAttribute('aria-hidden', 'true');
          separator.textContent = '✳';
          nodes.push(separator, document.createTextNode(' '));
        }
        nodes.push(document.createTextNode(format));
      });
      formatLine.replaceChildren(...nodes);
    }
    const heroImage = document.querySelector('.hero-cutout');
    if (heroImage) heroImage.src = safeImagePath(hero.portrait, heroImage.getAttribute('src'));

    setText('#trabalhos .section-label span:first-child', archiveContent.sectionLabel);
    setText('#trabalhos .section-label span:last-child', archiveContent.period);
    const archiveHeading = document.querySelector('#work-title');
    if (archiveHeading && archiveContent.titleFirstLine !== undefined) {
      const emphasis = document.createElement('em');
      emphasis.textContent = String(archiveContent.titleEmphasis ?? '');
      archiveHeading.replaceChildren(
        document.createTextNode(String(archiveContent.titleFirstLine ?? '')),
        document.createElement('br'),
        document.createTextNode(`${String(archiveContent.titleSecondLine ?? '')} `),
        emphasis
      );
    }
    setLines(document.querySelector('#trabalhos .section-heading > p'), archiveContent.descriptionLines);

    setText('#sobre .section-label span:first-child', profile.sectionLabel);
    setText('#sobre .section-label span:last-child', profile.sectionNote);
    setText('#about-title', profile.title);
    const biography = document.querySelector('.about-columns');
    if (biography && Array.isArray(profile.paragraphs)) {
      biography.replaceChildren(...profile.paragraphs.map(paragraph => {
        const element = document.createElement('p');
        element.textContent = String(paragraph ?? '');
        return element;
      }));
    }
    const profileImage = document.querySelector('.profile-portrait img');
    if (profileImage) {
      profileImage.src = safeImagePath(profile.portrait, profileImage.getAttribute('src'));
      if (typeof profile.portraitAlt === 'string') profileImage.alt = profile.portraitAlt;
    }
    setLinkLabel('.about-copy .text-link', profile.cta);

    setText('.experience > p', experience.label);
    const experienceNames = document.querySelector('.experience-names');
    if (experienceNames && Array.isArray(experience.organizations)) {
      experienceNames.replaceChildren(...experience.organizations.map(item => {
        const name = document.createElement('span');
        name.textContent = String(item?.name ?? '');
        if (item?.suffix) {
          const suffix = document.createElement('small');
          suffix.textContent = String(item.suffix);
          name.append(' ', suffix);
        }
        return name;
      }));
    }

    setText('.references-section .section-label span:first-child', references.sectionLabel);
    setText('.references-section .section-label span:last-child', references.sectionNote);
    setEmphasis('#references-title', references.titleFirstLine ? `${references.titleFirstLine} ` : '', references.titleEmphasis);
    const referenceList = document.querySelector('.references-list');
    if (referenceList && Array.isArray(references.items)) {
      referenceList.replaceChildren(...references.items.map(item => {
        const row = document.createElement('div');
        const category = document.createElement('dt');
        category.className = 'mono';
        category.textContent = String(item?.category ?? '');
        const description = document.createElement('dd');
        description.textContent = String(item?.title ?? '');
        const subtitle = document.createElement('span');
        subtitle.textContent = String(item?.subtitle ?? '');
        description.append(subtitle);
        row.append(category, description);
        return row;
      }));
    }

    setText('#contato .section-label span:first-child', contact.sectionLabel);
    setText('#contato .section-label span:last-child', contact.sectionNote);
    setEmphasis('#contact-title', '', contact.titleEmphasis, ` ${String(contact.titleRest ?? '')}`);
    setText('.contact-note', contact.note);
    const email = validEmail(contact.email);
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    if (email) emailLinks.forEach(link => { link.href = `mailto:${email}`; });
    const tiktok = document.querySelector('.contact-method[href^="https://www.tiktok.com/"]');
    if (tiktok) tiktok.href = safeExternalLink(contact.tiktok);
  }

  applySiteContent(siteContent);

  function dateValue(value) {
    const raw = String(value ?? '');
    const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw);
    if (iso) return { timestamp:Date.UTC(Number(iso[1]),Number(iso[2])-1,Number(iso[3])), iso:raw, display:`${iso[3]}/${iso[2]}/${iso[1]}` };
    const local = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(raw);
    if (local) return { timestamp:Date.UTC(Number(local[3]),Number(local[2])-1,Number(local[1])), iso:`${local[3]}-${local[2]}-${local[1]}`, display:raw };
    return { timestamp:0, iso:'', display:raw };
  }

  const ordered = works
    .map((work,index) => ({ work,index,publishedAt:dateValue(work.date).timestamp }))
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

  function card(work) {
    const date = dateValue(work.date);
    const kind = labels[work.format] ? work.format : 'texto';
    const imagePath = safeImagePath(work.image, '');
    const image = imagePath ? `<img src="${escape(imagePath)}" alt="Imagem do trabalho: ${escape(work.title)}" width="450" height="450" loading="lazy">` : `<div class="work-placeholder" aria-hidden="true">${escape(work.publisher)}</div>`;
    return `<article class="work-card"><a href="${escape(safeExternalLink(work.url))}" target="_blank" rel="noopener noreferrer" aria-label="${escape(work.title)} — ${escape(work.publisher)} (abre em nova aba)"><div class="work-image">${image}<span class="format-flag">${labels[kind].toUpperCase()}</span><span class="card-arrow" aria-hidden="true">↗</span></div><div class="work-meta"><span>${escape(String(work.publisher ?? '').toUpperCase())}</span><time datetime="${escape(date.iso)}">${escape(date.display)}</time></div><h3>${escape(work.title)}</h3><p class="work-topic">${escape(work.subject)}</p></a></article>`;
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
    document.querySelector('#archive-list').innerHTML = results.map(work=>`<a class="archive-row" href="${escape(safeExternalLink(work.url))}" target="_blank" rel="noopener noreferrer"><span class="mono">${String(ordered.indexOf(work)+1).padStart(2,'0')}</span><span class="archive-title">${escape(work.title)}</span><span class="archive-publisher mono">${escape(work.publisher)}</span><time class="archive-date mono" datetime="${escape(dateValue(work.date).iso)}">${escape(dateValue(work.date).display)}</time><span aria-hidden="true">↗</span><span class="sr-only">Abre em nova aba</span></a>`).join('');
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
