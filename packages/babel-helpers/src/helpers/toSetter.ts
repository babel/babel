/* @minVersion 7.24.0 */

export default function _toSetter(fn: Function, args: any[], thisArg: any) {
  if (!args) args = [];
  var l = args.length++;
  return Object.defineProperty({}, "_", {
    set: function (v) {
      args[l] = v;
      fn.apply(thisArg, args);
    },
  });
}
