var _prop = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("prop");
var Foo = /*#__PURE__*/babelHelpers.createClass(function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  Object.defineProperty(this, _prop, {
    writable: true,
    value: "foo"
  });
});
var _prop2 = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("prop");
var Bar = /*#__PURE__*/function (_Foo) {
  "use strict";

  babelHelpers.inherits(Bar, _Foo);
  var _super = babelHelpers.createSuper(Bar);
  function Bar(...args) {
    var _this;
    babelHelpers.classCallCheck(this, Bar);
    _this = _super.call(this, ...args);
    Object.defineProperty(babelHelpers.assertThisInitialized(_this), _prop2, {
      writable: true,
      value: "bar"
    });
    return _this;
  }
  return babelHelpers.createClass(Bar);
}(Foo);
