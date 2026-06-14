'use client';

import {useMemo, useRef} from 'react';
import {useGLTF} from '@react-three/drei';
import {useFrame, useThree, type ThreeEvent} from '@react-three/fiber';
import * as THREE from 'three';
import {MODEL_SCALE, regionOf} from './cuts';

useGLTF.preload('/models/cow.glb');

// Bölge indeksi → baştan kuyruğa dalga sırası (ölçülen centroid z'ye göre). 0=baş, 9=kuyruk.
const WAVE_ORDER = [0, 1, 3, 5, 6, 4, 2, 9, 7, 8];
const INTRO_DUR = 2.0; // sn

// Material'a TEMİZ bölge vurgusu + AÇILIŞ DALGASI enjekte et (sürekli çizgi YOK):
// hover yumuşak ton (smoothstep) + fresnel rim; seçimde biraz daha + desatüre.
// uIntroT (0..1) → bölgeler baştan kuyruğa sırayla parlayıp söner (zaman uniform'u).
function injectRegionTint(mat: THREE.Material, sink: THREE.WebGLProgramParametersWithUniforms[]) {
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uHoverRegion = {value: -100};
    shader.uniforms.uSelectedRegion = {value: -100};
    shader.uniforms.uIntroT = {value: -1};

    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        '#include <common>\nattribute float aRegion;\nattribute float aWave;\nvarying float vRegion;\nvarying float vWave;',
      )
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvRegion = aRegion;\nvWave = aWave;');

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
        uniform float uHoverRegion;
        uniform float uSelectedRegion;
        uniform float uIntroT;
        varying float vRegion;
        varying float vWave;`,
      )
      .replace(
        '#include <dithering_fragment>',
        `#include <dithering_fragment>
        float _hl = 1.0 - smoothstep(0.0, 0.6, abs(vRegion - uHoverRegion));
        float _sel = 1.0 - smoothstep(0.0, 0.6, abs(vRegion - uSelectedRegion));
        vec3 _et = vec3(0.604, 0.141, 0.141);
        gl_FragColor.rgb = mix(gl_FragColor.rgb, _et, _hl * 0.17 + _sel * 0.28);
        float _fres = pow(1.0 - abs(normalize(normal).z), 2.5);
        float _rim = _fres * (_hl + _sel);
        gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.78, 0.58, 0.11), clamp(_rim * 0.5, 0.0, 0.55));
        if (uSelectedRegion > -50.0) {
          float _lum = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
          gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(_lum), (1.0 - _sel) * 0.18);
        }
        // AÇILIŞ DALGASI — baştan kuyruğa sıralı flash (vWave 0..1) + kısa toplu parıltı + sönüm.
        if (uIntroT >= 0.0 && vWave >= 0.0) {
          float _tt = uIntroT;
          float _front = (_tt / 0.72) * 1.05;
          float _pulse = exp(-(_front - vWave) * (_front - vWave) * 200.0);
          float _allGlow = smoothstep(0.68, 0.80, _tt) * (1.0 - smoothstep(0.82, 0.98, _tt));
          float _amt = max(_pulse, _allGlow * 0.5);
          _amt *= 1.0 - smoothstep(0.86, 1.0, _tt);
          gl_FragColor.rgb = mix(gl_FragColor.rgb, _et, clamp(_amt, 0.0, 1.0) * 0.34);
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
  const introStartRef = useRef(-1);
  const introDoneRef = useRef(false);
  const {gl} = useThree();
  const {scene} = useGLTF('/models/cow.glb');

  const reduced = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  // Klon + gölge + bölge attribute'u (regionOf) + dalga sırası attribute'u + ton shader'ı.
  const cow = useMemo(() => {
    const s = scene.clone(true);
    shadersRef.current = [];
    s.traverse((o) => {
      if (!(o instanceof THREE.Mesh)) return;
      o.castShadow = true;
      o.receiveShadow = false;

      const pos = o.geometry.attributes.position as THREE.BufferAttribute;
      const reg = new Float32Array(pos.count);
      const wav = new Float32Array(pos.count);
      for (let i = 0; i < pos.count; i++) {
        const r = regionOf(pos.getY(i), pos.getZ(i));
        reg[i] = r;
        wav[i] = r >= 0 ? WAVE_ORDER[r] / 9 : -1;
      }
      o.geometry.setAttribute('aRegion', new THREE.BufferAttribute(reg, 1));
      o.geometry.setAttribute('aWave', new THREE.BufferAttribute(wav, 1));

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
        const sway = Math.sin(state.clock.elapsedTime * 0.25) * 0.12;
        const focus = selected != null ? (selected / 9 - 0.5) * 0.5 : 0;
        g.rotation.y += (sway + focus - g.rotation.y) * 0.05;
        g.rotation.x += (0 - g.rotation.x) * 0.05;
        g.scale.setScalar(MODEL_SCALE);
      } else {
        const tgY = state.pointer.x * 0.1;
        const tgX = -state.pointer.y * 0.05;
        g.rotation.y += (tgY - g.rotation.y) * 0.06;
        g.rotation.x += (tgX - g.rotation.x) * 0.06;
        g.scale.setScalar(MODEL_SCALE * (1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.004));
      }
    }

    // Açılış dalgası: ilk frame'de başlat; tıklama (selected) ya da reduced-motion → kes/atla.
    let introT = -1;
    if (selected != null || reduced) {
      introDoneRef.current = true;
    } else if (!introDoneRef.current) {
      if (introStartRef.current < 0) introStartRef.current = state.clock.elapsedTime;
      const p = (state.clock.elapsedTime - introStartRef.current) / INTRO_DUR;
      if (p >= 1) introDoneRef.current = true;
      else introT = p;
    }

    const sel = selected == null ? -100 : selected;
    for (const sh of shadersRef.current) {
      sh.uniforms.uHoverRegion.value = hoverRef.current;
      sh.uniforms.uSelectedRegion.value = sel;
      sh.uniforms.uIntroT.value = introT;
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
