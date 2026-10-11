/* ==========================================================================
   Justin Close Media: site behavior (no libraries needed)
   - Nav: current page, mobile menu
   - Home: full-screen hero (photo or video), work tiles
   - Photos: filters + viewer that opens from the thumbnail
   - Video: clips play on hover (desktop) or when centered (phone)
   - Drone: stage + draggable strip
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
  const ratio = (p) => `width="1000" height="${Math.round((1000 * p.h) / p.w)}"`;

  $$('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------------- Nav ---------------- */

  $$('[data-nav]').forEach((a) => { if (a.dataset.nav === page) a.setAttribute('aria-current', 'page'); });
  const bar = $('.bar');
  const menuBtn = $('.menu-btn');
  menuBtn.addEventListener('click', () => {
    const open = bar.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.textContent = open ? 'Close' : 'Menu';
  });

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
        ? `<img src="${poster(t.video)}" alt="" loading="lazy"><video src="${vid(t.video)}" muted loop playsinline preload="none" aria-hidden="true"></video>`
        : `<img src="${img(t.file, true)}" alt="${t.alt || ''}" loading="lazy">`;
      return `<a class="tile rise${t.video ? ' tile--video' : ''}" href="${t.href}" style="--i:${i}">
        <div class="tile__media">${media}</div>
        <div class="tile__label"><span>${t.label}</span><span>→</span></div>
      </a>`;
    }).join('');
    $$('.tile--video', tiles).forEach(hoverPlay);
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
  // Home: the top bar is see-through over the hero, solid after it
  if (hero) {
    const solid = () => bar.classList.toggle('solid', scrollY > hero.offsetHeight - 80);
    addEventListener('scroll', solid, { passive: true });
    solid();
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
      : `<img src="${img(it.file)}" srcset="${img(it.file, true)} 1000w, ${img(it.file)} 2000w" sizes="80vw" alt="${it.alt}">`;
    $('#v-title').textContent = it.title;
    $('#v-count').textContent = `${pad(pos + 1)} / ${pad(items.length)}`;
    $$('#v-thumbs button').forEach((b, i) => b.setAttribute('aria-current', i === pos));
    const cur = $(`#v-thumbs button[data-i="${pos}"]`);
    if (cur) cur.scrollIntoView({ block: 'nearest', inline: 'center' });
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
    const w = it.w * s, h = it.h * s;
    const fly = new Image();
    fly.src = thumb.currentSrc || thumb.src;
    fly.className = 'fly';
    document.body.appendChild(fly);
    fly.animate([
      { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px' },
      { left: (innerWidth - w) / 2 + 'px', top: (innerHeight - h) / 2 + 'px', width: w + 'px', height: h + 'px' },
    ], { duration: 600, easing: 'cubic-bezier(0.22,1,0.36,1)', fill: 'forwards' }).onfinish = () => {
      show();
      setTimeout(() => fly.remove(), 250);
    };
  }

  // While the viewer is open, the page behind it can't be reached with Tab
  function setInert(on) { ['main', '.bar', 'body > .dark'].forEach((s) => { const el = $(s); if (el) el.inert = on; }); }

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

  /* ---------------- Photos page ---------------- */

  const grid = $('#grid');
  if (grid) {
    const filters = $('#filters');
    const count = (g) => PHOTOS.filter((p) => p.group === g).length;
    const groups = GROUPS.filter((g) => count(g.id));
    filters.innerHTML =
      `<button class="filter" data-f="all">All<sup class="num">${PHOTOS.length}</sup></button>` +
      groups.map((g) => `<button class="filter" data-f="${g.id}">${g.name}<sup class="num">${count(g.id)}</sup></button>`).join('');

    let visible = PHOTOS;
    const render = (f) => {
      visible = f === 'all' ? PHOTOS : PHOTOS.filter((p) => p.group === f);
      grid.innerHTML = visible.map((p, i) => `
        <button class="photo rise" style="--i:${Math.min(i, 16)}" data-i="${i}" aria-label="Open ${p.title}">
          <div class="photo__img"><img src="${img(p.file, true)}" alt="${p.alt}" loading="lazy" ${ratio(p)}></div>
          <div class="photo__cap"><span>${p.title}</span><span class="num">${pad(i + 1)}</span></div>
        </button>`).join('');
      $$('.filter', filters).forEach((b) => b.setAttribute('aria-pressed', b.dataset.f === f));
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
  }

  /* ---------------- Video page ---------------- */

  const videos = $('#videos');
  if (videos) {
    const wide = VIDEOS.filter((v) => v.w > v.h);
    const tall = VIDEOS.filter((v) => v.w <= v.h);
    const card = (v, i, cls = '') => `
      <button class="clip rise ${cls}" style="--i:${i}" data-file="${v.file}" aria-label="Play ${v.title}">
        <div class="clip__media">
          <img src="${poster(v)}" alt="" loading="lazy">
          <video src="${vid(v)}" muted loop playsinline preload="none" aria-hidden="true"></video>
          <span class="clip__play" aria-hidden="true">▶</span><span class="clip__bar"></span>
        </div>
        <div class="clip__cap"><span>${v.title}</span><span>${v.tag || ''}</span></div>
      </button>`;
    videos.innerHTML =
      (wide[0] ? `<div class="feature">${card(wide[0], 0, 'clip--wide')}</div>` : '') +
      `<div class="vgrid">${[...tall, ...wide.slice(1)].map((v, i) => card(v, i + 1, v.w > v.h ? 'clip--wide' : '')).join('')}</div>`;
    $$('.clip', videos).forEach(hoverPlay);
    const list = VIDEOS.map((v) => ({ ...v, type: 'video' }));
    videos.addEventListener('click', (e) => {
      const c = e.target.closest('.clip');
      if (c) { $$('.clip video', videos).forEach((v) => v.pause()); openViewer(list, list.findIndex((v) => v.file === c.dataset.file), c); }
    });
  }

  /* ---------------- Drone page ---------------- */

  const strip = $('#strip');
  if (strip) {
    const stage = $('#stage');
    let cur = 0;
    strip.innerHTML = DRONE.map((d, i) => `
      <button data-i="${i}" aria-label="Show ${d.title}">
        <img src="${d.type === 'video' ? poster(d) : img(d.file, true)}" alt="" loading="lazy">
        ${d.type === 'video' ? '<span class="play-mark">▶ Video</span>' : ''}
      </button>`).join('');

    const show = (i, instant) => {
      cur = (i + DRONE.length) % DRONE.length;
      const d = DRONE[cur];
      const el = d.type === 'video'
        ? Object.assign(document.createElement('video'), { src: vid(d), poster: poster(d), muted: true, loop: true, autoplay: !reduced, playsInline: true })
        : Object.assign(document.createElement('img'), { src: img(d.file), srcset: `${img(d.file, true)} 1000w, ${img(d.file)} 2000w`, sizes: '(max-width: 820px) 100vw, 75vw', alt: d.alt || d.title });
      if (!instant && !reduced) { el.style.opacity = 0; }
      stage.appendChild(el);
      const done = () => { $$('img, video', stage).forEach((n) => n !== el && n.remove()); };
      if (instant || reduced) done();
      else requestAnimationFrame(() => { el.style.transition = 'opacity 350ms cubic-bezier(0.22,1,0.36,1)'; el.style.opacity = 1; setTimeout(done, 380); });
      $('#stage-title').textContent = d.title;
      $('#stage-text').textContent = d.text || '';
      $('#stage-count').textContent = `${pad(cur + 1)} / ${pad(DRONE.length)}`;
      $$('button', strip).forEach((b, k) => b.setAttribute('aria-current', k === cur));
      if (!instant) strip.children[cur].scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduced ? 'auto' : 'smooth' });
    };
    show(0, true);

    // Hover previews (desktop), click/tap selects
    let dragged = false;
    strip.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (b && !dragged) show(+b.dataset.i);
    });
    if (canHover) {
      let t;
      strip.addEventListener('mouseover', (e) => {
        const b = e.target.closest('button');
        clearTimeout(t);
        if (b && +b.dataset.i !== cur) t = setTimeout(() => show(+b.dataset.i), 180);
      });
    }
    addEventListener('keydown', (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.target.closest('input, textarea, select, [contenteditable]')) return;
      if (e.key === 'ArrowRight') show(cur + 1);
      if (e.key === 'ArrowLeft') show(cur - 1);
    });
    // Drag to scroll the strip
    let down = false, x0 = 0, s0 = 0;
    strip.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') return; down = true; dragged = false; x0 = e.clientX; s0 = strip.scrollLeft; });
    addEventListener('pointermove', (e) => {
      if (!down) return;
      if (Math.abs(e.clientX - x0) > 5) { dragged = true; strip.classList.add('dragging'); }
      strip.scrollLeft = s0 - (e.clientX - x0);
    });
    addEventListener('pointerup', () => { down = false; strip.classList.remove('dragging'); setTimeout(() => (dragged = false), 0); });
  }

  /* ---------------- Forms ---------------- */

  const cfg = window.SITE_CONFIG || {};
  $$('form[data-inquiry]').forEach((form) => {
    const status = $('.status', form);
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const email = $('input[type="email"]', form);
      if (!fd.get('name') || !fd.get('email') || !email.checkValidity()) {
        status.textContent = 'Please add your name and a valid email.';
        return;
      }
      if (!cfg.web3formsKey) {
        status.textContent = 'The form isn’t connected yet. Please email justinclosemedia@gmail.com.';
        return;
      }
      status.textContent = 'Sending…';
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
        status.textContent = 'Thanks! I’ll reply soon with next steps.';
      } catch (err) {
        status.textContent = 'Something went wrong. Please email justinclosemedia@gmail.com.';
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
