import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  server: { host: "0.0.0.0", port: 8080, strictPort: true },
  cacheDir: "node_modules/.vite-local",
  plugins: [
    tanstackStart({ server: { entry: "server" } }),
    viteReact(),
    tailwindcss(),
    ...(command === "build"
      ? [
          nitro({
            preset: "cloudflare_module",
            buildDir: "node_modules/.nitro-publish",
            output: { dir: ".output-publish" },
            cloudflare: { nodeCompat: true, deployConfig: false },
          }),
        ]
      : []),
  ],
  resolve: { tsconfigPaths: true },
}));
