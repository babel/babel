let s = function () {
  var ref = babelHelpers.asyncToGenerator(function* (x) {
    let t = (() => {
      var _this2 = this;

      var ref = babelHelpers.asyncToGenerator(function* (y) {
        let r = (() => {
          var _this = this;

          var ref = babelHelpers.asyncToGenerator(function* (z) {
            yield z;
            return _this.x;
          });
          return _x3 => ref.apply(this, arguments);
        })();
        yield r;

        return _this2.g(r);
      });
      return _x2 => ref.apply(this, arguments);
    })();
    yield t;
    return this.h(t);
  });
  return function s(_x) {
    return ref.apply(this, arguments);
  };
}();
