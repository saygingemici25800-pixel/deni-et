'use client';

import {useRef} from 'react';
import {useThree, useFrame} from '@react-three/fiber';
import * as THREE from 'three';
import {CUTS, MODEL_SCALE} from './cuts';

// Varsayılan çerçeve (yan profil) ↔ seçili parçaya hafif yakınlaşma. Saf lerp (~0.8s).
const DEFAULT_POS = new THREE.Vector3(5, 1.15, 0);
const DEFAULT_LOOK = new THREE.Vector3(0, 0.85, 0);

export function CameraRig({selected}: {selected: number | null}) {
  const {camera} = useThree();
  const look = useRef(DEFAULT_LOOK.clone());

  useFrame((_, dt) => {
    let targetPos = DEFAULT_POS;
    let targetLook = DEFAULT_LOOK;

    if (selected != null) {
      const c = CUTS[selected].pos;
      const w = new THREE.Vector3(c[0] * MODEL_SCALE, c[1] * MODEL_SCALE, c[2] * MODEL_SCALE);
      targetPos = new THREE.Vector3(w.x + 2.6, w.y + 0.35, w.z * 0.55);
      targetLook = w;
    }

    const f = Math.min(1, dt * 2.6); // ~0.8s yumuşama
    camera.position.lerp(targetPos, f);
    look.current.lerp(targetLook, f);
    camera.lookAt(look.current);
  });

  return null;
}
