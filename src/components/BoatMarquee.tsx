'use client';

import {useEffect} from 'react';
import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/navigation';

/* Viewport ALTINA SABİT (position:fixed) tam genişlik premium tekne şeridi — header gibi
   scroll'dan etkilenmez. layout seviyesinde render edilir; BLOG hariç her sayfada görünür.
   TEK tekne (yacht-marquee.png, önde/sağda) + ARKASINDA "Kumanya Sipariş Alanı" (Bonny
   Medium, brass). Grup en soldan girer, yavaşça sağa geçer, çıkınca baştan girer (tek grup,
   tek yön, HER DURUMDA animasyonlu). Tek tıklanabilir i18n Link → /tekne. Stiller: .boat-marquee*. */
export function BoatMarquee() {
  const t = useTranslations();
  const pathname = usePathname(); // locale-stripped: '/', '/tekne', '/blog/...'
  const hidden = pathname.startsWith('/blog');

  // Şerit fixed olduğundan, en alttaki footer içeriği altında kalmasın diye body'ye alt
  // padding sınıfı ekle — yalnız şerit görünürken (blog'da değil).
  useEffect(() => {
    if (hidden) return;
    document.body.classList.add('has-boat-marquee');
    return () => document.body.classList.remove('has-boat-marquee');
  }, [hidden]);

  if (hidden) return null;

  const text = t('boat.stripText');
  return (
    <Link href="/tekne" aria-label={text} className="boat-marquee">
      <span className="boat-marquee-group" aria-hidden="true">
        <span className="boat-marquee-word">{text}</span>
        <span className="boat-marquee-boat" />
      </span>
    </Link>
  );
}
