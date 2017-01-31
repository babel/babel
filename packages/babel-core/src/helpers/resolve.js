import Module from "module";
import path from "path";

const relativeModules = {};

export default function (loc: string, relative: string = process.cwd()): ?string {
  // we're in the browser, probably
  if (typeof Module === "object") return null;

  let relativeMod = relativeModules[relative];

  if (!relativeMod) {
    relativeMod = new Module;

    // We need to define an id and filename on our "fake" relative` module so that
    // Node knows what "." means in the case of us trying to resolve a plugin
    // such as "./myPlugins/somePlugin.js". If we don't specify id and filename here,
    // Node presumes "." is process.cwd(), not our relative path.
    // Since this fake module is never "loaded", we don't have to worry about mutating
    // any global Node module cache state here.
    const filename = path.join(relative, ".babelrc");
    relativeMod.id = filename;
    relativeMod.filename = filename;

    relativeMod.paths = Module._nodeModulePaths(relative);
    relativeModules[relative] = relativeMod;
  }

  try {
    return Module._resolveFilename(loc, relativeMod);
  } catch (err) {
    return null;
  }
}
