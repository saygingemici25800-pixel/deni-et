import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {waLink} from '@/lib/contact';
import {WhatsAppIcon} from '@/components/ui';
import {BoatGallery} from '@/components/BoatGallery';
import {BoatHero} from '@/components/boat3d/BoatHero';
import {BoatMarquee} from '@/components/BoatMarquee';

type Locale = (typeof routing.locales)[number];
type Props = {params: Promise<{locale: string}>};

// İki dil de statik üret.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

function narrow(requested: string): Locale {
  return hasLocale(routing.locales, requested) ? (requested as Locale) : (routing.defaultLocale as Locale);
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const locale = narrow((await params).locale);
  const t = await getTranslations({locale});
  return {
    title: `${t('boat.pageTitle')} · ${t('meta.siteName')}`,
    description: t('boat.lead'),
  };
}

const wrap = 'mx-auto max-w-[1200px] px-5 md:px-12';

export default async function TeknePage({params}: Props) {
  const locale = narrow((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations({locale});
  const wa = waLink(t('boat.prefillList'));
  const delivery = t.raw('boat.delivery') as string[];

  return (
    <>
      {/* ÜST — sinematik 3D yat bandı (client; WebGL/reduced-motion fallback içeride) */}
      <BoatHero />

      {/* TESLİMAT ŞERİDİ — ince hairline satır (kömür) */}
      <section className="surface-charcoal">
        <hr className="hairline" />
        <div className={`${wrap} py-5`}>
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 type-eyebrow text-cream-soft">
            {delivery.map((d, i) => (
              <li key={d} className="flex items-center gap-x-3">
                {i > 0 && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brass" />}
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* GALERİ — krem (kategori filtresi + ürün grid) */}
      <section className="surface-cream">
        <div className={`${wrap} py-20 md:py-28`}>
          <BoatGallery />
        </div>
      </section>

      {/* ALT CTA — tam genişlik bordo bant */}
      <section className="text-bone" style={{backgroundColor: 'var(--color-et)'}}>
        <div
          className={`${wrap} flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center md:py-16`}
        >
          <p className="type-statement max-w-[18ch]" style={{fontSize: 'clamp(1.6rem, 1.2rem + 2vw, 2.6rem)'}}>
            {t('boat.bandTitle')}
          </p>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="btn shrink-0 bg-[color:var(--color-bone)] text-[color:var(--color-et)] hover:bg-[color:var(--color-bone-2)]"
          >
            <WhatsAppIcon size={18} />
            {t('boat.bandCta')}
          </a>
        </div>
      </section>

      {/* Sayfa altı tam genişlik kayan tekne şeridi — footer'dan hemen önce */}
      <BoatMarquee />
    </>
  );
}
