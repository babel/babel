let s =
/*#__PURE__*/
(() => {
  var _ref = babelHelpers.asyncToGenerator(function* (x) {
    var _this = this,
        _arguments = arguments;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    let t =
    /*#__PURE__*/
    (() => {
      var _ref2 = babelHelpers.asyncToGenerator(function* (y, a) {
        let r =
        /*#__PURE__*/
        (() => {
          var _ref3 = babelHelpers.asyncToGenerator(function* (z, b) {
            yield z;

            for (var _len2 = arguments.length, innerArgs = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
              innerArgs[_key2 - 2] = arguments[_key2];
            }

            console.log(_this, innerArgs, _arguments);
            return _this.x;
          });

          return function r(_x4, _x5) {
            return _ref3.apply(this, arguments);
          };
        })();

        yield r();
        console.log(_this, args, _arguments);
        return _this.g(r);
      });

      return function t(_x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    })();

    yield t();
    return this.h(t);
  });

  return function s(_x) {
    return _ref.apply(this, arguments);
  };
})();
