'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';

/**
 * StoryCarousel — CSS 3D coverflow (three/motion YOK).
 * Hareket saf-CSS transition'larla (globals.css .carousel-card); JS yalnız
 * durum/etkileşim yönetir. Faz 3'te WebGL derinliğiyle zenginleştirmek için izole.
 */
type Card = {title: string; text: string};
type Labels = {carousel: string; prev: string; next: string; slide: string};

export function StoryCarousel({cards, labels}: {cards: Card[]; labels: Labels}) {
  const n = cards.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [dragDx, setDragDx] = useState<number | null>(null);
  const startX = useRef(0);
  const moved = useRef(false);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // prefers-reduced-motion → otomatik akış kapalı + derinlik sadeleşir.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const go = useCallback((dir: number) => setActive((a) => (a + dir + n) % n), [n]);
  const goTo = useCallback((i: number) => setActive(((i % n) + n) % n), [n]);

  // Yavaş otomatik ilerleme — pause (hover/focus), drag veya reduced-motion'da durur.
  useEffect(() => {
    if (reduced || paused || dragDx !== null) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % n), 5200);
    return () => window.clearInterval(id);
  }, [reduced, paused, dragDx, n]);

  // Klavye: ok tuşları + Home/End; roving focus aktif karta taşınır.
  const onKeyDown = (e: React.KeyboardEvent) => {
    let next: number | null = null;
    if (e.key === 'ArrowRight') next = (active + 1) % n;
    else if (e.key === 'ArrowLeft') next = (active - 1 + n) % n;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = n - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    const target = next;
    requestAnimationFrame(() => cardRefs.current[target]?.focus());
  };

  // Pointer/touch sürükleme.
  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    moved.current = false;
    setDragDx(0);
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragDx === null) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 6) moved.current = true;
    setDragDx(dx);
  };
  const endDrag = () => {
    if (dragDx === null) return;
    if (dragDx <= -48) go(1);
    else if (dragDx >= 48) go(-1);
    setDragDx(null);
  };

  // Coverflow transform — reduced-motion'da düz (derinlik yok).
  const transform = (i: number) => {
    const o = i - active;
    const abs = Math.abs(o);
    const dx = dragDx ?? 0;
    if (reduced) {
      return `translate(-50%, -50%) translateX(calc(${o} * 64%)) scale(${o === 0 ? 1 : 0.82})`;
    }
    return `translate(-50%, -50%) translateX(calc(${o} * 42% + ${dx}px)) translateZ(${
      -abs * 170
    }px) rotateY(${o * -40}deg) scale(${Math.max(0.62, 1 - abs * 0.13)})`;
  };
  const opacity = (i: number) => {
    const abs = Math.abs(i - active);
    if (reduced) return abs === 0 ? 1 : 0.35;
    return abs === 0 ? 1 : abs === 1 ? 0.5 : abs === 2 ? 0.22 : 0;
  };

  return (
    <div
      className="story-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
      }}
    >
      <div
        className="carousel-viewport"
        role="group"
        aria-roledescription={labels.carousel}
        aria-label={labels.carousel}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {/* Faz 3: istenirse R3F derinlik katmanı buraya takılır. */}
        {cards.map((c, i) => {
          const isActive = i === active;
          const hidden = opacity(i) === 0;
          return (
            <button
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              type="button"
              tabIndex={isActive ? 0 : -1}
              data-active={isActive}
              aria-roledescription={labels.slide}
              aria-label={`${labels.slide} ${i + 1} / ${n} — ${c.title}`}
              aria-hidden={hidden || undefined}
              className="carousel-card"
              style={{
                transform: transform(i),
                opacity: opacity(i),
                zIndex: 100 - Math.abs(i - active) * 10,
                transition: dragDx !== null ? 'none' : undefined,
                pointerEvents: hidden ? 'none' : undefined,
              }}
              onClick={() => {
                if (moved.current) return; // sürüklemeden sonra tıklamayı yut
                if (!isActive) goTo(i);
              }}
            >
              <span className="type-eyebrow text-brass">{String(i + 1).padStart(2, '0')}</span>
              <span className="carousel-card__title">{c.title}</span>
              <span className="carousel-card__text">{c.text}</span>
            </button>
          );
        })}
      </div>

      <div className="carousel-controls">
        <button type="button" className="carousel-arrow" aria-label={labels.prev} onClick={() => go(-1)}>
          <ChevronLeft size={20} strokeWidth={1.75} />
        </button>
        <ul className="carousel-dots">
          {cards.map((c, i) => (
            <li key={i} className="flex">
              <button
                type="button"
                className="carousel-dot"
                data-active={i === active}
                aria-label={`${labels.slide} ${i + 1}`}
                aria-current={i === active}
                onClick={() => goTo(i)}
              />
            </li>
          ))}
        </ul>
        <button type="button" className="carousel-arrow" aria-label={labels.next} onClick={() => go(1)}>
          <ChevronRight size={20} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
