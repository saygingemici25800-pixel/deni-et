import type {Metadata} from 'next';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {bonny} from '@/fonts';
import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';
import {WhatsAppFab} from '@/components/WhatsAppFab';
import {StickyCTA} from '@/components/StickyCTA';
import {BoatMarquee} from '@/components/BoatMarquee';
import '../globals.css';

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

// İki dili de statik üret (SSG).
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

// Temel metadata iskeleti — başlık/açıklama içerikten (content/<locale>.json · meta).
export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const requested = (await params).locale;
  // string → Locale ('tr'|'en') daralt (tip-güvenli next-intl çağrısı).
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  const t = await getTranslations({locale});
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;

  // Gelen locale geçerli değilse 404.
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Statik render için locale'i dağıt.
  setRequestLocale(locale);
  const t = await getTranslations({locale});

  return (
    <html lang={locale} className={bonny.variable}>
      <body>
        <NextIntlClientProvider>
          <a href="#main" className="skip-link">
            {t('a11y.skipToContent')}
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFab />
          <StickyCTA />
          <BoatMarquee />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
