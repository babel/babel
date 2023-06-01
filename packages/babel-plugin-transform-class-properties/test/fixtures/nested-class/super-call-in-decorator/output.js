"use strict";

let Hello = /*#__PURE__*/babelHelpers.createClass(function Hello() {
  babelHelpers.classCallCheck(this, Hello);
  return () => () => "hello";
});
let Outer = /*#__PURE__*/function (_Hello) {
  babelHelpers.inherits(Outer, _Hello);
  var _super = babelHelpers.createSuper(Outer);
  function Outer() {
    var _dec, _init_hello;
    var _this;
    babelHelpers.classCallCheck(this, Outer);
    _dec = _this = _super.call(this);
    let Inner = /*#__PURE__*/babelHelpers.createClass(function Inner() {
      babelHelpers.classCallCheck(this, Inner);
      babelHelpers.defineProperty(this, "hello", _init_hello(this));
    });
    [_init_hello] = babelHelpers.applyDecs2305(Inner, [[_dec, 0, "hello"]], []).e;
    return babelHelpers.possibleConstructorReturn(_this, new Inner());
  }
  return babelHelpers.createClass(Outer);
}(Hello);
expect(new Outer().hello).toBe('hello');
