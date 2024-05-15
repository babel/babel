/* @minVersion 7.9.0 */

import arrayLikeToArray from "arrayLikeToArray";

export default function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var name = Object.prototype.toString.call(o).slice(8, -1);
  if (name === "Object" && o.constructor) name = o.constructor.name;
  if (name === "Map" || name === "Set") return Array.from(o);
  if (
    name === "Arguments" ||
    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(name)
  ) {
    return arrayLikeToArray(o, minLen);
  }
}
