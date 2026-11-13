/* @minVersion 7.29.15 */

// Unlike an inline fn.apply(context, args), this only throws on a nullish fn
// after fn, context and args have all been evaluated, matching fn(...args).
export default function _callSpread(fn: Function, context: any, args: any) {
  return fn.apply(context, args);
}
