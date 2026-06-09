import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {ArrowRight} from 'lucide-react';
import {routing} from '@/i18n/routing';
import {Link} from '@/i18n/navigation';
import {getPosts, type Locale} from '@/content/posts';
import {splitZitlik} from '@/lib/text';

type Props = {params: Promise<{locale: string}>};

// İki dil de statik üret (layout generateStaticParams locale'i sağlar; burası ek param istemez).
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
  };
}

const wrap = 'mx-auto max-w-[1200px] px-5 md:px-12';

export default async function BlogIndex({params}: Props) {
  const locale = narrow((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations({locale});
  const posts = getPosts(locale);
  const [tThin, tBold] = splitZitlik(t('blog.title'));

  return (
    <section className="surface-cream scroll-mt-24">
      <div className={`${wrap} pb-24 pt-36 md:pb-32 md:pt-44`}>
        {/* Başlık bloğu — eyebrow → dev statement (ince↔kalın) → intro */}
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

        {/* Yazı kartları — kapak yok, ince hairline kartlar. Mobil tek sütun. */}
        <ul className="mt-16 grid gap-px overflow-hidden border border-[color:var(--line)] md:mt-20 md:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug} className="surface-cream">
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col gap-5 p-8 transition-colors hover:bg-bone-2 md:p-10"
              >
                <div className="flex items-center gap-3 type-eyebrow text-ink-soft">
                  <time dateTime={post.date}>{formatDate(locale, post.date)}</time>
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brass" />
                  <span>
                    {post.readingMinutes} {t('blog.readingTime')}
                  </span>
                </div>
                <h2 className="type-heading-sm max-w-[24ch] font-light text-ink">{post.title}</h2>
                <p className="type-body max-w-[46ch] text-ink-soft">{post.excerpt}</p>
                <span className="type-eyebrow mt-auto inline-flex items-center gap-1.5 text-et">
                  {t('blog.readMore')}
                  <ArrowRight
                    size={14}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
