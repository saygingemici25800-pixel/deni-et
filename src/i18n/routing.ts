import {defineRouting} from 'next-intl/routing';

// İki dil: tr (varsayılan) + en. SEO uyumlu [locale] route (TECH-STACK §1).
export const routing = defineRouting({
  locales: ['tr', 'en', 'ru'],
  defaultLocale: 'tr',
});
