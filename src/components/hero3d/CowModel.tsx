'use client';

import {useMemo, useRef} from 'react';
import {useGLTF, Line} from '@react-three/drei';
import {useFrame, useThree, type ThreeEvent} from '@react-three/fiber';
import * as THREE from 'three';
import {MODEL_SCALE, BOXES, regionOf} from './cuts';

useGLTF.preload('/models/cow.glb');

const NBOX = BOXES.length;
const BOX_Z = BOXES.map((b) => new THREE.Vector2(b.z[0], b.z[1]));
const BOX_Y = BOXES.map((b) => new THREE.Vector2(b.y[0], b.y[1]));
const BOX_R = BOXES.map((b) => b.r);

type Pt = [number, number, number];

// Mesh üçgenlerinde bölge DEĞİŞEN kenarlardan sınır segmentleri üret. Nokta = kenar orta
// noktası, yüzey normali yönünde hafif kaldırılmış (z-fighting'i önler). Çizgiler yüzeye sarılır.
function buildBoundarySegments(geom: THREE.BufferGeometry): Pt[] {
  const pos = geom.attributes.position as THREE.BufferAttribute;
  const nor = geom.attributes.normal as THREE.BufferAttribute | undefined;
  const index = geom.index;
  const triCount = index ? index.count / 3 : pos.count / 3;
  const EPS = 0.006; // model-uzayı kaldırma (yüzeyin biraz üstünde)
  const out: Pt[] = [];

  const idxAt = (t: number, k: number) => (index ? index.getX(t * 3 + k) : t * 3 + k);
  const reg = (i: number) => regionOf(pos.getY(i), pos.getZ(i));
  const cross = (ia: number, ib: number): Pt => {
    const mx = (pos.getX(ia) + pos.getX(ib)) / 2;
    const my = (pos.getY(ia) + pos.getY(ib)) / 2;
    const mz = (pos.getZ(ia) + pos.getZ(ib)) / 2;
    let nx = 0, ny = 1, nz = 0;
    if (nor) {
      nx = nor.getX(ia) + nor.getX(ib);
      ny = nor.getY(ia) + nor.getY(ib);
      nz = nor.getZ(ia) + nor.getZ(ib);
      const l = Math.hypot(nx, ny, nz) || 1;
      nx /= l; ny /= l; nz /= l;
    }
    return [mx + nx * EPS, my + ny * EPS, mz + nz * EPS];
  };

  for (let t = 0; t < triCount; t++) {
    const a = idxAt(t, 0), b = idxAt(t, 1), c = idxAt(t, 2);
    const ra = reg(a), rb = reg(b), rc = reg(c);
    const cps: Pt[] = [];
    if (ra >= 0 && rb >= 0 && ra !== rb) cps.push(cross(a, b));
    if (rb >= 0 && rc >= 0 && rb !== rc) cps.push(cross(b, c));
    if (rc >= 0 && ra >= 0 && rc !== ra) cps.push(cross(c, a));
    if (cps.length >= 2) {
      out.push(cps[0], cps[1]);
      if (cps.length === 3) out.push(cps[1], cps[2]);
    }
  }
  return out;
}

// Material'a SADECE bölge tonu enjekte et (çizgiler artık gerçek geometriyle çiziliyor).
function injectRegionTint(mat: THREE.Material, sink: THREE.WebGLProgramParametersWithUniforms[]) {
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uBoxZ = {value: BOX_Z};
    shader.uniforms.uBoxY = {value: BOX_Y};
    shader.uniforms.uBoxR = {value: BOX_R};
    shader.uniforms.uHoverRegion = {value: -100};
    shader.uniforms.uSelectedRegion = {value: -100};

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
        int reg = regionAt(vLocalPos.z, vLocalPos.y);
        float regf = float(reg);
        float hov = (reg >= 0 && abs(regf - uHoverRegion) < 0.5) ? 1.0 : 0.0;
        float sel = (reg >= 0 && abs(regf - uSelectedRegion) < 0.5) ? 1.0 : 0.0;
        vec3 etCol = vec3(0.604, 0.141, 0.141);
        gl_FragColor.rgb = mix(gl_FragColor.rgb, etCol, hov * 0.12 + sel * 0.22);
        if (uSelectedRegion > -0.5) {
          float lum = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
          gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(lum), (1.0 - sel) * 0.20);
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
      out.forEach((m) => injectRegionTint(m, shadersRef.current));
    });
    return s;
  }, [scene]);

  // KALIN net kesim çizgileri — bölge sınırı segmentleri (yüzeye sarılı, dana ile döner).
  const linePoints = useMemo(() => {
    let pts: Pt[] = [];
    cow.traverse((o) => {
      if (o instanceof THREE.Mesh && pts.length === 0) pts = buildBoundarySegments(o.geometry);
    });
    return pts;
  }, [cow]);

  const fit = useMemo(() => {
    const box = new THREE.Box3().setFromObject(cow);
    const c = box.getCenter(new THREE.Vector3());
    return new THREE.Vector3(-c.x, -box.min.y, -c.z);
  }, [cow]);

  // Paralaks (±~5°) + hafif nefes; idle dönüş YOK. Ton uniform'larını güncelle.
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
        {linePoints.length >= 2 && (
          <Line
            points={linePoints}
            segments
            worldUnits={false}
            lineWidth={3.5}
            color="#1A1411"
            transparent
            opacity={0.9}
            toneMapped={false}
            polygonOffset
            polygonOffsetFactor={-4}
          />
        )}
      </group>
    </group>
  );
}
