import {useTranslations} from 'next-intl';
import {Phone, MapPin} from 'lucide-react';
import {Link} from '@/i18n/navigation';
import {waLink, telLink, mapsLink} from '@/lib/contact';
import {Wordmark, WhatsAppIcon, InstagramIcon} from './ui';
import {AnchorLink} from './AnchorLink';

// Footer (surface-cream) — açık/krem kapanış; koyu metin (ink) net okunur, üst bordo hairline ayraç.
export function Footer() {
  const t = useTranslations();
  const wa = waLink(t('whatsapp.prefill'));
  const links = t.raw('footer.links') as {label: string; href: string}[];
  const igHandle = t('instagram.handle');
  const igUrl = `https://instagram.com/${igHandle.replace('@', '')}`;
  const address = t('contact.address');

  return (
    <footer id="iletisim" className="surface-cream scroll-mt-24 md:scroll-mt-28">
      <hr className="hairline" />
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-12 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* Marka + slogan */}
          <div className="max-w-sm">
            <span className="text-ink">
              <Wordmark />
            </span>
            <p
              className="type-statement mt-6 text-ink"
              style={{fontSize: 'clamp(1.6rem, 1.2rem + 2vw, 2.5rem)'}}
            >
              {t('footer.slogan')}
            </p>
          </div>

          {/* Hızlı linkler */}
          <nav aria-label={t('footer.slogan')} className="flex flex-col gap-3">
            {links.map((l) =>
              l.href.startsWith('#') ? (
                <AnchorLink
                  key={l.href}
                  hash={l.href.slice(1)}
                  className="type-eyebrow text-ink transition-colors hover:text-et"
                >
                  {l.label}
                </AnchorLink>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  className="type-eyebrow text-ink transition-colors hover:text-et"
                >
                  {l.label}
                </a>
              ),
            )}
            {/* Kumanya + Blog — locale-farkında rotalar (anchor değil). */}
            <Link
              href="/tekne"
              className="type-eyebrow text-ink transition-colors hover:text-et"
            >
              {t('nav.boat')}
            </Link>
            <Link
              href="/blog"
              className="type-eyebrow text-ink transition-colors hover:text-et"
            >
              {t('nav.blog')}
            </Link>
            <Link
              href="/iletisim"
              className="type-eyebrow text-ink transition-colors hover:text-et"
            >
              {t('nav.contact')}
            </Link>
          </nav>

          {/* İletişim — adres, telefon, Instagram, çalışma saatleri (ana sayfa bölümünden taşındı) */}
          <div className="flex max-w-xs flex-col items-start gap-3">
            <a
              href={mapsLink(address)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-2 text-ink transition-colors hover:text-et"
            >
              <MapPin size={18} strokeWidth={1.5} aria-hidden="true" className="mt-0.5 shrink-0" />
              <span className="type-body max-w-[30ch]">{address}</span>
            </a>
            <a
              href={telLink()}
              aria-label={t('a11y.callAria')}
              className="inline-flex items-center gap-2 text-ink transition-colors hover:text-et"
            >
              <Phone size={18} strokeWidth={1.5} aria-hidden="true" />
              <span className="type-body">{t('contact.phone')}</span>
            </a>
            <a
              href={igUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${igHandle}`}
              className="inline-flex items-center gap-2 text-ink transition-colors hover:text-et"
            >
              <InstagramIcon size={18} />
              <span className="type-body">{igHandle}</span>
            </a>
            <p className="type-body text-ink">{t('contact.hours')}</p>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-2"
            >
              <WhatsAppIcon size={18} />
              {t('hero.ctaPrimary')}
            </a>
          </div>
        </div>

        <hr className="hairline mt-14" />
        <p className="type-eyebrow mt-6 text-ink-soft">{t('footer.rights')}</p>
      </div>
    </footer>
  );
}
