'use client';

import {useId, useRef, useState} from 'react';
import {waLink} from '@/lib/contact';
import {WhatsAppIcon} from './ui';
import {EXPLORER_VIEWBOX, SILHOUETTE_D, ZONES, BEEF_MAP, LAMB_MAP} from './explorer-shapes';

/**
 * Et Kâşifi (2D) — KALICI fallback (3D-FEATURE §E).
 * State 3D'den bağımsız: activeAnimal + activeCutId. Faz 3'te Tripo 3D modeli
 * aynı state'e bağlanır; CutMap2D WebGL yok / mobil için kalır.
 */
type Cut = {id: string; name: string; dishes: string; cooking: string};
type Animal = 'beef' | 'lamb';
type Labels = {
  title: string;
  intro: string;
  toggleBeef: string;
  toggleLamb: string;
  dishLabel: string;
  cookLabel: string;
  cta: string;
  waPrefill: string;
};

export function Explorer({beef, lamb, labels}: {beef: Cut[]; lamb: Cut[]; labels: Labels}) {
  // ---- ExplorerState (izole) ----
  const [animal, setAnimal] = useState<Animal>('beef');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [focusId, setFocusId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const cuts = animal === 'beef' ? beef : lamb;
  const map = animal === 'beef' ? BEEF_MAP : LAMB_MAP;
  const active = cuts.find((c) => c.id === activeId) ?? null;
  const labelCut = cuts.find((c) => c.id === (hoverId ?? activeId)) ?? null;

  const switchAnimal = (a: Animal) => {
    if (a === animal) return;
    setAnimal(a);
    setActiveId(null); // toggle değişince seçim sıfırlanır
    setHoverId(null);
  };

  const select = (id: string) => {
    setActiveId(id);
    requestAnimationFrame(() => panelRef.current?.focus());
  };

  // SVG sunum stilleri INLINE verilir (Lightning CSS global fill/stroke'u düşürüyor).
  const silStyle: React.CSSProperties = {
    fill: 'rgba(244,238,228,0.035)',
    stroke: 'var(--color-cream-soft)',
    strokeWidth: 1.25,
    strokeLinejoin: 'round',
    opacity: 0.5,
    pointerEvents: 'none',
  };
  const tipStyle: React.CSSProperties = {
    fill: 'var(--color-bone)',
    stroke: 'var(--color-espresso)',
    strokeWidth: '4px',
    paintOrder: 'stroke',
    fontFamily: 'var(--font-sans)',
    fontWeight: 500,
    fontSize: '13px',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    pointerEvents: 'none',
  };
  const zoneStyle = (id: string, isActive: boolean): React.CSSProperties => {
    if (isActive) return {fill: 'rgba(154,36,36,0.46)', stroke: 'var(--color-et)', strokeWidth: 1.75};
    if (focusId === id) return {fill: 'rgba(154,36,36,0.26)', stroke: 'var(--color-brass)', strokeWidth: 2};
    if (hoverId === id) return {fill: 'rgba(154,36,36,0.26)', stroke: 'var(--color-et)', strokeWidth: 1.5};
    return {fill: 'transparent', stroke: 'rgba(201,190,176,0.22)', strokeWidth: 1};
  };

  return (
    <div className="mt-12 md:mt-16">
      {/* Başlık + AnimalToggle */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="type-heading-sm">{labels.title}</h3>
          <p className="type-body type-body-light mt-3 max-w-[46ch] text-cream-soft">{labels.intro}</p>
        </div>
        <div className="explorer-toggle" role="group" aria-label={labels.title}>
          <button
            type="button"
            className="explorer-toggle__btn"
            data-active={animal === 'beef'}
            aria-pressed={animal === 'beef'}
            onClick={() => switchAnimal('beef')}
          >
            {labels.toggleBeef}
          </button>
          <button
            type="button"
            className="explorer-toggle__btn"
            data-active={animal === 'lamb'}
            aria-pressed={animal === 'lamb'}
            onClick={() => switchAnimal('lamb')}
          >
            {labels.toggleLamb}
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-12 md:gap-12">
        {/* CutMap2D — inline SVG silüet + tıklanabilir bölgeler */}
        <div className="md:col-span-7">
          <svg viewBox={EXPLORER_VIEWBOX} className="explorer-map" role="group" aria-label={labels.title}>
            <path d={SILHOUETTE_D} style={silStyle} />
            {cuts.map((c) => {
              const zone = ZONES[map[c.id]];
              if (!zone) return null;
              const isActive = c.id === activeId;
              return (
                <path
                  key={c.id}
                  d={zone.d}
                  className="explorer-zone"
                  style={zoneStyle(c.id, isActive)}
                  data-active={isActive}
                  role="button"
                  tabIndex={0}
                  aria-label={c.name}
                  aria-pressed={isActive}
                  onPointerEnter={() => setHoverId(c.id)}
                  onPointerLeave={() => setHoverId((h) => (h === c.id ? null : h))}
                  onFocus={() => {
                    setHoverId(c.id);
                    setFocusId(c.id);
                  }}
                  onBlur={() => {
                    setHoverId((h) => (h === c.id ? null : h));
                    setFocusId((f) => (f === c.id ? null : f));
                  }}
                  onClick={() => select(c.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      select(c.id);
                    }
                  }}
                />
              );
            })}
            {labelCut &&
              (() => {
                const z = ZONES[map[labelCut.id]];
                return (
                  <text style={tipStyle} x={z.cx} y={z.cy - 14} textAnchor="middle" aria-hidden="true">
                    {labelCut.name}
                  </text>
                );
              })()}
          </svg>
        </div>

        {/* CutPanel — krem panel, kömür sahnede kontrast */}
        <div className="md:col-span-5">
          <div
            ref={panelRef}
            id={panelId}
            tabIndex={-1}
            className="explorer-panel"
            data-open={!!active}
            aria-live="polite"
          >
            <div className="explorer-panel__content" key={active?.id ?? 'empty'}>
              {active ? (
                <>
                  <p className="type-eyebrow text-brass">
                    {animal === 'beef' ? labels.toggleBeef : labels.toggleLamb}
                  </p>
                  <h4 className="explorer-panel__name">{active.name}</h4>
                  <dl className="mt-6 flex flex-col gap-4">
                    <div>
                      <dt className="type-eyebrow text-ink-soft">{labels.dishLabel}</dt>
                      <dd className="type-body mt-1">{active.dishes}</dd>
                    </div>
                    <div>
                      <dt className="type-eyebrow text-ink-soft">{labels.cookLabel}</dt>
                      <dd className="type-body mt-1">{active.cooking}</dd>
                    </div>
                  </dl>
                  <a
                    href={waLink(labels.waPrefill.replace('{cut}', active.name))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mt-8"
                  >
                    <WhatsAppIcon size={18} />
                    {labels.cta}
                  </a>
                </>
              ) : (
                <p className="type-body type-body-light max-w-[40ch] text-ink-soft">{labels.intro}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
