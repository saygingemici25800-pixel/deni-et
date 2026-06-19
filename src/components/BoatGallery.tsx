'use client';

import {useState} from 'react';
import Image from 'next/image';
import {useLocale, useTranslations} from 'next-intl';
import {waLink} from '@/lib/contact';
import {WhatsAppIcon} from './ui';
import {BOAT_PRODUCTS, CATEGORIES, type BoatProduct, type Locale} from '@/content/boat-products';
import {useCart} from './cart/CartProvider';

// Zarif placeholder — krem gradyan + ince bıçak/köz motifi + ürün adı filigranı (boş kutu DEĞİL).
function ProductArt({label}: {label: string}) {
  return (
    <div className="absolute inset-0 text-ink" style={{background: 'linear-gradient(135deg, #F6F1E8 0%, #E8DECF 100%)'}}>
      <svg viewBox="0 0 200 150" aria-hidden="true" fill="none" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="ba-ember" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F4C257" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#C8951C" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="100" cy="98" rx="62" ry="15" fill="url(#ba-ember)" />
        <g stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" opacity="0.5">
          <path d="M44 70 L150 48 C160 46 167 53 159 60 L74 96 L52 92 Z" />
          <line x1="52" y1="92" x2="46" y2="72" opacity="0.5" />
          <path d="M74 96 L64 116" />
          <path d="M64 116 L58 130 L76 130 L70 116 Z" />
        </g>
        <g fill="#C8951C" opacity="0.8">
          <circle cx="86" cy="98" r="4" />
          <circle cx="104" cy="94" r="5" />
          <circle cx="122" cy="98" r="4" />
        </g>
      </svg>
      <span
        aria-hidden="true"
        className="absolute bottom-2 right-3 max-w-[85%] text-right font-bold leading-none text-ink"
        style={{fontSize: 'clamp(1rem, 0.8rem + 1.4vw, 1.5rem)', opacity: 0.09, letterSpacing: '-0.02em'}}
      >
        {label}
      </span>
    </div>
  );
}

// Tek ürün kartı — birincil "Sepete Ekle" (geri bildirimli) + ikincil tekil "İste" (WhatsApp).
function ProductCard({
  p,
  locale,
  ask,
  addLabel,
  addedLabel,
  itemWa,
}: {
  p: BoatProduct;
  locale: Locale;
  ask: string;
  addLabel: string;
  addedLabel: string;
  itemWa: string;
}) {
  const {add} = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const name = p.name[locale];

  const onAdd = () => {
    add(p.id);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article className="flex flex-col overflow-hidden border border-[color:var(--line)] bg-bone transition-colors hover:border-[color:var(--color-et)]">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-[color:var(--line)]">
        {p.image ? (
          <Image src={p.image} alt={name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
        ) : (
          <ProductArt label={name} />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <h3 className="type-heading-sm text-ink">{name}</h3>
        {p.unit && <p className="type-eyebrow mt-1 text-ink-soft">{p.unit[locale]}</p>}
        {p.note && <p className="type-body mt-2 text-ink-soft">{p.note[locale]}</p>}

        <div className="mt-4 flex flex-col gap-2.5">
          {/* Birincil — Sepete Ekle */}
          <button
            type="button"
            onClick={onAdd}
            aria-label={`${addLabel} — ${name}`}
            data-added={justAdded}
            className="btn btn-primary w-full"
          >
            {justAdded ? addedLabel : addLabel}
          </button>
          {/* İkincil — tekil hızlı sipariş (WhatsApp) */}
          <a
            href={itemWa}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${ask} — ${name}`}
            className="type-eyebrow inline-flex items-center justify-center gap-2 text-et transition-colors hover:text-et-deep"
          >
            <WhatsAppIcon size={15} />
            {ask}
          </a>
        </div>
      </div>
    </article>
  );
}

export function BoatGallery() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const [active, setActive] = useState<string>('all');

  // t.raw: {product} ICU placeholder olarak yorumlanmasın.
  const prefillItem = t.raw('boat.prefillItem') as string;
  const ask = t('boat.ask');
  const addLabel = t('cart.add');
  const addedLabel = t('cart.added');

  const tabs = [{id: 'all', label: t('boat.all')}, ...CATEGORIES.map((c) => ({id: c.id, label: c.label[locale]}))];
  const products = active === 'all' ? BOAT_PRODUCTS : BOAT_PRODUCTS.filter((p) => p.category === active);

  return (
    <div>
      {/* Kategori sekmeleri — mobil yatay scroll, dokunma ≥44px */}
      <div
        role="tablist"
        aria-label={t('boat.all')}
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0"
      >
        {tabs.map((tab) => {
          const on = active === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActive(tab.id)}
              className={`inline-flex min-h-[44px] shrink-0 items-center rounded-full border px-4 transition-colors ${
                on
                  ? 'border-[color:var(--color-et)] bg-[color:var(--color-et)] text-bone'
                  : 'border-[color:var(--line)] text-ink-soft hover:text-et'
              }`}
            >
              <span className="type-eyebrow">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Ürün grid — mobil 2, tablet 2, masaüstü 3-4 sütun */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:mt-10 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            p={p}
            locale={locale}
            ask={ask}
            addLabel={addLabel}
            addedLabel={addedLabel}
            itemWa={waLink(prefillItem.replace('{product}', p.name[locale]))}
          />
        ))}
      </div>
    </div>
  );
}
