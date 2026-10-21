import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { sites } from "@openai/sites-vite-plugin";

export default defineConfig({
  plugins: [vue(), sites()],
  build: { outDir: "dist/client" },
  server: {
    host: "127.0.0.1",
    port: Number(process.env.PORT) || 5173,
    strictPort: false,
  },
});
