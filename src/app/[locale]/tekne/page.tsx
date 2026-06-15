import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {waLink} from '@/lib/contact';
import {splitLastWord} from '@/lib/text';
import {WhatsAppIcon} from '@/components/ui';

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
    description: t('boat.text'),
  };
}

const wrap = 'mx-auto max-w-[1200px] px-5 md:px-12';

export default async function TeknePage({params}: Props) {
  const locale = narrow((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations({locale});
  const wa = waLink(t('whatsapp.prefill'));
  const [tThin, tBold] = splitLastWord(t('boat.pageTitle'));

  return (
    <section className="surface-cream scroll-mt-24">
      <div className={`${wrap} pb-24 pt-36 md:pb-32 md:pt-44`}>
        <header className="max-w-[60ch]">
          <p className="type-eyebrow text-ink-soft">{t('boat.eyebrow')}</p>
          <h1 className="type-statement mt-5">
            <span className="thin">
              {tThin}
              {tBold ? ' ' : ''}
            </span>
            {tBold && <span className="bold text-et">{tBold}</span>}
          </h1>
          <p className="type-body type-body-light mt-7 text-ink-soft">{t('boat.text')}</p>
        </header>

        {/* Placeholder — dolu ürün galerisi sonraki adımda. */}
        <div className="mt-12 border border-[color:var(--line)] border-l-2 border-l-[color:var(--color-et)] bg-bone-2 p-8 md:mt-16 md:p-10">
          <p className="type-eyebrow text-et">{t('boat.eyebrow')}</p>
          <p className="type-body mt-3 max-w-[52ch] text-ink">{t('boat.note')}</p>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-7"
          >
            <WhatsAppIcon size={18} />
            {t('boat.cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
