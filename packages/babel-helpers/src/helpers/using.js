/* @minVersion 7.0.0-beta.0 */

export default function _using(stack, value) {
  if (value !== null && value !== void 0) {
    // core-js-pure uses Symbol.for("Symbol.dispose").
    var dispose = value[Symbol.dispose || Symbol.for("Symbol.dispose")];
    if (typeof dispose !== "function") {
      throw new TypeError(`Property [Symbol.dispose] is not a function.`);
    }
    stack.push({ v: value, d: dispose });
  }
  return value;
}
