let s = (() => {
  var ref = babelHelpers.asyncToGenerator(function* (x) {
    var _this = this,
        _arguments = arguments;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    let t = (() => {
      var ref = babelHelpers.asyncToGenerator(function* (y, a) {
        let r = (() => {
          var ref = babelHelpers.asyncToGenerator(function* (z, b) {
            for (var _len2 = arguments.length, innerArgs = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
              innerArgs[_key2 - 2] = arguments[_key2];
            }

            yield z;
            console.log(_this, innerArgs, _arguments);
            return _this.x;
          });
          return function r(_x4, _x5) {
            return ref.apply(this, arguments);
          };
        })();
        yield r();

        console.log(_this, args, _arguments);
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
