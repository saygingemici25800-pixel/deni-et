'use client';

import {useEffect} from 'react';

/**
 * Ana sayfa mount olduğunda URL'de hash varsa (ör. /tr/#urunler ile alt sayfadan
 * dönüş) ilgili bölüme kaydırır. Yalnız ana sayfada render edilir. Görünür çıktı yok.
 * reduced-motion'a saygılı.
 */
export function HashScroll() {
  useEffect(() => {
    const raw = window.location.hash;
    if (!raw) return;
    const id = decodeURIComponent(raw.slice(1));
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Layout/font otursun diye küçük gecikme.
    const tid = window.setTimeout(() => {
      el.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block: 'start'});
    }, 60);
    return () => window.clearTimeout(tid);
  }, []);

  return null;
}
