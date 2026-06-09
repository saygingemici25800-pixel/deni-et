'use client';

import type {CSSProperties, ReactNode} from 'react';
import {Link, usePathname} from '@/i18n/navigation';

/**
 * Locale-aware kök+anchor linki. Hedef her zaman "/#<hash>" (örn. /tr/#urunler):
 * - Alt sayfadayken (ör. /blog) → ana sayfaya gidip bölüme kayar (normal navigasyon).
 * - Ana sayfadayken → tam reload yok; preventDefault + smooth scrollIntoView.
 * reduced-motion'a saygılı. Stil dışarıdan className/style ile verilir (görünüm değişmez).
 */
export function AnchorLink({
  hash,
  className,
  style,
  onNavigate,
  children,
}: {
  hash: string;
  className?: string;
  style?: CSSProperties;
  onNavigate?: () => void;
  children: ReactNode;
}) {
  const pathname = usePathname(); // locale'siz yol: '/' ana sayfa, '/blog' alt sayfa

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();
    // Yalnız ana sayfadayken aynı-sayfa smooth scroll; alt sayfada normal navigasyon.
    if (pathname === '/') {
      const el = document.getElementById(hash);
      if (el) {
        e.preventDefault();
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block: 'start'});
        history.replaceState(null, '', `#${hash}`);
      }
    }
  };

  return (
    <Link href={`/#${hash}`} onClick={handleClick} className={className} style={style}>
      {children}
    </Link>
  );
}
