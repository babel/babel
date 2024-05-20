/* @minVersion 7.9.0 */

import arrayLikeToArray from "./arrayLikeToArray.ts";

export default function _unsupportedIterableToArray<T>(
  o: any,
  minLen: number | null,
): T[] | string[] | undefined {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray<string>(o, minLen);
  var name = Object.prototype.toString.call(o).slice(8, -1);
  if (name === "Object" && o.constructor) name = o.constructor.name;
  if (name === "Map" || name === "Set") return Array.from<T>(o);
  if (
    name === "Arguments" ||
    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(name)
  ) {
    return arrayLikeToArray<T>(o, minLen);
  }
}
