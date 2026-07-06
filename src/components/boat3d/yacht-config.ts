// Yat (yacht.glb — YELKENLİ) ölçü sabitleri — ÖLÇÜLDÜ: taban y=0, yarı-boyutlar X 0.264 · Y 0.906 · Z 1.0
// (uzunluk Z, genişlik X, yükseklik Y — direk yüzünden YÜKSEK). Auto-fit + yansıma bunları kullanır. Uzun eksen = Z.

export const YACHT_SCALE = 1.57;

// World (ölçek sonrası) yarı-boyutlar + merkez.
export const YACHT_HY = 0.906 * YACHT_SCALE; // yarı yükseklik ~1.42 (direk dahil; taban 0 → merkez bu)
export const YACHT_CENTER_Y = YACHT_HY;
// Y-dönüşünden bağımsız yatay yarı-genişlik (paralaks/¾ açı taşırmaz).
export const YACHT_HH = Math.hypot(0.264, 1.0) * YACHT_SCALE; // ~1.62
// Yansımanın dünya derinliği (taban y=0'dan tepe -Y'ye).
export const YACHT_REFLECT_DEPTH = 0.264 * YACHT_SCALE; // ~0.41
