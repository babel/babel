/* @minVersion 7.27.0 */

// Try/catch helper to minimize deoptimizations.
export default function _tryCatch(fn: Function, obj: unknown, arg: unknown) {
  try {
    return { e: 0, v: fn.call(obj, arg) };
  } catch (err) {
    return { e: 1, v: err };
  }
}
