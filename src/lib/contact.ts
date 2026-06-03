// İletişim — TEK KAYNAK. Numara/format değişince yalnız burası güncellenir (BUILD-TASKS placeholder politikası).

// Placeholder: gerçek numara gelince değiştir. wa.me biçimi: ülke kodu + numara, '+' ve boşluk yok.
export const WHATSAPP = '+90XXXXXXXXXX';
export const PHONE = '0537 410 8842';

/** wa.me linki + önceden yazılmış mesaj (content.whatsapp.prefill'den gelir). */
export function waLink(prefill: string): string {
  // '+' ve boşlukları at; rakam/placeholder (X) kalsın → wa.me/90XXXXXXXXXX
  const number = WHATSAPP.replace(/[\s+]/g, '');
  return `https://wa.me/${number}?text=${encodeURIComponent(prefill)}`;
}

/** tel: linki — uluslararası biçim (+90, baştaki 0 düşer). */
export function telLink(): string {
  const digits = PHONE.replace(/\D/g, ''); // "05374108842"
  const intl = digits.startsWith('0') ? `+90${digits.slice(1)}` : `+${digits}`;
  return `tel:${intl}`;
}
