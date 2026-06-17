import {useTranslations} from 'next-intl';
import {ArrowRight} from 'lucide-react';
import {waLink} from '@/lib/contact';
import {Link} from '@/i18n/navigation';
import {WhatsAppIcon} from './ui';
import {StoryTimeline} from './StoryTimeline';

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
  const [thin, bold] = splitZitlik(t('boat.title'));
  const mark = (t('meta.siteName').split('·')[0] ?? '').trim(); // "Deniz Et"
  const [w1, w2 = ''] = mark.split(' ');
  const deniz = w1.toLocaleUpperCase('tr'); // "DENİZ"
  const et = w2.toLocaleUpperCase('tr'); // "ET"

  return (
    <section id="hero" className="grid scroll-mt-24 md:grid-cols-2">
      {/* Sol yarım — krem (açık). DENİZ = ince + koyu knockout. */}
      <div className="surface-cream flex min-h-[64svh] flex-col justify-center gap-7 px-5 pb-14 pt-32 md:min-h-[100svh] md:px-12 md:pb-16 md:pt-36">
        {/* eyebrow → DENİZ lockup → tekne/kumanya SATIŞ mesajı (boat.*) → CTA */}
        <p className="type-eyebrow text-ink-soft">{t('boat.eyebrow')}</p>
        <p
          aria-hidden="true"
          className="font-thin leading-[0.85] text-ink"
          style={{fontSize: 'clamp(3rem, 2.2rem + 8vw, 8rem)', letterSpacing: '-0.03em'}}
        >
          {deniz}
        </p>
        <div className="max-w-[46ch]">
          <h1 className="type-heading text-ink">
            <span className="font-thin">
              {thin}
              {bold ? ' ' : ''}
            </span>
            {bold && <span className="font-bold text-et">{bold}</span>}
          </h1>
          <p className="type-body type-body-light mt-5 max-w-[46ch] text-ink-soft">{t('boat.text')}</p>
          <div className="mt-7 flex flex-wrap gap-3 max-md:mt-8">
            <Link href="/tekne" className="btn btn-primary max-md:w-full max-md:min-h-[48px]">
              {t('boat.cta')}
            </Link>
            {/* İkincil WhatsApp — yalnız masaüstü (mobilde sağ-alt FAB var, tekrar gerekmez) */}
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-outline max-md:hidden">
              <WhatsAppIcon size={18} />
              {t('boat.ctaSecondary')}
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

/* Zarif ürün görsel placeholder — /tekne deseniyle tutarlı (krem gradyan + ince bıçak/köz + ad filigranı). */
function ShowcaseArt({label, idx}: {label: string; idx: number}) {
  const gid = `sc-ember-${idx}`;
  return (
    <div
      className="relative aspect-[4/3] overflow-hidden text-ink"
      style={{background: 'linear-gradient(135deg, #F6F1E8 0%, #E8DECF 100%)'}}
    >
      <svg viewBox="0 0 200 150" aria-hidden="true" fill="none" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id={gid} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F4C257" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#C8951C" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="100" cy="98" rx="62" ry="15" fill={`url(#${gid})`} />
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

/* ---------------- 2 · TEZGAHTAN (krem · editoryal ürün vitrini) ----------------
   Hero sonrası krem'e döner → kontrast ritmi (üst hairline page.tsx'te).
   SOL: eyebrow → ince↔kalın başlık → metin → /tekne CTA'ları.
   SAĞ: 4 ürün kartı (zarif placeholder + ad + not), hafif asimetrik dizilim. */
type ShowItem = {name: string; note: string};
export function Showcase() {
  const t = useTranslations();
  const items = t.raw('showcase.items') as ShowItem[];
  const [sThin, sBold] = splitZitlik(t('showcase.title'));
  return (
    <section id="hikaye" className="surface-cream scroll-mt-24 md:scroll-mt-28">
      <div className={`${wrap} ${pad}`}>
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          {/* SOL — içerik */}
          <div className="md:col-span-5 md:self-center">
            <p className="type-eyebrow">{t('showcase.eyebrow')}</p>
            <h2 className="type-heading mt-6 max-w-[16ch]">
              <span className="font-thin">
                {sThin}
                {sBold ? ' ' : ''}
              </span>
              {sBold && <span className="font-bold">{sBold}</span>}
            </h2>
            <p className="type-body type-body-light mt-6 max-w-[46ch] text-ink-soft">{t('showcase.text')}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href="/tekne" className="btn btn-primary">
                {t('showcase.cta')}
              </Link>
              <Link
                href="/tekne"
                className="type-eyebrow inline-flex items-center gap-1.5 text-et transition-colors hover:text-et-deep"
              >
                {t('showcase.ctaProducts')}
                <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* SAĞ — ürün görsel ızgarası (hafif asimetrik: 2. sütun offset) */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {items.map((it, i) => (
                <article
                  key={it.name}
                  className={`overflow-hidden border border-[color:var(--line)] bg-bone ${
                    i % 2 === 1 ? 'md:mt-10' : ''
                  }`}
                >
                  <ShowcaseArt label={it.name} idx={i} />
                  <div className="border-t border-[color:var(--line)] p-4 md:p-5">
                    <h3 className="type-heading-sm text-ink">{it.name}</h3>
                    <p className="type-body mt-1 text-ink-soft">{it.note}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 3 · HİKÂYE TIMELINE — YATAY zaman şeridi (client) ----------------
   Dikey timeline yerine yatay scroll carousel: masaüstü+hareket → sticky-progress yatay
   akış; mobil/reduced-motion → basit overflow-x + snap. Tüm mantık StoryTimeline'da. */
export function Timeline() {
  return <StoryTimeline />;
}

/* İletişim bilgileri artık Footer'a taşındı (ana sayfa İletişim bölümü kaldırıldı). */
