// همه‌ی فرم‌ها به این تابع سرور می‌روند و از آن‌جا در تلگرام می‌رسند
const CONFIG = {
  phone: '09150900177',
  endpoint: 'https://sbkbmwsavszewsyxcqoz.supabase.co/functions/v1/linkade',
  support: 'https://sbkbmwsavszewsyxcqoz.supabase.co/functions/v1/support',
};

// تبدیل اعداد فارسی/عربی به انگلیسی
const toEn = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));

// ارسال مشترک فرم‌ها؛ اگر پیام ثبت شد true برمی‌گرداند
const sendForm = async (f, data, tell, success) => {
  const button = f.querySelector('button[type=submit]');
  let sent = false;
  button.disabled = true;
  tell('در حال ارسال…');
  try {
    const r = await fetch(CONFIG.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (r.status === 429) {
      tell('درخواست‌های زیادی فرستاده شده است. لطفاً کمی بعد دوباره امتحان کنید.', true);
    } else if (r.status === 403) {
      tell('ارسال این فرم ممکن نشد. لطفاً با مؤسسه تماس بگیرید.', true);
    } else if (!r.ok) {
      throw new Error(r.status);
    } else {
      f.reset();
      tell(success);
      sent = true;
    }
  } catch {
    tell('ارسال انجام نشد. لطفاً چند دقیقه‌ی دیگر دوباره امتحان کنید یا در اینستاگرام برای ما پیام بدهید.', true);
  }
  button.disabled = false;
  return sent;
};

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// بازی قرآنی: پنج سؤال، چهار گزینه
if (document.getElementById('quiz')) {
  const QUESTIONS = [
    { q: 'قرآن چند سوره دارد؟', a: '۱۱۴', o: ['۹۹', '۱۱۰', '۱۲۰'] },
    { q: 'قرآن چند جزء دارد؟', a: '۳۰', o: ['۱۵', '۲۰', '۴۰'] },
    { q: 'اولین سوره‌ی قرآن کدام است؟', a: 'حمد', o: ['بقره', 'ناس', 'علق'] },
    { q: 'بلندترین سوره‌ی قرآن کدام است؟', a: 'بقره', o: ['یس', 'نساء', 'آل‌عمران'] },
    { q: 'کدام سوره با «بسم‌الله» شروع نمی‌شود؟', a: 'توبه', o: ['حمد', 'یس', 'کوثر'] },
  ];
  const FA = '۰۱۲۳۴۵۶۷۸۹';
  const faNum = n => String(n).replace(/\d/g, d => FA[d]);
  const dialog = document.getElementById('quiz');
  const card = document.getElementById('quiz-card');
  const party = document.getElementById('quiz-party');
  let timers = [];
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  const clearAll = () => { timers.forEach(clearTimeout); timers = []; party.innerHTML = ''; };
  const shuffle = list => {
    const a = [...list];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const render = html => {
    card.innerHTML = html;
    card.style.animation = 'none';
    void card.offsetWidth;
    card.style.animation = '';
  };
  const close = () => { clearAll(); dialog.close(); };

  const intro = () => {
    clearAll();
    render(`<img class="quiz__hero" src="img/popper.webp" alt="">
      <h2>یک بازی کوتاه قرآنی</h2>
      <p>پنج سؤال ساده با چهار گزینه. تا یک اشتباه مجاز است؛ با اشتباه دوم از بازی حذف می‌شوید. اگر تا آخر بمانید، برنده‌اید!</p>
      <div class="quiz__row">
        <button type="button" class="button primary" data-act="start">شروع بازی</button>
        <button type="button" class="quiz__skip" data-act="close">رد شدن و ورود به سایت</button>
      </div>`);
  };

  // دو اشتباه مجاز است؛ اشتباه دوم یعنی حذف
  const MAX_MISTAKES = 2;
  let results = [];

  const ask = i => {
    const item = QUESTIONS[i];
    const mistakes = results.filter(r => !r).length;
    const steps = QUESTIONS.map((_, n) => `<i class="${n < i ? (results[n] ? 'done' : 'wrong') : ''}"></i>`).join('');
    const hearts = Array.from({ length: MAX_MISTAKES }, (_, n) => `<span class="${n < mistakes ? 'lost' : ''}" aria-hidden="true">♥</span>`).join('');
    const opts = shuffle([item.a, ...item.o]).map(t => `<button type="button" class="quiz__opt" data-opt="${t}">${t}</button>`).join('');
    render(`<div class="quiz__steps">${steps}</div>
      <div class="quiz__num">سؤال ${faNum(i + 1)} از ${faNum(QUESTIONS.length)}</div>
      <div class="quiz__lives" aria-label="فرصت باقی‌مانده: ${faNum(MAX_MISTAKES - mistakes)} از ${faNum(MAX_MISTAKES)}">${hearts}</div>
      <div class="quiz__q">${item.q}</div>
      <div class="quiz__opts">${opts}</div>
      <p class="quiz__fb" role="status"></p>`);
    const fb = card.querySelector('.quiz__fb');
    card.querySelectorAll('.quiz__opt').forEach(b => b.addEventListener('click', () => {
      const all = card.querySelectorAll('.quiz__opt');
      all.forEach(x => { x.disabled = true; });
      const right = b.dataset.opt === item.a;
      results[i] = right;
      b.classList.add(right ? 'ok' : 'bad');
      if (!right) {
        // جواب درست همان لحظه سبز می‌شود
        all.forEach(x => { if (x.dataset.opt === item.a) x.classList.add('ok', 'reveal'); });
        const left = MAX_MISTAKES - results.filter(r => !r).length;
        const live = [...card.querySelectorAll('.quiz__lives span')];
        live[Math.min(MAX_MISTAKES - left - 1, live.length - 1)].classList.add('lost');
        fb.textContent = `جواب درست: ${item.a}` + (left > 0 ? ` | ${faNum(left)} فرصت باقی مانده` : '');
      }
      const mistakesNow = results.filter(r => !r).length;
      later(() => {
        if (mistakesNow >= MAX_MISTAKES) lose();
        else if (i + 1 < QUESTIONS.length) ask(i + 1);
        else win();
      }, right ? 650 : 2200);
    }));
  };

  const lose = () => {
    render(`<h2>شما موفق نشدید متاسفانه</h2>
      <p>دو اشتباه کردید و از بازی حذف شدید. اشکالی ندارد، می‌توانید دوباره امتحان کنید.</p>
      <div class="quiz__row">
        <button type="button" class="button primary" data-act="start">دوباره امتحان کنید</button>
        <button type="button" class="quiz__skip" data-act="close">ورود به سایت</button>
      </div>`);
  };

  const win = () => {
    const mistakes = results.filter(r => !r).length;
    render(`<img class="quiz__hero" src="img/popper.webp" alt="">
      <h2>تبریک! شما برنده شدید</h2>
      <p>${mistakes ? 'با یک اشتباه به پایان رساندید.' : 'هر پنج سؤال را درست جواب دادید.'}</p>
      <div class="quiz__row"><button type="button" class="button primary" data-act="close">ورود به سایت</button></div>`);
    if (reduceMotion) return;
    party.innerHTML = '<img class="trumpet trumpet--r" src="img/trumpet.webp" alt=""><img class="trumpet trumpet--l" src="img/trumpet.webp" alt="">';
    for (let i = 0; i < 22; i++) {
      const b = document.createElement('div');
      b.className = 'balloon';
      b.style.cssText = `left:${Math.random() * 94}%;--w:${54 + Math.random() * 70}px;--d:${4.5 + Math.random() * 3.5}s;--t:${Math.random() * 2.2}s`;
      b.innerHTML = `<img src="img/balloon-${['gold', 'teal', 'copper'][i % 3]}.webp" alt="">`;
      party.appendChild(b);
    }
  };

  card.addEventListener('click', e => {
    const act = e.target.dataset.act;
    if (act === 'start') { clearAll(); results = []; ask(0); }
    if (act === 'close') close();
  });
  dialog.addEventListener('close', clearAll);
  const open = () => { intro(); if (!dialog.open) dialog.showModal(); };
  document.querySelectorAll('[data-open-game]').forEach(b => b.addEventListener('click', () => {
    open();
  }));

  // در اولین ورود هر بازدید، بازی خودش باز می‌شود
  let seen = false;
  try { seen = sessionStorage.getItem('quiz-seen') === '1'; sessionStorage.setItem('quiz-seen', '1'); } catch {}
  if (document.body.dataset.page === 'game') setTimeout(open, 300);
  else if (!seen) setTimeout(open, 900);
}

// لینک‌کده
if (document.getElementById('linkade-form')) {
  const f = document.getElementById('linkade-form');
  const note = f.querySelector('.form__msg');
  const label = document.getElementById('linkade-skill-label');
  const tell = (text, err) => { note.textContent = text; note.classList.toggle('err', !!err); };

  f.querySelectorAll('[name=role]').forEach(r => r.addEventListener('change', () => {
    const need = f.role.value === 'need';
    label.textContent = need ? 'به چه نیرویی نیاز دارید؟' : 'توانایی شما چیست؟';
    f.skill.placeholder = need ? 'مثلاً: به یک برنامه‌نویس سایت نیاز داریم' : 'مثلاً: برنامه‌نویس هستم و سه سال سابقه دارم';
  }));

  f.addEventListener('submit', async e => {
    e.preventDefault();
    const data = {
      kind: 'linkade',
      role: f.role.value,
      name: f.name.value.trim(),
      phone: toEn(f.phone.value).replace(/[\s-]/g, ''),
      city: f.city.value.trim(),
      field: f.field.value,
      skill: f.skill.value.trim(),
      note: f.note.value.trim(),
      website: f.website.value,
      consent: f.consent.checked,
    };
    const bad = [];
    if (data.name.length < 2) bad.push(f.name);
    if (!/^(\+98|0098|0)?9\d{9}$/.test(data.phone)) bad.push(f.phone);
    if (!data.field) bad.push(f.field);
    if (data.skill.length < 3) bad.push(f.skill);
    [f.name, f.phone, f.field, f.skill].forEach(el => el.setAttribute('aria-invalid', bad.includes(el)));
    if (bad.length) {
      tell('لطفاً نام، شماره‌ی موبایل درست، حوزه‌ی کاری و توضیح توانایی را وارد کنید.', true);
      bad[0].focus();
      return;
    }
    if (!data.consent) {
      tell('برای ثبت، لطفاً تیک موافقت را بزنید.', true);
      f.consent.focus();
      return;
    }
    if (await sendForm(f, data, tell, 'معرفی شما ثبت شد. در اولین فرصت با شما تماس می‌گیریم. 🌿')) {
      label.textContent = 'توانایی شما چیست؟';
    }
  });
}

// فرم تولیدکنندگان
if (document.getElementById('producer-form')) {
  const f = document.getElementById('producer-form');
  const note = f.querySelector('.form__msg');
  const tell = (text, err) => { note.textContent = text; note.classList.toggle('err', !!err); };

  f.addEventListener('submit', async e => {
    e.preventDefault();
    const data = {
      kind: 'producer',
      name: f.name.value.trim(),
      phone: toEn(f.phone.value).replace(/[\s-]/g, ''),
      brand: f.brand.value.trim(),
      category: f.category.value,
      city: f.city.value.trim(),
      note: f.note.value.trim(),
      website: f.website.value,
      consent: f.consent.checked,
    };
    const bad = [];
    if (data.name.length < 2) bad.push(f.name);
    if (!/^(\+98|0098|0)?9\d{9}$/.test(data.phone)) bad.push(f.phone);
    if (data.brand.length < 2) bad.push(f.brand);
    if (!data.category) bad.push(f.category);
    [f.name, f.phone, f.brand, f.category].forEach(el => el.setAttribute('aria-invalid', bad.includes(el)));
    if (bad.length) {
      tell('لطفاً نام، شماره‌ی موبایل درست، نام برند و دسته‌ی محصول را وارد کنید.', true);
      bad[0].focus();
      return;
    }
    if (!data.consent) {
      tell('برای ثبت، لطفاً تیک موافقت را بزنید.', true);
      f.consent.focus();
      return;
    }
    await sendForm(f, data, tell, 'اطلاعات شما ثبت شد. بررسی می‌کنیم و با شما تماس می‌گیریم. 🌿');
  });
}
