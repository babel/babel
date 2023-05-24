/* @minVersion 7.0.0-beta.0 */

export default function _using(stack, value, isAwait) {
  if (value === null || value === void 0) return value;
  if (typeof value !== "object") {
    throw new TypeError(
      "using decarations can only be used with objects, null, or undefined."
    );
  }
  // core-js-pure uses Symbol.for for polyfilling well-known symbols
  if (isAwait) {
    var dispose =
      value[Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")];
  }
  if (dispose === null || dispose === void 0) {
    dispose = value[Symbol.dispose || Symbol.for("Symbol.dispose")];
  }
  if (typeof dispose !== "function") {
    throw new TypeError(`Property [Symbol.dispose] is not a function.`);
  }
  stack.push({ v: value, d: dispose, a: isAwait });
  return value;
}
