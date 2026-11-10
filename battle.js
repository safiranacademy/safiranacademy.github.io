// نبرد نور و سایه: فرشته (بازیکن) در برابر شیطان آتشین (کامپیوتر)
(() => {
  const stage = document.getElementById('battle');
  if (!stage) return;

  const $ = id => document.getElementById(id);
  const canvas = stage.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // همه‌ی اندازه‌ها در یک صحنه‌ی ثابت ۱۶۰۰ در ۹۰۰ حساب می‌شوند
  const W = 1600, H = 900, GRAVITY = 900;
  const SPRITE_H = 330, SPRITE_W = SPRITE_H * 540 / 620, FOOT = 714, FLOOR = 850;
  const HIT_RADIUS = 125, DEVIL_HIT_CHANCE = 0.25;
  const DAMAGE_TO_DEVIL = 25, DAMAGE_TO_ANGEL = 15;
  const MAX_DRAG = 380, MIN_DRAG = 30, MAX_PARTICLES = 36;

  const fighters = {
    angel: { x: 1330, muzzleX: 1211, muzzleY: 555, life: 100, shake: 0, bar: $('battle-angel'), img: new Image() },
    devil: { x: 275, muzzleX: 379, muzzleY: 557, life: 100, shake: 0, bar: $('battle-devil'), img: new Image() }
  };
  fighters.angel.img.src = 'img/game/angel.webp';
  fighters.devil.img.src = 'img/game/devil.webp';
  const BODY_Y = 565;

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

  let phase = 'idle', shot = null, wait = 0, nextTurn = null, aim = null, last = 0, clock = 0, running = false, lastAyah = -1;
  const particles = [], trail = [];

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
    if (v) fire('angel', v);
  });
  addEventListener('pointercancel', () => { aim = null; });

  function fire(from, v) {
    const f = fighters[from];
    shot = { from, x: f.muzzleX, y: f.muzzleY, vx: v.vx, vy: v.vy };
    trail.length = 0;
    phase = 'fly';
    status('');
  }

  function devilShoot() {
    const f = fighters.devil, hit = Math.random() < DEVIL_HIT_CHANCE;
    const offset = hit ? rand(-45, 45) : (Math.random() < .5 ? -1 : 1) * rand(260, 420);
    const dx = fighters.angel.x + offset - f.muzzleX, up = f.muzzleY - BODY_Y, angle = rand(.87, 1.08);
    const speed = Math.sqrt(GRAVITY * dx * dx / (2 * Math.cos(angle) ** 2 * (dx * Math.tan(angle) - up)));
    fire('devil', { vx: Math.cos(angle) * speed, vy: -Math.sin(angle) * speed });
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
    trail.length = 0;
    wait = .7;
    nextTurn = nextPhase;
    phase = 'wait';
  }

  function updateShot(dt) {
    shot.vy += GRAVITY * dt;
    shot.x += shot.vx * dt;
    shot.y += shot.vy * dt;
    trail.push(shot.x, shot.y);
    if (trail.length > 12) trail.splice(0, 2);

    const name = shot.from === 'angel' ? 'devil' : 'angel';
    const target = fighters[name];
    const after = fighters[name].life <= (shot.from === 'angel' ? DAMAGE_TO_DEVIL : DAMAGE_TO_ANGEL) ? 'over' : name;
    if (Math.hypot(shot.x - target.x, shot.y - BODY_Y) < HIT_RADIUS) {
      burst(shot.x, shot.y, shot.from);
      damage(name, shot.from === 'angel' ? DAMAGE_TO_DEVIL : DAMAGE_TO_ANGEL);
      endShot(after);
    } else if (shot.y > FLOOR || shot.x < -200 || shot.x > W + 200) {
      if (shot.x > 0 && shot.x < W) burst(shot.x, Math.min(shot.y, FLOOR), shot.from);
      endShot(name);
    }
  }

  function update(dt) {
    clock += dt;
    if (phase === 'fly') updateShot(dt);
    if (phase === 'wait' && (wait -= dt) <= 0) {
      if (nextTurn === 'over') return finish();
      if (nextTurn === 'devil') { status('نوبت شیطان'); devilShoot(); }
      else { phase = 'aim'; status('نوبت تو: بکش و رها کن'); }
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

  function drawFighter(f, phaseShift) {
    const bob = calm ? 0 : Math.sin(clock * 2 + phaseShift) * 6;
    const jolt = f.shake ? Math.sin(clock * 70) * 12 : 0;
    ctx.drawImage(f.img, f.x - SPRITE_W / 2 + jolt, FOOT - SPRITE_H + bob, SPRITE_W, SPRITE_H);
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
    const img = shot.from === 'angel' ? lightOrb : fireOrb;
    for (let i = 0; i < trail.length; i += 2) drawOrb(img, trail[i], trail[i + 1], 26 + i * 3, .12 + i * .03);
    drawOrb(img, shot.x, shot.y, shot.from === 'angel' ? 70 : 92, 1);
    if (shot.from === 'angel') {
      ctx.save();
      ctx.translate(shot.x, shot.y);
      ctx.rotate(Math.atan2(shot.vy, shot.vx));
      ctx.fillStyle = '#fff6c9';
      ctx.beginPath();
      ctx.moveTo(44, 0);
      ctx.lineTo(-52, -6);
      ctx.lineTo(-52, 6);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    drawFighter(fighters.devil, 0);
    drawFighter(fighters.angel, 1.4);
    drawAim();
    drawShot();
    for (const p of particles) drawOrb(p.kind === 'angel' ? lightOrb : fireOrb, p.x, p.y, 42 * p.life, p.life);
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
      f.shake = 0;
      f.bar.style.transform = 'scaleX(1)';
    }
    shot = aim = null;
    particles.length = trail.length = 0;
    $('battle-start').hidden = true;
    $('battle-end').hidden = true;
    phase = 'aim';
    status('نوبت تو: بکش و رها کن');
    document.body.classList.add('is-battling');
    enterFull();
    if (!document.body.classList.contains('is-battle-full')) stage.scrollIntoView({ block: 'start', behavior: calm ? 'auto' : 'smooth' });
    running = true;
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
    $('battle-play').disabled = false;
    $('battle-play').textContent = 'شروع نبرد';
    draw();
  }).catch(() => { $('battle-play').textContent = 'بارگذاری نشد؛ صفحه را تازه کنید'; });
})();
