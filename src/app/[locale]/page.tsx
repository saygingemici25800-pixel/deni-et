import {setRequestLocale} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from '@/i18n/routing';
import {Hero, Story} from '@/components/sections';
import {HashScroll} from '@/components/HashScroll';
import {HeroMount} from '@/components/hero3d/HeroMount';

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
      <HashScroll />
      <HeroMount fallback={<Hero />} />
      <hr className="hairline" />
      <Story />
    </>
  );
}
