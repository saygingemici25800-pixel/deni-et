/**
 * Et Kâşifi — SVG geometrisi (içerikten BAĞIMSIZ).
 * Tek şematik dört-ayaklı silüet + 10 anatomik bölge. İçerik (parça adları,
 * yemek, pişirme) content/<locale>.json'dan gelir; burada yalnız KONUM/şekil.
 * beef/lamb cut id'leri → ortak bölge slotlarına eşlenir.
 *
 * Faz 3: Tripo 3D modeli aynı ExplorerState'e (activeAnimal/activeCutId) bağlanır;
 * bu 2D harita WebGL yok / mobil için KALICI fallback olarak kalır.
 */
export const EXPLORER_VIEWBOX = '0 0 440 300';

// Şematik yan-profil silüet (sola bakar) — ince hatlı editoryal illüstrasyon.
export const SILHOUETTE_D =
  'M 30 158 C 30 146 38 133 49 126 C 53 114 56 104 63 107 C 68 109 69 117 75 120 ' +
  'C 95 110 108 100 128 92 C 182 82 252 82 314 86 C 342 88 362 93 379 101 ' +
  'C 390 106 395 117 395 133 C 395 151 391 163 386 173 L 384 250 L 366 250 ' +
  'L 366 178 C 340 184 300 188 262 188 L 178 186 L 178 250 L 160 250 L 160 184 ' +
  'C 150 182 140 176 132 166 C 126 158 122 152 118 150 C 100 152 80 158 64 166 ' +
  'C 54 170 44 168 38 164 C 33 162 30 162 30 158 Z';

export type ZoneKey =
  | 'neck'
  | 'shoulder'
  | 'ribBack'
  | 'loin'
  | 'tenderloin'
  | 'ribs'
  | 'breast'
  | 'leg'
  | 'shank'
  | 'flank';

type Zone = {d: string; cx: number; cy: number};

// 10 bölge polygonu — silüetin üstüne oturur (tam tiling şart değil, silüet altta doldurur).
export const ZONES: Record<ZoneKey, Zone> = {
  neck: {d: 'M 80 120 L 124 95 L 130 120 L 102 142 Z', cx: 103, cy: 120},
  shoulder: {d: 'M 124 95 L 168 87 L 172 150 L 128 150 Z', cx: 148, cy: 119},
  ribBack: {d: 'M 168 87 L 226 84 L 228 128 L 172 128 Z', cx: 198, cy: 106},
  loin: {d: 'M 226 84 L 302 87 L 303 126 L 228 126 Z', cx: 264, cy: 105},
  tenderloin: {d: 'M 232 127 L 302 127 L 302 150 L 234 150 Z', cx: 267, cy: 139},
  ribs: {d: 'M 172 129 L 231 129 L 230 184 L 177 184 Z', cx: 202, cy: 157},
  breast: {d: 'M 128 150 L 172 150 L 176 184 L 150 184 L 132 166 Z', cx: 150, cy: 167},
  leg: {d: 'M 303 88 L 360 93 L 388 128 L 386 173 L 303 150 Z', cx: 344, cy: 127},
  shank: {d: 'M 160 185 L 178 187 L 178 250 L 160 250 Z', cx: 169, cy: 218},
  flank: {d: 'M 234 151 L 301 151 L 301 188 L 233 188 Z', cx: 267, cy: 170},
};

// beef/lamb parça id'si → bölge slotu (anatomik yaklaşık; editoryal harita).
export const BEEF_MAP: Record<string, ZoneKey> = {
  boyun: 'neck',
  kurek: 'shoulder',
  antrikot: 'ribBack',
  kontrfile: 'loin',
  bonfile: 'tenderloin',
  kaburga: 'ribs',
  dos: 'breast',
  but: 'leg',
  incik: 'shank',
  etek: 'flank',
};

export const LAMB_MAP: Record<string, ZoneKey> = {
  boyun: 'neck',
  kol: 'shoulder',
  pirzola: 'ribBack',
  sirt: 'loin',
  bonfile: 'tenderloin',
  kaburga: 'ribs',
  dos: 'breast',
  but: 'leg',
  incik: 'shank',
  gerdan: 'flank',
};
