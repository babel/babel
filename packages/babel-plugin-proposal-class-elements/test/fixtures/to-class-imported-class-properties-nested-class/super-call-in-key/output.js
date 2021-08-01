"use strict";

let Hello = function Hello() {
  babelHelpers.classCallCheck(this, Hello);
  return {
    toString() {
      return 'hello';
    }

  };
};

let Outer = /*#__PURE__*/function (_Hello) {
  babelHelpers.inherits(Outer, _Hello);

  var _super = babelHelpers.createSuper(Outer);

  function Outer() {
    let _this2;

    var _this;

    babelHelpers.classCallCheck(this, Outer);
    _this2 = _this = _super.call(this);

    let Inner = function Inner() {
      babelHelpers.classCallCheck(this, Inner);
      babelHelpers.defineProperty(this, _this2, "hello");
    };

    return babelHelpers.possibleConstructorReturn(_this, new Inner());
  }

  return Outer;
}(Hello);

expect(new Outer().hello).toBe('hello');
