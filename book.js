// صفحه‌ی اول سفیران (قالب Updraft): ظاهر شدن بخش‌ها، بیانیه‌ی روشن‌شونده، نوار پیشرفت و سر صفحه‌ی ویدیو
document.documentElement.classList.add('js');
(() => {
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  // ظاهر شدن تیترها، متن‌ها و نمودارها هنگام رسیدن به آن‌ها (کلاس‌های خود قالب)
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.setAttribute('data-revealed', ''); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -10% 0px' });
  $$('[data-reveal],[data-blur],[data-split],[data-chart],[data-draw]').forEach(el => io.observe(el));

  // نوار نارنجی پیشرفت بالای صفحه
  const bar = document.querySelector('.origin-left.bg-ember');
  // بیانیه: کلمه‌ها با پایین آمدن صفحه روشن می‌شوند و ماژیک زرد روی بخش‌های مهم کشیده می‌شود
  const words = $$('#manifesto .wall-word'), marks = $$('#manifesto .marker');
  const para = words[0] && words[0].closest('p');
  const onScroll = () => {
    const H = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.transform = `scaleX(${clamp(scrollY / H)})`;
    if (para) {
      const r = para.getBoundingClientRect();
      const p = clamp((innerHeight * .8 - r.top) / (r.height + innerHeight * .3));
      const n = Math.round(p * words.length);
      words.forEach((w, i) => w.setAttribute('data-lit', i < n));
      marks.forEach(m => m.setAttribute('data-on', +m.dataset.marker < n));
    }
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
})();

// سر صفحه‌ی «پنجره»: صفحه‌ی شروع، ویدیو که با اسکرول جلو می‌رود، قابی که بزرگ می‌شود و کج شدن با موس
(() => {
  const pre = document.querySelector('.sf-preload');
  const fl = document.querySelector('.flight');
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const done = () => { if (pre) { pre.classList.add('done'); pre.style.opacity = '0'; setTimeout(() => pre.remove(), 1000); } if (fl) fl.classList.add('is-in'); };
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
  const loop = () => { if (vis) draw(false);  requestAnimationFrame(loop); };
  loop();
  addEventListener('resize', () => draw(true));
})();

// «مسیر همراهی»: با اسکرول، قدم‌ها یکی‌یکی عوض می‌شوند (فقط روی صفحه‌ی بزرگ، مثل قالب)
(() => {
  const sec = document.getElementById('hunch-to-hit');
  if (!sec) return;
  const items = [...sec.querySelectorAll('ol>li')];
  const names = items.map(li => (li.querySelector('h3') || {}).textContent || '');
  const line = document.createElement('div'); line.className = 'hunch-line';
  line.innerHTML = '<i></i>' + names.map(n => `<b>${n}</b>`).join('');
  sec.querySelector('ol').after(line);
  const dots = [...line.querySelectorAll('b')], fill = line.querySelector('i');
  const big = matchMedia('(min-width:1024px) and (min-height:640px)');
  const set = () => {
    if (!big.matches) { items.forEach(li => li.classList.add('on')); return; }
    const r = sec.getBoundingClientRect();
    const p = Math.min(.999, Math.max(0, -r.top / (r.height - innerHeight)));
    const k = Math.floor(p * items.length);
    items.forEach((li, i) => li.classList.toggle('on', i === k));
    dots.forEach((d, i) => d.classList.toggle('on', i <= k));
    fill.style.width = `calc(${(k / (items.length - 1)) * 100}% - 12px)`;
  };
  addEventListener('scroll', set, { passive: true }); addEventListener('resize', set); set();
})();

// چیدمان دقیقاً مثل قالب مرجع (چپ‌به‌راست) می‌ماند؛ فقط نوشته‌های فارسی راست‌به‌چپ می‌شوند
(() => {
  const FA = /[؀-ۿ]/;
  const TAGS = 'h1,h2,h3,h4,h5,h6,p,li,dt,dd,blockquote,figcaption,label,button,a,span,strong,em,small,div';
  const fix = root => {
    root.querySelectorAll(TAGS).forEach(el => {
      if (el.hasAttribute('dir') || el.closest('.flight')) return;
      if (!FA.test(el.textContent)) return;
      const d = getComputedStyle(el).display;
      if (/flex|grid|table/.test(d)) return;
      // فقط جایی که خودش متن دارد یا فقط بچه‌های درون‌خطی دارد
      const kids = [...el.children];
      if (kids.some(k => /flex|grid|table/.test(getComputedStyle(k).display))) return;
      if (el.tagName === 'DIV' && !Array.from(el.childNodes).some(n => n.nodeType === 3 && FA.test(n.textContent))) return;
      el.setAttribute('dir', 'rtl');
    });
  };
  let t;
  const run = () => { clearTimeout(t); t = setTimeout(() => fix(document.body), 120); };
  addEventListener('load', run); run();
  new MutationObserver(run).observe(document.body, { childList: true, subtree: true, characterData: true });
})();

// عنوان صفحه برای گوگل همان عنوان سفیران بماند
(() => {
  const want = 'دکتر جواد فروغی | مؤسسه سفیران';
  const keep = () => { if (document.title !== want) document.title = want; };
  keep(); new MutationObserver(keep).observe(document.head, { childList: true, subtree: true, characterData: true });
})();

// لینک‌های داخلی قالب (نمونه‌کار، مقاله، صفحه‌ها) به صفحه‌های واقعی سفیران می‌روند
(() => {
  const PROJ = { takvir: 'videos.html', amanarrasul: 'videos.html', hamd: 'videos.html', nostalgia: 'podcast.html' };
  const POST = { 'saye-roshan': 'books.html', adat: 'books.html', podcast: 'podcast.html', videos: 'videos.html', test: 'test.html' };
  const PAGE = { '/work': 'videos.html', '/journal': 'books.html', '/services': 'services.html', '/contact': 'services.html', '/privacy': 'terms.html', '/terms': 'terms.html', '/': 'index.html' };
  // آدرس‌ها نسبی‌اند تا سایت در زیرپوشه (پیش‌نمایش) هم «not found» ندهد
  addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target === '_blank' || e.ctrlKey || e.metaKey) return;
    // دکمه‌های داخل کارت‌های «خدمات سفیران» را services-links.js به صفحه‌ی همان خدمت می‌برد
    if (a.closest('article:has(.ca-svc)')) return;
    const text = a.textContent.replace(/\s+/g, ' ').trim();
    const stop = () => { e.preventDefault(); e.stopImmediatePropagation(); };
    // دکمه‌ی بالای صفحه «ثبت‌نام کلاس‌ها و مشاوره‌های ۱۴۰۵» ← بخش «خدمات سفیران» همین صفحه
    if (a.closest('#hero') && text.includes('مشاوره')) {
      stop(); document.getElementById('forecast-board')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); return;
    }
    // «ثبت‌نام کلاس» ← فهرست کلاس‌ها
    if (a.closest('#hero') && text.startsWith('ثبت‌نام کلاس')) { stop(); location.href = 'classes.html'; return; }
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || u.hash && u.pathname === location.pathname) return;
    // صفحه‌های جدای سایت کامل باز می‌شوند، نه با مسیریاب Next
    const file = u.pathname.split('/').pop();
    if (/\.html$/.test(file)) { stop(); location.href = file + u.search + u.hash; return; }
    const [, sec, slug] = u.pathname.split('/');
    const go = sec === 'work' && slug ? PROJ[slug] : sec === 'journal' && slug ? POST[slug] : PAGE['/' + (sec || '')] || 'services.html';
    stop();
    location.href = go || 'services.html';
  }, true);
})();

// کارت‌های دیوار بالای صفحه: هر کارت با تیترش به صفحه یا ویدیوی خودش می‌رود
(() => {
  const YT = id => `https://www.youtube.com/watch?v=${id}`;
  const CH = 'https://www.youtube.com/@JavadForooghi';
  const LINKS = [
    ['قرآن در زندگی امروز', 'videos.html'],
    ['تلاوت سوره‌ی تکویر', YT('mf7cpJT6jps')],
    ['آرامش وجود', 'books.html'],
    ['پنجره', 'about.html'],
    ['تونل زمان', 'videos.html'],
    ['تلاوت آمن الرسول', YT('lZOE6eilnmM')],
    ['کلاس‌ها', 'signup.html'],
    ['خدمات سفیران', 'services.html'],
    ['مشاوره با قرآن‌تراپی', 'signup-counseling.html'],
    ['علی ولی الله', CH],
    ['مشاوره‌ی خانواده', 'signup-family.html'],
    ['تلاوت سوره‌ی التین', YT('W_Pne9Veh2M')],
    ['اینستاگرام', 'https://www.instagram.com/dr.javadforooghi'],
    ['ضرر می‌دی', CH],
    ['شیطان مست', CH],
    ['زنگ آهن', 'https://www.youtube.com/shorts/XfoGiVunZ7o'],
    ['ترس و طمع', 'videos.html'],
    ['تلاوت ۱۴۰۵', 'videos.html'],
    ['بازی قرآنی', 'game.html'],
    ['نبرد نور و سایه', 'noor-o-saye.html'],
  ];
  const find = tile => { const t = tile.textContent; const hit = LINKS.find(([k]) => t.includes(k)); return hit && hit[1]; };
  const open = url => { if (/^https?:/.test(url)) window.open(url, '_blank', 'noopener'); else location.href = url; };
  // نکته: ری‌اکت بعد از بار شدن ممکن است کل بخش را دوباره بسازد، پس هر بار از نو پیدایش می‌کنیم
  const mark = () => document.querySelectorAll('#hero [class*="aspect-[5/6]"]').forEach(tile => {
    const url = find(tile);
    if (!url || tile.dataset.link) return;
    tile.dataset.link = url;
    tile.removeAttribute('aria-hidden');
    tile.setAttribute('role', 'link');
    tile.tabIndex = 0;
    tile.style.cursor = 'pointer';
  });
  let queued = false;
  const later = () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; mark(); }); } };
  const start = () => { mark(); new MutationObserver(later).observe(document.body, { childList: true, subtree: true }); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  document.addEventListener('click', e => {
    const tile = e.target.closest && e.target.closest('#hero [data-link]');
    if (!tile || e.target.closest('button')) return;
    open(tile.dataset.link);
  });
  document.addEventListener('keydown', e => {
    const tile = e.target.closest && e.target.closest('#hero [data-link]');
    if (tile && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); open(tile.dataset.link); }
  });
})();

// لینک‌هایی که قالب اشتباه ساخته: شبکه‌های اجتماعی قالب، شماره‌ی تلفن و چند دکمه‌ی صفحه‌ی اول
(() => {
  const IG = 'https://www.instagram.com/dr.javadforooghi', YTC = 'https://www.youtube.com/@JavadForooghi';
  const BY_HOST = { 'www.instagram.com': IG, 'www.tiktok.com': YTC, 'www.youtube.com': 'index.html', 'www.linkedin.com': 'tel:09150900177' };
  const BY_TEXT = [['همه‌ی ویدیوها', 'videos.html'], ['آرشیوتلاوت‌های دکتر جواد فروغی', 'videos.html'], ['نوشته‌های دکتر جواد فروغی', 'books.html'],
                   ['حریم خصوصی', 'terms.html'], ['قوانین سایت', 'terms.html']];
  const set = (a, url) => { if (a.getAttribute('href') !== url) a.setAttribute('href', url); };
  const fix = () => document.querySelectorAll('a[href]').forEach(a => {
    const h = a.getAttribute('href');
    if (/updraft/i.test(h)) {
      const host = new URL(h).host;
      // x.com تکراری است و در سایت حسابی ندارد
      if (host === 'x.com') { (a.closest('li') || a).style.display = 'none'; return; }
      const url = BY_HOST[host];
      if (!url) return;
      set(a, url);
      if (!/^https?:/.test(url)) a.removeAttribute('target');
      const lab = a.getAttribute('aria-label');
      if (lab) a.setAttribute('aria-label', lab.replace(/Updraft on/i, 'سفیران در'));
      return;
    }
    if (/^mailto:0/.test(h)) { set(a, 'tel:' + h.slice(7).replace(/\s/g, '')); return; }
    const text = a.textContent.replace(/\s+/g, ' ').trim();
    // «همه‌ی خدمات، با جزئیات» همان شش کارت را دوباره نشان می‌داد؛ هر کارت خودش صفحه‌ی خدمتش را باز می‌کند
    if (text.startsWith('همه‌ی خدمات')) { a.style.display = 'none'; return; }
    const hit = BY_TEXT.find(([k]) => text.startsWith(k));
    if (hit) set(a, hit[1]);
  });
  let q;
  const later = () => { clearTimeout(q); q = setTimeout(fix, 150); };
  addEventListener('load', fix); fix();
  new MutationObserver(later).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['href'] });
  // متن بعضی دکمه‌ها با انیمیشن دیرتر کامل می‌شود
  setTimeout(fix, 2500);
})();

// کارت‌های ویدیوی بخش «محتوا»: یک عکس ثابت از ویدیوهای پیج و یوتیوب دکتر فروغی (ویدیوی متحرک صفحه را سنگین می‌کرد)؛ کلیک روی هر کارت اینستاگرام دکتر را باز می‌کند
(() => {
  const IG = 'https://www.instagram.com/dr.javadforooghi';
  const PICS = [
    ['تلاوت سوره‌ی تکویر', 'takvir'], ['تلاوت سوره‌ی حمد', 'hamd'], ['تلاوت نوستالژی', 'nostalgia'], ['پنجره', 'panjere'],
    ['زنگ آهن', 'zang'], ['شیطان مست', 'sheytan'], ['علی ولی الله', 'ali-vali'], ['تلاوت کودکی', 'kodaki'],
    ['دورهمی', 'dorehami'], ['گفتار کوتاه', 'goftar'], ['تلاوت آمن الرسول', 'amanarrasul'], ['تونل زمان', 'tunnel'],
    ['ترس و طمع', 'tars'], ['انسان در ضرر است', 'zarar'], ['سایه روشن', 'saye-roshan'],
  ];
  const add = () => document.querySelectorAll('#content [class*="aspect-[9/16]"]').forEach(card => {
    if (card.querySelector('img.sf-wall')) return;
    const hit = PICS.find(([k]) => card.textContent.includes(k));
    const box = card.querySelector(':scope > div');
    if (!hit || !box) return;
    const im = document.createElement('img');
    im.className = 'sf-wall';
    Object.assign(im, { src: `img/wall/${hit[1]}.webp`, alt: '', loading: 'lazy', decoding: 'async', draggable: false });
    im.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none';
    if (box.querySelector('img')) box.appendChild(im);
    else {
      // کارت‌های فقط‌نوشته: عکس پشت نوشته و یک سایه‌ی تیره زیرش تا نوشته خوانا بماند
      box.style.position = 'relative'; box.style.zIndex = '1';
      box.style.background = 'linear-gradient(to top,rgba(0,0,0,.72),rgba(0,0,0,.05) 55%)';
      card.prepend(im);
    }
    card.dataset.ig = '1';
    card.setAttribute('role', 'link');
    card.style.cursor = 'pointer';
  });
  document.addEventListener('click', e => {
    const card = e.target.closest && e.target.closest('#content [data-ig]');
    if (!card) return;
    e.preventDefault();
    window.open(IG, '_blank', 'noopener');
  });
  let queued = false;
  const later = () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; add(); }); } };
  const start = () => { add(); new MutationObserver(later).observe(document.body, { childList: true, subtree: true }); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
