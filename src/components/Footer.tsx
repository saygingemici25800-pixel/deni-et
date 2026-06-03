import {useTranslations} from 'next-intl';
import {Phone} from 'lucide-react';
import {waLink, telLink} from '@/lib/contact';
import {Wordmark, WhatsAppIcon} from './ui';

// Footer (surface-charcoal) — koyu kapanış; üstündeki açık bölümle ZITLIK.
export function Footer() {
  const t = useTranslations();
  const wa = waLink(t('whatsapp.prefill'));
  const links = t.raw('footer.links') as {label: string; href: string}[];

  return (
    <footer className="surface-charcoal">
      <hr className="hairline" />
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-12 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* Marka + slogan */}
          <div className="max-w-sm">
            <span className="text-bone">
              <Wordmark />
            </span>
            <p
              className="type-statement mt-6 text-bone"
              style={{fontSize: 'clamp(1.6rem, 1.2rem + 2vw, 2.5rem)'}}
            >
              {t('footer.slogan')}
            </p>
          </div>

          {/* Hızlı linkler */}
          <nav aria-label={t('footer.slogan')} className="flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="type-eyebrow text-cream-soft transition-colors hover:text-brass"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* İletişim aksiyonları */}
          <div className="flex flex-col items-start gap-3">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <WhatsAppIcon size={18} />
              {t('hero.ctaPrimary')}
            </a>
            <a
              href={telLink()}
              aria-label={t('a11y.callAria')}
              className="inline-flex items-center gap-2 text-cream-soft transition-colors hover:text-brass"
            >
              <Phone size={18} strokeWidth={1.5} />
              <span className="type-body">{t('contact.phone')}</span>
            </a>
          </div>
        </div>

        <hr className="hairline mt-14" />
        <p className="type-eyebrow mt-6 text-cream-soft">{t('footer.rights')}</p>
      </div>
    </footer>
  );
}
