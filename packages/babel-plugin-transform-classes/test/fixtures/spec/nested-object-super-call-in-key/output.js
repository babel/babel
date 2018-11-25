"use strict";

var Hello = function Hello() {
  babelHelpers.classCallCheck(this, Hello);
  return {
    toString() {
      return 'hello';
    }

  };
};

var Outer =
/*#__PURE__*/
function (_Hello) {
  babelHelpers.inherits(Outer, _Hello);

  function Outer() {
    var _this;

    babelHelpers.classCallCheck(this, Outer);
    var Inner = {
      [_this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Outer).call(this))]() {
        return 'hello';
      }

    };
    return babelHelpers.possibleConstructorReturn(_this, Inner);
  }

  return Outer;
}(Hello);

expect(new Outer().hello()).toBe('hello');
