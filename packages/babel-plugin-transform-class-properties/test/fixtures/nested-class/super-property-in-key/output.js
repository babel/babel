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
    let _babelHelpers$superPr;
    var _this;
    babelHelpers.classCallCheck(this, Outer);
    _this = babelHelpers.callSuper(this, Outer);
    _babelHelpers$superPr = babelHelpers.superPropGet((_this, Outer), "toString", _this, 3)([]);
    let Inner = /*#__PURE__*/babelHelpers.createClass(function Inner() {
      babelHelpers.classCallCheck(this, Inner);
      babelHelpers.defineProperty(this, _babelHelpers$superPr, 'hello');
    });
    return babelHelpers.possibleConstructorReturn(_this, new Inner());
  }
  babelHelpers.inherits(Outer, _Hello);
  return babelHelpers.createClass(Outer);
}(Hello);
expect(new Outer().hello).toBe('hello');
