"use strict";

let Hello = /*#__PURE__*/babelHelpers.createClass(function Hello() {
  babelHelpers.classCallCheck(this, Hello);
  return {
    toString() {
      return 'hello';
    }
  };
});
let Outer = /*#__PURE__*/function (_Hello) {
  babelHelpers.inherits(Outer, _Hello);
  function Outer() {
    var _this;
    babelHelpers.classCallCheck(this, Outer);
    _this = babelHelpers.callSuper(this, Outer);
    let Inner = /*#__PURE__*/babelHelpers.createClass(function Inner() {
      babelHelpers.classCallCheck(this, Inner);
      babelHelpers.defineProperty(this, _this, "hello");
    });
    return babelHelpers.possibleConstructorReturn(_this, new Inner());
  }
  return babelHelpers.createClass(Outer);
}(Hello);
expect(new Outer().hello).toBe('hello');
