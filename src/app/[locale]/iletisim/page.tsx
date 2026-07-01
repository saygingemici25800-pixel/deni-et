import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {MapPin, Phone, Clock} from 'lucide-react';
import {routing} from '@/i18n/routing';
import {localeAlternates, ogFor} from '@/lib/seo';
import {telLink, waLink, mapsLink, mapsEmbed} from '@/lib/contact';
import {WhatsAppIcon, InstagramIcon} from '@/components/ui';

type Locale = (typeof routing.locales)[number];
type Props = {params: Promise<{locale: string}>};

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
    title: `${t('contact.pageTitle')} · ${t('meta.siteName')}`,
    description: t('contact.lead'),
    alternates: localeAlternates(locale, '/iletisim'),
    ...ogFor({locale, title: `${t('contact.pageTitle')} · ${t('meta.siteName')}`, description: t('contact.lead'), path: '/iletisim'}),
  };
}

const wrap = 'mx-auto max-w-[1200px] px-5 md:px-12';

export default async function IletisimPage({params}: Props) {
  const locale = narrow((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations({locale});

  const address = t('contact.address');
  const wa = waLink(t('whatsapp.prefill'));
  const igHandle = t('instagram.handle');
  const igUrl = `https://instagram.com/${igHandle.replace('@', '')}`;

  // İletişim satırı — ikon + küçük etiket + değer; tıklanır (statik: çalışma saatleri).
  const rowCls = 'group flex min-h-[44px] items-start gap-4 transition-colors';
  const iconCls =
    'mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[color:var(--line)] text-et transition-colors group-hover:border-[color:var(--color-et)]';

  return (
    <section className="surface-cream">
      <div className={`${wrap} pt-32 pb-20 md:pt-40 md:pb-28`}>
        {/* Başlık */}
        <p className="type-eyebrow text-ink-soft">{t('contact.eyebrow')}</p>
        <h1 className="type-statement mt-3 text-ink" style={{fontSize: 'clamp(2.4rem, 1.6rem + 3vw, 4.5rem)'}}>
          {t('contact.pageTitle')}
        </h1>
        <p className="type-body type-body-light mt-5 max-w-[46ch] text-ink-soft">{t('contact.lead')}</p>

        {/* İçerik — bilgiler | harita */}
        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-2 md:gap-14">
          {/* İletişim bilgileri */}
          <ul className="flex flex-col gap-6">
            <li>
              <a href={mapsLink(address)} target="_blank" rel="noopener noreferrer" className={`${rowCls} hover:text-et`}>
                <span className={iconCls}>
                  <MapPin size={20} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="type-eyebrow block text-ink-soft">{t('contact.labelAddress')}</span>
                  <span className="type-body mt-1 block max-w-[34ch] text-ink">{address}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={telLink()} aria-label={t('a11y.callAria')} className={`${rowCls} hover:text-et`}>
                <span className={iconCls}>
                  <Phone size={20} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span>
                  <span className="type-eyebrow block text-ink-soft">{t('contact.labelPhone')}</span>
                  <span className="type-body mt-1 block text-ink">{t('contact.phone')}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={wa} target="_blank" rel="noopener noreferrer" className={`${rowCls} hover:text-et`}>
                <span className={iconCls}>
                  <WhatsAppIcon size={20} />
                </span>
                <span>
                  <span className="type-eyebrow block text-ink-soft">{t('contact.labelWhatsapp')}</span>
                  <span className="type-body mt-1 block text-ink">{t('contact.ctaWhatsapp')}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={igUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${igHandle}`}
                className={`${rowCls} hover:text-et`}
              >
                <span className={iconCls}>
                  <InstagramIcon size={20} />
                </span>
                <span>
                  <span className="type-eyebrow block text-ink-soft">{t('contact.labelInstagram')}</span>
                  <span className="type-body mt-1 block text-ink">{igHandle}</span>
                </span>
              </a>
            </li>
            <li>
              <div className={rowCls}>
                <span className={iconCls}>
                  <Clock size={20} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span>
                  <span className="type-eyebrow block text-ink-soft">{t('contact.labelHours')}</span>
                  <span className="type-body mt-1 block max-w-[34ch] text-ink">{t('contact.hours')}</span>
                </span>
              </div>
            </li>
          </ul>

          {/* Harita — anahtarsız Google Maps q-embed; lazy + title (a11y) */}
          <div className="flex flex-col">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-[4px] border border-[color:var(--line)] md:aspect-auto md:h-[440px]">
              <iframe
                title={t('contact.mapTitle')}
                src={mapsEmbed(address)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-full w-full border-0"
              />
            </div>
            <a
              href={mapsLink(address)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline mt-4 self-start max-md:w-full"
            >
              <MapPin size={18} strokeWidth={1.6} aria-hidden="true" />
              {t('contact.openMaps')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
