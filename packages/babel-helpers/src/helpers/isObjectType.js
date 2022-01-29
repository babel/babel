/* @minVersion 7.16.5 */

// This helper checks ES Language Type, not `typeof` operator result.
//
// https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html

export default function _isObjectType(x) {
  return typeof x === "object" ? x !== null : typeof x === "function";
}
