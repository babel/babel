import path from "path";
import fs from "fs";

export default async function () { // eslint-disable-line require-yield
  let cwd = process.cwd();
  let parts = cwd.split(path.sep);

  do {
    let loc = parts.join(path.sep);
    if (!loc) break;

    let babelrc = path.join(loc, ".babelrc");
    if (fs.existsSync(babelrc)) {
      return [true, `Found config at ${babelrc}`];
    }

    let packagejson = path.join(loc, "package.json");
    if (fs.existsSync(packagejson)) {
      let pkg = require(packagejson);
      if (pkg.babel) {
        return [true, `Found config at ${packagejson}`];
      }
    }

    parts.pop();
  } while (parts.length);

  return [false, "Found no .babelrc config"];
}
