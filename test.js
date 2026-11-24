// تست علایق و شخصیت: ۳۰ سؤال علایق (Mini-IP از O*NET) و ۲۰ سؤال شخصیت (Mini-IPIP)
// همه‌چیز فقط داخل مرورگر حساب می‌شود و هیچ پاسخی به جایی فرستاده نمی‌شود.
(() => {
  const app = document.getElementById('test-app');
  if (!app) return;

  const FA = '۰۱۲۳۴۵۶۷۸۹';
  const fa = n => String(n).replace(/\d/g, d => FA[d]);

  // ---------- سؤال‌های علایق (هالند / RIASEC) ----------
  const TYPES = {
    R: { name: 'عملی و فنی', about: 'به کار عملی، ابزار، ساختن و تعمیر کردن علاقه دارید.', cls: 'یادگیری قرآن با تمرین و تکرار منظم و کلاس‌های مهارت‌محور' },
    I: { name: 'پژوهشگر', about: 'کنجکاو و تحلیل‌گر هستید و دوست دارید چیزها را عمیق بفهمید.', cls: 'تفسیر و تدبر در آیات' },
    A: { name: 'هنری', about: 'خلاق هستید و به بیان هنری، نوشتن و موسیقی علاقه دارید.', cls: 'تلاوت و صوت، و ادبیات قرآنی' },
    S: { name: 'اجتماعی', about: 'دوست دارید به دیگران کمک کنید، یاد بدهید و با آدم‌ها کار کنید.', cls: 'کلاس‌های گروهی و آموزش قرآن برای انتقال به دیگران' },
    E: { name: 'کارآفرین', about: 'به رهبری، متقاعد کردن دیگران و راه‌اندازی کار علاقه دارید.', cls: 'سخنوری و انتقال مفاهیم قرآنی' },
    C: { name: 'سازمان‌دهنده', about: 'نظم، دقت و کار برنامه‌ریزی‌شده را دوست دارید.', cls: 'حفظ قرآن با برنامه‌ی منظم و گام‌به‌گام' },
  };
  const INTEREST = {
    R: ['ساختن کابینت آشپزخانه', 'تعمیر لوازم خانگی', 'مونتاژ قطعات الکترونیکی', 'رانندگی با وانت یا کامیون برای رساندن بسته‌ها به منازل و ادارات', 'کنترل کیفیت قطعات پیش از ارسال'],
    I: ['ساخت یک داروی جدید', 'بررسی راه‌های کاهش آلودگی آب', 'انجام آزمایش‌های شیمی', 'مشاهده‌ی نمونه‌های خون با میکروسکوپ', 'ابداع روشی برای پیش‌بینی بهتر آب‌وهوا'],
    A: ['نوشتن کتاب یا نمایشنامه', 'آهنگسازی یا تنظیم موسیقی', 'ساخت جلوه‌های ویژه برای فیلم', 'طراحی و رنگ‌آمیزی دکور نمایش', 'نوشتن فیلمنامه برای فیلم یا سریال'],
    S: ['کمک به افرادی که مشکل شخصی یا عاطفی دارند', 'راهنمایی تحصیلی و شغلی برای دیگران', 'کمک به بازتوانی بیماران', 'کار داوطلبانه در یک مؤسسه‌ی خیریه', 'تدریس به دانش‌آموزان دبیرستان'],
    E: ['مدیریت یک بخش در یک شرکت بزرگ', 'راه‌اندازی کسب‌وکار شخصی', 'مذاکره برای قراردادهای کاری', 'بازاریابی یک مجموعه‌ی جدید پوشاک', 'فروش کالا در یک فروشگاه'],
    C: ['نصب نرم‌افزار روی یک شبکه‌ی بزرگ کامپیوتری', 'کار با ماشین‌حساب و محاسبه‌ی اعداد', 'ثبت اسناد ورود و خروج کالا', 'شمارش و ثبت موجودی انبار با دستگاه دستی', 'دسته‌بندی و توزیع نامه‌های یک سازمان'],
  };
  const interest = [];
  for (let j = 0; j < 5; j++) for (const t of 'RIASEC') interest.push({ kind: 'i', t, text: INTEREST[t][j] });

  // ---------- سؤال‌های شخصیت (پنج عامل بزرگ) ----------
  const TRAITS = {
    E: { name: 'برون‌گرایی', hi: 'در جمع انرژی می‌گیرید و ارتباط با دیگران را دوست دارید.', lo: 'بیشتر در آرامش و خلوت انرژی می‌گیرید و ارتباط‌های محدودتر اما عمیق‌تر را ترجیح می‌دهید.', mid: 'بسته به شرایط، هم در جمع راحت هستید و هم در خلوت.' },
    A: { name: 'همدلی و همراهی', hi: 'به احساس دیگران حساس هستید و همدلی‌تان بالاست.', lo: 'بیشتر مستقل و منطقی تصمیم می‌گیرید و کمتر تحت تأثیر احساس دیگران قرار می‌گیرید.', mid: 'میان همدلی و استقلال تعادل دارید.' },
    C: { name: 'نظم و مسئولیت‌پذیری', hi: 'منظم و هدفمند هستید و کارها را به‌موقع انجام می‌دهید.', lo: 'انعطاف‌پذیر و لحظه‌ای عمل می‌کنید و برنامه‌ریزی سخت‌گیرانه را کمتر دوست دارید.', mid: 'در برنامه‌ریزی و انعطاف تعادل دارید.' },
    S: { name: 'ثبات هیجانی', hi: 'زیر فشار آرام می‌مانید و نوسان خلقی کمی دارید.', lo: 'احساسات‌تان تند و پرنوسان است؛ این می‌تواند نشانه‌ی حساسیت بالا هم باشد.', mid: 'گاهی احساسات‌تان بالا و پایین می‌شود، ولی معمولاً به تعادل برمی‌گردید.' },
    O: { name: 'تخیل و گشودگی ذهنی', hi: 'تخیل قوی دارید و به ایده‌های تازه و مفاهیم انتزاعی علاقه‌مندید.', lo: 'به مسائل عینی و کاربردی علاقه‌مندترید.', mid: 'هم به ایده‌های تازه و هم به مسائل کاربردی توجه دارید.' },
  };
  // r: جمله‌ی معکوس است. ثبات هیجانی از معکوس «نوسان خلق» ساخته می‌شود
  const BIG = {
    E: [['در جمع‌ها فعال و پرانرژی هستم.', 0], ['کم صحبت می‌کنم.', 1], ['در مهمانی‌ها با افراد زیادی گفتگو می‌کنم.', 0], ['ترجیح می‌دهم در حاشیه بمانم.', 1]],
    A: [['با احساسات دیگران همدردی می‌کنم.', 0], ['مشکلات دیگران برایم اهمیتی ندارد.', 1], ['احساس دیگران را درک می‌کنم.', 0], ['علاقه‌ی چندانی به دیگران ندارم.', 1]],
    C: [['کارهای روزمره را بی‌درنگ انجام می‌دهم.', 0], ['اغلب وسایل را سر جای خود برنمی‌گردانم.', 1], ['نظم و ترتیب را دوست دارم.', 0], ['کارها را به‌هم می‌ریزم.', 1]],
    S: [['نوسان خلقی زیاد دارم.', 1], ['زود ناراحت می‌شوم.', 1], ['بیشتر وقت‌ها آرام و آسوده هستم.', 0], ['به‌ندرت غمگین می‌شوم.', 0]],
    O: [['تخیل قوی دارم.', 0], ['درک ایده‌های انتزاعی برایم سخت است.', 1], ['به ایده‌های انتزاعی علاقه ندارم.', 1], ['تخیل خوبی ندارم.', 1]],
  };
  const big = [];
  for (let j = 0; j < 4; j++) for (const t of 'EACSO') big.push({ kind: 'p', t, text: BIG[t][j][0], rev: !!BIG[t][j][1] });

  const items = [...interest, ...big];
  const PER_PAGE = 5;
  const PAGES = Math.ceil(items.length / PER_PAGE);
  const SCALES = {
    i: ['اصلاً', 'کم', 'نمی‌دانم', 'زیاد', 'خیلی'],
    p: ['اصلاً', 'کم', 'تا حدی', 'زیاد', 'کاملاً'],
  };
  const PART = {
    i: 'بخش ۱ از ۲، علایق: این کارها را چقدر دوست دارید؟',
    p: 'بخش ۲ از ۲، شخصیت: هر جمله چقدر درباره‌ی شما درست است؟',
  };

  let page = 0;
  let answers = new Array(items.length).fill(0);

  const intro = () => {
    app.innerHTML = `
      <div class="tcard">
        <h3>قبل از شروع</h3>
        <ul class="tlist">
          <li>۵۰ سؤال کوتاه و حدود ۷ دقیقه زمان.</li>
          <li>درست یا غلط ندارد؛ اولین حسی که دارید را انتخاب کنید.</li>
          <li>پاسخ‌های شما به‌خودی‌خود برای ما فرستاده نمی‌شود. فقط اگر هنگام ثبت‌نام یا مشاوره خودتان تیک بزنید، خلاصه‌ی نتیجه همراه فرم می‌آید.</li>
          <li>نتیجه آشنایی با خود است و تشخیص پزشکی یا روانشناسی نیست.</li>
        </ul>
        <button type="button" class="button primary" data-act="start">شروع تست</button>
      </div>`;
  };

  const ask = () => {
    const from = page * PER_PAGE;
    const chunk = items.slice(from, from + PER_PAGE);
    const kind = chunk[0].kind;
    const scale = SCALES[kind];
    const pct = Math.round((page / PAGES) * 100);
    const qs = chunk.map((it, k) => {
      const idx = from + k;
      const opts = scale.map((label, v) => `<label><input type="radio" name="q${idx}" value="${v + 1}"${answers[idx] === v + 1 ? ' checked' : ''}><span>${label}</span></label>`).join('');
      return `<fieldset class="tq" data-i="${idx}"><legend><b>${fa(idx + 1)}.</b> ${it.text}</legend><div class="tscale">${opts}</div></fieldset>`;
    }).join('');
    app.innerHTML = `
      <div class="tprog" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><i style="width:${pct}%"></i></div>
      <p class="tpart">${PART[kind]}</p>
      <form class="tform" novalidate>${qs}
        <p class="form__msg" role="status" aria-live="polite"></p>
        <div class="trow">
          ${page > 0 ? '<button type="button" class="button ghost-dark" data-act="prev">قبلی</button>' : '<span></span>'}
          <button type="submit" class="button primary">${page === PAGES - 1 ? 'دیدن نتیجه' : 'بعدی'}</button>
        </div>
      </form>`;
    const form = app.querySelector('form');
    form.addEventListener('change', e => {
      if (e.target.type === 'radio') {
        answers[+e.target.name.slice(1)] = +e.target.value;
        e.target.closest('fieldset').removeAttribute('aria-invalid');
      }
    });
    form.addEventListener('submit', e => {
      e.preventDefault();
      const missing = [...form.querySelectorAll('fieldset')].filter(f => !answers[+f.dataset.i]);
      form.querySelectorAll('fieldset').forEach(f => f.removeAttribute('aria-invalid'));
      if (missing.length) {
        missing.forEach(f => f.setAttribute('aria-invalid', 'true'));
        form.querySelector('.form__msg').textContent = 'لطفاً به همه‌ی سؤال‌های این صفحه پاسخ بدهید.';
        form.querySelector('.form__msg').classList.add('err');
        missing[0].querySelector('input').focus();
        return;
      }
      page === PAGES - 1 ? result() : (page++, ask(), top());
    });
    app.querySelector('[data-act=prev]')?.addEventListener('click', () => { page--; ask(); top(); });
  };

  const top = () => app.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });

  const level = m => (m >= 3.7 ? 'hi' : m <= 2.3 ? 'lo' : 'mid');
  const LEVEL_TXT = { hi: 'بالا', mid: 'متوسط', lo: 'پایین' };

  const result = () => {
    // علایق: جمع پنج سؤال هر نوع، بین ۵ تا ۲۵
    const h = Object.fromEntries([...'RIASEC'].map(t => [t, 0]));
    // شخصیت: میانگین چهار سؤال هر عامل، بین ۱ تا ۵ (جمله‌های معکوس برعکس می‌شوند)
    const b = Object.fromEntries([...'EACSO'].map(t => [t, 0]));
    items.forEach((it, i) => {
      const v = answers[i];
      if (it.kind === 'i') h[it.t] += v;
      else b[it.t] += (it.rev ? 6 - v : v) / 4;
    });
    const order = [...'RIASEC'].sort((x, y) => h[y] - h[x] || 'RIASEC'.indexOf(x) - 'RIASEC'.indexOf(y));
    const top3 = order.slice(0, 3);
    const hBars = [...'RIASEC'].map(t => `<div class="tbar"><span class="tbar__l">${TYPES[t].name}</span><div class="tbar__t"><i class="${top3.includes(t) ? 'top' : ''}" style="width:${Math.round((h[t] - 5) / 20 * 100)}%"></i></div><b>${fa(h[t])}</b></div>`).join('');
    const bBars = [...'EACSO'].map(t => `<div class="tbar"><span class="tbar__l">${TRAITS[t].name}</span><div class="tbar__t"><i style="width:${Math.round((b[t] - 1) / 4 * 100)}%"></i></div><b>${LEVEL_TXT[level(b[t])]}</b></div>`).join('');
    const bText = [...'EACSO'].map(t => `<li><b>${TRAITS[t].name}:</b> ${TRAITS[t][level(b[t])]}</li>`).join('');
    const hText = top3.map(t => `<li><b>${TYPES[t].name}:</b> ${TYPES[t].about}</li>`).join('');
    const classes = top3.map(t => TYPES[t].cls);
    // خلاصه‌ی نتیجه فقط روی همین دستگاه می‌ماند تا کاربر بتواند، اگر خواست، همراه فرم‌ها بفرستد
    try {
      localStorage.setItem('safiran-test', JSON.stringify({
        at: Date.now(),
        h: h,
        b: Object.fromEntries(Object.entries(b).map(([k, v]) => [k, Math.round(v * 10) / 10])),
      }));
    } catch {}
    const wobble = level(b.S) === 'lo'
      ? '<p class="tnote">اگر احساس می‌کنید نوسان احساسی‌تان زندگی روزمره را سخت کرده، می‌توانید از صفحه‌ی خدمات درخواست مشاوره بدهید.</p>' : '';
    app.innerHTML = `
      <div class="tcard tresult">
        <p class="tcode">کد علایق شما: <b dir="ltr">${top3.join('')}</b> <span>(${top3.map(t => TYPES[t].name).join('، ')})</span></p>
        <h3>علایق شما</h3>
        <div class="tbars">${hBars}</div>
        <ul class="tlist">${hText}</ul>
        <h3>ویژگی‌های شخصیتی شما</h3>
        <p class="tsub">سطح هر ویژگی بر اساس پاسخ‌های خودتان است، نه مقایسه با دیگران.</p>
        <div class="tbars">${bBars}</div>
        <ul class="tlist">${bText}</ul>
        ${wobble}
        <h3>پیشنهاد برای شما</h3>
        <p>با توجه به علایق برجسته‌ی شما، این موضوع‌ها در کلاس‌های قرآن می‌توانند جذاب‌تر باشند: <b>${classes.join('؛ ')}</b>. این فقط یک پیشنهاد اولیه است.</p>
        <div class="trow trow--end">
          <button type="button" class="button ghost-dark" data-act="again">انجام دوباره</button>
          <button type="button" class="button ghost-dark" data-act="clear">پاک کردن نتیجه از این مرورگر</button>
          <a class="button" href="services.html">مشاوره و خدمات</a>
          <a class="button primary" href="signup.html">ثبت‌نام کلاس‌ها</a>
        </div>
        <p class="tsub">این نتیجه برای آشنایی با خود است و جایگزین تشخیص متخصص نیست. خلاصه‌ی آن فقط روی همین دستگاه نگه داشته می‌شود تا اگر خواستید، هنگام ثبت‌نام یا درخواست مشاوره همراه فرم برای ما بفرستید.</p>
      </div>`;
    top();
  };

  app.addEventListener('click', e => {
    const act = e.target.dataset.act;
    if (act === 'start') { page = 0; answers = new Array(items.length).fill(0); ask(); top(); }
    if (act === 'again') { intro(); top(); }
    if (act === 'clear') { try { localStorage.removeItem('safiran-test'); } catch {} intro(); top(); }
  });
  intro();
})();
