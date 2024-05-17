/* @minVersion 7.9.0 */

import arrayLikeToArray from "./arrayLikeToArray.ts";

export default function _unsupportedIterableToArray<T>(o: any, minLen: number) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray<T>(o, minLen);
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
