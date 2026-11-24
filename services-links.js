// شش کارت «خدمات سفیران»: کلیک روی هر کارت، صفحه‌ی همان خدمت (فرم ثبت‌نام، کتاب‌ها، پادکست) را باز می‌کند
(() => {
  const PAGES = { 1: 'classes.html', 2: 'signup-family.html', 3: 'signup-child.html',
                  4: 'signup-counseling.html', 5: 'books.html', 6: 'podcast.html' };
  const pageOf = card => {
    const tag = card.querySelector(':scope > div span')?.textContent || '';
    const m = tag.match(/(خدمت|بخش) ۰([۱-۶])/);
    return m && PAGES['۱۲۳۴۵۶'.indexOf(m[2]) + 1];
  };
  // کلیک (و Enter روی کارت) در مرحله‌ی capture گرفته می‌شود تا باز شدن جزئیات کارت جایش را نگیرد
  const go = e => {
    const card = e.target.closest?.('article');
    const url = card && pageOf(card);
    if (!url || (e.type === 'keydown' && e.key !== 'Enter')) return;
    e.preventDefault(); e.stopPropagation();
    if (e.ctrlKey || e.metaKey) window.open(url, '_blank'); else location.href = url;
  };
  document.addEventListener('click', go, true);
  document.addEventListener('keydown', go, true);
  const style = document.createElement('style');
  style.textContent = 'article:has(.ca-svc){cursor:pointer}';
  document.head.appendChild(style);

  // کارت «شبکه‌ها» پایین صفحه: به‌جای فرم ایمیل و دکمه‌ی «ثبت‌نام»، دو لینک اینستاگرام و یوتیوب (سایت ثبت‌نام ندارد)
  const social = () => document.querySelectorAll('form').forEach(f => {
    if (f.dataset.sfSocial || !f.querySelector('input[type=email], input[placeholder="جیمیل شما"]')) return;
    if (f.closest('.inner, [data-kind]')) return;
    f.dataset.sfSocial = '1';
    f.style.display = 'none';
    f.insertAdjacentHTML('afterend', `<div class="sf-social" style="display:flex;flex-wrap:wrap;gap:10px;margin-top:24px">
      <a href="https://www.instagram.com/dr.javadforooghi" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;min-height:44px;padding:0 20px;border-radius:999px;background:#ff5c00;color:#1e1e1e;font-weight:700">اینستاگرام</a>
      <a href="https://www.youtube.com/@JavadForooghi" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;min-height:44px;padding:0 20px;border-radius:999px;background:#1e1e1e;color:#f2efe9;font-weight:700">یوتیوب</a></div>`);
  });
  let q;
  new MutationObserver(() => { clearTimeout(q); q = setTimeout(social, 200); })
    .observe(document.documentElement, { childList: true, subtree: true });
  addEventListener('load', social);
})();
