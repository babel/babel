/* @minVersion 8.2.0 */
// TODO: Update minVersion to the version this helper is released in.

// Unlike fn.apply(context, args), this only throws on a nullish fn after
// fn, context and args have all been evaluated, matching fn(...args).
export default function _callSpread(fn: Function, context: any, args: any) {
  return Function.prototype.apply.call(fn, context, args);
}
