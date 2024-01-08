var Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  babelHelpers.inherits(Foo, _Bar);
  function Foo(...args) {
    var _this;
    babelHelpers.classCallCheck(this, Foo);
    _this = babelHelpers.callSuper(this, Foo, [...args]);
    _this.bar = "foo";
    return _this;
  }
  return babelHelpers.createClass(Foo);
}(Bar);
