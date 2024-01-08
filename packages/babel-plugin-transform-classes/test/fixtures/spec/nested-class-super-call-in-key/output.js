"use strict";

var Hello = /*#__PURE__*/babelHelpers.createClass(function Hello() {
  babelHelpers.classCallCheck(this, Hello);
  return {
    toString() {
      return 'hello';
    }
  };
});
var Outer = /*#__PURE__*/function (_Hello) {
  babelHelpers.inherits(Outer, _Hello);
  function Outer() {
    var _this;
    babelHelpers.classCallCheck(this, Outer);
    var Inner = /*#__PURE__*/function (_this2) {
      function Inner() {
        babelHelpers.classCallCheck(this, Inner);
      }
      babelHelpers.createClass(Inner, [{
        key: _this2,
        value: function value() {
          return 'hello';
        }
      }]);
      return Inner;
    }(_this = babelHelpers.callSuper(this, Outer));
    return babelHelpers.possibleConstructorReturn(_this, new Inner());
  }
  return babelHelpers.createClass(Outer);
}(Hello);
expect(new Outer().hello()).toBe('hello');
