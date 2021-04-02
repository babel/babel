import type { Handler } from "gensync";

import { makeStrongCache } from "../caching";
import type { CacheConfigurator } from "../caching";
import * as fs from "../../gensync-utils/fs";
import nodeFs from "fs";

export function makeStaticFileCache<T>(
  fn: (filepath: string, contents: string) => T,
) {
  return makeStrongCache(function* (
    filepath: string,
    cache: CacheConfigurator<void>,
  ): Handler<null | T> {
    const cached = cache.invalidate(() => fileMtime(filepath));

    if (cached === null) {
      return null;
    }

    return fn(filepath, yield* fs.readFile(filepath, "utf8"));
  });
}

function fileMtime(filepath: string): number | null {
  if (!nodeFs.existsSync(filepath)) return null;

  try {
    return +nodeFs.statSync(filepath).mtime;
  } catch (e) {
    if (e.code !== "ENOENT" && e.code !== "ENOTDIR") throw e;
  }

  return null;
}
