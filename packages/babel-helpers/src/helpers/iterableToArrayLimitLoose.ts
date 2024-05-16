/* @minVersion 7.0.0-beta.0 */

export default function _iterableToArrayLimitLoose(arr, i) {
  var _i =
    arr &&
    ((typeof Symbol !== "undefined" && arr[Symbol.iterator]) ||
      arr["@@iterator"]);
  if (_i == null) return;

  var _arr = [];
  var _s;
  for (_i = _i.call(arr); arr.length < i && !(_s = _i.next()).done; ) {
    _arr.push(_s.value);
  }
  return _arr;
}
