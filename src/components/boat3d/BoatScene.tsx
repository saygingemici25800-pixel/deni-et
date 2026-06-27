'use client';

import {Suspense} from 'react';
import {Canvas} from '@react-three/fiber';
import * as THREE from 'three';
import {YachtModel} from './YachtModel';
import {BoatCameraFit} from './BoatCameraFit';

// Tam-band 3D sahne. Fon kömür→petrol gradyanı CSS'te (BoatHero); Canvas şeffaf (alpha).
export function BoatScene({mobile, reduced}: {mobile: boolean; reduced: boolean}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{alpha: true, antialias: true}}
      camera={{position: [6, 1, 0], fov: mobile ? 42 : 32}}
    >
      <BoatCameraFit mobile={mobile} />
      <ambientLight intensity={0.5} color="#CFE0DE" />
      <hemisphereLight args={['#DCEAE8', '#0E1A1C', 0.5]} />
      {/* sıcak key */}
      <directionalLight position={[4, 5, 3]} intensity={1.3} color="#FFE7C2" />
      {/* brass rim */}
      <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#FFD662" />
      <Suspense fallback={null}>
        <YachtModel reduced={reduced} />
        {/* Su çizgisi — ince brass ışık (yatay düzlem, additive) */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[7, 1.6]} />
          <meshBasicMaterial
            color="#FFD662"
            transparent
            opacity={0.07}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </Suspense>
    </Canvas>
  );
}
