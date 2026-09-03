import { cpSync, existsSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const source = join(root, "..", "content");
const target = join(root, "content-snapshot");

if (!existsSync(source)) {
  console.warn(`[sync-content] Source not found: ${source}`);
  process.exit(0);
}

rmSync(target, { recursive: true, force: true });
cpSync(source, target, { recursive: true });
console.log(`[sync-content] Copied ${source} -> ${target}`);
