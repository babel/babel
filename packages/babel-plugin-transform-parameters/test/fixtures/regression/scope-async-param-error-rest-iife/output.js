function f(_ref) {
  try {
    let {
      x
    } = _ref;
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }
    return async function (rest) {
      function rest() {}
      return [x, typeof rest];
    }(rest);
  } catch (e) {
    return Promise.reject(e);
  }
}
function g() {
  var _arguments = arguments;
  try {
    let {
      x
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : y;
    return function () {
      for (var _len2 = _arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        rest[_key2 - 1] = _arguments[_key2];
      }
      return async function (rest) {
        function rest() {}
        var y;
        return [x, typeof rest];
      }(rest);
    }();
  } catch (e) {
    return Promise.reject(e);
  }
}
