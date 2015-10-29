/* @flow */

import Module from "module";

let relativeModules = {};

export default function (loc: string, relative: string = process.cwd()): ?string {
  // we're in the browser, probably
  if (typeof Module === "object") return null;

  let relativeMod = relativeModules[relative];

  if (!relativeMod) {
    relativeMod = new Module;
    relativeMod.paths = Module._nodeModulePaths(relative);
    relativeModules[relative] = relativeMod;
  }

  try {
    return Module._resolveFilename(loc, relativeMod);
  } catch (err) {
    return null;
  }
}
