'use client';

import {Suspense, useEffect} from 'react';
import {Canvas, useThree} from '@react-three/fiber';
import * as THREE from 'three';
import {YachtModel} from './YachtModel';
import {YACHT_HH} from './yacht-config';

/* Marquee slotuna ÖZEL kamera — hero'nun tam-sığdırma BoatCameraFit'inden BAĞIMSIZ.
   Amaç: 232×88 gibi kısa-geniş slotta GÖVDE belirgin/büyük dursun; direk ucu dikeyde
   taşıp kırpılsın (kabul edilebilir dekoratif accent). Aynı ¾ profil / pruva yönü korunur. */
const HULL_AIM_Y = 0.45; // gövde/güverte hizası (dünya y) — tam-yükseklik merkezinden alçak
function MiniCameraFit() {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const width = useThree((s) => s.size.width);
  const height = useThree((s) => s.size.height);
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    camera.fov = 30;
    const vfov = THREE.MathUtils.degToRad(camera.fov);
    const aspect = width / Math.max(1, height);
    const tanV = Math.tan(vfov / 2);
    // Yatay: gövde uzunluğu slot genişliğini ~doldursun (direk dikeyde taşsın → kırpılsın).
    const dist = (YACHT_HH / (tanV * aspect)) * 1.04;
    const aim = new THREE.Vector3(0, HULL_AIM_Y, 0);
    const az = THREE.MathUtils.degToRad(-14); // hero ile aynı ¾ / pruva yönü
    const dir = new THREE.Vector3(Math.cos(az), 0.2, Math.sin(az)).normalize();
    camera.position.copy(aim).addScaledVector(dir, dist);
    camera.lookAt(aim);
    camera.updateProjectionMatrix();
    invalidate(); // frameloop="demand" → kamera değişince tek kare render et
  }, [camera, width, height, invalidate]);
  return null;
}

/* Mini canlı 3D — /tekne hero'daki AYNI YachtModel + ışık şeması; kamera slot-özel (yukarıda).
   frameloop="demand" (statik tek kare), reduced (idle animasyon kapalı), OrbitControls/dönme yok. */
export function YachtMini() {
  return (
    <div className="boat-marquee-boat">
      <Canvas
        style={{width: '100%', height: '100%'}}
        dpr={[1, 1.25]}
        frameloop="demand"
        gl={{alpha: true, antialias: true}}
        camera={{position: [6, 1, 0], fov: 30}}
      >
        <MiniCameraFit />
        <ambientLight intensity={0.5} color="#CFE0DE" />
        <hemisphereLight args={['#DCEAE8', '#0E1A1C', 0.5]} />
        {/* sıcak key */}
        <directionalLight position={[4, 5, 3]} intensity={1.3} color="#FFE7C2" />
        {/* brass rim */}
        <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#FFD662" />
        <Suspense fallback={null}>
          <YachtModel reduced={true} />
        </Suspense>
      </Canvas>
    </div>
  );
}
