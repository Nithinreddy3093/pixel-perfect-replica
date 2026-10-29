<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules

- The hero 3D model is a user-supplied GLB hosted as a CDN asset (`src/assets/models/hero.glb.asset.json`, meshopt+WebP optimized); `Scene.tsx` loads it with `useGLTF`, clones and normalizes it (Box3 center + scale) before rendering. Mobile, `prefers-reduced-motion`, and no-WebGL devices get the static still `hero-still.png.asset.json` instead of the Canvas — keep both in sync when the model changes.
