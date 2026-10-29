## Architecture rules

- The hero 3D model is the user-supplied GLB at `public/models/hero.glb`, referenced by `src/assets/models/hero.glb.asset.json`; `Scene.tsx` loads it with `useGLTF`, clones and normalizes it (Box3 center + scale) before rendering. Mobile devices with WebGL support use the Canvas too. `prefers-reduced-motion` and low-power/no-WebGL devices use the static still asset.
