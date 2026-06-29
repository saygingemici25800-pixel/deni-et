'use client';

import {useLocale, useTranslations} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';

/**
 * Dil seçici — routing.locales üzerinden (TR/EN/RU). Her dil aktif path'i koruyarak
 * geçer (usePathname + router.replace · next-intl); aktif dil işaretlenir (text-brass).
 */
export function LangSwitch({className, onSwitch}: {className?: string; onSwitch?: () => void}) {
  const t = useTranslations();
  const active = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <span className={`inline-flex items-center ${className ?? ''}`}>
      {routing.locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => {
            if (locale !== active) router.replace(pathname, {locale});
            onSwitch?.();
          }}
          aria-current={locale === active ? 'true' : undefined}
          aria-label={`${t('a11y.switchLanguage')} — ${locale.toUpperCase()}`}
          className={`type-eyebrow inline-flex min-h-11 items-center px-2 transition-colors hover:text-brass ${
            locale === active ? 'text-brass' : ''
          }`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </span>
  );
}
