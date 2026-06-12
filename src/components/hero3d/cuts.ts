// Dananın 10 parçası → 3D BÖLGE config'i. TEK kaynak; ince ayar buradan.
// Vertex'ler modelin YEREL uzayında sınıflanır: cow.glb taban y=0, gövde Z ekseninde
// (uzunluk ~1.0, z∈[-0.5,0.5]), yükseklik Y (~0..0.563), genişlik X (kalınlık, yok sayılır).
// Sıra = bölge indeksi; id'ler content explorer.beef ile birebir eşleşir (veri oradan).

export type Region = {id: string; z: [number, number]; y: [number, number]};

// Native yükseklik ~0.563 → hedef ~1.6 birim.
export const MODEL_SCALE = 2.85;

// Her bölge bir kutu (z + y aralığı). Üst sırt parçaları yüksek y; alt/karın parçaları düşük y.
export const REGIONS: Region[] = [
  {id: 'boyun', z: [-0.5, -0.34], y: [0.24, 0.64]},
  {id: 'kurek', z: [-0.34, -0.18], y: [0.18, 0.64]},
  {id: 'antrikot', z: [-0.18, -0.04], y: [0.32, 0.64]},
  {id: 'kontrfile', z: [-0.04, 0.16], y: [0.32, 0.64]},
  {id: 'bonfile', z: [-0.06, 0.18], y: [0.2, 0.32]},
  {id: 'kaburga', z: [-0.22, -0.02], y: [0.12, 0.32]},
  {id: 'dos', z: [-0.42, -0.18], y: [0.0, 0.24]},
  {id: 'but', z: [0.16, 0.52], y: [0.2, 0.64]},
  {id: 'incik', z: [0.16, 0.52], y: [0.0, 0.2]},
  {id: 'etek', z: [-0.02, 0.18], y: [0.0, 0.2]},
];

// Vertex → bölge indeksi (ilk eşleşen kutu). Eşleşmezse -1 (nötr gövde, tonlanmaz).
export function regionOf(y: number, z: number): number {
  for (let i = 0; i < REGIONS.length; i++) {
    const r = REGIONS[i];
    if (z >= r.z[0] && z <= r.z[1] && y >= r.y[0] && y <= r.y[1]) return i;
  }
  return -1;
}
