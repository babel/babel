// @flow

import type { Gensync, Handler } from "gensync";

import { makeStrongCache, type CacheConfigurator } from "../caching";
import * as fs from "../../gensync-utils/fs";
import nodeFs from "fs";

export function makeStaticFileCache<T>(
  fn: (string, string) => T,
): Gensync<[string], T | null> {
  return (makeStrongCache(function*(
    filepath: string,
    cache: CacheConfigurator<?void>,
  ): Handler<null | T> {
    const cached = cache.invalidate(() => fileMtime(filepath));

    if (cached === null) {
      cache.forever();
      return null;
    }

    return fn(filepath, yield* fs.readFile(filepath, "utf8"));
  }): Gensync<any, *>);
}

function fileMtime(filepath: string): number | null {
  try {
    return +nodeFs.statSync(filepath).mtime;
  } catch (e) {
    if (e.code !== "ENOENT" && e.code !== "ENOTDIR") throw e;
  }

  return null;
}
