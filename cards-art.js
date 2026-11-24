// تصویرهای متحرک شش کارت خدمات و چهار کارت مسیر صفحه‌ی اصلی
// یک خانواده: رنگ‌های سایت، شکل‌های تخت با گوشه‌ی گرد (حدود یک‌چهارم ضلع کوتاه)، نمای روبه‌رو، یک سایه‌ی زمین
(() => {
  const C = { ink: '#1E1E1E', ember: '#FF5C00', yellow: '#FFE27A', sand: '#EBE6DD', white: '#F8F6F2' };
  const GROUND = 164;

  const shadow = (rx = 100, g = GROUND) => `<ellipse cx="180" cy="${g + 2}" rx="${rx}" ry="5" fill="${C.ink}" opacity=".08"/>`;

  // آدمک: بدن کپسولی + سر گرد
  const person = (x, h, fill, cls = '', d = 0, g = GROUND) => {
    const w = h > 56 ? 34 : 28, r = h > 56 ? 12 : 10;
    return `<g class="ca-bob ${cls}" style="animation-delay:${d}s">
      <rect x="${x - w / 2}" y="${g - h}" width="${w}" height="${h}" rx="${w / 2}" fill="${fill}"/>
      <circle cx="${x}" cy="${g - h - r - 4}" r="${r}" fill="${fill}"/></g>`;
  };

  // حباب گفتگو با سه نقطه‌ی تایپ
  const bubble = (x, y, w, fill, dot, cls, tail) => `<g class="${cls}">
      <rect x="${x}" y="${y}" width="${w}" height="34" rx="10" fill="${fill}"/>
      <path d="${tail}" fill="${fill}"/>
      ${[0, 1, 2].map(i => `<circle class="ca-dot" style="animation-delay:${i * .15}s" cx="${x + w / 2 + (i - 1) * 15}" cy="${y + 17}" r="4" fill="${dot}"/>`).join('')}</g>`;

  // چهار کارت «مسیر»: ثبت‌نام، هماهنگی، جلسه، ادامه — همان خانواده در قاب بلندتر
  const SG = 256;
  const STEPS = {
    // ۰۱ ثبت‌نام: فرم که خانه‌هایش پر می‌شود، دکمه فشرده می‌شود و تیک می‌خورد
    'ثبت‌نام': () => `${shadow(120, SG)}
      <rect class="ca-edge" x="96" y="50" width="146" height="202" rx="16" fill="${C.white}"/>
      <rect x="114" y="70" width="64" height="9" rx="4.5" fill="${C.ink}"/>
      ${[98, 134, 170].map((y, i) => `<rect x="114" y="${y}" width="110" height="24" rx="6" fill="${C.sand}"/>
        <rect class="ca-type" style="animation-delay:${i * .6}s" x="128" y="${y + 9}" width="${[82, 64, 74][i]}" height="6" rx="3" fill="${C.ink}" opacity=".7"/>`).join('')}
      <rect class="ca-press" x="114" y="208" width="110" height="28" rx="7" fill="${C.ember}"/>
      <rect x="150" y="219" width="38" height="6" rx="3" fill="${C.white}" opacity=".8"/>
      <g class="ca-pop" style="animation-delay:.6s">
        <circle cx="242" cy="56" r="20" fill="${C.yellow}"/>
        <path d="M233 56l6 6 12-13" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>
      ${person(286, 84, C.ink, '', 0, SG)}`,

    // ۰۲ هماهنگی: تلفنی که زنگ می‌خورد و تقویمی که روز جلسه در آن انتخاب می‌شود
    'هماهنگی': () => `${shadow(130, SG)}<g transform="translate(-8 0)">
      <rect class="ca-edge" x="54" y="82" width="140" height="170" rx="16" fill="${C.white}"/>
      <path d="M54 98a16 16 0 0 1 16-16h108a16 16 0 0 1 16 16v20H54z" fill="${C.ember}"/>
      <rect x="82" y="70" width="9" height="24" rx="4.5" fill="${C.ink}"/><rect x="157" y="70" width="9" height="24" rx="4.5" fill="${C.ink}"/>
      ${[0, 1, 2].flatMap(j => [0, 1, 2].map(i => i === 2 && j === 1
        ? `<g class="ca-pick"><rect x="${70 + i * 38}" y="${132 + j * 38}" width="30" height="30" rx="8" fill="${C.yellow}"/>
           <path d="M${78 + i * 38} ${147 + j * 38}l5 5 9-10" fill="none" stroke="${C.ink}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g>`
        : `<rect x="${70 + i * 38}" y="${132 + j * 38}" width="30" height="30" rx="8" fill="${C.sand}"/>`)).join('')}
      <g class="ca-ring">
        <rect x="222" y="92" width="78" height="152" rx="20" fill="${C.ink}"/>
        <rect x="231" y="108" width="60" height="104" rx="12" fill="${C.white}"/>
        <circle cx="261" cy="138" r="14" fill="${C.ember}"/>
        <rect x="243" y="160" width="36" height="6" rx="3" fill="${C.ink}" opacity=".7"/>
        <rect x="249" y="172" width="24" height="6" rx="3" fill="${C.ink}" opacity=".35"/>
        <rect x="252" y="224" width="18" height="6" rx="3" fill="${C.white}" opacity=".5"/></g>
      ${[0, 1].map(i => `<path class="ca-wave" style="animation-delay:${i * .25}s" d="M${304 + i * 10} ${126 - i * 10}a${20 + i * 10} ${20 + i * 10} 0 0 1 0 ${40 + i * 20}" fill="none" stroke="${C.ember}" stroke-width="6" stroke-linecap="round"/>`).join('')}</g>`,

    // ۰۳ جلسه: مشاور پشت میز و مراجع در لپ‌تاپ — حضوری یا آنلاین
    'جلسه': () => `${shadow(130, SG)}
      ${person(106, 96, C.ink, '', 0, SG)}
      ${bubble(128, 92, 62, C.ember, C.white, 'ca-talk-a', 'M136 122l-8 14 18-10z')}
      ${bubble(214, 66, 62, C.yellow, C.ink, 'ca-talk-b', 'M262 96l8 14-18-10z')}
      <rect x="196" y="122" width="96" height="70" rx="12" fill="${C.ink}"/>
      <rect x="205" y="131" width="78" height="52" rx="7" fill="${C.white}"/>
      <rect x="234" y="157" width="20" height="26" rx="10" fill="${C.ember}"/>
      <circle cx="244" cy="148" r="7" fill="${C.ember}"/>
      <rect x="184" y="188" width="120" height="9" rx="4.5" fill="${C.ink}"/>
      <rect x="60" y="197" width="250" height="14" rx="7" fill="${C.ink}"/>
      <rect x="84" y="211" width="12" height="45" rx="6" fill="${C.ink}"/>
      <rect x="274" y="211" width="12" height="45" rx="6" fill="${C.ink}"/>`,

    // ۰۴ ادامه و همراهی: مسیری که تا پرچم کشیده می‌شود، با پیام‌هایی که بعد از جلسه هم می‌رسد
    'ادامه و همراهی': () => `${shadow(130, SG)}
      <path d="M86 244C150 244 140 162 204 162S262 92 292 84" fill="none" stroke="${C.sand}" stroke-width="12" stroke-linecap="round"/>
      <path class="ca-draw" pathLength="100" d="M86 244C150 244 140 162 204 162S262 92 292 84" fill="none" stroke="${C.ember}" stroke-width="12" stroke-linecap="round"/>
      ${[[150, 214, .8], [204, 162, 1.4], [262, 112, 2]].map(([x, y, d]) => `<circle class="ca-pop" style="animation-delay:${d}s" cx="${x}" cy="${y}" r="9" fill="${C.yellow}" stroke="${C.ink}" stroke-width="4"/>`).join('')}
      <rect x="290" y="34" width="7" height="54" rx="3.5" fill="${C.ink}"/>
      <rect class="ca-flag" x="297" y="34" width="38" height="26" rx="7" fill="${C.ember}"/>
      ${person(58, 70, C.ember, '', 0, SG)}
      ${bubble(70, 64, 62, C.yellow, C.ink, 'ca-talk-a', 'M80 94l-6 14 16-10z')}
      ${bubble(150, 40, 62, C.ink, C.white, 'ca-talk-b', 'M200 70l6 14-16-10z')}`,
  };

  const SCENES = {
    // ۰۱ کلاس قرآن: قرآن باز روی رحل، خط‌ها از راست به چپ خوانده می‌شوند
    1: () => `${shadow(80)}
      <g class="ca-lift">
        <rect x="120" y="126" width="120" height="12" rx="6" fill="${C.ink}" transform="rotate(24 180 132)"/>
        <rect x="120" y="126" width="120" height="12" rx="6" fill="${C.ink}" transform="rotate(-24 180 132)"/>
        <rect x="106" y="72" width="148" height="52" rx="12" fill="${C.ember}"/>
        <g transform="rotate(-6 180 118)">
          <rect x="112" y="62" width="66" height="54" rx="12" fill="${C.white}"/>
          ${[76, 88, 100].map((y, i) => `<rect class="ca-line" style="animation-delay:${1.2 + i * .4}s" x="124" y="${y}" width="44" height="5" rx="2.5" fill="${C.ink}" opacity=".7"/>`).join('')}
        </g>
        <g transform="rotate(6 180 118)">
          <rect x="182" y="62" width="66" height="54" rx="12" fill="${C.white}"/>
          ${[76, 88, 100].map((y, i) => `<rect class="ca-line" style="animation-delay:${i * .4}s" x="192" y="${y}" width="44" height="5" rx="2.5" fill="${C.ink}" opacity=".7"/>`).join('')}
        </g>
        <rect x="174" y="58" width="12" height="64" rx="6" fill="${C.yellow}"/>
      </g>
      <circle class="ca-pop" cx="226" cy="36" r="7" fill="${C.ember}"/>`,

    // ۰۲ خانواده: پدر، مادر و دو فرزند، با قلبی که می‌تپد
    2: () => `${shadow(96)}
      ${person(118, 76, C.ink, '', 0)}${person(160, 66, C.ember, '', .25)}
      ${person(200, 44, C.yellow, '', .5)}${person(236, 38, C.white, 'ca-edge', .75)}
      <path class="ca-beat" fill="${C.ember}" d="M180 52c-10-8-20-14-20-23 0-6 5-10 10-10 4 0 8 2 10 6 2-4 6-6 10-6 5 0 10 4 10 10 0 9-10 15-20 23z"/>`,

    // ۰۳ فرزندان: کودک کنار مکعب‌های اسباب‌بازی که روی هم چیده می‌شوند
    3: () => `${shadow(90)}
      ${person(124, 46, C.yellow, 'ca-jump')}
      ${[[C.ink, 124, 0], [C.ember, 84, .5], [C.white, 44, 1]].map(([f, y, d]) =>
        `<rect class="ca-drop ${f === C.white ? 'ca-edge' : ''}" style="animation-delay:${d}s" x="184" y="${y}" width="40" height="40" rx="10" fill="${f}"/>`).join('')}
      <path class="ca-pop" style="animation-delay:1.6s" fill="${C.ember}" d="M258 26l4 10 10 4-10 4-4 10-4-10-10-4 10-4z"/>`,

    // ۰۴ فردی: مشاور و مراجع رو‌به‌روی هم، گفتگو با حباب‌های پیام
    4: () => `${shadow(100)}
      ${person(104, 70, C.ink)}${person(256, 62, C.ember, '', .4)}
      <g class="ca-talk-a">
        <rect x="128" y="30" width="78" height="36" rx="10" fill="${C.ink}"/>
        <path d="M136 62l-8 14 18-10z" fill="${C.ink}"/>
        ${[152, 167, 182].map((x, i) => `<circle class="ca-dot" style="animation-delay:${i * .15}s" cx="${x}" cy="48" r="4" fill="${C.white}"/>`).join('')}
      </g>
      <g class="ca-talk-b">
        <rect x="160" y="74" width="72" height="34" rx="10" fill="${C.yellow}"/>
        <path d="M224 104l10 12-20-6z" fill="${C.yellow}"/>
        ${[180, 196, 212].map((x, i) => `<circle class="ca-dot" style="animation-delay:${i * .15}s" cx="${x}" cy="91" r="4" fill="${C.ember}"/>`).join('')}
      </g>`,

    // ۰۵ کتاب‌ها: کتاب‌های ایستاده، یکی بیرون کشیده می‌شود
    5: () => {
      const book = (x, w, h, f, cls = '') => {
        const band = f === C.ink || f === C.ember ? C.white : C.ink;
        return `<g class="${cls}"><rect x="${x}" y="${GROUND - h}" width="${w}" height="${h}" rx="7" fill="${f}"/>
          <rect x="${x + 6}" y="${GROUND - h + 12}" width="${w - 12}" height="4" rx="2" fill="${band}" opacity=".35"/>
          <rect x="${x + 6}" y="${GROUND - 20}" width="${w - 12}" height="4" rx="2" fill="${band}" opacity=".35"/></g>`;
      };
      return `${shadow(92)}
        ${book(104, 30, 86, C.ember)}${book(138, 26, 72, C.ink)}
        ${book(168, 32, 94, C.yellow, 'ca-pull')}${book(204, 28, 80, C.white, 'ca-edge')}
        <g transform="rotate(-12 242 ${GROUND})">${book(242, 28, 78, C.ink)}</g>`;
    },

    // ۰۶ تلاوت و پادکست: میکروفون با موج صدا در دو طرف
    6: () => `${shadow(88)}
      ${[96, 110, 124, 138].map((x, i) => `<rect class="ca-eq" style="animation-delay:${i * .18}s" x="${x}" y="52" width="9" height="44" rx="4.5" fill="${i % 2 ? C.yellow : C.ember}"/>`).join('')}
      ${[213, 227, 241, 255].map((x, i) => `<rect class="ca-eq" style="animation-delay:${(3 - i) * .18}s" x="${x}" y="52" width="9" height="44" rx="4.5" fill="${i % 2 ? C.ember : C.yellow}"/>`).join('')}
      <rect x="158" y="22" width="44" height="74" rx="22" fill="${C.ink}"/>
      ${[42, 54, 66, 78].map(y => `<rect x="168" y="${y}" width="24" height="4" rx="2" fill="${C.white}" opacity=".3"/>`).join('')}
      <path d="M144 62v6a36 36 0 0 0 72 0v-6" fill="none" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/>
      <rect x="176" y="104" width="8" height="46" rx="4" fill="${C.ink}"/>
      <rect x="148" y="148" width="64" height="14" rx="7" fill="${C.ink}"/>`,
  };

  const css = `
    [data-ca]{position:relative}
    [data-ca] > :not(.ca-art){opacity:0;pointer-events:none}
    .ca-svc{min-height:15.5rem}
    .ca-art{position:absolute;inset:0;width:100%;height:100%;overflow:visible;filter:drop-shadow(0 6px 10px rgba(30,30,30,.12))}
    .ca-art *{animation-play-state:paused}
    .ca-art [class*="ca-"]{transform-box:fill-box}
    .ca-art.on *{animation-play-state:running}
    .ca-edge{stroke:rgba(30,30,30,.08);stroke-width:1}
    .ca-bob{transform-origin:50% 100%;animation:ca-bob 2.4s ease-in-out infinite}
    .ca-jump{transform-origin:50% 100%;animation:ca-jump 3s cubic-bezier(.3,0,.3,1) infinite}
    .ca-lift{animation:ca-float 4s ease-in-out infinite}
    .ca-line{transform-origin:100% 50%;animation:ca-read 4.8s ease-in-out infinite}
    .ca-pop{transform-origin:50% 50%;animation:ca-pop 3s ease-in-out infinite}
    .ca-beat{transform-origin:50% 60%;animation:ca-beat 1.6s ease-in-out infinite}
    .ca-drop{animation:ca-drop 3s cubic-bezier(.34,1.4,.64,1) infinite}
    .ca-talk-a{animation:ca-talk-a 5s ease-in-out infinite}
    .ca-talk-b{animation:ca-talk-b 5s ease-in-out infinite}
    .ca-dot{animation:ca-dot 1s ease-in-out infinite}
    .ca-pull{animation:ca-pull 4s cubic-bezier(.65,0,.35,1) infinite}
    .ca-eq{transform-origin:50% 50%;animation:ca-eq 1.1s ease-in-out infinite}
    @keyframes ca-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
    @keyframes ca-jump{0%,60%,100%{transform:translateY(0) scaleY(1)}68%{transform:translateY(0) scaleY(.92)}78%{transform:translateY(-14px) scaleY(1.04)}88%{transform:translateY(0) scaleY(1)}}
    @keyframes ca-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
    @keyframes ca-read{0%{transform:scaleX(0)}15%,85%{transform:scaleX(1)}100%{transform:scaleX(0)}}
    @keyframes ca-pop{0%,40%{transform:scale(0)}55%{transform:scale(1.2)}65%,90%{transform:scale(1)}100%{transform:scale(0)}}
    @keyframes ca-beat{0%,100%{transform:scale(1)}15%{transform:scale(1.15)}30%{transform:scale(.97)}45%{transform:scale(1.08)}}
    @keyframes ca-drop{0%{transform:translateY(-70px);opacity:0}25%,85%{transform:translateY(0);opacity:1}100%{transform:translateY(0);opacity:0}}
    @keyframes ca-talk-a{0%,5%{opacity:0;transform:translateY(8px)}12%,45%{opacity:1;transform:none}52%,100%{opacity:0;transform:translateY(-4px)}}
    @keyframes ca-talk-b{0%,50%{opacity:0;transform:translateY(8px)}58%,92%{opacity:1;transform:none}100%{opacity:0;transform:translateY(-4px)}}
    @keyframes ca-dot{0%,100%{transform:translateY(0);opacity:.5}50%{transform:translateY(-4px);opacity:1}}
    @keyframes ca-pull{0%,20%,80%,100%{transform:translateY(0) rotate(0)}40%,60%{transform:translateY(-16px) rotate(-4deg)}}
    @keyframes ca-eq{0%,100%{transform:scaleY(.35)}50%{transform:scaleY(1)}}
    .ca-type{transform-origin:100% 50%;animation:ca-read 4.8s ease-in-out infinite}
    .ca-press{transform-origin:50% 50%;animation:ca-press 4.8s ease-in-out infinite}
    .ca-pick{transform-origin:50% 50%;animation:ca-pick 3.2s ease-in-out infinite}
    .ca-ring{transform-origin:50% 100%;animation:ca-ring 3.2s ease-in-out infinite}
    .ca-wave{animation:ca-wave 1.6s ease-in-out infinite}
    .ca-draw{stroke-dasharray:100;animation:ca-draw 4.5s ease-in-out infinite}
    .ca-flag{transform-origin:0 50%;animation:ca-flag 1.8s ease-in-out infinite}
    @keyframes ca-press{0%,40%,52%,100%{transform:scale(1)}46%{transform:scale(.94)}}
    @keyframes ca-pick{0%,30%{transform:scale(0)}42%{transform:scale(1.15)}50%,90%{transform:scale(1)}100%{transform:scale(0)}}
    @keyframes ca-ring{0%,40%,100%{transform:rotate(0)}5%,15%,25%{transform:rotate(-5deg)}10%,20%,30%{transform:rotate(5deg)}}
    @keyframes ca-wave{0%,100%{opacity:.15}50%{opacity:1}}
    @keyframes ca-draw{0%{stroke-dashoffset:100}55%,85%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:0}}
    @keyframes ca-flag{0%,100%{transform:skewY(0)}50%{transform:skewY(-6deg)}}
    @media (prefers-reduced-motion:reduce){.ca-art *{animation:none!important}}`;

  const seen = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('on', e.isIntersecting)));

  // تصویر کارت خدمات تا جای ممکن کادر را پر می‌کند (کادر دید = اندازه‌ی واقعی شکل‌ها با کمی حاشیه)
  const fit = svg => {
    try {
      const b = svg.getBBox(), p = Math.max(b.width, b.height) * 0.05;
      if (b.width && b.height) svg.setAttribute('viewBox', `${b.x - p} ${b.y - p} ${b.width + 2 * p} ${b.height + 2 * p}`);
    } catch (e) {}
  };

  // کارت‌ها را با شماره‌ی برچسبشان (۰۱ تا ۰۶) پیدا می‌کند
  const mount = () => {
    addStyle();
    document.querySelectorAll('article').forEach(card => {
      const tag = card.querySelector(':scope > div span')?.textContent || '';
      const m = tag.match(/(خدمت|بخش) ۰([۱-۶])/);
      const host = card.querySelector(':scope > div.relative.mt-5');
      if (!m || !host || host.querySelector('.ca-art')) return;
      const n = '۱۲۳۴۵۶'.indexOf(m[2]) + 1;
      host.dataset.ca = n;
      host.classList.add('ca-svc');
      host.insertAdjacentHTML('beforeend', `<svg class="ca-art" viewBox="40 10 280 162" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${SCENES[n]()}</svg>`);
      fit(host.lastElementChild);
      seen.observe(host.lastElementChild);
    });
    // کارت‌های مسیر با عنوانشان پیدا می‌شوند
    document.querySelectorAll('li').forEach(card => {
      const title = card.querySelector(':scope > div.border-t h3')?.textContent.trim();
      const host = card.firstElementChild;
      if (!STEPS[title] || !host || host.querySelector('.ca-art')) return;
      host.dataset.ca = title;
      host.insertAdjacentHTML('beforeend', `<svg class="ca-art" viewBox="14 20 336 250" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${STEPS[title]()}</svg>`);
      seen.observe(host.lastElementChild);
    });
  };

  const style = document.createElement('style');
  style.textContent = css;
  const addStyle = () => document.head.contains(style) || document.head.appendChild(style);

  // React ممکن است صفحه را دوباره بسازد؛ هر بار کارت‌ها دوباره پر می‌شوند
  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; mount(); });
  }).observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('load', mount);
  mount();
})();
