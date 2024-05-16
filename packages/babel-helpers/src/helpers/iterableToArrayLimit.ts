/* @minVersion 7.0.0-beta.0 */

export default function _iterableToArrayLimit(arr, i) {
  // this is an expanded form of \`for...of\` that properly supports abrupt completions of
  // iterators etc. variable names have been minimised to reduce the size of this massive
  // helper. sometimes spec compliance is annoying :(
  //
  // _n = _iteratorNormalCompletion
  // _d = _didIteratorError
  // _e = _iteratorError
  // _i = _iterator
  // _s = _step
  // _x = _next
  // _r = _return

  var _i =
    arr == null
      ? null
      : (typeof Symbol !== "undefined" && arr[Symbol.iterator]) ||
        arr["@@iterator"];
  if (_i == null) return;

  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e, _x, _r;
  try {
    _x = (_i = _i.call(arr)).next;
    if (i === 0) {
      if (Object(_i) !== _i) return;
      _n = false;
    } else {
      for (; !(_n = (_s = _x.call(_i)).done); _n = true) {
        _arr.push(_s.value);
        if (_arr.length === i) break;
      }
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) {
        _r = _i["return"]();
        // eslint-disable-next-line no-unsafe-finally
        if (Object(_r) !== _r) return;
      }
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      if (_d) throw _e;
    }
  }
  return _arr;
}
