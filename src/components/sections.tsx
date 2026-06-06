import {useTranslations} from 'next-intl';
import {Phone, MapPin} from 'lucide-react';
import {waLink, telLink, mapsLink} from '@/lib/contact';
import {WhatsAppIcon, Wordmark, InstagramIcon} from './ui';
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
        {/* eyebrow → heritage (sessiz katman) → DENİZ lockup → tagline → CTA */}
        <div>
          <p className="type-eyebrow">{t('hero.eyebrow')}</p>
          <p className="hero-heritage">{t('hero.heritage')}</p>
        </div>
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

/* ---------------- 2 · HİKÂYE (krem · CSS 3D coverflow karusel) ---------------- */
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

/* ---------------- 3 · ÜRÜNLER (kömür · interaktif Et Kâşifi 2D) ---------------- */
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

/* ---------------- 4 · KONUM & İLETİŞİM — 3 parçalı bant (krem · üst hairline) ----------------
   Ürünler (kömür) sonrası krem'e döner → kontrast ritmi.
   SOL: kömür/bordo dolu marka bloğu — Wordmark (krem) + soyut bıçak/köz SVG (krem/brass).
   ORTA: iletişim — adres→Google Maps, telefon→tel:, Instagram link, çalışma saatleri.
   SAĞ: dev statement CTA (ince↔kalın) + WhatsApp + ikincil telefon. FORM/INPUT YOK. */

// Soyut bıçak + köz motifi — krem hat (currentColor) + brass köz. Hareket SAF CSS.
function ContactMark() {
  return (
    <svg
      viewBox="0 0 200 160"
      aria-hidden="true"
      fill="none"
      className="h-auto w-full"
      style={{maxWidth: 220}}
    >
      <defs>
        <radialGradient id="contact-ember" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F4C257" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#C8951C" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Köz hâlesi — yumuşak sıcak parıltı (SAF CSS pulse) */}
      <ellipse
        cx="100"
        cy="120"
        rx="72"
        ry="20"
        fill="url(#contact-ember)"
        style={{animation: 'ember-pulse 4.5s ease-in-out infinite', transformBox: 'fill-box', transformOrigin: 'center'}}
      />
      {/* Bıçak — ince krem hatlı soyut form */}
      <g stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
        <path d="M38 66 L150 40 C161 37 168 45 159 53 L70 96 L46 92 Z" />
        <line x1="46" y1="92" x2="40" y2="68" opacity="0.5" />
        <path d="M70 96 L60 116" />
        <path d="M60 116 L54 132 L72 132 L66 116 Z" />
      </g>
      {/* Közler — pirinç daireler (yumuşak flicker, SAF CSS) */}
      <g fill="#C8951C">
        {([[80, 122, 5], [100, 118, 6], [120, 122, 5]] as const).map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} style={{animation: `ember-flicker ${2.1 + i * 0.4}s ease-in-out infinite`}} />
        ))}
      </g>
    </svg>
  );
}

export function Contact() {
  const t = useTranslations();
  const wa = waLink(t('contact.ctaWhatsapp'));
  const address = t('contact.address');
  const igHandle = t('instagram.handle');
  const igUrl = `https://instagram.com/${igHandle.replace('@', '')}`;
  const [stThin, stBold] = splitZitlik(t('contact.statement'));

  return (
    <section id="iletisim" className="surface-cream scroll-mt-24 md:scroll-mt-28">
      <hr className="hairline" />
      <div className={`${wrap} ${pad}`}>
        <h2 className="sr-only">{t('contact.eyebrow')}</h2>

        {/* 3 panel — masaüstü yan yana, mobil alt alta. İnce hairline ızgara. */}
        <div className="grid overflow-hidden border border-[color:var(--line)] md:grid-cols-12">
          {/* SOL — kömür/bordo dolu marka bloğu */}
          <div className="surface-charcoal relative flex flex-col justify-between gap-12 overflow-hidden p-8 md:col-span-3 md:p-10">
            <span className="relative z-10 text-bone">
              <Wordmark />
            </span>
            <div className="relative z-10 text-cream-soft">
              <ContactMark />
            </div>
          </div>

          {/* ORTA — iletişim bilgisi (gerçek <a> linkleri, dokunma hedefi ≥44px) */}
          <div className="surface-cream flex flex-col gap-6 border-t border-[color:var(--line)] p-8 md:col-span-4 md:border-l md:border-t-0 md:p-10">
            <div>
              <p className="type-eyebrow">{t('contact.eyebrow')}</p>
              <hr className="hairline mt-3 w-12" />
            </div>
            <a
              href={mapsLink(address)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[44px] items-start gap-3 text-ink transition-colors hover:text-et"
            >
              <MapPin size={20} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 shrink-0 text-et" />
              <span className="type-body max-w-[28ch]">{address}</span>
            </a>
            <a
              href={telLink()}
              className="flex min-h-[44px] items-center gap-3 text-ink transition-colors hover:text-et"
            >
              <Phone size={20} strokeWidth={1.75} aria-hidden="true" className="shrink-0 text-et" />
              <span className="type-body">{t('contact.phone')}</span>
            </a>
            <a
              href={igUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${igHandle}`}
              className="flex min-h-[44px] items-center gap-3 text-ink transition-colors hover:text-et"
            >
              <InstagramIcon size={20} className="shrink-0 text-et" />
              <span className="type-body">{igHandle}</span>
            </a>
            <p className="type-body text-ink-soft">{t('contact.hours')}</p>
          </div>

          {/* SAĞ — dev statement CTA bloğu (FORM YOK) */}
          <div className="surface-cream flex flex-col justify-center gap-7 border-t border-[color:var(--line)] p-8 md:col-span-5 md:border-l md:border-t-0 md:p-12">
            <p className="type-statement max-w-[14ch]">
              <span className="thin">
                {stThin}
                {stBold ? ' ' : ''}
              </span>
              {stBold && <span className="bold text-et">{stBold}</span>}
            </p>
            <p className="type-body type-body-light max-w-[42ch] text-ink-soft">
              {t('contact.statementSub')}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <WhatsAppIcon size={18} />
                {t('contact.ctaWhatsapp')}
              </a>
              <a href={telLink()} className="btn btn-outline">
                <Phone size={18} strokeWidth={1.75} aria-hidden="true" />
                {t('contact.ctaCall')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
