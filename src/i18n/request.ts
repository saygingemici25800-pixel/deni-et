import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';

// İstek başına locale çöz + mesajları content/<locale>.json'dan yükle.
// Geçersiz/eksik locale → varsayılan (tr).
export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../content/${locale}.json`)).default,
  };
});
