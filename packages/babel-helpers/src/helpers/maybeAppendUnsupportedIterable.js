/* @minVersion 7.16.5 */

import appendArrayLike from "appendArrayLike";

export default function _maybeAppendUnsupportedIterable(a, o, n) {
  if (typeof o === "string") return appendArrayLike(a, o, n);
  if (!o) return;
  var c = Object.prototype.toString.call(o).slice(8, -1);
  if (c === "Object" && o.constructor) c = o.constructor.name;
  if (c === "Map" || c === "Set") return appendArrayLike(a, Array.from(o), n);
  if (c === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)) {
    return appendArrayLike(a, o, n);
  }
}
