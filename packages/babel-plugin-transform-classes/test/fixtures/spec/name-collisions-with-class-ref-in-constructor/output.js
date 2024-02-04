var Base = /*#__PURE__*/function () {
  "use strict";

  function Base() {
    babelHelpers.classCallCheck(this, Base);
  }
  babelHelpers.createClass(Base, [{
    key: "method",
    value: function method() {}
  }]);
  return Base;
}();
var Foo = /*#__PURE__*/function (_Base) {
  "use strict";

  babelHelpers.inherits(Foo, _Base);
  function Foo() {
    var _thisSuper, _this;
    babelHelpers.classCallCheck(this, Foo);
    _this = babelHelpers.callSuper(this, Foo);
    if (true) {
      var _Foo;
      babelHelpers.get((_thisSuper = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(Foo.prototype)), "method", _thisSuper).call(_thisSuper);
    }
    return _this;
  }
  babelHelpers.createClass(Foo, [{
    key: "method",
    value: function method() {}
  }]);
  return Foo;
}(Base);
