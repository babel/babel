/* @minVersion 7.22.0 */

// NOTE: This function returns an object with a `_` that is
// meant to be used only once.

export default function _toSetter(fn, thisArg) {
  var args = [].slice.call(arguments, 2);
  return Object.defineProperty({}, "_", {
    set: function (v) {
      args.push(v);
      fn.apply(thisArg, args);
    },
  });
}
