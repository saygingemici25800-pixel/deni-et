'use client';

import {useMemo, useRef} from 'react';
import {useGLTF} from '@react-three/drei';
import {useFrame, useThree, type ThreeEvent} from '@react-three/fiber';
import * as THREE from 'three';
import {MODEL_SCALE, regionOf} from './cuts';

// drei useGLTF: meshopt varsayılan açık (model meshopt değil → no-op).
useGLTF.preload('/models/cow.glb');

const ET_TINT = 'vec3(0.604, 0.141, 0.141)'; // #9A2424

// Material'a bölge tonu enjekte et (hover ~0.18, seçim ~0.30 + gerisi hafif desatüre).
// vRegion interpolasyonu kutu sınırlarını yumuşatır. Boş hover/seçim = -100 (eşleşmez).
function injectRegionShader(mat: THREE.Material, sink: THREE.WebGLProgramParametersWithUniforms[]) {
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uHoverRegion = {value: -100};
    shader.uniforms.uSelectedRegion = {value: -100};
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float aRegion;\nvarying float vRegion;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvRegion = aRegion;');
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        '#include <common>\nuniform float uHoverRegion;\nuniform float uSelectedRegion;\nvarying float vRegion;',
      )
      .replace(
        '#include <dithering_fragment>',
        `#include <dithering_fragment>
        float _hl = 1.0 - smoothstep(0.0, 0.55, abs(vRegion - uHoverRegion));
        float _sel = 1.0 - smoothstep(0.0, 0.55, abs(vRegion - uSelectedRegion));
        gl_FragColor.rgb = mix(gl_FragColor.rgb, ${ET_TINT}, clamp(_hl * 0.18 + _sel * 0.30, 0.0, 0.45));
        if (uSelectedRegion > -0.5) {
          float _lum = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
          gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(_lum), (1.0 - _sel) * 0.26);
        }`,
      );
    sink.push(shader);
  };
  mat.needsUpdate = true;
}

export function CowModel({
  selected,
  onSelect,
}: {
  selected: number | null;
  onSelect: (i: number) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const hoverRef = useRef(-100);
  const shadersRef = useRef<THREE.WebGLProgramParametersWithUniforms[]>([]);
  const {gl} = useThree();
  const {scene} = useGLTF('/models/cow.glb');

  // reduced-motion guard (Hero3D zaten yüklemez ama güvenli).
  const reduced = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  // Klon + gölge + her vertex'e bölge attribute'u + shader enjeksiyonu.
  const cow = useMemo(() => {
    const s = scene.clone(true);
    shadersRef.current = [];
    s.traverse((o) => {
      if (!(o instanceof THREE.Mesh)) return;
      o.castShadow = true;
      o.receiveShadow = false;

      // Bölge attribute'u — vertex YEREL konumuna göre (y, z).
      const pos = o.geometry.attributes.position;
      const reg = new Float32Array(pos.count);
      for (let i = 0; i < pos.count; i++) reg[i] = regionOf(pos.getY(i), pos.getZ(i));
      o.geometry.setAttribute('aRegion', new THREE.BufferAttribute(reg, 1));

      // Cache'i kirletmemek için material'ı klonla, sonra shader enjekte et.
      o.material = Array.isArray(o.material)
        ? o.material.map((m) => m.clone())
        : o.material.clone();
      const out = Array.isArray(o.material) ? o.material : [o.material];
      out.forEach((m) => injectRegionShader(m, shadersRef.current));
    });
    return s;
  }, [scene]);

  // Tabana otur + X/Z ortala.
  const fit = useMemo(() => {
    const box = new THREE.Box3().setFromObject(cow);
    const c = box.getCenter(new THREE.Vector3());
    return new THREE.Vector3(-c.x, -box.min.y, -c.z);
  }, [cow]);

  // Fare paralaksı (±~5°) + çok hafif nefes; sürekli idle dönüş YOK. Uniform'ları güncelle.
  useFrame((state) => {
    const g = group.current;
    if (g) {
      if (!reduced) {
        const tgY = state.pointer.x * 0.1; // ~±5.7°
        const tgX = -state.pointer.y * 0.05; // ~±2.9°
        g.rotation.y += (tgY - g.rotation.y) * 0.06;
        g.rotation.x += (tgX - g.rotation.x) * 0.06;
        const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.004;
        g.scale.setScalar(MODEL_SCALE * breathe);
      } else {
        g.scale.setScalar(MODEL_SCALE);
      }
    }
    const sel = selected == null ? -100 : selected;
    for (const sh of shadersRef.current) {
      sh.uniforms.uHoverRegion.value = hoverRef.current;
      sh.uniforms.uSelectedRegion.value = sel;
    }
  });

  const readRegion = (e: ThreeEvent<PointerEvent | MouseEvent>): number => {
    const geom = (e.object as THREE.Mesh).geometry;
    const attr = geom?.attributes.aRegion as THREE.BufferAttribute | undefined;
    if (!attr || !e.face) return -1;
    return attr.array[e.face.a];
  };

  return (
    <group
      ref={group}
      scale={MODEL_SCALE}
      onPointerMove={(e) => {
        const r = readRegion(e);
        hoverRef.current = r >= 0 ? r : -100;
        gl.domElement.style.cursor = r >= 0 ? 'pointer' : '';
      }}
      onPointerOut={() => {
        hoverRef.current = -100;
        gl.domElement.style.cursor = '';
      }}
      onClick={(e) => {
        const r = readRegion(e);
        if (r >= 0) onSelect(r);
      }}
    >
      <group position={fit}>
        <primitive object={cow} />
      </group>
    </group>
  );
}
