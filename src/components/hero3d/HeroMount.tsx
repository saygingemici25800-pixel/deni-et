'use client';

import {useEffect, useRef, useState, type ReactNode} from 'react';
import dynamic from 'next/dynamic';

// 3D yalnız tarayıcıda + masaüstünde yüklenir; SSR'de hiç render edilmez.
const Hero3D = dynamic(() => import('./Hero3D').then((m) => m.Hero3D), {ssr: false});

/**
 * Statik hero (fallback) ↔ 3D hero geçiş kapısı.
 * 3D YÜKLENİR: WebGL var + reduced-motion yok + görünür olunca (lazy) — MASAÜSTÜ VE MOBİL.
 * WebGL yok / reduced-motion → sunucudan gelen statik hero (poster) olduğu gibi kalır.
 */
export function HeroMount({fallback}: {fallback: ReactNode}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mount3d, setMount3d] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    // WebGL desteği
    let gl: WebGLRenderingContext | null = null;
    try {
      const c = document.createElement('canvas');
      gl = (c.getContext('webgl2') || c.getContext('webgl')) as WebGLRenderingContext | null;
    } catch {
      gl = null;
    }
    if (!gl) return;

    // Lazy: görünür olunca yükle (hero üstte → hemen tetiklenir).
    const el = ref.current;
    if (!el) {
      setMount3d(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMount3d(true);
          io.disconnect();
        }
      },
      {rootMargin: '200px'},
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{mount3d ? <Hero3D /> : fallback}</div>;
}
