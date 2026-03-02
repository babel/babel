var Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  function Foo(...args) {
    var _this;
    babelHelpers.classCallCheck(this, Foo);
    _this = babelHelpers.callSuper(this, Foo, [...args]);
    _this.bar = "foo";
    return _this;
  }
  babelHelpers.inherits(Foo, _Bar);
  return babelHelpers.createClass(Foo);
}(Bar);
