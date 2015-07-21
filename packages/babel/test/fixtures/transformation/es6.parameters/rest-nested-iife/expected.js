"use strict";

function broken(x) {
  for (var _len = arguments.length, foo = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    foo[_key - 1] = arguments[_key];
  }

  if (true) {
    var _ret = (function () {
      var Foo = (function (_Bar) {
        babelHelpers.inherits(Foo, _Bar);

        function Foo() {
          babelHelpers.classCallCheck(this, Foo);
          babelHelpers.get(Object.getPrototypeOf(Foo.prototype), "constructor", this).apply(this, arguments);
        }

        return Foo;
      })(Bar);

      return {
        v: hello.apply(undefined, foo)
      };
    })();

    if (typeof _ret === "object") return _ret.v;
  }
}
