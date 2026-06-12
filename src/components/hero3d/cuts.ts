// Dananın 10 parçası → 3D BÖLGE config'i. TEK kaynak; ince ayar buradan.
// Model YEREL uzayı: taban y=0 (yükseklik y∈[0,0.563]), gövde Z ekseni (z∈[-0.5,0.5]).
// YÖN: baş +z (ön), kuyruk/sağrı -z (arka). [negatif z'nin arka olduğu hover bug'ından kalibre.]
// id'ler content explorer.beef ile birebir eşleşir. REGIONS uzunluğu = 10 (shader uniform sabiti).

export type Region = {id: string; z: [number, number]; y: [number, number]};

// Native yükseklik ~0.563 → hedef ~1.6 birim.
export const MODEL_SCALE = 2.85;

// İlk eşleşen kutu kazanır → özel/küçük bölgeler üstte, geniş bantlar altta.
// Üst sırt (yüksek y, ön→arka): boyun → kürek → antrikot → kontrfile → but.
// Orta yan: kaburga (ön-orta göğüs kafesi) · bonfile (arka-orta, sırt altı).
// Alt: döş (ön göğüs) · etek (karın orta) · incik (arka alt bacak).
export const REGIONS: Region[] = [
  {id: 'boyun', z: [0.34, 0.55], y: [0.3, 0.66]}, // başın hemen arkası
  {id: 'kurek', z: [0.16, 0.34], y: [0.28, 0.66]}, // ön omuz
  {id: 'antrikot', z: [0.0, 0.16], y: [0.34, 0.66]}, // kürek arkası sırt ön
  {id: 'kontrfile', z: [-0.18, 0.0], y: [0.34, 0.66]}, // sırt orta
  {id: 'but', z: [-0.55, -0.18], y: [0.16, 0.66]}, // arka üst (sağrı)
  {id: 'kaburga', z: [0.0, 0.3], y: [0.15, 0.34]}, // gövde orta-yan (göğüs kafesi)
  {id: 'bonfile', z: [-0.18, 0.0], y: [0.16, 0.34]}, // sırt arka alt, iç
  {id: 'dos', z: [0.26, 0.55], y: [0.0, 0.3]}, // ön alt göğüs
  {id: 'etek', z: [-0.06, 0.26], y: [0.0, 0.16]}, // karın altı orta
  {id: 'incik', z: [-0.55, -0.06], y: [0.0, 0.16]}, // alt bacak (sağrı altı)
];

// Vertex → bölge indeksi (ilk eşleşen kutu). Eşleşmezse -1 (nötr gövde).
export function regionOf(y: number, z: number): number {
  for (let i = 0; i < REGIONS.length; i++) {
    const r = REGIONS[i];
    if (z >= r.z[0] && z <= r.z[1] && y >= r.y[0] && y <= r.y[1]) return i;
  }
  return -1;
}
