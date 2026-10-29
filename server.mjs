import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL(".", import.meta.url));
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".jpg": "image/jpeg",
  ".ttf": "font/ttf",
  ".woff2": "font/woff2",
};
createServer(async (req, res) => {
  try {
    const path = resolve(
      root,
      "." + decodeURIComponent(new URL(req.url, "http://localhost").pathname),
    );
    if (
      !path.startsWith(root.endsWith(sep) ? root : root + sep) &&
      path !== resolve(root)
    ) {
      res.writeHead(403).end();
      return;
    }
    const file = path === resolve(root) ? resolve(root, "index.html") : path;
    const contents = await readFile(file);
    res.writeHead(200, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(contents);
  } catch {
    res.writeHead(404).end("Not found");
  }
}).listen(4317, "127.0.0.1", () =>
  console.log("STREET desktop PoC → http://localhost:4317"),
);
