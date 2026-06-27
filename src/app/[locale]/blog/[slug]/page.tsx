import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {hasLocale} from 'next-intl';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {ArrowLeft} from 'lucide-react';
import {routing} from '@/i18n/routing';
import {Link} from '@/i18n/navigation';
import {waLink} from '@/lib/contact';
import {WhatsAppIcon} from '@/components/ui';
import {getPost, getAllSlugs, type Locale} from '@/content/posts';
import {PostCover} from '@/components/blog/PostCover';

type Props = {params: Promise<{locale: string; slug: string}>};

// Her dil × her slug statik üret.
export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getAllSlugs().map((slug) => ({locale, slug})));
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
  const {locale: rawLocale, slug} = await params;
  const locale = narrow(rawLocale);
  const post = getPost(locale, slug);
  if (!post) return {};
  const t = await getTranslations({locale});
  return {
    title: `${post.title} · ${t('meta.siteName')}`,
    description: post.excerpt,
  };
}

const wrap = 'mx-auto max-w-[1200px] px-5 md:px-12';

export default async function BlogPost({params}: Props) {
  const {locale: rawLocale, slug} = await params;
  const locale = narrow(rawLocale);
  setRequestLocale(locale);
  const post = getPost(locale, slug);
  if (!post) notFound();

  const t = await getTranslations({locale});
  const wa = waLink(t('whatsapp.prefill'));

  // BlogPosting JSON-LD (SEO · BLOG.md §6).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    inLanguage: locale,
    articleSection: post.category,
    author: {'@type': 'Person', name: 'Kasap Orhan'},
    publisher: {'@type': 'Organization', name: t('meta.siteName')},
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />

      {/* ÇARPICI üst alan — kapak motifi + koyu örtü + HOOK + başlık + meta. */}
      <header className="surface-charcoal relative isolate overflow-hidden">
        {post.cover && (
          <div className="absolute inset-0 z-0 opacity-45">
            <PostCover tone={post.cover.tone} motif={post.cover.motif} label={post.title} className="h-full w-full" />
          </div>
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0"
          style={{background: 'linear-gradient(to top, rgba(19,15,12,0.94) 12%, rgba(19,15,12,0.55) 100%)'}}
        />
        <div className={`${wrap} relative z-10 pb-16 pt-36 md:pb-20 md:pt-44`}>
          <Link
            href="/blog"
            className="type-eyebrow inline-flex items-center gap-2 text-cream-soft transition-colors hover:text-brass"
          >
            <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
            {t('blog.backToList')}
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-2.5 type-eyebrow text-cream-soft">
            {post.category && (
              <span className="rounded-full border border-[rgba(252, 246, 245,0.35)] px-2.5 py-1 text-brass">
                {post.category}
              </span>
            )}
            <time dateTime={post.date}>{formatDate(locale, post.date)}</time>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brass" />
            <span>
              {post.readingMinutes} {t('blog.readingTime')}
            </span>
          </div>

          {post.hook && (
            <p
              className="type-statement mt-6 max-w-[20ch] text-brass"
              style={{fontSize: 'clamp(1.9rem, 1.3rem + 2.6vw, 3.4rem)'}}
            >
              {post.hook}
            </p>
          )}

          <h1 className="type-heading-sm mt-6 max-w-[42ch] font-light text-bone">{post.title}</h1>
        </div>
      </header>

      {/* Okuma gövdesi — dar ölçü (~68ch), nefesli. Krem zemin. */}
      <div className="surface-cream">
        <div className={`${wrap} pb-24 pt-16 md:pb-32 md:pt-20`}>
          <div className="mx-auto max-w-[68ch]">
            {post.body.map((block, i) =>
              block.type === 'quote' ? (
                <blockquote key={i} className="my-12 border-l border-[color:var(--line)] pl-6 md:my-16 md:pl-8">
                  <p className="type-statement text-et" style={{fontSize: 'clamp(1.9rem, 1.3rem + 2.4vw, 3.25rem)'}}>
                    {block.text}
                  </p>
                </blockquote>
              ) : (
                <p key={i} className="type-body mt-6 leading-relaxed text-ink-soft first:mt-0">
                  {block.text}
                </p>
              ),
            )}

            {/* Nazik kapanış CTA — soru/sipariş için WhatsApp + listeye dön. */}
            <div className="mt-16 md:mt-20">
              <hr className="hairline" />
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <WhatsAppIcon size={18} />
                  {t('contact.ctaWhatsapp')}
                </a>
                <Link href="/blog" className="btn btn-outline">
                  {t('blog.backToList')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
