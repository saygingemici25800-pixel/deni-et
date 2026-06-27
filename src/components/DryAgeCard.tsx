import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {FallbackImage} from './FallbackImage';
import {BOAT_PRODUCTS} from '@/content/boat-products';

const wrap = 'mx-auto max-w-[1200px] px-5 md:px-12';

// Dry age kartı, görseli ürün verisinin image alanından okur (public/products/dry-age-urunler.jpg).
const dryAgeImage = BOAT_PRODUCTS.find((p) => p.id === 'dry-age-urunler')?.image;

// Premium foto placeholder — ince brass mermerlenme damarları + sıcak köz parıltısı + "Dry Age"
// filigranı. Konteyner (aspect/zemin) dışarıda; bu yalnız fallback içeriği. Görsel gelince üzerine biner.
function DryAgeArt() {
  return (
    <>
      <svg viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="da-glow" cx="32%" cy="38%" r="58%">
            <stop offset="0%" stopColor="#990011" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#990011" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="320" fill="url(#da-glow)" />
        {/* mermerlenme — ince brass damarlar */}
        <g stroke="#FFD662" fill="none" strokeLinecap="round" opacity="0.26">
          <path d="M36 118 C100 88, 160 150, 232 108 C292 76, 342 142, 384 108" strokeWidth="1.5" />
          <path d="M28 180 C92 150, 150 212, 222 170 C284 138, 352 202, 392 164" strokeWidth="1.2" />
          <path d="M48 232 C112 202, 172 256, 242 216 C302 184, 352 240, 384 216" strokeWidth="1" />
          <path d="M58 90 C120 70, 184 112, 252 80" strokeWidth="0.8" opacity="0.6" />
          <path d="M40 272 C124 246, 204 286, 304 256" strokeWidth="0.8" opacity="0.6" />
        </g>
      </svg>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-5 right-6 font-bold leading-none text-bone"
        style={{opacity: 0.1, fontSize: 'clamp(2rem, 1.2rem + 3vw, 3.8rem)', letterSpacing: '-0.03em'}}
      >
        Dry Age
      </span>
    </>
  );
}

/* DRY AGED PREMIUM KART — ana sayfada Showcase ile Hikâye(Timeline) arasında.
   Kömür zemin + brass detay; asimetrik: büyük foto (7 kolon) + kısa hikâye (5 kolon).
   Mobil: foto üstte, metin altta (grid doğal sıra). */
export function DryAgeCard() {
  const t = useTranslations();
  return (
    <section className="surface-charcoal">
      <div className={`${wrap} py-20 md:py-28`}>
        <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-14">
          <div className="md:col-span-7">
            <div
              className="relative aspect-[5/4] overflow-hidden rounded-[4px] border border-[rgba(255, 214, 98,0.3)] md:aspect-[4/3]"
              style={{background: 'linear-gradient(135deg, #2A1411 0%, #130F0C 58%, #1A1411 100%)'}}
            >
              <FallbackImage
                src={dryAgeImage}
                alt={t('dryage.title')}
                sizes="(max-width: 768px) 100vw, 58vw"
                fallback={<DryAgeArt />}
              />
            </div>
          </div>
          <div className="md:col-span-5">
            <p className="type-eyebrow text-brass">{t('dryage.eyebrow')}</p>
            <h2
              className="type-statement mt-4 text-bone"
              style={{fontSize: 'clamp(1.9rem, 1.4rem + 2.2vw, 3.2rem)'}}
            >
              {t('dryage.title')}
            </h2>
            <p className="type-body type-body-light mt-5 max-w-[46ch] text-cream-soft">{t('dryage.text')}</p>
            <Link href="/tekne" className="btn btn-primary mt-7">
              {t('dryage.cta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
