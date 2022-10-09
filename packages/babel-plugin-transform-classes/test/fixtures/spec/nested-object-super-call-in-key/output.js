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
  var _super = babelHelpers.createSuper(Outer);
  function Outer() {
    var _this;
    babelHelpers.classCallCheck(this, Outer);
    var Inner = {
      [_this = _super.call(this)]() {
        return 'hello';
      }
    };
    return babelHelpers.possibleConstructorReturn(_this, Inner);
  }
  return babelHelpers.createClass(Outer);
}(Hello);
expect(new Outer().hello()).toBe('hello');
