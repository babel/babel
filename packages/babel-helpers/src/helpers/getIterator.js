/* @minVersion 7.16.5 */

import isObjectType from "isObjectType";

// prettier-ignore
export default function _getIterator(o) {
  var m = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (m != null) {
    // https://tc39.es/ecma262/multipage/abstract-operations.html#sec-getiterator
    // Step 3. Let iterator be ? Call(method, obj).
    // Step 4. If Type(iterator) is not Object, throw a TypeError exception.
    if (isObjectType(m = m.call(o))) return m;
    throw new TypeError("@@iterator method returned a non-object.");
  }
}
