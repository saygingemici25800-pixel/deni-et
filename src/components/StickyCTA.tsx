import {useTranslations} from 'next-intl';
import {Phone} from 'lucide-react';
import {waLink, telLink} from '@/lib/contact';
import {WhatsAppIcon} from './ui';

// Mobil sabit alt CTA bar — yalnız mobil; tek dokunuş sipariş/arama (≥44px).
export function StickyCTA() {
  const t = useTranslations();
  const wa = waLink(t('whatsapp.prefill'));

  return (
    <div className="sticky-cta md:hidden">
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary flex-1"
      >
        <WhatsAppIcon size={18} />
        {t('hero.ctaPrimary')}
      </a>
      <a
        href={telLink()}
        aria-label={t('a11y.callAria')}
        className="btn btn-outline-cream flex-1"
      >
        <Phone size={18} strokeWidth={1.75} />
        {t('contact.ctaCall')}
      </a>
    </div>
  );
}
