"use strict";

var Hello = /*#__PURE__*/function () {
  function Hello() {
    babelHelpers.classCallCheck(this, Hello);
  }
  babelHelpers.createClass(Hello, [{
    key: "toString",
    value: function toString() {
      return 'hello';
    }
  }]);
  return Hello;
}();
var Outer = /*#__PURE__*/function (_Hello) {
  babelHelpers.inherits(Outer, _Hello);
  function Outer() {
    var _thisSuper, _this;
    babelHelpers.classCallCheck(this, Outer);
    _this = babelHelpers.callSuper(this, Outer);
    var Inner = {
      [babelHelpers.get((_thisSuper = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(Outer.prototype)), "toString", _thisSuper).call(_thisSuper)]() {
        return 'hello';
      }
    };
    return babelHelpers.possibleConstructorReturn(_this, Inner);
  }
  return babelHelpers.createClass(Outer);
}(Hello);
expect(new Outer().hello()).toBe('hello');
