// صدای کلیک روی دکمه‌ها و گزینه‌های سایت
// برای خاموش کردن: SafiranClick.toggle() — انتخاب کاربر در مرورگرش می‌ماند
(() => {
  const SOUND = 'audio/ui/click-1.mp3';
  const VOLUME = 0.35;
  const KEY = 'safiran-click-sound';
  const TARGETS = 'button, a[href], [role=button], input[type=submit], input[type=checkbox], input[type=radio], select, summary, .quiz__opt';

  let ctx, buffer, loading;
  const muted = () => { try { return localStorage.getItem(KEY) === 'off'; } catch { return false; } };

  // صدا یک بار بار می‌شود و بعد بی‌تأخیر پخش می‌شود
  const load = () => loading ||= (async () => {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    const r = await fetch(SOUND);
    buffer = await ctx.decodeAudioData(await r.arrayBuffer());
  })().catch(() => { loading = null; });

  const play = async () => {
    await load();
    if (!buffer) return;
    if (ctx.state === 'suspended') await ctx.resume();
    const src = ctx.createBufferSource();
    const gain = ctx.createGain();
    gain.gain.value = VOLUME;
    src.buffer = buffer;
    src.connect(gain).connect(ctx.destination);
    src.start();
  };

  document.addEventListener('pointerdown', e => {
    if (e.button !== 0 || muted()) return;
    const el = e.target.closest(TARGETS);
    if (!el || el.disabled || el.closest('[data-no-click]')) return;
    play();
  }, { passive: true });

  window.SafiranClick = {
    toggle() {
      const off = !muted();
      try { localStorage.setItem(KEY, off ? 'off' : 'on'); } catch {}
      return !off;
    },
  };
})();
