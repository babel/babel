import path from "path";
import fs from "fs";
import {sync as mkdirpSync} from "mkdirp";
import homeOrTmp from "home-or-tmp";
import pathExists from "path-exists";
import each from "lodash/each";

function addInstance(fn) {
  if (process.env.NODE_APP_INSTANCE === undefined) {
    return fn;
  }
  const instance = `.${process.env.NODE_APP_INSTANCE}`;
  if (fn.endsWith(".json")) {
    return `${fn.substr(0, fn.length-5)}${instance}.json`;
  } else {
    return `${fn}${instance}`;
  }
}

const FILENAME = addInstance(process.env.BABEL_CACHE_PATH || path.join(homeOrTmp, ".babel.json"));
const EXPIRE_TIME = 60 * 60 * 24 * 1000 * 10; // 10 days
const startTime = Date.now();
let data = {};
let isDirty = false;
let enable = !process.env.BABEL_DISABLE_CACHE;

/**
 * Write stringified cache to disk.
 */

let delaySaveTimer;

function clearSaveTimer() {
  if (delaySaveTimer) {
    clearTimeout(delaySaveTimer);
    delaySaveTimer = undefined;
  }
}

export function save() {
  if (!enable || !isDirty) return;

  isDirty = false;
  clearSaveTimer();

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


function delaySave() {
  clearSaveTimer();

  delaySaveTimer = setTimeout(() => {
    delaySaveTimer = undefined;
    save();
  }, 500);
}

function clearExpire() {
  const now = Date.now();
  each(data, (result, key) => {
    if (result.createTime === undefined || result.accessTime === undefined) {
      isDirty = true;
      result.createTime = result.accessTime = now;
    }

    if ((now - result.createTime) >= EXPIRE_TIME && result.accessTime < startTime) {
      isDirty = true;
      delete data[key];
    }
  });

  if (isDirty) {
    delaySave();
  }
}

/**
 * Load cache from disk and parse.
 */

export function load() {
  enable = !process.env.BABEL_DISABLE_CACHE;
  if (!enable) return;

  process.on("exit", save);

  if (!pathExists.sync(FILENAME)) return;

  try {
    data = JSON.parse(fs.readFileSync(FILENAME));
    setTimeout(clearExpire, 120 * 1000);  // clear expire entries in 2 minutes
  } catch (err) {
    return;
  }
}

/**
 * Retrieve data from cache.
 */

export function get() {
  return enable && data;
}

/**
 * Retrieve an entry for key and mtime
 * @param key - cache key
 * @param mtime - optional - mtime to check
 * @returns {*}
 */

export function getEntry(key, mtime) {
  if (enable) {
    const result = data[key];
    if (result) {
      if (mtime !== undefined && result.mtime !== mtime) {
        return undefined;
      }
      result.accessTime = Date.now();
    }

    return result;
  }
}

/**
 * Create a new entry for key and result
 * @param key - cache key
 * @param result - result to cache
 */

export function newEntry(key, result) {
  if (enable) {
    isDirty = true;
    result.accessTime = result.createTime = Date.now();
    data[key] = result;
    delaySave();
  }
}
