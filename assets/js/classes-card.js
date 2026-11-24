// کارت «کلاس‌ها» در ردیف کارت‌ها: انیمیشن لاتی به‌جای عکس (بعد از آماده شدن صفحه‌ی Next اضافه می‌شود)
(function () {
  function mount() {
    if (!window.lottie || !window.SF_CLASSES_LOTTIE) return;
    document.querySelectorAll('span[class*="text-[length:15cqw]"]').forEach(function (t) {
      if (t.textContent.trim() !== 'کلاس‌ها') return;
      var card = t.closest('[class*="aspect-[5/6]"]');
      if (!card || card.querySelector('.sf-lottie')) return;
      var img = card.querySelector('img'); if (img) img.style.visibility = 'hidden';
      var box = document.createElement('div');
      box.className = 'sf-lottie'; box.setAttribute('aria-hidden', 'true');
      box.style.cssText = 'position:absolute;left:0;right:0;top:19%;bottom:0;pointer-events:none';
      card.appendChild(box);
      lottie.loadAnimation({ container: box, renderer: 'svg', loop: true, autoplay: true,
        animationData: JSON.parse(JSON.stringify(window.SF_CLASSES_LOTTIE)),
        rendererSettings: { preserveAspectRatio: 'xMidYMid meet' } });
    });
  }
  var timer;
  new MutationObserver(function () { clearTimeout(timer); timer = setTimeout(mount, 200); })
    .observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('load', mount);
})();
