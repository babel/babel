/* @minVersion 7.27.0 */

// Try/catch helper to minimize deoptimizations.
export default function _tryCatch(fn: Function, obj: unknown, arg: unknown) {
  try {
    return { type: "normal", arg: fn.call(obj, arg) };
  } catch (err) {
    return { type: "throw", arg: err };
  }
}
