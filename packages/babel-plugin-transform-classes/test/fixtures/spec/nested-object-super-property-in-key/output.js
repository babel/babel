"use strict";

var Hello = /*#__PURE__*/function () {
  function Hello() {
    babelHelpers.classCallCheck(this, Hello);
  }
  return babelHelpers.createClass(Hello, [{
    key: "toString",
    value: function toString() {
      return 'hello';
    }
  }]);
}();
var Outer = /*#__PURE__*/function (_Hello) {
  function Outer() {
    var _this;
    babelHelpers.classCallCheck(this, Outer);
    _this = babelHelpers.callSuper(this, Outer);
    var Inner = {
      [babelHelpers.superPropertyGetCall((_this, Outer), "toString", _this, 1, [])]() {
        return 'hello';
      }
    };
    return babelHelpers.possibleConstructorReturn(_this, Inner);
  }
  babelHelpers.inherits(Outer, _Hello);
  return babelHelpers.createClass(Outer);
}(Hello);
expect(new Outer().hello()).toBe('hello');
