var Foo = function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  Object.defineProperty(this, _prop, {
    writable: true,
    value: "foo"
  });
};

var _prop = babelHelpers.classPrivateFieldLooseKey("prop");

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

  return Bar;
}(Foo);

var _prop2 = babelHelpers.classPrivateFieldLooseKey("prop");
