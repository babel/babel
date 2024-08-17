var Base = /*#__PURE__*/function () {
  "use strict";

  function Base() {
    babelHelpers.classCallCheck(this, Base);
  }
  return babelHelpers.createClass(Base, [{
    key: "method",
    value: function method() {}
  }]);
}();
var Foo = /*#__PURE__*/function (_Base) {
  "use strict";

  function Foo() {
    var _this;
    babelHelpers.classCallCheck(this, Foo);
    _this = babelHelpers.callSuper(this, Foo);
    if (true) {
      var _Foo;
      babelHelpers.superPropGet((_this, Foo), "method", _this, 3)([]);
    }
    return _this;
  }
  babelHelpers.inherits(Foo, _Base);
  return babelHelpers.createClass(Foo, [{
    key: "method",
    value: function method() {}
  }]);
}(Base);
