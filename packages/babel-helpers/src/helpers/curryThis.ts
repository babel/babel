/* @minVersion 7.24.0 */

export default function _curryThis(fn: Function) {
  return function (thisArg: any) {
    return fn.apply(thisArg, [].slice.call(arguments, 1));
  };
}
