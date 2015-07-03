import path from "path";

var root = path.resolve(__dirname, "../../../");

/**
 * [Please add a description.]
 */

export default function (module) {
  if (module.parent && module.parent.filename.indexOf(root) !== 0) {
    throw new Error("Don't hotlink internal Babel files.");
  }
}
