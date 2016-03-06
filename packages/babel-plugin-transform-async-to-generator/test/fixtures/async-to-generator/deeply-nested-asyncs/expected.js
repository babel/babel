let s = (() => {
  var ref = babelHelpers.asyncToGenerator(function* (x) {
    var _this = this;

    let t = (() => {
      var ref = babelHelpers.asyncToGenerator(function* (y, a) {
        let r = (() => {
          var ref = babelHelpers.asyncToGenerator(function* (z, b) {
            yield z;
            return _this.x;
          });
          return function r(_x4, _x5) {
            return ref.apply(this, arguments);
          };
        })();
        yield r();

        return _this.g(r);
      });
      return function t(_x2, _x3) {
        return ref.apply(this, arguments);
      };
    })();

    yield t();
    return this.h(t);
  });
  return function s(_x) {
    return ref.apply(this, arguments);
  };
})();
