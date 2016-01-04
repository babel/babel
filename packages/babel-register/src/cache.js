import path from "path";
import fs from "fs";
import { sync as mkdirpSync } from "mkdirp";
import homeOrTmp from "home-or-tmp";
import pathExists from "path-exists";

const FILENAME = process.env.BABEL_CACHE_PATH || path.join(homeOrTmp, ".babel.json");
let data = {};

/**
 * Write stringified cache to disk.
 */

export function save() {
  let serialised = {};
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
  if (process.env.BABEL_DISABLE_CACHE) return;

  process.on("exit", save);
  process.nextTick(save);

  if (!pathExists.sync(FILENAME)) return;

  try {
    data = JSON.parse(fs.readFileSync(FILENAME));
  } catch (err) {
    return;
  }
}

/**
 * Retrieve data from cache.
 */

export function get() {
  return data;
}
