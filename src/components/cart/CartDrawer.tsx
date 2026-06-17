'use client';

import {useEffect, useMemo, useState} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {waLink} from '@/lib/contact';
import {BOAT_PRODUCTS, type Locale} from '@/content/boat-products';
import {useCart} from './CartProvider';

/* Sağdan açılan sepet + sipariş paneli. <form> YOK — controlled inputs + onClick.
   Geçerli (ad+telefon) ise tüm bilgiyi tek WhatsApp mesajına derleyip wa.me'yi yeni
   sekmede açar. Mobilde tam genişlik, dokunma dostu. Esc + gövde kilidi + focus/aria. */
export function CartDrawer() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const {items, count, open, setOpen, incr, decr, remove, clear} = useCart();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [boat, setBoat] = useState('');
  const [place, setPlace] = useState('');
  const [note, setNote] = useState('');
  const [touched, setTouched] = useState(false);
  const [sent, setSent] = useState(false);

  const byId = useMemo(() => new Map(BOAT_PRODUCTS.map((p) => [p.id, p])), []);
  const valid = name.trim().length > 0 && phone.trim().length > 0;

  // Açıkken Esc ile kapat + gövde kaydırmayı kilitle.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, setOpen]);

  const buildMessage = () => {
    const L: string[] = [t('cart.waIntro'), '', `${t('form.name')}: ${name.trim()}`, `${t('form.phone')}: ${phone.trim()}`];
    if (boat.trim()) L.push(`${t('form.boat')}: ${boat.trim()}`);
    if (place.trim()) L.push(`${t('form.location')}: ${place.trim()}`);
    L.push('---', t('cart.waOrder'));
    items.forEach((it) => {
      const p = byId.get(it.productId);
      if (p) L.push(`• ${p.name[locale]} × ${it.qty} ${p.unit[locale]}`);
    });
    if (note.trim()) L.push('', `${t('form.note')}: ${note.trim()}`);
    return L.join('\n');
  };

  const submit = () => {
    setTouched(true);
    if (!valid || items.length === 0) return;
    // waLink encodeURIComponent yapar → satır başları %0A. Yeni sekmede aç.
    window.open(waLink(buildMessage()), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  const field =
    'w-full rounded-[4px] border border-[color:var(--line)] bg-[color:var(--color-espresso-2)] px-3 py-3 text-bone placeholder:text-cream-soft/40 focus:border-[color:var(--color-brass)] focus:outline-none';
  const labelCls = 'type-eyebrow text-cream-soft';

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[90] bg-black/55 transition-opacity duration-300 motion-reduce:transition-none ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t('cart.title')}
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-[100] flex h-full w-full max-w-md flex-col bg-[color:var(--color-espresso)] text-bone shadow-2xl transition-transform duration-300 motion-reduce:transition-none ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Başlık */}
        <div className="flex shrink-0 items-center justify-between border-b border-[color:var(--line)] px-5 py-5">
          <div>
            <h2 className="type-heading-sm text-bone">{t('cart.title')}</h2>
            {count > 0 && <p className="type-eyebrow mt-1 text-cream-soft">{t('cart.count', {n: count})}</p>}
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t('cart.close')}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-bone transition-colors hover:text-brass"
          >
            <span aria-hidden="true" className="text-2xl leading-none">
              ×
            </span>
          </button>
        </div>

        {/* İçerik — kaydırılabilir */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <p className="type-heading-sm text-bone">{t('cart.empty')}</p>
              <p className="type-body type-body-light mt-2 max-w-[28ch] text-cream-soft">{t('cart.emptyHint')}</p>
            </div>
          ) : (
            <>
              {/* Ürün listesi */}
              <ul className="flex flex-col divide-y divide-[color:var(--line)]">
                {items.map((it) => {
                  const p = byId.get(it.productId);
                  if (!p) return null;
                  return (
                    <li key={it.productId} className="flex items-center gap-3 py-3">
                      <div className="min-w-0 flex-1">
                        <p className="type-body text-bone">{p.name[locale]}</p>
                        <p className="type-eyebrow mt-0.5 text-cream-soft">{p.unit[locale]}</p>
                      </div>
                      {/* Adet -/+ */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => decr(it.productId)}
                          aria-label="−"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--line)] text-bone transition-colors hover:border-[color:var(--color-brass)]"
                        >
                          <span aria-hidden="true" className="text-lg leading-none">
                            −
                          </span>
                        </button>
                        <span className="w-7 text-center type-body tabular-nums text-bone">{it.qty}</span>
                        <button
                          type="button"
                          onClick={() => incr(it.productId)}
                          aria-label="+"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--line)] text-bone transition-colors hover:border-[color:var(--color-brass)]"
                        >
                          <span aria-hidden="true" className="text-lg leading-none">
                            +
                          </span>
                        </button>
                      </div>
                      {/* Çıkar */}
                      <button
                        type="button"
                        onClick={() => remove(it.productId)}
                        aria-label={`${t('cart.remove')} — ${p.name[locale]}`}
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-cream-soft transition-colors hover:text-et"
                      >
                        <span aria-hidden="true" className="text-xl leading-none">
                          ×
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <button
                type="button"
                onClick={clear}
                className="mt-3 type-eyebrow text-cream-soft underline-offset-4 transition-colors hover:text-et hover:underline"
              >
                {t('cart.clear')}
              </button>

              {/* Sipariş formu */}
              <div className="mt-8 border-t border-[color:var(--line)] pt-6">
                <h3 className="type-heading-sm text-bone">{t('cart.checkout')}</h3>
                <div className="mt-4 flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cart-name" className={labelCls}>
                      {t('form.name')} *
                    </label>
                    <input
                      id="cart-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={touched && name.trim().length === 0}
                      className={field}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cart-phone" className={labelCls}>
                      {t('form.phone')} *
                    </label>
                    <input
                      id="cart-phone"
                      type="tel"
                      inputMode="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="tel"
                      aria-required="true"
                      aria-invalid={touched && phone.trim().length === 0}
                      className={field}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cart-boat" className={labelCls}>
                      {t('form.boat')} <span className="opacity-60">({t('form.optional')})</span>
                    </label>
                    <input id="cart-boat" type="text" value={boat} onChange={(e) => setBoat(e.target.value)} className={field} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cart-place" className={labelCls}>
                      {t('form.location')} <span className="opacity-60">({t('form.optional')})</span>
                    </label>
                    <input id="cart-place" type="text" value={place} onChange={(e) => setPlace(e.target.value)} className={field} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cart-note" className={labelCls}>
                      {t('form.note')} <span className="opacity-60">({t('form.optional')})</span>
                    </label>
                    <textarea
                      id="cart-note"
                      rows={2}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className={`${field} resize-none`}
                    />
                  </div>
                </div>
                {touched && !valid && (
                  <p role="alert" className="type-body mt-3 text-[color:var(--color-brass)]">
                    {t('form.required')}
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Alt — gönder / onay */}
        {items.length > 0 && (
          <div
            className="shrink-0 border-t border-[color:var(--line)] px-5 py-4"
            style={{paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))'}}
          >
            {sent && <p className="type-body mb-3 text-cream-soft">{t('cart.confirm')}</p>}
            <button
              type="button"
              onClick={submit}
              className={`btn btn-primary w-full ${!valid ? 'opacity-70' : ''}`}
            >
              {t('form.submit')}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
