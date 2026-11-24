// حرکت‌های سایت (الهام از قالب Elio): ساعت، نشانگر، موج آب، نوارها، کارت‌های افقی، ردّ عکس و بقیه
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const fa = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
  // پیشرفت اسکرول یک بخش: ۰ وقتی بالایش به بالای صفحه رسید، ۱ وقتی پایینش به پایین صفحه رسید
  const progress = el => { const r = el.getBoundingClientRect(); return clamp(-r.top / (r.height - innerHeight), 0, 1); };

  // ساعت مشهد در نوار بالا و پایین صفحه
  const clocks = $$('[data-clock]');
  if (clocks.length) {
    const tick = () => {
      const t = new Intl.DateTimeFormat('fa-IR', { timeZone: 'Asia/Tehran', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
      clocks.forEach(c => { c.textContent = (c.dataset.clock ? c.dataset.clock + ' ' : '') + t; });
    };
    tick(); setInterval(tick, 20000);
  }

  // پنهان شدن نوار بالا هنگام پایین رفتن و برگشتنش هنگام بالا آمدن
  const head = $('.site-head');
  let lastY = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY;
    if (head && !document.body.classList.contains('is-navPanel-visible')) head.classList.toggle('is-hidden', y > 300 && y > lastY);
    lastY = y;
  }, { passive: true });

  // ظاهر شدن تیترها و متن‌ها هنگام رسیدن به آن‌ها
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -12% 0px' });
  $$('.reveal-line,.fade-up,.giant,.pill').forEach(el => io.observe(el));

  // نشانگر دایره‌ای نارنجی روی چیزهایی که data-cursor دارند
  if (fine) {
    const cur = document.createElement('div');
    cur.className = 'cursor'; cur.setAttribute('aria-hidden', 'true');
    document.body.append(cur);
    let x = 0, y = 0, cx = 0, cy = 0;
    addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; }, { passive: true });
    const loop = () => { cx += (x - cx) * .2; cy += (y - cy) * .2; cur.style.translate = `${cx}px ${cy}px`; requestAnimationFrame(loop); };
    loop();
    $$('[data-cursor]').forEach(el => {
      el.addEventListener('pointerenter', () => { cur.textContent = el.dataset.cursor; cur.classList.add('on'); });
      el.addEventListener('pointerleave', () => cur.classList.remove('on'));
    });
  }

  // نوارهای متحرک: متن را آن‌قدر تکرار می‌کند که نوار پر شود و آرام جابه‌جا می‌کند
  $$('.tape').forEach((tape, i) => {
    const tr = $('.tape__track', tape);
    const unit = tr.innerHTML;
    while (tr.scrollWidth < innerWidth * 2.4) tr.insertAdjacentHTML('beforeend', unit);
    if (calm) return;
    const dir = i % 2 ? -1 : 1;
    let off = 0, boost = 0;
    addEventListener('scroll', () => { boost = 4; }, { passive: true });
    const half = tr.scrollWidth / 2;
    const run = () => { off = (off + (0.6 + boost) * dir + half) % half; boost *= .92; tr.style.transform = `translateX(${off - half / 2}px)`; requestAnimationFrame(run); };
    run();
  });

  // بیانیه: کلمه‌ها با پایین آمدن صفحه یکی‌یکی روشن می‌شوند
  const man = $('.manifesto__text');
  if (man) {
    const walk = node => [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(p => {
          if (!p.trim()) frag.append(p);
          else { const s = document.createElement('span'); s.className = 'w'; s.textContent = p; frag.append(s); }
        });
        n.replaceWith(frag);
      } else if (!n.classList.contains('pill')) walk(n);
    });
    walk(man);
    const words = $$('.w', man);
    const light = () => {
      const r = man.getBoundingClientRect();
      const p = clamp((innerHeight * .85 - r.top) / (r.height + innerHeight * .35), 0, 1);
      const n = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('on', i < n));
    };
    addEventListener('scroll', light, { passive: true }); light();
  }

  // کارت‌های افقی: صفحه پایین می‌رود و کارت‌ها به پهلو حرکت می‌کنند
  const drop = $('.drop');
  if (drop) {
    const track = $('.drop__track', drop), bar = $('.drop__line i', drop), cnt = $('.drop__count', drop);
    const cards = $$('.card:not(.card--all)', track);
    const size = () => {
      const dist = Math.max(0, track.scrollWidth - track.parentElement.clientWidth + innerWidth * .1);
      drop.style.setProperty('--drop-h', `${innerHeight + dist}px`);
      return dist;
    };
    let dist = size();
    addEventListener('resize', () => { dist = size(); });
    const heads = $$('.reveal-line', drop);
    const move = () => {
      const p = progress(drop);
      // تیتر این بخش داخل قسمت چسبان است؛ همین که بخش به صفحه رسید ظاهرش می‌کنیم
      if (drop.getBoundingClientRect().top < innerHeight * .8) heads.forEach(h => h.classList.add('on'));
      track.style.transform = `translateX(${p * dist}px)`;
      if (bar) bar.style.transform = `scaleX(${p})`;
      // روی گوشی کارتی که وسط صفحه است همان حالت «موس رویش» را می‌گیرد
      if (!fine) {
        const mid = innerWidth / 2;
        let best = null, bd = 1e9;
        cards.forEach(c => { const r = c.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - mid); if (d < bd) { bd = d; best = c; } });
        cards.forEach(c => c.classList.toggle('on', c === best && p > 0 && p < 1));
      }
      if (cnt) cnt.textContent = `${fa(String(Math.max(1, Math.ceil(p * cards.length))).padStart(2, '0'))} / ${fa(String(cards.length).padStart(2, '0'))}`;
    };
    addEventListener('scroll', move, { passive: true }); move();
  }

  // آرشیو: هر جا موس برود، عکس‌ها کج پشت سرش می‌افتند و بعد محو می‌شوند
  const ex = $('.explore');
  if (ex) {
    const trail = $('.trail', ex);
    const srcs = (ex.dataset.images || '').split(',').filter(Boolean);
    srcs.forEach(s => { const i = new Image(); i.src = s; });
    let k = 0, lx = -999, ly = -999;
    const drop1 = (x, y) => {
      const img = document.createElement('img');
      img.src = srcs[k++ % srcs.length]; img.alt = '';
      const rot = (Math.random() - .5) * 18;
      img.style.left = x + 'px'; img.style.top = y + 'px';
      trail.append(img);
      img.animate([
        { transform: `translate(-50%,-50%) rotate(${rot}deg) scale(.6)`, opacity: 0 },
        { transform: `translate(-50%,-50%) rotate(${rot}deg) scale(1)`, opacity: 1, offset: .12 },
        { transform: `translate(-50%,-50%) rotate(${rot}deg) scale(1)`, opacity: 1, offset: .7 },
        { transform: `translate(-50%,-46%) rotate(${rot}deg) scale(.92)`, opacity: 0 }
      ], { duration: 1600, easing: 'cubic-bezier(.2,.8,.2,1)' }).onfinish = () => img.remove();
      if (trail.children.length > 14) trail.firstElementChild.remove();
    };
    const at = (cx, cy, gap) => {
      const r = ex.getBoundingClientRect(), x = cx - r.left, y = cy - r.top;
      if (Math.hypot(x - lx, y - ly) > gap) { drop1(x, y); lx = x; ly = y; }
    };
    ex.addEventListener('pointermove', e => { if (e.pointerType === 'mouse') at(e.clientX, e.clientY, 90); });
    // روی گوشی: هر جا انگشت را بکشید عکس می‌افتد
    ex.addEventListener('touchstart', e => { const t = e.touches[0]; lx = ly = -999; at(t.clientX, t.clientY, 0); }, { passive: true });
    ex.addEventListener('touchmove', e => { const t = e.touches[0]; at(t.clientX, t.clientY, 60); }, { passive: true });
    // روی گوشی خودش آرام عکس می‌ریزد
    if (!fine && !calm) {
      const auto = new IntersectionObserver(([e]) => {
        clearInterval(ex._t);
        if (e.isIntersecting) ex._t = setInterval(() => drop1(ex.clientWidth * (.2 + Math.random() * .6), ex.clientHeight * (.25 + Math.random() * .5)), 650);
      });
      auto.observe(ex);
    }
  }

  // دو ستون عکس با سرعت متفاوت
  const night = $('.night');
  if (night && !calm) {
    const a = $('.night__col--a', night), b = $('.night__col--b', night);
    const par = () => {
      const r = night.getBoundingClientRect();
      const p = -r.top;
      const k = innerWidth < 901 ? .5 : 1;
      if (a) a.style.transform = `translateY(${p * .12 * k}px)`;
      if (b) b.style.transform = `translateY(${-p * .18 * k}px)`;
    };
    addEventListener('scroll', par, { passive: true }); par();
  }

  // عکس بیضی پشت تیتر بزرگ می‌شود تا کل صفحه را بگیرد
  const armor = $('.armor');
  if (armor) {
    const m = $('.armor__media', armor);
    const grow = () => {
      const p = calm ? 1 : progress(armor);
      const e = p < .75 ? p / .75 : 1;
      const w = 300 + (innerWidth - 300) * e, h = 220 + (innerHeight - 220) * e;
      m.style.width = w + 'px'; m.style.height = h + 'px';
      m.style.borderRadius = `${50 * (1 - e)}%`;
      m.style.transform = `translate(-50%,${-30 - 20 * e}%)`;
      armor.classList.toggle('is-full', e >= 1);
    };
    addEventListener('scroll', grow, { passive: true }); addEventListener('resize', grow); grow();
  }

  // عکس پهن: کمی آهسته‌تر از صفحه حرکت می‌کند
  $$('.wide img').forEach(img => {
    if (calm) return;
    const par = () => { const r = img.parentElement.getBoundingClientRect(); img.style.transform = `translateY(${(r.top / innerHeight - .5) * -12}%)`; };
    addEventListener('scroll', par, { passive: true }); par();
  });

  // عددها مثل کیلومترشمار می‌چرخند
  $$('.nums b[data-n]').forEach(b => {
    const digits = fa(b.dataset.n).split('');
    b.textContent = '';
    digits.forEach((d, i) => {
      const roll = document.createElement('span'); roll.className = 'roll';
      if (!/[۰-۹]/.test(d)) { roll.textContent = d; b.append(roll); return; }
      const target = '۰۱۲۳۴۵۶۷۸۹'.indexOf(d);
      for (let k = 0; k <= 10 + target; k++) { const s = document.createElement('span'); s.textContent = '۰۱۲۳۴۵۶۷۸۹'[k % 10]; s.style.height = '1em'; s.style.lineHeight = '1'; roll.append(s); }
      roll.dataset.t = 10 + target; roll.style.transitionDelay = `${i * .12}s`;
      b.append(roll);
    });
    const go = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      $$('.roll[data-t]', b).forEach(r => { r.style.transform = `translateY(-${r.dataset.t}em)`; });
      go.disconnect();
    }, { threshold: .6 });
    go.observe(b);
  });

  // فهرست: عکس هر ردیف دنبال موس می‌آید
  const rows = $('.rows');
  if (rows) {
    const box = document.createElement('div'); box.className = 'follow'; box.setAttribute('aria-hidden', 'true');
    const imgs = $$('a[data-img]', rows).map(a => { const i = new Image(); i.src = a.dataset.img; i.alt = ''; box.append(i); return [a, i]; });
    document.body.append(box);
    let x = 0, y = 0, cx = 0, cy = 0, s = .6, ts = .6, run = false;
    const loop = () => {
      cx += (x - cx) * .14; cy += (y - cy) * .14; s += (ts - s) * .14;
      const tilt = clamp((x - cx) * .06, -10, 10);
      box.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%) rotate(${tilt}deg) scale(${s})`;
      if (run) requestAnimationFrame(loop);
    };
    rows.addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; });
    rows.addEventListener('pointerenter', e => { cx = x = e.clientX; cy = y = e.clientY; run = true; loop(); });
    rows.addEventListener('pointerleave', () => { box.classList.remove('on'); ts = .6; setTimeout(() => { run = box.classList.contains('on'); }, 400); });
    const pick = i => { imgs.forEach(([, j]) => j.classList.toggle('on', j === i)); box.classList.add('on'); ts = 1; };
    imgs.forEach(([a, i]) => a.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') pick(i); }));
    // روی گوشی: عکس ردیفی که انگشت رویش است کنار انگشت می‌آید
    let hideT;
    const touch = e => {
      const t = e.touches[0]; if (!t) return;
      x = t.clientX; y = t.clientY - 110;
      const hit = imgs.find(([a]) => { const r = a.getBoundingClientRect(); return t.clientY >= r.top && t.clientY <= r.bottom; });
      if (hit) { clearTimeout(hideT); if (!run) { cx = x; cy = y; run = true; loop(); } pick(hit[1]); }
    };
    rows.addEventListener('touchstart', touch, { passive: true });
    rows.addEventListener('touchmove', touch, { passive: true });
    rows.addEventListener('touchend', () => { hideT = setTimeout(() => { box.classList.remove('on'); ts = .6; setTimeout(() => { run = false; }, 400); }, 700); });
  }

  // متن بخش نارنجی: اول حروف درهم و بعد درست می‌شود
  $$('[data-scramble]').forEach(el => {
    const final = el.textContent, pool = 'ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی۰۱۲۳۴۵۶۷۸۹';
    const go = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; go.disconnect();
      if (calm) return;
      let f = 0;
      const t = setInterval(() => {
        f++;
        el.textContent = [...final].map((ch, i) => ch === ' ' || i < f / 2 ? ch : pool[Math.random() * pool.length | 0]).join('');
        if (f / 2 >= final.length) { clearInterval(t); el.textContent = final; }
      }, 45);
    }, { threshold: .5 });
    go.observe(el);
  });

  // سر صفحه: موج آب دور موس روی عکس (WebGL)
  const hero = $('.hero');
  const cv = hero && $('canvas', hero);
  const src = hero && $('.hero__img', hero);
  if (cv && src && !calm) {
    const gl = cv.getContext('webgl', { premultipliedAlpha: false });
    if (!gl) return;
    const N = 18;
    const vs = 'attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0,1);}';
    const fs = `precision highp float;varying vec2 v;uniform sampler2D t;uniform vec2 res,img;uniform float now;uniform vec3 R[${N}];
      void main(){
        vec2 uv=v;uv.y=1.-uv.y;
        float sr=res.x/res.y,ir=img.x/img.y;
        vec2 sc=sr>ir?vec2(1.,ir/sr):vec2(sr/ir,1.);
        vec2 st=(uv-.5)*sc+.5;
        vec2 off=vec2(0.);float lit=0.;
        for(int i=0;i<${N};i++){
          vec3 r=R[i];float age=now-r.z;
          if(age<0.||age>2.6)continue;
          vec2 d=(uv-r.xy)*vec2(sr,1.);float dist=length(d);
          float rad=age*.32,k=(dist-rad)/.05;
          float a=exp(-age*1.5)*exp(-k*k);
          off+=normalize(d+1e-5)*sin(k*3.2)*a*.022*vec2(1./sr,1.);
          lit+=sin(k*3.2)*a;
        }
        vec3 c=texture2D(t,st+off).rgb;
        float g=dot(c,vec3(.299,.587,.114));
        c=mix(vec3(g),c,.55)*.62;c=(c-.5)*1.08+.5;
        c+=lit*.07;
        gl_FragColor=vec4(c,1.);
      }`;
    const sh = (type, code) => { const s = gl.createShader(type); gl.shaderSource(s, code); gl.compileShader(s); return s; };
    const pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'p');
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = n => gl.getUniformLocation(pr, n);
    const ripples = new Float32Array(N * 3).fill(-99);
    let ri = 0, t0 = performance.now(), visible = true, lx = -1, ly = -1;
    const add = (x, y) => { ripples.set([x, y, (performance.now() - t0) / 1000], (ri++ % N) * 3); };
    const fit = () => {
      const d = Math.min(devicePixelRatio || 1, 1.6);
      cv.width = hero.clientWidth * d; cv.height = hero.clientHeight * d;
      gl.viewport(0, 0, cv.width, cv.height);
    };
    const start = () => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, src);
      [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach(p => gl.texParameteri(gl.TEXTURE_2D, p, gl.CLAMP_TO_EDGE));
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.uniform2f(U('img'), src.naturalWidth, src.naturalHeight);
      fit(); addEventListener('resize', fit);
      cv.classList.add('is-on');
      const draw = () => {
        if (visible) {
          gl.uniform2f(U('res'), cv.width, cv.height);
          gl.uniform1f(U('now'), (performance.now() - t0) / 1000);
          gl.uniform3fv(U('R'), ripples);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }
        requestAnimationFrame(draw);
      };
      draw();
      // یک موج اول خودش، تا معلوم شود
      setTimeout(() => add(.5, .55), 700);
    };
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(hero);
    hero.addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse') return;
      const r = hero.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      if (Math.hypot((x - lx) * r.width, (y - ly) * r.height) > 46) { add(x, y); lx = x; ly = y; }
    });
    hero.addEventListener('touchmove', e => {
      const t = e.touches[0], r = hero.getBoundingClientRect(), x = (t.clientX - r.left) / r.width, y = (t.clientY - r.top) / r.height;
      if (Math.hypot((x - lx) * r.width, (y - ly) * r.height) > 40) { add(x, y); lx = x; ly = y; }
    }, { passive: true });
    hero.addEventListener('pointerdown', e => { const r = hero.getBoundingClientRect(); add((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height); });
    if (src.complete && src.naturalWidth) start(); else src.addEventListener('load', start, { once: true });
  }
})();

// سر صفحه‌ی «پنجره»: صفحه‌ی شروع، ویدیو که با اسکرول جلو می‌رود، قابی که بزرگ می‌شود و کج شدن با موس
(() => {
  const pre = document.querySelector('.preload');
  const fl = document.querySelector('.flight');
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const done = () => { if (pre) pre.classList.add('done'); if (fl) fl.classList.add('is-in'); };
  if (!fl) { if (pre) setTimeout(done, 900); return; }

  // کلمه‌های تیتر یکی‌یکی از تاری بیرون می‌آیند
  let k = 0;
  fl.querySelectorAll('.flight__t .ln').forEach(ln => {
    ln.innerHTML = ln.textContent.split(' ').map(w => `<span class="w" style="transition-delay:${(0.25 + 0.12 * k++).toFixed(2)}s">${w}</span>`).join(' ');
  });

  const win = fl.querySelector('.flight__win'), tilt = fl.querySelector('.flight__tilt'), cv = tilt.querySelector('canvas');
  const glow = fl.querySelector('.flight__glow'), mark = fl.querySelector('.flight__mark');
  const paper = fl.querySelector('.flight__paper'), page = fl.querySelector('.flight__page'), book = document.querySelector('.book');
  const ta = fl.querySelector('.flight__t--a'), tb = fl.querySelector('.flight__t--b');
  const fades = fl.querySelectorAll('.flight__side,.flight__hints');
  const ctx = cv.getContext('2d');
  const mobile = innerWidth < 901;
  const base = mobile ? fl.dataset.framesM : fl.dataset.frames, n = +fl.dataset.count;
  const frames = new Array(n);
  const src = i => `${base}${String(i + 1).padStart(3, '0')}.webp`;

  // اول قاب اول، بعد بقیه به ترتیب
  const load = i => new Promise(res => { const im = new Image(); im.decoding = 'async'; im.onload = () => { frames[i] = im; res(); }; im.onerror = res; im.src = src(i); });
  const t0 = performance.now();
  load(0).then(() => {
    fl.classList.add('is-live'); draw(true);
    setTimeout(done, Math.max(0, 1500 - (performance.now() - t0)));
    (async () => { for (let i = 1; i < n; i += 4) await load(i); for (let i = 1; i < n; i++) if (!frames[i]) await load(i); })();
  });
  setTimeout(done, 4000);

  const nearest = i => { for (let d = 0; d < n; d++) { if (frames[i - d]) return frames[i - d]; if (frames[i + d]) return frames[i + d]; } return null; };
  let mx = 0, my = 0, cx = 0, cy = 0, last = -1, lastW = 0, lastH = 0, VW = 0, VH = 0;
  if (fine && !calm) addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; }, { passive: true });

  function draw(force) {
    const r = fl.getBoundingClientRect();
    // وقتی گوشی زوم شده، اندازه‌ی صفحه‌ی بی‌زوم را نگه می‌داریم و جابه‌جایی داخل زوم را هم اسکرول حساب می‌کنیم
    const vv = window.visualViewport, zoomed = vv && vv.scale > 1.01;
    if (!zoomed || !VW) { VW = innerWidth; VH = innerHeight; }
    const top = r.top - (zoomed ? vv.offsetTop : 0);
    const p = calm ? 0 : clamp(-top / (r.height - VH));
    // ویدیو تمام‌صفحه است و با اسکرول کمی جلوتر می‌آید
    const w = VW, h = VH;
    tilt.style.setProperty('--zoom', (1.04 + .08 * p).toFixed(4));

    // تیترها بزرگ و محو می‌شوند و به بیرون صفحه می‌روند
    const t = clamp(p / .32), s = 1 + 1.4 * t * t;
    ta.style.transform = `translate(${t * 12}vw,${-t * 10}vh) scale(${s})`; ta.style.opacity = 1 - t;
    tb.style.transform = `translate(${-t * 12}vw,${t * 10}vh) scale(${s})`; tb.style.opacity = 1 - t;
    fades.forEach(f => { f.style.opacity = fl.classList.contains('is-in') ? 1 - clamp(p / .12) : ''; });
    // دوربین وارد کتاب می‌شود: صفحه‌ی کتاب کاغذ سایت می‌شود و قاب طلایی کتاب روی صفحه می‌آید
    const pg = clamp((p - .7) / .16);
    // حروف ریز صفحه‌ها پیش از رسیدن کاغذ کمی تار می‌شوند
    cv.style.filter = `blur(${(5 * clamp((p - .6) / .16)).toFixed(2)}px)`;
    paper.style.opacity = pg.toFixed(3);
    page.style.transform = `translateY(${(1 - pg) * 40}px) scale(${1.06 - .06 * pg})`;
    const br = book && book.getBoundingClientRect();
    document.body.classList.toggle('light-head', p <= .8);
    document.body.classList.toggle('in-book', p > .8 || !!(br && br.top < innerHeight && br.bottom > innerHeight * .5));

    // با حرکت موس تصویر کمی جابه‌جا می‌شود تا عمق داشته باشد
    cx += (mx - cx) * .06; cy += (my - cy) * .06;
    tilt.style.setProperty('--px', `${(-14 * cx).toFixed(2)}px`);
    tilt.style.setProperty('--py', `${(-10 * cy).toFixed(2)}px`);

    // قاب ویدیو
    const idx = Math.round(clamp(p / .92) * (n - 1));
    const d = Math.min(devicePixelRatio || 1, 2);
    const W = Math.round(w * d), H = Math.round(h * d);
    if (W !== lastW || H !== lastH) { cv.width = W; cv.height = H; lastW = W; lastH = H; force = true; }
    if (idx !== last || force) {
      const im = frames[idx] || nearest(idx);
      if (im) {
        const ir = im.naturalWidth / im.naturalHeight, cr = W / H;
        let dw = W, dh = H;
        if (ir > cr) dw = H * ir; else dh = W / ir;
        ctx.drawImage(im, (W - dw) / 2, (H - dh) / 2, dw, dh);
        const dim = .5 * clamp((p - .76) / .16);
        if (dim > 0) { ctx.fillStyle = `rgba(10,10,10,${dim})`; ctx.fillRect(0, 0, W, H); }
        if (frames[idx]) last = idx;
      }
    }
  }
  let vis = true;
  new IntersectionObserver(([en]) => { vis = en.isIntersecting; }).observe(fl);
  const loop = () => { if (vis) draw(false); else document.body.classList.remove('light-head'); requestAnimationFrame(loop); };
  // بیرون از سر صفحه هم وضعیت «داخل کتاب» به‌روز بماند
  addEventListener('scroll', () => { if (!vis && book) { const br = book.getBoundingClientRect(); document.body.classList.toggle('in-book', br.top < innerHeight && br.bottom > innerHeight * .5); } }, { passive: true });
  loop();
  addEventListener('resize', () => draw(true));
})();
