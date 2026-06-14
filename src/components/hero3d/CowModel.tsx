'use client';

import {useMemo, useRef} from 'react';
import {useGLTF} from '@react-three/drei';
import {useFrame, useThree, type ThreeEvent} from '@react-three/fiber';
import * as THREE from 'three';
import {MODEL_SCALE, regionOf} from './cuts';

useGLTF.preload('/models/cow.glb');

// Material'a TEMİZ bölge vurgusu enjekte et (sürekli çizgi YOK):
// hover yumuşak sıcak ton (~0.17, smoothstep ile yumuşak kenar) + fresnel rim;
// seçimde biraz daha (~0.28) + rim + gerisi hafif desatüre. vRegion interpolasyonu = yumuşak sınır.
function injectRegionTint(mat: THREE.Material, sink: THREE.WebGLProgramParametersWithUniforms[]) {
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uHoverRegion = {value: -100};
    shader.uniforms.uSelectedRegion = {value: -100};

    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float aRegion;\nvarying float vRegion;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvRegion = aRegion;');

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
        uniform float uHoverRegion;
        uniform float uSelectedRegion;
        varying float vRegion;`,
      )
      .replace(
        '#include <dithering_fragment>',
        `#include <dithering_fragment>
        float _hl = 1.0 - smoothstep(0.0, 0.6, abs(vRegion - uHoverRegion));
        float _sel = 1.0 - smoothstep(0.0, 0.6, abs(vRegion - uSelectedRegion));
        vec3 _et = vec3(0.604, 0.141, 0.141);
        gl_FragColor.rgb = mix(gl_FragColor.rgb, _et, _hl * 0.17 + _sel * 0.28);
        // Fresnel rim — yalnız hover/seçili bölgede, ince premium ışık (silüete yakın).
        float _fres = pow(1.0 - abs(normalize(normal).z), 2.5);
        float _rim = _fres * (_hl + _sel);
        gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.78, 0.58, 0.11), clamp(_rim * 0.5, 0.0, 0.55));
        // Seçimde gövdenin kalanı çok hafif desatüre.
        if (uSelectedRegion > -50.0) {
          float _lum = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
          gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(_lum), (1.0 - _sel) * 0.18);
        }`,
      );

    sink.push(shader);
  };
  mat.needsUpdate = true;
}

export function CowModel({
  selected,
  onSelect,
  onHover,
  touch,
}: {
  selected: number | null;
  onSelect: (i: number) => void;
  onHover: (i: number | null) => void;
  touch: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const hoverRef = useRef(-100);
  const lastHoverRef = useRef<number | null>(null);
  const shadersRef = useRef<THREE.WebGLProgramParametersWithUniforms[]>([]);
  const {gl} = useThree();
  const {scene} = useGLTF('/models/cow.glb');

  const reduced = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  // Klon + gölge + her vertex'e bölge attribute'u (regionOf) + ton shader'ı.
  const cow = useMemo(() => {
    const s = scene.clone(true);
    shadersRef.current = [];
    s.traverse((o) => {
      if (!(o instanceof THREE.Mesh)) return;
      o.castShadow = true;
      o.receiveShadow = false;

      const pos = o.geometry.attributes.position as THREE.BufferAttribute;
      const reg = new Float32Array(pos.count);
      for (let i = 0; i < pos.count; i++) reg[i] = regionOf(pos.getY(i), pos.getZ(i));
      o.geometry.setAttribute('aRegion', new THREE.BufferAttribute(reg, 1));

      o.material = Array.isArray(o.material) ? o.material.map((m) => m.clone()) : o.material.clone();
      const out = Array.isArray(o.material) ? o.material : [o.material];
      out.forEach((m) => injectRegionTint(m, shadersRef.current));
    });
    return s;
  }, [scene]);

  const fit = useMemo(() => {
    const box = new THREE.Box3().setFromObject(cow);
    const c = box.getCenter(new THREE.Vector3());
    return new THREE.Vector3(-c.x, -box.min.y, -c.z);
  }, [cow]);

  useFrame((state) => {
    const g = group.current;
    if (g) {
      if (reduced) {
        g.scale.setScalar(MODEL_SCALE);
      } else if (touch) {
        // Mobil: pointer yok → hafif idle salınım + seçili bölgeye doğru ufak dönüş.
        const sway = Math.sin(state.clock.elapsedTime * 0.25) * 0.12;
        const focus = selected != null ? (selected / 9 - 0.5) * 0.5 : 0;
        g.rotation.y += (sway + focus - g.rotation.y) * 0.05;
        g.rotation.x += (0 - g.rotation.x) * 0.05;
        g.scale.setScalar(MODEL_SCALE);
      } else {
        // Masaüstü: fare paralaksı + hafif nefes.
        const tgY = state.pointer.x * 0.1;
        const tgX = -state.pointer.y * 0.05;
        g.rotation.y += (tgY - g.rotation.y) * 0.06;
        g.rotation.x += (tgX - g.rotation.x) * 0.06;
        g.scale.setScalar(MODEL_SCALE * (1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.004));
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
    const pos = geom?.attributes.position as THREE.BufferAttribute | undefined;
    if (!pos || !e.face) return -1;
    return regionOf(pos.getY(e.face.a), pos.getZ(e.face.a));
  };

  const setHover = (r: number) => {
    hoverRef.current = r >= 0 ? r : -100;
    gl.domElement.style.cursor = r >= 0 ? 'pointer' : '';
    const next = r >= 0 ? r : null;
    if (next !== lastHoverRef.current) {
      lastHoverRef.current = next;
      onHover(next);
    }
  };

  return (
    <group
      ref={group}
      scale={MODEL_SCALE}
      onPointerMove={(e) => setHover(readRegion(e))}
      onPointerOut={() => setHover(-1)}
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
