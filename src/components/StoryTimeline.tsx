'use client';

import {useEffect, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import {splitZitlik} from '@/lib/text';

type Milestone = {year: string; title: string; text: string};

const wrap = 'mx-auto max-w-[1200px] px-5 md:px-12';

/* #hikaye-timeline — YATAY zaman şeridi (5 kilometre taşı).
   MASAÜSTÜ + hareket: "sticky horizontal scroll" — dış section yüksek; içeride sticky
   viewport; dikey scroll ilerlemesi (scroll progress) → track translateX (yıllar sağa akar).
   Bölüm bitince sticky bırakır → normal dikey scroll'a temiz geçer (kilit yok).
   MOBİL veya reduced-motion: scroll-jacking YOK → basit overflow-x:auto + scroll-snap. */
export function StoryTimeline() {
  const t = useTranslations();
  const milestones = t.raw('timeline.milestones') as Milestone[];
  const [thin, bold] = splitZitlik(t('timeline.title'));

  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [enhanced, setEnhanced] = useState(false); // masaüstü + hareket → sticky yatay akış
  const [tx, setTx] = useState(0); // track translateX (px)
  const [sectionH, setSectionH] = useState<number | undefined>(undefined);

  // Mod seçimi: yalnız (min-width:768px) VE reduced-motion yok → sticky yatay akış.
  useEffect(() => {
    const mqDesktop = window.matchMedia('(min-width: 768px)');
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compute = () => setEnhanced(mqDesktop.matches && !mqReduce.matches);
    compute();
    mqDesktop.addEventListener('change', compute);
    mqReduce.addEventListener('change', compute);
    return () => {
      mqDesktop.removeEventListener('change', compute);
      mqReduce.removeEventListener('change', compute);
    };
  }, []);

  // Sticky modu: yatay taşma kadar section yüksekliği ver + scroll → translateX bağla.
  useEffect(() => {
    if (!enhanced) {
      setSectionH(undefined);
      setTx(0);
      return;
    }
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!section || !sticky || !track) return;

    let overflow = 0;
    let stickyH = 0;
    let raf = 0;

    const measure = () => {
      stickyH = sticky.offsetHeight;
      overflow = Math.max(0, track.scrollWidth - sticky.clientWidth);
      setSectionH(stickyH + overflow); // dikey scroll mesafesi = yatay taşma
    };
    const update = () => {
      if (overflow <= 0) {
        setTx(0);
        return;
      }
      const top = section.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, -top / overflow)); // 0→1 scroll ilerlemesi
      setTx(-p * overflow);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      update();
    };

    measure();
    update();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, [enhanced, milestones.length]);

  const heading = (
    <div className={`${wrap} ${enhanced ? 'pt-20 md:pt-24' : 'pt-10 md:pt-12'} shrink-0 text-center`}>
      <p className="type-eyebrow">{t('timeline.eyebrow')}</p>
      <h2 className="type-statement mt-3 text-bone" style={{fontSize: 'clamp(1.6rem, 1.2rem + 2vw, 2.6rem)'}}>
        <span className="thin">
          {thin}
          {bold ? ' ' : ''}
        </span>
        {bold && <span className="bold text-brass">{bold}</span>}
      </h2>
    </div>
  );

  const track = (
    <div
      ref={trackRef}
      className="relative flex items-start gap-7 px-5 md:gap-12 md:px-12"
      style={enhanced ? {transform: `translateX(${tx}px)`, willChange: 'transform'} : undefined}
    >
      {/* Yatay bağlantı çizgisi — düğümlerin arkasında, kartlarla birlikte kayar */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 top-4 border-t border-dashed"
        style={{borderColor: 'rgba(200,149,28,0.5)'}}
      />
      {milestones.map((m) => (
        <article
          key={m.year}
          className="relative flex w-[78vw] max-w-[300px] shrink-0 snap-center flex-col md:w-[340px] md:max-w-none md:snap-start"
        >
          {/* Düğüm — sade brass halkalı nokta, çizgi üzerinde */}
          <div className="flex h-8 items-center">
            <span
              className="relative z-10 h-3.5 w-3.5 rounded-full border-2 bg-[color:var(--color-espresso)]"
              style={{borderColor: 'var(--color-brass)'}}
            />
          </div>
          <p
            className="mt-4 font-thin leading-none text-brass"
            style={{fontSize: 'clamp(2rem, 1.4rem + 1.6vw, 3rem)', letterSpacing: '-0.02em'}}
          >
            {m.year}
          </p>
          <h3 className="type-heading-sm mt-3 text-bone">{m.title}</h3>
          <p className="type-body type-body-light mt-2 text-cream-soft">{m.text}</p>
        </article>
      ))}
    </div>
  );

  // SADE mod (mobil / reduced-motion): basit yatay kaydırma + snap, normal yükseklik.
  if (!enhanced) {
    return (
      <section id="hikaye-timeline" ref={sectionRef} className="surface-charcoal scroll-mt-24 pb-12 md:scroll-mt-28 md:pb-14">
        {heading}
        <div className="mt-8 overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {track}
        </div>
      </section>
    );
  }

  // STICKY YATAY AKIŞ (masaüstü + hareket).
  return (
    <section
      id="hikaye-timeline"
      ref={sectionRef}
      className="surface-charcoal scroll-mt-24 md:scroll-mt-28"
      style={{height: sectionH}}
    >
      <div ref={stickyRef} className="sticky top-0 flex h-[78vh] min-h-[460px] flex-col overflow-hidden">
        {heading}
        <div className="flex flex-1 items-center overflow-hidden pb-10">{track}</div>
      </div>
    </section>
  );
}
