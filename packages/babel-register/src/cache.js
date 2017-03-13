import path from "path";
import fs from "fs";
import { sync as mkdirpSync } from "mkdirp";
import homeOrTmp from "home-or-tmp";
import * as babel from "babel-core";

const FILENAME: string = process.env.BABEL_CACHE_PATH || path.join(homeOrTmp, ".babel.json");
let data: Object = {};

/**
 * Create a key from transform options.
 */

export function key(opts) {
  let cacheKey = `${JSON.stringify(opts)}:${babel.version}`;

  const env = process.env.BABEL_ENV || process.env.NODE_ENV;
  if (env) cacheKey += `:${env}`;

  return cacheKey;
}

/**
 * Write stringified cache to disk.
 */

export function save() {
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

  mkdirpSync(path.dirname(FILENAME));
  fs.writeFileSync(FILENAME, serialised);
}

/**
 * Load cache from disk and parse.
 */

export function load() {
  process.on("exit", save);
  process.nextTick(save);

  if (!fs.existsSync(FILENAME)) return;

  try {
    data = JSON.parse(fs.readFileSync(FILENAME));
  } catch (err) {
    return;
  }
}

/**
 * Retrieve data from cache.
 */

export function get(opts): Object {
  return data[key(opts)];
}

export function set(opts, value) {
  data[key(opts)] = value;
}
