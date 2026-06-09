'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {Menu, X, Phone} from 'lucide-react';
import {Link, usePathname} from '@/i18n/navigation';
import {waLink, telLink} from '@/lib/contact';
import {Wordmark, WhatsAppIcon} from './ui';
import {AnchorLink} from './AnchorLink';
import {LangSwitch} from './LangSwitch';

// Nav modeli — etiketler content.nav'dan. anchor=true → locale-aware kök+anchor (/#id);
// anchor=false → ayrı rota (/blog). Hedefler SITEMAP §2/§5.
const NAV = [
  {key: 'story', hash: 'hikaye', anchor: true},
  {key: 'products', hash: 'urunler', anchor: true},
  {key: 'blog', href: '/blog', anchor: false},
  {key: 'contact', hash: 'iletisim', anchor: true},
] as const;

export function Header() {
  const t = useTranslations();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const wa = waLink(t('whatsapp.prefill'));
  const pathname = usePathname(); // locale'siz yol: '/' ana sayfa
  const isHome = pathname === '/';

  // Logo → ana sayfa. Ana sayfadayken tam reload yerine en üste smooth kayar.
  const handleBrand = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHome) {
      e.preventDefault();
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({top: 0, behavior: reduce ? 'auto' : 'smooth'});
      history.replaceState(null, '', window.location.pathname);
    }
  };

  // Scroll-condense — saf scroll-listener (rAF ile), Motion yok.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Drawer açıkken gövde kaydırmayı kilitle + Esc ile kapat.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const navLabel = (key: string) => t(`nav.${key}` as 'nav.story');

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="site-header__inner mx-auto max-w-[1200px] px-5 md:px-12">
        <div className="flex items-center justify-between gap-4">
          {/* Sol — logo (geçici wordmark) → locale-aware ana sayfa */}
          <Link
            href="/"
            onClick={handleBrand}
            aria-label={t('a11y.homeAria')}
            className="site-header__brand text-bone"
          >
            <Wordmark />
          </Link>

          {/* Orta — masaüstü nav */}
          <nav aria-label={t('meta.siteName')} className="hidden items-center gap-8 md:flex">
            {NAV.map((item) =>
              item.anchor ? (
                <AnchorLink
                  key={item.key}
                  hash={item.hash}
                  className="type-eyebrow text-bone transition-colors hover:text-brass"
                >
                  {navLabel(item.key)}
                </AnchorLink>
              ) : (
                <Link
                  key={item.key}
                  href={item.href}
                  className="type-eyebrow text-bone transition-colors hover:text-brass"
                >
                  {navLabel(item.key)}
                </Link>
              ),
            )}
          </nav>

          {/* Sağ — masaüstü: dil + birincil WhatsApp */}
          <div className="hidden items-center gap-3 md:flex">
            <LangSwitch className="text-bone" />
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <WhatsAppIcon size={18} />
              {t('hero.ctaPrimary')}
            </a>
          </div>

          {/* Sağ — mobil: her zaman görünür WhatsApp + hamburger */}
          <div className="flex items-center gap-1 md:hidden">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('a11y.whatsappAria')}
              className="inline-flex h-11 w-11 items-center justify-center text-bone"
            >
              <WhatsAppIcon size={22} />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t('a11y.openMenu')}
              aria-expanded={open}
              aria-controls="mobile-drawer"
              className="inline-flex h-11 w-11 items-center justify-center text-bone"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobil — tam ekran drawer */}
      <div
        id="mobile-drawer"
        className="drawer md:hidden"
        data-open={open}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label={t('meta.siteName')}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <Link
            href="/"
            onClick={(e) => {
              setOpen(false);
              handleBrand(e);
            }}
            aria-label={t('a11y.homeAria')}
            className="text-bone"
          >
            <Wordmark className="text-bone" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t('a11y.closeMenu')}
            className="inline-flex h-11 w-11 items-center justify-center text-bone"
          >
            <X size={26} strokeWidth={1.5} />
          </button>
        </div>

        <nav
          aria-label={t('meta.siteName')}
          className="flex flex-1 flex-col justify-center gap-2 px-7"
        >
          {NAV.map((item) =>
            item.anchor ? (
              <AnchorLink
                key={item.key}
                hash={item.hash}
                onNavigate={() => setOpen(false)}
                className="py-2 font-light text-bone transition-colors hover:text-brass"
                style={{fontSize: 'clamp(2rem, 1.2rem + 3vw, 2.75rem)', lineHeight: 1.1}}
              >
                {navLabel(item.key)}
              </AnchorLink>
            ) : (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2 font-light text-bone transition-colors hover:text-brass"
                style={{fontSize: 'clamp(2rem, 1.2rem + 3vw, 2.75rem)', lineHeight: 1.1}}
              >
                {navLabel(item.key)}
              </Link>
            ),
          )}
        </nav>

        <div className="flex flex-col gap-4 px-7 pb-10">
          <hr className="hairline" />
          <div className="flex items-center justify-between">
            <LangSwitch className="text-bone" onSwitch={() => setOpen(false)} />
            <a
              href={telLink()}
              aria-label={t('a11y.callAria')}
              className="inline-flex items-center gap-2 text-cream-soft transition-colors hover:text-brass"
            >
              <Phone size={18} strokeWidth={1.5} />
              <span className="type-body">{t('contact.phone')}</span>
            </a>
          </div>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="btn btn-primary w-full"
          >
            <WhatsAppIcon size={20} />
            {t('hero.ctaPrimary')}
          </a>
        </div>
      </div>
    </header>
  );
}
