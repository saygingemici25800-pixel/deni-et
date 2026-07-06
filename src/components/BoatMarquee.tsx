'use client';

import {useEffect} from 'react';
import dynamic from 'next/dynamic';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

// Mini canlı 3D yelkenli — yalnız client (ssr:false), lazy. Yüklenene dek aynı ölçüde boş span → layout kaymaz.
const YachtMini = dynamic(() => import('./boat3d/YachtMini').then((m) => m.YachtMini), {
  ssr: false,
  loading: () => <span className="boat-marquee-boat" aria-hidden="true" />,
});

/* Viewport ALTINA SABİT (position:fixed) tam genişlik premium tekne şeridi — header gibi
   scroll'dan etkilenmez. YALNIZCA ana sayfada render edilir (page.tsx). TEK tekne
   (yacht-marquee.png, önde/sağda) + ARKASINDA "Kumanya Sipariş Alanı" (Bonny Medium, brass).
   Grup en soldan girer, yavaşça sağa geçer, çıkınca baştan girer (tek grup, tek yön, HER
   DURUMDA animasyonlu). Tek tıklanabilir i18n Link → /tekne. Stiller: .boat-marquee*. */
export function BoatMarquee() {
  const t = useTranslations();

  // Şerit fixed olduğundan, en alttaki footer içeriği altında kalmasın diye body'ye alt
  // padding sınıfı ekle. Bileşen yalnız ana sayfada mount olduğundan padding da yalnız orada.
  useEffect(() => {
    document.body.classList.add('has-boat-marquee');
    return () => document.body.classList.remove('has-boat-marquee');
  }, []);

  const text = t('boat.stripText');
  return (
    <Link href="/tekne" aria-label={text} className="boat-marquee">
      <span className="boat-marquee-group" aria-hidden="true">
        <span className="boat-marquee-word">{text}</span>
        <YachtMini />
      </span>
    </Link>
  );
}
