var _bar = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("bar");
var Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  babelHelpers.inherits(Foo, _Bar);
  var _super = babelHelpers.createSuper(Foo);
  function Foo() {
    var _this;
    babelHelpers.classCallCheck(this, Foo);
    foo((_this = _super.call(this), Object.defineProperty(babelHelpers.assertThisInitialized(_this), _bar, {
      writable: true,
      value: "foo"
    }), babelHelpers.assertThisInitialized(_this)));
    return _this;
  }
  return babelHelpers.createClass(Foo);
}(Bar);
