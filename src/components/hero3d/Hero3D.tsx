'use client';

import {Suspense, useState} from 'react';
import {useTranslations} from 'next-intl';
import {X} from 'lucide-react';
import {Canvas} from '@react-three/fiber';
import {ContactShadows} from '@react-three/drei';
import {waLink} from '@/lib/contact';
import {WhatsAppIcon} from '../ui';
import {CowModel} from './CowModel';
import {CameraRig} from './CameraRig';
import {CUTS} from './cuts';

type CutData = {id: string; name: string; dishes: string; cooking: string};

// Sahne içi sabit-stil hotspot + kart geçişi. globals'a dokunmamak için yerel <style>.
const SCENE_CSS = `
.denizet-hs{width:18px;height:18px;border-radius:9999px;border:2px solid #9A2424;background:rgba(154,36,36,.14);cursor:pointer;position:relative;display:block;padding:0;}
.denizet-hs::after{content:'';position:absolute;inset:-3px;border-radius:9999px;border:2px solid #9A2424;animation:denizet-hs-pulse 2.4s ease-in-out infinite;}
.denizet-hs:hover,.denizet-hs[data-on="true"]{background:#9A2424;}
.denizet-hs[data-on="true"]::after{border-color:#C8951C;}
@keyframes denizet-hs-pulse{0%,100%{transform:scale(1);opacity:.85;}50%{transform:scale(1.45);opacity:.25;}}
@media (prefers-reduced-motion: reduce){.denizet-hs::after{animation:none;}}
.denizet-card{opacity:0;transform:translateY(-8px);pointer-events:none;transition:opacity .45s ease,transform .45s cubic-bezier(.2,.6,.2,1);}
.denizet-card[data-open="true"]{opacity:1;transform:translateY(0);pointer-events:auto;}
`;

export function Hero3D() {
  const t = useTranslations();
  const [selected, setSelected] = useState<number | null>(null);

  const beef = t.raw('explorer.beef') as CutData[];
  const byId = (id: string) => beef.find((b) => b.id === id);
  const waPrefill = t.raw('explorer.panel.waPrefill') as string;
  const defaultWa = waLink(t('whatsapp.prefill'));

  const cut = selected != null ? byId(CUTS[selected].id) : undefined;
  const cardWa = cut ? waLink(waPrefill.replace('{cut}', cut.name)) : defaultWa;

  const mark = (t('meta.siteName').split('·')[0] ?? '').trim().toLocaleUpperCase('tr');

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

      {/* Çok soluk büyük arka wordmark (opsiyonel, palet içi). */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute right-[4%] top-1/2 hidden -translate-y-1/2 select-none font-bold leading-none text-ink lg:block"
        style={{fontSize: 'min(30vw, 26rem)', opacity: 0.045, letterSpacing: '-0.04em'}}
      >
        {mark.split(' ').pop()}
      </p>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] items-center gap-8 px-12">
        {/* SOL — sessiz mikro-içerik + üstünde bilgi kartı */}
        <div className="relative w-[340px] shrink-0">
          {/* Mikro-içerik (sahne nefes alsın; dev tipografi yok) */}
          <div className="max-w-[320px]">
            <p className="type-eyebrow">{t('hero.eyebrow')}</p>
            <p className="hero-heritage">{t('hero.heritage')}</p>
            <p className="type-body type-body-light mt-5 max-w-[30ch] text-ink-soft">
              {t('hero.title')}
            </p>
            <a
              href={defaultWa}
              target="_blank"
              rel="noopener noreferrer"
              className="type-eyebrow mt-6 inline-flex items-center gap-2 text-et transition-colors hover:text-et-deep"
            >
              <WhatsAppIcon size={16} />
              {t('hero.ctaPrimary')}
            </a>
          </div>

          {/* Bilgi kartı — mikro-içeriğin ÜSTÜNDE overlay; yumuşak belirir */}
          <div
            className="denizet-card absolute inset-x-0 top-0 border border-[color:var(--line)] bg-bone-2/95 p-6 backdrop-blur-sm"
            data-open={selected != null}
            aria-hidden={selected == null}
            role="dialog"
            aria-label={cut?.name}
          >
            {cut && (
              <>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label={t('a11y.closeMenu')}
                  className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center text-ink-soft transition-colors hover:text-et"
                >
                  <X size={20} strokeWidth={1.75} />
                </button>
                <p className="type-eyebrow text-et">{t('explorer.title')}</p>
                <h2 className="type-heading-sm mt-2 max-w-[16ch] text-ink">{cut.name}</h2>
                <dl className="mt-4 space-y-3">
                  <div>
                    <dt className="type-eyebrow text-ink-soft">{t('explorer.panel.dishLabel')}</dt>
                    <dd className="type-body mt-0.5 text-ink">{cut.dishes}</dd>
                  </div>
                  <div>
                    <dt className="type-eyebrow text-ink-soft">{t('explorer.panel.cookLabel')}</dt>
                    <dd className="type-body mt-0.5 text-ink">{cut.cooking}</dd>
                  </div>
                </dl>
                <a
                  href={cardWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-6 w-full"
                >
                  <WhatsAppIcon size={18} />
                  {t('explorer.panel.cta')}
                </a>
              </>
            )}
          </div>
        </div>

        {/* SAĞ — 3D sahne (krem zemin + temas gölgesi + çayır iması) */}
        <div className="relative h-[100svh] flex-1">
          {/* Çok soluk çayır iması — zeytin/adaçayı, bulanık bokeh (palet içi). */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[64%] h-[26vh] w-[64%] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                'radial-gradient(50% 50% at 50% 50%, rgba(124,128,86,0.24) 0%, rgba(124,128,86,0.10) 45%, rgba(124,128,86,0) 74%)',
              filter: 'blur(30px)',
            }}
          />
          <div aria-hidden="true" className="absolute inset-0">
            <Canvas
              dpr={[1, 2]}
              shadows
              camera={{position: [5, 1.15, 0], fov: 30}}
              gl={{alpha: true, antialias: true}}
            >
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
                <CowModel selected={selected} onSelect={setSelected} />
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
              <CameraRig selected={selected} />
            </Canvas>
          </div>
        </div>
      </div>

      {/* Klavye erişimi — görünmez hotspot listesi (3D katmanı aria-hidden). */}
      <ul className="sr-only">
        {CUTS.map((c, i) => (
          <li key={c.id}>
            <button type="button" onClick={() => setSelected(i)}>
              {byId(c.id)?.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
