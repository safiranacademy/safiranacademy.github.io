// نبرد نور و سایه: فرشته (بازیکن) در برابر شیطان آتشین (کامپیوتر)
(() => {
  const stage = document.getElementById('battle');
  if (!stage) return;

  const $ = id => document.getElementById(id);
  const canvas = stage.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // همه‌ی اندازه‌ها در یک صحنه‌ی ثابت ۱۶۰۰ در ۹۰۰ حساب می‌شوند؛ شخصیت‌ها کوچک و دور از هم‌اند، انگار دوربین از دور نگاه می‌کند
  const W = 1600, H = 900, GRAVITY = 900;
  const SPRITE_H = 240, SPRITE_W = SPRITE_H * 540 / 620, FOOT = 714, FLOOR = 850;
  const MAX_DRAG = 380, MIN_DRAG = 30, MAX_PARTICLES = 36;

  // آسیب به جای خوردن تیر بستگی دارد: سر بیشتر، بدن کمتر، پا از همه کمتر
  const TOP = FOOT - SPRITE_H, HALF_W = SPRITE_W * .36;
  const ZONES = [
    { name: 'head', until: TOP + SPRITE_H * .3, damage: 34, label: 'ضربه به سر!' },
    { name: 'body', until: TOP + SPRITE_H * .7, damage: 20, label: 'ضربه به بدن' },
    { name: 'legs', until: FOOT, damage: 9, label: 'ضربه به پا' },
  ];
  const zoneAt = (f, x, y) => Math.abs(x - f.x) < HALF_W && y > TOP + 12 ? ZONES.find(z => y <= z.until) || null : null;

  // ۵۰۰ الگوی ثابت برای تیر شیطان که در یک حلقه پشت سر هم می‌آیند؛ هر بازدیدکننده از جای تصادفی حلقه شروع می‌کند
  const PATTERNS = (() => {
    let s = 1405;
    const next = () => {
      s = (s + 0x6D2B79F5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    return Array.from({ length: 500 }, () => {
      const z = next();
      return { roll: next(), zone: z < .2 ? 'head' : z < .7 ? 'body' : 'legs', jitter: next() * 2 - 1, side: next() < .5 ? -1 : 1, spread: next() };
    });
  })();
  // هر طرف سه تیر ویژه دارد که هر کدام فقط یک بار در هر بازی به کار می‌رود
  const POWERS = { ice: 'تیر یخی', cluster: 'تیر خوشه‌ای', power: 'تیر قدرتی' };
  const POWER_HIT = 1.7, SPLIT = 5, SPLIT_SPREAD = .3, PIECE_HIT = .35;
  const AIM_Y = { head: TOP + SPRITE_H * .17, body: TOP + SPRITE_H * .5, legs: TOP + SPRITE_H * .86 };
  const ANGLE = { head: [.9, 1.05], body: [.72, .86], legs: [.5, .62] };
  let cycle = Math.floor(Math.random() * PATTERNS.length);
  try {
    const saved = Number(localStorage.getItem('battle-cycle'));
    if (localStorage.getItem('battle-cycle') !== null && Number.isInteger(saved) && saved >= 0 && saved < PATTERNS.length) cycle = saved;
  } catch {}

  const fighters = {
    angel: { x: 1450, muzzleX: 1363, muzzleY: 598, life: 100, shake: 0, used: {}, frozen: false, turns: 0, bar: $('battle-angel'), img: new Image() },
    devil: { x: 150, muzzleX: 226, muzzleY: 600, life: 100, shake: 0, used: {}, frozen: false, turns: 0, bar: $('battle-devil'), img: new Image() }
  };
  fighters.angel.img.src = 'img/game/angel.webp';
  fighters.devil.img.src = 'img/game/devil.webp';
  const BODY_Y = TOP + SPRITE_H * .55;

  // درخشش‌ها یک بار کشیده می‌شوند تا هنگام بازی گوشی کند نشود
  const orb = (size, inner, outer) => {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const g = c.getContext('2d');
    const r = size / 2, fill = g.createRadialGradient(r, r, 0, r, r, r);
    fill.addColorStop(0, inner);
    fill.addColorStop(.45, outer);
    fill.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = fill;
    g.fillRect(0, 0, size, size);
    return c;
  };
  const lightOrb = orb(96, '#ffffff', 'rgba(255,233,160,.8)');
  const fireOrb = orb(96, '#fff3b0', 'rgba(255,110,20,.9)');
  const iceOrb = orb(96, '#ffffff', 'rgba(120,205,255,.9)');
  const ORBS = { angel: lightOrb, devil: fireOrb, ice: iceOrb };

  // نسخه‌ی آبی هر شخصیت برای وقتی که یخ زده است
  function frost(img) {
    const c = document.createElement('canvas');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const g = c.getContext('2d');
    g.drawImage(img, 0, 0);
    g.globalCompositeOperation = 'source-atop';
    g.fillStyle = 'rgba(140,215,255,.55)';
    g.fillRect(0, 0, c.width, c.height);
    return c;
  }

  let phase = 'idle', shot = null, wait = 0, nextTurn = null, aim = null, armed = null, last = 0, clock = 0, running = false, lastAyah = -1;
  const particles = [];

  const rand = (a, b) => a + Math.random() * (b - a);
  const status = text => { $('battle-status').textContent = text; };

  function resize() {
    const k = Math.min(devicePixelRatio || 1, 2);
    const width = Math.min(1600, Math.round(stage.clientWidth * k));
    if (!width) return;
    canvas.width = width;
    canvas.height = Math.round(width * H / W);
    ctx.setTransform(canvas.width / W, 0, 0, canvas.height / H, 0, 0);
    draw();
  }

  function toScene(e) {
    const box = canvas.getBoundingClientRect();
    return { x: (e.clientX - box.left) * W / box.width, y: (e.clientY - box.top) * H / box.height };
  }

  // جهت کشیدن مهم نیست: کشیدن بیشتر یعنی تیر قوی‌تر و کشیدن عمودی‌تر یعنی قوس بلندتر
  function launchFrom(a) {
    const dx = Math.abs(a.x - a.startX), dy = Math.abs(a.y - a.startY), dist = Math.hypot(dx, dy);
    if (dist < MIN_DRAG) return null;
    const power = Math.min(dist / MAX_DRAG, 1);
    const angle = Math.min(Math.max(Math.atan2(dy, dx), .14), 1.4);
    const speed = 420 + power * 1000;
    return { vx: -Math.cos(angle) * speed, vy: -Math.sin(angle) * speed };
  }

  canvas.addEventListener('pointerdown', e => {
    if (phase !== 'aim') return;
    const p = toScene(e);
    aim = { startX: p.x, startY: p.y, x: p.x, y: p.y };
  });
  addEventListener('pointermove', e => {
    if (!aim) return;
    const p = toScene(e);
    aim.x = p.x;
    aim.y = p.y;
  });
  addEventListener('pointerup', () => {
    if (!aim) return;
    const v = launchFrom(aim);
    aim = null;
    if (!v) return;
    const power = armed;
    armed = null;
    fire('angel', v, power);
  });
  addEventListener('pointercancel', () => { aim = null; });

  function fire(from, v, power = null) {
    const f = fighters[from];
    f.turns++;
    if (power) f.used[power] = true;
    shot = { from, power, split: false, hits: 0, total: 0, zone: null, balls: [{ x: f.muzzleX, y: f.muzzleY, vx: v.vx, vy: v.vy, trail: [] }] };
    phase = 'fly';
    status(power ? (from === 'angel' ? POWERS[power] : `شیطان: ${POWERS[power]}`) : '');
    showPowers();
  }

  // دکمه‌های قدرت فرشته و نشانه‌های قدرت شیطان؛ قدرت مصرف‌شده خاکستری می‌شود
  const powerButtons = [...document.querySelectorAll('[data-power]')];
  const devilChips = [...document.querySelectorAll('[data-devil-power]')];
  function showPowers() {
    for (const b of powerButtons) {
      const used = !!fighters.angel.used[b.dataset.power];
      b.disabled = used || !running;
      b.classList.toggle('is-used', used);
      b.setAttribute('aria-pressed', armed === b.dataset.power);
    }
    for (const c of devilChips) c.classList.toggle('is-used', !!fighters.devil.used[c.dataset.devilPower]);
  }
  for (const b of powerButtons) b.addEventListener('click', () => {
    if (!running || fighters.angel.used[b.dataset.power]) return;
    armed = armed === b.dataset.power ? null : b.dataset.power;
    showPowers();
    if (phase === 'aim') status(armed ? `${POWERS[armed]} آماده است: بکش و رها کن` : 'نوبت تو: بکش و رها کن');
  });

  // شیطان از ضربه‌ی دوم به بعد گاهی شانسی، و بیشتر وقتی عقب است، از قدرت‌هایش استفاده می‌کند
  function devilPower() {
    const f = fighters.devil, a = fighters.angel;
    const left = Object.keys(POWERS).filter(n => !f.used[n]);
    if (!left.length || f.turns < 1) return null;
    if (Math.random() >= .18 + Math.max(0, a.life - f.life) / 160 + (f.life <= 40 ? .3 : 0)) return null;
    if (a.life <= 34 && left.includes('power')) return 'power';
    return left[Math.floor(Math.random() * left.length)];
  }

  function devilShoot() {
    const p = PATTERNS[cycle];
    cycle = (cycle + 1) % PATTERNS.length;
    try { localStorage.setItem('battle-cycle', cycle); } catch {}
    // هرچه فرشته جلوتر باشد شیطان دقیق‌تر می‌زند، تا بازی یک‌طرفه نشود و گاهی برد و گاهی باخت پیش بیاید
    const f = fighters.devil, a = fighters.angel;
    const hit = p.roll < Math.min(.85, Math.max(.4, .55 + (a.life - f.life) / 180));
    // تیر درست از لبه‌ی بدن و در ارتفاع همان ناحیه می‌خورد؛ تیر خطا یا کوتاه می‌افتد یا از بالای سر رد می‌شود
    const aimY = hit ? AIM_Y[p.zone] + p.jitter * 16 : p.side < 0 ? BODY_Y : TOP - 140;
    const tx = hit ? a.x - HALF_W + 4 : a.x + p.side * (260 + p.spread * 160);
    const [lo, hi] = hit ? ANGLE[p.zone] : [.87, 1.08];
    const angle = lo + p.spread * (hi - lo);
    const dx = tx - f.muzzleX, up = f.muzzleY - aimY;
    const speed = Math.sqrt(GRAVITY * dx * dx / (2 * Math.cos(angle) ** 2 * (dx * Math.tan(angle) - up)));
    fire('devil', { vx: Math.cos(angle) * speed, vy: -Math.sin(angle) * speed }, devilPower());
  }

  function burst(x, y, kind) {
    for (let i = 0; i < 14 && particles.length < MAX_PARTICLES; i++) {
      const a = rand(0, Math.PI * 2), s = rand(90, 340);
      particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, kind });
    }
  }

  function damage(name, amount) {
    const f = fighters[name];
    f.life = Math.max(0, f.life - amount);
    f.shake = .3;
    f.bar.style.transform = `scaleX(${f.life / 100})`;
  }

  function endShot(nextPhase) {
    shot = null;
    wait = .7;
    nextTurn = nextPhase;
    phase = 'wait';
  }

  // تیر خوشه‌ای در بالاترین نقطه‌ی قوس به پنج تکه‌ی کوچک‌تر تقسیم می‌شود
  function splitShot() {
    const b = shot.balls[0];
    shot.split = true;
    shot.balls = Array.from({ length: SPLIT }, (_, i) => {
      const k = i - (SPLIT - 1) / 2;
      return { x: b.x, y: b.y, vx: b.vx * (1 + k * SPLIT_SPREAD), vy: Math.abs(k) * 25, trail: [] };
    });
    burst(b.x, b.y, shot.from);
  }

  function updateShot(dt) {
    const name = shot.from === 'angel' ? 'devil' : 'angel';
    const target = fighters[name], kind = shot.power === 'ice' ? 'ice' : shot.from;
    if (shot.power === 'cluster' && !shot.split && shot.balls[0].vy >= 0) splitShot();
    for (let i = shot.balls.length - 1; i >= 0; i--) {
      const b = shot.balls[i];
      b.vy += GRAVITY * dt;
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.trail.push(b.x, b.y);
      if (b.trail.length > 12) b.trail.splice(0, 2);
      const zone = zoneAt(target, b.x, b.y);
      if (zone) {
        const amount = Math.round(zone.damage * (shot.power === 'power' ? POWER_HIT : shot.split ? PIECE_HIT : 1));
        burst(b.x, b.y, kind);
        damage(name, amount);
        shot.hits++;
        shot.total += amount;
        shot.zone = shot.zone || zone;
        shot.balls.splice(i, 1);
      } else if (b.y > FLOOR || b.x < -200 || b.x > W + 200) {
        if (b.x > 0 && b.x < W) burst(b.x, Math.min(b.y, FLOOR), kind);
        shot.balls.splice(i, 1);
      }
    }
    if (shot.balls.length) return;
    if (shot.hits) {
      let text = shot.split ? `${shot.hits} تکه خورد −${shot.total}` : `${shot.zone.label} −${shot.total}`;
      if (shot.power === 'ice' && target.life > 0) {
        target.frozen = true;
        for (let k = 0; k < 3; k++) burst(target.x + rand(-60, 60), rand(TOP + 40, FOOT - 40), 'ice');
        text += name === 'devil' ? '؛ شیطان یخ زد!' : '؛ یخ زدی!';
      }
      status(text);
    } else if (shot.power) status(`${POWERS[shot.power]} خطا رفت`);
    endShot(target.life <= 0 ? 'over' : name);
  }

  function update(dt) {
    clock += dt;
    if (phase === 'fly') updateShot(dt);
    if (phase === 'wait' && (wait -= dt) <= 0) {
      if (nextTurn === 'over') return finish();
      const f = fighters[nextTurn];
      // کسی که یخ زده یک نوبت را از دست می‌دهد
      if (f.frozen) {
        f.frozen = false;
        status(nextTurn === 'devil' ? 'شیطان یخ زده؛ دوباره نوبت توست' : 'یخ زدی؛ این نوبت از دست رفت');
        nextTurn = nextTurn === 'devil' ? 'angel' : 'devil';
        wait = 1.2;
      } else if (nextTurn === 'devil') { status('نوبت شیطان'); devilShoot(); }
      else { phase = 'aim'; status(armed ? `${POWERS[armed]} آماده است: بکش و رها کن` : 'نوبت تو: بکش و رها کن'); }
    }
    for (const f of Object.values(fighters)) f.shake = Math.max(0, f.shake - dt);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life -= dt * 1.9;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
    }
  }

  function drawFighter(f, phaseShift, name) {
    const bob = calm ? 0 : Math.sin(clock * 2 + phaseShift) * 6;
    const jolt = f.shake ? Math.sin(clock * 70) * 12 : 0;
    ctx.drawImage(f.frozen && f.ice ? f.ice : f.img, f.x - SPRITE_W / 2 + jolt, FOOT - SPRITE_H + bob, SPRITE_W, SPRITE_H);
    if (!name) return;
    // اسم بالای سر شخصیت
    ctx.font = '800 32px Vazirmatn, Tahoma, sans-serif';
    ctx.textAlign = 'center';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'rgba(0,0,0,.75)';
    ctx.strokeText(name, f.x + jolt, TOP - 18 + bob);
    ctx.fillStyle = '#fff6c9';
    ctx.fillText(name, f.x + jolt, TOP - 18 + bob);
  }

  function drawOrb(img, x, y, size, alpha) {
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
    ctx.globalAlpha = 1;
  }

  function drawAim() {
    const v = aim && launchFrom(aim);
    if (!v) return;
    const f = fighters.angel;
    ctx.fillStyle = '#fff';
    for (let i = 1; i <= 16; i++) {
      const t = i * .07, x = f.muzzleX + v.vx * t, y = f.muzzleY + v.vy * t + GRAVITY * t * t / 2;
      ctx.beginPath();
      ctx.arc(x, y, 8 - i * .3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawShot() {
    if (!shot) return;
    const img = shot.power === 'ice' ? iceOrb : ORBS[shot.from];
    const k = shot.power === 'power' ? 1.7 : shot.split ? .55 : 1;
    for (const b of shot.balls) {
      for (let i = 0; i < b.trail.length; i += 2) drawOrb(img, b.trail[i], b.trail[i + 1], (26 + i * 3) * k, .12 + i * .03);
      if (shot.power === 'power') drawOrb(ORBS[shot.from], b.x, b.y, 180, .55 + Math.sin(clock * 30) * .15);
      drawOrb(img, b.x, b.y, (shot.from === 'angel' ? 54 : 70) * k, 1);
      if (shot.from === 'angel') {
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(Math.atan2(b.vy, b.vx));
        ctx.scale(k * .75, k * .75);
        ctx.fillStyle = shot.power === 'ice' ? '#e4f6ff' : '#fff6c9';
        ctx.beginPath();
        ctx.moveTo(44, 0);
        ctx.lineTo(-52, -6);
        ctx.lineTo(-52, 6);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    drawFighter(fighters.devil, 0);
    drawFighter(fighters.angel, 1.4, 'امیرعباس');
    drawAim();
    drawShot();
    for (const p of particles) drawOrb(ORBS[p.kind], p.x, p.y, 32 * p.life, p.life);
  }

  function frame(now) {
    if (!running) return;
    const dt = Math.min((now - last) / 1000 || 0, .05);
    last = now;
    update(dt);
    if (!running) return;
    draw();
    requestAnimationFrame(frame);
  }

  function pickAyah() {
    const list = window.BATTLE_AYAT;
    let i = Math.floor(Math.random() * list.length);
    if (i === lastAyah) i = (i + 1) % list.length;
    lastAyah = i;
    return list[i];
  }

  function finish() {
    const won = fighters.devil.life <= 0;
    const ayah = pickAyah(), message = $('battle-message');
    running = false;
    phase = 'over';
    armed = null;
    showPowers();
    document.body.classList.remove('is-battling');
    status('');
    draw();
    message.textContent = won
      ? 'تو برنده شدی و این آیه به صورت شانسی برای تو فرستاده شد. این پیام خداوند بزرگ به توست.'
      : 'و خدایی که همیشه با ماست ';
    if (!won) {
      const heart = document.createElement('span');
      heart.className = 'battle__heart';
      heart.textContent = '♥';
      message.append(heart);
    }
    $('battle-ayah').textContent = ayah.a;
    $('battle-translation').textContent = ayah.t;
    $('battle-ref').textContent = ayah.r;
    $('battle-end').classList.toggle('is-lose', !won);
    $('battle-end').hidden = false;
    $('battle-end').scrollTop = 0;
  }

  function start() {
    for (const f of Object.values(fighters)) {
      f.life = 100;
      f.shake = f.turns = 0;
      f.used = {};
      f.frozen = false;
      f.bar.style.transform = 'scaleX(1)';
    }
    shot = aim = armed = null;
    particles.length = 0;
    $('battle-start').hidden = true;
    $('battle-end').hidden = true;
    phase = 'aim';
    status('نوبت تو: بکش و رها کن');
    document.body.classList.add('is-battling');
    enterFull();
    if (!document.body.classList.contains('is-battle-full')) stage.scrollIntoView({ block: 'start', behavior: calm ? 'auto' : 'smooth' });
    running = true;
    showPowers();
    last = performance.now();
    requestAnimationFrame(frame);
  }

  new ResizeObserver(resize).observe(stage);
  // روی گوشی، بازی کل صفحه را می‌گیرد و اگر مرورگر اجازه بدهد افقی و تمام‌صفحه می‌شود
  const phone = matchMedia('(pointer: coarse), (max-width: 900px)');
  function enterFull() {
    if (!phone.matches || document.body.classList.contains('is-battle-full')) return;
    document.body.classList.add('is-battle-full');
    const root = document.documentElement;
    (root.requestFullscreen ? root.requestFullscreen({ navigationUI: 'hide' }) : Promise.reject())
      .then(() => screen.orientation?.lock?.('landscape'))
      .catch(() => {});
  }
  function exitFull() {
    document.body.classList.remove('is-battle-full');
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    try { screen.orientation?.unlock?.(); } catch {}
  }
  $('battle-exit').addEventListener('click', exitFull);

  $('battle-again').addEventListener('click', start);
  $('battle-play').addEventListener('click', start);

  Promise.all(Object.values(fighters).map(f => f.img.decode())).then(() => {
    for (const f of Object.values(fighters)) f.ice = frost(f.img);
    $('battle-play').disabled = false;
    $('battle-play').textContent = 'شروع نبرد';
    draw();
  }).catch(() => { $('battle-play').textContent = 'بارگذاری نشد؛ صفحه را تازه کنید'; });
})();
