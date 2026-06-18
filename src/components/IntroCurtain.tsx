'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';

const KEY = 'denizet-intro-seen';

/* Açılış perdesi — yalnız ilk ziyaret (sessionStorage). Espresso overlay + "DENİZ ET"
   wordmark zoom-in → kısa bekleme → perde yukarı kalkar. Tıkla/tuş/scroll ile atlanır.
   prefers-reduced-motion: hiç render edilmez (sessionStorage yine set edilir).
   SSR-safe: ilk render 'idle' (null) → mount sonrası karar (hydration mismatch yok). */
export function IntroCurtain() {
  const t = useTranslations();
  const [phase, setPhase] = useState<'idle' | 'enter' | 'leaving'>('idle');

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === '1';
    } catch {
      /* erişim yok → oynatma güvenli */
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* yok say */
    }
    if (seen || reduce) return; // perde HİÇ gösterilmez → anında hero

    setPhase('enter');
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timers: number[] = [];
    let finished = false;
    function detach() {
      events.forEach((e) => window.removeEventListener(e, skip as EventListener));
    }
    const finish = () => {
      if (finished) return;
      finished = true;
      timers.forEach((id) => clearTimeout(id));
      document.body.style.overflow = prevOverflow;
      detach();
      setPhase('idle'); // DOM'dan kalk
    };
    const lift = () => setPhase('leaving');
    const skip = () => {
      if (finished) return;
      timers.forEach((id) => clearTimeout(id));
      detach();
      setPhase('leaving'); // perdeyi hemen kaldır
      timers.push(window.setTimeout(finish, 450));
    };

    timers.push(window.setTimeout(lift, 1600)); // bekleme sonrası kalkış
    timers.push(window.setTimeout(finish, 2200)); // tamamen kalk → unmount

    const events: Array<keyof WindowEventMap> = ['pointerdown', 'keydown', 'wheel', 'touchmove'];
    events.forEach((e) => window.addEventListener(e, skip as EventListener, {passive: true}));

    return () => {
      timers.forEach((id) => clearTimeout(id));
      document.body.style.overflow = prevOverflow;
      detach();
    };
  }, []);

  if (phase === 'idle') return null;

  const siteName = t('meta.siteName');
  const mark = (siteName.split('·')[0] ?? '').trim(); // "Deniz Et"
  const [w1, w2 = ''] = mark.split(' ');
  const deniz = w1.toLocaleUpperCase('tr');
  const et = w2.toLocaleUpperCase('tr');

  return (
    <div className="intro-curtain" data-leaving={phase === 'leaving'} role="presentation" aria-hidden="true">
      <div className="intro-inner">
        <span
          className="intro-mark inline-flex items-baseline gap-[0.16em] leading-none text-bone"
          style={{fontSize: 'clamp(2.8rem, 1.6rem + 6vw, 6.5rem)', letterSpacing: '-0.02em'}}
        >
          <span className="font-thin">{deniz}</span>
          {et && <span className="font-bold text-brass">{et}</span>}
          <span aria-hidden="true" className="ml-[0.12em] h-[0.16em] w-[0.16em] self-center rounded-full bg-brass" />
        </span>
        <p className="intro-eyebrow type-eyebrow text-cream-soft">{t('hero.tagline')}</p>
      </div>
    </div>
  );
}
