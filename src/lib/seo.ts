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
