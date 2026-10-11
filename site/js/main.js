/* ==========================================================================
   Justin Close Media: site behavior
   1. Build galleries from js/photos.js
   2. UI (menu, header, cursor, magnetic buttons, lightbox, forms, video)
   3. Scroll experience (GSAP + ScrollTrigger + Lenis + WebGL images)
   ========================================================================== */
(function () {
  const html = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  if (!hasGsap) html.classList.remove('js'); // show everything if the libraries fail to load
  const motion = hasGsap && !html.classList.contains('reduced');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

  const photos = window.PHOTOS || [];
  const story = window.STORY || [];
  const cats = window.CATEGORIES || [];
  const src = (file, small) => `images/portfolio/${file}${small ? '-sm' : ''}.jpg`;
  const byFile = (file) => photos.find((p) => p.file === file) || { file, alt: '', w: 3, h: 4 };
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

  // A guest's day
  const storySteps = $('#story-steps');
  const storyMedia = $('#story-media');
  if (storySteps && storyMedia) {
    storySteps.innerHTML = story.map((s, i) => `
      <div class="step" data-step="${i}">
        <span class="step__time">${String(i + 1).padStart(2, '0')} · ${s.time}</span>
        <h3 class="step__title">${s.title}</h3>
        <p class="muted">${s.text}</p>
      </div>`).join('');
    storyMedia.innerHTML = story.map((s, i) => {
      const p = byFile(s.file);
      return `
      <figure class="scene" data-scene="${i}">
        <div class="scene__img"><img src="${src(p.file)}" alt="${p.alt}" loading="lazy"></div>
        <figcaption class="scene__caption">
          <span class="step__time">${String(i + 1).padStart(2, '0')} · ${s.time}</span>
          <span class="step__title">${s.title}</span>
          <span class="muted">${s.text}</span>
        </figcaption>
      </figure>`;
    }).join('');
  }

  // Drone strip
  const droneTrack = $('#drone-track');
  if (droneTrack) {
    const drone = photos.filter((p) => p.category === 'drone');
    droneTrack.innerHTML =
      drone.map((p, i) => `
        <a class="card ${p.w > p.h ? 'card--wide' : 'card--tall'}" href="work.html?c=drone" data-cursor>
          <div class="card__media" data-gl-card><img src="${src(p.file)}" alt="${p.alt}" loading="lazy" ${imgAttrs(p)}></div>
          <div class="card__caption">
            <span class="card__title">${p.title}</span>
            <span class="muted">${String(i + 1).padStart(2, '0')}</span>
          </div>
        </a>`).join('') +
      `<a class="card card--end" href="work.html?c=drone" data-cursor>
        <span class="eyebrow">${drone.length} aerials</span>
        <span class="h2">All <em>drone</em> →</span>
      </a>`;
  }

  // Work page grid
  const grid = $('#grid');
  const filters = $('#filters');
  let visible = photos.map((_, i) => i);

  if (grid && filters) {
    grid.innerHTML = photos.map((p, i) => `
      <button class="tile" data-index="${i}" data-cat="${p.category}" data-cursor aria-label="Open ${p.title}">
        <span class="tile__media" data-gl-card><img src="${src(p.file, true)}" alt="${p.alt}" loading="lazy" ${imgAttrs(p)}></span>
        <span class="tile__label">${catName(p.category)}</span>
      </button>`).join('');

    const count = (id) => photos.filter((p) => p.category === id).length;
    filters.innerHTML =
      `<button class="filter" data-filter="all" data-magnetic>All<sup>${photos.length}</sup></button>` +
      cats.filter((c) => count(c.id)).map((c) => `<button class="filter" data-filter="${c.id}" data-magnetic>${c.name}<sup>${count(c.id)}</sup></button>`).join('');

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
        gsap.fromTo(tiles.filter((t) => !t.hidden), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.06, ease: 'power3.out' });
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
    if (header.classList.contains('menu-open')) return closeMenu();
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

  // Custom cursor
  const cursor = $('.cursor');
  if (cursor && finePointer) {
    const moveX = hasGsap ? gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' }) : (v) => (cursor.style.left = v + 'px');
    const moveY = hasGsap ? gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' }) : (v) => (cursor.style.top = v + 'px');
    addEventListener('mousemove', (e) => { cursor.style.opacity = 1; moveX(e.clientX); moveY(e.clientY); });
    document.addEventListener('mouseleave', () => (cursor.style.opacity = 0));
    document.addEventListener('mouseover', (e) => cursor.classList.toggle('is-view', !!e.target.closest('[data-cursor]')));
  }

  // Magnetic buttons: pull toward the cursor
  if (motion && finePointer) {
    $$('[data-magnetic]').forEach((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.3);
        yTo((e.clientY - r.top - r.height / 2) * 0.4);
      });
      el.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
    });
  }

  // Service rows: image preview follows the mouse
  const preview = $('.service-preview');
  if (preview && matchMedia('(hover: hover)').matches) {
    cats.forEach((c) => {
      const p = photos.find((x) => x.category === c.id);
      if (!p) return;
      const img = new Image();
      img.src = src(p.file, true);
      img.alt = '';
      img.dataset.cat = c.id;
      preview.appendChild(img);
    });
    const px = hasGsap ? gsap.quickTo(preview, 'x', { duration: 0.6, ease: 'power3' }) : null;
    const py = hasGsap ? gsap.quickTo(preview, 'y', { duration: 0.6, ease: 'power3' }) : null;
    const rot = hasGsap ? gsap.quickTo(preview, 'rotation', { duration: 0.8, ease: 'power3' }) : null;
    let lastX = 0;
    $$('.service').forEach((row) => {
      row.addEventListener('mouseenter', () => {
        $$('img', preview).forEach((i) => i.classList.toggle('is-on', i.dataset.cat === row.dataset.preview));
        preview.classList.add('is-on');
      });
      row.addEventListener('mouseleave', () => { preview.classList.remove('is-on'); if (rot) rot(0); });
      row.addEventListener('mousemove', (e) => {
        if (!px) return;
        px(e.clientX + 30); py(e.clientY - 200);
        rot(Math.max(-8, Math.min(8, (e.clientX - lastX) * 0.6)));
        lastX = e.clientX;
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

  // Lightbox (work page): the photo grows from its tile to full screen
  const lb = $('#lightbox');
  if (lb && grid) {
    let pos = 0;
    let lastFocus = null;
    const lbImg = $('#lb-img');
    const show = () => {
      const p = photos[visible[pos]];
      lbImg.src = src(p.file);
      lbImg.alt = p.alt;
      $('#lb-title').textContent = p.title;
      $('#lb-count').textContent = `${pos + 1} / ${visible.length} · ${catName(p.category)}`;
    };
    const finishOpen = () => {
      lb.classList.add('is-open');
      if (lenis) lenis.stop();
      $('#lb-close').focus();
    };
    const open = (index, tile) => {
      lastFocus = document.activeElement;
      pos = Math.max(0, visible.indexOf(index));
      show();
      const from = tile && $('img', tile);
      if (!motion || !from) return finishOpen();

      // Fly a copy of the photo from the tile to the center of the screen
      const p = photos[index];
      const r = from.getBoundingClientRect();
      const maxW = innerWidth - 64;
      const maxH = innerHeight - 150;
      const scale = Math.min(maxW / p.w, maxH / p.h);
      const w = p.w * scale, h = p.h * scale;
      const fly = new Image();
      fly.src = from.currentSrc || from.src;
      fly.className = 'fly';
      Object.assign(fly.style, { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px' });
      document.body.appendChild(fly);
      lb.classList.add('is-backdrop');
      gsap.to(fly, {
        left: (innerWidth - w) / 2, top: (innerHeight - h) / 2, width: w, height: h,
        duration: 0.85, ease: 'expo.inOut',
        onComplete: () => { finishOpen(); lb.classList.remove('is-backdrop'); gsap.to(fly, { opacity: 0, duration: 0.3, delay: 0.15, onComplete: () => fly.remove() }); },
      });
    };
    const close = () => {
      lb.classList.remove('is-open');
      if (lenis) lenis.start();
      if (lastFocus) lastFocus.focus();
    };
    const step = (d) => {
      pos = (pos + d + visible.length) % visible.length;
      if (motion) gsap.fromTo(lbImg, { opacity: 0, x: 40 * d }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' });
      show();
    };
    grid.addEventListener('click', (e) => {
      const t = e.target.closest('.tile');
      if (t) open(+t.dataset.index, t);
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
      if (!fd.get('name') || !fd.get('email') || !$('#f-email').checkValidity()) {
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
        status.textContent = 'Something went wrong. Please email justinclosemedia@gmail.com.';
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

  /* ------------------------------------------------------------------
     3. Scroll experience
     ------------------------------------------------------------------ */

  if (!motion) return;

  gsap.registerPlugin(ScrollTrigger);

  // Living images
  const gl = new Map();
  if (window.GL && GL.supported) {
    $$('[data-gl]').forEach((el) => {
      const fx = GL.attach(el, { zoom: parseFloat(el.dataset.glZoom) || 1 });
      if (fx) gl.set(el, fx);
    });
    $$('[data-gl-card]').forEach((el) => {
      const fx = GL.attach(el, { zoom: 1.08 });
      if (fx) gl.set(el, fx);
    });
  }

  // Smooth scrolling (also feeds scroll speed to the WebGL images)
  if (window.Lenis) {
    lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    lenis.on('scroll', (l) => {
      ScrollTrigger.update();
      onScroll(l.scroll);
      if (window.GL) GL.setVelocity(l.velocity);
    });
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
    lenis.scrollTo(target, { duration: 1.8 });
  });

  // Page wipe between pages
  const wipe = $('.wipe');
  gsap.set(wipe, { y: 0, yPercent: 100 });
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    const url = new URL(a.href, location);
    if (url.origin !== location.origin || url.pathname === location.pathname || url.protocol === 'mailto:') return;
    e.preventDefault();
    store.set('wipe', '1');
    gsap.to(wipe, { yPercent: 0, duration: 0.75, ease: 'expo.inOut', onComplete: () => (location.href = a.href) });
  });
  addEventListener('pageshow', (e) => { if (e.persisted) gsap.set(wipe, { yPercent: 100 }); });
  const enteringFromWipe = store.get('wipe') === '1';
  store.set('wipe', '');
  if (enteringFromWipe) {
    gsap.set(wipe, { yPercent: 0 });
    gsap.to(wipe, { yPercent: -100, duration: 1, ease: 'expo.inOut', delay: 0.05 });
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
  $$('h1, h2, h3').filter((h) => $('.line', h) && !h.closest('.hero')).forEach((h) => {
    gsap.to($$('.line > span', h), {
      y: 0, duration: 1.3, stagger: 0.1, ease: 'expo.out',
      scrollTrigger: { trigger: h, start: 'top 88%' },
    });
  });

  // Fade-up reveals
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%',
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: 'expo.out', overwrite: true }),
  });

  // Work page tiles rise in
  if (grid) {
    gsap.set($$('.tile', grid), { opacity: 0, y: 60 });
    ScrollTrigger.batch($$('.tile', grid), {
      start: 'top 95%',
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.1, stagger: 0.08, ease: 'expo.out' }),
    });
  }

  // Hero: zooms in on load, then pushes back as you scroll
  const hero = $('.hero');
  const heroMedia = $('.hero__media');
  const heroFx = heroMedia && gl.get(heroMedia);
  const zoomTarget = (el, fx) => (fx ? fx : $('img', el));
  const zoomProp = (fx) => (fx ? 'zoom' : 'scale');

  const heroIn = () => {
    if (!hero) return;
    const tl = gsap.timeline();
    if (heroFx) {
      heroFx.reveal = 0;
      tl.to(heroFx, { reveal: 1, duration: 1.8, ease: 'power3.inOut' }, 0)
        .fromTo(heroFx, { zoom: 1.5 }, { zoom: 1.25, duration: 2.4, ease: 'expo.out' }, 0);
    } else {
      tl.fromTo('.hero__media img', { scale: 1.3 }, { scale: 1, duration: 2.2, ease: 'expo.out' }, 0);
    }
    tl.to($$('.hero .line > span'), { y: 0, duration: 1.4, stagger: 0.12, ease: 'expo.out' }, 0.5)
      .from('[data-hero-fade]', { opacity: 0, y: 20, duration: 1, stagger: 0.1, ease: 'power3.out' }, 1);
  };
  if (hero) {
    gsap.to(zoomTarget(heroMedia, heroFx), {
      [zoomProp(heroFx)]: heroFx ? 1 : 1.15, ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to('.hero__media', {
      yPercent: 20, ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to('.hero__content', {
      y: -100, opacity: 0, ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: '60% top', scrub: true },
    });
  }

  // Loader: counts to 100 while images load (home page, once per visit)
  const loader = $('.loader');
  if (loader) {
    if (store.get('seenLoader') || enteringFromWipe) {
      loader.remove();
      heroIn();
    } else {
      store.set('seenLoader', '1');
      if (lenis) lenis.stop();
      const counter = { v: 0 };
      const num = $('.loader__count span');
      const tick = () => (num.textContent = Math.round(counter.v));
      const loaded = new Promise((res) => (document.readyState === 'complete' ? res() : addEventListener('load', res, { once: true })));
      gsap.from('.loader__name span', { yPercent: 110, duration: 1.1, ease: 'expo.out' });
      gsap.to(counter, { v: 85, duration: 1.4, ease: 'power2.out', onUpdate: tick });
      Promise.race([loaded, new Promise((r) => setTimeout(r, 3500))]).then(() => {
        gsap.timeline()
          .to(counter, { v: 100, duration: 0.5, ease: 'power2.out', onUpdate: tick })
          .to(['.loader__name span', '.loader__count'], { yPercent: -110, opacity: 0, duration: 0.6, ease: 'power3.in' })
          .to(loader, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'expo.inOut' }, '-=0.15')
          .add(() => { heroIn(); if (lenis) lenis.start(); }, '-=0.7')
          .add(() => loader.remove());
      });
    }
  } else {
    heroIn();
  }

  const mm = gsap.matchMedia();

  // A guest's day: pinned, each scene wipes up over the last (desktop)
  mm.add('(min-width: 900px)', () => {
    const section = $('.story');
    if (!section) return;
    const scenes = $$('.scene', section);
    const steps = $$('.step', section);
    gsap.set(scenes.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' });
    gsap.set(steps.slice(1), { autoAlpha: 0, y: 40 });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top top', end: () => '+=' + innerHeight * (scenes.length - 0.5), pin: true, scrub: 1 },
    });
    scenes.forEach((scene, i) => {
      const img = $('img', scene);
      tl.fromTo(img, { scale: 1.25 }, { scale: 1, ease: 'none', duration: 1 }, i);
      if (i === 0) return;
      tl.to(scene, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut', duration: 0.6 }, i - 0.3)
        .to(steps[i - 1], { autoAlpha: 0, y: -40, duration: 0.3 }, i - 0.3)
        .to(steps[i], { autoAlpha: 1, y: 0, duration: 0.3 }, i - 0.05);
    });
    tl.fromTo('.story__progress i', { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: scenes.length }, 0);
  });

  // Drone hero: pulls back from close-up as it scrolls past
  const droneHero = $('.drone__hero');
  if (droneHero) {
    const fx = gl.get(droneHero);
    gsap.fromTo(zoomTarget(droneHero, fx), { [zoomProp(fx)]: fx ? 1.3 : 1.3 }, {
      [zoomProp(fx)]: 1, ease: 'none',
      scrollTrigger: { trigger: droneHero, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }

  // Drone strip: vertical scroll moves it sideways (desktop)
  mm.add('(min-width: 900px)', () => {
    const section = $('.hscroll');
    if (!section || !droneTrack) return;
    const distance = () => Math.max(0, droneTrack.scrollWidth - innerWidth);
    gsap.to(droneTrack, {
      x: () => -distance(), ease: 'none',
      scrollTrigger: { trigger: section, start: 'top top', end: () => '+=' + distance(), pin: true, scrub: 1, invalidateOnRefresh: true },
    });
  });

  // Photos that wipe open as they enter
  $$('[data-clip]').forEach((el) => {
    const img = $('img, video', el);
    gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 80%' } })
      .fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' })
      .fromTo(img, { scale: 1.35 }, { scale: 1, duration: 2, ease: 'expo.out' }, 0);
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
