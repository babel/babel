function broken(x) {
  if (true) {
    var Foo = function (_Bar) {
      babelHelpers.inherits(Foo, _Bar);

      function Foo() {
        babelHelpers.classCallCheck(this, Foo);
        return babelHelpers.possibleConstructorReturn(this, (Foo.__proto__ || Object.getPrototypeOf(Foo)).apply(this, arguments));
      }

      return Foo;
    }(Bar);

    for (var _len = arguments.length, foo = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      foo[_key - 1] = arguments[_key];
    }

    return hello.apply(void 0, foo);
  }
}
