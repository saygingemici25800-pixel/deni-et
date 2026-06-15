'use client';

import {useMemo, useRef} from 'react';
import {useGLTF} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';
import {YACHT_SCALE, YACHT_REFLECT_DEPTH} from './yacht-config';
import {bindMeshopt} from '@/lib/meshopt';

// EXT_meshopt_compression: decoder bağlı olmazsa mesh konfeti görünür (dana ile aynı decoder).
useGLTF.preload('/models/yacht.glb', true, true, bindMeshopt);

// Aynalanmış kopyaya soluk + dikey fade + hafif dalga distorsiyonu enjekte et (prosedürel yansıma).
function injectReflection(mat: THREE.Material, sink: THREE.WebGLProgramParametersWithUniforms[]) {
  mat.transparent = true;
  mat.depthWrite = false;
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = {value: 0};
    shader.uniforms.uFade = {value: YACHT_REFLECT_DEPTH};
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nuniform float uTime;\nvarying float vRefY;')
      .replace(
        '#include <begin_vertex>',
        '#include <begin_vertex>\ntransformed.x += sin(transformed.z * 5.0 + uTime) * 0.014;\nvRefY = (modelMatrix * vec4(transformed, 1.0)).y;',
      );
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform float uFade;\nvarying float vRefY;')
      .replace(
        '#include <dithering_fragment>',
        '#include <dithering_fragment>\ngl_FragColor.a *= clamp(smoothstep(-uFade, 0.0, vRefY), 0.0, 1.0) * 0.22;',
      );
    sink.push(shader);
  };
  mat.needsUpdate = true;
}

export function YachtModel({reduced}: {reduced: boolean}) {
  const group = useRef<THREE.Group>(null);
  const reflShaders = useRef<THREE.WebGLProgramParametersWithUniforms[]>([]);
  const {scene} = useGLTF('/models/yacht.glb', true, true, bindMeshopt);

  const {boat, mirror, fit} = useMemo(() => {
    reflShaders.current = [];
    const boat = scene.clone(true);
    const box = new THREE.Box3().setFromObject(boat);
    const c = box.getCenter(new THREE.Vector3());
    const fit = new THREE.Vector3(-c.x, -box.min.y, -c.z); // x/z ortala, taban y=0

    const mirror = scene.clone(true);
    mirror.traverse((o) => {
      if (!(o instanceof THREE.Mesh)) return;
      o.castShadow = false;
      o.receiveShadow = false;
      o.material = Array.isArray(o.material) ? o.material.map((m) => m.clone()) : o.material.clone();
      const out = Array.isArray(o.material) ? o.material : [o.material];
      out.forEach((m) => injectReflection(m, reflShaders.current));
    });
    return {boat, mirror, fit};
  }, [scene]);

  useFrame((state) => {
    const g = group.current;
    if (g && !reduced) {
      const t = state.clock.elapsedTime;
      const bob = Math.sin((t * (Math.PI * 2)) / 4) * 0.05; // ~4sn period, küçük genlik
      const roll = Math.sin(t * 0.5) * 0.03;
      const pitch = Math.sin(t * 0.37 + 1.0) * 0.02;
      const px = state.pointer.x * 0.07; // ~±4°
      const py = state.pointer.y * 0.035;
      g.position.y += (bob - g.position.y) * 0.08;
      g.rotation.z += (roll - g.rotation.z) * 0.05;
      g.rotation.x += (pitch + py - g.rotation.x) * 0.05;
      g.rotation.y += (px - g.rotation.y) * 0.06;
    }
    const tt = state.clock.elapsedTime;
    for (const sh of reflShaders.current) sh.uniforms.uTime.value = tt;
  });

  return (
    <group ref={group} scale={YACHT_SCALE}>
      <group position={fit}>
        <primitive object={boat} />
        {/* Su yansıması — y=0 (taban) hakkında aynalanmış kopya */}
        <group scale={[1, -1, 1]}>
          <primitive object={mirror} />
        </group>
      </group>
    </group>
  );
}
