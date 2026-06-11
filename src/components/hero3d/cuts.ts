// Dananın 10 parçası → 3D hotspot koordinatları. TEK kaynak; konum ayarı buradan.
// Koordinatlar modelin YEREL (ölçeklenmemiş) uzayında: cow.glb taban y=0, gövde Z ekseninde
// (uzunluk ~1.0), genişlik X (~0.33). x≈0.19 → gövdenin kamera tarafındaki yüzeyi.
// id'ler content explorer.beef ile birebir eşleşir (veri oradan, kopyalanmaz).

export type Cut = {id: string; pos: [number, number, number]};

// Native model yüksekliği ~0.563 → hedef ~1.6 birim. Hem grup ölçeği hem kamera hedefi kullanır.
export const MODEL_SCALE = 2.85;

export const CUTS: Cut[] = [
  {id: 'boyun', pos: [0.19, 0.44, -0.4]},
  {id: 'kurek', pos: [0.19, 0.4, -0.28]},
  {id: 'antrikot', pos: [0.19, 0.46, -0.14]},
  {id: 'kontrfile', pos: [0.19, 0.46, 0.05]},
  {id: 'bonfile', pos: [0.19, 0.34, 0.1]},
  {id: 'kaburga', pos: [0.19, 0.28, -0.12]},
  {id: 'dos', pos: [0.19, 0.16, -0.3]},
  {id: 'but', pos: [0.19, 0.4, 0.36]},
  {id: 'incik', pos: [0.19, 0.12, 0.38]},
  {id: 'etek', pos: [0.19, 0.16, 0.16]},
];
