// Dananın 10 parçası → 3D BÖLGE config'i. TEK kaynak; ince ayar buradan.
// ÖLÇÜLDÜ (cow.glb YENİ Draco mesh, render ile teyit): uzunluk ekseni = Z (z∈[-0.490,0.490]),
// yükseklik = Y (0..0.624). BAŞ/BURUN = +Z, KUYRUK/SAĞRI = -Z — eski mesh'in TERSİ.
// Bölge kutuları yeni anatomiye göre yeniden ölçüldü; baş=+Z olduğundan eski −Z'deki ön
// parçalar (boyun/kürek/antrikot) artık +Z'de. id'ler content explorer.beef ile eşleşir.

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
  {r: 8, z: [0.04, 0.22], y: [0.0, 0.2]}, // incik — ön bacaklar (+Z baş tarafı)
  {r: 8, z: [-0.42, -0.18], y: [0.0, 0.2]}, // incik — arka bacaklar (−Z kuyruk tarafı)
  {r: 6, z: [0.06, 0.24], y: [0.18, 0.4]}, // döş — ön alt göğüs (+Z)
  {r: 5, z: [-0.04, 0.16], y: [0.16, 0.377]}, // kaburga — gövde orta yan (z çevrildi, y tavanı ×1.108)
  {r: 4, z: [-0.18, -0.02], y: [0.36, 0.46]}, // bonfile — loin altı/içi (−Z)
  {r: 9, z: [-0.16, 0.06], y: [0.18, 0.4]}, // etek — karın orta alt (flank)
  {r: 0, z: [0.22, 0.4], y: [0.4, 0.624]}, // boyun — baş/boyun (üst-ön, +Z)
  {r: 1, z: [0.06, 0.22], y: [0.4, 0.6]}, // kürek — ön omuz (+Z)
  {r: 2, z: [-0.04, 0.1], y: [0.44, 0.6]}, // antrikot — sırt ön
  {r: 3, z: [-0.18, -0.04], y: [0.44, 0.6]}, // kontrfile — sırt orta
  {r: 7, z: [-0.42, -0.18], y: [0.34, 0.6]}, // but — arka üst (sağrı, −Z)
];

// Native yükseklik ~0.624 → ~1.78 birim (MODEL_SCALE sabit kaldı).
export const MODEL_SCALE = 2.85;

// Vertex → bölge indeksi (ilk eşleşen kutu). Eşleşmezse -1 (nötr gövde).
export function regionOf(y: number, z: number): number {
  for (let i = 0; i < BOXES.length; i++) {
    const b = BOXES[i];
    if (z >= b.z[0] && z <= b.z[1] && y >= b.y[0] && y <= b.y[1]) return b.r;
  }
  return -1;
}
