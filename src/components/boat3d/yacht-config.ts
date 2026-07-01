// Yat (yacht.glb — LUXYAT) ölçü sabitleri — ÖLÇÜLDÜ: taban y=0, yarı-boyutlar X 0.329 · Y 0.328 · Z 1.0
// (uzunluk Z, genişlik X, yükseklik Y). Auto-fit + yansıma bunları kullanır. Uzun eksen = Z (rotation gerekmez).

export const YACHT_SCALE = 1.57;

// World (ölçek sonrası) yarı-boyutlar + merkez.
export const YACHT_HY = 0.328 * YACHT_SCALE; // yarı yükseklik ~0.515 (taban 0 → merkez bu)
export const YACHT_CENTER_Y = YACHT_HY;
// Y-dönüşünden bağımsız yatay yarı-genişlik (paralaks/¾ açı taşırmaz).
export const YACHT_HH = Math.hypot(0.329, 1.0) * YACHT_SCALE; // ~1.65
// Yansımanın dünya derinliği (taban y=0'dan tepe -Y'ye).
export const YACHT_REFLECT_DEPTH = 0.329 * YACHT_SCALE; // ~0.52
