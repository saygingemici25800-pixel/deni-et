// Yat (yacht.glb) ölçü sabitleri — ÖLÇÜLDÜ: taban y=0, yarı-boyutlar X 0.16 · Y 0.16 · Z 0.49
// (uzunluk Z, genişlik X, yükseklik Y). Auto-fit + yansıma bunları kullanır.

export const YACHT_SCALE = 3.2;

// World (ölçek sonrası) yarı-boyutlar + merkez.
export const YACHT_HY = 0.16 * YACHT_SCALE; // yarı yükseklik ~0.51 (taban 0 → merkez bu)
export const YACHT_CENTER_Y = YACHT_HY;
// Y-dönüşünden bağımsız yatay yarı-genişlik (paralaks/¾ açı taşırmaz).
export const YACHT_HH = Math.hypot(0.16, 0.49) * YACHT_SCALE; // ~1.65
// Yansımanın dünya derinliği (taban y=0'dan tepe -Y'ye).
export const YACHT_REFLECT_DEPTH = 0.32 * YACHT_SCALE; // ~1.02
