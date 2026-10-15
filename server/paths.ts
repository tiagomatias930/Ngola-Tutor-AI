import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

/**
 * Project root = nearest ancestor holding package.json. Works the same from
 * source (server/*.ts), compiled output (server/dist) and the Docker image.
 */
export function projectRoot(from = path.dirname(fileURLToPath(import.meta.url))): string {
  let current = from;
  while (true) {
    if (fs.existsSync(path.join(current, 'package.json'))) return current;
    const parent = path.dirname(current);
    if (parent === current) return process.cwd();
    current = parent;
  }
}
