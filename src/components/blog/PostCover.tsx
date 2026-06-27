import type {PostCoverSpec} from '@/content/posts';

/* Blog kapak placeholder'ı — gerçek foto gelene dek. Tona göre gradyan (kömür/bordo/krem)
   + motif SVG (bıçak/köz/duman) + başlık filigranı. Saf (hook yok) → server uyumlu.
   Bir `group` (Link) içinde hover'da hafif zoom; aria-hidden (dekoratif). */

const GRADIENTS: Record<PostCoverSpec['tone'], string> = {
  char: 'linear-gradient(135deg, #241B16 0%, #130F0C 100%)',
  bordo: 'linear-gradient(135deg, #990011 0%, #2A1411 100%)',
  cream: 'linear-gradient(135deg, #F6F1E8 0%, #E2D6C4 100%)',
};

function Motif({motif, ink, brass}: {motif: PostCoverSpec['motif']; ink: string; brass: string}) {
  if (motif === 'ember') {
    return (
      <>
        <defs>
          <radialGradient id="pc-ember" cx="50%" cy="64%" r="55%">
            <stop offset="0%" stopColor={brass} stopOpacity="0.5" />
            <stop offset="100%" stopColor={brass} stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="200" cy="196" rx="150" ry="46" fill="url(#pc-ember)" />
        <g fill={brass} opacity="0.7">
          <circle cx="158" cy="190" r="6" />
          <circle cx="205" cy="180" r="8" />
          <circle cx="250" cy="192" r="6" />
          <circle cx="184" cy="204" r="4" />
          <circle cx="230" cy="205" r="5" />
        </g>
      </>
    );
  }
  if (motif === 'smoke') {
    return (
      <g stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.26">
        <path d="M150 252 C140 212, 176 196, 160 156 C150 126, 176 110, 166 80" />
        <path d="M210 256 C200 216, 236 200, 220 160 C210 130, 236 114, 226 84" />
        <path d="M266 250 C256 214, 286 200, 272 162 C262 134, 286 120, 278 92" />
      </g>
    );
  }
  // cleaver (bıçak)
  return (
    <g stroke={ink} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" opacity="0.5">
      <path d="M96 152 L300 108 C318 104, 330 118, 314 130 L150 198 L108 190 Z" />
      <line x1="108" y1="190" x2="96" y2="152" opacity="0.5" />
      <path d="M150 198 L130 238" />
      <path d="M130 238 L118 264 L154 264 L142 238 Z" />
    </g>
  );
}

export function PostCover({
  tone,
  motif,
  label,
  className,
}: {
  tone: PostCoverSpec['tone'];
  motif: PostCoverSpec['motif'];
  label: string;
  className?: string;
}) {
  const dark = tone !== 'cream';
  const ink = dark ? '#FCF6F5' : '#1A1411';
  const brass = '#FFD662';
  return (
    <div className={`relative overflow-hidden ${className ?? ''}`} aria-hidden="true">
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transition-none"
        style={{background: GRADIENTS[tone]}}
      >
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          <Motif motif={motif} ink={ink} brass={brass} />
        </svg>
      </div>
      {/* Başlık filigranı */}
      <span
        className="pointer-events-none absolute bottom-4 right-5 max-w-[82%] text-right font-bold leading-[0.95]"
        style={{
          color: ink,
          opacity: dark ? 0.12 : 0.09,
          fontSize: 'clamp(1.3rem, 0.9rem + 2.4vw, 2.8rem)',
          letterSpacing: '-0.02em',
        }}
      >
        {label}
      </span>
    </div>
  );
}
