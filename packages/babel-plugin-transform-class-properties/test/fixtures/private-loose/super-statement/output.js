var _bar = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("bar");
var Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  babelHelpers.inherits(Foo, _Bar);
  function Foo() {
    var _this;
    babelHelpers.classCallCheck(this, Foo);
    _this = babelHelpers.callSuper(this, Foo);
    Object.defineProperty(babelHelpers.assertThisInitialized(_this), _bar, {
      writable: true,
      value: "foo"
    });
    return _this;
  }
  return babelHelpers.createClass(Foo);
}(Bar);
