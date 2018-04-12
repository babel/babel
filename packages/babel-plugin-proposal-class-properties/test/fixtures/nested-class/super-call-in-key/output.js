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
  babelHelpers.inherits(Outer, _Hello);

  function Outer() {
    var _this;

    babelHelpers.classCallCheck(this, Outer);

    var _this2 = _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Outer).call(this));

    let Inner = function Inner() {
      babelHelpers.classCallCheck(this, Inner);
      Object.defineProperty(this, _this2, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: "hello"
      });
    };

    return babelHelpers.possibleConstructorReturn(_this, new Inner());
  }

  return Outer;
}(Hello);

assert.equal(new Outer().hello, 'hello');
