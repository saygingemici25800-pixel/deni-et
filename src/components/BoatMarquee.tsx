'use client';

import {useEffect} from 'react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

/* Alt SABİT (position:fixed) tam genişlik premium tekne şeridi.
   TEK tekne (yacht-marquee.png, önde/sağda) + ARKASINDA "Kumanya Sipariş Alanı" yazısı
   (Bonny Medium, brass). Grup en soldan girer, yavaşça sağa geçer, çıkınca baştan girer
   (tek grup, tek yön — CSS keyframes). prefers-reduced-motion → sabit, solda görünür.
   Tek tıklanabilir i18n Link → /tekne. Stiller: .boat-marquee* (globals.css). */
export function BoatMarquee() {
  const t = useTranslations();
  const text = t('boat.stripText');

  // Şerit fixed olduğundan, en alttaki footer içeriği altında kalmasın diye body'ye
  // alt padding sınıfı ekle (yalnız bu bileşenin render edildiği sayfalarda).
  useEffect(() => {
    document.body.classList.add('has-boat-marquee');
    return () => document.body.classList.remove('has-boat-marquee');
  }, []);

  return (
    <Link href="/tekne" aria-label={text} className="boat-marquee">
      <span className="boat-marquee-group" aria-hidden="true">
        <span className="boat-marquee-word">{text}</span>
        <span className="boat-marquee-boat" />
      </span>
    </Link>
  );
}
