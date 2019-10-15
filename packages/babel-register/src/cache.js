import path from "path";
import fs from "fs";
import os from "os";
import { sync as mkdirpSync } from "mkdirp";
import * as babel from "@babel/core";
import findCacheDir from "find-cache-dir";

const DEFAULT_CACHE_DIR =
  findCacheDir({ name: "@babel/register" }) || os.homedir() || os.tmpdir();
const DEFAULT_FILENAME = path.join(
  DEFAULT_CACHE_DIR,
  `.babel.${babel.version}.${babel.getEnv()}.json`,
);
const FILENAME: string = process.env.BABEL_CACHE_PATH || DEFAULT_FILENAME;
let data: Object = {};

let cacheDisabled = false;

function isCacheDisabled() {
  return process.env.BABEL_DISABLE_CACHE ?? cacheDisabled;
}
/**
 * Write stringified cache to disk.
 */

export function save() {
  if (isCacheDisabled()) return;
  let serialised: string = "{}";

  try {
    serialised = JSON.stringify(data, null, "  ");
  } catch (err) {
    if (err.message === "Invalid string length") {
      err.message = "Cache too large so it's been cleared.";
      console.error(err.stack);
    } else {
      throw err;
    }
  }

  try {
    mkdirpSync(path.dirname(FILENAME));
    fs.writeFileSync(FILENAME, serialised);
  } catch (e) {
    switch (e.code) {
      case "EACCES":
      case "EPERM":
        console.warn(
          `Babel could not write cache to file: ${FILENAME} 
due to a permission issue. Cache is disabled.`,
        );
        cacheDisabled = true;
        break;
      case "EROFS":
        console.warn(
          `Babel could not write cache to file: ${FILENAME} 
because it resides in a readonly filesystem. Cache is disabled.`,
        );
        cacheDisabled = true;
        break;
      default:
        throw e;
    }
  }
}

/**
 * Load cache from disk and parse.
 */

export function load() {
  if (isCacheDisabled()) return;

  process.on("exit", save);
  process.nextTick(save);

  let cacheContent;

  try {
    cacheContent = fs.readFileSync(FILENAME);
  } catch (e) {
    switch (e.code) {
      case "ENOENT":
        return;
      case "EACCES":
      case "EPERM":
        console.warn(
          `Babel could not read cache file: ${FILENAME}
due to a permission issue. Cache is disabled.`,
        );
        cacheDisabled = true;
        return;
      default:
        throw e;
    }
  }

  try {
    data = JSON.parse(cacheContent);
  } catch (err) {}
}

/**
 * Retrieve data from cache.
 */

export function get(): Object {
  return data;
}

/**
 * Clear the cache object.
 */

export function clear() {
  data = {};
}
