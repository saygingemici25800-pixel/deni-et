import type {Metadata} from 'next';
import {routing} from '@/i18n/routing';

// Çok dilli SEO için site kökü. NOT: gerçek domain gelince YALNIZ bu satır değişecek.
export const BASE = 'https://www.denizetfethiye.com';

/**
 * hreflang alternates — locale-siz path ('' | '/tekne' | `/blog/${slug}` …) için.
 * languages: routing.locales üzerinden her dil mutlak URL + x-default → varsayılan (tr).
 * canonical: aktif locale'in mutlak URL'i. (metadataBase layout'ta ayarlanır.)
 */
export function localeAlternates(locale: string, path = '') {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = `${BASE}/${l}${path}`;
  languages['x-default'] = `${BASE}/${routing.defaultLocale}${path}`;
  return {
    canonical: `${BASE}/${locale}${path}`,
    languages,
  };
}

// tr→tr_TR, en→en_US, ru→ru_RU; bilinmeyen locale → tr_TR.
const OG_LOCALE: Record<string, string> = {tr: 'tr_TR', en: 'en_US', ru: 'ru_RU'};

/**
 * OpenGraph + Twitter Card — locale-aware. generateMetadata return'üne SPREAD edilir
 * (mevcut title/description/alternates korunur). image: mutlak-olmayan yol (ör. '/products/x.jpg');
 * yoksa /og-default.jpg (1200x630). URL'ler BASE ile mutlak.
 */
export function ogFor({
  locale,
  title,
  description,
  path = '',
  type = 'website',
  image,
}: {
  locale: string;
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
  image?: string;
}): Metadata {
  const img = `${BASE}${image ?? '/og-default.jpg'}`;
  const base = {
    siteName: 'Deniz Et · Kasap Orhan',
    locale: OG_LOCALE[locale] ?? 'tr_TR',
    url: `${BASE}/${locale}${path}`,
    title,
    description,
    images: [{url: img, width: 1200, height: 630, alt: title}],
  };
  return {
    openGraph: type === 'article' ? {...base, type: 'article'} : {...base, type: 'website'},
    twitter: {card: 'summary_large_image', title, description, images: [img]},
  };
}
