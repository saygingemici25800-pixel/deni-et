'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';

// Avatar yığını — gerçek foto YOK; teslimat bölgelerinin baş harfleri (Fethiye/Muğla/Kuşadası).
const STACK = [
  {key: 'F', cls: 'bg-[color:var(--color-et)] text-bone'},
  {key: 'M', cls: 'bg-[color:var(--color-espresso)] text-bone'},
  {key: 'K', cls: 'bg-[color:var(--color-brass)] text-ink'},
];

/**
 * Sabit güven rozeti — sol-alt köşe (sağ-altta WhatsApp FAB var, çakışmaz).
 * Global ama diskret; mobilde gizli. Tıkla → /tekne. Giriş animasyonu globals'ta (reduced-motion saygılı).
 */
export function TrustBadge() {
  const t = useTranslations();
  return (
    <Link
      href="/tekne"
      aria-label={t('trustBadge.text')}
      className="trust-badge fixed bottom-5 left-5 z-40 hidden items-center gap-3 rounded-full border border-[color:var(--line)] bg-bone/95 py-2 pl-3 pr-4 shadow-[0_12px_32px_-14px_rgba(26,20,17,0.45)] backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5 md:inline-flex"
    >
      <div className="flex -space-x-2" aria-hidden="true">
        {STACK.map((p) => (
          <Avatar key={p.key} className="size-7 ring-2 ring-[color:var(--color-bone)]">
            <AvatarFallback className={`text-[0.68rem] font-bold ${p.cls}`}>{p.key}</AvatarFallback>
          </Avatar>
        ))}
      </div>
      <div className="leading-tight">
        <p className="font-medium text-ink" style={{fontSize: '0.8rem'}}>
          {t('trustBadge.text')}
        </p>
        <p className="text-ink-soft" style={{fontSize: '0.7rem'}}>
          {t('trustBadge.sub')}
        </p>
      </div>
    </Link>
  );
}
