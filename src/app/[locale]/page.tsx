import {setRequestLocale} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from '@/i18n/routing';
import {
  Hero,
  Story,
  Products,
  Signature,
  Grill,
  OrderSteps,
  Instagram,
  Contact,
} from '@/components/sections';

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
      <Hero />
      <hr className="hairline" />
      <Story />
      <hr className="hairline" />
      <Products />
      <hr className="hairline" />
      <Signature />
      <hr className="hairline" />
      <Grill />
      <hr className="hairline" />
      <OrderSteps />
      <hr className="hairline" />
      <Instagram />
      <hr className="hairline" />
      <Contact />
    </>
  );
}
