var Foo =
/*#__PURE__*/
function (_Bar) {
  "use strict";

  function Foo() {
    var _temp, _this;

    babelHelpers.classCallCheck(this, Foo);
    foo((_temp = _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Foo).call(this)), Object.defineProperty(babelHelpers.assertThisInitialized(babelHelpers.assertThisInitialized(_this)), _bar, {
      writable: true,
      value: "foo"
    }), _temp));
    return _this;
  }

  babelHelpers.inherits(Foo, _Bar);
  return Foo;
}(Bar);

var _bar = babelHelpers.classPrivateFieldKey("bar");
