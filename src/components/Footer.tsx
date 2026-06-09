import {useTranslations} from 'next-intl';
import {Phone} from 'lucide-react';
import {Link} from '@/i18n/navigation';
import {waLink, telLink} from '@/lib/contact';
import {Wordmark, WhatsAppIcon, InstagramIcon} from './ui';
import {AnchorLink} from './AnchorLink';

// Footer (surface-charcoal) — koyu kapanış; üstündeki açık bölümle ZITLIK.
export function Footer() {
  const t = useTranslations();
  const wa = waLink(t('whatsapp.prefill'));
  const links = t.raw('footer.links') as {label: string; href: string}[];
  const igHandle = t('instagram.handle');
  const igUrl = `https://instagram.com/${igHandle.replace('@', '')}`;

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
            {links.map((l) =>
              l.href.startsWith('#') ? (
                <AnchorLink
                  key={l.href}
                  hash={l.href.slice(1)}
                  className="type-eyebrow text-cream-soft transition-colors hover:text-brass"
                >
                  {l.label}
                </AnchorLink>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  className="type-eyebrow text-cream-soft transition-colors hover:text-brass"
                >
                  {l.label}
                </a>
              ),
            )}
            {/* Blog — locale-farkında rota (anchor değil). */}
            <Link
              href="/blog"
              className="type-eyebrow text-cream-soft transition-colors hover:text-brass"
            >
              {t('nav.blog')}
            </Link>
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
            <a
              href={igUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${igHandle}`}
              className="inline-flex items-center gap-2 text-cream-soft transition-colors hover:text-brass"
            >
              <InstagramIcon size={18} />
              <span className="type-body">{igHandle}</span>
            </a>
          </div>
        </div>

        <hr className="hairline mt-14" />
        <p className="type-eyebrow mt-6 text-cream-soft">{t('footer.rights')}</p>
      </div>
    </footer>
  );
}
