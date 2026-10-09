/* @minVersion 7.0.0-beta.0 */

export default function _isNativeFunction(fn: unknown): fn is Function {
  // Note: This function returns "true" for core-js functions.
  try {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  } catch (_e) {
    // Firefox 31 throws when "toString" is applied to an HTMLElement
    return typeof fn === "function";
  }
}
