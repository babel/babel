let s = function () {
  var ref = babelHelpers.asyncToGenerator(function* (x) {
    var _this2 = this;

    let t = (() => {
      var ref = babelHelpers.asyncToGenerator(function* (y, a) {
        let r = (() => {
          var ref = babelHelpers.asyncToGenerator(function* (z, b) {
            yield z;
            return _this2.x;
          }),
              _this = _this2;

          return function r(_x4, _x5) {
            return ref.apply(_this, arguments);
          };
        })();
        yield r();

        return _this2.g(r);
      }),
          _this = this;
      return function t(_x2, _x3) {
        return ref.apply(_this, arguments);
      };
    })();

    yield t();
    return this.h(t);
  });
  return function s(_x) {
    return ref.apply(this, arguments);
  };
}();
