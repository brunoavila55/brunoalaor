import { readFile, mkdir, writeFile } from "node:fs/promises";

// A minimal Workers-compatible entry point. The application itself is Vue 3.
const html = await readFile(
  new URL("../dist/client/index.html", import.meta.url),
  "utf8",
);
const server = new URL("../dist/server/", import.meta.url);
await mkdir(server, { recursive: true });
await writeFile(
  new URL("index.js", server),
  `const html = ${JSON.stringify(html)};
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/' || url.pathname === '/index.html') {
      if (!['GET', 'HEAD'].includes(request.method)) return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
      // Use the platform request URL, never user-provided forwarded host headers.
      const imageUrl = new URL('/og.png', url.origin).href;
      const page = html.replaceAll('content="/og.png"', 'content="' + imageUrl + '"');
      return new Response(request.method === 'HEAD' ? null : page, { headers: { 'content-type': 'text/html; charset=utf-8', 'x-content-type-options': 'nosniff' } });
    }
    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response('Not found', { status: 404 });
  }
};\n`,
);
await writeFile(
  new URL("wrangler.json", server),
  JSON.stringify(
    {
      name: "bruno-alaor-portfolio",
      main: "index.js",
      compatibility_date: "2026-05-15",
      assets: { directory: "../client", binding: "ASSETS", run_worker_first: true },
    },
    null,
    2,
  ),
);
console.log("Vue portfolio and Workers entry point are ready.");
