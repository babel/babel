var _prop = /*#__PURE__*/new WeakMap();
let Foo = /*#__PURE__*/babelHelpers.createClass(function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  babelHelpers.classPrivateFieldInitSpec(this, _prop, "foo");
});
var _prop2 = /*#__PURE__*/new WeakMap();
let Bar = /*#__PURE__*/function (_Foo2) {
  "use strict";

  babelHelpers.inherits(Bar, _Foo2);
  function Bar(...args) {
    var _this;
    babelHelpers.classCallCheck(this, Bar);
    _this = babelHelpers.callSuper(this, Bar, [...args]);
    babelHelpers.classPrivateFieldInitSpec(babelHelpers.assertThisInitialized(_this), _prop2, "bar");
    return _this;
  }
  return babelHelpers.createClass(Bar);
}(Foo);
