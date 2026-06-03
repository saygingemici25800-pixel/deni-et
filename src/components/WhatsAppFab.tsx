'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {waLink} from '@/lib/contact';
import {WhatsAppIcon} from './ui';

// Yüzen WhatsApp butonu — hero geçilince belirir (IntersectionObserver · #hero).
export function WhatsAppFab() {
  const t = useTranslations();
  const [visible, setVisible] = useState(false);
  const wa = waLink(t('whatsapp.prefill'));

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      {rootMargin: '-60% 0px 0px 0px'},
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={wa}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('a11y.whatsappAria')}
      data-visible={visible}
      className="wa-fab"
    >
      <WhatsAppIcon size={26} />
    </a>
  );
}
