function s() {
  return (s = babelHelpers.asyncToGenerator(function* (x) {
    var _arguments = arguments,
      _this = this,
      _ref;
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    let t = /*#__PURE__*/function t() {
      return (_ref = _ref || babelHelpers.asyncToGenerator(function* (y, a) {
        var _ref2;
        let r = /*#__PURE__*/function r() {
          return (_ref2 = _ref2 || babelHelpers.asyncToGenerator(function* (z, b) {
            yield z;
            for (var _len2 = arguments.length, innerArgs = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
              innerArgs[_key2 - 2] = arguments[_key2];
            }
            console.log(_this, innerArgs, _arguments);
            return _this.x;
          })).apply(this, arguments);
        };
        yield r();
        console.log(_this, args, _arguments);
        return _this.g(r);
      })).apply(this, arguments);
    };
    yield t();
    return this.h(t);
  })).apply(this, arguments);
}
