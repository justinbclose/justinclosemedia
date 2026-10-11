/* ==========================================================================
   Justin Close Media: site behavior
   1. Build galleries from js/photos.js
   2. UI (menu, header, cursor, lightbox, forms, video)
   3. Scroll animations (GSAP + ScrollTrigger + Lenis)
   ========================================================================== */
(function () {
  const html = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  if (!hasGsap) html.classList.remove('js'); // show everything if the libraries fail to load
  const motion = hasGsap && !html.classList.contains('reduced');

  const photos = window.PHOTOS || [];
  const cats = window.CATEGORIES || [];
  const page = document.body.dataset.page;
  const src = (p, small) => `images/portfolio/${p.file}${small ? '-sm' : ''}.jpg`;
  const catName = (id) => (cats.find((c) => c.id === id) || {}).name || id;
  const imgAttrs = (p) => `width="1000" height="${Math.round((1000 * p.h) / p.w)}"`;

  const store = {
    get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} },
  };

  $$('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ------------------------------------------------------------------
     1. Build galleries
     ------------------------------------------------------------------ */

  const track = $('#featured-track');
  if (track) {
    const featured = photos.filter((p) => p.featured);
    track.innerHTML =
      featured.map((p, i) => `
        <a class="card ${p.w > p.h ? 'card--wide' : 'card--tall'}" href="work.html?c=${p.category}" data-cursor>
          <div class="card__media"><img src="${src(p)}" alt="${p.alt}" loading="lazy" ${imgAttrs(p)}></div>
          <div class="card__caption">
            <span class="card__title">${p.title}</span>
            <span class="muted">${String(i + 1).padStart(2, '0')} / ${catName(p.category)}</span>
          </div>
        </a>`).join('') +
      `<a class="card card--end" href="work.html">
        <span class="eyebrow">${photos.length} photos</span>
        <span class="h2">All <em>work</em> →</span>
      </a>`;
  }

  const mosaic = $('#mosaic');
  if (mosaic) {
    // Show the non-featured photos first so the home page doesn't repeat itself.
    const ordered = [...photos.filter((p) => !p.featured), ...photos.filter((p) => p.featured)];
    const cols = [[], [], []];
    ordered.forEach((p, i) => cols[i % 3].push(p));
    mosaic.innerHTML = cols.map((col) => `
      <div class="mosaic__col">${col.map((p) => `
        <a class="tile" href="work.html?c=${p.category}" data-cursor>
          <img src="${src(p, true)}" alt="${p.alt}" loading="lazy" ${imgAttrs(p)}>
          <span class="tile__label">${catName(p.category)}</span>
        </a>`).join('')}
      </div>`).join('');
  }

  const grid = $('#grid');
  const filters = $('#filters');
  let visible = photos.map((_, i) => i);

  if (grid && filters) {
    grid.innerHTML = photos.map((p, i) => `
      <button class="tile" data-index="${i}" data-cat="${p.category}" data-cursor aria-label="Open ${p.title}">
        <img src="${src(p, true)}" alt="${p.alt}" loading="lazy" ${imgAttrs(p)}>
        <span class="tile__label">${catName(p.category)}</span>
      </button>`).join('');

    const count = (id) => photos.filter((p) => p.category === id).length;
    filters.innerHTML =
      `<button class="filter" data-filter="all">All<sup>${photos.length}</sup></button>` +
      cats.filter((c) => count(c.id)).map((c) => `<button class="filter" data-filter="${c.id}">${c.name}<sup>${count(c.id)}</sup></button>`).join('');

    const applyFilter = (id, animate) => {
      $$('.filter', filters).forEach((b) => {
        const on = b.dataset.filter === id;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', on);
      });
      const tiles = $$('.tile', grid);
      tiles.forEach((t) => (t.hidden = !(id === 'all' || t.dataset.cat === id)));
      visible = tiles.filter((t) => !t.hidden).map((t) => +t.dataset.index);
      if (animate && motion) {
        gsap.fromTo(tiles.filter((t) => !t.hidden), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: 'power3.out' });
      }
      if (hasGsap) ScrollTrigger.refresh();
    };

    const start = new URLSearchParams(location.search).get('c');
    applyFilter(cats.some((c) => c.id === start) ? start : 'all', false);

    filters.addEventListener('click', (e) => {
      const b = e.target.closest('.filter');
      if (!b) return;
      applyFilter(b.dataset.filter, true);
      const url = new URL(location);
      if (b.dataset.filter === 'all') url.searchParams.delete('c'); else url.searchParams.set('c', b.dataset.filter);
      history.replaceState(null, '', url);
    });
  }

  /* ------------------------------------------------------------------
     2. UI
     ------------------------------------------------------------------ */

  let lenis = null;

  // Mobile menu
  const header = $('.header');
  const menuBtn = $('.menu-btn');
  const closeMenu = () => {
    header.classList.remove('menu-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.textContent = 'Menu';
    if (lenis) lenis.start();
  };
  menuBtn.addEventListener('click', () => {
    const open = !header.classList.contains('menu-open');
    if (!open) return closeMenu();
    header.classList.add('menu-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.textContent = 'Close';
    if (lenis) lenis.stop();
  });
  $$('.nav a').forEach((a) => a.addEventListener('click', closeMenu));

  // Hide header when scrolling down, show when scrolling up
  let lastY = 0;
  const onScroll = (y) => {
    if (!header.classList.contains('menu-open')) header.classList.toggle('is-hidden', y > 200 && y > lastY);
    lastY = y;
  };
  if (!motion) addEventListener('scroll', () => onScroll(scrollY), { passive: true });

  // Custom cursor (mouse only)
  const cursor = $('.cursor');
  if (cursor && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const moveX = hasGsap ? gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' }) : (v) => (cursor.style.left = v + 'px');
    const moveY = hasGsap ? gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' }) : (v) => (cursor.style.top = v + 'px');
    addEventListener('mousemove', (e) => { cursor.style.opacity = 1; moveX(e.clientX); moveY(e.clientY); });
    document.addEventListener('mouseleave', () => (cursor.style.opacity = 0));
    document.addEventListener('mouseover', (e) => cursor.classList.toggle('is-view', !!e.target.closest('[data-cursor]')));
  }

  // Service rows: image preview follows the mouse
  const preview = $('.service-preview');
  if (preview && matchMedia('(hover: hover)').matches) {
    cats.forEach((c) => {
      const p = photos.find((x) => x.category === c.id);
      if (!p) return;
      const img = new Image();
      img.src = src(p, true);
      img.alt = '';
      img.dataset.cat = c.id;
      preview.appendChild(img);
    });
    const px = hasGsap ? gsap.quickTo(preview, 'x', { duration: 0.6, ease: 'power3' }) : null;
    const py = hasGsap ? gsap.quickTo(preview, 'y', { duration: 0.6, ease: 'power3' }) : null;
    $$('.service').forEach((row) => {
      row.addEventListener('mouseenter', () => {
        $$('img', preview).forEach((i) => i.classList.toggle('is-on', i.dataset.cat === row.dataset.preview));
        preview.classList.add('is-on');
      });
      row.addEventListener('mouseleave', () => preview.classList.remove('is-on'));
      row.addEventListener('mousemove', (e) => {
        if (px) { px(e.clientX + 30); py(e.clientY - 200); }
      });
    });
  }

  // Video: play only while on screen (not with reduced motion)
  $$('video').forEach((v) => {
    if (!motion) { v.controls = true; return; }
    new IntersectionObserver(([en]) => {
      if (en.isIntersecting) { v.preload = 'auto'; v.play().catch(() => {}); } else v.pause();
    }, { threshold: 0.25 }).observe(v);
  });

  // Lightbox (work page)
  const lb = $('#lightbox');
  if (lb && grid) {
    let pos = 0;
    let lastFocus = null;
    const show = () => {
      const p = photos[visible[pos]];
      $('#lb-img').src = src(p);
      $('#lb-img').alt = p.alt;
      $('#lb-title').textContent = p.title;
      $('#lb-count').textContent = `${pos + 1} / ${visible.length} · ${catName(p.category)}`;
    };
    const open = (index) => {
      lastFocus = document.activeElement;
      pos = Math.max(0, visible.indexOf(index));
      show();
      lb.classList.add('is-open');
      if (lenis) lenis.stop();
      $('#lb-close').focus();
    };
    const close = () => {
      lb.classList.remove('is-open');
      if (lenis) lenis.start();
      if (lastFocus) lastFocus.focus();
    };
    const step = (d) => { pos = (pos + d + visible.length) % visible.length; show(); };
    grid.addEventListener('click', (e) => {
      const t = e.target.closest('.tile');
      if (t) open(+t.dataset.index);
    });
    $('#lb-close').addEventListener('click', close);
    $('#lb-prev').addEventListener('click', () => step(-1));
    $('#lb-next').addEventListener('click', () => step(1));
    lb.addEventListener('click', (e) => { if (e.target === lb || e.target.classList.contains('lightbox__stage')) close(); });
    addEventListener('keydown', (e) => {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
  }

  // Forms
  const cfg = window.SITE_CONFIG || {};
  const contact = $('#contact-form');
  if (contact) {
    const status = $('.form__status', contact);
    contact.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(contact);
      if (!fd.get('name') || !$('#f-email').checkValidity() || !fd.get('email')) {
        status.textContent = 'Please add your name and a valid email.';
        return;
      }
      if (!cfg.web3formsKey) {
        status.textContent = 'The form isn’t connected yet. Add a Web3Forms key in js/config.js.';
        return;
      }
      status.textContent = 'Sending…';
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: cfg.web3formsKey,
            subject: 'New inquiry from justinclosemedia website',
            from_name: 'Justin Close Media website',
            name: fd.get('name'),
            email: fd.get('email'),
            property: fd.get('property'),
            shoot_type: fd.getAll('shoot_type').join(', '),
            message: fd.get('message'),
          }),
        });
        const data = await res.json();
        if (!data.success) throw new Error();
        contact.reset();
        status.textContent = 'Thank you! I’ll be in touch soon.';
      } catch (err) {
        status.textContent = 'Something went wrong. Please try again in a moment.';
      }
    });
  }

  const news = $('#newsletter-form');
  if (news) {
    const status = $('.form__status', news);
    news.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = $('input', news);
      if (!input.value || !input.checkValidity()) { status.textContent = 'Please enter a valid email.'; return; }
      if (!cfg.newsletterUrl) { status.textContent = 'Sign-up isn’t connected yet. Add your email tool’s form URL in js/config.js.'; return; }
      try {
        await fetch(cfg.newsletterUrl, { method: 'POST', body: new FormData(news), mode: 'no-cors' });
        news.reset();
        status.textContent = 'You’re on the list. Thank you!';
      } catch (err) {
        status.textContent = 'Something went wrong. Please try again.';
      }
    });
  }

  /* ------------------------------------------------------------------
     3. Scroll animations
     ------------------------------------------------------------------ */

  if (!motion) return;

  gsap.registerPlugin(ScrollTrigger);

  // Smooth scrolling
  if (window.Lenis) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on('scroll', (l) => { ScrollTrigger.update(); onScroll(l.scroll); });
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    addEventListener('scroll', () => onScroll(scrollY), { passive: true });
  }

  // Same-page anchor links scroll smoothly
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || !lenis) return;
    const target = a.getAttribute('href') === '#main' ? 0 : $(a.getAttribute('href'));
    if (target === null) return;
    e.preventDefault();
    lenis.scrollTo(target, { duration: 1.6 });
  });

  // Page wipe between pages
  const wipe = $('.wipe');
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    const url = new URL(a.href, location);
    if (url.origin !== location.origin || url.pathname === location.pathname) return;
    e.preventDefault();
    store.set('wipe', '1');
    gsap.fromTo(wipe, { y: 0, yPercent: 100 }, { y: 0, yPercent: 0, duration: 0.7, ease: 'power3.inOut', onComplete: () => (location.href = a.href) });
  });
  gsap.set(wipe, { y: 0, yPercent: 100 });
  // Undo the wipe if the user comes back with the browser's Back button
  addEventListener('pageshow', (e) => { if (e.persisted) gsap.set(wipe, { yPercent: 100 }); });
  const enteringFromWipe = store.get('wipe') === '1';
  store.set('wipe', '');
  if (enteringFromWipe) {
    gsap.set(wipe, { yPercent: 0 });
    gsap.to(wipe, { yPercent: -100, duration: 0.9, ease: 'power3.inOut', delay: 0.05 });
  }

  // Words light up one by one as you scroll
  $$('[data-words]').forEach((el) => {
    el.innerHTML = el.textContent.trim().split(/\s+/).map((w) => `<span class="word">${w}</span>`).join(' ');
    gsap.to($$('.word', el), {
      opacity: 1, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 50%', scrub: true },
    });
  });

  // Headings: lines slide up from a mask
  const lineGroups = $$('h1, h2, h3').filter((h) => $('.line', h) && !h.closest('.hero, .statement'));
  lineGroups.forEach((h) => {
    gsap.to($$('.line > span', h), {
      y: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out',
      scrollTrigger: { trigger: h, start: 'top 88%' },
    });
  });

  // Fade-up reveals
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%',
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.1, stagger: 0.1, ease: 'power3.out', overwrite: true }),
  });

  // Work page tiles
  if (grid) {
    gsap.set($$('.tile', grid), { opacity: 0, y: 40 });
    ScrollTrigger.batch($$('.tile', grid), {
      start: 'top 95%',
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: 'power3.out' }),
    });
  }

  // Hero: intro after the loader, then parallax on scroll
  const hero = $('.hero');
  const heroIn = () => {
    if (!hero) return;
    const tl = gsap.timeline();
    tl.fromTo('.hero__media img', { scale: 1.25 }, { scale: 1, duration: 2.2, ease: 'power3.out' })
      .to($$('.hero .line > span'), { y: 0, duration: 1.3, stagger: 0.12, ease: 'power4.out' }, 0.3)
      .from('[data-hero-fade]', { opacity: 0, y: 20, duration: 1, stagger: 0.1, ease: 'power3.out' }, 0.9);
  };
  if (hero) {
    gsap.to('.hero__media', {
      yPercent: 18, ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to('.hero__content', {
      y: -80, opacity: 0, ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: '60% top', scrub: true },
    });
  }

  // Loader (home page, once per visit)
  const loader = $('.loader');
  if (loader) {
    if (store.get('seenLoader') || enteringFromWipe) {
      loader.remove();
      heroIn();
    } else {
      store.set('seenLoader', '1');
      if (lenis) lenis.stop();
      gsap.timeline()
        .from('.loader__name span', { yPercent: 110, duration: 1, ease: 'power4.out' })
        .to('.loader__bar i', { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, 0.2)
        .to('.loader__name span', { yPercent: -110, duration: 0.7, ease: 'power3.in' }, '+=0.15')
        .to(loader, { yPercent: -100, duration: 1, ease: 'power4.inOut' }, '-=0.2')
        .add(() => { heroIn(); if (lenis) lenis.start(); }, '-=0.6')
        .add(() => loader.remove());
    }
  } else {
    heroIn();
  }

  const mm = gsap.matchMedia();

  // Selected work: vertical scroll moves the strip sideways (desktop)
  mm.add('(min-width: 900px)', () => {
    const section = $('.hscroll');
    if (!section || !track) return;
    const distance = () => track.scrollWidth - innerWidth;
    const slide = gsap.to(track, {
      x: () => -distance(), ease: 'none',
      scrollTrigger: {
        trigger: section, start: 'top top', end: () => '+=' + distance(),
        pin: true, scrub: 1, invalidateOnRefresh: true,
      },
    });
    $$('.card__media img', track).forEach((img) => {
      gsap.fromTo(img, { xPercent: -5 }, {
        xPercent: 5, ease: 'none',
        scrollTrigger: { trigger: img.closest('.card'), containerAnimation: slide, start: 'left right', end: 'right left', scrub: true },
      });
    });
  });

  // Statement image grows to full screen while pinned
  const statement = $('.statement');
  if (statement) {
    gsap.timeline({
      scrollTrigger: { trigger: statement, start: 'top top', end: '+=100%', pin: true, scrub: 1 },
    })
      .to('.statement__media', { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' }, 0)
      .to('.statement__media img', { scale: 1, ease: 'none' }, 0)
      .to($$('.statement .line > span'), { y: 0, stagger: 0.08, duration: 0.4, ease: 'power3.out' }, 0.45);
  }

  // Drone image slowly zooms out as it enters
  $$('[data-zoom]').forEach((img) => {
    gsap.fromTo(img, { scale: 1.3 }, {
      scale: 1, ease: 'none',
      scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  // Mosaic columns move at different speeds (desktop)
  mm.add('(min-width: 761px)', () => {
    if (!mosaic) return;
    [-40, -160, -90].forEach((y, i) => {
      const col = $$('.mosaic__col', mosaic)[i];
      if (col) gsap.to(col, { y, ease: 'none', scrollTrigger: { trigger: mosaic, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  });

  // About photo wipes open
  $$('[data-clip]').forEach((el) => {
    gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 80%' } })
      .fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power4.inOut' })
      .fromTo($('img', el), { scale: 1.3 }, { scale: 1, duration: 1.8, ease: 'power3.out' }, 0);
  });

  // Footer wordmark slides in
  const word = $('.footer__word');
  if (word) {
    gsap.fromTo(word, { xPercent: 12 }, {
      xPercent: 0, ease: 'none',
      scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true },
    });
  }

  // Arriving from another page with a #section in the URL
  addEventListener('load', () => {
    ScrollTrigger.refresh();
    if (location.hash && lenis) {
      const t = $(location.hash);
      if (t) lenis.scrollTo(t, { immediate: true });
    }
  });
})();
