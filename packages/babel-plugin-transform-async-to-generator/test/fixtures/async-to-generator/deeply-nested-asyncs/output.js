function s(_x) {
  return _s.apply(this, arguments);
}
function _s() {
  _s = babelHelpers.asyncToGenerator(function* (x) {
    var _arguments = arguments,
      _this = this;
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    let t = /*#__PURE__*/function () {
      var _t = babelHelpers.asyncToGenerator(function* (y, a) {
        let r = /*#__PURE__*/function () {
          var _r = babelHelpers.asyncToGenerator(function* (z, b) {
            yield z;
            for (var _len2 = arguments.length, innerArgs = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
              innerArgs[_key2 - 2] = arguments[_key2];
            }
            console.log(_this, innerArgs, _arguments);
            return _this.x;
          });
          function r(_x4, _x5) {
            return _r.apply(this, arguments);
          }
          return r;
        }();
        yield r();
        console.log(_this, args, _arguments);
        return _this.g(r);
      });
      function t(_x2, _x3) {
        return _t.apply(this, arguments);
      }
      return t;
    }();
    yield t();
    return this.h(t);
  });
  return _s.apply(this, arguments);
}
