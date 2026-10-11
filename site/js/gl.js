/* ==========================================================================
   Living images (WebGL)
   Draws a photo onto a canvas so it can bend with scroll speed and ripple
   under the mouse. Falls back to the plain <img> if WebGL isn't available.

   Usage: const fx = GL.attach(wrapperElement)   // wrapper contains an <img>
          fx.zoom = 1.2                           // animate with GSAP
   ========================================================================== */
window.GL = (function () {
  const MAX = 14; // browsers allow a limited number of WebGL canvases
  let count = 0;
  let velocity = 0;
  const live = new Set();

  const supported = (() => {
    try { return !!document.createElement('canvas').getContext('webgl'); } catch (e) { return false; }
  })();

  const VERT = `
    attribute vec2 p;
    varying vec2 v;
    void main() { v = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`;

  const FRAG = `
    precision mediump float;
    varying vec2 v;
    uniform sampler2D tex;
    uniform vec2 res, img, mouse;
    uniform float vel, hover, time, zoom, reveal;
    void main() {
      vec2 uv = vec2(v.x, 1.0 - v.y);
      // object-fit: cover
      float rs = res.x / res.y, ri = img.x / img.y;
      vec2 s = rs < ri ? vec2(rs / ri, 1.0) : vec2(1.0, ri / rs);
      vec2 c = (uv - 0.5) * s / zoom + 0.5;
      // bend with scroll speed
      c.y += sin(uv.x * 3.14159) * vel * 0.05;
      // ripple around the mouse
      vec2 d = (uv - mouse) * vec2(rs, 1.0);
      float dist = length(d);
      float wave = sin(dist * 26.0 - time * 3.2) * 0.006 * hover * smoothstep(0.55, 0.0, dist);
      c += normalize(d + 1e-4) * wave / vec2(rs, 1.0);
      // slight color split while moving
      float shift = abs(vel) * 0.004 + hover * 0.0008;
      vec4 col = texture2D(tex, c);
      col.r = texture2D(tex, c + vec2(shift, 0.0)).r;
      col.b = texture2D(tex, c - vec2(shift, 0.0)).b;
      // wave-edged reveal from the bottom (reveal 0 → hidden, 1 → shown)
      float edge = reveal * 1.2 - 0.1 + sin(uv.x * 9.0 + time) * 0.03;
      col.a = smoothstep(edge, edge - 0.08, 1.0 - uv.y);
      gl_FragColor = vec4(col.rgb * col.a, col.a);
    }`;

  function compile(gl, type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null;
  }

  function attach(wrap, opts = {}) {
    const imgEl = wrap.querySelector('img');
    if (!supported || !imgEl || count >= MAX) return null;

    const canvas = document.createElement('canvas');
    canvas.className = 'gl-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false });
    if (!gl) return null;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return null;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
    gl.useProgram(prog);
    count++;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = {};
    ['tex', 'res', 'img', 'mouse', 'vel', 'hover', 'time', 'zoom', 'reveal'].forEach((n) => (u[n] = gl.getUniformLocation(prog, n)));
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const fx = {
      zoom: opts.zoom || 1,
      reveal: opts.reveal == null ? 1 : opts.reveal,
      ready: false,
      visible: false,
      mouse: [0.5, 0.5], mouseT: [0.5, 0.5],
      hover: 0, hoverT: 0,
    };

    const tex = gl.createTexture();
    const upload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      try {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgEl);
      } catch (e) { return; }
      fx.ready = true;
      wrap.classList.add('gl-on');
    };
    if (imgEl.complete && imgEl.naturalWidth) upload();
    else imgEl.addEventListener('load', upload, { once: true });

    wrap.appendChild(canvas);

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    new ResizeObserver(resize).observe(wrap);
    new IntersectionObserver(([e]) => (fx.visible = e.isIntersecting), { rootMargin: '100px' }).observe(wrap);

    if (matchMedia('(hover: hover)').matches) {
      wrap.addEventListener('mousemove', (e) => {
        const r = wrap.getBoundingClientRect();
        fx.mouseT = [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height];
        fx.hoverT = 1;
      });
      wrap.addEventListener('mouseleave', () => (fx.hoverT = 0));
    }

    fx.draw = (t) => {
      if (!fx.ready || !fx.visible) return;
      fx.hover += (fx.hoverT - fx.hover) * 0.06;
      fx.mouse[0] += (fx.mouseT[0] - fx.mouse[0]) * 0.1;
      fx.mouse[1] += (fx.mouseT[1] - fx.mouse[1]) * 0.1;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1i(u.tex, 0);
      gl.uniform2f(u.res, canvas.width, canvas.height);
      gl.uniform2f(u.img, imgEl.naturalWidth, imgEl.naturalHeight);
      gl.uniform2f(u.mouse, fx.mouse[0], fx.mouse[1]);
      gl.uniform1f(u.vel, velocity);
      gl.uniform1f(u.hover, fx.hover);
      gl.uniform1f(u.time, t);
      gl.uniform1f(u.zoom, fx.zoom);
      gl.uniform1f(u.reveal, fx.reveal);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    live.add(fx);
    return fx;
  }

  // One shared animation loop for every canvas
  const start = performance.now();
  (function loop(now) {
    velocity *= 0.9;
    const t = (now - start) / 1000;
    live.forEach((fx) => fx.draw(t));
    requestAnimationFrame(loop);
  })(start);

  return {
    supported,
    attach,
    // Called from the scroll handler with the scroll speed (pixels per frame)
    setVelocity(v) { velocity = Math.max(-1, Math.min(1, v / 60)); },
  };
})();
