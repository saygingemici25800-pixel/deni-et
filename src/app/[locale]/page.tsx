import {setRequestLocale} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from '@/i18n/routing';
import {Hero, Showcase, Timeline} from '@/components/sections';
import {HashScroll} from '@/components/HashScroll';
import {HeroMount} from '@/components/hero3d/HeroMount';
import {BoatMarquee} from '@/components/BoatMarquee';
import {IntroCurtain} from '@/components/IntroCurtain';
import {DryAgeCard} from '@/components/DryAgeCard';

type Props = {
  params: Promise<{locale: string}>;
};

// Tek sayfa akışı (SITEMAP §3). Bölümler arası full-bleed hairline ayraç.
export default async function Page({params}: Props) {
  const requested = (await params).locale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  setRequestLocale(locale);

  return (
    <>
      {/* Açılış perdesi — yalnız ilk ziyaret (client; reduced-motion'da render edilmez) */}
      <IntroCurtain />
      <HashScroll />
      <HeroMount fallback={<Hero />} />
      <hr className="hairline" />
      <Showcase />
      <hr className="hairline" />
      {/* Dry aged premium kart — hikâyenin hemen üstünde */}
      <DryAgeCard />
      <hr className="hairline" />
      <Timeline />
      {/* Viewport altına SABİT kayan tekne şeridi — YALNIZCA ana sayfa */}
      <BoatMarquee />
    </>
  );
}
