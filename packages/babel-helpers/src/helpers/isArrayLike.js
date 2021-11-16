/* @minVersion 7.16.5 */

// Only Objects (in ES Language Type sense, not `typeof` operator) can be
// array-like. That means Function and String objects are array-like, but
// string primitives are not, even though they have a `length` property.
//
// https://tc39.es/ecma262/multipage/abstract-operations.html#sec-lengthofarraylike

import isObjectType from "isObjectType";

export default function _isArrayLike(x) {
  return isObjectType(x) && typeof x.length === "number";
}
