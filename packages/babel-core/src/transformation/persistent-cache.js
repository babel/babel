// @flow
import { join as pathJoin } from "path";

import type { Handler } from "gensync";
import type { FileResult } from "./index";
import type { PersistentCacheConfig } from "../config/validation/options";

export type CachePath = {
  path: string,
  file: string,
};

import crypto from "crypto";
import { readFile, writeFile, mkdirp } from "../gensync-utils/fs";

function createHash(salt, code) {
  return crypto
    .createHash("sha1")
    .update(salt)
    .update(code)
    .digest("hex");
}

export function getCachePath(opts: Object, code: string): ?CachePath {
  const config: ?PersistentCacheConfig = opts.persistentCache;
  if (!config) return null;

  const hash = createHash(JSON.stringify(opts), code);
  return {
    path: config.path,
    file: `${hash}.json`,
  };
}

export function* getMaybeCached(cachePath: ?CachePath): Handler<?FileResult> {
  if (!cachePath) return null;

  try {
    const { path, file } = cachePath;
    const cached = yield* readFile(pathJoin(path, file), "utf8");
    return JSON.parse(cached);
  } catch {}

  return null;
}

export function* setMaybeCached(
  cachePath: ?CachePath,
  result: FileResult,
): Handler<void> {
  if (!cachePath) return;

  try {
    const { path, file } = cachePath;
    yield* mkdirp(path);

    const stringified = JSON.stringify(result, null, 2);
    yield* writeFile(pathJoin(path, file), stringified);
  } catch {}
}
