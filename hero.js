// بنر چرخان بالای صفحه‌ی اول. در index.html، عکس تمام‌صفحه در data-images و بنرهای متن‌دار در data-banners با ویرگول جدا می‌شوند
(() => {
  const box = document.getElementById('hero-slides');
  if (!box) return;
  const hero = box.parentElement;
  const list = v => (v || '').split(',').map(s => s.trim()).filter(Boolean);
  const full = list(box.dataset.images);
  // روی صفحه‌ی عمودی نسخه‌ی عمودی بنرها می‌آید
  const portrait = matchMedia('(max-aspect-ratio:1/1)');
  const vertical = portrait.matches ? list(box.dataset.bannersMobile) : [];
  portrait.addEventListener('change', () => location.reload());
  const images = [...full, ...(vertical.length ? vertical : list(box.dataset.banners))];
  const isBanner = i => i >= full.length;
  const DELAY = 4500, MOVE = 700;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // بنرهای متن‌دار کامل دیده می‌شوند و نسخه‌ی محو خودشان پشتشان می‌نشیند
  const slides = images.map((src, i) => {
    const el = document.createElement('div');
    el.className = `hero-slide${isBanner(i) ? ' is-banner' : ''}${i === 0 ? ' is-on' : ''}`;
    el.innerHTML = `${isBanner(i) ? '<img class="hero-bg" alt="" draggable="false">' : ''}<img class="hero-fg" alt="" draggable="false">`;
    if (i === 0) el.querySelector('.hero-fg').src = src;
    box.appendChild(el);
    return el;
  });
  if (slides.length < 2) return;

  // نوار پایین بنر: عکس کوچک هر بنر با نشانگر زمان، و دو فلش کنارش
  const strip = document.createElement('div');
  strip.className = 'hero-strip';
  strip.innerHTML = `<div class="hero-dots">${images.map((_, i) => `<button type="button" aria-label="بنر ${i + 1}"><img alt="" draggable="false"><i></i></button>`).join('')}</div><div class="hero-arrows"></div>`;
  hero.querySelector('.hero__facts').before(strip);
  const dotList = [...strip.querySelector('.hero-dots').children];

  addEventListener('load', () => images.forEach((src, i) => {
    slides[i].querySelectorAll('img').forEach(img => { img.src = src; });
    dotList[i].firstChild.src = src;
  }), { once: true });

  const arrow = (side, label, step) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `hero-arrow icon solid fa-chevron-${side}`;
    b.setAttribute('aria-label', label);
    b.addEventListener('click', () => go(cur + step, step));
    strip.querySelector('.hero-arrows').appendChild(b);
  };

  let cur = 0, busy = false, timer = 0;
  const mark = () => {
    dotList.forEach((d, i) => {
      d.classList.toggle('is-on', i === cur);
      d.setAttribute('aria-current', i === cur);
    });
    hero.classList.toggle('on-banner', isBanner(cur));
  };
  // بنر بین نوار بالا و نوار پایین جا می‌گیرد
  const fit = () => box.style.setProperty('--hero-bottom', `${hero.clientHeight - strip.offsetTop + 8}px`);
  const wait = () => {
    clearTimeout(timer);
    if (!still && !document.hidden) timer = setTimeout(() => go(cur + 1, 1), DELAY);
  };

  // در چیدمان راست‌به‌چپ، بنر بعدی از سمت چپ وارد می‌شود
  function go(to, dir) {
    if (busy) return;
    const next = (to + slides.length) % slides.length;
    if (next === cur) return;
    busy = true;
    const a = slides[cur], b = slides[next];
    b.style.transition = 'none';
    b.style.transform = `translateX(${dir > 0 ? -100 : 100}%)`;
    b.classList.add('is-on');
    void b.offsetWidth;
    b.style.transition = a.style.transition = '';
    b.style.transform = 'translateX(0)';
    a.style.transform = `translateX(${dir > 0 ? 100 : -100}%)`;
    cur = next;
    mark();
    wait();
    setTimeout(() => {
      a.classList.remove('is-on');
      a.style.transform = '';
      busy = false;
    }, still ? 0 : MOVE);
  }

  arrow('right', 'بنر قبلی', -1);
  arrow('left', 'بنر بعدی', 1);
  dotList.forEach((d, i) => d.addEventListener('click', () => go(i, i > cur ? 1 : -1)));

  // ورق زدن با انگشت یا موس
  let x0 = null, y0 = 0;
  hero.addEventListener('pointerdown', e => {
    if (e.target.closest('a,button') || (e.pointerType === 'mouse' && e.target.closest('.hero__body,.hero__facts'))) return;
    x0 = e.clientX; y0 = e.clientY;
  });
  addEventListener('pointerup', e => {
    if (x0 === null) return;
    const dx = e.clientX - x0, dy = e.clientY - y0;
    x0 = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(cur + (dx > 0 ? 1 : -1), dx > 0 ? 1 : -1);
  });
  addEventListener('pointercancel', () => { x0 = null; });

  document.addEventListener('visibilitychange', wait);
  addEventListener('resize', fit);
  addEventListener('load', fit, { once: true });
  fit();
  mark();
  wait();
})();
