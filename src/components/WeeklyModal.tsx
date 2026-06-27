'use client';

import {useEffect, useRef} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {waLink} from '@/lib/contact';
import {weeklyProduct} from '@/content/featured';
import {FallbackImage} from './FallbackImage';
import {WhatsAppIcon} from './ui';

// Görsel yoksa/yüklenmezse gösterilen premium placeholder (brass mermerlenme + köz + filigran).
// Konteyner (aspect/zemin) dışarıda; bu yalnız fallback içeriği.
function WeeklyArt() {
  return (
    <>
      <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="wm-glow" cx="34%" cy="40%" r="58%">
            <stop offset="0%" stopColor="#7A1C1C" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#7A1C1C" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="250" fill="url(#wm-glow)" />
        <g stroke="#FFD662" fill="none" strokeLinecap="round" opacity="0.26">
          <path d="M30 95 C100 70, 160 120, 232 88 C292 62, 350 110, 388 84" strokeWidth="1.3" />
          <path d="M24 150 C92 122, 152 172, 222 138 C284 112, 352 166, 392 132" strokeWidth="1.1" />
          <path d="M40 195 C112 170, 172 210, 244 180" strokeWidth="0.9" opacity="0.7" />
        </g>
      </svg>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 right-4 font-bold leading-none text-bone"
        style={{opacity: 0.12, fontSize: '1.8rem', letterSpacing: '-0.02em'}}
      >
        Dry Age
      </span>
    </>
  );
}

/* Haftanın ürünü kartı — ortada modal/dialog. Foto + ad + anlatı + CTA.
   ✕ / backdrop / Esc ile kapanır; açılınca focus ✕'e, kapanınca tetikleyene döner;
   gövde scroll kilidi; scale+fade giriş (reduced-motion'da anlık). */
export function WeeklyModal({open, onClose}: {open: boolean; onClose: () => void}) {
  const t = useTranslations();
  const locale = useLocale() as 'tr' | 'en';
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, [open, onClose]);

  const name = weeklyProduct.name[locale];
  const text = weeklyProduct.text[locale];
  const prefillItem = t.raw('boat.prefillItem') as string;
  const wa = waLink(prefillItem.replace('{product}', name));

  return (
    <div
      className={`fixed inset-0 z-[120] grid place-items-center p-4 transition-opacity duration-200 motion-reduce:transition-none ${
        open ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0 bg-black/60" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('nav.weekly')}
        className={`relative w-full max-w-md overflow-hidden rounded-[6px] border border-[rgba(255, 214, 98,0.35)] bg-[color:var(--color-espresso)] text-bone shadow-[0_24px_70px_rgba(0,0,0,0.5)] transition-[transform,opacity] duration-200 motion-reduce:transition-none ${
          open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t('cart.close')}
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(19,15,12,0.55)] text-bone transition-colors hover:text-brass"
        >
          <span aria-hidden="true" className="text-xl leading-none">
            ×
          </span>
        </button>

        {/* Ürün fotoğrafı — image alanından oku; dosya yoksa premium placeholder (kırılma yok) */}
        <div
          className="relative aspect-[16/10] w-full overflow-hidden border-b border-[rgba(255, 214, 98,0.25)]"
          style={{background: 'linear-gradient(135deg, #2A1411 0%, #130F0C 60%, #1A1411 100%)'}}
        >
          <FallbackImage
            src={weeklyProduct.image}
            alt={name}
            sizes="(max-width: 768px) 100vw, 28rem"
            fallback={<WeeklyArt />}
          />
        </div>

        {/* Anlatı */}
        <div className="p-6 md:p-8">
          <p className="type-eyebrow text-brass">{t('nav.weekly')}</p>
          <h2 className="mt-2 font-medium text-bone" style={{fontSize: 'clamp(1.5rem, 1.2rem + 1.4vw, 2.1rem)', lineHeight: 1.12}}>
            {name}
          </h2>
          <p className="type-body type-body-light mt-4 text-cream-soft">{text}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <WhatsAppIcon size={18} />
              {t('contact.ctaWhatsapp')}
            </a>
            <Link href={weeklyProduct.href} onClick={onClose} className="type-eyebrow text-brass transition-colors hover:text-bone">
              {t('nav.boat')} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
