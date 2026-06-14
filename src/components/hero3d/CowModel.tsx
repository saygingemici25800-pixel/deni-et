'use client';

import {useMemo, useRef} from 'react';
import {useGLTF} from '@react-three/drei';
import {useFrame, useThree, type ThreeEvent} from '@react-three/fiber';
import * as THREE from 'three';
import {MODEL_SCALE, BOXES, regionOf} from './cuts';

useGLTF.preload('/models/cow.glb');

const NBOX = BOXES.length;
const BOX_Z = BOXES.map((b) => new THREE.Vector2(b.z[0], b.z[1]));
const BOX_Y = BOXES.map((b) => new THREE.Vector2(b.y[0], b.y[1]));
const BOX_R = BOXES.map((b) => b.r);

// Material'a kasap-şeması shader'ı: KALICI net kesim çizgileri (kalın, koyu bordo, dashed,
// her zaman görünür) + hafif hover/seçim tonu. regionAt = kutu sınıflandırması (uniform).
function injectRegionShader(mat: THREE.Material, sink: THREE.WebGLProgramParametersWithUniforms[]) {
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uBoxZ = {value: BOX_Z};
    shader.uniforms.uBoxY = {value: BOX_Y};
    shader.uniforms.uBoxR = {value: BOX_R};
    shader.uniforms.uHoverRegion = {value: -100};
    shader.uniforms.uSelectedRegion = {value: -100};
    shader.uniforms.uLineColor = {value: new THREE.Color('#3A1010')}; // espresso/bordo
    shader.uniforms.uIntro = {value: 1};

    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vLocalPos;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvLocalPos = position;');

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
        #define NBOX ${NBOX}
        varying vec3 vLocalPos;
        uniform vec2 uBoxZ[NBOX];
        uniform vec2 uBoxY[NBOX];
        uniform float uBoxR[NBOX];
        uniform float uHoverRegion;
        uniform float uSelectedRegion;
        uniform vec3 uLineColor;
        uniform float uIntro;
        int regionAt(float z, float y) {
          for (int i = 0; i < NBOX; i++) {
            if (z >= uBoxZ[i].x && z <= uBoxZ[i].y && y >= uBoxY[i].x && y <= uBoxY[i].y)
              return int(uBoxR[i] + 0.5);
          }
          return -1;
        }`,
      )
      .replace(
        '#include <dithering_fragment>',
        `#include <dithering_fragment>
        float fz = vLocalPos.z;
        float fy = vLocalPos.y;
        int reg = regionAt(fz, fy);
        float regf = float(reg);
        float hov = (reg >= 0 && abs(regf - uHoverRegion) < 0.5) ? 1.0 : 0.0;
        float sel = (reg >= 0 && abs(regf - uSelectedRegion) < 0.5) ? 1.0 : 0.0;
        // İnce sıcak ton (opak değil): hover ~0.12, seçim ~0.22 + gerisi hafif desatüre.
        vec3 etCol = vec3(0.604, 0.141, 0.141);
        gl_FragColor.rgb = mix(gl_FragColor.rgb, etCol, hov * 0.12 + sel * 0.22);
        if (uSelectedRegion > -0.5) {
          float lum = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
          gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(lum), (1.0 - sel) * 0.20);
        }
        // KALICI kesim çizgileri — kutu sınırı edge-detect, kalın + koyu + dashed.
        vec2 d = fwidth(vec2(fz, fy)) * 2.2;
        bool edge =
          regionAt(fz + d.x, fy) != reg || regionAt(fz - d.x, fy) != reg ||
          regionAt(fz, fy + d.y) != reg || regionAt(fz, fy - d.y) != reg;
        if (reg >= 0 && edge) {
          float dash = fract((fy * 1.0 + fz * 0.5 + vLocalPos.x * 0.5) * 42.0);
          float dashMask = step(0.4, dash); // ~%60 dolu → kesik çizgi
          float lineA = (0.6 + sel * 0.2 + uIntro * 0.25) * dashMask;
          gl_FragColor.rgb = mix(gl_FragColor.rgb, uLineColor, clamp(lineA, 0.0, 0.85));
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
}: {
  selected: number | null;
  onSelect: (i: number) => void;
  onHover: (i: number | null) => void;
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

  const cow = useMemo(() => {
    const s = scene.clone(true);
    shadersRef.current = [];
    s.traverse((o) => {
      if (!(o instanceof THREE.Mesh)) return;
      o.castShadow = true;
      o.receiveShadow = false;
      o.material = Array.isArray(o.material) ? o.material.map((m) => m.clone()) : o.material.clone();
      const out = Array.isArray(o.material) ? o.material : [o.material];
      out.forEach((m) => injectRegionShader(m, shadersRef.current));
    });
    return s;
  }, [scene]);

  const fit = useMemo(() => {
    const box = new THREE.Box3().setFromObject(cow);
    const c = box.getCenter(new THREE.Vector3());
    return new THREE.Vector3(-c.x, -box.min.y, -c.z);
  }, [cow]);

  // Paralaks (±~5°) + hafif nefes; idle dönüş YOK. Uniform + intro decay.
  useFrame((state) => {
    const g = group.current;
    if (g) {
      if (!reduced) {
        const tgY = state.pointer.x * 0.1;
        const tgX = -state.pointer.y * 0.05;
        g.rotation.y += (tgY - g.rotation.y) * 0.06;
        g.rotation.x += (tgX - g.rotation.x) * 0.06;
        g.scale.setScalar(MODEL_SCALE * (1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.004));
      } else {
        g.scale.setScalar(MODEL_SCALE);
      }
    }
    const sel = selected == null ? -100 : selected;
    const intro = reduced ? 0 : Math.max(0, 1 - state.clock.elapsedTime / 1.4);
    for (const sh of shadersRef.current) {
      sh.uniforms.uHoverRegion.value = hoverRef.current;
      sh.uniforms.uSelectedRegion.value = sel;
      sh.uniforms.uIntro.value = intro;
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
