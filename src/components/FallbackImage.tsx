'use client';

import {useState, type ReactNode} from 'react';
import Image from 'next/image';

/* Ürün görseli — varsa <Image fill> göster, dosya yoksa/yüklenmezse (onError) verilen
   zarif placeholder'a düş. Böylece public/products/{id}.jpg eksikken kırılma olmaz.
   Konteyner (aspect/border/zemin) çağıran tarafta kalır; bu bileşen yalnız içeriği doldurur. */
export function FallbackImage({
  src,
  alt,
  sizes,
  className = 'object-cover',
  fallback,
}: {
  src?: string;
  alt: string;
  sizes?: string;
  className?: string;
  fallback: ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <>{fallback}</>;
  return <Image src={src} alt={alt} fill sizes={sizes} className={className} onError={() => setFailed(true)} />;
}
