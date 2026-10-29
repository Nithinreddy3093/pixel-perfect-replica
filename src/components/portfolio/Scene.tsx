import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import heroModel from "@/assets/models/hero.glb.asset.json";

useGLTF.preload(heroModel.url);

// Keyframes per scroll progress: [x, y, z, rotY, scale]
const KEYS: [number, number, number, number, number][] = [
  [1.6, 0, 0, 0.4, 1],      // hero
  [-2.1, 0.2, -0.5, 1.4, 0.8], // about
  [2.2, -0.2, -1, 2.4, 0.7],   // skills
  [0, 2.6, -3, 3.2, 0.55],     // projects (moves away)
  [2.4, 0, -1.5, 4.2, 0.7],    // experience
  [-2.2, 0, -1, 5.2, 0.75],    // achievements
  [0, 0, 0, Math.PI * 2, 0.95], // contact — faces user
];

function sample(p: number) {
  const f = p * (KEYS.length - 1);
  const i = Math.min(Math.floor(f), KEYS.length - 2);
  const t = f - i;
  const e = t * t * (3 - 2 * t);
  const a = KEYS[i]!, b = KEYS[i + 1]!;
  return a.map((v, k) => v + (b[k]! - v) * e) as [number, number, number, number, number];
}

function HeroModel({ reduced, onReady }: { reduced: boolean; onReady: () => void }) {
  const { scene } = useGLTF(heroModel.url);
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ready = useRef(false);

  // Clone the cached scene, auto-center it, scale it to fit, and force matte materials.
  const model = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const s = 2.6 / maxDim;
    clone.scale.setScalar(s);
    clone.position.sub(center.multiplyScalar(s));
    clone.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        const m = o.material as THREE.MeshStandardMaterial | undefined;
        if (m && "roughness" in m) {
          m.roughness = 0.92;
          m.metalness = 0.04;
          m.needsUpdate = true;
        }
      }
    });
    return clone;
  }, [scene]);

  useEffect(() => {
    const m = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", m);
    return () => window.removeEventListener("pointermove", m);
  }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const g = group.current;
    if (!g) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    const [x, y, z, ry, s] = sample(p);
    const k = 1 - Math.exp(-4 * dt);
    const narrow = window.innerWidth < 768;
    const tx = narrow ? x * 0.35 : x;
    g.position.x += (tx - g.position.x) * k;
    g.position.y += (y + (narrow ? 0.8 : 0) - g.position.y) * k;
    g.position.z += (z - g.position.z) * k;
    const sc = s * (narrow ? 0.7 : 1);
    g.scale.setScalar(g.scale.x + (sc - g.scale.x) * k);
    const idle = reduced ? 0 : state.clock.elapsedTime * 0.08;
    g.rotation.y += (ry + idle + mouse.current.x * 0.25 - g.rotation.y) * k;
    g.rotation.x += (mouse.current.y * 0.15 - g.rotation.x) * k;
    if (!ready.current) { ready.current = true; onReady(); }
  });

  return (
    <group ref={group}>
      <primitive object={model} />
    </group>
  );
}

export default function Scene({ reduced, dark, onReady }: { reduced: boolean; dark: boolean; onReady: () => void }) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 6], fov: 40 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={dark ? 1 : 1.2} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      <Suspense fallback={null}>
        <HeroModel reduced={reduced} onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
