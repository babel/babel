"use strict";

let Hello = function Hello() {
  babelHelpers.classCallCheck(this, Hello);
  return {
    toString() {
      return 'hello';
    }

  };
};

let Outer =
/*#__PURE__*/
function (_Hello) {
  function Outer() {
    var _this;

    babelHelpers.classCallCheck(this, Outer);

    var _this2 = _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Outer).call(this));

    let Inner = function Inner() {
      babelHelpers.classCallCheck(this, Inner);
      babelHelpers.defineProperty(this, _this2, "hello");
    };

    return babelHelpers.possibleConstructorReturn(_this, new Inner());
  }

  babelHelpers.inherits(Outer, _Hello);
  return Outer;
}(Hello);

expect(new Outer().hello).toBe('hello');
