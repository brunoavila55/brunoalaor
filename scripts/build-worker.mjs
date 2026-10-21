import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const exported = new URL("out/", root);
const client = new URL("dist/client/", root);
const server = new URL("dist/server/", root);

// Validate the Next.js export before replacing a previous deployment artifact.
await readFile(new URL("index.html", exported));
await rm(new URL("dist/", root), { recursive: true, force: true });
await mkdir(server, { recursive: true });
await cp(exported, client, { recursive: true });

await writeFile(
  new URL("index.js", server),
  `export default {
  async fetch(request, env) {
    if (!['GET', 'HEAD'].includes(request.method)) {
      return new Response('Method not allowed', {
        status: 405,
        headers: { Allow: 'GET, HEAD' },
      });
    }
    return env.ASSETS.fetch(request);
  },
};
`,
);

// Preserve the legacy deployment path while allowing plain `wrangler deploy`.
const { $schema, ...config } = JSON.parse(
  await readFile(new URL("wrangler.json", root), "utf8"),
);
await writeFile(
  new URL("wrangler.json", server),
  JSON.stringify(
    {
      ...config,
      main: "index.js",
      assets: { ...config.assets, directory: "../client" },
    },
    null,
    2,
  ) + "\n",
);
console.log("Next.js static export and Cloudflare Workers artifacts are ready.");
