// Dananın 10 parçası → 3D BÖLGE config'i. TEK kaynak; ince ayar buradan.
// ÖLÇÜLDÜ (cow.glb geometrisi, Node): uzunluk ekseni = Z (z∈[-0.498,0.498]),
// yükseklik = Y (0..0.563). BAŞ/BURUN = -Z (dar muzzle), KUYRUK/SAĞRI = +Z (geniş sağrı).
// Bölge kutuları ölçülen min/max'a göre kuruldu; merkez koordinatları Node'da doğrulandı
// (boyun z≈-0.37 baş ✓ · but z≈0.35 arka ✓). id'ler content explorer.beef ile eşleşir.

export type Region = {id: string};

// REGIONS sırası = bölge indeksi (kart numarası 01-10). content.explorer.beef ile aynı sıra.
export const REGIONS: Region[] = [
  {id: 'boyun'}, // 0
  {id: 'kurek'}, // 1
  {id: 'antrikot'}, // 2
  {id: 'kontrfile'}, // 3
  {id: 'bonfile'}, // 4
  {id: 'kaburga'}, // 5
  {id: 'dos'}, // 6
  {id: 'but'}, // 7
  {id: 'incik'}, // 8
  {id: 'etek'}, // 9
];

// Sınıflandırma kutuları: r = REGIONS indeksi. Çoklu kutu aynı bölgeye işaret edebilir
// (incik = ön + arka bacak). İlk eşleşen kazanır → özel/alçak kutular üstte.
export type Box = {r: number; z: [number, number]; y: [number, number]};

export const BOXES: Box[] = [
  {r: 8, z: [-0.34, -0.14], y: [0.0, 0.17]}, // incik — ön bacaklar
  {r: 8, z: [0.2, 0.48], y: [0.0, 0.17]}, // incik — arka bacaklar
  {r: 6, z: [-0.42, -0.16], y: [0.08, 0.34]}, // döş — ön alt göğüs
  {r: 5, z: [-0.16, 0.04], y: [0.16, 0.34]}, // kaburga — gövde orta yan
  {r: 4, z: [0.04, 0.2], y: [0.16, 0.34]}, // bonfile — sırt arka iç
  {r: 9, z: [0.2, 0.4], y: [0.14, 0.34]}, // etek — karın arka alt (flank)
  {r: 0, z: [-0.52, -0.3], y: [0.18, 0.62]}, // boyun — baş/boyun (üst-ön)
  {r: 1, z: [-0.3, -0.14], y: [0.2, 0.62]}, // kürek — ön omuz
  {r: 2, z: [-0.14, 0.0], y: [0.33, 0.62]}, // antrikot — sırt ön
  {r: 3, z: [0.0, 0.18], y: [0.33, 0.62]}, // kontrfile — sırt orta
  {r: 7, z: [0.18, 0.52], y: [0.3, 0.62]}, // but — arka üst (sağrı)
];

// Native yükseklik ~0.563 → hedef ~1.6 birim.
export const MODEL_SCALE = 2.85;

// Vertex → bölge indeksi (ilk eşleşen kutu). Eşleşmezse -1 (nötr gövde).
export function regionOf(y: number, z: number): number {
  for (let i = 0; i < BOXES.length; i++) {
    const b = BOXES[i];
    if (z >= b.z[0] && z <= b.z[1] && y >= b.y[0] && y <= b.y[1]) return b.r;
  }
  return -1;
}
