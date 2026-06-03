import {routing} from '@/i18n/routing';
import messages from '../content/tr.json';

// next-intl tip güvenliği: Locale ve Messages tipleri augment edilir.
// Böylece t('hero.title') gibi anahtarlar derleme zamanında doğrulanır (tr.json = referans).
declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
