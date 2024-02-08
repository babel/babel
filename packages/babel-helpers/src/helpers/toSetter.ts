/* @minVersion 7.22.0 */

export default function _toSetter(fn: Function, args: any[], thisArg: any) {
  return Object.defineProperty({}, "_", {
    set: function (v) {
      fn.apply(thisArg, args.concat([v]));
    },
  });
}
