import path from "path";

var root = path.resolve(__dirname, "../../../");

/**
 * Protect Babel internals from being hotlinked by other tools.
 * Sorry, not sorry.
 */

export default function (module) {
  if (module.parent && module.parent.filename.indexOf(root) !== 0) {
    throw new Error("Don't hotlink internal Babel files.");
  }
}
