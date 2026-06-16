'use client';

import {Suspense, useEffect, useRef, useState} from 'react';
import dynamic from 'next/dynamic';
import {useTranslations} from 'next-intl';
import {ChevronDown} from 'lucide-react';
import {waLink} from '@/lib/contact';
import {splitZitlik} from '@/lib/text';
import {WhatsAppIcon} from '@/components/ui';

// 3D sahne yalnız tarayıcıda + lazy + gate sonrası. SSR'de hiç render edilmez.
const BoatScene = dynamic(() => import('./BoatScene').then((m) => m.BoatScene), {ssr: false});

/**
 * /tekne üst bandı — kömür→petrol gradyan + sinematik 3D yat + suya-yansımış CTA.
 * 3D: WebGL var + reduced-motion yok + görünür olunca yüklenir; aksi halde statik premium band.
 */
export function BoatHero() {
  const t = useTranslations();
  const ref = useRef<HTMLElement>(null);
  const [mount, setMount] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(window.matchMedia('(max-width: 767px)').matches);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // statik fallback
    let gl: WebGLRenderingContext | null = null;
    try {
      const c = document.createElement('canvas');
      gl = (c.getContext('webgl2') || c.getContext('webgl')) as WebGLRenderingContext | null;
    } catch {
      gl = null;
    }
    if (!gl) return;
    const el = ref.current;
    if (!el) {
      setMount(true);
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setMount(true);
          io.disconnect();
        }
      },
      {rootMargin: '200px'},
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const wa = waLink(t('boat.prefillList'));
  const [bThin, bBold] = splitZitlik(t('boat.title'));

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden text-bone"
      style={{background: 'linear-gradient(180deg, #1A1411 0%, #14201F 56%, #0E1A1C 100%)'}}
    >
      {/* Üstte hafif sis/atmosfer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-1/3"
        style={{background: 'linear-gradient(180deg, rgba(180,192,188,0.10), transparent)'}}
      />

      {/* 3D sahne (gate sonrası) */}
      <div aria-hidden="true" className="absolute inset-0 z-0">
        {mount && (
          <Suspense fallback={null}>
            <BoatScene mobile={mobile} reduced={false} />
          </Suspense>
        )}
      </div>

      {/* İçerik katmanı — DOM */}
      <div className="relative z-10 mx-auto flex min-h-[74svh] max-w-[1200px] flex-col px-5 pb-14 pt-36 md:min-h-[82svh] md:px-12 md:pt-44">
        <div className="max-w-[42ch]">
          <p className="type-eyebrow">{t('boat.eyebrow')}</p>
          <h1 className="type-statement mt-4" style={{fontSize: 'clamp(2.1rem, 1.4rem + 3.4vw, 4rem)'}}>
            <span className="thin">
              {bThin}
              {bBold ? ' ' : ''}
            </span>
            {bBold && <span className="bold text-brass">{bBold}</span>}
          </h1>
          <p className="type-body type-body-light mt-5 max-w-[46ch] text-cream-soft">{t('boat.text')}</p>
          {/* CTA — yatın yanında net buton grubu (suya-yansımış mirror efekti kaldırıldı) */}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <WhatsAppIcon size={18} />
              {t('boat.cta')}
            </a>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-outline-cream">
              {t('boat.ctaSecondary')}
            </a>
          </div>
        </div>

        {/* Aşağı scroll cue */}
        <div className="mt-auto flex justify-center pt-12">
          <ChevronDown aria-hidden="true" size={22} className="text-cream-soft" style={{opacity: 0.6}} />
        </div>
      </div>
    </section>
  );
}
