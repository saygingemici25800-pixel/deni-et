import {setRequestLocale, getTranslations} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from '@/i18n/routing';
import {waLink} from '@/lib/contact';
import {WhatsAppIcon} from '@/components/ui';

type Props = {
  params: Promise<{locale: string}>;
};

// Tam ekran iskelet kabuğu — DÖNÜŞÜMLÜ krem/kömür zemin, anchor offset'li.
function SectionShell({
  id,
  surface,
  children,
}: {
  id: string;
  surface: 'surface-charcoal' | 'surface-cream';
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`${surface} scroll-mt-24 md:scroll-mt-28`}>
      <div className="mx-auto flex min-h-[100svh] max-w-[1200px] flex-col justify-center px-5 py-24 md:px-12">
        {children}
      </div>
    </section>
  );
}

export default async function Page({params}: Props) {
  const requested = (await params).locale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  setRequestLocale(locale);
  const t = await getTranslations({locale});
  const wa = waLink(t('whatsapp.prefill'));

  // Hero statement — ZITLIK: son virgülden böl, baş ince (Thin) / son kalın (Bold).
  const title = t('hero.title');
  const ci = title.lastIndexOf(',');
  const thinPart = ci > -1 ? title.slice(0, ci + 1) : title;
  const boldPart = ci > -1 ? title.slice(ci + 1).trim() : '';

  const trust = t.raw('trust') as {value: string; label: string}[];

  return (
    <>
      {/* 1 · HERO — kömür */}
      <section id="hero" className="surface-charcoal scroll-mt-24">
        <div className="mx-auto flex min-h-[100svh] max-w-[1200px] flex-col justify-center px-5 pb-20 pt-32 md:px-12">
          <p className="type-eyebrow">{t('hero.eyebrow')}</p>
          <h1 className="type-statement mt-6 max-w-[16ch]">
            <span className="thin">{thinPart} </span>
            {boldPart && <span className="bold">{boldPart}</span>}
          </h1>
          <p className="type-body type-body-light mt-8 max-w-[54ch] text-cream-soft">
            {t('hero.subtitle')}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <WhatsAppIcon size={18} />
              {t('hero.ctaPrimary')}
            </a>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-cream"
            >
              {t('hero.ctaSecondary')}
            </a>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* 2 · GÜVEN ŞERİDİ — kömür (DESIGN-SYSTEM §5: koyu zemin, büyük rakamlar) */}
      <section id="guven" className="surface-charcoal scroll-mt-24 md:scroll-mt-28">
        <div className="mx-auto flex min-h-[60svh] max-w-[1200px] flex-col justify-center px-5 py-24 md:px-12">
          <p className="type-eyebrow">02</p>
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
            {trust.map((s) => (
              <div key={s.value}>
                <p
                  className="font-medium leading-none"
                  style={{fontSize: 'clamp(2.25rem, 1.4rem + 3.5vw, 4rem)', letterSpacing: '-0.02em'}}
                >
                  {s.value}
                </p>
                <p className="type-eyebrow mt-4">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* 3 · HİKÂYE — krem */}
      <SectionShell id="hikaye" surface="surface-cream">
        <p className="type-eyebrow">03 · {t('story.eyebrow')}</p>
        <h2 className="type-heading mt-5 max-w-[20ch]">{t('story.title')}</h2>
      </SectionShell>

      <hr className="hairline" />

      {/* 4 · ÜRÜNLER — kömür */}
      <SectionShell id="urunler" surface="surface-charcoal">
        <p className="type-eyebrow">04 · {t('products.eyebrow')}</p>
        <h2 className="type-heading mt-5 max-w-[20ch]">{t('products.title')}</h2>
      </SectionShell>

      <hr className="hairline" />

      {/* 5 · İMZA LEZZETLER — krem */}
      <SectionShell id="imza" surface="surface-cream">
        <p className="type-eyebrow">05 · {t('signature.eyebrow')}</p>
        <h2 className="type-heading mt-5 max-w-[20ch]">{t('signature.title')}</h2>
      </SectionShell>

      <hr className="hairline" />

      {/* 6 · MANGAL & DAVET — kömür */}
      <SectionShell id="mangal" surface="surface-charcoal">
        <p className="type-eyebrow">06 · {t('grill.eyebrow')}</p>
        <h2 className="type-heading mt-5 max-w-[22ch]">{t('grill.title')}</h2>
      </SectionShell>

      <hr className="hairline" />

      {/* 7 · NASIL SİPARİŞ — krem */}
      <SectionShell id="siparis" surface="surface-cream">
        <p className="type-eyebrow">07 · {t('order.eyebrow')}</p>
        <h2 className="type-heading mt-5 max-w-[20ch]">{t('order.title')}</h2>
      </SectionShell>

      <hr className="hairline" />

      {/* 8 · SOSYAL KANIT (Instagram) — kömür */}
      <SectionShell id="instagram" surface="surface-charcoal">
        <p className="type-eyebrow">08 · {t('instagram.handle')}</p>
        <h2 className="type-heading mt-5 max-w-[20ch]">{t('instagram.title')}</h2>
      </SectionShell>

      <hr className="hairline" />

      {/* 9 · KONUM & İLETİŞİM — krem (koyu footer ile ZITLIK) */}
      <SectionShell id="iletisim" surface="surface-cream">
        <p className="type-eyebrow">09 · {t('contact.eyebrow')}</p>
        <h2 className="type-heading mt-5 max-w-[20ch]">{t('contact.title')}</h2>
      </SectionShell>
    </>
  );
}
