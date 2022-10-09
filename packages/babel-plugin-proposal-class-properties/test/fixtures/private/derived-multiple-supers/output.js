var _bar = /*#__PURE__*/new WeakMap();
var Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  babelHelpers.inherits(Foo, _Bar);
  var _super = babelHelpers.createSuper(Foo);
  function Foo() {
    var _this;
    babelHelpers.classCallCheck(this, Foo);
    if (condition) {
      _this = _super.call(this);
      babelHelpers.classPrivateFieldInitSpec(babelHelpers.assertThisInitialized(_this), _bar, {
        writable: true,
        value: "foo"
      });
    } else {
      _this = _super.call(this);
      babelHelpers.classPrivateFieldInitSpec(babelHelpers.assertThisInitialized(_this), _bar, {
        writable: true,
        value: "foo"
      });
    }
    return babelHelpers.possibleConstructorReturn(_this);
  }
  return babelHelpers.createClass(Foo);
}(Bar);
