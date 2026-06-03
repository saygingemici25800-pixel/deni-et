'use client';

import {useLocale, useTranslations} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';

/**
 * TR/EN değiştirici. Aktif path'i korur (usePathname + router.replace · next-intl).
 * Etiket content'ten gelir (nav.lang: TR'de "EN", EN'de "TR").
 */
export function LangSwitch({className, onSwitch}: {className?: string; onSwitch?: () => void}) {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const other = locale === 'tr' ? 'en' : 'tr';

  return (
    <button
      type="button"
      onClick={() => {
        router.replace(pathname, {locale: other});
        onSwitch?.();
      }}
      aria-label={`${t('a11y.switchLanguage')} — ${other.toUpperCase()}`}
      className={`type-eyebrow inline-flex min-h-11 items-center px-2 transition-colors hover:text-brass ${
        className ?? ''
      }`}
    >
      {t('nav.lang')}
    </button>
  );
}
