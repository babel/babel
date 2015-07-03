import path from "path";
import fs from "fs";
import homeOrTmp from "home-or-tmp";
import pathExists from "path-exists";

const FILENAME = process.env.BABEL_CACHE_PATH || path.join(homeOrTmp, ".babel.json");
var data = {};

/**
 * [Please add a description.]
 */

export function save() {
  fs.writeFileSync(FILENAME, JSON.stringify(data, null, "  "));
}

/**
 * [Please add a description.]
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
 * [Please add a description.]
 */

export function get() {
  return data;
}
