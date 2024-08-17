/* @minVersion 7.0.0-beta.0 */

import setPrototypeOf from "./setPrototypeOf.ts";

export default function _inherits(
  subClass: Function,
  superClass: Function | null,
) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  // We can't use defineProperty to set the prototype in a single step because it
  // doesn't work in Chrome <= 36. https://github.com/babel/babel/issues/14056
  // V8 bug: https://bugs.chromium.org/p/v8/issues/detail?id=3334
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true,
    },
  });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) setPrototypeOf(subClass, superClass);
}
