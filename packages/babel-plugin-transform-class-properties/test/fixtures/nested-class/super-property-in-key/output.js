"use strict";

let Hello = /*#__PURE__*/function () {
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
let Outer = /*#__PURE__*/function (_Hello) {
  function Outer() {
    let _babelHelpers$get$cal;
    var _this;
    babelHelpers.classCallCheck(this, Outer);
    _this = babelHelpers.callSuper(this, Outer);
    _babelHelpers$get$cal = babelHelpers.get((_this, babelHelpers.getPrototypeOf(Outer.prototype)), "toString", _this).call(_this);
    let Inner = /*#__PURE__*/babelHelpers.createClass(function Inner() {
      babelHelpers.classCallCheck(this, Inner);
      babelHelpers.defineProperty(this, _babelHelpers$get$cal, 'hello');
    });
    return babelHelpers.possibleConstructorReturn(_this, new Inner());
  }
  babelHelpers.inherits(Outer, _Hello);
  return babelHelpers.createClass(Outer);
}(Hello);
expect(new Outer().hello).toBe('hello');
