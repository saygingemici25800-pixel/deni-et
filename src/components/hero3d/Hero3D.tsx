'use client';

import {Suspense, useEffect, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import {X, UtensilsCrossed, Flame} from 'lucide-react';
import {Canvas} from '@react-three/fiber';
import {ContactShadows} from '@react-three/drei';
import {waLink} from '@/lib/contact';
import {WhatsAppIcon} from '../ui';
import {CowModel} from './CowModel';
import {CameraFit} from './CameraFit';
import {REGIONS} from './cuts';

type CutData = {id: string; name: string; dishes: string; cooking: string};

// Kart/tooltip/pill geçişleri. globals'a dokunmamak için yerel <style>.
const SCENE_CSS = `
.denizet-card{opacity:0;transform:translateY(10px);pointer-events:none;transition:opacity .35s ease,transform .35s cubic-bezier(.2,.6,.2,1);}
.denizet-card[data-open="true"]{opacity:1;transform:translateY(0);pointer-events:auto;}
.denizet-tip{opacity:0;transition:opacity .15s ease;}
.denizet-tip[data-show="true"]{opacity:1;}
.denizet-pill{transition:opacity .5s ease,transform .5s ease;animation:denizet-pill-pulse 2.4s ease-in-out infinite;}
.denizet-pill[data-hide="true"]{opacity:0;transform:translateY(8px);pointer-events:none;}
@keyframes denizet-pill-pulse{0%,100%{box-shadow:0 0 0 0 rgba(154,36,36,0);}50%{box-shadow:0 0 0 5px rgba(154,36,36,0.10);}}
@media (prefers-reduced-motion: reduce){.denizet-card,.denizet-pill,.denizet-tip{transition:none;}.denizet-pill{animation:none;}}
`;

export function Hero3D() {
  const t = useTranslations();
  // Hero3D yalnız client'ta mount olur (ssr:false) → window güvenli.
  const [isMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches,
  );
  const [selected, setSelected] = useState<number | null>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [explored, setExplored] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mobilde seçim yapılınca kartı görünüme kaydır (dana + kart birlikte görünsün).
  useEffect(() => {
    if (!isMobile || selected == null) return;
    const el = cardRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block: 'center'});
  }, [selected, isMobile]);

  const beef = t.raw('explorer.beef') as CutData[];
  const byId = (id: string) => beef.find((b) => b.id === id);
  const waPrefill = t.raw('explorer.panel.waPrefill') as string;
  const defaultWa = waLink(t('whatsapp.prefill'));

  const cut = selected != null ? byId(REGIONS[selected].id) : undefined;
  const cardWa = cut ? waLink(waPrefill.replace('{cut}', cut.name)) : defaultWa;
  const num = selected != null ? String(selected + 1).padStart(2, '0') : '';
  const hoverName = hoverIdx != null ? (byId(REGIONS[hoverIdx].id)?.name ?? '') : '';
  const mark = (t('meta.siteName').split('·')[0] ?? '').trim().toLocaleUpperCase('tr');

  const handleHover = (i: number | null) => setHoverIdx(i);
  // Keşfet pill'i YALNIZ ilk bölge seçiminde kaybolur (state-only → refresh'te döner).
  const handleSelect = (i: number) => {
    setSelected(i);
    setExplored(true);
  };

  // Tooltip'i imlece yapıştır (yalnız masaüstü hover).
  const onAreaMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = areaRef.current;
    const tip = tipRef.current;
    if (!el || !tip) return;
    const r = el.getBoundingClientRect();
    tip.style.transform = `translate(${e.clientX - r.left}px, ${e.clientY - r.top}px)`;
  };

  return (
    <section
      id="hero"
      className="relative isolate min-h-[100svh] overflow-hidden"
      style={{
        background:
          'radial-gradient(125% 100% at 50% 0%, #F8F3EA 0%, #F4EEE4 45%, #EFE6D6 100%)',
      }}
    >
      <style>{SCENE_CSS}</style>

      {/* Çok soluk büyük arka wordmark (yalnız geniş ekran). */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute right-[4%] top-1/2 hidden -translate-y-1/2 select-none font-bold leading-none text-ink lg:block"
        style={{fontSize: 'min(30vw, 26rem)', opacity: 0.045, letterSpacing: '-0.04em'}}
      >
        {mark.split(' ').pop()}
      </p>

      {/* Mobil: dikey yığın (canvas üstte) · Masaüstü: yan yana (içerik solda). */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col md:flex-row md:items-center md:gap-8 md:px-12">
        {/* İÇERİK — mobilde canvas'ın altında, masaüstünde solda */}
        <div className="relative order-2 w-full px-5 pb-12 md:order-1 md:w-[340px] md:shrink-0 md:px-0 md:pb-0">
          {/* MOBİL parça çipleri — sahnenin hemen altında; dokun → bölge seçilir + kart açılır */}
          <div className="md:hidden">
            <p className="type-eyebrow text-ink-soft">{t('explorer.exploreHint')}</p>
            <div className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1">
              {REGIONS.map((r, i) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleSelect(i)}
                  className={`inline-flex min-h-[44px] shrink-0 items-center rounded-full border px-4 transition-colors ${
                    selected === i
                      ? 'border-[color:var(--color-et)] bg-[color:var(--color-et)] text-bone'
                      : 'border-[color:var(--line)] text-et'
                  }`}
                >
                  <span className="type-eyebrow">{byId(r.id)?.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bilgi kartı — masaüstü: sol overlay (top) · mobil: canvas'ın hemen altında normal akış (kapalıyken collapse) */}
          <div
            ref={cardRef}
            className={`denizet-card relative w-full overflow-hidden rounded-lg border border-[color:var(--line)] border-l-2 border-l-[color:var(--color-et)] bg-bone shadow-[0_14px_44px_-16px_rgba(26,20,17,0.45)] md:absolute md:inset-x-0 md:top-0 md:mt-0 md:rounded-none md:p-6 ${
              selected != null ? 'mt-3 p-4' : 'p-0'
            }`}
            data-open={selected != null}
            aria-hidden={selected == null}
            role="dialog"
            aria-label={cut?.name}
          >
            {cut && (
              <>
                <div className="flex items-start justify-between">
                  <p className="type-eyebrow text-et">{t('explorer.title')}</p>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    aria-label={t('a11y.closeMenu')}
                    className="-mr-1 -mt-1 inline-flex h-9 w-9 items-center justify-center text-ink-soft transition-colors hover:text-et"
                  >
                    <X size={20} strokeWidth={1.75} />
                  </button>
                </div>

                <div className="relative mt-2 max-md:mt-1">
                  <span
                    aria-hidden="true"
                    className="absolute -top-3 right-0 font-thin leading-none text-brass max-md:hidden"
                    style={{fontSize: '3.6rem', opacity: 0.16, letterSpacing: '-0.04em'}}
                  >
                    {num}
                  </span>
                  <h2
                    className="type-heading relative max-w-[12ch] text-ink max-md:max-w-none max-md:text-[1.6rem] max-md:leading-tight"
                    style={{fontWeight: 500}}
                  >
                    {cut.name}
                  </h2>
                </div>

                <hr className="hairline mt-4 max-md:mt-3" />

                <dl className="mt-4 space-y-3 max-md:mt-3 max-md:space-y-2">
                  <div className="flex items-start gap-3">
                    <UtensilsCrossed size={18} strokeWidth={1.75} aria-hidden="true" className="mt-1 shrink-0 text-et" />
                    <div>
                      <dt className="type-eyebrow text-ink-soft">{t('explorer.panel.dishLabel')}</dt>
                      <dd className="type-body mt-0.5 text-ink">{cut.dishes}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Flame size={18} strokeWidth={1.75} aria-hidden="true" className="mt-1 shrink-0 text-et" />
                    <div>
                      <dt className="type-eyebrow text-ink-soft">{t('explorer.panel.cookLabel')}</dt>
                      <dd className="type-body mt-0.5 text-ink">{cut.cooking}</dd>
                    </div>
                  </div>
                </dl>

                <a
                  href={cardWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-6 w-full max-md:mt-4"
                >
                  <WhatsAppIcon size={18} />
                  {t('explorer.panel.cta')}
                </a>
              </>
            )}
          </div>

          {/* Mikro içerik (marka) — mobilde explorer'ın altında, masaüstünde kolonun üstünde */}
          <div className="mt-10 max-w-[330px] md:mt-0">
            <p className="type-eyebrow">{t('hero.eyebrow')}</p>
            <p className="hero-heritage">{t('hero.heritage')}</p>
            <p className="type-heading-sm mt-5 max-w-[24ch] font-light text-ink">{t('hero.title')}</p>
            <a
              href={defaultWa}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-7"
            >
              <WhatsAppIcon size={18} />
              {t('hero.ctaPrimary')}
            </a>
          </div>
        </div>

        {/* CANVAS — mobilde üstte tam genişlik (h ~70svh), masaüstünde sağda tam yükseklik */}
        <div
          ref={areaRef}
          onPointerMove={onAreaMove}
          className="relative order-1 h-[50svh] w-full md:order-2 md:h-[100svh] md:flex-1"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[70%] h-[26vh] w-[78%] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                'radial-gradient(50% 50% at 50% 50%, rgba(122,128,82,0.30) 0%, rgba(122,128,82,0.14) 42%, rgba(122,128,82,0) 72%)',
              filter: 'blur(34px)',
            }}
          />
          <div aria-hidden="true" className="absolute inset-0">
            <Canvas
              dpr={isMobile ? [1, 1.5] : [1, 2]}
              shadows
              camera={{position: [6, 1, 0], fov: isMobile ? 38 : 30}}
              gl={{alpha: true, antialias: true}}
              onPointerMissed={() => setSelected(null)}
            >
              <CameraFit mobile={isMobile} />
              <ambientLight intensity={0.7} color="#FFF3E0" />
              <hemisphereLight args={['#FFF3E0', '#E8DECF', 0.5]} />
              <directionalLight
                position={[4, 6, 3]}
                intensity={1.5}
                color="#FFE7C2"
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />
              <directionalLight position={[-4, 2, -4]} intensity={0.5} color="#C8951C" />
              <Suspense fallback={null}>
                <CowModel selected={selected} onSelect={handleSelect} onHover={handleHover} touch={isMobile} />
                <ContactShadows
                  position={[0, 0.01, 0]}
                  opacity={0.35}
                  scale={7}
                  blur={2.6}
                  far={3}
                  resolution={512}
                  color="#2A1D12"
                />
              </Suspense>
            </Canvas>
          </div>

          {/* Hover tooltip — yalnız masaüstü (touch'ta gizli). */}
          <div
            ref={tipRef}
            aria-hidden="true"
            className="denizet-tip pointer-events-none absolute left-0 top-0 z-20 hidden md:block"
            data-show={hoverIdx != null}
          >
            <span
              className="type-eyebrow block whitespace-nowrap rounded-sm bg-[color:var(--color-espresso)] px-2.5 py-1 text-bone"
              style={{transform: 'translate(-50%, calc(-100% - 12px))'}}
            >
              {hoverName}
            </span>
          </div>

          {/* Keşfet affordance — ilk bölge SEÇİMİNE kadar kalıcı; tıkları engellemez. */}
          <div
            aria-hidden="true"
            data-hide={explored}
            className="denizet-pill pointer-events-none absolute bottom-[7%] left-1/2 z-20 inline-flex max-w-[90%] -translate-x-1/2 items-center gap-2 rounded-full border border-[color:var(--color-et)] bg-bone/85 px-4 py-2 text-et backdrop-blur-sm"
          >
            <span aria-hidden="true">🖐</span>
            <span className="type-eyebrow whitespace-nowrap">{t('explorer.exploreHint')}</span>
          </div>
        </div>
      </div>

      {/* Klavye erişimi — görünmez bölge listesi. */}
      <ul className="sr-only">
        {REGIONS.map((r, i) => (
          <li key={r.id}>
            <button type="button" onClick={() => setSelected(i)}>
              {byId(r.id)?.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
