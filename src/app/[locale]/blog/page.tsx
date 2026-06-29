import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {ArrowRight} from 'lucide-react';
import {routing} from '@/i18n/routing';
import {localeAlternates} from '@/lib/seo';
import {Link} from '@/i18n/navigation';
import {getPosts, type Locale, type Post} from '@/content/posts';
import {splitZitlik} from '@/lib/text';
import {PostCover} from '@/components/blog/PostCover';

type Props = {params: Promise<{locale: string}>};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

function narrow(requested: string): Locale {
  return hasLocale(routing.locales, requested) ? (requested as Locale) : (routing.defaultLocale as Locale);
}

function formatDate(locale: Locale, iso: string): string {
  return new Intl.DateTimeFormat(locale === 'tr' ? 'tr-TR' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const locale = narrow((await params).locale);
  const t = await getTranslations({locale});
  return {
    title: `${t('blog.eyebrow')} · ${t('meta.siteName')}`,
    description: t('blog.intro'),
    alternates: localeAlternates(locale, '/blog'),
  };
}

const wrap = 'mx-auto max-w-[1200px] px-5 md:px-12';

type Labels = {readingTime: string; soon: string; readMore: string};

// Kategori + okuma süresi şeridi.
function Meta({post, labels, locale}: {post: Post; labels: Labels; locale: Locale}) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 type-eyebrow text-ink-soft">
      {post.category && (
        <span className="rounded-full border border-[color:var(--line)] px-2.5 py-1 text-et">{post.category}</span>
      )}
      <time dateTime={post.date}>{formatDate(locale, post.date)}</time>
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brass" />
      <span>
        {post.readingMinutes} {labels.readingTime}
      </span>
    </div>
  );
}

function SoonBadge({label}: {label: string}) {
  return (
    <span className="absolute left-3 top-3 z-10 rounded-full bg-[color:var(--color-espresso)] px-3 py-1 type-eyebrow text-bone">
      {label}
    </span>
  );
}

export default async function BlogIndex({params}: Props) {
  const locale = narrow((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations({locale});
  const posts = getPosts(locale);
  const [tThin, tBold] = splitZitlik(t('blog.title'));
  const labels: Labels = {readingTime: t('blog.readingTime'), soon: t('blog.soon'), readMore: t('blog.readMore')};

  const featured = posts[0];
  const rest = posts.slice(1);

  // Asimetri — 12 kolonlu grid'de değişken span + kapak en-boy oranı (saf CSS).
  const SPAN = ['md:col-span-7', 'md:col-span-5', 'md:col-span-5', 'md:col-span-7', 'md:col-span-6', 'md:col-span-6'];

  return (
    <section className="surface-cream scroll-mt-24">
      <div className={`${wrap} pb-24 pt-36 md:pb-32 md:pt-44`}>
        {/* Başlık */}
        <header className="max-w-[60ch]">
          <p className="type-eyebrow">{t('blog.eyebrow')}</p>
          <h1 className="type-statement mt-5">
            <span className="thin">
              {tThin}
              {tBold ? ' ' : ''}
            </span>
            {tBold && <span className="bold text-et">{tBold}</span>}
          </h1>
          <p className="type-body type-body-light mt-7 text-ink-soft">{t('blog.intro')}</p>
        </header>

        {/* ÖNE ÇIKAN — büyük kapak + dev hook + başlık */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group mt-14 grid gap-6 md:mt-20 md:grid-cols-12 md:items-center md:gap-10"
          >
            <div className="md:col-span-7">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] border border-[color:var(--line)]">
                {featured.cover && (
                  <PostCover
                    tone={featured.cover.tone}
                    motif={featured.cover.motif}
                    label={featured.title}
                    className="h-full w-full"
                  />
                )}
              </div>
            </div>
            <div className="md:col-span-5">
              <Meta post={featured} labels={labels} locale={locale} />
              {featured.hook && (
                <p className="type-statement mt-5 text-et" style={{fontSize: 'clamp(1.8rem, 1.3rem + 2vw, 3rem)'}}>
                  {featured.hook}
                </p>
              )}
              <h2 className="type-heading-sm mt-4 max-w-[26ch] font-light text-ink">{featured.title}</h2>
              <p className="type-body mt-3 max-w-[46ch] text-ink-soft">{featured.excerpt}</p>
              <span className="type-eyebrow mt-5 inline-flex items-center gap-1.5 text-et">
                {labels.readMore}
                <ArrowRight size={14} strokeWidth={2} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        )}

        {/* DİĞER POSTLAR — asimetrik grid */}
        <div className="mt-12 grid gap-x-6 gap-y-12 md:mt-16 md:grid-cols-12 md:gap-x-8 md:gap-y-16">
          {rest.map((post, i) => {
            const span = SPAN[i % SPAN.length];
            const aspect = i % 2 === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]';
            const cover = post.cover && (
              <div className={`relative ${aspect} overflow-hidden rounded-[4px] border border-[color:var(--line)]`}>
                {post.draft && <SoonBadge label={labels.soon} />}
                <PostCover tone={post.cover.tone} motif={post.cover.motif} label={post.title} className="h-full w-full" />
              </div>
            );
            const text = (
              <div className="mt-5">
                <Meta post={post} labels={labels} locale={locale} />
                {post.hook && (
                  <p className="mt-3 font-medium text-et" style={{fontSize: 'clamp(1.25rem, 1rem + 0.9vw, 1.7rem)'}}>
                    {post.hook}
                  </p>
                )}
                <h2 className="type-heading-sm mt-2 max-w-[28ch] font-light text-ink">{post.title}</h2>
                <p className="type-body mt-2 max-w-[48ch] text-ink-soft">{post.excerpt}</p>
              </div>
            );

            return post.draft ? (
              <article key={post.slug} className={`${span} opacity-70`} aria-disabled="true">
                {cover}
                {text}
              </article>
            ) : (
              <article key={post.slug} className={span}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  {cover}
                  {text}
                  <span className="type-eyebrow mt-4 inline-flex items-center gap-1.5 text-et">
                    {labels.readMore}
                    <ArrowRight size={14} strokeWidth={2} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
