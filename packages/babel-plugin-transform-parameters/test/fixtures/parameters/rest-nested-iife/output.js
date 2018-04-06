function broken(x) {
  if (true) {
    var Foo =
    /*#__PURE__*/
    function (_Bar) {
      babelHelpers.inherits(Foo, _Bar);

      function Foo() {
        var _babelHelpers$getProt;

        babelHelpers.classCallCheck(this, Foo);

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return babelHelpers.possibleConstructorReturn(this, (_babelHelpers$getProt = babelHelpers.getPrototypeOf(Foo)).call.apply(_babelHelpers$getProt, [this].concat(args)));
      }

      return Foo;
    }(Bar);

    for (var _len = arguments.length, foo = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      foo[_key - 1] = arguments[_key];
    }

    return hello.apply(void 0, foo);
  }
}
