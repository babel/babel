import path from "path";
import fs from "fs";
import { sync as mkdirpSync } from "mkdirp";
import homeOrTmp from "home-or-tmp";
import crypto from "crypto";

const DIRNAME = process.env.BABEL_CACHE_PATH || path.join(homeOrTmp, ".babel");
mkdirpSync(DIRNAME);

function getCacheFile(key) {
  return path.join(DIRNAME, crypto.createHash("md5").update(key).digest("hex") + ".json");
}

const cache = {};

export function get(key) {
  if (!cache.hasOwnProperty(key)) {
    const filename = getCacheFile(key);
    try {
      cache[key] = JSON.parse(fs.readFileSync(filename));
    } catch (err) {
      return;
    }
  }

  return cache[key];
}

export function set(key, value) {
  cache[key] = value;
  const filename = getCacheFile(key);
  try {
    fs.writeFile(filename, JSON.stringify(value));
  } catch (err) {
    return;
  }
}
