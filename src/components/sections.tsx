import {useTranslations} from 'next-intl';
import {waLink} from '@/lib/contact';
import {WhatsAppIcon} from './ui';
import {StoryCarousel} from './StoryCarousel';

/* =================================================================
   FAZ 2 — Bölümler. Tüm metin content/<locale>.json'dan.
   Editoryal/zanaat; kömür↔krem ZITLIK; 60/30/10; bol boşluk.
   Hero (3D dana) → Hikâye (Story karuseli) → İletişim.
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

/* İletişim bilgileri artık Footer'a taşındı (ana sayfa İletişim bölümü kaldırıldı). */
