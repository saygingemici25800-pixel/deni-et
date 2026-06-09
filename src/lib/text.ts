// Tipografik ZITLIK yardımcıları — Bonny ince↔kalın gerilimi (DESIGN-SYSTEM §3).
// Ana sayfadaki sections.tsx kendi private kopyasını kullanır; blog buradan tüketir.

// Son cümle/clause'u ayır: gerisi ince (Thin), son parça kalın (Bold).
export function splitZitlik(s: string): [string, string] {
  const delims = [', ', '? ', '! ', '. ', '; '];
  let idx = -1;
  let len = 0;
  for (const d of delims) {
    const i = s.lastIndexOf(d);
    if (i > idx) {
      idx = i;
      len = d.length;
    }
  }
  if (idx < 0) return [s, ''];
  return [s.slice(0, idx + len - 1), s.slice(idx + len)];
}

// Kısa statement'lar için: son kelimeyi kalın yap (cümle ayracı yoksa).
export function splitLastWord(s: string): [string, string] {
  const trimmed = s.trimEnd();
  const i = trimmed.lastIndexOf(' ');
  if (i < 0) return ['', s];
  return [s.slice(0, i), s.slice(i + 1)];
}
