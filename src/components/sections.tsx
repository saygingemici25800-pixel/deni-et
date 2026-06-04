import {useTranslations} from 'next-intl';
import {Phone, ArrowRight, MapPin} from 'lucide-react';
import {waLink, telLink, mapsLink} from '@/lib/contact';
import {WhatsAppIcon} from './ui';
import {StoryCarousel} from './StoryCarousel';
import {Explorer} from './Explorer';

/* =================================================================
   FAZ 2 — Bölümler. Tüm metin content/<locale>.json'dan.
   Editoryal/zanaat; kömür↔krem ZITLIK; 60/30/10; bol boşluk.
   Story karuseli + Products kâşifi = 2D (3D versiyonu Faz 3).
   ================================================================= */

// ZITLIK böl: son cümle/clause kalın (Bold), gerisi ince (Thin).
function splitZitlik(s: string): [string, string] {
  const delims = [', ', '? ', '! ', '. ', '; '];
  let idx = -1;
  let len = 0;
  for (const d of delims) {
    const i = s.lastIndexOf(d);
    if (i > idx) {
      idx = i;
      len = d.length;
    }
  }
  if (idx < 0) return [s, ''];
  return [s.slice(0, idx + len - 1), s.slice(idx + len)];
}

function Statement({text, className}: {text: string; className?: string}) {
  const [thin, bold] = splitZitlik(text);
  return (
    <h2 className={`type-statement ${className ?? ''}`}>
      <span className="thin">{thin}{bold ? ' ' : ''}</span>
      {bold && <span className="bold">{bold}</span>}
    </h2>
  );
}

const wrap = 'mx-auto max-w-[1200px] px-5 md:px-12';
const pad = 'py-24 md:py-32';

/* ---------------- 1 · HERO — split-screen knockout DENİZ/ET ----------------
   Açık (krem) ↔ koyu (kömür) yarım ekran; lockup seam'i geçerek ters renge
   "knockout" olur: DENİZ ince/koyu (krem üstünde), ET kalın/krem (kömür üstünde).
   Marka content'ten türetilir (meta.siteName). Ember = yalnız-CSS yer tutucu obje. */
export function Hero() {
  const t = useTranslations();
  const wa = waLink(t('whatsapp.prefill'));
  const [thin, bold] = splitZitlik(t('hero.title'));
  const mark = (t('meta.siteName').split('·')[0] ?? '').trim(); // "Deniz Et"
  const [w1, w2 = ''] = mark.split(' ');
  const deniz = w1.toLocaleUpperCase('tr'); // "DENİZ"
  const et = w2.toLocaleUpperCase('tr'); // "ET"

  return (
    <section id="hero" className="grid scroll-mt-24 md:grid-cols-2">
      {/* Sol yarım — krem (açık). DENİZ = ince + koyu knockout. */}
      <div className="surface-cream flex min-h-[64svh] flex-col justify-center gap-7 px-5 pb-14 pt-32 md:min-h-[100svh] md:px-12 md:pb-16 md:pt-36">
        <p className="type-eyebrow">{t('hero.eyebrow')}</p>
        <p
          aria-hidden="true"
          className="font-thin leading-[0.85] text-ink"
          style={{fontSize: 'clamp(3.5rem, 2.4rem + 9vw, 9.5rem)', letterSpacing: '-0.03em'}}
        >
          {deniz}
        </p>
        <div className="max-w-[40ch]">
          <h1 className="type-heading-sm font-light text-ink-soft" style={{fontWeight: 300}}>
            <span className="font-thin">
              {thin}
              {bold ? ' ' : ''}
            </span>
            {bold && <span className="font-bold text-ink">{bold}</span>}
          </h1>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <WhatsAppIcon size={18} />
              {t('hero.ctaPrimary')}
            </a>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              {t('hero.ctaSecondary')}
            </a>
          </div>
        </div>
      </div>

      {/* Sağ yarım — kömür (koyu). ET = kalın + krem knockout, ember objenin üstünde. */}
      <div className="surface-charcoal relative flex min-h-[46svh] items-center justify-center overflow-hidden md:min-h-[100svh] md:border-l md:border-[color:var(--line)]">
        <div className="hero-ember" aria-hidden="true" />
        <p
          aria-hidden="true"
          className="relative font-bold leading-[0.8] text-bone"
          style={{fontSize: 'clamp(6rem, 4rem + 16vw, 15rem)', letterSpacing: '-0.04em'}}
        >
          {et}
        </p>
        <span className="sr-only">{mark}</span>
      </div>
    </section>
  );
}

/* ---------------- 2 · GÜVEN ŞERİDİ (kömür · büyük rakamlar) ----------------
   value = DEV Bonny (krem); sayı → güçlü tek satır, kelime → ince+kalın yığın.
   label = küçük Light cream-soft. Büyük↔küçük + ince↔kalın ZITLIK; baseline grid.
   4 sütun (masaüstü) ↔ 2x2 (mobil), aralarda tam-ortada hairline. */
function TrustValue({value}: {value: string}) {
  const parts = value.trim().split(/\s+/);
  if (parts.length === 1) {
    // Sayı / tek kelime — güçlü, tek satır.
    return <span className="block font-medium">{value}</span>;
  }
  // Kelime value — ince (Thin) + kalın (Bold), iki satıra yığılır.
  const [first, ...rest] = parts;
  return (
    <span className="block">
      <span className="block font-thin">{first}</span>
      <span className="block font-bold">{rest.join(' ')}</span>
    </span>
  );
}

export function TrustBar() {
  const t = useTranslations();
  const trust = t.raw('trust') as {value: string; label: string}[];
  return (
    <section id="guven" className="surface-charcoal scroll-mt-24 md:scroll-mt-28">
      <div className={`${wrap} py-16 md:py-24`}>
        <ul className="grid grid-cols-2 md:grid-cols-4">
          {trust.map((s, i) => {
            // Ayraçlar: mobil 2x2 (sağ sütun border-l, alt satır border-t);
            // masaüstü tek satır (i>0 → border-l), üst border kalkar.
            const borders = [
              'border-[color:var(--line)]',
              i % 2 === 1 ? 'border-l' : '',
              i >= 2 ? 'border-t' : '',
              'md:border-t-0',
              i >= 1 ? 'md:border-l' : 'md:border-l-0',
            ].join(' ');
            return (
              <li key={s.value} className={`trust-item flex flex-col px-5 py-8 md:px-8 md:py-2 ${borders}`}>
                {/* value alanı — sabit yükseklik + alta hizalı → baseline grid */}
                <span
                  className="flex items-end text-bone"
                  style={{
                    fontSize: 'clamp(2.4rem, 1.6rem + 3.2vw, 3.75rem)',
                    lineHeight: 0.9,
                    letterSpacing: '-0.02em',
                    minHeight: 'clamp(4rem, 2.6rem + 5.4vw, 6.5rem)',
                  }}
                >
                  <TrustValue value={s.value} />
                </span>
                <span
                  className="mt-4 font-light text-cream-soft"
                  style={{fontSize: '0.95rem', lineHeight: 1.35, maxWidth: '22ch'}}
                >
                  {s.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- 3 · HİKÂYE (krem · CSS 3D coverflow karusel) ---------------- */
export function Story() {
  const t = useTranslations();
  const wa = waLink(t('whatsapp.prefill'));
  const carousel = t.raw('story.carousel') as {title: string; text: string}[];
  const [sThin, sBold] = splitZitlik(t('story.title'));
  const labels = {
    carousel: t('a11y.carousel'),
    prev: t('a11y.prevSlide'),
    next: t('a11y.nextSlide'),
    slide: t('a11y.slide'),
  };
  return (
    <section id="hikaye" className="surface-cream scroll-mt-24 md:scroll-mt-28">
      <div className={`${wrap} ${pad}`}>
        <p className="type-eyebrow reveal">{t('story.eyebrow')}</p>
        <div className="mt-6 grid gap-10 md:grid-cols-12">
          {/* Başlık — type-heading ölçeğinde ince↔kalın gerilim */}
          <h2 className="type-heading reveal reveal-2 max-w-[16ch] md:col-span-7">
            <span className="font-thin">
              {sThin}
              {sBold ? ' ' : ''}
            </span>
            {sBold && <span className="font-bold">{sBold}</span>}
          </h2>
          {/* Gövde — dar okuma ölçüsü (~60ch), nefesli */}
          <div className="reveal reveal-3 md:col-span-5 md:self-end">
            <p className="type-body type-body-light max-w-[60ch] text-ink-soft">{t('story.body')}</p>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-8">
              {t('story.cta')}
            </a>
          </div>
        </div>

        {/* CSS 3D coverflow — izole bileşen (Faz 3'te WebGL'e yükseltilebilir).
            Not: interaktif bileşen scroll-scrub opacity'ye sarılmaz (soluk görünmesin). */}
        <div className="mt-16 md:mt-20">
          <StoryCarousel cards={carousel} labels={labels} />
        </div>
      </div>
    </section>
  );
}

/* ---------------- 4 · ÜRÜNLER (kömür · interaktif Et Kâşifi 2D) ---------------- */
type CutData = {id: string; name: string; dishes: string; cooking: string};
export function Products() {
  const t = useTranslations();
  const beef = t.raw('explorer.beef') as CutData[];
  const lamb = t.raw('explorer.lamb') as CutData[];
  // Başlık — type-heading'de ince↔kalın (son kelime kalın).
  const pt = t('products.title');
  const ls = pt.lastIndexOf(' ');
  const pThin = ls > 0 ? pt.slice(0, ls) : pt;
  const pBold = ls > 0 ? pt.slice(ls + 1) : '';
  const labels = {
    title: t('explorer.title'),
    intro: t('explorer.intro'),
    toggleBeef: t('explorer.toggleBeef'),
    toggleLamb: t('explorer.toggleLamb'),
    dishLabel: t('explorer.panel.dishLabel'),
    cookLabel: t('explorer.panel.cookLabel'),
    cta: t('explorer.panel.cta'),
    // t.raw: {cut} ICU placeholder olarak yorumlanmasın (FORMATTING_ERROR'ı önler).
    waPrefill: t.raw('explorer.panel.waPrefill') as string,
  };
  return (
    <section id="urunler" className="surface-charcoal scroll-mt-24 md:scroll-mt-28">
      <div className={`${wrap} ${pad}`}>
        <p className="type-eyebrow">{t('products.eyebrow')}</p>
        <h2 className="type-heading mt-6 max-w-[16ch]">
          <span className="font-thin">
            {pThin}
            {pBold ? ' ' : ''}
          </span>
          {pBold && <span className="font-bold">{pBold}</span>}
        </h2>
        <p className="type-body type-body-light mt-6 max-w-[60ch] text-cream-soft">
          {t('products.intro')}
        </p>

        <Explorer beef={beef} lamb={lamb} labels={labels} />
      </div>
    </section>
  );
}

/* ---------------- 5 · İMZA LEZZETLER (krem · iki blok) ---------------- */
export function Signature() {
  const t = useTranslations();
  const items = t.raw('signature.items') as {name: string; text: string}[];
  return (
    <section id="imza" className="surface-cream scroll-mt-24 md:scroll-mt-28">
      <div className={`${wrap} ${pad}`}>
        <p className="type-eyebrow">{t('signature.eyebrow')}</p>
        <h2 className="type-heading mt-6 max-w-[18ch]">{t('signature.title')}</h2>

        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-0">
          {items.map((it, i) => (
            <article
              key={it.name}
              className={i > 0 ? 'md:border-l md:border-[color:var(--line)] md:pl-12' : 'md:pr-12'}
            >
              <p className="type-eyebrow text-ink-soft">0{i + 1}</p>
              <h3
                className="mt-3 font-light leading-tight"
                style={{fontSize: 'clamp(1.8rem, 1.3rem + 2vw, 2.8rem)', letterSpacing: '-0.015em'}}
              >
                {it.name}
              </h3>
              <p className="type-body mt-4 max-w-[42ch] text-ink-soft">{it.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 6 · MANGAL & DAVET (kömür) ---------------- */
export function Grill() {
  const t = useTranslations();
  const wa = waLink(t('whatsapp.prefill'));
  return (
    <section id="mangal" className="surface-charcoal scroll-mt-24 md:scroll-mt-28">
      <div className={`${wrap} ${pad}`}>
        <p className="type-eyebrow">{t('grill.eyebrow')}</p>
        <Statement text={t('grill.title')} className="mt-6 max-w-[18ch]" />
        <p className="type-body type-body-light mt-8 max-w-[56ch] text-cream-soft">
          {t('grill.body')}
        </p>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-10">
          <WhatsAppIcon size={18} />
          {t('grill.cta')}
        </a>
      </div>
    </section>
  );
}

/* ---------------- 7 · NASIL SİPARİŞ (krem · 3 adım) ---------------- */
export function OrderSteps() {
  const t = useTranslations();
  const wa = waLink(t('whatsapp.prefill'));
  const steps = t.raw('order.steps') as {n: string; title: string; text: string}[];
  return (
    <section id="siparis" className="surface-cream scroll-mt-24 md:scroll-mt-28">
      <div className={`${wrap} ${pad}`}>
        <p className="type-eyebrow">{t('order.eyebrow')}</p>
        <h2 className="type-heading mt-6 max-w-[18ch]">{t('order.title')}</h2>

        <ol className="mt-14 grid gap-12 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n}>
              <p
                className="font-thin leading-none text-et"
                style={{fontSize: 'clamp(3rem, 2rem + 4vw, 5rem)'}}
              >
                {s.n}
              </p>
              <h3 className="type-heading-sm mt-5">{s.title}</h3>
              <p className="type-body mt-2 max-w-[34ch] text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ol>

        <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-12">
          <WhatsAppIcon size={18} />
          {t('order.cta')}
        </a>
      </div>
    </section>
  );
}

/* ---------------- 8 · SOSYAL KANIT / INSTAGRAM (kömür) ---------------- */
export function Instagram() {
  const t = useTranslations();
  const handle = t('instagram.handle');
  const igUrl = `https://instagram.com/${handle.replace('@', '')}`;
  return (
    <section id="instagram" className="surface-charcoal scroll-mt-24 md:scroll-mt-28">
      <div className={`${wrap} ${pad}`}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="type-eyebrow">{handle}</p>
            <h2 className="type-heading mt-3 max-w-[16ch]">{t('instagram.title')}</h2>
          </div>
          <a
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-cream"
          >
            {t('instagram.cta')}
            <ArrowRight size={16} strokeWidth={1.75} />
          </a>
        </div>

        {/* Görsel yer tutucuları — gerçek reel/fotoğraflar sonraki fazda. */}
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {Array.from({length: 8}).map((_, i) => (
            <div
              key={i}
              aria-hidden="true"
              className="aspect-square border border-[color:var(--line)]"
              style={{backgroundColor: i % 2 ? 'var(--color-espresso-2)' : 'rgba(110,26,26,0.18)'}}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 9 · KONUM & İLETİŞİM (krem · harita) ---------------- */
export function Contact() {
  const t = useTranslations();
  const address = t('contact.address');
  return (
    <section id="iletisim" className="surface-cream scroll-mt-24 md:scroll-mt-28">
      <div className={`${wrap} ${pad}`}>
        <p className="type-eyebrow">{t('contact.eyebrow')}</p>
        <h2 className="type-heading mt-6 max-w-[18ch]">{t('contact.title')}</h2>

        <div className="mt-12 grid gap-12 md:grid-cols-2">
          {/* Sol — bilgi + aksiyon */}
          <div className="flex flex-col gap-8">
            <p className="type-body max-w-[34ch]" style={{fontSize: 'clamp(1.2rem, 1rem + 1vw, 1.5rem)'}}>
              {address}
            </p>
            <div>
              <hr className="hairline" />
              <p className="type-body mt-4 text-ink-soft">{t('contact.hours')}</p>
              <a
                href={telLink()}
                className="type-heading-sm mt-2 inline-flex items-center gap-2 text-et transition-colors hover:text-et-deep"
              >
                <Phone size={18} strokeWidth={1.75} />
                {t('contact.phone')}
              </a>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={mapsLink(address)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                {t('contact.ctaDirections')}
                <ArrowRight size={16} strokeWidth={1.75} />
              </a>
              <a href={telLink()} className="btn btn-primary">
                <Phone size={18} strokeWidth={1.75} />
                {t('contact.ctaCall')}
              </a>
            </div>
          </div>

          {/* Sağ — harita yer tutucu kartı (derin link; canlı embed sonraki fazda) */}
          <a
            href={mapsLink(address)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('contact.ctaDirections')}
            className="group flex aspect-[4/3] flex-col justify-between border border-[color:var(--line)] bg-bone-2 p-7 transition-colors hover:bg-bone"
          >
            <MapPin size={28} strokeWidth={1.5} className="text-et" />
            <div>
              <p className="type-eyebrow text-ink-soft">{t('contact.eyebrow')}</p>
              <p className="type-heading-sm mt-2 max-w-[24ch]">{address}</p>
              <span className="type-eyebrow mt-4 inline-flex items-center gap-1.5 text-et">
                {t('contact.ctaDirections')}
                <ArrowRight size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
