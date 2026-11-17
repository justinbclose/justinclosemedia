/* ==========================================================================
   Justin Close Media: site behavior (no libraries needed)
   - Nav: current page, mobile menu
   - Home: full-screen hero (photo or video), work tiles
   - Photos: filters + viewer that opens from the thumbnail
   - Video: clips play on hover (desktop) or when centered (phone)
   - Drone: grid of photos and clips, opens full size in the viewer
   - Forms
   ========================================================================== */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const page = document.body.dataset.page;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = matchMedia('(hover: hover)').matches;

  const PHOTOS = window.PHOTOS || [];
  const VIDEOS = window.VIDEOS || [];
  const DRONE = window.DRONE || [];
  const GROUPS = window.GROUPS || [];
  const img = (file, small) => `images/portfolio/${file}${small ? '-sm' : ''}.jpg`;
  const vid = (v) => `video/${v.file}.mp4`;
  const poster = (v) => `video/${v.file}.jpg`;
  const pad = (n) => String(n).padStart(2, '0');
  // Where each square crop centers (set in photos.js FOCUS, or on an item as `focus`)
  const focus = (x) => { const f = x.focus || (window.FOCUS || {})[x.file]; return f ? ` style="object-position:${f}"` : ''; };
  const ratio = (p) => `width="1000" height="${Math.round((1000 * p.h) / p.w)}"`;

  $$('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------------- Soft arrival: lazy images fade in once loaded ---------------- */

  // 'load' doesn't bubble, but it does capture; this catches every image the
  // pages render later, too (tiles, grids, filter re-renders).
  const landed = (im) => im.classList.add('ld');
  document.addEventListener('load', (e) => {
    if (e.target.tagName === 'IMG' && e.target.loading === 'lazy') landed(e.target);
  }, true);
  // Back/forward cache restores skip load events: sweep anything already complete.
  const sweep = () => $$('img[loading="lazy"]').forEach((im) => { if (im.complete && im.naturalWidth) landed(im); });
  addEventListener('pageshow', sweep);
  addEventListener('DOMContentLoaded', sweep);

  /* ---------------- Nav ---------------- */

  $$('[data-nav]').forEach((a) => { if (a.dataset.nav === page) a.setAttribute('aria-current', 'page'); });
  const bar = $('.bar');
  const menuBtn = $('.menu-btn');
  const menuLabel = $('.menu-btn__label', menuBtn);
  const setMenu = (open) => {
    bar.classList.toggle('open', open);
    document.documentElement.classList.toggle('menu-open', open); // stops the page scrolling behind the menu
    menuBtn.setAttribute('aria-expanded', open);
    menuLabel.textContent = open ? 'Close' : 'Menu';
    // The page behind can't be reached with Tab while the menu is open (the viewer manages this itself)
    if (!$('#viewer.open')) ['main', 'body > .dark', '.skip'].forEach((sel) => { const el = $(sel); if (el) el.inert = open; });
  };
  menuBtn.addEventListener('click', () => setMenu(!bar.classList.contains('open')));
  $('#nav').addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bar.classList.contains('open')) { setMenu(false); menuBtn.focus(); }
  });
  matchMedia('(min-width: 821px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
  addEventListener('pageshow', () => setMenu(false)); // coming back with the Back button

  /* ---------------- Shared: hover-to-play video ---------------- */

  function hoverPlay(card) {
    const v = $('video', card);
    if (!v || reduced) return;
    const bar = $('.clip__bar', card);
    const play = () => { card.classList.add('playing'); v.play().catch(() => {}); };
    const stop = () => { card.classList.remove('playing'); v.pause(); };
    if (bar) v.addEventListener('timeupdate', () => (bar.style.width = (v.currentTime / v.duration) * 100 + '%'));
    if (canHover) {
      card.addEventListener('mouseenter', play);
      card.addEventListener('mouseleave', stop);
      card.addEventListener('focus', play);
      card.addEventListener('blur', stop);
    } else {
      // Phones: play the clip that's in the middle of the screen
      new IntersectionObserver(([e]) => (e.isIntersecting ? play() : stop()), { rootMargin: '-40% 0px -40% 0px' }).observe(card);
    }
  }

  /* ---------------- Home ---------------- */

  const tiles = $('#home-tiles');
  if (tiles) {
    tiles.innerHTML = (window.HOME_TILES || []).map((t, i) => {
      const media = t.video
        ? `<img src="${poster(t.video)}" alt="" loading="lazy"${focus(t.video)}><video src="${vid(t.video)}" muted loop playsinline preload="none" aria-hidden="true"${focus(t.video)}></video>`
        : `<img src="${img(t.file, true)}" alt="${t.alt || ''}" loading="lazy"${focus(t)}>`;
      return `<a class="tile rise${t.video ? ' tile--video' : ''}" href="${t.href}" style="--i:${i}">
        <div class="tile__media">${media}</div>
        <div class="tile__label"><span>${t.label}</span><span class="arr" aria-hidden="true"></span></div>
      </a>`;
    }).join('');
    $$('.tile--video', tiles).forEach(hoverPlay);
    // Slide the tiles in from the left, one after another, when the section scrolls into view
    if (!reduced && 'IntersectionObserver' in window) {
      $$('.tile', tiles).forEach((el, i) => el.style.setProperty('--i', i));
      tiles.classList.add('slide-ready');
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { tiles.classList.add('in'); io.disconnect(); }
      }, { threshold: 0.2 });
      io.observe(tiles);
    }
  }

  // Hero: swap in a background video once one is set in photos.js (HERO.video)
  const hero = $('#hero');
  if (hero && window.HERO && HERO.video) {
    const media = $('.hero__media', hero);
    const v = Object.assign(document.createElement('video'), {
      src: `video/${HERO.video}.mp4`, poster: `video/${HERO.video}.jpg`,
      muted: true, loop: true, playsInline: true, autoplay: !reduced,
    });
    v.setAttribute('aria-hidden', 'true');
    media.prepend(v);
    v.addEventListener('playing', () => { const i = $('img', media); if (i) i.remove(); }, { once: true });
  }

  /* ---------------- Viewer (Photos + Video pages) ---------------- */

  const viewer = $('#viewer');
  let items = [];
  let pos = 0;
  let lastFocus = null;

  function renderViewer() {
    const it = items[pos];
    const stage = $('#v-stage');
    stage.innerHTML = it.type === 'video'
      ? `<video src="${vid(it)}" poster="${poster(it)}" controls autoplay muted loop playsinline></video>`
      : `<img src="${img(it.file)}" srcset="${img(it.file, true)} 1000w, ${img(it.file)} 2000w" sizes="(max-width: 700px) 100vw, 80vw" alt="${it.alt}"${it.w && it.h ? ` style="--ar:${(it.w / it.h).toFixed(4)}"` : ''}>`;
    $('#v-title').textContent = it.title;
    $('#v-count').textContent = `${pad(pos + 1)} / ${pad(items.length)}`;
    $$('#v-thumbs button').forEach((b, i) => b.setAttribute('aria-current', i === pos));
    const cur = $(`#v-thumbs button[data-i="${pos}"]`);
    if (cur) cur.scrollIntoView({ block: 'nearest', inline: 'center' });
    // Warm the neighbors so stepping/swiping never shows a loading pop
    [pos + 1, pos - 1].forEach((i) => {
      const n = items[(i + items.length) % items.length];
      if (n && n.type !== 'video') new Image().src = img(n.file);
    });
  }

  function openViewer(list, index, fromEl) {
    items = list;
    pos = index;
    lastFocus = document.activeElement;
    $('#v-thumbs').innerHTML = items.map((it, i) =>
      `<button data-i="${i}" aria-label="Show ${it.title}"><img src="${it.type === 'video' ? poster(it) : img(it.file, true)}" alt=""></button>`).join('');
    renderViewer();

    const show = () => { viewer.classList.add('open'); document.body.style.overflow = 'hidden'; setInert(true); $('#v-close').focus(); };
    const thumb = fromEl && $('img', fromEl);
    if (reduced || !thumb || items[index].type === 'video') return show();

    // The photo grows from its thumbnail to the middle of the screen
    const it = items[index];
    const r = thumb.getBoundingClientRect();
    const s = Math.min((innerWidth * 0.8) / it.w, (innerHeight - 190) / it.h);
    const to = $('#v-stage img').getBoundingClientRect(); // where the full photo will sit
    const w = to.width || it.w * s, h = to.height || it.h * s;
    const left = to.width ? to.left : (innerWidth - w) / 2, top = to.width ? to.top : (innerHeight - h) / 2;
    const fly = new Image();
    fly.src = thumb.currentSrc || thumb.src;
    fly.className = 'fly';
    document.body.appendChild(fly);
    fly.animate([
      { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px' },
      { left: left + 'px', top: top + 'px', width: w + 'px', height: h + 'px' },
    ], { duration: 600, easing: 'cubic-bezier(0.22,1,0.36,1)', fill: 'forwards' }).onfinish = () => {
      show();
      setTimeout(() => fly.remove(), 250);
    };
  }

  // While the viewer is open, the page behind it can't be reached with Tab
  function setInert(on) { ['main', '.bar', 'body > .dark', '.skip'].forEach((s) => { const el = $(s); if (el) el.inert = on; }); }

  function closeViewer() {
    setInert(false);
    viewer.classList.remove('open');
    document.body.style.overflow = '';
    $('#v-stage').innerHTML = '';
    if (lastFocus) lastFocus.focus();
  }

  if (viewer) {
    const step = (d) => { pos = (pos + d + items.length) % items.length; renderViewer(); };
    $('#v-close').addEventListener('click', closeViewer);
    $('#v-prev').addEventListener('click', () => step(-1));
    $('#v-next').addEventListener('click', () => step(1));
    $('#v-thumbs').addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (b) { pos = +b.dataset.i; renderViewer(); }
    });
    viewer.addEventListener('click', (e) => { if (e.target.id === 'v-stage') closeViewer(); });
    addEventListener('keydown', (e) => {
      if (!viewer.classList.contains('open')) return;
      if (e.key === 'Escape') closeViewer();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
    // Swipe on phones
    let x0 = null;
    viewer.addEventListener('touchstart', (e) => { x0 = e.target.closest('video') ? null : e.touches[0].clientX; }, { passive: true });
    viewer.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      x0 = null;
    });
  }

  // Tabs for every category plus Video and Drone, sorted from most content to least
  function browseTabs() {
    const n = (g) => PHOTOS.filter((p) => p.group === g).length;
    return [
      ...GROUPS.map((g) => ({ id: g.id, name: g.name, n: n(g.id) })),
      { id: 'video', name: 'Video', n: VIDEOS.length, href: 'video.html' },
      { id: 'drone', name: 'Drone', n: DRONE.length, href: 'drone.html' },
    ].filter((x) => x.n).sort((a, b) => b.n - a.n || a.name.localeCompare(b.name));
  }

  /* ---------------- Mounted prints (Photos and Drone grids) ---------------- */

  // Each photo keeps its own shape, so the grid is columns of different heights.
  // Deal the prints into columns one by one, always into the shortest column, so the
  // first photos stay at the top (2 columns on phones, 3 on larger screens).
  const narrow = matchMedia('(max-width: 620px)');
  const tilt = (i) => [-0.9, 0.6, -0.4, 1][i % 4]; // degrees: a slight, uneven lean
  const shape = (x) => `aspect-ratio:${x.w}/${x.h}`;
  function deal(el, list, card) {
    const n = narrow.matches ? 2 : 3;
    const cols = Array.from({ length: n }, () => ({ h: 0, html: '' }));
    list.forEach((x, i) => {
      const col = cols.reduce((a, b) => (b.h < a.h ? b : a));
      col.html += card(x, i);
      col.h += x.h / x.w + (narrow.matches ? 0.3 : 0.2); // photo height + caption and gap, in column widths
    });
    el.innerHTML = cols.map((c) => `<div class="grid__col">${c.html}</div>`).join('');
  }

  // Phones show the filters as one sideways-scrolling row: bring the active one into view
  function showChip(rail) {
    const on = $('[aria-pressed="true"]', rail);
    if (on && rail.scrollWidth > rail.clientWidth) {
      rail.scrollTo({ left: on.offsetLeft - (rail.clientWidth - on.offsetWidth) / 2, behavior: reduced ? 'auto' : 'smooth' });
    }
  }

  /* ---------------- Photos page ---------------- */

  const grid = $('#grid');
  if (grid) {
    const filters = $('#filters');
    const count = (g) => PHOTOS.filter((p) => p.group === g).length;
    const groups = GROUPS.filter((g) => count(g.id));
    filters.innerHTML =
      `<button class="filter" data-f="all">All<sup class="num">${PHOTOS.length}</sup></button>` +
      browseTabs().map((x) => x.href
        ? `<a class="filter" href="${x.href}">${x.name}<sup class="num">${x.n}</sup></a>`
        : `<button class="filter" data-f="${x.id}">${x.name}<sup class="num">${x.n}</sup></button>`).join('');

    let visible = PHOTOS;
    let shown = 'all';
    const groupName = Object.fromEntries(GROUPS.map((g) => [g.id, g.name]));
    const render = (f) => {
      shown = f;
      visible = f === 'all' ? PHOTOS : PHOTOS.filter((p) => p.group === f);
      deal(grid, visible, (p, i) => `
        <button class="photo rise" style="--i:${Math.min(i, 16)};--r:${tilt(i)}deg" data-i="${i}" aria-label="Open ${p.title}">
          <div class="photo__img" style="${shape(p)}"><img src="${img(p.file, true)}" alt="${p.alt}" loading="lazy" ${ratio(p)}></div>
          <div class="photo__cap"><span>${p.title}</span><span>${groupName[p.group] || ''}</span></div>
        </button>`);
      $$('.filter', filters).forEach((b) => b.setAttribute('aria-pressed', b.dataset.f === f));
      showChip(filters);
    };
    const start = new URLSearchParams(location.search).get('c');
    render(groups.some((g) => g.id === start) ? start : 'all');

    filters.addEventListener('click', (e) => {
      const b = e.target.closest('.filter');
      if (!b) return;
      grid.classList.add('fading');
      setTimeout(() => { render(b.dataset.f); grid.classList.remove('fading'); }, reduced ? 0 : 200);
      const url = new URL(location);
      if (b.dataset.f === 'all') url.searchParams.delete('c'); else url.searchParams.set('c', b.dataset.f);
      history.replaceState(null, '', url);
    });
    grid.addEventListener('click', (e) => {
      const t = e.target.closest('.photo');
      if (t) openViewer(visible.map((p) => ({ ...p, type: 'photo' })), +t.dataset.i, t);
    });
    narrow.addEventListener('change', () => render(shown)); // phone <-> wide: deal the columns again
  }

  /* ---------------- Category tabs on the Video and Drone pages ---------------- */

  const pageTabs = $('#page-tabs');
  if (pageTabs) {
    const count = (g) => PHOTOS.filter((p) => p.group === g).length;
    const tab = (href, label, n, on) =>
      `<a class="filter" href="${href}"${on ? ' aria-current="page" aria-pressed="true"' : ''}>${label}<sup class="num">${n}</sup></a>`;
    pageTabs.innerHTML =
      tab('photos.html', 'All', PHOTOS.length) +
      browseTabs().map((x) => tab(x.href || `photos.html?c=${x.id}`, x.name, x.n, x.id === page)).join('');
    showChip(pageTabs);
  }

  /* ---------------- Video page ---------------- */

  const videos = $('#videos');
  if (videos) {
    const wide = VIDEOS.filter((v) => v.w > v.h);
    const tall = VIDEOS.filter((v) => v.w <= v.h);
    const card = (v, i, cls = '') => `
      <button class="clip rise ${cls}" style="--i:${i}" data-file="${v.file}" aria-label="Play ${v.title}">
        <div class="clip__media">
          <img src="${poster(v)}" alt="" loading="lazy"${focus(v)}>
          <video src="${vid(v)}" muted loop playsinline preload="none" aria-hidden="true"${focus(v)}></video>
          <span class="clip__play" aria-hidden="true">▶</span><span class="clip__bar"></span>
        </div>
        <div class="clip__cap"><span>${v.title}</span><span>${v.tag || ''}</span></div>
      </button>`;
    // Vertical clips first, wide clips last (each wide clip spans two columns)
    const ordered = [...tall, ...wide];
    videos.innerHTML = `<div class="vgrid">${ordered.map((v, i) => card(v, i, v.w > v.h ? 'clip--wide' : '')).join('')}</div>`;
    $$('.clip', videos).forEach(hoverPlay);
    const list = ordered.map((v) => ({ ...v, type: 'video' }));
    videos.addEventListener('click', (e) => {
      const c = e.target.closest('.clip');
      if (c) { $$('.clip video', videos).forEach((v) => v.pause()); openViewer(list, list.findIndex((v) => v.file === c.dataset.file), c); }
    });
  }

  /* ---------------- Drone page: grid of photos and clips ---------------- */

  const droneGrid = $('#drone-grid');
  if (droneGrid) {
    const list = DRONE.map((d) => ({ ...d, alt: d.alt || d.title }));
    const dealDrone = () => { deal(droneGrid, list, (d, i) => d.type === 'video' ? `
        <button class="photo clip rise" style="--i:${i};--r:${tilt(i)}deg" data-i="${i}" aria-label="Play ${d.title}">
          <div class="photo__img clip__media" style="${shape(d)}">
            <img src="${poster(d)}" alt="" loading="lazy"${focus(d)}>
            <video src="${vid(d)}" muted loop playsinline preload="none" aria-hidden="true"${focus(d)}></video>
            <span class="clip__play" aria-hidden="true">▶</span><span class="clip__bar"></span>
          </div>
          <div class="photo__cap"><span>${d.title}</span><span>Video</span></div>
        </button>` : `
        <button class="photo rise" style="--i:${i};--r:${tilt(i)}deg" data-i="${i}" aria-label="Open ${d.title}">
          <div class="photo__img" style="${shape(d)}"><img src="${img(d.file, true)}" alt="${d.alt}" loading="lazy" ${ratio(d)}></div>
          <div class="photo__cap"><span>${d.title}</span><span>Photo</span></div>
        </button>`);
      $$('.clip', droneGrid).forEach(hoverPlay);
    };
    dealDrone();
    narrow.addEventListener('change', dealDrone);
    droneGrid.addEventListener('click', (e) => {
      const t = e.target.closest('.photo');
      if (!t) return;
      $$('video', droneGrid).forEach((v) => v.pause());
      openViewer(list, +t.dataset.i, t);
    });
  }

  /* ---------------- Forms ---------------- */

  const cfg = window.SITE_CONFIG || {};
  $$('form[data-inquiry]').forEach((form) => {
    const status = $('.status', form);
    const send = $('button[type="submit"]', form);
    const say = (text, state = '') => { status.textContent = text; status.dataset.state = state; };
    // A field stops showing as wrong as soon as it's edited
    form.addEventListener('input', (e) => e.target.removeAttribute('aria-invalid'));
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (send.getAttribute('aria-busy') === 'true') return;
      const fd = new FormData(form);
      const name = $('input[name="name"]', form);
      const email = $('input[type="email"]', form);
      const bad = [];
      if (!name.value.trim()) bad.push(name);
      if (!email.value.trim() || !email.checkValidity()) bad.push(email);
      [name, email].forEach((f) => (bad.includes(f) ? f.setAttribute('aria-invalid', 'true') : f.removeAttribute('aria-invalid')));
      if (bad.length) {
        say('Please add your name and a valid email.', 'error');
        bad[0].focus();
        return;
      }
      if (!cfg.web3formsKey) {
        say('The form isn’t connected yet. Please email justinclosemedia@gmail.com.', 'error');
        return;
      }
      say('Sending…');
      send.setAttribute('aria-busy', 'true');
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: cfg.web3formsKey,
            subject: 'New inquiry from justinclosemedia.com',
            from_name: 'Justin Close Media website',
            name: fd.get('name'), email: fd.get('email'),
            property: fd.get('property') || '', city: fd.get('city') || '',
            need: fd.getAll('need').join(', '), timing: fd.get('timing') || '',
            message: fd.get('message') || '',
            page: location.pathname,
          }),
        });
        if (!(await res.json()).success) throw new Error();
        form.reset();
        say('Thanks! I’ll reply soon with next steps.', 'ok');
      } catch (err) {
        say('Something went wrong. Please email justinclosemedia@gmail.com.', 'error');
      } finally {
        send.removeAttribute('aria-busy');
      }
    });
  });

  const news = $('#newsletter-form');
  if (news) {
    const status = $('.status', news);
    news.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = $('input', news);
      if (!input.value || !input.checkValidity()) { status.textContent = 'Please enter a valid email.'; return; }
      if (!cfg.newsletterUrl) { status.textContent = 'Sign-up opens soon. Thanks for your interest!'; return; }
      try {
        await fetch(cfg.newsletterUrl, { method: 'POST', body: new FormData(news), mode: 'no-cors' });
        news.reset();
        status.textContent = 'You’re on the list. Thank you!';
      } catch (err) {
        status.textContent = 'Something went wrong. Please try again.';
      }
    });
  }
})();
