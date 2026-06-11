'use client';

import {useMemo, useRef} from 'react';
import {useGLTF, Html} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';
import {CUTS, MODEL_SCALE} from './cuts';

// drei useGLTF: 2. param draco=false, 3. param meshopt=true (varsayılan) → meshopt
// gerektiğinde three/examples meshopt_decoder otomatik bağlanır (model meshopt değilse no-op).
useGLTF.preload('/models/cow.glb');

export function CowModel({
  selected,
  onSelect,
}: {
  selected: number | null;
  onSelect: (i: number) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const {scene} = useGLTF('/models/cow.glb');

  // Sahneyi klonla + gölge ata.
  const cow = useMemo(() => {
    const s = scene.clone(true);
    s.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.castShadow = true;
        o.receiveShadow = false;
      }
    });
    return s;
  }, [scene]);

  // Tabana otur + X/Z ortala (pivot zaten tabanda; güvenli normalize).
  const fit = useMemo(() => {
    const box = new THREE.Box3().setFromObject(cow);
    const c = box.getCenter(new THREE.Vector3());
    return new THREE.Vector3(-c.x, -box.min.y, -c.z);
  }, [cow]);

  // İdle: çok yavaş salınım (~0.08 rad/s tepe); seçiliyken profili düz tut (0'a yumuşa).
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const target = selected != null ? 0 : Math.sin(t * 0.3) * 0.22;
    group.current.rotation.y += (target - group.current.rotation.y) * 0.05;
  });

  return (
    <group ref={group} scale={MODEL_SCALE}>
      <group position={fit}>
        <primitive object={cow} />
        {CUTS.map((cut, i) => (
          <Html key={cut.id} position={cut.pos} center zIndexRange={[20, 0]}>
            {/* aria-hidden: 3D katmanı erişilebilirlik dışı; klavye erişimi sr-only liste ile (Hero3D). */}
            <button
              type="button"
              aria-hidden="true"
              tabIndex={-1}
              data-on={selected === i}
              onClick={() => onSelect(i)}
              className="denizet-hs"
            />
          </Html>
        ))}
      </group>
    </group>
  );
}
