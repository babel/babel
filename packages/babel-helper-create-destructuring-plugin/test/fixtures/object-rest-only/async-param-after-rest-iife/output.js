function f(_ref) {
  try {
    let o = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref), _ref)), []);
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }
    return async function (rest) {
      function rest() {}
      return [o, typeof rest];
    }(rest);
  } catch (e) {
    return Promise.reject(e);
  }
}
