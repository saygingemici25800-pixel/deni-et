'use client';

import {useEffect} from 'react';
import {useThree} from '@react-three/fiber';
import * as THREE from 'three';

// Ölçülen cow.glb (world, MODEL_SCALE=2.85 sonrası): yarı-boyutlar + merkez.
// X 0.932 → hx 0.466 · Y 1.605 → hy 0.802 (taban y=0, merkez y=0.802) · Z 2.839 → hz 1.419.
const HY = 0.802;
const CENTER = new THREE.Vector3(0, HY, 0);
// Y-dönüşünden BAĞIMSIZ yatay yarı-genişlik (paralaks/sway/¾ açı hiç taşırmaz).
const HH = Math.hypot(0.466, 1.419); // ~1.494

/**
 * Auto-fit kamera: model bounding-box + viewport en-boy oranına göre danayı TAM sığdırır.
 * Mesafe = max(dikey, yatay fit) * pad. Mobilde fov 38° + ¾ açı; masaüstünde yan profil (az=0).
 * Resize'da yeniden hesaplar (useThree size bağımlılığı).
 */
export function CameraFit({mobile, pad = 1.14}: {mobile: boolean; pad?: number}) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const width = useThree((s) => s.size.width);
  const height = useThree((s) => s.size.height);

  useEffect(() => {
    const az = mobile ? THREE.MathUtils.degToRad(-22) : 0; // ¾ (baş tarafı) / yan profil
    camera.fov = mobile ? 38 : 30;

    const vfov = THREE.MathUtils.degToRad(camera.fov);
    const aspect = width / Math.max(1, height);
    const tanV = Math.tan(vfov / 2);

    const distV = HY / tanV; // dikey sığma
    const distH = HH / (tanV * aspect); // yatay sığma (aspect dahil)
    const dist = Math.max(distV, distH) * pad;

    const dir = new THREE.Vector3(Math.cos(az), 0.16, Math.sin(az)).normalize();
    camera.position.copy(CENTER).addScaledVector(dir, dist);
    camera.lookAt(CENTER);
    camera.updateProjectionMatrix();
  }, [camera, width, height, mobile, pad]);

  return null;
}
