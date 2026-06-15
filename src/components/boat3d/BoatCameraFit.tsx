'use client';

import {useEffect} from 'react';
import {useThree} from '@react-three/fiber';
import * as THREE from 'three';
import {YACHT_HY, YACHT_HH, YACHT_CENTER_Y} from './yacht-config';

// Yatı + altındaki yansıma payını TAM sığdırır (taşma yok). Hafif ¾ açı. Resize'da yeniden hesaplar.
export function BoatCameraFit({mobile}: {mobile: boolean}) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const width = useThree((s) => s.size.width);
  const height = useThree((s) => s.size.height);

  useEffect(() => {
    camera.fov = mobile ? 42 : 32;
    const vfov = THREE.MathUtils.degToRad(camera.fov);
    const aspect = width / Math.max(1, height);
    const tanV = Math.tan(vfov / 2);

    // Dikey: yat yüksekliği + altında yansıma için ekstra pay.
    const Vh = YACHT_HY * 2.0;
    const distV = Vh / tanV;
    const distH = YACHT_HH / (tanV * aspect);
    const dist = Math.max(distV, distH) * (mobile ? 1.2 : 1.1);

    // Bakış merkezi biraz aşağıda → yat üstte, yansıma altta görünür.
    const aim = new THREE.Vector3(0, YACHT_CENTER_Y * 0.7, 0);
    const az = THREE.MathUtils.degToRad(mobile ? -16 : -14); // hafif ¾ (pruva tarafı)
    const dir = new THREE.Vector3(Math.cos(az), 0.13, Math.sin(az)).normalize();

    camera.position.copy(aim).addScaledVector(dir, dist);
    camera.lookAt(aim);
    camera.updateProjectionMatrix();
  }, [camera, width, height, mobile]);

  return null;
}
