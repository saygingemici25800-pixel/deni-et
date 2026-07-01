import {setRequestLocale, getTranslations} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from '@/i18n/routing';
import {BASE} from '@/lib/seo';
import {Hero, Showcase, Timeline} from '@/components/sections';
import {HashScroll} from '@/components/HashScroll';
import {HeroMount} from '@/components/hero3d/HeroMount';
import {BoatMarquee} from '@/components/BoatMarquee';
import {IntroCurtain} from '@/components/IntroCurtain';
import {DryAgeCard} from '@/components/DryAgeCard';

type Props = {
  params: Promise<{locale: string}>;
};

// Tek sayfa akışı (SITEMAP §3). Bölümler arası full-bleed hairline ayraç.
export default async function Page({params}: Props) {
  const requested = (await params).locale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  setRequestLocale(locale);
  const t = await getTranslations({locale});

  // LocalBusiness JSON-LD — yerel SEO (Google: Fethiye kasap, adres/tel/bölge). Yalnız anasayfa.
  // Değerler content'ten (uydurma yok); açılış saati/fiyat bilinmiyor → eklenmedi.
  const ld = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'FoodStore'],
    name: t('meta.siteName'),
    description: t('meta.description'),
    url: `${BASE}/${locale}`,
    image: `${BASE}/og-default.jpg`,
    telephone: '+90' + t('contact.phone').replace(/\D/g, '').replace(/^0/, ''),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Cumhuriyet Mah. 97. Sk. No:42',
      addressLocality: 'Fethiye',
      addressRegion: 'Muğla',
      postalCode: '48300',
      addressCountry: 'TR',
    },
    areaServed: ['Muğla', 'Fethiye', 'Göcek', 'Marmaris', 'Bodrum', 'Kuşadası'],
    knowsLanguage: ['tr', 'en', 'ru'],
    sameAs: [`https://instagram.com/${t('instagram.handle').replace('@', '')}`],
    foundingDate: '1980',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(ld)}} />
      {/* Açılış perdesi — yalnız ilk ziyaret (client; reduced-motion'da render edilmez) */}
      <IntroCurtain />
      <HashScroll />
      <HeroMount fallback={<Hero />} />
      <hr className="hairline" />
      <Showcase />
      <hr className="hairline" />
      {/* Dry aged premium kart — hikâyenin hemen üstünde */}
      <DryAgeCard />
      <hr className="hairline" />
      <Timeline />
      {/* Viewport altına SABİT kayan tekne şeridi — YALNIZCA ana sayfa */}
      <BoatMarquee />
    </>
  );
}
