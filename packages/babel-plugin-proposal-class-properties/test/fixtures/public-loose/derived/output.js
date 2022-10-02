var Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  babelHelpers.inherits(Foo, _Bar);
  var _super = babelHelpers.createSuper(Foo);
  function Foo(...args) {
    var _this;
    babelHelpers.classCallCheck(this, Foo);
    _this = _super.call(this, ...args);
    _this.bar = "foo";
    return _this;
  }
  return babelHelpers.createClass(Foo);
}(Bar);
