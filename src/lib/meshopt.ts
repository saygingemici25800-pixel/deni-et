import {MeshoptDecoder, type GLTFLoader} from 'three-stdlib';

// EXT_meshopt_compression açma — drei useGLTF extendLoader callback'i.
// drei'nin GLTFLoader'ı three-stdlib'den geldiği için decoder'ı da AYNI modülden alıyoruz
// (tip + runtime uyumu, .d.ts sorunu yok). cow.glb + yacht.glb bu decoder'ı paylaşır.
export function bindMeshopt(loader: GLTFLoader) {
  loader.setMeshoptDecoder(MeshoptDecoder);
}
