'use client';

import {useTranslations} from 'next-intl';
import {useCart} from './CartProvider';

// Sade sepet glifi (lucide bağımlılığı yok — ikon sürüm riski olmasın).
function CartGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M3 4h2l2.4 12.2a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L21 8H6" />
      <circle cx="9.5" cy="20" r="1.2" />
      <circle cx="17.5" cy="20" r="1.2" />
    </svg>
  );
}

/* /tekne'de sabit (köşe) sepet butonu — adet badge'li, drawer'ı açar.
   Sol-altta; mobilde sticky-cta'nın üzerinde durur (çakışma yok). */
export function CartButton() {
  const t = useTranslations();
  const {count, hydrated, setOpen} = useCart();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={t('cart.open')}
      className="fixed left-5 bottom-[calc(64px_+_1rem_+_env(safe-area-inset-bottom))] z-[55] inline-flex items-center gap-2 rounded-full border border-[color:var(--color-brass)] bg-[color:var(--color-espresso)] px-4 py-3 text-bone shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition-transform hover:-translate-y-0.5 motion-reduce:transition-none md:bottom-6 md:left-6"
    >
      <CartGlyph />
      <span className="type-eyebrow">{t('cart.open')}</span>
      {hydrated && count > 0 && (
        <span
          aria-hidden="true"
          className="ml-0.5 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[color:var(--color-et)] px-1.5 text-xs font-medium leading-none text-bone"
        >
          {count}
        </span>
      )}
    </button>
  );
}
