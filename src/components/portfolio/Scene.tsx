import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

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
  return KEYS[i].map((v, k) => v + (KEYS[i + 1][k] - v) * e);
}

function Sculpture({ reduced, onReady, accent, clay }: { reduced: boolean; onReady: () => void; accent: string; clay: string }) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ready = useRef(false);

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
    if (ring.current && !reduced) ring.current.rotation.z += dt * 0.2;
    if (!ready.current) { ready.current = true; onReady(); }
  });

  return (
    <group ref={group}>
      <RoundedBox args={[1.4, 1.4, 1.4]} radius={0.18} smoothness={4} rotation={[0.5, 0.6, 0]}>
        <meshStandardMaterial color={clay} roughness={0.95} metalness={0} />
      </RoundedBox>
      <mesh position={[0.95, 0.85, 0.4]}>
        <sphereGeometry args={[0.42, 48, 48]} />
        <meshStandardMaterial color={accent} roughness={0.9} />
      </mesh>
      <mesh ref={ring} position={[-0.6, -0.9, 0.3]} rotation={[1.1, 0, 0]}>
        <torusGeometry args={[0.55, 0.16, 24, 64]} />
        <meshStandardMaterial color={clay} roughness={0.95} />
      </mesh>
      <mesh position={[-1.05, 0.7, -0.3]} rotation={[0.3, 0.4, 0.2]}>
        <coneGeometry args={[0.32, 0.65, 4]} />
        <meshStandardMaterial color="#2a2724" roughness={0.9} flatShading />
      </mesh>
    </group>
  );
}

export default function Scene({ reduced, dark, onReady }: { reduced: boolean; dark: boolean; onReady: () => void }) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 6], fov: 40 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={dark ? 0.9 : 1.1} />
      <hemisphereLight args={["#fff8ee", "#c9c2b8", 0.6]} />
      <directionalLight position={[3, 4, 5]} intensity={1.3} />
      <Sculpture reduced={reduced} onReady={onReady} accent="#e8643c" clay={dark ? "#d9d2c7" : "#ece6dc"} />
    </Canvas>
  );
}
